# Current State

Snapshot: **2026-08-23**, after SESSION-003 (`MILESTONE-003` part one — the case-study
content model).

## Overall

The site is **structurally complete and visually unfinished.** Every page, route and
content system exists and works; the build is green in ~1 second. Navigation is fixed and
the case studies now have real internal structure — sub-headings, lists and notes render
as themselves. What remains is presentational: real imagery, a homepage work section that
shows work, and a case-study *layout* worth the content inside it.

Roughly: architecture ~90% done, content ~70% drafted, imagery ~5%, polish ~35%.

## Working

- All 36 routes (18 paths × 2 locales) render. Unknown slugs fall through to 404.
- Bilingual EN/DE throughout, with one exception (`ISSUE-005`) and four gaps (`ISSUE-009`).
- **Navigation** — hash links land on their section from any starting route and on a cold
  load, route changes start at the top, back/forward restores position, and scroll reveals
  re-run when only a route param changes. All verified in Chrome against the production
  build, at 1440px and 390px, both locales, reduced motion on and off.
- The scroll-pinned process canvas — the site's signature interaction — works on desktop,
  with a proper static fallback for mobile and reduced motion.
- Six long-form case studies with a shared template, sticky contents rail, facts strip and
  prev/next ring. Section bodies are a typed block model (`DECISION-014`), so sub-headings,
  lists and editorial notes render distinctly in both locales — 38, 22 and 8 of them
  respectively. Figures accept a real `src` and render a caption when one is set.
- Playground: six categories, paper-grid texture, taped cards, six auto-scrolling
  marquees, one experiment detail page.
- A complete, real résumé page with print styles.
- `prefers-reduced-motion` honoured consistently.
- `npm run build` green; `npm run lint` 0 errors, 3 warnings.

## Broken or unusable

**Nothing.** All four entries here — `ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003` and
`ISSUE-022` — were fixed in SESSION-002. No `Critical` issue is open.

The nearest thing to a defect left is `ISSUE-015` (Low): below 480px, 42px of an anchored
section hides behind the taller mobile header. Measured, not fixed — it belongs to
`MILESTONE-007`.

## Incomplete

- **Homepage work section** — 11 grey tiles for 6 projects, no images, no copy, English
  only (`ISSUE-004`, `ISSUE-005`). Uncommitted, direction unconfirmed (`DECISION-010`).
- **Case-study layout** — the content has hierarchy now; the page around it does not. Same
  240px rail and 960px column, media all one width, the design-question callout / insights
  grid / testing 3-up nearly identical, no reading-progress affordance. That is the second
  half of `MILESTONE-003` (`SUGGESTION-003`). Between 768px and 1024px the reading column
  also drops to ~313–569px because the grid reserves the rail's width where the rail is
  hidden.
- **Imagery** — 2 real images on the entire site. 5 wired slots are colour stand-ins
  (`ISSUE-006`). The 71 case-study figure slots now accept a real file from the data alone;
  44 Playground and About slots still have no source field (`ISSUE-007`).
- **Motion** — one fade-and-lift effect. No page transitions, no scroll-linked interaction
  outside the process canvas.
- **German** — 3 untranslated fields and 1 missing field, all visible (`ISSUE-009`).

## Design state

The visual language is well-defined and, in the Playground especially, genuinely
distinctive. Its weakness is consistency of execution: the type scale in
`tailwind.config.ts` is unused, five pages use five different h1 clamps, and raw hex values
appear throughout (`ISSUE-023`). Responsive behaviour has never been systematically
verified (`ISSUE-016`, `SUGGESTION-010`).

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
  stale branches `master` and `milestone-001-stabilize` are both behind `main` and can be
  deleted whenever the owner is ready.
- SESSION-003 sits on branch **`milestone-003-content-model`**, branched from `main`.
- One script exists now: `scripts/content-guide-case-studies.mjs`, which regenerates
  `CONTENT_GUIDE.md` §5 from the case-study data.
- All Next.js leftovers deleted; `.gitignore` is complete (`ISSUE-018` resolved).
- `design-reference/` — the authoritative design source — is gitignored and exists only on
  this machine. Key values are mirrored into `docs/reference/design_tokens.md`.

## Current milestone

**`MILESTONE-003`, half done.** The content model landed in SESSION-003; the layout half is
the recommended next session — see `docs/next_session.md`.

## Blockers

| Blocker | Blocks |
| --- | --- |
| `DECISION-010` — keep the bento direction? | `MILESTONE-002` |
| `DECISION-006` — which placeholders stay stylised? | the last 44 slots of `ISSUE-007` |
| Owner's real image exports | `MILESTONE-005` |
| Owner's participation in the copy pass | `MILESTONE-004` |

Nothing blocks the layout half of `MILESTONE-003`.

## Highest-priority next work

1. The case-study layout — `SUGGESTION-003`, the second half of `MILESTONE-003`. Its
   blocker (`ISSUE-024`) is resolved, and it is the owner's first-named priority.
2. `ISSUE-004` + `ISSUE-005` — the homepage work section. `MILESTONE-002`, blocked on
   `DECISION-010`.
3. `ISSUE-006` + the remaining `ISSUE-007` slots — real imagery, blocked on the owner's
   exports and on `DECISION-006`.

`MILESTONE-004` (the copy pass) is now unblocked as well, but it wants the owner in the
room, and restructuring text before the layout settles means doing it twice.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
