# SUGGESTION-008 — Scroll-linked interactions on case studies and media

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

The homepage has one genuinely memorable interaction — the process canvas. Everything
after it is static. Case studies in particular are long scrolls with no scroll-linked
behaviour at all.

## Recommendation

Add a small, consistent set — not one effect per page:

- **Case-study hero:** subtle image scale/parallax as the hero leaves the viewport.
- **Sticky facts:** keep `FactsStrip` values visible while reading the first sections, or
  merge them into the sticky rail.
- **Active section tracking:** highlight the current section in `ContentsNav` via
  ScrollTrigger, with a thin progress indicator.
- **Figure reveals:** scale-and-fade for full-bleed figures, staggered for grids.
- **Playground marquees:** velocity-linked speed (scroll faster → marquee accelerates)
  is a natural fit for that section's playful register.

Every one of these must be a no-op under `prefers-reduced-motion`.

## Why

Directly addresses the owner's request for interactive and scroll animation, in the places
where the site is currently most static.

## Relevant Files

- `src/components/case-study/*`, `src/components/playground/CategoryMarquee.tsx`
- `src/lib/motion.ts` (new)

## Dependencies

`SUGGESTION-006` (the motion system) and `SUGGESTION-003` (the layout it animates).

## Risks

Scroll-linked effects on long pages are the easiest way to introduce jank. Use GSAP's
`scrub` rather than per-frame handlers, and avoid layout-triggering properties.

## Related Issues

`ISSUE-012`.

## Possible Milestone

`MILESTONE-006`.
