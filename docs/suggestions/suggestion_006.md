# SUGGESTION-006 — Establish a shared GSAP motion system

Status: Proposed
Priority: High
Impact: High
Effort: Medium

## Problem / Opportunity

The owner wants richer scroll and interaction animation. Today there is exactly one
effect — a 0.7s fade + 18px lift on `[data-inview]` — plus three unrelated ad-hoc systems
(the rAF process canvas, CSS marquees, the `LoveLine` width transition). Durations, eases
and distances are hard-coded per call site, so anything added now will drift.

## Recommendation

A single `src/lib/motion.ts` exporting the vocabulary, then build on it:

- **Tokens:** `duration.fast/base/slow`, `ease.out/inOut`, `distance.sm/md/lg`, one
  `STAGGER`. Every animation uses these.
- ~~**`useScrollReveals` v2:** re-run on route change (fixes `ISSUE-001`)~~ — **done in
  SESSION-002**, independently of this suggestion. The motion values are now named
  constants (`AT_REST`, `REVEALED`, `TRIGGER_START`) at the top of the file, which is
  where this extraction should start. What remains here: use
  `ScrollTrigger.batch` for grids so items stagger as a group, call
  `ScrollTrigger.refresh()` after fonts and images settle, and support opt-in variants via
  `data-inview="up|fade|scale|stagger"`.
- **Reduced motion:** one guard, in one place, that all of the above consult.
- **Lazy GSAP:** `await import("gsap")` inside the effect so the 46 KB gzip is not on the
  critical path (`ISSUE-019`).

Once the vocabulary exists, add the effects the owner asked for: staggered card entrances,
heading line reveals, image scale-ins, and the parallax/pinning in `SUGGESTION-008`.

## Why

A motion *system* reads as intentional; a pile of one-off tweens reads as noise. It also
gives every future session a clear place to add animation.

## Relevant Files

- `src/lib/useScrollReveals.ts` (new: `src/lib/motion.ts`)
- `src/index.css` (`[data-inview]` at-rest rule, reduced-motion block)
- Every component carrying `data-inview` (15 call sites)

## Dependencies

~~Resolve `ISSUE-001` as part of this — same file, same fix.~~ `ISSUE-001` was resolved
in `MILESTONE-001` and no longer gates this.

## Risks

Over-animating. The design is restrained and editorial; motion should support reading, not
compete with it (`design-reference/SPEC.md` §11 and the WikiMind copy both say exactly
this — "Motion should guide, not distract").

## Related Issues

`ISSUE-001` (resolved), `ISSUE-012`, `ISSUE-019`.

## Possible Milestone

`MILESTONE-006` (with the `ISSUE-001` fix pulled forward into `MILESTONE-001`).
