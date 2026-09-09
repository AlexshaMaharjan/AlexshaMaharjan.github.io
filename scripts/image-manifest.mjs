/**
 * Generates docs/reference/image_manifest.md — every image slot on the site,
 * where it appears, what shape it is, and the exact data path that fills it.
 *
 *   node scripts/image-manifest.mjs           # print
 *   node scripts/image-manifest.mjs --write   # write the doc
 *
 * Rerun after adding content or dropping images in: the counts and the
 * "still empty" column come from the data, not from a memory of it.
 *
 * It also diffs the `en` and `de` image sources against each other, which is the
 * one image defect a browser sweep cannot see — see the note above
 * `compareLocales`. Exits non-zero if they disagree.
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

/*
 * ---- homepage work grid ----
 *
 * Six project cards, one per project, each showing that project's cover
 * (`DECISION-021`). It was eleven bento tiles until SESSION-031; the cards read
 * from `projects[]`, so a card's image is the same file its case study opens
 * with and there is no separate tile to keep in step.
 */
const en = dict.getDictionary("en");
(en.projects ?? []).forEach((project, i) => {
  add("Homepage — work grid", `card ${i + 1}: ${project.name}`, project.tags.join(" · "),
      project.imageAspect, px(548), Boolean(project.image),
      `dictionaries/{en,de}.ts → projects[${i}].image`);
});

/**
 * Every image slot a section owns, in the order it renders.
 *
 * Figures live in two places since SESSION-023: `section.images` renders after
 * the whole section, and `{ kind: "figures" }` blocks sit inside `body` at the
 * prose they illustrate. Both are real slots. Walking only `images` made this
 * file report WikiMind as **one slot, all filled** the moment its figures moved
 * inline — and it would have quietly stopped diffing 16 of them across `en` and
 * `de`, which is the check that caught Sync FM's German hero.
 */
function sectionImages(section) {
  const inBody = (section.body ?? []).flatMap((block) =>
    block && typeof block === "object" && block.kind === "figures" ? (block.items ?? []) : [],
  );
  return [...inBody, ...(section.images ?? [])];
}

// ---- case studies ----
for (const slug of SLUGS) {
  // Loaded on demand since ISSUE-019 split the registry.
  const study = cs.localeContent(await cs.caseStudyPromise(slug), "en");
  add(`Case study — ${study.name}`, "hero", study.heroImage.alt, study.heroImage.aspect, 2560,
      Boolean(study.heroImage.src), `caseStudies/${slug}.ts → {en,de}.heroImage.src`);
  study.sections.forEach((section, si) => {
    sectionImages(section).forEach((img, ii) => {
      const [w, h] = img.aspect.split("/").map(Number);
      const wide = img.wide ?? (w && h ? w / h >= 1.5 : false);
      add(`Case study — ${study.name}`, `${section.number} ${section.navLabel}`, img.caption, img.aspect,
          px(wide ? 960 : 310), Boolean(img.src),
          `caseStudies/${slug}.ts → {en,de}.sections[${si}] figure ${ii + 1}`);
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
/*
 * Every `src` has to be written into both the `en` and the `de` object, and the
 * manifest above reads only `en` — so a slot filled in one locale and missed in
 * the other reports as filled and looks fine in a browser. That is not
 * hypothetical: SESSION-016 gave Sync FM a real hero in English and left the
 * German one pointing at a 6.9 KB colour stand-in, and it survived four sessions
 * of verification because the file loads, has alt text, and is the right shape.
 * Nothing that checks for broken images can see it. This can.
 */
const localeMismatches = [];
function compareLocales(label, dataPath, enSrcs, deSrcs) {
  const n = Math.max(enSrcs.length, deSrcs.length);
  for (let i = 0; i < n; i++) {
    if (enSrcs[i] !== deSrcs[i]) {
      localeMismatches.push({ label, dataPath: dataPath(i),
        en: enSrcs[i] ?? "(missing)", de: deSrcs[i] ?? "(missing)" });
    }
  }
}
for (const slug of SLUGS) {
  const loaded = await cs.caseStudyPromise(slug);
  const [e, d] = ["en", "de"].map((l) => cs.localeContent(loaded, l));
  const srcs = (c) => [c.heroImage.src,
    ...(c.sections ?? []).flatMap((sec) => sectionImages(sec).map((im) => im.src))];
  compareLocales(`caseStudies/${slug}`, (i) =>
    i === 0 ? "heroImage.src" : `section figure #${i}`, srcs(e), srcs(d));
}
{
  const [e, d] = ["en", "de"].map((l) => dict.getDictionary(l));
  compareLocales("dictionaries — about carousel", (i) => `about.carouselItems[${i}].src`,
    (e.about.carouselItems ?? []).map((c) => c.src), (d.about.carouselItems ?? []).map((c) => c.src));
  compareLocales("dictionaries — projects", (i) => `projects[${i}].image`,
    (e.projects ?? []).map((x) => x.image), (d.projects ?? []).map((x) => x.image));
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
if (localeMismatches.length) {
  console.error(`\n${localeMismatches.length} image src(es) differ between en and de:`);
  for (const m of localeMismatches)
    console.error(`  ✗ ${m.label} → ${m.dataPath}\n      en: ${m.en}\n      de: ${m.de}`);
  console.error("\nSame file, translated alt. Fix these before trusting the counts below.\n");
} else {
  console.error("en/de image srcs match across every case study and dictionary slot.");
}

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
  "Export at least that wide: `scripts/image-variants.mjs` generates the smaller widths and",
  "`ui/Image` picks between them, so a larger original costs nothing at display time — but",
  "nothing can invent detail that was never exported. Run `npm run images` afterwards.",
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
if (localeMismatches.length) process.exit(1);
