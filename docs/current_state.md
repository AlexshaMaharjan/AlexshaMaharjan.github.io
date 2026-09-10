# Current State

Snapshot: **2026-09-10**, after SESSION-034 (the playground becomes one scrapbook page that carries video).

## Overall

The site is **structurally complete and visually unfinished.** Every page, route and
content system exists and works; the build is green in ~1 second. Navigation is fixed and
the case studies — the largest surface, and the owner's first-named complaint — are now
both structured and laid out. What remains is mostly content the repository cannot supply
for itself: real photographs, and a copy pass. The homepage work grid is finished (`DECISION-021`).

Roughly: architecture ~93% done, content ~70% drafted, imagery ~81% (129 of 159 slots), polish ~75%.

## Working

- All 34 routes (17 paths × 2 locales) render. Unknown slugs fall through to 404.
  Down from 36: the playground went from six categories to five in SESSION-033 (`DECISION-023`),
  and `/playground/editorial` folded into `/playground/graphic-design`.
- Bilingual EN/DE throughout. `ISSUE-009` closed in SESSION-025: the four dictionary gaps **and
  six landmark `aria-label`s** that were hard-coded English, so a German visitor heard "Primary",
  "Footer" and "My design process" around German content. **axe never reported it** — it checks
  that a landmark has a name, not that the name is in the page's language.
- **Navigation** — hash links land on their section from any starting route and on a cold
  load, route changes start at the top, back/forward restores position, and scroll reveals
  re-run when only a route param changes. All verified in Chrome against the production
  build, at 1440px and 390px, both locales, reduced motion on and off.
- The scroll-pinned process canvas — the site's signature interaction — works on desktop,
  with a proper static fallback for mobile and reduced motion.
- Six long-form case studies with a shared template, a contents rail that is on screen from
  the moment the page opens, a compact facts list inside Overview (`DECISION-017`) and a
  prev/next ring.
  Section bodies are a typed block model (`DECISION-014`), so sub-headings, lists and
  editorial notes render distinctly in both locales — 38, 22 and 8 of them respectively.
  The layout is editorial: body text at a 680px measure against media at up to 960px, three
  distinct set-piece treatments, a contents rail that marks the section being read, and a
  closing band. Figures accept a real `src` and render a caption when one is set.
- Playground: **one page** (`DECISION-026`) — five category sections of true-aspect bento
  rows on a paper-grid ground, three autoplaying muted clips, click-to-enlarge in place.
- A complete, real résumé page with print styles.
- `prefers-reduced-motion` honoured consistently.
- **WCAG 2.2 AA verified** — axe-core reports 0 violations across 8 pages × 2 locales, the
  site is operable by keyboard throughout, and the palette clears 4.5:1 (`ISSUE-030`).
- **Every route has its own metadata**, in static HTML a scraper can read without running
  JavaScript: title, description, canonical, Open Graph, language, and `hreflang`
  alternates connecting each page to its other locale (`ISSUE-013`, `ISSUE-014`).
  `npm run prerender` writes it and `predeploy` runs it.
- **A case study loads only itself** — 13 KB of page shell plus 15–22 KB for that study,
  where all six used to arrive together (`ISSUE-019`, `DECISION-015`).
- **The verification harness is in the repository** (`npm run verify`, `docs/reference/verification.md`).
  Routes, images at 1x/2x/3x, axe, overflow, stuck reveals, reduced motion and page weight,
  against the production build through a gzipping server that behaves like GitHub Pages. It
  had been rebuilt by hand from prose every session; SESSION-021 moved it in.
- `npm run build` green; `npm run lint` 0 errors, 3 warnings.

## Broken or unusable

**Nothing.** All four entries here — `ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003` and
`ISSUE-022` — were fixed in SESSION-002. No `Critical` issue is open.

**No defect is open.** The last two were closed in SESSION-014: `ISSUE-029`, the About
page's hand annotation colliding with the Biography heading between 768px and ~870px, now
positioned proportionally instead of at a fixed offset; and `ISSUE-027`, a hash navigation
on the current page restoring a scroll offset nobody chose — diagnosed in SESSION-005 with
an instrumented build and deliberately left rather than half-fixed, then closed from those
same measurements. `ISSUE-010` is the only tracker item left, and it is a content
dependency, not a defect. `ISSUE-015` and `ISSUE-026` were fixed in SESSION-005: anchored sections now clear the header by 31px at every width, and no
page scrolls sideways at any width from 320px to 1920px.

## Incomplete

- **Homepage work section** — 11 tiles for 6 projects, **all now carrying real images**
  (SESSION-016), no copy, English
  only (`ISSUE-004`, `ISSUE-005`). Uncommitted, direction unconfirmed (`DECISION-010`).
- **Case-study content** — the layout is done; the writing has not been through its pass
  (`MILESTONE-004`), and **30 of the 71 section figures are filled** — WikiMind, AFONO and
  Sync FM, end to end, at roughly one session each. Surugami, the barrier-free kitchen and
  QIS Portal are still hatched (`MILESTONE-005`). Those two are what stands between the case
  studies and finished.
- **Imagery — 73 of 148 slots filled**, up from 7 before SESSION-016. The eleven bento tiles,
  all six case-study heroes, six prev/next cards, and the section figures for AFONO (21),
  WikiMind (16), Sync FM (10) and Surugami (8). **Four of the six case studies are complete, and
  all four run on the owner's own exports rather than PDF page renders** — sharper, uncropped,
  and in several cases showing figures the documentation never contained. The barrier-free
  kitchen and QIS Portal are waiting on folders; until those land there is no case-study image
  work to do. Most were cut from the owner's six project documentations, which
  SESSION-015 mapped in `docs/reference/image_sources.md`; **WikiMind's are not** — SESSION-022
  re-shot all of them from PNGs the owner exported from the design files themselves, which are
  sharper than any page render and carry figures the PDF never had. Where such originals exist,
  prefer them. Served responsively: variants beside each original, a generated `srcset` map,
  and `predeploy` refusing to build on a stale one.
  Verified at 1x, 2x and 3x — 196 images across 36 routes, none broken, none missing `alt`,
  per-route counts identical at all three densities.
  **A figure opens full screen** (`DECISION-018`): fitted, then tap for natural size in a
  pannable scroller. That is a mobile fix rather than a flourish — at 350px a persona card's
  type is about 3px, so the artefact was on the page and unreadable. **Figures sit inside the
  prose**, via a `figures` block, rather than stacking after the whole section — all four
  finished case studies now do this. **And figures are sized by height, not width**
  (`DECISION-019`): 640px for everything, with rows justified so every figure in a row shares
  one height and the widths absorb the difference in aspect. Nothing is cropped to achieve it,
  which is the whole constraint.
  `DECISION-016` governs what may be taken: only the owner's own work, since these are
  academic documents that cite stock, Pinterest, licensed mockup templates and generative AI
  inside themselves. **Read the document's sources page, not this file's summary of it** —
  Amendments 1 and 2 record what re-reading AFONO's and Sync FM's found, which in both cases
  moved slots the index row would have left alone.
  The remaining stand-in is the About portrait (`ISSUE-006`), and there is still no
  `og:image`. `ISSUE-032` is open against WikiMind's personas and moodboard, which ship
  imagery the owner did not make — a judgement `DECISION-016` explicitly leaves to them.
  `/work/wikimind` is the heaviest page on the site at 706 KB (532 KB imagery) at 1440/1x —
  seventeen figures, three of them full-column photographic persona cards (`ISSUE-033`).
- **Motion** — one vocabulary (`src/lib/motion.ts`) that the reveals, the page transition
  and the CSS transitions all read from; reveal variants including staggered grids; a 350ms
  fade on route change; a loading state for lazy pages; the process canvas idling off
  screen; and three scroll-linked effects — case-study hero drift, figure reveals,
  velocity-linked playground rows. All absent, not slowed, under `prefers-reduced-motion`.
- **German** — 3 untranslated fields and 1 missing field, all visible (`ISSUE-009`).

## Design state

The visual language is well-defined and, in the Playground especially, genuinely
distinctive. Since SESSION-006 it is also applied consistently: one display type scale of
seven named sizes in use at 24 call sites, three former raw hexes promoted to tokens, and
one `.container-page` at all 31 page containers (`ISSUE-023`). The homepage's three section
headings, which were three different sizes, are now one.

Responsive behaviour is now checked rather than assumed: no page scrolls horizontally at
any width from 320px to 1920px in either locale, the header has no overlapping elements at
any width, and everything that must clear the fixed header derives from its measured height
rather than from a hard-coded number.

What is left of the consistency work: line-height and letter-spacing are still written per
component, so two headings at the same size can differ in leading; the tag and CTA pill
primitives are still repeated across six or more files (`SUGGESTION-009` point 4). The
width walk — every page examined by eye at every breakpoint — is the one unticked item;
overflow itself is measured clean at 320/375/768/840/1024/1440 in both locales.

## Content and assets still missing

- Real portrait photograph.
- Real hero exports for WikiMind, AFONO, Surugami, Sync FM.
- 71 case-study figures — **the mechanism, the source material and now the tooling all
  exist**; what is missing is the extraction itself (`scripts/image-treat.mjs`,
  `docs/reference/image_crops.json`).
- A real `og:image` — the last thing wrong with every shared link, and the one asset that is
  **not** a crop: it is a designed 1200×630 card.
- 8 About carousel photos and up to 36 Playground images. These are *not* in the
  documentations: Playground is personal work and About needs a photograph.
- A decision on **Hibi** — a seventh project with two full documentations and no page on the
  site.
- A decision on the **15** unused files already in `public/images/` (817 KB, and they ship).
- A résumé PDF (currently `window.print()` only) and a real `og:image`.

## Repository health

- Clean tree. `main` is the working branch and carries everything through `413130b`,
  including the SESSION-002 navigation work and the GitHub Pages deployment commits. The
  branches `master` and `milestone-001-stabilize` point at the same commit as `main`
  (`413130b`) — redundant rather than divergent, and deletable whenever the owner is
  ready.
- SESSION-003 to SESSION-014 sit on branch **`milestone-003-content-model`**, branched
  from `main` — twenty-two commits, and **unpushed**. The branch name predates the last eight
  sessions. **Nothing is deployed**: the live site is published only by `npm run deploy`.
- One dev dependency exists purely for verification: `axe-core`. It ships in nothing.
- **Nothing is deployed.** The live site is served from `gh-pages` and published only by
  `npm run deploy`; there is no CI workflow. Publishing means merging to `main` and running
  that, which is the owner's call.
- One script exists now: `scripts/content-guide-case-studies.mjs`, which regenerates
  `CONTENT_GUIDE.md` §5 from the case-study data.
- All Next.js leftovers deleted; `.gitignore` is complete (`ISSUE-018` resolved).
- `design-reference/` — the authoritative design source — is gitignored and exists only on
  this machine. Key values are mirrored into `docs/reference/design_tokens.md`.

## Current milestone

**`MILESTONE-006` and `MILESTONE-008` are complete** (SESSION-011–013), the latter bar a
real `og:image`, which is the owner's to supply.

**Every milestone that does not need the owner is now done.** `MILESTONE-002` closed in
SESSION-025. What remains is `MILESTONE-004` (the copy pass), `MILESTONE-005` (images) and
`MILESTONE-009` (German parity, which follows the copy pass — its *defects* are fixed,
`ISSUE-009`).

**`MILESTONE-008` is complete** bar the owner's `og:image` — `ISSUE-013`, `ISSUE-014`,
`ISSUE-019` and `ISSUE-025` are done, and SESSION-014 added a pre-flight on the built
artifact (`docs/reference/publishing.md`) proving what GitHub Pages will actually serve,
including a real 404 for unknown deep links.

**`MILESTONE-007` is complete.** `ISSUE-010` was its last open item and closed in
SESSION-025, once `DECISION-010` ended the premise that the dead fields would come back.
Eleven issues resolved across seven sessions: the type scale, the palette, the container,
the breakpoint order, the header at every width, the accessibility audit, and the last two
defects.

**Every milestone that does not need the owner is now finished**, and SESSION-015 changed
what "needs the owner" means for the biggest of the rest. `MILESTONE-005` was recorded for
months as "blocked on owner-supplied assets — the largest external dependency in the
roadmap". It was not: the six case studies were written from six project documentations, and
those hold most of the 129 missing images. The dependency is the owner's time and judgement —
which figure represents a section, what may be shown — not material that does not exist.

`docs/next_session.md` points at the eleven bento tiles, the six case-study heroes and the
`og:image`, in that order.

## Blockers

**No decision is outstanding.** All three were answered on 2026-08-24. What remains is
material, not choices:

| Waiting on | Blocks |
| --- | --- |
| The owner's time to extract and grade the remaining 88 slots — source material and tooling both exist | the rest of `MILESTONE-005` |
| **Whether AFONO's AI-generated product imagery may be shown** | 1 AFONO slot, and better options for 2 more |
| ~~A responsive image pipeline~~ — built in SESSION-019 | — |
| A decision on whether Hibi becomes a seventh case study | nothing; it is an addition, not a gap |
| The owner's participation in the copy pass | `MILESTONE-004` |
| A custom domain, if one is wanted | nothing; the site works without it |

## Highest-priority next work

1. ~~**`SUGGESTION-012`, the responsive image pipeline**~~ — done in SESSION-019, and
   without moving anything out of `public/images/`. `scripts/image-variants.mjs` writes
   variants beside the originals; `ui/Image` builds the `srcset`; `predeploy` refuses a stale
   map. No new dependency.
2. **The remaining 41 case-study figures** — the barrier-free kitchen, QIS Portal, Surugami.
   Source material, tooling and the method are all in place (`image_sources.md`,
   `image_crops.json`, `scripts/contact-sheet.mjs`, `scripts/ink-box.mjs`). Three projects
   have gone through end to end at roughly one session each; Surugami is the hard one.
3. **`MILESTONE-004`, the copy pass** — unblocked, and the layout it will be written into
   is settled. Needs the owner: `DECISION-011` forbids inventing anything to fill gaps.
4. **Publishing.** The pre-flight is done and the artifact is sound; the two commands are
   in `docs/reference/publishing.md`. **Thirty-nine commits exist only on a local branch**,
   which is now the largest gap between what is built and what anyone can see — and this
   would be the first publish showing real imagery on two full case studies. The only thing
   that will look wrong once live is the link-preview image.

The one tracker item left, `ISSUE-010` (dead content fields), unblocks itself when the
images land. Nothing else in the repository is waiting on a decision or a fix.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
