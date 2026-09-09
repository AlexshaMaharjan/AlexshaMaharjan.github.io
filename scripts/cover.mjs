/**
 * Compose a case-study cover card.
 *
 *   node scripts/cover.mjs <spec.json> [--port 9333]
 *
 * Five of the six case studies arrived with a cover the owner had designed —
 * a project name, a one-line subtitle, and the work itself bleeding off the
 * right edge on a pale ground. The barrier-free kitchen had none, and its card
 * on the homepage was the one that looked wrong (`DECISION-021`).
 *
 * So this builds one to match, from an image the project already has. It is not
 * a substitute for a designed cover — it copies a layout rather than inventing
 * one — but it is what makes six cards read as a set instead of five plus an
 * exception.
 *
 * The spec is an array of jobs:
 *
 *   {
 *     "image":    "/abs/path/render.png",
 *     "out":      "Images/kitchen/00 · Cover · Barrier-Free Kitchen.png",
 *     "title":    "Barrier-Free\nKitchen",   // \n breaks the line
 *     "subtitle": "Design Research & 3D Case Study",
 *     "ground":   "#EAF1EE",
 *     "ink":      "#16303A"
 *   }
 *
 * Output is 1600x900 at deviceScaleFactor 2 — the same 16/9 the other covers
 * use. Run the result through `image-treat.mjs` to get the shipped WebP, and
 * record *that* job in `image_crops.json` so the export stays reproducible.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { connect, evaluate, sleep } from "./lib/cdp.mjs";

const specPath = process.argv[2];
if (!specPath) {
  console.error("usage: node scripts/cover.mjs <spec.json>");
  process.exit(1);
}
const portFlag = process.argv.indexOf("--port");
const port = portFlag > -1 ? +process.argv[portFlag + 1] : 9333;
const jobs = JSON.parse(readFileSync(specPath, "utf8"));

/* The site's own stack, so a cover made here and the page it sits on agree.
   Inter comes from Google Fonts; the fallback is what the site itself renders
   when that fails. */
const FONT = `"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif`;

const cdp = await connect(port);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");

for (const job of jobs) {
  const img = readFileSync(job.image).toString("base64");
  const ink = job.ink ?? "#16303A";
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1600px;height:900px;overflow:hidden;background:${job.ground ?? "#EEF1F4"};
       font-family:${FONT};-webkit-font-smoothing:antialiased;position:relative}
  .text{position:absolute;left:112px;top:50%;transform:translateY(-50%);width:520px;z-index:2}
  h1{font-size:66px;font-weight:700;letter-spacing:-0.035em;line-height:1.02;color:${ink}}
  p{margin-top:24px;font-size:25px;font-weight:500;line-height:1.35;letter-spacing:-0.01em;
    color:${ink}99}
  .shot{position:absolute;right:-70px;top:50%;transform:translateY(-50%);width:920px;
        border-radius:16px;overflow:hidden;box-shadow:0 34px 70px ${ink}33;background:#fff}
  .shot img{display:block;width:100%}
</style></head><body>
  <div class="text"><h1>${job.title.replace(/\n/g, "<br>")}</h1><p>${job.subtitle}</p></div>
  <div class="shot"><img src="data:image/png;base64,${img}"></div>
</body></html>`;

  const page = `/tmp/cover-${process.pid}.html`;
  writeFileSync(page, html);
  await cdp.send("Page.navigate", { url: `file://${page}` });
  await sleep(2000);
  // Without this the first paint can land before Inter arrives, and the cover
  // ships in the fallback face.
  await evaluate(cdp, "document.fonts.ready.then(() => 1)");
  await sleep(500);

  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 900, deviceScaleFactor: 2, mobile: false });
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png", clip: { x: 0, y: 0, width: 1600, height: 900, scale: 2 },
  });
  writeFileSync(job.out, Buffer.from(data, "base64"));
  console.log(`${job.out}  3200x1800`);
}

cdp.close();
