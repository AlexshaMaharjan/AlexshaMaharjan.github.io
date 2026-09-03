# Previous Session

**SESSION-022** — 2026-09-03. Full record: `docs/sessions/session_022.md`.

## What it did

**Re-shot WikiMind's figures from originals the owner supplied**, in `Images/wikimind/` —
fourteen files exported from the design files themselves rather than rendered from
`DesPr1_Alexsha_Maharjan_Doku.pdf`. Every one is placed at **its own aspect ratio**, which is
what the session was asked for: the placeholder changes shape to fit the image, never the
reverse.

**138 slots, 51 filled** (was 136 / 48). WikiMind went from 16 slots with 3 hatched to **18
with 2** — the moodboard slot had been hatched since the manifest was written and is now
filled, and two images had no slot at all: `[ initial sketches ]` and `[ component library ]`.

## The thing worth carrying forward

**An owner-supplied export beats a page render, every time.** A PDF page is a photograph of a
document — its margins, its compression, whatever crop the layout imposed. These PNGs are the
artefacts. They are sharper, they are uncropped, and three of them show figures the PDF never
contained. **Before exporting anything from a documentation, ask whether an export already
exists.** The remaining three projects have not been asked this question.

**Every declared aspect ratio was wrong.** Not approximately — none of the fourteen matched the
file it was about to hold. They were designers' round numbers (`3/4`, `16/8`, `27/10`), and
`ui/Media` paints with `object-cover`, so each mismatch was a silent crop waiting to happen.
The personas were declared `3/4` portrait and are actually landscape: 40% of every card would
have been thrown away. Aspects now carry exact pixel ratios — `1600/1131`, `1200/1805` — because
a number measured from the file cannot drift from it.

**Aspect drives layout, so changing aspects re-arranged the page.** `SectionMedia` gives the
full column to anything ≥ 1.5 and grids everything else. Six slots crossed that line; figure
order was re-ordered to suit, and the three personas carry `wide: true` — the project's first
use of that flag — because at a third of the column a persona card is 217px tall and nothing
on it can be read.

## What it left for the owner

- **`ISSUE-032`** — the persona cards ship their stock/AI portraits, and the moodboard is half
  other people's images. `DECISION-016` makes this the owner's call; four options are written up.
- **`/work/wikimind` is now the heaviest page on the site** — 637 KB, 463 KB of it imagery, at
  1440/1x. Re-encoding the photographic figures at q0.78–0.82 took 390/3x from 904 to 796 KB.
  Dropping `wide: true` from the personas would save ~120 KB and make them unreadable. That is a
  trade, so it is reported, not taken.
- **`[ prototype video ]` and `[ interface detail ]` still use SESSION-019's PDF crops** — the
  folder had no replacement. Next to the new exports they are visibly softer. If originals exist
  for those two, they are the cheapest remaining win on this page.

## Verified

Against the production build through `scripts/verify/serve.mjs`: routes 36/36; **152 images
across 36 routes at dpr 1, 2 and 3**, 0 broken, 0 missing `alt`, 0 failed requests, per-route
counts identical at all three densities; axe 0 violations; 0 overflow; reduced motion static;
`tsc` clean; lint 0 errors (3 pre-existing warnings); `image-manifest.mjs` exits 0 on en/de
parity. All four changed sections screenshotted at 1440px and read.

## One mistake

The first image sweep ran **without `serve.mjs` started**, so 36 routes navigated to a refused
connection and timed out silently for twenty minutes. `run.mjs` neither starts the server nor
checks it is there. One `fetch` of the base URL before the sweep would make that failure legible.
