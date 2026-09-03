# SESSION-022 — WikiMind, re-shot from the owner's own exports

Date: 2026-09-03
Branch: `milestone-003-content-model`
Asked for: replace WikiMind's images with better ones supplied in `Images/wikimind/`, placed at
**the aspect ratio of the real image rather than the placeholder** — the placeholder may change
shape to fit the image, not the other way round.

## What the folder turned out to contain

Fourteen PNGs and one JPG, exported by the owner from the design files themselves rather than
rendered from `DesPr1_Alexsha_Maharjan_Doku.pdf`. That distinction is the useful finding of
this session. A page render is a photograph of a document — it carries the document's white
margins, its compression, and whatever crop the page layout imposed. An export is the artefact.

Twelve of the fourteen mapped onto slots that already had a PDF-derived figure. **Two had no
slot at all**, and one filled a slot that had been hatched since the manifest was written:

| Image | Slot | Was |
| --- | --- | --- |
| `Moodboard.png` | `[ moodboard ]` | hatched since SESSION-019 |
| `InitialSketches.jpg` | `[ initial sketches ]` | **new slot** |
| `Components.png` | `[ component library ]` | **new slot** |

WikiMind therefore went from 16 slots with 3 hatched to **18 with 2**. The two that remain —
`[ competitor analysis ]` and `[ wireframes ]` — have no corresponding image in the folder and
no figure in the documentation, so they stay hatched under `DECISION-006`.

## Aspect ratios: what actually had to change

`ui/Media` sets `aspectRatio` from the data and paints the image with `object-cover`, so
**any mismatch between the declared aspect and the file's own is a silent crop**. Every declared
aspect was a designer's round number — `3/4`, `16/8`, `4/3`, `27/10` — and not one of them
matched the file it was about to hold. The personas are the clearest case: declared `3/4`
portrait, actually 2000×1414 landscape. Under `object-cover` that would have thrown away 40% of
each card.

So every slot now declares the exported file's exact pixel ratio — `1600/1131`, `1400/1153`,
`1200/1805`. Unlovely to read, and correct by construction: the number in the data is measured
from the file rather than chosen for it.

**This changes layout, because `SectionMedia` groups by aspect.** Anything ≥ 1.5 takes the full
reading column; anything narrower packs into a grid. Six slots changed side of that line, so the
figure order was re-arranged to keep the results sane — the portrait sketch page is paired with
the moodboard rather than left alone at 960×1444, and the hatched `[ wireframes ]` box is paired
with the component library rather than sitting alone as a full-width band of nothing.

The three personas carry `wide: true`, the first use of that flag in the project's content. At a
third of the column they render 307×217, and a persona card is dense — name, quote, personality,
responsibilities, hobbies, education, online behaviour. At 217px tall none of it is legible, and
an illegible figure is decoration. This is `SUGGESTION-017` seen from the other side: the lone
figure taking the full column is usually the bug, and here it is the fix.

## Weight — the part worth arguing about

`/work/wikimind` is now **the heaviest page on the site**: 637 KB total, 463 KB of it imagery, at
1440/1x. It was 438 KB. Two causes, in order of size: three photographic persona cards rendering
at the full column instead of a third of it (~158 KB of the increase), and three more figures than
before.

Re-encoding cut what could be cut without a visible cost. The photographic material — personas,
the pencil scan, the moodboard, the component sheet — moved from WebP q0.9 to q0.78–0.82, checked
by eye at full size first; the flat vector boards stayed at 0.9, where they already cost 6–31 KB.
That took 390/3x from 904 KB to 796 KB. It did **not** move 1440/1x at all, and the reason is
worth recording: `image-variants.mjs` re-encodes every variant at a fixed 0.82, so the natural
file's quality only affects the bytes served at widths above the top of the ladder.

The remaining lever is `wide: true` on the personas — dropping it would save roughly 120 KB and
make the cards unreadable. **That is a design trade, not a defect**, so it is reported rather than
silently taken either way. There is no documented weight budget to test it against.

## Provenance — `ISSUE-032`

`DECISION-016` requires reading a document's sources before exporting from it, every time.
WikiMind has no sources page, but `image_sources.md` has carried a note since SESSION-016:
*"its persona photographs (9–11) are unattributed stock"*.

That note is why SESSION-019 exported the personas as a 3:4 crop that cut the portrait away.
That crop also cut the card's left edge mid-word and spilled into the following section — it was
a bad figure, and the aspect it was forced into is exactly what this session was asked to fix.
Showing the card whole is the better figure, and it puts the portrait back on the page.

The moodboard raises the same question in a harder form: roughly half its tiles are other
people's images, because that is what a moodboard is.

Neither is the clear-cut case `DECISION-016` was written for, and both turn on where the
portraits came from — a licence question the repository cannot answer. Raised as `ISSUE-032`
with four options rather than resolved unilaterally, which is the same treatment AFONO's
AI product imagery got.

## Also done

- **`image_crops.json` gained 13 entries and replaced 1.** WikiMind's ten section figures had
  never been recorded — the file held 35 entries for what was then 48 filled slots, because
  SESSION-019 exported them by hand. All fourteen exports are now recorded by source path,
  width, height and quality, so `image-treat.mjs` can reproduce every one of them.
- **`Images/` is git-ignored**, for the reason `ProjectsDokus/` lives outside the repository:
  source material does not ship, only finished exports do.
- Both dictionaries' prev/next card `imageAlt` and `imageAspect` were updated too. The hero is
  now a title card showing the homepage on a laptop, not the mascot, and the old alt described
  the old image.

## Verified against the production build

Server: `scripts/verify/serve.mjs` (gzip, Pages resolution order). All four checks green.

- routes 36/36, with `/work`, `/de/work` and two nonsense paths correctly 404
- **152 images across 36 routes at dpr 1, 2 and 3** — 0 broken, 0 missing `alt`, 0 `"Placeholder:"`
  alt, 0 failed image requests, per-route counts identical at all three densities.
  152 is exactly the expected 146 + 3 new filled slots × 2 locales.
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and fully visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing `react-refresh` warnings
- `image-manifest.mjs` exits 0 — `en` and `de` name an identical set of sources
- All four changed sections screenshotted at 1440px and read: every figure shows its full frame,
  none cropped, none stretched

## Mistake worth recording

The first image sweep was started **without `serve.mjs` running**. `run.mjs` takes its base URL
from a flag defaulting to `127.0.0.1:8099` and does not start or check the server, so all 36
routes navigated to a refused connection and sat out their timeouts. It produced no output for
twenty minutes and looked like a hang.

Nothing was wrong with the harness — the check was simply run against nothing. Worth a guard:
one `fetch` of the base URL before the sweep starts would turn twenty silent minutes into one
line. Not added this session, because the sweep was the thing being used rather than the thing
being worked on.

## Still open

- `[ competitor analysis ]` and `[ wireframes ]` — no source image exists for either
- `[ prototype video ]` and `[ interface detail ]` keep their SESSION-019 PDF crops, since the
  folder had no replacement. Side by side with the new exports they are visibly softer and
  letterboxed. **If the owner has originals for these two, they are the next easy win.**
- `ISSUE-032` — the personas and the moodboard
- `ISSUE-006` — the `og:image` and the About portrait
- 40 case-study figures across Surugami, the barrier-free kitchen and QIS Portal
- Nothing pushed. 39 commits ahead of `main` before this one.
