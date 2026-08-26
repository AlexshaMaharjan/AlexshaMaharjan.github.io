/**
 * Report the bounding box of actual content on a rendered documentation page,
 * as the fractions `image-treat.mjs` takes for `crop`.
 *
 *   node scripts/ink-box.mjs <page.png> [--band 0.30,0.72] [--cols 0,1] [--thresh 244]
 *
 * SESSION-020 spent three rounds recutting crops whose coordinates were read off
 * the decile grid by eye — it reads consistently short, and every crop clipped a
 * figure's right edge. Measuring settled each remaining crop in one pass, so the
 * measurement is a tool now rather than a habit.
 *
 * `--band` limits the search to a vertical slice of the page (the figure you
 * want, rather than the heading above it); `--cols` limits it horizontally, for
 * a page whose figure sits in one column beside body text. Both are fractions.
 *
 * Prints the ink box, and the `crop` for several target aspects — each computed
 * from the box's own centre, widened to whatever the aspect needs, so the figure
 * is never distorted and never clipped. `image-treat` stretches the rect it is
 * given to the output size, so a rect at the wrong ratio distorts silently;
 * this is the arithmetic that prevents that.
 */
import { readFileSync } from "node:fs";
import { connect, evaluate, setViewport } from "./lib/cdp.mjs";

const file = process.argv[2];
if (!file) { console.error("usage: node scripts/ink-box.mjs <page.png> [--band a,b] [--cols a,b] [--thresh n]"); process.exit(1); }
const pair = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1].split(",").map(Number) : dflt;
};
const num = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? +process.argv[i + 1] : dflt;
};
const [y0, y1] = pair("band", [0, 1]);
const [x0, x1] = pair("cols", [0, 1]);
const thresh = num("thresh", 244);
const ASPECTS = ["1/1", "4/3", "3/4", "16/9", "16/8", "16/10", "3/2", "2/3"];

const b64 = readFileSync(file).toString("base64");
const cdp = await connect();
await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
await setViewport(cdp, 400, 300);
await cdp.send("Page.navigate", { url: "about:blank" });
await new Promise((r) => setTimeout(r, 250));

const box = JSON.parse(await evaluate(cdp, `(async () => {
  const img = new Image();
  img.src = "data:image/png;base64,${b64}";
  await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, W, H).data;
  const xa = Math.floor(${x0} * W), xb = Math.ceil(${x1} * W);
  const ya = Math.floor(${y0} * H), yb = Math.ceil(${y1} * H);
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) {
      const i = (y * W + x) * 4;
      // Ink is anything meaningfully darker or more saturated than paper.
      if (d[i] < ${thresh} || d[i+1] < ${thresh} || d[i+2] < ${thresh}) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }
  return JSON.stringify({ W, H, minX, minY, maxX, maxY });
})()`));
cdp.close();

if (box.maxX < 0) { console.log("no ink found in that band"); process.exit(0); }
const { W, H, minX, minY, maxX, maxY } = box;
const bw = maxX - minX + 1, bh = maxY - minY + 1;
console.log(`page ${W}x${H}   ink ${bw}x${bh}px at (${minX},${minY})`);
console.log(`ink box     crop: [${(minX/W).toFixed(4)}, ${(minY/H).toFixed(4)}, ${(bw/W).toFixed(4)}, ${(bh/H).toFixed(4)}]`);
console.log(`\ncentred on the ink, at the aspect the slot declares:\n`);
const cx = (minX + maxX + 1) / 2, cy = (minY + maxY + 1) / 2;
for (const a of ASPECTS) {
  const [aw, ah] = a.split("/").map(Number);
  // Grow the smaller side so the ink always fits inside the rect.
  let rw = bw, rh = (bw * ah) / aw;
  if (rh < bh) { rh = bh; rw = (bh * aw) / ah; }
  const x = cx - rw / 2, y = cy - rh / 2;
  const fits = x >= 0 && y >= 0 && x + rw <= W && y + rh <= H;
  console.log(`  ${a.padEnd(6)} crop: [${(x/W).toFixed(4)}, ${(y/H).toFixed(4)}, ${(rw/W).toFixed(4)}, ${(rh/H).toFixed(4)}]${fits ? "" : "   ⚠ runs off the page — crop tighter or pick another aspect"}`);
}
