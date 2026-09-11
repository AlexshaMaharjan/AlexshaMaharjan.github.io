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
 * **3. The playground's two locales drifting apart** (SESSION-033, narrowed in
 * SESSION-034). It diffs `src`, `video` and `aspect` across `en` and `de` for
 * every category item.
 * `image-manifest.mjs` does that for case studies and dictionaries but **not
 * for playground categories** — it reads only `en` there, so a slot filled in
 * one locale and missed in the other reports as filled. It also asserts that
 * every clip has a poster, which is the entire fallback for a reader with
 * `prefers-reduced-motion` set.
 *
 * Both faults were real: SESSION-027 rearranged AFONO's blocks with a regex
 * matched only by *shape* — `figures` immediately followed by `list` — and it
 * matched the wrong pairs, moving the English collection list into §03 and the
 * German one into the English §06. It shipped in two commits. `tsc`, ESLint,
 * axe, the image sweep and the en/de source diff were all green throughout,
 * because none of them reads prose.
 *
 * **4. A collage note pointing at a picture that is not there.** A note names
 * its slot by `src` and is placed from that; a `src` with a typo in it silently
 * becomes a note in the middle of the card with an arrow to nowhere.
 *
 * **5. An arrow drawn across a picture** (`ISSUE-043`, SESSION-040). The notes
 * are placed and their arrows routed by arithmetic, so "does this card look
 * right" is a question with a number behind it, and it is a number that three
 * sessions have moved in both directions. It is checked here rather than left
 * to the eye.
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
const pgCats = await load("src/lib/playground/categories/index.ts", "pg-cats");
const collage = await load("src/lib/playground/collage.ts", "pg-collage");
const place = await load("src/lib/playground/placeScribbles.ts", "pg-place");

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
 * The playground (SESSION-034).
 * ---------------------------------------------------------------------------
 *
 * SESSION-033 checked five cross-file links here: the registry against a second
 * list in `home.ts`, a next-category ring, and every project's category. All
 * three are **gone**, because the pages they linked are gone — the playground is
 * one page and the categories are sections of it (`DECISION-026`). A check for
 * a link that no longer exists is not a safety net, it is a thing to maintain.
 *
 * What survives is the pair nothing else can see: `en`/`de` parity across the
 * category items, which `image-manifest.mjs` misses because it reads only `en`
 * there, and the poster rule for clips.
 */
const registrySlugs = pgCats.categorySlugs;

for (const slug of registrySlugs) {
  const [e, d] = ["en", "de"].map((l) => pgCats.getCategory(slug, l));
  if (!e || !d) { fail(`playground ${slug}: missing in one locale`); continue; }

  if (e.items.length !== d.items.length) {
    fail(`playground ${slug}: ${e.items.length} items in en, ${d.items.length} in de`);
    continue;
  }
  for (const [i, item] of e.items.entries()) {
    const other = d.items[i];
    if (item.src !== other.src)
      fail(`playground ${slug} items[${i}]: en "${item.src ?? "(none)"}" vs de "${other.src ?? "(none)"}"`);
    if (item.video !== other.video)
      fail(`playground ${slug} items[${i}]: video en "${item.video ?? "(none)"}" vs de "${other.video ?? "(none)"}"`);
    if (item.aspect !== other.aspect)
      fail(`playground ${slug} items[${i}]: aspect en "${item.aspect}" vs de "${other.aspect}"`);
    if (Boolean(item.note) !== Boolean(other.note))
      fail(`playground ${slug} items[${i}]: a written note in one locale only`);

    /*
     * A clip without a poster is a black rectangle for everyone who has
     * `prefers-reduced-motion` set, because `ui/LoopVideo` deliberately never
     * creates the `<video>` for them — the poster is the whole fallback.
     */
    for (const [loc, it] of [["en", item], ["de", other]]) {
      if (it.video && !it.src)
        fail(`playground ${slug} items[${i}] ${loc}: has a video but no poster \`src\``);
    }
  }
}

/*
 * **4. A note pointing at nothing** (SESSION-038). A collage scribble names the
 * slot it is about by `src`, and `lib/playground/placeScribbles` reads that to
 * work out where the note can sit and where its arrow lands. A `src` that is
 * not on the card is not an error anywhere — the note falls back to the middle
 * of the frame and the arrow points at the middle of nothing, which looks like
 * a placement bug rather than a typo. Nothing else in the harness reads these:
 * `tsc` sees a `string`, and axe never sees the note at all because it is
 * decorative and `aria-hidden`.
 */
for (const card of collage.default) {
  const slots = new Set(card.slots.map((slot) => slot.src));
  for (const note of card.scribbles) {
    if (!slots.has(note.target))
      fail(`collage ${card.index}: note ${JSON.stringify(note.text.en)} targets "${note.target}", not a slot on this card`);
    if (!note.text.en || !note.text.de) fail(`collage ${card.index}: a note is written in one locale only`);
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(card.accent)) fail(`collage ${card.index}: accent "${card.accent}" is not a #rrggbb colour`);
}

/*
 * **5. An arrow drawn across a picture** (`ISSUE-043`). `placeScribbles` scores
 * a seat for a note partly on how much of its arrow would lie over the other
 * pictures, and picks the route with the clearest run — so this is a check that
 * the search still finds one, not a restatement of what it does.
 *
 * The tolerance is a graze, not a crossing. An arrow that clips the corner of a
 * picture for a few pixels is a pen stroke passing close; the fault this exists
 * to catch is a line lying across a photograph, which measured 394 CSS px on
 * card 1 before the routing was written.
 *
 * Five stage widths, because the notes are fixed CSS pixels over a stage that
 * is not, and the placement is different at every one of them (`ISSUE-043`
 * cause 2). 1280 alone was what let the narrow cards ship broken.
 */
const OVER_PX = 40;
for (const stage of [1440, 1280, 1100, 1000, 900]) {
  const unitsPerPx = place.stageUnits(stage);
  for (const card of collage.default) {
    for (const note of place.placeScribbles(card.slots, card.scribbles, unitsPerPx)) {
      const target = card.scribbles.find((one) => one.text.en === note.key)?.target;
      const others = card.slots.filter((slot) => slot.src !== target);
      const over = place.crossingOf(note.samples, others) / unitsPerPx;
      if (over > OVER_PX)
        fail(
          `collage ${card.index} at a ${stage}px stage: the arrow for ${JSON.stringify(note.key)} ` +
            `runs ${over.toFixed(0)} CSS px over another picture (limit ${OVER_PX})`,
        );
      /*
       * And that no stroke leaves the card, which is `overflow: hidden`: a bend
       * wide enough to clear three pictures took one arrow up over the frame's
       * top edge, and what reached the page was two strokes with a gap where
       * the middle should have been.
       */
      const outside = Math.max(
        ...note.samples.map((point) =>
          Math.max(-point.x, point.x - collage.FRAME_W, -point.y, point.y - collage.FRAME_H),
        ),
      );
      if (outside > 0)
        fail(
          `collage ${card.index} at a ${stage}px stage: the arrow for ${JSON.stringify(note.key)} ` +
            `is drawn ${(outside / unitsPerPx).toFixed(0)} CSS px outside the card, where it is clipped`,
        );
    }
  }
}

if (findings) {
  console.log(`\n${findings} finding(s)`);
  process.exit(1);
}
console.log(`content audit: ${SLUGS.length} case studies — language and en/de block shape agree`);
console.log(`               ${registrySlugs.length} playground categories — en/de items, aspects, clips and posters agree`);
console.log(
  `               ${collage.default.length} collage cards — every note points at a slot on its own card`,
);
console.log(
  `               ${collage.default.length * 5} card layouts — no arrow runs more than ${OVER_PX} CSS px over another picture, none leaves the card`,
);
