/**
 * Regenerates section 5 of CONTENT_GUIDE.md (the six case studies) from the data
 * files, so the guide cannot drift from the real content shape.
 *
 *   node scripts/content-guide-case-studies.mjs            # print to stdout
 *   node scripts/content-guide-case-studies.mjs --write    # splice into CONTENT_GUIDE.md
 *
 * `body[]` entries are blocks (ISSUE-024 / MILESTONE-003), so their indices move
 * whenever a section is restructured — rerun this after any such change.
 */
import { build } from "esbuild";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const GUIDE = path.join(ROOT, "CONTENT_GUIDE.md");
const SLUGS = ["wikimind", "afono", "sync-fm", "barrier-free-kitchen", "surugami", "qis-portal"];

async function loadCaseStudies() {
  const out = path.join(mkdtempSync(path.join(tmpdir(), "content-guide-")), "caseStudies.mjs");
  await build({
    entryPoints: [path.join(ROOT, "src/lib/caseStudies/index.ts")],
    bundle: true,
    format: "esm",
    outfile: out,
    logLevel: "error",
  });
  return import(pathToFileURL(out).href);
}

const q = (s) => JSON.stringify(s);

/** One field, as one line when it fits and both locales are short, else two. */
function pair(label, en, de, indent = "") {
  if (en === de) return `${indent}${label} — EN/DE (same): ${q(en)}`;
  if (en.length + de.length < 110) return `${indent}${label} — EN: ${q(en)} | DE: ${q(de)}`;
  return `${indent}${label} — EN: ${q(en)}\n${indent}${" ".repeat(label.length + 3)}DE: ${q(de)}`;
}

const kindOf = (b) => (typeof b === "string" ? "paragraph" : b.kind === "h3" ? "sub-heading" : b.kind);

function blockLines(i, en, de) {
  const kind = kindOf(en);
  const label = `body[${i}] ${kind}`;
  if (kind === "paragraph") return [pair(label, typeof en === "string" ? en : en.text, typeof de === "string" ? de : de.text)];
  if (kind === "sub-heading" || kind === "note" || kind === "quote") return [pair(label, en.text, de.text)];
  if (kind === "list") {
    const lines = [`${label}${en.ordered ? " (numbered)" : ""} — ${en.items.length} items`];
    en.items.forEach((item, n) => lines.push(pair(`  items[${n}]`, item, de.items[n])));
    return lines;
  }
  if (kind === "figure") return [`${label} — aspect ${en.aspect} · caption ${q(en.caption)}${en.src ? ` · src ${en.src}` : " · no src (renders as a placeholder box)"}`];
  return [`${label}`];
}

function sectionBlock(i, en, de) {
  const lines = [
    "",
    `### sections[${i}] — id ${q(en.id)} · number ${q(en.number)} · navLabel EN ${q(en.navLabel)} | DE ${q(de.navLabel)}`,
    pair("heading", en.heading, de.heading),
  ];
  (en.body ?? []).forEach((b, n) => lines.push(...blockLines(n, b, de.body[n])));
  if (en.designQuestion) lines.push(pair("designQuestion", en.designQuestion, de.designQuestion));
  (en.insights ?? []).forEach((ins, n) => {
    lines.push(pair(`insights[${n}].heading`, ins.heading, de.insights[n].heading));
    lines.push(pair(`insights[${n}].body`, ins.body, de.insights[n].body));
  });
  (en.testing ?? []).forEach((step, n) => {
    lines.push(pair(`testing[${n}].label`, step.label, de.testing[n].label));
    lines.push(pair(`testing[${n}].body`, step.body, de.testing[n].body));
  });
  (en.images ?? []).forEach((img, n) => {
    const src = img.src ? `src ${img.src}` : "no src — renders as a hatched placeholder box";
    const caption = img.caption === de.images[n].caption ? `caption EN/DE (same) ${q(img.caption)}` : `caption EN ${q(img.caption)} | DE ${q(de.images[n].caption)}`;
    lines.push(`images[${n}] — aspect ${img.aspect} · ${caption} · ${src}`);
  });
  return lines;
}

function studyBlock(n, en, de) {
  const lines = [
    "",
    `### 5.${n} ${en.name} — \`src/lib/caseStudies/${en.slug}.ts\``,
    "",
    "```",
    `### ${en.slug}.en / .de`,
    pair("name", en.name, de.name),
    pair("projectTag", en.projectTag, de.projectTag),
    pair("headline", en.headline, de.headline),
    pair("summary", en.summary, de.summary),
    ...(() => {
      const label = `tags[0..${en.tags.length - 1}]`;
      const en_ = en.tags.map(q).join(" / ");
      const de_ = de.tags.map(q).join(" / ");
      return en_ === de_
        ? [`${label} — EN/DE (same): ${en_}`]
        : [`${label} — EN: ${en_}`, `${" ".repeat(label.length + 3)}DE: ${de_}`];
    })(),
    pair("role", en.role, de.role),
    pair("contribution", en.contribution, de.contribution),
    pair("type", en.type, de.type),
    pair("year", en.year, de.year),
    pair("tools", en.tools, de.tools),
    pair("deliverables", en.deliverables, de.deliverables),
    `heroImage.src — ${en.heroImage.src} (aspect ${en.heroImage.aspect}) — see IMAGES for whether this file is a real export`,
    pair("heroImage.alt", en.heroImage.alt, de.heroImage.alt),
  ];
  if (en.heroDisclosure || de.heroDisclosure) {
    lines.push(`heroDisclosure — EN: ${en.heroDisclosure ? q(en.heroDisclosure) : "(missing)"} | DE: ${de.heroDisclosure ? q(de.heroDisclosure) : "(missing — ISSUE-009)"}`);
  }
  en.sections.forEach((s, i) => lines.push(...sectionBlock(i, s, de.sections[i])));
  lines.push("```");
  return lines;
}

const { getCaseStudy } = await loadCaseStudies();

const header = [
  "## 5. Case studies (`/work/<slug>`)",
  "",
  "Each case study is a separate file with an `en` and `de` object. Below, every text field",
  "is listed per project, in page order (hero → sections in the order they appear).",
  "",
  "Each entry of a section's `body[]` is a **block**. A block is either a plain string (a",
  "paragraph) or an object with a `kind`:",
  "",
  "- `paragraph` — body text.",
  "- `sub-heading` — `{ kind: \"h3\", text }`, rendered larger and bolder than body text.",
  "- `list` — `{ kind: \"list\", items[], ordered? }`, rendered as bullets (or numbers).",
  "- `note` — `{ kind: \"note\", text }`, a small aside in a bordered box (disclosures, stats).",
  "- `quote` / `figure` — available in the model, not used by any case study yet.",
  "",
  "Rewriting a section can change how many blocks it has, so **the `body[n]` numbers below",
  "are only valid for the current text**. This part of the guide is generated — after any",
  "content change, rerun `node scripts/content-guide-case-studies.mjs --write` to refresh it.",
];

const body = SLUGS.flatMap((slug, i) => studyBlock(i + 1, getCaseStudy(slug, "en"), getCaseStudy(slug, "de")));
const out = [...header, ...body, "", "---", "", ""].join("\n");

if (process.argv.includes("--write")) {
  const guide = readFileSync(GUIDE, "utf8");
  const start = guide.indexOf("## 5. Case studies");
  const end = guide.indexOf("## 6. Case-study shared UI labels");
  if (start < 0 || end < 0 || end < start) throw new Error("could not locate section 5 in CONTENT_GUIDE.md");
  writeFileSync(GUIDE, guide.slice(0, start) + out + guide.slice(end));
  console.error("CONTENT_GUIDE.md section 5 regenerated");
} else {
  process.stdout.write(out);
}
