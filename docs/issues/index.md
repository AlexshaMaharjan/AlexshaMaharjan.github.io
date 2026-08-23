# Issues Index

27 issues. **11 resolved** — 6 in SESSION-002 (`MILESTONE-001`), 2 in SESSION-003
(`MILESTONE-003`), 2 in SESSION-005 (`MILESTONE-007`), and `ISSUE-025` by the owner — plus
one partially resolved. 16 remain open, one of them `Investigating`. No `Critical` issue is
open. `ISSUE-027` is open but **diagnosed**: SESSION-005 measured the real mechanism and
rewrote the file, having found SESSION-004's description of it wrong.

Read the summary column first; open a file only when you are going to act on it.

## Active — Critical

_None._

## Active — High

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-004 | Homepage work grid has no imagery, duplicates projects | Open | High | 11 grey tiles for 6 projects, no images or copy | `issue_004.md` |
| ISSUE-005 | Work grid is hard-coded English | Open | High | German homepage shows English tiles | `issue_005.md` |
| ISSUE-006 | 5 of 7 wired images are colour stand-ins | Open | High | Portrait + 4 case-study heroes are flat blocks | `issue_006.md` |
| ISSUE-007 | ~115 image slots have no source field | **Partially resolved** | High | 71 case-study slots take a `src` now; 44 Playground/About slots do not | `issue_007.md` |

## Active — Medium

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-009 | German gaps: 3 untranslated fields + 1 missing | Open | Medium | Visible English on the DE About page | `issue_009.md` |
| ISSUE-010 | Dead fields across the content types | Open | Medium | ~12 typed fields read by nothing | `issue_010.md` |
| ISSUE-012 | Process canvas rAF loop never idles | Open | Medium | Continuous per-frame style writes on desktop | `issue_012.md` |
| ISSUE-013 | No prerendering — crawlers see one English page | Open | Medium | Link previews and SEO are wrong on every route | `issue_013.md` |
| ISSUE-016 | Header centre control may collide 480–1160px | Investigating | Medium | Needs browser measurement | `issue_016.md` |
| ISSUE-019 | Oversized GSAP and case-study chunks | Open | Medium | 115 KB GSAP on every page; 121 KB for one case study | `issue_019.md` |
| ISSUE-023 | Type scale and colour tokens bypassed | Open | Medium | Five different h1 clamps; named scale unused | `issue_023.md` |

## Active — Low

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-011 | `lg:` overrides `nav:` due to screens order | Open | Low | Latent; nothing broken yet | `issue_011.md` |
| ISSUE-014 | `Seo` leaks description/OG between routes | Open | Low | Stale meta after navigation | `issue_014.md` |
| ISSUE-020 | Lazy routes render a blank frame | Open | Low | `Suspense fallback={null}` | `issue_020.md` |
| ISSUE-021 | `stripLocale` duplicated in Header and Footer | Open | Low | Should live in `lib/i18n.ts` | `issue_021.md` |
| ISSUE-027 | Hash navigation after a route change restores an offset nobody chose | Open | Low | **Diagnosed, not fixed** — stale entry in the scroll-position map | `issue_027.md` |

## Resolved

All in SESSION-002 under `MILESTONE-001`, and all verified in Chrome against the
production build rather than by code reading.

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-001 | Scroll reveals never re-run on same-route navigation | `92b63f4` — effects keyed on pathname; at-rest state moved from CSS into JS so it fails safe | `issue_001.md` |
| ISSUE-002 | Hash links don't scroll cross-route | `65f2b2d` — `useScrollBehavior` in `RootLayout` | `issue_002.md` |
| ISSUE-003 | No scroll reset on route change | `65f2b2d` — same hook; back/forward restores position | `issue_003.md` |
| ISSUE-017 | Substantial work uncommitted | Already committed in `cc6e1c8` before the session; snapshot was stale | `issue_017.md` |
| ISSUE-018 | Next.js leftovers | `.next/`, `tsconfig.tsbuildinfo`, `NewHomePage/` deleted after inspection | `issue_018.md` |
| ISSUE-022 | `/contact` redirects to a hash that doesn't scroll | Resolved automatically by `ISSUE-002`, then verified | `issue_022.md` |

And in SESSION-003 under `MILESTONE-003`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-024 | Section model can't express sub-headings or lists | `e844ad9` — `Block` union in `caseStudies/types.ts`; all six studies migrated in both locales | `issue_024.md` |
| ISSUE-008 | First case-study section lacks number, label, reveal | `e844ad9` — one render path in `Section.tsx`; `first` varies only the top margin | `issue_008.md` |

And in SESSION-005 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-015 | Anchor offset wrong under the taller mobile header | `f32a45e` — the header measures itself into `--header-h`; `--anchor-offset` derives from it | `issue_015.md` |
| ISSUE-026 | Footer columns overflow the viewport at 768–839px | `f32a45e` — the footer's link columns wrap | `issue_026.md` |

And by the owner, outside a recorded session:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-025 | No deployment configuration | `f8df707`/`7332ad8`/`11930a6` — GitHub Pages via `npm run deploy` (`gh-pages`) | `issue_025.md` |

## Grouped by milestone

- **MILESTONE-001** (stabilize): 001, 002, 003, 017, 018, 022 — **all resolved**
- **MILESTONE-002** (work section): 004, 005
- **MILESTONE-003** (case-study redesign): 008 ✅, 024 ✅, 007 (case-study half ✅)
- **MILESTONE-004** (copy pass): —
- **MILESTONE-005** (imagery): 006, 007 (Playground + About slots)
- **MILESTONE-006** (motion): 012, 020
- **MILESTONE-007** (design system / responsive): 010, 011, 015 ✅, 016, 021, 023, 026 ✅, 027
- **MILESTONE-008** (perf / SEO / deploy): 013, 014, 019, 025 ✅
- **MILESTONE-009** (German): 009
