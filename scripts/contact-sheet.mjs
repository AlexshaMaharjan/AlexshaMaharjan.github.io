/**
 * Look at a whole documentation at once, and read crop coordinates off a page.
 *
 *   node scripts/contact-sheet.mjs sheet <dir> <out.png> [--cols 8] [--cell 300]
 *   node scripts/contact-sheet.mjs grid  <page.png> <out.png> [--width 1400]
 *
 * Two habits SESSION-016 found turned a day of this work into an hour, written
 * up in `docs/reference/image_sources.md` and used again for every project
 * since. `sheet` tiles a rendered document into one labelled image, so a
 * hundred pages are one look rather than a hundred. `grid` overlays a decile
 * grid on a single page, so a crop box is *read off* rather than guessed —
 * `image-treat.mjs` takes its `crop` as fractions, which is exactly what the
 * grid's labels are.
 *
 * Rendered in the Chrome this project already drives for verification, so it
 * adds no dependency (`DECISION-012`).
 *
 * The page HTML is written to disk and opened over `file://` rather than built
 * as a `data:` URL: a `data:` page may not load `file://` images, and the
 * contact sheet comes back as a grid of broken-image icons. That cost a
 * debugging round once already.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { connect, sleep, setViewport } from "./lib/cdp.mjs";

const [mode, input, out] = process.argv.slice(2);
if (!["sheet", "grid"].includes(mode) || !input || !out) {
  console.error("usage: node scripts/contact-sheet.mjs sheet|grid <in> <out.png> [--cols n] [--cell px] [--width px]");
  process.exit(1);
}
const flag = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? +process.argv[i + 1] : dflt;
};
const cols = flag("cols", 8);
const cell = flag("cell", 300);
const gridWidth = flag("width", 1400);

const css = `
  body { margin: 0; background: #14141a; font: 11px/1.3 ui-monospace, monospace; color: #d8d8e0; }
  .sheet { display: grid; grid-template-columns: repeat(${cols}, ${cell}px); gap: 10px; padding: 10px; }
  figure { margin: 0; }
  figure img { width: 100%; display: block; background: #fff; }
  figcaption { padding: 3px 2px; color: #9ad; }
  .wrap { position: relative; display: inline-block; }
  .wrap img { display: block; width: ${gridWidth}px; }
  .line { position: absolute; background: rgba(255,0,110,.75); }
  .line.v { top: 0; bottom: 0; width: 1px; }
  .line.h { left: 0; right: 0; height: 1px; }
  .tick { position: absolute; background: #ff006e; color: #fff; padding: 1px 3px; font: 10px/1 ui-monospace, monospace; }
  .tick.v { top: 0; transform: translateX(-50%); }
  .tick.h { left: 0; transform: translateY(-50%); }
`;

let html;
if (mode === "sheet") {
  const files = readdirSync(input).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  if (!files.length) { console.error(`no images in ${input}`); process.exit(1); }
  html = `<style>${css}</style><div class="sheet">` +
    files.map((f) => `<figure><img src="file://${resolve(join(input, f))}"><figcaption>${basename(f)}</figcaption></figure>`).join("") +
    `</div>`;
  console.log(`${files.length} pages, ${cols} across`);
} else {
  const ticks = Array.from({ length: 11 }, (_, i) => i / 10);
  html = `<style>${css}</style><div class="wrap"><img src="file://${resolve(input)}">` +
    ticks.map((t) => `<div class="line v" style="left:${t * 100}%"></div><div class="tick v" style="left:${t * 100}%">${t.toFixed(1)}</div>`).join("") +
    ticks.map((t) => `<div class="line h" style="top:${t * 100}%"></div><div class="tick h" style="top:${t * 100}%">${t.toFixed(1)}</div>`).join("") +
    `</div>`;
}

const pagePath = `/tmp/contact-sheet-${process.pid}.html`;
writeFileSync(pagePath, html);

const cdp = await connect();
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await setViewport(cdp, mode === "sheet" ? cols * (cell + 10) + 20 : gridWidth + 40, 900);
await cdp.send("Page.navigate", { url: `file://${pagePath}` });
await sleep(2500);

const { contentSize } = await cdp.send("Page.getLayoutMetrics");
const shot = await cdp.send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: Math.ceil(contentSize.width), height: Math.ceil(contentSize.height), scale: 1 },
});
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log(`${out}  ${Math.ceil(contentSize.width)}x${Math.ceil(contentSize.height)}`);
cdp.close();
