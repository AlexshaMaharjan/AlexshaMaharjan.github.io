# SESSION-024 — Surugami, entirely from the owner's own exports

Date: 2026-09-04
Branch: `milestone-003-content-model`
Asked for: `docs/next_session.md`, whose first instruction was **check `Images/` first**.

## `Images/Surugami/` had landed

Nine PNGs. That made this the session the hand-off described, and none of `FInalDesmeth.pdf` was
opened — 407 MB with no text layer, and it was not needed. **Surugami is the first case study
built entirely from supplied exports rather than page renders.**

**139 slots, 60 filled.** Surugami went from 11 slots with 10 empty to **12 with 3**.

## The mapping, and why the filenames were not enough

Every image was opened before it was mapped, which changed three of the nine:

| File | Looked like | Actually |
| --- | --- | --- |
| `CreationMatrixControlWHeel.png` | one diagram | two research artefacts side by side — a creation matrix and a control wheel. Fits `[ research board ]` |
| `BrandPallete.png` | a colour palette | the whole identity board: palette, Space Grotesk, the swan mark's construction grid, segmented/unified colourways and both lockups |
| `HeroImage.png` | a photograph | a title card with four website screens |

`BrandPallete.png` is why `[ logo exploration ]` was renamed **`[ brand system ]`** (`[ brand-system ]`
in German). The logo is the largest part of that board but not all of it, and a caption that
names two thirds of a figure is a caption that will be wrong the moment anyone looks.

`[ sitemap + wireframes ]` was **one slot for two artefacts**, and two separate boards arrived. It
is now `[ sitemap ]` and `[ wireframes ]` — the site total goes to 139.

## Placement

Every figure went into the prose with `{ kind: "figures" }` — the mechanism SESSION-023 added —
rather than into `sections[].images[]`. Section 06 now reads: the print paragraph carries the
poster and flyer boards; the content-structure paragraph carries the sitemap; the wireframes
paragraph carries the wireframes and the finished site. Three groups instead of one block of five
at the bottom.

`SUGGESTION-017`'s ceiling did the rest: the concept map, brand system, posters, flyer and
wireframe boards are all between 1.14 and 1.41, so each takes the column at its own proportions
without any aspect being bent to suit the layout.

## What was deliberately not filled

Three slots stay hatched, and only one of them is about a missing file.

**`[ poster — by alexsha ]` — `ISSUE-034`.** The case study's credit line says the owner made
"illustrations, **one poster**, mock-ups and co-designed the website", which is why the manifest
has always carried two poster slots. The supplied `Poster.png` is a **single board of the whole
campaign** — sketches, three posters in a stairwell, one in a corridor, an outdoor sign, a banner
— and nothing on it says which is whose.

So the board went into `[ posters — team credit ]` and the owner's slot stayed empty. Putting a
board containing teammates' posters under a caption reading "by alexsha" would claim other
people's work; leaving the owner's own poster uncredited is the smaller and reversible error.
**A guess was available and was not taken** — the corridor poster is the only one shown alone and
at scale, which suggests it is the owner's, and a hunch about authorship is not something to
assert in a portfolio.

**`[ illustration — by alexsha ]`.** The deliverables name illustrations, and illustration work is
visible inside the flyer and the website, but no illustration board was supplied. Left hatched at
16/9 rather than 4/3, because a placeholder's aspect is a design choice — it only becomes a crop
instruction once there is a file.

**`[ final system — large showcase ]`.** No supplied image shows print and web together.
`ScreenMockup.png` went to `[ website — co-designed ]`, where section 06's prose describes the
finished interface, rather than being stretched to stand for the whole system.

## Provenance

`DECISION-016` requires reading the sources before exporting, every time. Surugami's is the
harshest of the six — Freepik by URL, and *"P4, P5, P6, P7, P8: All references were taken from
Pinterest"* — which ruled its moodboards and personas out.

**The supplied exports do not touch any of those pages.** What they do raise is the poster
board's mock-up environments: a school corridor, a stairwell, an outdoor sign frame. The
deliverables say the owner made the mock-ups, so the compositing is theirs and the artwork is the
subject; the underlying photographs are very likely licensed templates, exactly as AFONO's were.
Recorded in `ISSUE-034` rather than treated as a blocker, because a mockup template presenting
your own artwork is standard practice.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- **170 images across 36 routes at dpr 1, 2 and 3** — 0 broken, 0 missing `alt`, 0 `"Placeholder:"`,
  0 failed image requests, per-route counts identical at all three densities. 170 is exactly the
  expected 154 + 8 new filled slots × 2 locales.
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `image-manifest.mjs` exits 0 — `en` and `de` name an identical set of sources
- `/work/surugami` added to the weight check, since it is now one of the three fullest pages:
  **440 KB at 1440/1x (267 KB imagery), 712 KB at 390/3x.** Comfortably under WikiMind's 707 KB.

## Still open

- **The barrier-free kitchen and QIS Portal** — 21 slots. The owner is supplying folders; do not
  cut them from the PDFs.
- **The playground** — 39 slots, waiting on the same.
- `ISSUE-034` — which poster is the owner's
- `ISSUE-033` — WikiMind's page weight
- `ISSUE-032` — WikiMind's personas and moodboard
- `ISSUE-006` — the `og:image` and the About portrait
- Nothing pushed. 41 commits ahead of `main` before this one.
