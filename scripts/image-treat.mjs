/**
 * Crop, resize, grade and measure an image — with no image-processing
 * dependency, by drawing it in the Chrome that already runs this project's
 * verification (`DECISION-012` keeps the toolchain thin; `axe-core` is still
 * the only devDependency).
 *
 *   node scripts/image-treat.mjs <spec.json> [--port 9333]
 *
 * The spec is an array of jobs:
 *
 *   {
 *     "src":   "/abs/path/page.png",
 *     "out":   "public/images/wikimind-tile.png",
 *     "crop":  [0.08, 0.30, 0.84, 0.34],   // x, y, w, h as fractions of src
 *     "width": 1300, "aspect": "672/322",  // output size
 *     "grade": { "brightness": 0.55, "saturate": 0.8,
 *                "tint": "#1B3FE0", "tintAlpha": 0.18 },
 *     "format": "image/webp", "quality": 0.9,   // webp at 0.9 by default
 *     "check": "bento"                     // measure the tile contrast floor
 *   }
 *
 * WebP because there is still no responsive image pipeline (`SUGGESTION-012`):
 * a file ships at whatever size it is, so the format is the only lever, and it
 * is worth roughly a 4x saving over PNG on this material.
 *
 * `check: "bento"` reports the mean luminance of the two bands where
 * `BentoGrid.tsx` puts its text — the top strip under the 12px category label
 * and the centre band under the title.
 *
 * **The test is a floor, not a ceiling, since SESSION-030.** The tiles used to
 * be darkened and colour-tinted so white text would sit on them, and the check
 * asserted they were dark *enough* (mean <= 128/138). The owner's objection was
 * exactly that treatment: eight murky colour washes under a white, restrained
 * page. The tiles are now washed pale instead, keeping only a hint of each
 * image's own colour, and the text is ink — so the same two bands must be
 * light *enough*. Same measurement, opposite direction.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename } from "node:path";
import { connect, evaluate, setViewport } from "./lib/cdp.mjs";

/**
 * A job may name a PDF plus `page` and `renderScale` instead of a PNG, which is
 * how `docs/reference/image_crops.json` records every crop already cut — the
 * source document, not an intermediate file that was never committed. Render it
 * on demand, and cache it, so that record is re-runnable rather than merely
 * descriptive. Position in the file is not the printed page number; `page` is
 * the position, which is what `pdf-page.js` takes.
 */
const CACHE = "/tmp/image-treat-pages";
function resolveSource(job) {
  if (!/\.pdf$/i.test(job.src)) return job.src;
  if (!job.page) throw new Error(`${job.out}: a PDF source needs a "page"`);
  const scale = job.renderScale ?? 4;
  const dir = `${CACHE}/${basename(job.src, ".pdf")}@${scale}`;
  const png = `${dir}/p${String(job.page).padStart(3, "0")}.png`;
  if (!existsSync(png)) {
    mkdirSync(dir, { recursive: true });
    execFileSync("osascript", ["-l", "JavaScript", "scripts/pdf-page.js",
      job.src, String(job.page), dir, String(scale)], { stdio: "pipe" });
  }
  return png;
}

const specPath = process.argv[2];
if (!specPath) {
  console.error("usage: node scripts/image-treat.mjs <spec.json>");
  process.exit(1);
}
const portFlag = process.argv.indexOf("--port");
const port = portFlag > -1 ? +process.argv[portFlag + 1] : 9333;
const jobs = JSON.parse(readFileSync(specPath, "utf8"));

const cdp = await connect(port);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await setViewport(cdp, 400, 300);
await cdp.send("Page.navigate", { url: "about:blank" });
await new Promise((r) => setTimeout(r, 300));

let failures = 0;

for (const job of jobs) {
  const aspect = job.aspect ? job.aspect.split("/").map(Number) : null;
  const w = job.width;
  const h = job.height ?? (aspect ? Math.round((w * aspect[1]) / aspect[0]) : null);
  if (!h) throw new Error(`${job.out}: needs height or aspect`);

  const g = job.grade ?? {};
  const result = await evaluate(
    cdp,
    `(async () => {
      const img = new Image();
      img.src = "data:image/png;base64,${readFileSync(resolveSource(job)).toString("base64")}";
      await img.decode();
      const [cx, cy, cw, ch] = ${JSON.stringify(job.crop ?? [0, 0, 1, 1])};
      const c = document.createElement("canvas");
      c.width = ${w}; c.height = ${h};
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, ${w}, ${h});
      ctx.filter = "brightness(${g.brightness ?? 1}) saturate(${g.saturate ?? 1}) contrast(${g.contrast ?? 1})";
      ctx.drawImage(img,
        Math.round(img.naturalWidth * cx), Math.round(img.naturalHeight * cy),
        Math.round(img.naturalWidth * cw), Math.round(img.naturalHeight * ch),
        0, 0, ${w}, ${h});
      ctx.filter = "none";
      ${g.tint ? `ctx.globalAlpha = ${g.tintAlpha ?? 0.15};
      ctx.fillStyle = "${g.tint}";
      ctx.fillRect(0, 0, ${w}, ${h});
      ctx.globalAlpha = 1;` : ""}

      // Mean luminance of a band, as sRGB 0-255, for the contrast check.
      const band = (y0, y1) => {
        const d = ctx.getImageData(0, Math.round(${h} * y0), ${w},
                                   Math.max(1, Math.round(${h} * (y1 - y0)))).data;
        let sum = 0;
        for (let i = 0; i < d.length; i += 4) {
          sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        }
        return Math.round(sum / (d.length / 4));
      };
      return JSON.stringify({
        data: c.toDataURL("${job.format ?? "image/webp"}", ${job.quality ?? 0.9}),
        top: band(0.02, 0.16),
        middle: band(0.38, 0.62),
        natural: img.naturalWidth + "x" + img.naturalHeight,
      });
    })()`
  );

  const { data, top, middle, natural } = JSON.parse(result);
  const bytes = Buffer.from(data.split(",")[1], "base64");
  writeFileSync(job.out, bytes);
  const kb = (bytes.length / 1024).toFixed(0) + " KB";

  let verdict = "";
  if (job.check === "bento") {
    /*
     * A floor, not a ceiling (SESSION-030). Ink text on a pale wash needs the
     * wash to stay light: 190 puts the darkest tile at roughly 8:1 against the
     * ink, comfortably past WCAG 1.4.3's 4.5:1 with room for the image's own
     * darker passages to show through.
     */
    const ok = top >= 190 && middle >= 190;
    if (!ok) { failures++; verdict = `  ✗ TOO DARK (top ${top}, middle ${middle}; floor 190)`; }
    else verdict = `  ✓ top ${top} middle ${middle}`;
  }
  console.log(`${job.out}  ${w}x${h}  ${kb}  from ${natural}${verdict}`);
}

cdp.close();
if (failures) {
  console.log(`\n${failures} image(s) fail the bento contrast floor — lighten the wash and re-run.`);
  process.exit(1);
}
