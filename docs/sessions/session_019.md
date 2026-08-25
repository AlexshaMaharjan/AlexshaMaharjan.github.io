# SESSION-019 — The image pipeline, and WikiMind's figures

Date: 2026-08-25
Milestone: MILESTONE-005 / SUGGESTION-012
Status: Complete
Commits: `f78f2dc` (pipeline), `f0e2b3a`-ish (figures — see `git log`)

---

## Objective

From the hand-off: build the responsive image pipeline **before** the remaining slots, then
fill case-study figures one project end to end, then `og:image`.

## 1. The pipeline (`SUGGESTION-012`)

**Not `vite-imagetools`.** That plugin only sees files through the module graph, so it would
mean moving every image out of `public/` into `src/assets/` and rewriting every `src` string
in `src/lib/**` — the risk `SUGGESTION-012` names itself — and it pulls in `sharp`.

`scripts/image-variants.mjs` instead generates widths in the Chrome this project already
drives for verification, keeping `axe-core` the only devDependency it has ever had. The
images are already produced by script from `image_crops.json`, so emitting more sizes at the
same time costs nothing new. It writes `src/lib/imageVariants.ts`, and `ui/Image` builds a
`srcset` **only** for files listed there — an image dropped in by hand still renders, just at
full size until the script runs.

**A stale map would 404 inside a `srcset`, which is invisible in a browser**, so `predeploy`
now runs `--check` and refuses to build if the map is out of date. Proved by corrupting the
map and watching it exit 1.

Most of the work was telling `sizes` the truth at every call site — a bento tile is a
fraction of a 1120px grid, a hero lives in a 960px reading column, a section figure is a
column, a half or a third. `BentoGrid` derives its value from each tile's own `gridArea`.

**The bento case is the one worth remembering, because measuring at 1x would have hidden
it.** `index.css` collapses that grid to a single 520px column below 881px, so a tile
spanning four of ten columns still renders full width on a phone. Describing it as `40vw`
told a 3x screen it needed 515px when it needed 1050, and it was served a 640px file — soft,
on the device most likely to open this page first.

Imagery per page load, uncached:

| | before | 1x | 2x | 3x |
| --- | --- | --- | --- | --- |
| 1440px homepage | 203 KB | **85** | 192 | — |
| 390px homepage | 203 KB | **52** | 161 | 184 |

The honest reading: the large saving is at 1x, and at high DPR the win is smaller because the
device genuinely needs those pixels — but it now gets the right ones. Before, every device got
the same file whether that was twice what it needed or slightly less.

## 2. WikiMind's figures

Twelve of fifteen empty slots filled. **136 slots, 30 filled**, up from 18.

Three left as placeholders, which `DECISION-006` makes a designed state:

- **competitor analysis** and **wireframes** — no such figure exists in the documentation.
- **moodboard** — assembled from stock photography, and WikiMind's documentation is one of
  the two with no sources page to check against. `DECISION-016` keeps it off.

**The personas needed the same care.** Each card carries an unattributed stock portrait down
its left edge, so every crop starts to the right of it. The layout, the fields and the content
are the owner's; the photograph is not.

**Two slots had their declared aspect changed rather than their content cropped to fit** — the
manifest sanctions this and it is the honest direction. The colour-and-type page is 6/5, the
hand-drawn logo 27/10; forcing either into the assumed 4/3 cut the figure in half.

---

## Verification

- **110 images across 24 route/locale pairs** — none broken, none missing `alt`.
- **No failed image request at 1x, 2x or 3x** across 22 route/locale pairs. A `srcset`
  candidate that 404s is invisible in a browser, so this had to be measured from the network.
- Journeys green at 1440 and 390, motion on and off, rail click included.
- 38 routes fine under reduced motion, axe **0 violations**, reveal ring clear, overflow clean.
- `npm run lint`, `tsc --noEmit` and `npm run build` all clean.

## Left undone

- **`og:image`** — still the last thing wrong with every shared link, and still not a crop:
  it is a designed 1200×630 card. Not invented here.
- **Five case studies' figures** — 106 slots. AFONO, Sync FM, Surugami, the kitchen and QIS.
- **The 14 orphaned PNGs** (811 KB). They get no variants — the generator only builds for
  images the site references — but they would still ship.
