/**
 * Emit responsive width variants for everything in `public/images/`, and write
 * the map that `ui/Image` reads to build a `srcset` (`SUGGESTION-012`).
 *
 *   node scripts/image-variants.mjs [--check]
 *
 * Why this and not `vite-imagetools`: that plugin only processes files it can
 * see through the module graph, so it would mean moving every image out of
 * `public/` into `src/assets/` and rewriting every `src` string in
 * `src/lib/**` — a change `SUGGESTION-012` itself flags as its main risk — and
 * it pulls in `sharp`. This project has had exactly one devDependency
 * (`axe-core`) for its whole life, and the images are already produced by
 * script from `docs/reference/image_crops.json`, so generating a few more sizes
 * at the same time costs nothing new. It resizes in the Chrome this project
 * already drives for verification.
 *
 * Naming is a convention, not a lookup: `tile-afono-brand.webp` gets
 * `tile-afono-brand-640.webp` beside it. The generated
 * `src/lib/imageVariants.ts` is what makes it type-safe at the call site —
 * `Image` only ever emits a `srcset` for a file listed there, so a missing
 * variant degrades to the plain `src` rather than to a 404.
 *
 * `--check` regenerates nothing and exits non-zero if the map is out of date,
 * which is what CI would run if this project had any.
 *
 * Variants whose source is no longer referenced are **deleted**. They are this
 * script's own output, so reaping them needs nobody's permission — unlike the
 * hand-made originals in `public/images/`, which are the owner's files and are
 * left alone. Without this, re-pointing one `src` silently leaves five orphaned
 * WebPs behind that still ship (SESSION-020, the Sync FM hero).
 */
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { connect, evaluate, setViewport } from "./lib/cdp.mjs";

const DIR = "public/images";
const MAP = "src/lib/imageVariants.ts";
const LADDER = [400, 640, 960, 1280, 1600];
/**
 * A variant is only worth generating if it is meaningfully smaller than the
 * source. 0.85 rather than something stricter because the gaps matter at high
 * DPR: a 3x phone asking for 1050px against a 1600px original with no 1280
 * variant gets the whole 1600.
 */
const MIN_SAVING = 0.85;

const check = process.argv.includes("--check");
const isVariant = (name) => /-\d{3,4}\.webp$/.test(name);

/*
 * Only images the site actually references get variants. Fourteen orphaned
 * PNGs are still sitting in `public/images/` awaiting the owner's decision
 * (SESSION-016), and multiplying those by five would be 700 KB of files that
 * nothing loads — the opposite of the point.
 */
const referenced = new Set(
  // ...excluding this script's own output, which lists every path it is asked
  // about and would otherwise make the filter unanimously true.
  execSync(`grep -rhoE '/images/[A-Za-z0-9._-]+' src/ --exclude=${MAP.split("/").pop()} || true`, {
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean),
);

const sources = readdirSync(DIR)
  .filter((f) => /\.(webp|png|jpe?g)$/i.test(f) && !isVariant(f) && referenced.has(`/images/${f}`))
  .sort();

const cdp = await connect(9333);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await setViewport(cdp, 400, 300);
await cdp.send("Page.navigate", { url: "about:blank" });
await new Promise((r) => setTimeout(r, 300));

/*
 * Anything matching the generated naming convention whose base is not in
 * `sources` is this script's own leftovers — reap it before writing.
 */
const keep = new Set(sources.map((f) => f.replace(/\.(webp|png|jpe?g)$/i, "")));
const orphans = readdirSync(DIR).filter(
  (f) => isVariant(f) && !keep.has(f.replace(/-\d{3,4}\.webp$/, "")),
);
if (orphans.length && !check) {
  for (const f of orphans) unlinkSync(`${DIR}/${f}`);
  console.log(`removed ${orphans.length} orphaned variant(s): ${orphans.join(", ")}`);
}

const map = {};
let written = 0;
let bytes = 0;

for (const file of sources) {
  const src = `${DIR}/${file}`;
  const stem = file.replace(/\.(webp|png|jpe?g)$/i, "");
  const b64 = readFileSync(src).toString("base64");
  const mime = /\.png$/i.test(file) ? "png" : /\.webp$/i.test(file) ? "webp" : "jpeg";

  const natural = JSON.parse(
    await evaluate(
      cdp,
      `(async () => { const i = new Image();
         i.src = "data:image/${mime};base64,${b64}";
         await i.decode();
         return JSON.stringify({ w: i.naturalWidth, h: i.naturalHeight }); })()`,
    ),
  );

  const widths = LADDER.filter((w) => w <= natural.w * MIN_SAVING);
  if (widths.length === 0) continue;
  map[`/images/${file}`] = { w: natural.w, v: widths };
  if (check) continue;

  for (const w of widths) {
    const out = `${DIR}/${stem}-${w}.webp`;
    const h = Math.round((w * natural.h) / natural.w);
    const data = await evaluate(
      cdp,
      `(async () => { const i = new Image();
         i.src = "data:image/${mime};base64,${b64}";
         await i.decode();
         const c = document.createElement("canvas");
         c.width = ${w}; c.height = ${h};
         const x = c.getContext("2d");
         x.imageSmoothingQuality = "high";
         x.drawImage(i, 0, 0, ${w}, ${h});
         return c.toDataURL("image/webp", 0.82); })()`,
    );
    const buf = Buffer.from(data.split(",")[1], "base64");
    writeFileSync(out, buf);
    written++;
    bytes += buf.length;
  }
}

cdp.close();

const body = `// GENERATED by scripts/image-variants.mjs — do not edit by hand.
//
// Maps an image's public path to its natural width and the widths that exist
// beside it as \`<stem>-<width>.webp\`. \`ui/Image\` turns this into a \`srcset\`;
// anything not listed here renders as a plain \`<img>\` (\`SUGGESTION-012\`).
export const imageVariants: Record<string, { w: number; v: number[] }> = ${JSON.stringify(map, null, 2)};
`;

if (check) {
  const current = readFileSync(MAP, "utf8");
  if (current !== body) {
    console.error("image variant map is out of date — run: node scripts/image-variants.mjs");
    process.exit(1);
  }
  console.log(`variant map up to date: ${Object.keys(map).length} images`);
} else {
  writeFileSync(MAP, body);
  console.log(
    `${Object.keys(map).length} images, ${written} variants written (${(bytes / 1024).toFixed(0)} KB), map → ${MAP}`,
  );
}
