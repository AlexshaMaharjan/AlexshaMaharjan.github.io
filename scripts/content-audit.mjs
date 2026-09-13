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
 * **6. An arrow too short to read as one** (`MILESTONE-012`). Checks 4 and 5
 * are both about where a stroke goes, and neither can see one that is two
 * pixels long. Seven of the eleven notes had a stage width at which they drew
 * exactly that.
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
const collage = await load("src/lib/playground/collage.ts", "pg-collage");
const place = await load("src/lib/playground/placeScribbles.ts", "pg-place");

/*
 * The six, in the owner's running order — read from `caseStudies/index.ts`
 * rather than typed here (`MILESTONE-022` task 3). It was a hand-written copy
 * of that list in three scripts, and a re-cut of the order left all three
 * reporting the old one.
 */
const SLUGS = cs.caseStudySlugs;

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
  : b.kind === "list" || b.kind === "steps" ? (b.items ?? [])
  : b.kind === "figures" ? []
  // A split carries a heading and its own paragraphs; a cards block carries
  // three of everything. Both were invisible to this check until the owner's
  // second pass moved real prose into them.
  : b.kind === "split" ? [b.heading ?? "", ...(b.body ?? [])]
  : b.kind === "cards"
    ? (b.items ?? []).flatMap((c) => [c.label ?? "", c.heading ?? "", c.body ?? "", c.needs ?? ""])
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
 * The playground (SESSION-034, rewritten in `MILESTONE-014`).
 * ---------------------------------------------------------------------------
 *
 * This used to audit `lib/playground/categories`: `en`/`de` parity across 47
 * items, their aspects, and the poster rule for clips. **Those files are gone.**
 * They had had no renderer since `DECISION-027` and were kept on the grounds
 * that they were the only written record of the captions — which was not true
 * either, because the collage slots carry their own. Auditing content nothing
 * renders is how it survived two sessions after it stopped being content.
 *
 * What replaces it audits the thing that *is* rendered. `en`/`de` parity is no
 * longer checkable-by-comparison, because a collage slot holds both locales on
 * one object and cannot drift apart — so the check that matters is that neither
 * side is **empty**. A missing German caption is not a type error (the key is
 * there, the string is `""`), it is a blank heading over a picture in the
 * viewer, and a blank `alt` is an image a screen reader cannot describe.
 *
 * The poster rule survives, because it survives the move: `ui/LoopVideo`
 * deliberately never creates the `<video>` under `prefers-reduced-motion`, so a
 * clip without a poster is a black rectangle for those visitors.
 */
const slotSrcs = new Map();

for (const card of collage.default) {
  for (const [i, slot] of card.slots.entries()) {
    const at = `collage ${card.index} slots[${i}] (${slot.src})`;

    for (const field of ["caption", "alt"]) {
      for (const loc of ["en", "de"]) {
        const value = slot[field]?.[loc];
        if (typeof value !== "string" || !value.trim())
          fail(`${at}: ${field}.${loc} is empty`);
      }
    }

    if (!slot.src) fail(`${at}: no \`src\``);
    if (slot.video && !slot.src)
      fail(`${at}: has a video but no poster \`src\``);
    /*
     * `film` is the whole clip the viewer fetches on open (`DECISION-030`); a
     * slot that offers one without a short loop on the card is a slot whose
     * picture never moves and then plays a minute of footage when opened.
     */
    if (slot.film && !slot.video)
      fail(`${at}: has a \`film\` but no \`video\` loop on the card`);

    if (slotSrcs.has(slot.src))
      fail(`${at}: this picture is already on card ${slotSrcs.get(slot.src)}`);
    else slotSrcs.set(slot.src, card.index);
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
 * A **sweep** of stage widths, because the notes are fixed CSS pixels over a
 * stage that is not, and the placement is different at every one of them
 * (`ISSUE-043` cause 2). 1280 alone was what let the narrow cards ship broken.
 *
 * Five hand-picked widths was the next version of the same mistake, and it hid
 * a real defect for a whole session. The list was `[1440, 1280, 1100, 1000,
 * 900]`, and **the stage is never as wide as the window**: at a 1440px window
 * the card measures 1,256 and at 1920 it measures 1,278, so 1440 tested a
 * layout that cannot occur and nothing tested the one nearly every desktop
 * actually gets. At 1,256 the card-1 calendar note was 8,900 units from its
 * picture with 234px of arrow lying across other photographs, and the audit
 * was green.
 *
 * So the widths are swept rather than chosen: 900 to 1320 in 20px steps, which
 * is every stage the deck produces between the container query's floor and the
 * widest card a 4K window makes. It is 22 widths against four cards and costs
 * about a second.
 *
 * **900, not 860.** The notes and their arrows share one `.collage-scribble`
 * gate — `@container (min-width: 900px) and (min-height: 563px)` — and 563 is
 * 900/1.6, the height below which the stage stops being width-bound. So 900 is
 * the narrowest stage that ever shows a note, and the two widths below it were
 * testing a layout nobody can see.
 */
const OVER_PX = 40;
/** See check 6, below. */
const MIN_ARROW_PX = 20;
const STAGES = [];
for (let stage = 900; stage <= 1320; stage += 20) STAGES.push(stage);
for (const stage of STAGES) {
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
      /*
       * **6. An arrow too short to be one** (`MILESTONE-012` task 2).
       *
       * The two checks above are both about where a stroke goes and neither
       * of them can see a stroke that barely exists: a two-pixel arrow crosses
       * no picture and leaves no card, so it passed every time. Seven of the
       * eleven notes had a stage width at which they drew one — the worst was
       * 0.3px — and what reaches the page there is a note with a speck beside
       * it, which reads as a note about nothing.
       *
       * `placeScribbles` prices this now (`shortRun`), so like check 5 this is
       * a check that the search still finds a seat with room, not a
       * restatement of what it does. The floor is deliberately well under
       * `MIN_RUN_PX`: the placement *aims* at 80px and pays to get there, and
       * a card with no seat that allows 80 should ship its best effort rather
       * than fail the build.
       *
       * **20 is a ratchet, not a target.** It was 12, set just under the 13px
       * the deck drew at the time, and `ISSUE-053` was the open question about
       * the nine placements that needed it. `MILESTONE-020` task 3 fixed three
       * faults behind those, none of them tuning:
       *
       * - `GAP`, the air between a note and its picture, was in **design
       *   units** while the two gaps that consume it are in CSS pixels, so it
       *   shrank as the card narrowed and there was nothing left to draw with
       *   below about 1,100px (`GAP_PX`);
       * - `shortRun` charged a flat rate per pixel short, which priced a 70px
       *   arrow and a 17px speck the same way per pixel and let the speck
       *   outbid a clear seat one corner away (`FLOOR_RUN_PX`);
       * - the tip and start gaps took a fixed 42px of air off every shaft,
       *   however little room the seat had — 61% of it, on the worst one
       *   (`AIR_SHARE`).
       *
       * Measured over these 242 placements, with the owner's own note texts and
       * their own `prefer` corners both left exactly as written: the shortest
       * arrow went **16px → 23px**, the tenth percentile **16 → 35**, and the
       * count under 40px **66 → 41**.
       *
       * **It reached 34px / 45 / 9 at one point, and that version is not what
       * ships.** It depended on three of the notes being trimmed from three
       * lines to two, and the owner asked for their wording back
       * (*"you changed the text beside the arrows, i liked the previous one"*).
       * Which settles it: the words are content and the arrow is decoration.
       *
       * The floor that remains is arithmetic rather than a shortfall. The
       * shortest arrow on the deck belongs to card 1's calendar note, whose
       * picture sits about 122 CSS px above the foot of the card while the note
       * itself is three lines — 64px — tall. That leaves 39px of separation, of
       * which `AIR_SHARE` lets the tip and start gaps take 42%. No corner
       * improves it: every one was swept, and the two that free the axis put the
       * note in a region full of photographs and draw 8px instead.
       *
       * 20 is under the 23 that ships, for the same reason 12 was under 13.
       */
      const chord = Math.hypot(
        note.samples[note.samples.length - 1].x - note.samples[0].x,
        note.samples[note.samples.length - 1].y - note.samples[0].y,
      ) / unitsPerPx;
      if (chord < MIN_ARROW_PX)
        fail(
          `collage ${card.index} at a ${stage}px stage: the arrow for ${JSON.stringify(note.key)} ` +
            `is only ${chord.toFixed(0)} CSS px long (floor ${MIN_ARROW_PX})`,
        );
    }
  }
}

if (findings) {
  console.log(`\n${findings} finding(s)`);
  process.exit(1);
}
console.log(`content audit: ${SLUGS.length} case studies — language and en/de block shape agree`);
console.log(
  `               ${slotSrcs.size} collage slots — every caption and alt written in both locales, every clip has a poster, no picture on two cards`,
);
console.log(
  `               ${collage.default.length} collage cards — every note points at a slot on its own card`,
);
console.log(
  `               ${collage.default.length * STAGES.length} card layouts (stages ${STAGES[0]}-${STAGES[STAGES.length - 1]}px) — no arrow runs more than ${OVER_PX} CSS px over another picture, none leaves the card, none is shorter than ${MIN_ARROW_PX} CSS px`,
);
