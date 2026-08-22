# ISSUE-016 — Header centre control can collide with the wordmark between 480 and 1160px

Status: Investigating
Priority: Medium
Category: UI/UX / Responsive
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

The Portfolio/Playground mode switch is absolutely centred on the viewport rather than
laid out in the flex row, so it can overlap the "Alexsha Maharjan" wordmark on the left or
the "Menu" button on the right at intermediate widths.

## Evidence / Current Behavior

`src/components/Header.tsx:57-63`: the switch sits in a
`pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center sm:flex`
wrapper — i.e. it is absolutely centred and visible from **480px** upwards, while the nav
links only appear from **1160px** (`nav:flex`).

Rough arithmetic at 480px: wordmark ≈ 150px, mode switch ≈ 230px (two `px-[22px]` pills),
"Menu" ≈ 50px, plus `px-6` padding — about 460px of content in 432px of usable width.

**Needs verification** — measure in a browser at 480, 560, 640 and 768px. It may already
be tight rather than actually overlapping.

## Expected Behavior

No overlap at any width; the centred control either fits or moves into the flex flow /
mobile row.

## Relevant Files

- `src/components/Header.tsx`
- `src/components/ModeSwitch.tsx` (pill padding `px-[22px]`, `min-h-[44px]`)
- `src/components/MobileMenu.tsx`

## Possible Cause

The absolute-centred pattern is faithful to `design-reference/SPEC.md` §3, which specifies
it — but the reference only shows it at desktop widths, and the second `sm:hidden` row
that would carry it on mobile stops at 480px.

## Possible Solution

Raise the breakpoint at which the centred switch appears (e.g. `md:` instead of `sm:`) and
extend the second-row treatment up to that same breakpoint, so there is exactly one
switch at every width.

## Dependencies

None.

## Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-010`.
