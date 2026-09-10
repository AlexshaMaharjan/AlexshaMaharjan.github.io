# SUGGESTION-008 — Scroll-linked interactions on case studies and media

Status: **Implemented** (SESSION-012, `1f59f04`) — three of the five, and the file says
which two were left
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

## What was actually built

Three effects, not five. `SPEC` §11 and the site's own WikiMind copy both argue that motion
should guide rather than distract, so the ones that earned their place:

- **Case-study hero drift** — the image moves 6% and grows 4% as the hero leaves, scrubbed
  to the scroll position. Transform only, so it cannot cause layout. Keyed on the slug
  rather than on mount (`ARCH-01`): React Router reuses the component when only `:slug`
  changes, and a mount-only effect would leave the next hero attached to the previous
  trigger.
- **Figure reveals** — wide figures scale in, grids stagger, both through the existing
  `data-inview` variants.
- **Velocity-linked marquees** — the playground rows speed up with the page, capped at 3×.

**Not built, and why:**

- **Sticky facts.** Merging `FactsStrip` into the contents rail is a layout change, and
  `MILESTONE-003` closed the case-study layout. It would want its own decision.
- **Active-section tracking** — already done in `MILESTONE-003`; the rail has marked the
  current section and shown progress since then.

### Two things worth knowing about the marquee

It moved from CSS keyframes to a GSAP tween. `timeScale` can be nudged and eased without
restarting, where changing `animation-duration` mid-flight jumps the row instead.

`timeScale` is **set outright** on each scroll event rather than tweened to: the row should
track the wheel rather than chase it, and there are six rows on the playground index — a
tween per row per scroll event would allocate hundreds of objects a second to change a
number. The ease is kept for slowing back down, where it is worth it.

The pause control still stops the rows dead — verified by pausing with the keyboard and
then scrolling hard: 0.0px of movement. "Paused" has to mean paused for WCAG 2.2.2, whatever
the velocity is doing.

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


## Amendment — the playground half is withdrawn (2026-09-10, SESSION-034)

This suggestion's marquee idea — rows that speed up as the page scrolls — shipped
in SESSION-012 and was **removed in SESSION-034**. The owner's words were "the
moving animation is also abit too busy".

The coupling itself was not the problem. **Five rows drifting in alternating
directions was**, and velocity-linking all five made a busy thing busier. Two of
the five were sliding hatched placeholders past, so a share of the movement had
nothing to show.

What replaced it keeps the spirit — motion that responds to where the reader is —
with one moving thing instead of five: a row runs only while the viewport's
centre line is inside its section (`DECISION-025`).

The rest of this suggestion, the case-study scroll-linked media, is untouched.
