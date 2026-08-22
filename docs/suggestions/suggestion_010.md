# SUGGESTION-010 — Responsive audit and a single layout vocabulary

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

Responsive behaviour is expressed three different ways: Tailwind breakpoint variants, a
raw `@media (max-width: 880px)` `!important` block in `index.css` for the bento grid, and
JavaScript `matchMedia` listeners in `HeroProcess`. Breakpoints are declared out of order
(`ISSUE-011`), and the header may collide at intermediate widths (`ISSUE-016`).

## Recommendation

1. Fix the `theme.screens` ordering.
2. Settle on one breakpoint story and document it in `docs/architecture/architecture_03.md`
   — currently `880px` (JS + the bento CSS), `1160px` (`nav`) and Tailwind's `md`/`lg` all
   act as "the mobile breakpoint" in different files.
3. Convert `BentoGrid`'s inline `style` grid to classes so its `!important` override can
   be deleted.
4. Walk every page at 375 / 480 / 768 / 1024 / 1160 / 1440 / 1920 and record what breaks.
   Known suspects: the header (`ISSUE-016`), the case-study rail at the md boundary, the
   `1440×900` process map on very wide screens, and the About page's absolutely-positioned
   hand-drawn annotations.
5. Publish header height as a CSS variable and use it for `scroll-margin-top` and the
   sticky rail (`ISSUE-015`).

## Why

Recruiters open portfolios on phones. Right now the mobile experience has never been
systematically checked.

## Relevant Files

- `tailwind.config.ts`, `src/index.css`, `src/components/BentoGrid.tsx`,
  `src/components/Header.tsx`, `src/components/process/HeroProcess.tsx`, `src/pages/About.tsx`

## Dependencies

After `MILESTONE-002`/`003`, since those change the layouts being audited.

## Risks

None significant; mostly verification work.

## Related Issues

`ISSUE-011`, `ISSUE-015`, `ISSUE-016`, `ISSUE-023`.

## Possible Milestone

`MILESTONE-007`.
