/**
 * Checks the case-study content model for two faults nothing else can see.
 *
 *   node scripts/content-audit.mjs
 *
 * **1. A body block written in the wrong language.** `image-manifest.mjs` diffs
 * the `src` of every figure across `en` and `de`, so a mismatched image is
 * caught — but prose is never compared, because it is *supposed* to differ.
 * A German list sitting in the English object therefore renders happily and
 * passes every check in the harness, including axe.
 *
 * **2. `en` and `de` sections that no longer have the same shape.** If one
 * locale has a list the other lacks, or their figure groups sit at different
 * points in the body, the two pages have quietly diverged.
 *
 * **3. The playground's structure disagreeing with itself** (SESSION-033).
 * Five separate files have to say the same thing about five categories:
 * `categories/index.ts` sets the order, `home.ts` lists them again for the
 * marquee, each category names the next one in the ring, and a project names
 * the category it belongs to. **Every one of those links fails silently.**
 * `PlaygroundIndex` does `if (!category) return null`, so a stale slug in
 * `home.ts` deletes a whole row and renumbers the ones after it; a stale
 * `nextCategorySlug` 404s the "next" link; a stale `categorySlug` 404s a
 * project. None of it is a type error, because they are all just strings.
 *
 * It also diffs `src` across `en` and `de` for every category item.
 * `image-manifest.mjs` does that for case studies and dictionaries but **not
 * for playground categories** — it reads only `en` there, so a slot filled in
 * one locale and missed in the other reports as filled.
 *
 * Both faults were real: SESSION-027 rearranged AFONO's blocks with a regex
 * matched only by *shape* — `figures` immediately followed by `list` — and it
 * matched the wrong pairs, moving the English collection list into §03 and the
 * German one into the English §06. It shipped in two commits. `tsc`, ESLint,
 * axe, the image sweep and the en/de source diff were all green throughout,
 * because none of them reads prose.
 *
 * Exits non-zero on any finding.
 */
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const dir = mkdtempSync(path.join(tmpdir(), "content-audit-"));
const outfile = path.join(dir, "caseStudies.mjs");
await build({
  entryPoints: [path.join(ROOT, "src/lib/caseStudies/index.ts")],
  bundle: true, format: "esm", outfile, logLevel: "error",
});
const cs = await import(pathToFileURL(outfile).href);

/** Bundle one more entry point through the same esbuild pass. */
async function load(entry, name) {
  const out = path.join(dir, `${name}.mjs`);
  await build({ entryPoints: [path.join(ROOT, entry)], bundle: true, format: "esm", outfile: out, logLevel: "error" });
  return import(pathToFileURL(out).href);
}
const pgHome = (await load("src/lib/playground/home.ts", "pg-home")).default;
const pgCats = await load("src/lib/playground/categories/index.ts", "pg-cats");
const pgProjects = await load("src/lib/playground/projects/index.ts", "pg-projects");

const SLUGS = ["wikimind", "afono", "sync-fm", "barrier-free-kitchen", "surugami", "qis-portal"];

/*
 * Function words only. Content words are cognates or loanwords far too often
 * ("Design", "Prototyp", "Interface"), and a case study about a German project
 * is full of them in both locales.
 */
const DE = /\b(und|oder|der|die|das|den|dem|mit|für|von|nicht|wurde|wurden|werden|eine|einen|einem|durch|über|auch|sowie|zwischen|inspiriert|basierend|jedoch)\b/i;
const EN = /\b(the|and|with|from|that|which|were|was|through|using|based|inspired|between|however|their)\b/i;

/**
 * The strings a block contributes, **separately**.
 *
 * A list is not joined: joining hides one wrong item among three right ones,
 * which is exactly what the first version of this check did — it passed a
 * German line re-injected into an English list because the other three items
 * carried enough English to satisfy the test.
 */
const textsOf = (b) =>
  typeof b === "string" ? [b]
  : b.kind === "list" ? (b.items ?? [])
  : b.kind === "figures" ? []
  : [b.text ?? ""];

const shapeOf = (b) => (typeof b === "string" ? "p" : b.kind);

let findings = 0;
const fail = (msg) => { console.log(`  ✗ ${msg}`); findings++; };

for (const slug of SLUGS) {
  const loaded = await cs.caseStudyPromise(slug);
  const [en, de] = ["en", "de"].map((l) => cs.localeContent(loaded, l));

  for (const [loc, content] of [["en", en], ["de", de]]) {
    for (const sec of content.sections) {
      for (const [i, block] of (sec.body ?? []).entries()) {
        for (const text of textsOf(block)) {
          // Short strings are too easy to misread — a four-word list item can
          // legitimately carry no function word at all.
          if (text.length < 40) continue;
          const looksDe = DE.test(text), looksEn = EN.test(text);
          const wrong = loc === "en" ? looksDe && !looksEn : looksEn && !looksDe;
          if (wrong) {
            fail(`${slug} ${loc} §${sec.number} body[${i}] (${shapeOf(block)}) reads as the other language:`);
            console.log(`      ${text.slice(0, 96)}`);
          }
        }
      }
    }
  }

  // Structural parity: same sections, and the same sequence of block kinds.
  if (en.sections.length !== de.sections.length) {
    fail(`${slug}: ${en.sections.length} sections in en, ${de.sections.length} in de`);
    continue;
  }
  for (const [i, secEn] of en.sections.entries()) {
    const secDe = de.sections[i];
    if (secEn.id !== secDe.id) { fail(`${slug} section ${i}: id "${secEn.id}" vs "${secDe.id}"`); continue; }
    const a = (secEn.body ?? []).map(shapeOf).join(",");
    const b = (secDe.body ?? []).map(shapeOf).join(",");
    if (a !== b) fail(`${slug} §${secEn.number} body shape differs — en [${a}] vs de [${b}]`);
  }
}

/*
 * ---------------------------------------------------------------------------
 * The playground's five cross-file links (SESSION-033).
 * ---------------------------------------------------------------------------
 */
const registrySlugs = pgCats.categorySlugs;

for (const loc of ["en", "de"]) {
  // 1. home.ts lists the same categories, in the same order, as the registry.
  const listed = pgHome[loc].categories.map((c) => c.slug);
  if (listed.join(",") !== registrySlugs.join(",")) {
    fail(`playground ${loc}: home.ts categories differ from the registry`);
    console.log(`      home.ts:  [${listed.join(", ")}]`);
    console.log(`      registry: [${registrySlugs.join(", ")}]`);
  }

  // 2. Each listed title matches the category's own title, so the marquee and
  //    the page it leads to cannot call the same thing two different names.
  for (const entry of pgHome[loc].categories) {
    const cat = pgCats.getCategory(entry.slug, loc);
    if (!cat) { fail(`playground ${loc}: home.ts names "${entry.slug}", which no category answers to`); continue; }
    if (cat.title !== entry.title)
      fail(`playground ${loc} ${entry.slug}: home.ts says "${entry.title}", the category says "${cat.title}"`);
  }

  // 3. nextCategorySlug forms one complete ring over every category.
  const seen = [];
  let at = registrySlugs[0];
  for (let i = 0; i < registrySlugs.length; i++) {
    const cat = pgCats.getCategory(at, loc);
    if (!cat) { fail(`playground ${loc}: "${at}" is not a category`); break; }
    if (seen.includes(at)) break;
    seen.push(at);
    const next = pgCats.getCategory(cat.nextCategorySlug, loc);
    if (!next) {
      fail(`playground ${loc} ${at}: nextCategorySlug "${cat.nextCategorySlug}" 404s`);
      break;
    }
    if (next.title !== cat.nextCategoryTitle)
      fail(`playground ${loc} ${at}: nextCategoryTitle "${cat.nextCategoryTitle}" but "${cat.nextCategorySlug}" is "${next.title}"`);
    at = cat.nextCategorySlug;
  }
  if (seen.length !== registrySlugs.length || at !== registrySlugs[0])
    fail(`playground ${loc}: the next-category ring covers ${seen.length} of ${registrySlugs.length} — [${seen.join(" → ")}]`);

  // 4. Every project points at a category that exists.
  for (const slug of pgProjects.projectSlugs) {
    const project = pgProjects.getProject(slug, loc);
    const cat = pgCats.getCategory(project.categorySlug, loc);
    if (!cat) { fail(`playground ${loc} project ${slug}: categorySlug "${project.categorySlug}" 404s`); continue; }
    if (cat.title !== project.categoryTitle)
      fail(`playground ${loc} project ${slug}: categoryTitle "${project.categoryTitle}" but the category is "${cat.title}"`);
  }
}

// 5. en/de item parity — same count, same src at each index. image-manifest.mjs
//    reads only `en` for categories, so this is the only check that sees it.
for (const slug of registrySlugs) {
  const [e, d] = ["en", "de"].map((l) => pgCats.getCategory(slug, l));
  if (e.items.length !== d.items.length) {
    fail(`playground ${slug}: ${e.items.length} items in en, ${d.items.length} in de`);
    continue;
  }
  for (const [i, item] of e.items.entries()) {
    if (item.src !== d.items[i].src)
      fail(`playground ${slug} items[${i}]: en "${item.src ?? "(none)"}" vs de "${d.items[i].src ?? "(none)"}"`);
    if (Boolean(item.slug) !== Boolean(d.items[i].slug))
      fail(`playground ${slug} items[${i}]: project link present in one locale only`);
  }
}

if (findings) {
  console.log(`\n${findings} finding(s)`);
  process.exit(1);
}
console.log(`content audit: ${SLUGS.length} case studies — language and en/de block shape agree`);
console.log(`               ${registrySlugs.length} playground categories — order, ring, titles and en/de srcs agree`);
