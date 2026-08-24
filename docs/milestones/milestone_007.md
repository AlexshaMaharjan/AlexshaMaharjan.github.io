# MILESTONE-007 — Design-system consistency, responsive and accessibility

Status: In progress — `ISSUE-015`/`ISSUE-026` (SESSION-005),
`ISSUE-023`/`ISSUE-011`/`ISSUE-021` (SESSION-006), `ISSUE-016`/`ISSUE-028` (SESSION-007)
and the accessibility block (SESSION-009) done. What remains needs `MILESTONE-002` to
finish first: `ISSUE-010`'s dead fields, plus `ISSUE-027` and `ISSUE-029`.
Priority: Medium
Goal: Make six differently-built pages read as one designed site, at every viewport, for
every visitor.

## Why This Milestone Exists

The owner's fifth stated priority: "design should be consistent overall". The tokens for
that already exist in `tailwind.config.ts` and are almost entirely unused — components
hand-write near-identical clamps and raw hex values instead. There are five different
"page h1" sizes across five pages. Meanwhile responsive behaviour has never been
systematically checked, and the accessibility target stated in the design spec has never
been verified.

## Scope

A deliberate sweep across the whole codebase. Deliberately scheduled **after** the layout
milestones so pages are not swept twice.

## Tasks

**Consistency (`SUGGESTION-009`)**
- [ ] Reconcile five h1 clamps into 2–3 named roles; apply the existing `text-hero` /
      `text-section` / `text-case-title` scale
- [ ] Promote recurring raw hexes to tokens (`#E4E7EE`, `#C9CEDB`, `#4E6087`, `#8FA6FF`,
      `#A7ACB4`, `#6C7078`)
- [ ] Adopt `.container-page` (or a `<Container>`); remove ~20 hand-written repetitions
- [ ] Extract the tag-pill and CTA-pill primitives
- [ ] **ISSUE-010** — remove whatever content fields are still dead after `MILESTONE-002`
- [x] **ISSUE-021** — `stripLocale` lives in `src/lib/i18n.ts` (SESSION-006)

**Responsive (`SUGGESTION-010`)**
- [x] **ISSUE-011** — `theme.screens` is in ascending order (SESSION-006)
- [ ] Settle one breakpoint story; document it in `ARCH-03`
- [ ] Move `BentoGrid` off inline styles; delete the `!important` override
- [x] **ISSUE-016** — measured (a real 34px overlap at 480px) and fixed: the mode switch
      appears from `md`, the second row carries it below that (SESSION-007)
- [x] **ISSUE-015** — the header measures itself into `--header-h`, and both
      `scroll-margin-top` and the sticky rail derive from it (SESSION-005)
- [x] **ISSUE-026** — the footer's link columns wrap (SESSION-005). The shared padding
      scale is still the more general fix and is still untouched, deliberately
- [ ] **ISSUE-027** — a hash navigation after a client-side route change restores a stale
      scroll offset. **Diagnosed in SESSION-005**, three candidate fixes tried and
      reverted; the file now carries the measurements and where to start
- [x] **ISSUE-028** — not the header: German compound words in display headings. Fixed
      with hyphenation scoped to German below `md` (SESSION-007)
- [ ] **ISSUE-029** — the About page's hand annotation sits on the Biography heading at
      exactly 768px. Pre-existing, measured
- [ ] Walk every page at 375 / 480 / 768 / 1024 / 1160 / 1440 / 1920

`ISSUE-015` and `ISSUE-026` were taken first, in SESSION-005, being page-independent and
needing nothing from the owner. `ISSUE-027` turned out to be a scroll-position-bookkeeping
bug rather than an anchor bug, and was left diagnosed rather than half-fixed.

**Accessibility (`SUGGESTION-011`)** — done in SESSION-009, see `ISSUE-030`
- [x] Keyboard-reachable pause for the playground marquees (WCAG 2.2.2)
- [x] Contrast audit — `ink-muted` and the near-black greys were both below 4.5:1 and are
      fixed; the canvas illustration labels too
- [x] Heading-order check on every page — clean, no changes needed
- [x] Touch targets — the two suspected here were **fine**; a dozen standalone links were
      not, and use a `.tap-target` utility now
- [x] Keyboard access to the process-canvas branches — they were focusable while invisible
      and inert; the map is `inert` until interactive
- [x] axe/Lighthouse on every route — axe-core, 8 pages × 2 locales, 0 violations

## Relevant Issues

`ISSUE-010`, `ISSUE-011` ✅, `ISSUE-015` ✅, `ISSUE-016` ✅, `ISSUE-021` ✅, `ISSUE-023` ✅,
`ISSUE-026` ✅, `ISSUE-027`, `ISSUE-028` ✅, `ISSUE-029`

## Relevant Suggestions

`SUGGESTION-009`, `SUGGESTION-010`, `SUGGESTION-011`

## Relevant Decisions

`DECISION-004`, `DECISION-009`

## Relevant Code

`tailwind.config.ts`, `src/index.css`, and essentially every file under
`src/components/**` and `src/pages/**`

## Dependencies

After `MILESTONE-002`, `003` and ideally `006` — otherwise the sweep happens twice.

## Completion Criteria

- No arbitrary `clamp()` font sizes left in components.
- No raw hex outside `tailwind.config.ts`, except genuinely one-off decorative values.
- Every page verified at seven widths, both locales.
- axe reports no violations; contrast documented where a token was deliberately kept.

## Out of Scope

New features, new content, new animation.

## Notes

Do the consistency sweep in one focused session with before/after screenshots — spreading
it across sessions guarantees a half-migrated codebase, which is worse than either end
state.
