# Current State

Snapshot: **2026-08-22**, after SESSION-001 (analysis and documentation only — no
application code was changed).

## Overall

The site is **structurally complete and visually unfinished.** Every page, route and
content system exists and works; the build is green in ~1 second. What is missing is real
imagery, a homepage work section that shows work, case-study pages that are pleasant to
read, and three navigation fixes.

Roughly: architecture ~85% done, content ~70% drafted, imagery ~5%, polish ~30%.

## Working

- All 36 routes (18 paths × 2 locales) render. Unknown slugs fall through to 404.
- Bilingual EN/DE throughout, with one exception (`ISSUE-005`) and four gaps (`ISSUE-009`).
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

| What | Issue |
| --- | --- |
| Case-study → case-study navigation leaves content invisible | `ISSUE-001` **Critical** |
| `#work` / `#about` / `#contact` links don't scroll from other pages | `ISSUE-002` |
| New pages open at the previous page's scroll position | `ISSUE-003` |
| `/contact` effectively does nothing | `ISSUE-022` |

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

- Only two commits exist. A session's worth of work is uncommitted — including the entire
  GSAP reveal system and the new bento grid, plus a deletion (`ISSUE-017`).
- `.next/` is untracked **and** not gitignored (`ISSUE-018`).
- `design-reference/` — the authoritative design source — is gitignored and exists only on
  this machine. Key values are mirrored into `docs/reference/design_tokens.md`.

## Current milestone

**None active.** The roadmap (`MILESTONE-001`–`009`) is `Proposed` and awaiting owner
review.

## Blockers

| Blocker | Blocks |
| --- | --- |
| Owner approval of the roadmap | everything |
| `DECISION-010` — keep the bento direction? | `MILESTONE-002` |
| Owner's real image exports | `MILESTONE-005` |
| Owner's participation in the copy pass | `MILESTONE-004` |
| Host and domain decision (`DECISION-012`) | `MILESTONE-008` |

## Highest-priority next work

1. `ISSUE-001` — content invisible on a navigation path visitors will actually take.
2. `ISSUE-002` + `ISSUE-003` — the rest of the navigation repair.
3. Commit the uncommitted work (`ISSUE-017`).

All three are `MILESTONE-001`.

## Where to read more

`docs/issues/index.md` · `docs/milestones/index.md` · `docs/architecture/index.md` ·
`docs/decisions/index.md`
