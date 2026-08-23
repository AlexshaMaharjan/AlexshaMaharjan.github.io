# Current State

Snapshot: **2026-08-24**, after SESSION-006 (`MILESTONE-007` — the design-system
consolidation).

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
- `npm run build` green; `npm run lint` 0 errors, 3 warnings.

## Broken or unusable

**Nothing.** All four entries here — `ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003` and
`ISSUE-022` — were fixed in SESSION-002. No `Critical` issue is open.

Two measured defects remain, both Low. `ISSUE-028` — the German header needs 359px of
content at 320px, so `/de/` scrolls sideways there; pre-existing, and paired with
`ISSUE-016` (the header's centred control may collide between 480 and 1160px) as the next
session's objective. And `ISSUE-027` — a hash navigation performed after a
client-side route change restores a scroll offset nobody chose, landing 18px past the
anchor. Diagnosed in SESSION-005 with an instrumented build; three candidate fixes were
tried and reverted rather than shipped unproven. `ISSUE-015` and `ISSUE-026` were fixed in
the same session: anchored sections now clear the header by 31px at every width, and no
page scrolls sideways at any width from 320px to 1920px.

## Incomplete

- **Homepage work section** — 11 grey tiles for 6 projects, no images, no copy, English
  only (`ISSUE-004`, `ISSUE-005`). Uncommitted, direction unconfirmed (`DECISION-010`).
- **Case-study content** — the layout is done; the writing has not been through its pass
  (`MILESTONE-004`), and all 71 figures are still placeholders (`MILESTONE-005`). Those two
  are what stands between the case studies and finished.
- **Imagery** — 2 real images on the entire site. 5 wired slots are colour stand-ins
  (`ISSUE-006`). The 71 case-study figure slots now accept a real file from the data alone;
  44 Playground and About slots still have no source field (`ISSUE-007`).
- **Motion** — one fade-and-lift effect. No page transitions, no scroll-linked interaction
  outside the process canvas.
- **German** — 3 untranslated fields and 1 missing field, all visible (`ISSUE-009`).

## Design state

The visual language is well-defined and, in the Playground especially, genuinely
distinctive. Since SESSION-006 it is also applied consistently: one display type scale of
seven named sizes in use at 24 call sites, three former raw hexes promoted to tokens, and
one `.container-page` at all 31 page containers (`ISSUE-023`). The homepage's three section
headings, which were three different sizes, are now one.

What is left of the consistency work: line-height and letter-spacing are still written per
component, so two headings at the same size can differ in leading; the tag and CTA pill
primitives are still repeated across six or more files (`SUGGESTION-009` point 4); and
responsive behaviour still has two known gaps in the header (`ISSUE-016`, `ISSUE-028`).

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
- SESSION-003 to SESSION-006 sit on branch **`milestone-003-content-model`**, branched
  from `main` — eight commits, and **unpushed**. The branch name predates the last three
  sessions.
- **Nothing is deployed.** The live site is served from `gh-pages` and published only by
  `npm run deploy`; there is no CI workflow. Publishing means merging to `main` and running
  that, which is the owner's call.
- One script exists now: `scripts/content-guide-case-studies.mjs`, which regenerates
  `CONTENT_GUIDE.md` §5 from the case-study data.
- All Next.js leftovers deleted; `.gitignore` is complete (`ISSUE-018` resolved).
- `design-reference/` — the authoritative design source — is gitignored and exists only on
  this machine. Key values are mirrored into `docs/reference/design_tokens.md`.

## Current milestone

**`MILESTONE-007`, well under way.** `ISSUE-015`, `ISSUE-026`, `ISSUE-023`, `ISSUE-011` and
`ISSUE-021` are done. Next: the header at every width (`ISSUE-016`, `ISSUE-028`), then the
accessibility block. `MILESTONE-004` is the higher priority the moment the owner is
available — see `docs/next_session.md`.

## Blockers

| Blocker | Blocks |
| --- | --- |
| `DECISION-010` — keep the bento direction? | `MILESTONE-002` |
| `DECISION-006` — which placeholders stay stylised? | the last 44 slots of `ISSUE-007` |
| Owner's real image exports | `MILESTONE-005` |
| Owner's participation in the copy pass | `MILESTONE-004` |

Nothing blocks the layout half of `MILESTONE-003`.

## Highest-priority next work

1. **`MILESTONE-004`, the copy pass** — unblocked, and the layout it will be written into
   is settled. Needs the owner: `DECISION-011` forbids inventing anything to fill gaps.
2. `ISSUE-004` + `ISSUE-005` — the homepage work section. `MILESTONE-002`, blocked on
   `DECISION-010`.
3. `ISSUE-006` + the remaining `ISSUE-007` slots — real imagery, blocked on the owner's
   exports and on `DECISION-006`.

Unblocked and needing nobody: the header at every width (`ISSUE-016`, `ISSUE-028`), which
is what `docs/next_session.md` points at; then `MILESTONE-007`'s accessibility block; and
`ISSUE-027`, which is diagnosed and waiting.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
