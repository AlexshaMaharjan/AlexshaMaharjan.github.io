# Issues Index

30 issues. **27 resolved** — 6 in SESSION-002 (`MILESTONE-001`), 2 in SESSION-003
(`MILESTONE-003`), 2 in SESSION-005 3 in SESSION-006, 2 in SESSION-007 and 1 in SESSION-009 (`MILESTONE-007`), 3 in
SESSION-008 (`MILESTONE-002`/`005`), and `ISSUE-025` by the owner — plus one partially resolved. 10
remain open, none `Investigating`. **The owner answered all three open decisions on
2026-08-24**, which unblocked the last of these. No `Critical` issue is open. `ISSUE-027` is open but **diagnosed**:
SESSION-005 measured the real mechanism and rewrote the file, having found SESSION-004's
description of it wrong.

Read the summary column first; open a file only when you are going to act on it.

## Active — Critical

_None._

## Active — High

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-004 | Homepage work grid has no imagery | **Partially resolved** | High | Tiles take images now; the images are being made | `issue_004.md` |
| ISSUE-006 | Wired images that are colour stand-ins | Mostly resolved | High | Heroes all real since SESSION-016; German Sync FM fixed SESSION-020. Left: the About portrait, and the `og:image` | `issue_006.md` |

## Active — Medium

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-009 | German gaps: 3 untranslated fields + 1 missing | Open | Medium | Visible English on the DE About page | `issue_009.md` |
| ISSUE-010 | Dead fields across the content types | Open | Medium | ~12 typed fields read by nothing | `issue_010.md` |

## Active — Low

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |

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

And in SESSION-014, closing the tracker's last two defects:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-027 | Hash navigation after a route change restores an offset nobody chose | `a1f4370` — the restore branch yields to an explicit anchor, and the smooth landing waits for stillness before correcting | `issue_027.md` |
| ISSUE-029 | About annotation overlaps the Biography heading at 768px | `a1f4370` — the note is positioned proportionally, not at a fixed offset | `issue_029.md` |

And in SESSION-013 under `MILESTONE-008`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-019 | Oversized GSAP and case-study chunks | `93aa40b` — the registry is split per slug (126 KB → 13 KB + one study); GSAP staying eager is `DECISION-015` | `issue_019.md` |

And in SESSION-011 under `MILESTONE-006`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-012 | Process canvas rAF loop never idles | `06afc41` — an IntersectionObserver starts and stops it: 120 fps on screen, 0 off | `issue_012.md` |
| ISSUE-020 | Lazy routes render a blank frame | `06afc41` — a 2px bar and an announced "Loading page…" | `issue_020.md` |

And in SESSION-010 under `MILESTONE-008`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-013 | No prerendering — crawlers see one English page | `c7bca1d` — `npm run prerender` writes each route's head; verified with JavaScript off. The body is deliberately not prerendered, and the file says why | `issue_013.md` |
| ISSUE-014 | `Seo` leaks description/OG between routes | `c7bca1d` — every field written on every route | `issue_014.md` |

And in SESSION-009 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-030 | Accessibility gaps found by the WCAG 2.2 AA audit | `d9bb612` — contrast, three keyboard defects, a marquee pause control, touch targets; axe-core clean on 16 route loads | `issue_030.md` |

And in SESSION-008, once the owner answered the decisions that blocked them:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-005 | Work grid is hard-coded English | `ee3857f` — tiles come from the dictionary | `issue_005.md` |
| ISSUE-007 | ~115 image slots have no source field | `ee3857f` — the last 44 slots got `src`/`alt`; every slot on the site is fillable from data | `issue_007.md` |

And in SESSION-007 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-016 | Header centre control collides between 480 and 560px | `53e212e` — the switch appears from `md`; the second row carries it below that | `issue_016.md` |
| ISSUE-028 | German compound words in headings overflow at narrow widths | `53e212e` — hyphenation scoped to German below `md`; the original diagnosis was wrong and is corrected in the file | `issue_028.md` |

And in SESSION-006 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-023 | Type scale and colour tokens bypassed | `2880697` — seven named display sizes, three colour tokens, one container, all adopted | `issue_023.md` |
| ISSUE-011 | `lg:` overrides `nav:` due to screens order | `2880697` — `theme.screens` in ascending order | `issue_011.md` |
| ISSUE-021 | `stripLocale` duplicated in Header and Footer | `2880697` — one definition in `lib/i18n.ts` | `issue_021.md` |

And in SESSION-005 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-015 | Anchor offset wrong under the taller mobile header | `f32a45e` — the header measures itself into `--header-h`; `--anchor-offset` derives from it | `issue_015.md` |
| ISSUE-026 | Footer columns overflow the viewport at 768–839px | `f32a45e` — the footer's link columns wrap | `issue_026.md` |

And by the owner, outside a recorded session:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-025 | No deployment configuration | `f8df707`/`7332ad8`/`11930a6` — GitHub Pages via `npm run deploy` (`gh-pages`) | `issue_025.md` |
| ISSUE-031 | Sync FM's copy credits the wrong AI tool | Open | Low | Says Gemini made the personas; the documentation says ChatGPT did | `issue_031.md` |
| ISSUE-032 | WikiMind's personas and moodboard ship third-party imagery | Open | Medium | The persona portraits and half the moodboard tiles are not the owner's; `DECISION-016` makes this their call | `issue_032.md` |

## Grouped by milestone

- **MILESTONE-001** (stabilize): 001, 002, 003, 017, 018, 022 — **all resolved**
- **MILESTONE-002** (work section): 004 (mechanism ✅, images pending), 005 ✅
- **MILESTONE-003** (case-study redesign): 008 ✅, 024 ✅, 007 (case-study half ✅)
- **MILESTONE-004** (copy pass): —
- **MILESTONE-005** (imagery): 006, 007 ✅ — what remains is the images themselves, listed
  in `docs/reference/image_manifest.md`
- **MILESTONE-006** (motion): 012 ✅, 020 ✅
- **MILESTONE-007** (design system / responsive): 010, 011 ✅, 015 ✅, 016 ✅, 021 ✅, 023 ✅, 026 ✅, 027 ✅, 028 ✅, 029 ✅, 030 ✅ — only `ISSUE-010` remains, and it waits on `MILESTONE-002`
- **MILESTONE-008** (perf / SEO / deploy): 013 ✅, 014 ✅, 019 ✅, 025 ✅
- **MILESTONE-009** (German): 009
