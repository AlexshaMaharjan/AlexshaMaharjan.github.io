/**
 * Generates docs/reference/image_manifest.md — every image slot on the site,
 * where it appears, what shape it is, and the exact data path that fills it.
 *
 *   node scripts/image-manifest.mjs           # print
 *   node scripts/image-manifest.mjs --write   # write the doc
 *
 * Rerun after adding content or dropping images in: the counts and the
 * "still empty" column come from the data, not from a memory of it.
 */
import { build } from "esbuild";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/reference/image_manifest.md");

async function load(entry, name) {
  const dir = mkdtempSync(path.join(tmpdir(), "manifest-"));
  const outfile = path.join(dir, name + ".mjs");
  await build({ entryPoints: [path.join(ROOT, entry)], bundle: true, format: "esm", outfile, logLevel: "error" });
  return import(pathToFileURL(outfile).href);
}

const cs = await load("src/lib/caseStudies/index.ts", "caseStudies");
const dict = await load("src/lib/dictionaries/index.ts", "dictionaries");
const home = await load("src/lib/playground/home.ts", "home");
const cats = await load("src/lib/playground/categories/index.ts", "categories");
const projects = await load("src/lib/playground/projects/index.ts", "projects");

const SLUGS = ["wikimind", "afono", "sync-fm", "barrier-free-kitchen", "surugami", "qis-portal"];
const rows = [];
const add = (surface, where, caption, aspect, width, filled, dataPath) =>
  rows.push({ surface, where, caption, aspect, width, filled, dataPath });

/** Rendered width at 1440px, doubled for retina and rounded to something exportable. */
function px(renderedWidth) {
  return Math.round((renderedWidth * 2) / 100) * 100;
}

// ---- homepage bento ----
const en = dict.getDictionary("en");
en.selectedWork.bento.forEach((tile, i) => {
  const [r1, c1, r2, c2] = tile.gridArea.split("/").map((n) => Number(n.trim()));
  const w = Math.round(((c2 - c1) / 10) * 1120);
  const h = Math.round(((r2 - r1) / 6) * (1120 / 0.58));
  add("Homepage — work grid", `tile ${i + 1}: ${tile.title}`, tile.category, `≈${w}×${h}`, px(w), Boolean(tile.src),
      `dictionaries/{en,de}.ts → selectedWork.bento[${i}].src`);
});

// ---- case studies ----
for (const slug of SLUGS) {
  // Loaded on demand since ISSUE-019 split the registry.
  const study = cs.localeContent(await cs.caseStudyPromise(slug), "en");
  add(`Case study — ${study.name}`, "hero", study.heroImage.alt, study.heroImage.aspect, 2560,
      Boolean(study.heroImage.src), `caseStudies/${slug}.ts → {en,de}.heroImage.src`);
  study.sections.forEach((section, si) => {
    (section.images ?? []).forEach((img, ii) => {
      const [w, h] = img.aspect.split("/").map(Number);
      const wide = img.wide ?? (w && h ? w / h >= 1.5 : false);
      add(`Case study — ${study.name}`, `${section.number} ${section.navLabel}`, img.caption, img.aspect,
          px(wide ? 960 : 310), Boolean(img.src),
          `caseStudies/${slug}.ts → {en,de}.sections[${si}].images[${ii}].src`);
    });
  });
}

// ---- about ----
const about = en.about;
add("About", "portrait", about.portraitAlt, "4/5", 1720, true, "dictionaries/{en,de}.ts → (portrait file is wired; needs a real export)");
about.carouselItems.forEach((item, i) => {
  add("About", "carousel", item.caption, "4/5", px(240), Boolean(item.src),
      `dictionaries/{en,de}.ts → about.carouselItems[${i}].src`);
});

// ---- playground ----
const h = home.default.en;
h.heroCards.forEach((card, i) =>
  add("Playground — home", "hero collage", card.caption, card.aspect, px(300), Boolean(card.src),
      `playground/home.ts → {en,de}.heroCards[${i}].src`));
h.featured.forEach((item, i) =>
  add("Playground — home", "featured", item.caption, item.aspect ?? "16/10", px(340), Boolean(item.src),
      `playground/home.ts → {en,de}.featured[${i}].src`));
for (const category of cats.getAllCategories("en")) {
  category.items.forEach((item, i) =>
    add(`Playground — ${category.title}`, "card", item.caption, item.aspect, px(300), Boolean(item.src),
        `playground/categories/${category.slug}.ts → {en,de}.items[${i}].src`));
}
const project = projects.getProject("motorbike-study", "en");
if (project) {
  add("Playground — Motorbike Study", "main", project.mainCaption, project.mainAspect, px(960), Boolean(project.mainSrc),
      `playground/projects/motorbike-study.ts → {en,de}.mainSrc`);
  (project.processItems ?? []).forEach((item, i) =>
    add("Playground — Motorbike Study", "process", item.caption, item.aspect, px(300), Boolean(item.src),
        `playground/projects/motorbike-study.ts → {en,de}.processItems[${i}].src`));
}

// ---- render ----
const empty = rows.filter((r) => !r.filled).length;
const bySurface = new Map();
for (const row of rows) {
  if (!bySurface.has(row.surface)) bySurface.set(row.surface, []);
  bySurface.get(row.surface).push(row);
}

const lines = [
  "# Image manifest — every slot, and what to make for it",
  "",
  "Generated from the content data by `node scripts/image-manifest.mjs --write`. Rerun it",
  "after adding content or dropping images in; the counts below come from the data rather",
  "than from anyone's memory of it.",
  "",
  `**${rows.length} slots. ${rows.length - empty} filled, ${empty} still empty.**`,
  "",
  "## How to fill one",
  "",
  "1. Export the image, name it something readable (`wikimind-moodboard.png`, not a hash).",
  "2. Drop it in `public/images/`.",
  "3. Add `src` and `alt` at the data path in the last column — **in both the `en` and the",
  "   `de` object**, which are in the same file. Same `src`, translated `alt`.",
  "4. `npm run build`. No code change is needed anywhere.",
  "",
  "```",
  '{ aspect: "4/3", caption: "[ moodboard ]", src: "/images/wikimind-moodboard.png", alt: "WikiMind moodboard" }',
  "```",
  "",
  "Any slot left empty keeps the hatched placeholder, so the site stays presentable while",
  "the images are made and the two states can mix on a page.",
  "",
  "## Sizes",
  "",
  "The width column is the rendered width at a 1440px viewport, doubled for retina screens.",
  "Exporting wider than that costs load time and gains nothing — there is no responsive",
  "image pipeline yet (`SUGGESTION-012`), so the file ships at whatever size it is.",
  "",
  "Aspect ratios are what the layout reserves. An image at a different ratio is cropped to",
  "fill, from the centre — so keep the subject away from the edges, or change the `aspect`",
  "in the data to match the export.",
  "",
];

for (const [surface, list] of bySurface) {
  const missing = list.filter((r) => !r.filled).length;
  lines.push(`## ${surface} — ${list.length} slot${list.length === 1 ? "" : "s"}${missing ? `, ${missing} empty` : ", all filled"}`, "");
  lines.push("| # | Where | Caption / subject | Aspect | Export width | Data path |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  list.forEach((r, i) => {
    lines.push(`| ${r.filled ? "✅" : String(i + 1)} | ${r.where} | ${r.caption.replace(/\|/g, "\\|")} | ${r.aspect} | ${r.width}px | \`${r.dataPath}\` |`);
  });
  lines.push("");
}

lines.push("## Also worth replacing", "",
  "`docs/reference/image_files.md` lists five files that are wired up but are solid-colour",
  "stand-ins, not photographs — four case-study heroes and the portrait. Dropping a real",
  "export in with **the same filename** replaces them with no data change at all.", "");

const out = lines.join("\n");
if (process.argv.includes("--write")) {
  writeFileSync(OUT, out);
  console.error(`image_manifest.md written — ${rows.length} slots, ${empty} empty`);
} else {
  process.stdout.write(out);
}
