/**
 * Dumps every authored string on the site into one reviewable Markdown file.
 *
 *   node scripts/copy-export.mjs            # writes COPY_REVIEW.md
 *   node scripts/copy-export.mjs --out X.md
 *
 * Unlike CONTENT_GUIDE.md, which is hand-maintained and has drifted (it still
 * describes `lib/playground/categories/*`, removed in MILESTONE-014), this is
 * generated from the data files themselves and cannot be stale.
 *
 * Every entry carries the source path and the key path it came from, so an edit
 * made here can be applied to exactly one field in exactly one file.
 */
import { build } from "esbuild";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const outArg = process.argv.indexOf("--out");
const OUT = outArg > -1 ? path.resolve(process.argv[outArg + 1]) : path.join(ROOT, "COPY_REVIEW.md");

/** Bundles a TS entry point and returns its module. */
async function load(entry) {
  const outfile = path.join(mkdtempSync(path.join(tmpdir(), "copy-export-")), "out.mjs");
  await build({
    entryPoints: [path.join(ROOT, entry)],
    bundle: true, format: "esm", outfile, logLevel: "error",
    plugins: [{
      name: "alias",
      setup(b) {
        b.onResolve({ filter: /^@\// }, (a) => ({ path: path.join(ROOT, "src", a.path.slice(2)) }));
      },
    }],
  });
  return import(pathToFileURL(outfile).href);
}

const L = [];
const out = (s = "") => L.push(s);
const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, "<br>");

/**
 * One field as an EN/DE pair.
 *
 * A deliberate line break inside a string — the collage notes are written in
 * two or three short lines and the break is part of the drawing — is shown as
 * `↵` rather than swallowed, so it survives a round trip through this file.
 */
const line = (s) => String(s).replace(/\n/g, " ↵ ");

const findings = { untranslatedCaption: [], sameProse: [], missingDe: [] };
let context = "";

function pair(label, en, de) {
  if (en === undefined && de === undefined) return;
  if (en !== undefined && de === undefined) findings.missingDe.push(`${context}${label}`);
  if (en === de && typeof en === "string") {
    // A bracketed caption is written in the placeholder idiom (DECISION-006)
    // and the brackets come off when a real image lands, so it renders as
    // visible text — in English, on the German page too.
    if (/^\[.*\]$/.test(en)) findings.untranslatedCaption.push(`${context}${label} — "${en}"`);
    // Prose long enough to be a sentence rather than a proper noun or a
    // tool list, identical in both locales.
    else if (en.length > 30 && / /.test(en) && !/·|,/.test(en)) findings.sameProse.push(`${context}${label} — "${en}"`);
  }
  if (en === de) {
    out(`- **${label}** · _EN = DE_`);
    out(`  - ${line(en)}`);
  } else {
    out(`- **${label}**`);
    out(`  - **EN:** ${en === undefined ? "_(missing)_" : line(en)}`);
    out(`  - **DE:** ${de === undefined ? "_(missing)_" : line(de)}`);
  }
}

/**
 * Walks two parallel locale objects, emitting a pair per leaf string.
 * `skip` names keys that are hrefs, slugs, image paths or CSS — not prose.
 */
const SKIP = new Set([
  "image", "src", "video", "film", "href", "portfolioHref", "linkedinHref",
  "imageAspect", "aspect", "slug", "id", "accent", "tone", "focus", "rotate",
  "x", "y", "w", "h", "prefer", "target", "number", "index", "wide",
  "stackWithNext", "ordered", "kind", "address",
]);

function walk(keyPath, en, de) {
  if (en === null || en === undefined) return;
  if (typeof en === "string") {
    const leaf = keyPath.split(/[.[]/).pop().replace(/\]$/, "");
    if (SKIP.has(leaf)) return;
    pair(keyPath, en, typeof de === "string" ? de : de);
    return;
  }
  if (typeof en === "number" || typeof en === "boolean") return;
  if (Array.isArray(en)) {
    en.forEach((item, i) => walk(`${keyPath}[${i}]`, item, Array.isArray(de) ? de[i] : undefined));
    return;
  }
  for (const k of Object.keys(en)) {
    if (SKIP.has(k)) continue;
    walk(keyPath ? `${keyPath}.${k}` : k, en[k], de && typeof de === "object" ? de[k] : undefined);
  }
}

// ─── load everything ────────────────────────────────────────────────────────
const dicts = await load("src/lib/dictionaries/index.ts");
const studies = await load("src/lib/caseStudies/index.ts");
const pgHome = (await load("src/lib/playground/home.ts")).default;
const collage = (await load("src/lib/playground/collage.ts")).default;

const en = dicts.getDictionary("en");
const de = dicts.getDictionary("de");

// ─── header ─────────────────────────────────────────────────────────────────
out("# Copy Review — every word on the site");
out();
out(`Generated ${new Date().toISOString().slice(0, 10)} by \`node scripts/copy-export.mjs\` from the live data files.`);
out();
out("Each entry is labelled with the **file** it lives in and the **key path** inside it, so a change here maps to exactly one field. `EN = DE` means the two locales are intentionally identical (proper nouns, tool names). Edits to this file do **not** change the site — they have to be copied back into the source.");
out();
out("**Where the words live**");
out();
out("| Area | File |");
out("|---|---|");
out("| Site-wide copy (nav, home, about, résumé, footer, legal, 404, shared labels) | `src/lib/dictionaries/en.ts` · `src/lib/dictionaries/de.ts` |");
out("| The six case studies | `src/lib/caseStudies/<slug>.ts` (both locales in one file) |");
out("| Archive first screen | `src/lib/playground/home.ts` |");
out("| Archive picture captions, alt text & metadata | `src/lib/playground/pieces.json` — or the form at `/archive/edit` |");
out();
out("<!--SUMMARY-->");
out();
out("---");
out();

// ─── 1. dictionaries, section by section ────────────────────────────────────
const SECTIONS = [
  ["meta", "Page title & meta description"],
  ["nav", "Header / navigation"],
  ["landmarks", "Landmark names (screen-reader only)"],
  ["hero", "Home — hero"],
  ["process", "Home — process collage"],
  ["selectedWork", "Home — selected work heading"],
  ["projects", "Project cards (title, blurb, tags, alt text)"],
  ["aboutPreview", "Home — about preview & archive teaser"],
  ["contact", "Home — contact band"],
  ["playgroundPeek", "Home — archive peek"],
  ["playgroundOutro", "Archive — closing band"],
  ["about", "About page"],
  ["resume", "Résumé page"],
  ["caseStudy", "Case-study shared labels"],
  ["footer", "Footer"],
  ["legal", "Legal — Impressum & privacy"],
  ["notFound", "404 page"],
  ["routeLoading", "Route loading announcement"],
];

out("## 1. Site-wide copy");
out();
out("`src/lib/dictionaries/en.ts` · `src/lib/dictionaries/de.ts`");
out();

for (const [key, title] of SECTIONS) {
  out(`### ${title}`);
  out();
  out(`\`dictionary.${key}\``);
  out();
  walk(key, en[key], de[key]);
  out();
}

// the legal address, skipped by the walker because `address` is also a boolean flag
out("### Postal address (rendered on both legal pages)");
out();
out("`dictionary.legal.address`");
out();
en.legal.address.forEach((line, i) => pair(`legal.address[${i}]`, line, de.legal.address[i]));
out();
out("---");
out();

// ─── 2. case studies ────────────────────────────────────────────────────────
out("## 2. Case studies");
out();

const META = [
  ["name", "Name"], ["headline", "Headline"], ["summary", "Summary"],
  ["heroDisclosure", "Hero disclosure"], ["role", "Role"],
  ["contribution", "Contribution"], ["type", "Type"], ["tools", "Tools"],
  ["deliverables", "Deliverables"],
];

const blockText = (b) => (typeof b === "string" ? b : b.text);

for (const slug of studies.caseStudySlugs) {
  const content = await studies.caseStudyPromise(slug);
  const e = content.en, d = content.de;
  context = `${slug} · `;
  out(`### ${e.name}`);
  out();
  out(`\`src/lib/caseStudies/${slug}.ts\` · URL \`/work/${slug}\` and \`/de/work/${slug}\``);
  out();
  out("#### Overview");
  out();
  for (const [k, label] of META) if (e[k] !== undefined) pair(`${label} — \`${slug}.${k}\``, e[k], d[k]);
  e.tags.forEach((t, i) => pair(`Tag — \`${slug}.tags[${i}]\``, t, d.tags[i]));
  pair(`Hero image alt — \`${slug}.heroImage.alt\``, e.heroImage.alt, d.heroImage.alt);
  out();

  e.sections.forEach((sec, si) => {
    const dsec = d.sections[si];
    out(`#### §${sec.number} ${sec.heading}`);
    out();
    out(`\`${slug}.sections[${si}]\` · nav label: EN "${sec.navLabel}" / DE "${dsec?.navLabel ?? "—"}"`);
    out();
    pair(`Heading — \`sections[${si}].heading\``, sec.heading, dsec?.heading);
    if (sec.designQuestion) pair(`Design question — \`sections[${si}].designQuestion\``, sec.designQuestion, dsec?.designQuestion);

    (sec.body ?? []).forEach((b, bi) => {
      const db = dsec?.body?.[bi];
      const kind = typeof b === "string" ? "paragraph" : b.kind;
      const ref = `sections[${si}].body[${bi}]`;
      if (kind === "p" || kind === "paragraph") pair(`Paragraph — \`${ref}\``, blockText(b), db && blockText(db));
      else if (kind === "h3") pair(`Sub-heading — \`${ref}\``, b.text, db?.text);
      else if (kind === "note") pair(`Note — \`${ref}\``, b.text, db?.text);
      else if (kind === "quote") {
        pair(`Quote — \`${ref}.text\``, b.text, db?.text);
        if (b.attribution) pair(`Attribution — \`${ref}.attribution\``, b.attribution, db?.attribution);
      } else if (kind === "list") {
        b.items.forEach((it, ii) => pair(`List item — \`${ref}.items[${ii}]\``, it, db?.items?.[ii]));
      } else if (kind === "figure") {
        pair(`Figure caption — \`${ref}.caption\``, b.caption, db?.caption);
        if (b.alt) pair(`Figure alt — \`${ref}.alt\``, b.alt, db?.alt);
      } else if (kind === "figures") {
        b.items.forEach((f, fi) => {
          pair(`Figure caption — \`${ref}.items[${fi}].caption\``, f.caption, db?.items?.[fi]?.caption);
          if (f.alt) pair(`Figure alt — \`${ref}.items[${fi}].alt\``, f.alt, db?.items?.[fi]?.alt);
        });
      }
    });

    (sec.insights ?? []).forEach((ins, ii) => {
      pair(`Insight heading — \`sections[${si}].insights[${ii}].heading\``, ins.heading, dsec?.insights?.[ii]?.heading);
      pair(`Insight body — \`sections[${si}].insights[${ii}].body\``, ins.body, dsec?.insights?.[ii]?.body);
    });
    (sec.testing ?? []).forEach((t, ti) => {
      pair(`Testing label — \`sections[${si}].testing[${ti}].label\``, t.label, dsec?.testing?.[ti]?.label);
      pair(`Testing body — \`sections[${si}].testing[${ti}].body\``, t.body, dsec?.testing?.[ti]?.body);
    });
    (sec.images ?? []).forEach((f, fi) => {
      pair(`Image caption — \`sections[${si}].images[${fi}].caption\``, f.caption, dsec?.images?.[fi]?.caption);
      if (f.alt) pair(`Image alt — \`sections[${si}].images[${fi}].alt\``, f.alt, dsec?.images?.[fi]?.alt);
    });
    out();
  });
  out("---");
  out();
}

// ─── 3. playground ──────────────────────────────────────────────────────────
out("## 3. Archive");
out();
out("### First screen");
out();
out("`src/lib/playground/home.ts`");
out();
walk("", pgHome.en, pgHome.de);
out();

out("### Collage cards — captions, notes and alt text");
out();
out("`src/lib/playground/pieces.json`, editable at `/archive/edit` under `npm run dev`. The caption is the heading shown when a picture is opened; the alt text is what a screen reader reads; a note is the hand-written line with an arrow pointing at one picture, and those live in `collage.ts` with the design.");
out();
collage.forEach((card, ci) => {
  out(`#### Card ${card.index}`);
  out();
  pair(`Card label (screen reader) — \`cards[${ci}].label\``, card.label.en, card.label.de);
  out();
  card.scribbles.forEach((s, si) => {
    pair(`Hand-written note → ${path.basename(s.target)} — \`cards[${ci}].scribbles[${si}].text\``, s.text.en, s.text.de);
  });
  out();
  out(`| # | Caption EN | Caption DE | Alt EN | Alt DE |`);
  out(`|---|---|---|---|---|`);
  card.slots.forEach((s, i) => {
    out(`| ${i} | ${esc(s.caption.en)} | ${esc(s.caption.de)} | ${esc(s.alt.en)} | ${esc(s.alt.de)} |`);
  });
  out();
});

out("---");
out();
out("## 4. Text baked into components");
out();
out("These are not in the data files, so they are the same in both locales. The decorative ones sit inside `aria-hidden` subtrees and never reach a reader; the lightbox labels do.");
out();
out("| Text | File | Reaches a reader? |");
out("|---|---|---|");
for (const row of [
  ["\"Previous\" / \"Next\"", "src/components/ui/Lightbox.tsx", "**Yes** — button `aria-label`, English in both locales"],
  ["\"Fit image to screen\" / \"View image at full size\"", "src/components/ui/Lightbox.tsx", "**Yes** — button `aria-label`, English in both locales"],
  ["\"Strengths / Weaknesses / Opportunities / Threats\"", "src/components/process/clusters.tsx", "No — decorative, inside `aria-hidden`"],
  ["\"Home / Work / About / Contact / Case\" sitemap nodes", "src/components/process/clusters.tsx", "No — decorative, inside `aria-hidden`"],
  ["\"One clear path / Grouped by task / Everything at once\"", "src/components/process/clusters.tsx", "No — decorative, inside `aria-hidden`"],
  ["\"Mono labels\" / \"Disabled\" / \"— Interview participant\"", "src/components/process/BranchGroup.tsx", "No — decorative, inside `aria-hidden`"],
  ["\"Alexsha Maharjan\"", "src/components/Header.tsx", "Yes — the wordmark's `aria-label` (a name, not copy)"],
]) out(`| ${row[0]} | \`${row[1]}\` | ${row[2]} |`);
out();

// ─── the summary, spliced in at the top ─────────────────────────────────────
const S = [];
S.push("## Worth a look before you start");
S.push("");
S.push("Generated alongside the rest of this file, so it reflects the copy as it stands today.");
S.push("");

if (findings.untranslatedCaption.length) {
  const byStudy = {};
  for (const f of findings.untranslatedCaption) {
    const slug = f.split(" · ")[0];
    (byStudy[slug] ??= []).push(f);
  }
  S.push(`### ${findings.untranslatedCaption.length} figure captions are the same in English and German`);
  S.push("");
  S.push("These are written in the bracketed placeholder idiom — `[ moodboard ]` — which was right while the slot was an empty hatched box. The brackets come off once a real image lands (`src/lib/caption.ts`), so most of them are now **visible caption text**, in English, on the German pages too.");
  S.push("");
  S.push("| Case study | Captions |");
  S.push("|---|---|");
  for (const [slug, list] of Object.entries(byStudy)) S.push(`| \`${slug}\` | ${list.length} |`);
  S.push("");
  S.push("<details><summary>Every one of them</summary>");
  S.push("");
  for (const f of findings.untranslatedCaption) S.push(`- ${f}`);
  S.push("");
  S.push("</details>");
  S.push("");
}

if (findings.sameProse.length) {
  S.push(`### ${findings.sameProse.length} longer strings are identical in both locales`);
  S.push("");
  S.push("Some of these are correct — a proper noun or a tool list is the same in any language. Worth reading once to be sure none is a translation that was never made.");
  S.push("");
  for (const f of findings.sameProse) S.push(`- ${f}`);
  S.push("");
}

if (findings.missingDe.length) {
  S.push(`### ${findings.missingDe.length} fields have English but no German`);
  S.push("");
  for (const f of findings.missingDe) S.push(`- ${f}`);
  S.push("");
}

S.push("### Two buttons speak English in both locales");
S.push("");
S.push("The image lightbox's controls are labelled in the component rather than the dictionaries, so a German visitor's screen reader announces them in English. See section 4.");
S.push("");

const body = L.join("\n").replace("<!--SUMMARY-->", S.join("\n"));
writeFileSync(OUT, body + "\n");
const words = L.join(" ").split(/\s+/).length;
console.log(`Wrote ${path.relative(ROOT, OUT)} — ${L.length} lines, ~${words} words.`);
