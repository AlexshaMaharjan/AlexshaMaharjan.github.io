# SUGGESTION-007 — Page transitions between routes

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

Navigation is an instant, hard swap. Combined with `fallback={null}` (`ISSUE-020`) and no
scroll reset (`ISSUE-003`), moving between pages feels abrupt and occasionally broken.
`ROADMAP.md` Phase 3 already lists this.

## Recommendation

A short, restrained crossfade-and-lift on route change (~250–350 ms), driven by the motion
tokens from `SUGGESTION-006`:

- Exit: fade current `<main>` slightly, hold.
- Swap + scroll reset.
- Enter: fade/lift in, then let scroll reveals take over below the fold.

The prev/next case-study links are the strongest candidate for something more expressive
later (a shared-element move from the next-project card into the new hero), but that
should wait until the base transition is solid.

## Why

Removes the two most jarring moments in the site and makes the lazy-chunk wait feel
deliberate rather than broken.

## Relevant Files

- `src/components/RootLayout.tsx`, `src/routes.tsx`, `src/lib/motion.ts` (new)

## Dependencies

`ISSUE-002` + `ISSUE-003` must land first — a transition over a page that opens
mid-scroll makes things worse, not better.

## Risks

Transitions that delay content hurt perceived performance. Keep under ~350 ms and skip
entirely under `prefers-reduced-motion`.

## Related Issues

`ISSUE-003`, `ISSUE-020`.

## Possible Milestone

`MILESTONE-006`.
