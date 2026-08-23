# MILESTONE-007 — Design-system consistency, responsive and accessibility

Status: Proposed
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
- [ ] **ISSUE-021** — move `stripLocale` into `src/lib/i18n.ts`

**Responsive (`SUGGESTION-010`)**
- [ ] **ISSUE-011** — reorder `theme.screens`
- [ ] Settle one breakpoint story; document it in `ARCH-03`
- [ ] Move `BentoGrid` off inline styles; delete the `!important` override
- [ ] **ISSUE-016** — measure and fix the header at 480–1160px
- [ ] **ISSUE-015** — publish header height as a CSS variable; use it for
      `scroll-margin-top` and the sticky rail
- [ ] **ISSUE-026** — the footer's link columns plus `md:px-20` overflow the viewport
      between 768px and 839px, so every page scrolls sideways there. Measured; likely a
      padding-scale fix rather than a footer fix
- [ ] **ISSUE-027** — a URL-bar hash change on the current page never reaches the router,
      so the browser's own jump lands on the scroll reveal's at-rest position
- [ ] Walk every page at 375 / 480 / 768 / 1024 / 1160 / 1440 / 1920

`ISSUE-015`, `ISSUE-026` and `ISSUE-027` are all page-independent and need nothing from
the owner, which makes them the natural slice to take first — see `docs/next_session.md`.

**Accessibility (`SUGGESTION-011`)**
- [ ] Keyboard-reachable pause for the playground marquees (WCAG 2.2.2)
- [ ] Contrast audit — `ink-muted` on `page`, `#6C7078` on `near-black`
- [ ] Heading-order check on every page
- [ ] Touch targets: language pill, back-to-top
- [ ] Verify keyboard access to the process-canvas branches
- [ ] axe/Lighthouse on every route; record results

## Relevant Issues

`ISSUE-010`, `ISSUE-011`, `ISSUE-015`, `ISSUE-016`, `ISSUE-021`, `ISSUE-023`,
`ISSUE-026`, `ISSUE-027`

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
