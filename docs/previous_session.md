# Previous Session

**SESSION-024** — 2026-09-04. Full record: `docs/sessions/session_024.md`.

## What it did

`Images/Surugami/` had landed — nine PNGs — so this was the session `next_session.md` described.
**Surugami is the first case study built entirely from supplied exports**; `FInalDesmeth.pdf`
(407 MB, no text layer) was never opened, and did not need to be.

**139 slots, 60 filled.** Surugami went from 11 slots with 10 empty to **12 with 3**. Four of the
six case studies now carry real imagery.

## The thing worth carrying forward

**Open every file before mapping it — filenames are a guess, not a label.** Three of the nine
were not what they were called:

- `CreationMatrixControlWHeel.png` is two research artefacts side by side, not one diagram.
- `BrandPallete.png` is the entire identity board — palette, type, the swan mark's construction
  grid, colourways and both lockups — not a palette.
- `HeroImage.png` is a title card carrying four website screens.

`BrandPallete.png` is why `[ logo exploration ]` became **`[ brand system ]`**: the logo is the
largest part of that board but not all of it, and a caption naming two thirds of a figure is
wrong the moment anyone looks.

**A slot can turn out to be two.** `[ sitemap + wireframes ]` was one slot; two separate boards
arrived, so it is now `[ sitemap ]` and `[ wireframes ]`. The site total went 138 → 139. Splitting
is cheap now that the manifest counts inline figures.

## What it deliberately did not do

**`[ poster — by alexsha ]` stays hatched — `ISSUE-034`.** The credit line says the owner made
"illustrations, **one poster**, mock-ups and co-designed the website", which is why two poster
slots exist. The supplied `Poster.png` is a single board of the **whole team's** campaign, and
nothing on it says which poster is whose.

The board went to `[ posters — team credit ]`. Captioning teammates' posters "by alexsha" would
claim other people's work; leaving the owner's own poster uncredited is smaller and reversible.
**A guess was available and was not taken** — the corridor poster is the only one shown alone and
at scale, which suggests it is theirs, and a hunch about authorship is not something to assert.

Also hatched: `[ illustration — by alexsha ]` (no illustration board supplied) and
`[ final system — large showcase ]` (nothing shows print and web together).

## What it left for the owner

- **`ISSUE-034`** — name the poster, or export it on its own into `Images/Surugami/`. One minute
  of work at their end. The same issue records that the poster mock-up environments are very
  likely licensed templates, as AFONO's were — worth knowing before publishing, not a blocker.
- **The kitchen and QIS folders** — 21 slots, and the playground's 39. Nothing else can proceed
  on imagery until they land.

## Verified

Production build, `serve.mjs` started first: routes 36/36; **170 images across 36 routes at dpr
1, 2 and 3**, 0 broken, 0 missing `alt`, 0 failed requests, counts identical at all densities;
axe 0 violations; 0 overflow; reduced motion static; `tsc` clean; lint 0 errors;
`image-manifest.mjs` exits 0 on en/de parity.

`/work/surugami` was added to the weight check, since it is now one of the three fullest pages:
**440 KB at 1440/1x, 712 KB at 390/3x** — comfortably under WikiMind's 707 KB / 995 KB.
