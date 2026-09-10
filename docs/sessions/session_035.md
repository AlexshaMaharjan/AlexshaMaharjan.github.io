# SESSION-035 — The playground becomes a deck of four Figma collages

Date: 2026-09-10
Objective: not from `next_session.md` — the owner arrived with a new direction for
`/playground`, twice in one session.
Decisions: `DECISION-027`
Amends: `DECISION-026` (its page shape; its picture rules stand)

## What the owner asked

First:

> "i want to change the playground page completely… i want the title nand description in
> the middle and rest gone. https://www.tanujashastri.com/#f1 … i want a card scroll
> animation like in this website, where a user scrolls and 4 cards stack on top of each
> other. each card eshould be the full length of the viewport. each cards should also have
> the background like in the playground page. for now leave the pages mpty i just want the
> nimtion to work."

Then, having seen it work, they filled the four cards in Figma and asked for those:

> "in this figma file, in page 2, there are 4 frames where images and videos are placed in
> a layout with the assets in the image folder. use them and place then in the 4 cards"

## What was built

**The deck** (`components/playground/CardStack.tsx`). Four `position: sticky` siblings in
one container. No JS in the stacking itself. See `DECISION-027` for the three traps —
one shared parent, stepped heights, a trailing spacer — each of which was hit before it was
understood.

**The collages** (`lib/playground/collage.ts`, `components/playground/Collage.tsx`).
Forty-eight slots traced from `Portfolio.fig` page 2, frames 1–4, holding the design's own
coordinates on its 16000 × 10000 canvas. Two layouts, chosen by a **container query on the
card's own aspect ratio**, not by a viewport breakpoint.

**Fifteen new assets**, all through the project's existing pipeline and all recorded in
`docs/reference/image_crops.json`:

| What | Out |
| --- | --- |
| `painting4.jpg` | `pg-painting-framed.webp` |
| nine `kalender/Artboard*.png` | `pg-kalender-{cover,februar,maerz,mai,juni,juli,september,oktober,dezember}.webp` |
| two screen captures | `pg-typography-posters.webp`, `pg-desmark-logo.webp` |
| a MindRuhe laptop mockup | `pg-mindruhe.webp` |
| `motorbikeVideoAnimation.mp4` | `pg-motorbike.mp4` + `pg-clip-motorbike.webp` |
| `HibiVideo/…13-16-11.mov` | `pg-hibi.mp4` + `pg-clip-hibi.webp` |

Two of these fill slots `next_session.md` had listed as **waiting for material that does
not exist**: the 3D motorbike and the Hibi application.

## Three things measurement caught that looking did not

**`--from` was a lie on any large source.** `scripts/video-clip.mjs` served the whole file
with no `accept-ranges`, so Chrome could not seek outside what it had buffered — and it does
not buffer 151 MB to oblige. Every seek snapped back to frame zero and recorded the opening
titles. `currentTime` reads back as `0.02` when this happens; that is the tell. Fixed by
adding Range support to the script's server.

**`sips` lied about `painting4.jpg`.** It reports 4000 × 3000; Chrome decodes it as
3000 × 4000. The first render squashed a portrait painting into a landscape box. This is the
same EXIF-rotation trap SESSION-030 recorded — **the browser's decode is the only truth.**

**Equal card heights collapsed the fan.** The deck looked right for its whole travel and
then, in the last 400px before it scrolled away, slid into a single flush pile. Nothing in
the code said so; only reading `getBoundingClientRect()` at five scroll positions did.

## Verification

`npm run verify all` against the production build: 22/22 routes, 414 images at DPR 1/2/3
with 0 broken and 0 missing alt, **axe 0 violations**, 0 horizontal overflow, reduced motion
clean. Content audit clean. Layout probed at 1920 × 1080, 1440 × 900, 1440 × 760, 820 × 1180
and 390 × 844, both locales.

`/playground` is **2630 KB** at 1440/1x — 810 KB of images and ~1.7 MB of clips that load
only as each comes on screen. It is the heaviest page on the site by some way, and that is
a deliberate trade for forty-eight pictures and five films.

## State at the end

Twenty-two routes, `tsc` clean, lint 0 errors. `Scrapbook.tsx` and `Tile.tsx` are no longer
rendered; the category data behind them is kept and still audited.
