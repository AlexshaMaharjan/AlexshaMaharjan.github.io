# Current State

Snapshot: **2026-08-25**, after SESSION-014 (the last two defects, and the deploy pre-flight).

## Overall

The site is **structurally complete and visually unfinished.** Every page, route and
content system exists and works; the build is green in ~1 second. Navigation is fixed and
the case studies — the largest surface, and the owner's first-named complaint — are now
both structured and laid out. What remains is mostly content the repository cannot supply
for itself: real photographs, and a copy pass. Plus one homepage section that still shows
grey tiles.

Roughly: architecture ~90% done, content ~70% drafted, imagery ~5%, polish ~50%.

## Working

- All 36 routes (18 paths × 2 locales) render. Unknown slugs fall through to 404.
- Bilingual EN/DE throughout, with one exception (`ISSUE-005`) and four gaps (`ISSUE-009`).
- **Navigation** — hash links land on their section from any starting route and on a cold
  load, route changes start at the top, back/forward restores position, and scroll reveals
  re-run when only a route param changes. All verified in Chrome against the production
  build, at 1440px and 390px, both locales, reduced motion on and off.
- The scroll-pinned process canvas — the site's signature interaction — works on desktop,
  with a proper static fallback for mobile and reduced motion.
- Six long-form case studies with a shared template, facts strip and prev/next ring.
  Section bodies are a typed block model (`DECISION-014`), so sub-headings, lists and
  editorial notes render distinctly in both locales — 38, 22 and 8 of them respectively.
  The layout is editorial: body text at a 680px measure against media at up to 960px, three
  distinct set-piece treatments, a contents rail that marks the section being read, and a
  closing band. Figures accept a real `src` and render a caption when one is set.
- Playground: six categories, paper-grid texture, taped cards, six auto-scrolling
  marquees, one experiment detail page.
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

- **Homepage work section** — 11 grey tiles for 6 projects, no images, no copy, English
  only (`ISSUE-004`, `ISSUE-005`). Uncommitted, direction unconfirmed (`DECISION-010`).
- **Case-study content** — the layout is done; the writing has not been through its pass
  (`MILESTONE-004`), and all 71 figures are still placeholders (`MILESTONE-005`). Those two
  are what stands between the case studies and finished.
- **Imagery** — 136 slots, 7 filled, and 5 of those 7 are colour stand-ins rather than
  photographs (`ISSUE-006`). **Every slot can now be filled by editing data**
  (`ISSUE-007`, closed): what each needs is listed in
  `docs/reference/image_manifest.md`. The owner is making the images.
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
- 71 case-study figures (the mechanism exists now — the files do not), 8 About carousel
  photos, up to 36 Playground images.
- A decision on the 9 unused files already in `public/images/`.
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

**Every milestone that does not need the owner is now done.** What remains is
`MILESTONE-004` (the copy pass), `MILESTONE-005` (images), the visible half of
`MILESTONE-002` (the bento's eleven images), and `MILESTONE-009` (German parity, which
follows the copy pass).

**`MILESTONE-008` is complete** bar the owner's `og:image` — `ISSUE-013`, `ISSUE-014`,
`ISSUE-019` and `ISSUE-025` are done, and SESSION-014 added a pre-flight on the built
artifact (`docs/reference/publishing.md`) proving what GitHub Pages will actually serve,
including a real 404 for unknown deep links.

**`MILESTONE-007` is complete** bar `ISSUE-010`, which waits on `MILESTONE-002` and so on
images. Ten issues resolved across six sessions: the type scale, the palette, the container,
the breakpoint order, the header at every width, the accessibility audit, and the last two
defects.

**Every milestone that does not need the owner is now finished.** What remains of the
roadmap is content the repository cannot supply for itself — see `docs/next_session.md`,
which offers the images work if they have landed and a regression suite if they have not.

## Blockers

**No decision is outstanding.** All three were answered on 2026-08-24. What remains is
material, not choices:

| Waiting on | Blocks |
| --- | --- |
| The owner's images — 129 empty slots | `MILESTONE-005`, and the visible half of `MILESTONE-002` |
| The owner's participation in the copy pass | `MILESTONE-004` |
| A custom domain, if one is wanted | nothing; the site works without it |

## Highest-priority next work

1. **Images** — 129 slots, all fillable from data, all listed with sizes in
   `docs/reference/image_manifest.md`. This is the single biggest change left in how the
   site looks, and it needs no code.
2. **`MILESTONE-004`, the copy pass** — unblocked, and the layout it will be written into
   is settled. Needs the owner: `DECISION-011` forbids inventing anything to fill gaps.
3. **Publishing.** The pre-flight is done and the artifact is sound; the two commands are
   in `docs/reference/publishing.md`. Twelve sessions of work exist only on a local branch,
   which is now the largest gap between what is built and what anyone can see. The only
   thing that will look wrong once live is the link-preview image.

The one tracker item left, `ISSUE-010` (dead content fields), unblocks itself when the
images land. Nothing else in the repository is waiting on a decision or a fix.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
