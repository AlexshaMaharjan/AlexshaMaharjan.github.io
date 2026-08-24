# SUGGESTION-007 — Page transitions between routes

Status: **Implemented** (SESSION-011, `06afc41`) — enter only, and the file says why
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

## What was actually built

A 350ms opacity fade on arrival, in `src/components/PageTransition.tsx`, driven by
`duration.base` from the motion module. **Three deliberate departures from the sketch
above:**

- **No exit.** Holding the outgoing tree while the incoming one mounts puts the transition
  in a fight with the scroll reset and the reveals over the same frame (`DECISION-013`,
  `DECISION-008`).
- **Opacity only, no lift.** A transform on the wrapper would make it the containing block
  for the case-study contents rail and break its stickiness.
- **No `key` on the subtree.** Keying by pathname would remount every page — the exact
  behaviour the scroll hooks are written around (`ARCH-01`). Animating the wrapper leaves
  the tree, and the hooks, alone.

The shared-element idea for prev/next case studies is still unbuilt, and still the right
next thing if more expression is wanted.

## Why

Removes the two most jarring moments in the site and makes the lazy-chunk wait feel
deliberate rather than broken.

## Relevant Files

- `src/components/RootLayout.tsx`, `src/routes.tsx`, `src/lib/motion.ts` (new)

## Dependencies

~~`ISSUE-002` + `ISSUE-003` must land first~~ — **both landed in SESSION-002**, so this is
unblocked. The original reasoning: a transition over a page that opens
mid-scroll makes things worse, not better.

## Risks

Transitions that delay content hurt perceived performance. Keep under ~350 ms and skip
entirely under `prefers-reduced-motion`.

## Related Issues

`ISSUE-003`, `ISSUE-020`.

## Possible Milestone

`MILESTONE-006`.
