# Current State

Snapshot: **2026-08-22**, after SESSION-002 (`MILESTONE-001` — navigation repair and
repository hygiene).

## Overall

The site is **structurally complete and visually unfinished.** Every page, route and
content system exists and works; the build is green in ~1 second. The three navigation
defects are fixed, so what remains is presentational: real imagery, a homepage work section
that shows work, and case-study pages that are pleasant to read.

Roughly: architecture ~90% done, content ~70% drafted, imagery ~5%, polish ~30%.

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
  prev/next ring.
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
- **Case-study reading experience** — uniform paragraph columns; sub-headings and lists
  are stored as plain paragraphs because the type cannot express them (`ISSUE-024`).
- **Imagery** — 2 real images on the entire site. 5 wired slots are colour stand-ins;
  ~115 slots have no source field at all (`ISSUE-006`, `ISSUE-007`).
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
- 71 case-study figures, 8 About carousel photos, up to 36 Playground images.
- A decision on the 9 unused files already in `public/images/`.
- A résumé PDF (currently `window.print()` only) and a real `og:image`.

## Repository health

- Clean tree. Five commits. The SESSION-002 work sits on branch
  **`milestone-001-stabilize`** (`65f2b2d`, `92b63f4`) and has **not** been merged to
  `master` — that is the owner's call.
- All Next.js leftovers deleted; `.gitignore` is complete (`ISSUE-018` resolved).
- `design-reference/` — the authoritative design source — is gitignored and exists only on
  this machine. Key values are mirrored into `docs/reference/design_tokens.md`.

## Current milestone

**None active.** `MILESTONE-001` is complete. `MILESTONE-003` is recommended next — see
`docs/next_session.md`.

## Blockers

| Blocker | Blocks |
| --- | --- |
| `DECISION-010` — keep the bento direction? | `MILESTONE-002` |
| Owner's real image exports | `MILESTONE-005` |
| Owner's participation in the copy pass | `MILESTONE-004` |

## Highest-priority next work

1. `ISSUE-024` — the section model cannot express sub-headings or lists, which is why the
   case studies read as walls of text. `MILESTONE-003`.
2. `ISSUE-004` + `ISSUE-005` — the homepage work section. `MILESTONE-002`, blocked on
   `DECISION-010`.
3. `ISSUE-006` + `ISSUE-007` — real imagery, blocked on the owner's exports.

`MILESTONE-003` is the recommended next session: it is the owner's first-named priority and
the only one of the three with no blocker.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
