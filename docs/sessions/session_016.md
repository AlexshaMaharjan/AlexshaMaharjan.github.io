# SESSION-016 — The first eighteen images

Date: 2026-08-25
Milestone: MILESTONE-005 / MILESTONE-002
Status: Complete
Commit: `b83c49a`

---

## Objective

Execute the top of `docs/reference/image_sources.md`: the eleven bento tiles, the six
case-study heroes, and a real `og:image`. Answer the pipeline question out loud.

## What was filled

**18 of 136 slots, up from 7.** Eleven bento tiles, six case-study heroes, and six prev/next
cards — the last of which were a surprise. `projects[].image` was assumed to be among
`ISSUE-010`'s dead fields; it is not. `NextProjectNav` renders it at the foot of every case
study, so six live slots were sitting there showing old placeholder PNGs.

The `og:image` was **not** done — see below.

## The provenance gate did real work

`DECISION-016` said read each documentation's sources page before exporting. Doing so
changed what could be used in **every one of the six**:

| Project | What the document's own sources page says |
| --- | --- |
| Surugami | Freepik photographs by URL, and *"P4, P5, P6, P7, P8: All references were taken from Pinterest"* — moodboards and personas excluded |
| AFONO | Pages 25–27 are headed *"KI-generierte Modemodelle und Mockups"* and the text says they are placeholders for later real photography — excluded |
| QIS Portal | flaticon icons, Freepik illustrations, and a login background taken from a Google image search |
| Kitchen | three Sketchfab models — the wheelchair figure, a jar, a decor pack |
| WikiMind | no sources page; its persona photographs are unattributed stock, so those pages were left |
| Sync FM | no sources page, but page 38 states three perspective images were AI-made |

Nothing borrowed shipped. Where a page mixed the owner's diagram with borrowed imagery, the
crop took the owner's part: AFONO is represented by its logo system and print designs rather
than by the AI model shots, and QIS by the team's Figma prototype rather than by the
university's existing portal.

**The AFONO finding is the one the owner should see.** Their own document calls those mockups
placeholders for real photography. That is a judgement about how they present their work, not
a licensing technicality, so it was left to them rather than decided here.

## How the images were made

Two scripts, both dependency-free — `axe-core` is still the only `devDependency`.

`scripts/pdf-page.js` renders documentation pages through macOS PDFKit. It earned its design
here: `FInalDesmeth.pdf` is 407 MB with **no text layer**, which defeats every text-based
tool, and identifying it as Surugami meant rendering pages and looking at them.

`scripts/image-treat.mjs` is new. It crops, resizes, grades and **measures**, by drawing in
the Chrome this project already drives for verification. The measurement is the point: it
reports the mean luminance of the two bands where `BentoGrid` puts white text and **fails the
run** if a tile is too bright. SESSION-014 measured that ceiling; this enforces it. The
brightest tile is Sync FM's interaction tile at 114/120 against a 128/138 limit.

Working method that paid off: render whole documents as **contact sheets** and read one
image instead of a hundred. A 100-page document surveyed in two looks. For crops, the same
trick with a decile grid overlaid, so a crop box could be read off rather than guessed. Three
rounds of that produced the final set — the first pass had five bad crops, most of them
leading with German figure captions.

**Aspect is derived, never given.** `mkspec` takes centre, width fraction and target aspect
and computes the height fraction from the source's own pixel dimensions, so a crop cannot
distort. `docs/reference/image_crops.json` records all seventeen against their source
document and page.

## The pipeline question, answered

**Deferred, deliberately, and the count is 18.** `SUGGESTION-012` should land before the
remaining 118, but eighteen files are comfortably hand-sizable and blocking the visible work
on a pipeline would have delivered nothing.

WebP is what makes that defensible. With no pipeline, a file ships at whatever size it is, so
format is the only lever: all seventeen new files together are **475 KB**, and the homepage
transfers **203 KB of imagery for eleven tiles** (372 KB total, uncached). The case-study
pages got *lighter*, because the heroes replaced heavier PNGs.

---

## Verification

Against the production build, in Chrome, through CDP:

- **86 images across 24 route/locale pairs** — none broken, none missing `alt`, none still
  announcing itself as a placeholder.
- **Every tile measured against the real contrast ceiling**, by the tool, on every run.
- **The bento screenshotted as rendered**, twice, and read as a wall of work rather than as
  eleven documents.
- Weight, uncached: `/` 372 KB, `/de/` 372 KB, `/work/wikimind` 330 KB, `/work/surugami` 292 KB.
- The full battery unchanged: 38 routes fine under reduced motion, axe **0 violations**,
  reveal ring clear, overflow clean at 320–1440 in both locales.
- `npm run lint` (0 errors, 3 pre-existing warnings) and `npm run build` green.

## Left undone, deliberately

- **`og:image`.** It is one file, but it is a *designed* asset — a 1200×630 card with the
  owner's name on it — not a crop of a documentation. Making one up would be inventing a
  brand asset rather than filling a slot.
- **811 KB of orphans.** Fourteen legacy PNGs in `public/images/` are now referenced by
  nothing and would ship. They are the owner's files and may be source material, so they were
  left. `MILESTONE-005` already carries the task.
- The QIS research tile is the weakest of the eleven — survey bar charts with German labels
  running through them. It passes contrast and it is honest evidence; it is not beautiful.
- Nothing pushed, nothing deployed.
