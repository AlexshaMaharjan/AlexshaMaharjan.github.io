# Image sources — the project documentations, and how they fill the slots

`image_manifest.md` lists **136 slots, 129 empty**, and every milestone that touches images
has been described as "blocked on owner-supplied assets". That framing was wrong. The assets
largely exist: six university project documentations, 330 pages, sitting in
`../../ProjectsDokus/` next to this repository. They contain the personas, sitemaps,
wireframes, logo sheets, mockups and final screens that the case-study slots are asking for,
because they are the documents those case studies were written from.

This file says which document belongs to which project, how to get an image out of one, and
what may not be taken.

## Where they are

`/Users/alexsha/OldL/ITD/ProjectsDokus/` — outside the repository, and it must stay outside.
673 MB of PDFs would dwarf the site. **Nothing from this folder is committed**; only the
finished, cropped, resized exports land in `public/images/`.

| Document | Pages | Project | Slug | Slots it feeds |
| --- | --- | --- | --- | --- |
| `DesPr1_Alexsha_Maharjan_Doku.pdf` | 24 | Design Projekt I — Corporate Identity & Webdesign | `wikimind` | 2 (superseded — see below) |
| `DesignProjekt_Dokumentation_Maharjan.pdf` | 52 | Markenidentität und Website-Design | `afono` | 14 |
| `Enddokumentation.pdf` | 43 | Interaktionsdesign — SYNC FM | `sync-fm` | 11 |
| `FInalDesmeth.pdf` | 100 | Design Methods — origami community | `surugami` | 10 |
| `Dokumentation_Kueche_Haaks_Kocak_Maharjan.pdf` | 26 | Design Research — barrierefreie Küche | `barrier-free-kitchen` | 10 |
| `Usability_SoSe24_Maharjan_…_Morina.pdf` | 85 | QIS-Portal Redesign | `qis-portal` | 11 |

Two more documents, `HIBI.pdf` (22 pages) and `C3 Zusammenfassung Projektarbeit.pdf` (10),
describe **Hibi** — a mindfulness web application with Gündogdu, Dörfler, Zorlu and Haaks.
**Hibi is not on the site.** It is a seventh project with a full documentation behind it, and
whether it becomes a case study is the owner's call, not a gap to be filled quietly.

## The tools

Two scripts, neither adding a dependency.

**`scripts/pdf-page.js`** renders documentation pages to PNG (below).

**`scripts/contact-sheet.mjs`** does the two things below in one command each, instead of by
hand every time:

```bash
node scripts/contact-sheet.mjs sheet /tmp/afono-pages sheet.png --cols 8 --cell 300
node scripts/contact-sheet.mjs grid  /tmp/afono-pages/p019.png grid.png --width 1100
```

**`scripts/image-treat.mjs`** crops, resizes, grades and **measures**, by drawing in the
Chrome this project already drives for verification:

```bash
node scripts/image-treat.mjs docs/reference/image_crops.json
```

A job may name the **PDF** plus a `page` and a `renderScale` instead of a PNG; the page is
rendered on demand and cached in `/tmp`. That is what makes `image_crops.json` re-runnable —
it records the source document rather than an intermediate file that was never committed.

It prints the mean luminance of the two bands where `BentoGrid` puts white text and **exits
non-zero if a tile is too bright**, so a failing export is caught at export rather than in
review. `docs/reference/image_crops.json` holds the eighteen crops already cut, each against
its source document and page — copy an entry to start a new one.

**`scripts/contact-sheet.mjs`** and **`scripts/ink-box.mjs`** are the two habits from
SESSION-016 and SESSION-020, made into commands in SESSION-021 rather than redone by hand
each time:

```bash
osascript -l JavaScript scripts/pdf-page.js "<pdf>" "1-43" /tmp/doc 0.5
node scripts/contact-sheet.mjs sheet /tmp/doc /tmp/sheet.png --cols 8 --cell 300
node scripts/contact-sheet.mjs grid /tmp/doc/p032.png /tmp/grid.png --width 1000
node scripts/ink-box.mjs /tmp/doc/p032.png --band 0.25,0.47 --cols 0.57,0.95
```

- **Contact-sheet a whole document and look once.** A hundred pages tiled into one screenshot
  beats a hundred separate looks.
- **Grid-overlay to choose *what* to crop**, then **`ink-box` to decide *where*.** The grid
  is for picking the figure; reading coordinates off it by eye is what cost SESSION-020 three
  rounds — it reads short, and every crop clipped a figure's right edge. `ink-box` measures
  the bounding box of non-white pixels in a band and prints the `crop` for each candidate
  aspect, computed from that box's own centre.
- **Narrow the band until the number stops moving.** A band that reaches into the purple
  page header, or a column limit that clips the body text mid-word, silently widens the box —
  both happened in SESSION-021, and both showed up as a stray `en` in the export. Sweeping
  the limit (`0.57`, `0.59`, `0.61`) until the answer stabilises takes seconds and settles it.

Aspect is never given directly — give a centre, a width fraction and the target ratio, and
let the height fall out of the source's own pixel size. A crop then cannot distort.
`image-treat` stretches the rect you give it to the output size, so the caller has to do
this arithmetic: `h = w × (pageW / pageH) × (aspectH / aspectW)`.

**Read the crop box, do not estimate it.** SESSION-020 spent three rounds recutting crops
whose coordinates were eyeballed off a decile grid, and every one of them clipped a figure's
right edge. Measuring the bounding box of non-white pixels in a band of the page settled each
one in a single pass. The grid is for choosing *what* to crop; a measurement is for deciding
*where*.

## Getting a page out

`scripts/pdf-page.js` renders pages to PNG through macOS PDFKit. No install, no dependency:

```bash
osascript -l JavaScript scripts/pdf-page.js \
  "../../ProjectsDokus/DesPr1_Alexsha_Maharjan_Doku.pdf" "8-12" /tmp/wikimind 4
```

Scale is a multiplier on the PDF's point size. A 612×792pt page at scale 4 renders
2448×3168px, which is enough to crop a 1900px-wide figure out of with room to spare. Start
at 1.5 to skim, re-render the pages you want at 4.

**Position in the file is not the printed page number.** `FInalDesmeth.pdf` puts its Sources
page first; position 60 in that file carries the printed number 58. Always read the number in
the corner of what you rendered.

Two of these documents are too large for any text-based tool — `FInalDesmeth.pdf` is 407 MB
with **no text layer at all**, meaning its pages are single flat images. There is no embedded
figure to extract there; you render the page and crop. The other five have real text, so
their figures are embedded artwork and survive a high-scale render cleanly.

## What may not be taken

**Read the sources page of a document before exporting anything from it.** This is not
optional and it is not a formality. SESSION-016 read all six, and the answer changed what
could be used in **every one of them**.

**Read it again even though the table below exists.** SESSION-020 re-read AFONO's before
exporting and found three borrowed mockup templates the row had compressed away, which moved
two slots from "crop the tee mockup" to "crop the print artwork". The row is an index; the
page is the source.

| Document | What its own sources page says |
| --- | --- |
| `FInalDesmeth.pdf` (Surugami) | Freepik photographs by URL, and *"P4, P5, P6, P7, P8: All references were taken from Pinterest"* — its moodboards (7–9) and personas (12–13) are out |
| `DesignProjekt…` (AFONO) | **more than the AI pages.** *"KI-generierte Mockups (ChatGPT) — Mode- und Produktmockups"* covers every product visual in the prototype, not only pages 25–27; plus a graphicgata iMac template, a pixelbuddha tee mockup, a Behance oversized-tee PSD, and Zara/Mango/H&M/Noah NYC/Awake NY as the market-analysis references. See `DECISION-016` Amendment 1 |
| `Usability_SoSe24…` (QIS) | flaticon icons, Freepik illustrations, and a login background from a Google image search. Its "Originale" screenshots are the university's existing portal, not the team's design |
| `Dokumentation_Kueche…` | three Sketchfab models — the wheelchair figure, a jar, a decor pack. The scene and the kitchen are the team's |
| `DesPr1…` (WikiMind) | no sources page. Its persona portraits (9–11) are unattributed stock or AI, and its moodboard is a board of references. SESSION-022 ships the owner's own full-frame exports, portraits and all — flagged as `ISSUE-032`, which is the owner's call |
| `Enddokumentation.pdf` (Sync FM) | no page headed *Quellen* — but page 43, **"Tools und KI"**, is one: ChatGPT wrote the **personas**, Gemini generated the **first logo drafts** and the **3D perspective views** of the team's flat illustrations. Read it in full; the summary that used to sit in this row named only the perspective images and missed the personas |

Where a page mixes the owner's diagram with borrowed imagery, **crop to the owner's part**.
That is what SESSION-016 did: AFONO is represented by its logo system and print designs
rather than by the AI model shots, and QIS by the team's Figma prototype screens rather than
by the university's portal.

The rule and its reasoning are recorded in `DECISION-016`. In short: **only work the owner
made ships.** Where a page mixes the owner's diagram with a stock photo, crop the diagram.

Team projects are a separate question and a smaller one — four of the six were collaborative,
and `DECISION-011` already requires that the copy credits collaborators. An image of shared
work is fine on a page that says who did what; the case studies already say it.

## The order to work in

Value per unit of effort, highest first.

**1. ~~The eleven bento tiles~~** — done, SESSION-016.

**2. ~~The six case-study heroes~~** — done, SESSION-016, along with six prev/next cards that
turned out to be live rather than dead (`projects[].image`, rendered by `NextProjectNav`).
Sync FM's German hero was still a colour stand-in until SESSION-020; `image-manifest.mjs`
now diffs `en` against `de` and exits non-zero, so that cannot recur silently.

**3. `og:image`** (`ISSUE-006`). Still open, and **not a crop**: it is a designed 1200×630
card with the owner's name on it. Making one out of a documentation page would be inventing a
brand asset rather than filling a slot.

**4. The 73 case-study section figures — 33 done, 40 to go.** The bulk of the work, and the
most mechanical: the manifest names each one (`[ persona 01 ]`, `[ sitemap ]`, `[ ui kit ]`)
and the documentation almost always has exactly that figure. Do one project end to end rather
than one figure type across six. WikiMind (SESSION-019, re-shot from supplied originals in
SESSION-022), AFONO (SESSION-020) and Sync FM (SESSION-021) are done; Surugami, the
barrier-free kitchen and QIS Portal remain.

**A documentation is not the only source.** WikiMind's figures now come from
`Images/wikimind/` — PNGs the owner exported from the design files themselves, which are
sharper, uncropped and in some cases show figures the PDF never contained. Where such
originals exist, prefer them: a page render is a photograph of a document, and an export is
the artefact. `image_crops.json` records the two kinds identically, by source path, so both
stay re-runnable. The originals are ignored by git for the same reason `ProjectsDokus/` is —
only finished exports ship.

**5. About and Playground** (46 slots). These are not in the documentations — Playground is
personal work and About needs a photograph. `DECISION-006` says almost all of them are meant
to be real images.

## The bento tiles need a different treatment

Measured in SESSION-014, against the real tile CSS: the category label and project title sit
**on** the image in white, and the gradient scrim is transparent at the top where the 12px
label sits. Contrast against white:

| Brightness behind the text | 12px label (needs 4.5:1) | Title (needs 3:1 large, 4.5:1 under 24px) |
| --- | --- | --- |
| `#5A` or darker | 9.4 ✅ | 8.3 ✅ |
| `#87` | 6.7 ✅ | 4.7 ✅ |
| `#A5` | 5.3 ✅ | 3.3 ⚠️ |
| `#B4` | 4.8 ✅ | 2.8 ❌ |
| `#C3` or lighter | 4.3 ❌ | 2.4 ❌ |

**Target `#80` or darker across the top strip and the centre band.** A bright UI screenshot
straight out of a documentation will fail — which is a real risk here, because most of this
work is light-background interface design.

The treatment that resolves it, and gives eleven tiles from six projects a common look
without flattening them: crop → darken to the ceiling → desaturate slightly → push a flat
tint of *that project's own colour* back over it. The grade is shared; the hue is not. Three
projects state their palette in their own case-study text — AFONO is red/blue/black/white,
Surugami is coral/mint/teal, QIS Portal is white/cool grey/one institutional accent.

Tile 8 (AFONO — Graphic) renders at 224×322 and exports at 400px. It needs a detail crop, a
mark or a motif. A page screenshot at that size is mush.

## Filling a slot

Unchanged from `image_manifest.md`, repeated because it is three steps and people look here:

1. Export, name it readably — `wikimind-personas.png`, not `p012.png`.
2. Drop it in `public/images/`.
3. Add `src` and `alt` at the data path the manifest names — **in both the `en` and the `de`
   object**. Same `src`, translated `alt`.
4. `npm run build`. No code change anywhere.

Then rerun `node scripts/image-manifest.mjs --write` so the counts stop being anyone's memory.

## Format and weight

**Export WebP**, and then **run `npm run images`**. The responsive pipeline landed in
SESSION-019: `scripts/image-variants.mjs` writes width variants beside each original and
regenerates `src/lib/imageVariants.ts`, which `ui/Image` turns into a `srcset`.

Do not skip it. A variant listed in the map but missing on disk is a **404 inside a
`srcset`**, and a browser hides that completely — the page looks fine and the image is soft.
`predeploy` runs `image-variants.mjs --check` and refuses to build on a stale map.

**Give the crop a source wide enough for the output.** `renderScale` 6 gives a 3672px-wide
page, which covers a 1900px export from any crop wider than about half the page. A narrow
crop needs a higher scale — AFONO's social layout system is 28% of its page, so it is
rendered at scale 12. Upscaling a crop to hit a target width is the one thing this pipeline
will not catch.

**What the numbers look like**, whole page, uncached, gzipped, measured against the built
artifact:

| | 1440px / 1x | 1440px / 2x | 390px / 1x | 390px / 3x |
| --- | --- | --- | --- | --- |
| homepage | 259 KB (88 img) | 366 KB (195) | 227 KB (56) | 358 KB (187) |
| `/work/afono` — 13 figures | 484 KB (309 img) | 608 KB (433) | 317 KB (143) | 548 KB (373) |
| `/work/wikimind` — 13 figures | 438 KB (264 img) | 735 KB (561) | 317 KB (142) | 595 KB (420) |

**Measure with the page scrolled and the server gzipping.** Every figure below the fold is
lazy, so an unscrolled measurement reports almost no imagery at all; and without gzip the
JS bundle alone doubles the total and drowns the number you were looking for.

**Dead weight to resolve.** Fourteen legacy PNGs in `public/images/` are now referenced by
nothing and would ship — 811 KB. They are the owner's files and may be source material, so
they were left in place rather than deleted.
