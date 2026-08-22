# ISSUE-015 — Anchor scroll offset does not match the taller mobile header

Status: Open
Priority: Low
Category: UI/UX
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`section { scroll-margin-top: 104px }` is tuned to the 72px desktop header. Below 480px
the header gains a second row containing the mode switch, making it roughly 117px tall, so
anchored sections land partly underneath it.

## Evidence / Current Behavior

- `src/index.css:47-49` — `section { scroll-margin-top: 104px }`.
- `src/components/Header.tsx:47` — first row is `h-[72px]`.
- `src/components/Header.tsx:88-92` — an additional `sm:hidden` row with `py-2.5`
  wrapping a `min-h-[44px]` `ModeSwitch`, i.e. ~44 + 20 = ~64px more, only below `sm`
  (480px).
- `src/components/case-study/ContentsNav.tsx:16` also assumes 104px (`sticky top-[104px]`).

**Needs verification** in a browser at <480px — the exact header height was derived from
class values, not measured.

## Expected Behavior

An anchored section's heading is fully visible below the header at every width.

## Relevant Files

- `src/index.css`, `src/components/Header.tsx`, `src/components/case-study/ContentsNav.tsx`

## Possible Cause

A single fixed offset for a header whose height is responsive.

## Possible Solution

Publish the header height as a CSS variable (`--header-h`) set per breakpoint, and use
`calc(var(--header-h) + 32px)` for both `scroll-margin-top` and the sticky rail offset.

## Dependencies

Should be verified after `ISSUE-002` lands, since that is what makes anchor scrolling work
cross-route in the first place.

## Related

`ARCH-03`, `ISSUE-002`, `MILESTONE-007`.
