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

if (findings) {
  console.log(`\n${findings} finding(s)`);
  process.exit(1);
}
console.log(`content audit: ${SLUGS.length} case studies — language and en/de block shape agree`);
