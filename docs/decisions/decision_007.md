# DECISION-007 — The process canvas is hand-written rAF, not GSAP ScrollTrigger

Status: Active
Date: Inherited from the original implementation
Scope: Homepage animation

## Context

The signature homepage interaction — a rounded black card that grows to full-bleed while
a question shrinks into place and five branches reveal — was specified in
`design-reference/SPEC.md` §5 as "a pinned scroll-driven transition" with per-stage
opacity curves, and implemented in the reference `.dc.html` as a plain `<script>`.

## Decision

Port it as a `requestAnimationFrame` loop reading `window.scrollY` and writing inline
styles, with a local `smoothstep()` easing helper. Provide an entirely separate static
render for `max-width: 880px` and `prefers-reduced-motion`.

## Reasoning

The reference implementation was itself a rAF loop; porting the maths directly preserved
the exact choreography. GSAP was not yet a dependency when this was written — it arrived
later for scroll reveals (`DECISION-008`).

## Alternatives

GSAP ScrollTrigger with `pin` + `scrub` (would express the same choreography declaratively
and idle when off-screen); CSS scroll-driven animations (insufficient browser support at
the time).

## Consequences

- The choreography matches the reference closely.
- 408 lines of imperative style-writing in one component — the hardest area to modify.
- The loop never idles (`ISSUE-012`).
- Two motion systems now coexist on the homepage; anything that touches the canvas must
  not fight GSAP.

## Revisit when

`MILESTONE-006` — if the motion system consolidates on GSAP, re-expressing this with
`scrub` becomes attractive. It is a rewrite, not a refactor; do not attempt it casually.

## Relevant Files

`src/components/process/HeroProcess.tsx`, `branchData.ts`, `BranchGroup.tsx`,
`clusters.tsx`, `icons.tsx`

## Related Issues / Milestones

`ISSUE-012`, `MILESTONE-006`
