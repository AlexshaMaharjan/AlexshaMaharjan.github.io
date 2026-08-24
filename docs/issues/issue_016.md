# ISSUE-016 — Header centre control can collide with the wordmark between 480 and 1160px

Status: **Resolved** (SESSION-007, `53e212e`)
Priority: Medium
Category: UI/UX / Responsive
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-24 (SESSION-007)
Last reviewed: 2026-08-24

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

~~**Needs verification**~~ — **measured in SESSION-007, and it was a real overlap, not
just tightness.** The gap between the wordmark's right edge and the switch's left edge,
identical in both locales:

| Viewport | wordmark → switch | switch → right cluster |
| --- | --- | --- |
| **480px** | **−34px (overlapping)** | 53px |
| **520px** | **−14px (overlapping)** | 73px |
| 560px | 6px | 93px |
| 640px | 46px | 133px |
| 768px | 86px | 173px |

The switch is centred on the *viewport*, so it collides with whichever side is wider — the
136px wordmark, not the 49px menu button. It had no real clearance until ~560px, while
appearing from 480px.

## Resolution

The switch now appears from `md` (768px) rather than `sm` (480px), and the second header
row carries it below that — the fix this file proposed. There is exactly one switch at
every width, and the smallest gap anywhere is 86px.

The cost is that the header is 146px tall up to 768px rather than 480px. That is what
exposed the follow-on: pages hard-coded where their content starts as a distance from the
top of the viewport, so they started underneath the taller header. Page tops are now
derived from the measured header height (`--page-top`), which also fixed a pre-existing
overlap on phones — the homepage hero was starting 28px under the header at 375px.

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
