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
| `DesPr1_Alexsha_Maharjan_Doku.pdf` | 24 | Design Projekt I — Corporate Identity & Webdesign | `wikimind` | 15 |
| `DesignProjekt_Dokumentation_Maharjan.pdf` | 52 | Markenidentität und Website-Design | `afono` | 14 |
| `Enddokumentation.pdf` | 43 | Interaktionsdesign — SYNC FM | `sync-fm` | 11 |
| `FInalDesmeth.pdf` | 100 | Design Methods — origami community | `surugami` | 10 |
| `Dokumentation_Kueche_Haaks_Kocak_Maharjan.pdf` | 26 | Design Research — barrierefreie Küche | `barrier-free-kitchen` | 10 |
| `Usability_SoSe24_Maharjan_…_Morina.pdf` | 85 | QIS-Portal Redesign | `qis-portal` | 11 |

Two more documents, `HIBI.pdf` (22 pages) and `C3 Zusammenfassung Projektarbeit.pdf` (10),
describe **Hibi** — a mindfulness web application with Gündogdu, Dörfler, Zorlu and Haaks.
**Hibi is not on the site.** It is a seventh project with a full documentation behind it, and
whether it becomes a case study is the owner's call, not a gap to be filled quietly.

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
optional and it is not a formality — `FInalDesmeth.pdf`'s sources page credits Freepik stock
photography by URL and states plainly that *"P4, P5, P6, P7, P8: All references were taken
from Pinterest"*. Those pages are mood and reference material. They are not the owner's work,
they are not licensed for a commercial portfolio, and putting them on the site would claim
authorship of someone else's photographs.

The rule and its reasoning are recorded in `DECISION-016`. In short: **only work the owner
made ships.** Where a page mixes the owner's diagram with a stock photo, crop the diagram.

Team projects are a separate question and a smaller one — four of the six were collaborative,
and `DECISION-011` already requires that the copy credits collaborators. An image of shared
work is fine on a page that says who did what; the case studies already say it.

## The order to work in

Value per unit of effort, highest first.

**1. The eleven bento tiles** (`MILESTONE-002`). The homepage is where a visitor decides to
stay, and it is eleven grey rectangles today. These are the only slots that are *covers*
rather than evidence, so they take a treatment the others do not — see below.

**2. The six case-study heroes.** One per project, 2560px wide, 16/7.5. Currently flat colour
blocks with alt text that literally reads "Placeholder:".

**3. `og:image`** (`ISSUE-006`). One file. Every link anyone shares is a blank rectangle until
it exists.

**4. The 71 case-study section figures.** The bulk of the work, and the most mechanical: the
manifest names each one (`[ persona 01 ]`, `[ sitemap ]`, `[ ui kit ]`) and the documentation
almost always has exactly that figure. Do one project end to end rather than one figure type
across six.

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

## What this does not solve

The site still has **no responsive image pipeline** (`SUGGESTION-012`) — a file ships at
whatever size it is. `MILESTONE-005` says to build that *before* bulk importing, and with a
real import now in view that ordering matters more than it did: 129 full-size PNGs would be
the largest performance regression this project could give itself. The export widths in the
manifest are the interim defence.
