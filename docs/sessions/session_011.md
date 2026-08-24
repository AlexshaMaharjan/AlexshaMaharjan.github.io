# SESSION-011 — One motion vocabulary, and three things to say with it

Date: 2026-08-24
Milestone: `MILESTONE-006` — Motion system and interaction polish
Objective: The owner's fourth stated priority — a coherent motion vocabulary, plus the
scroll and interaction animation asked for.
Outcome: **`SUGGESTION-006` and `SUGGESTION-007` implemented, `ISSUE-012` and `ISSUE-020`
resolved** (`06afc41`). `SUGGESTION-008`'s scroll-linked effects are not done, and the
milestone stays open for them.

## What Changed

**`src/lib/motion.ts`** holds the vocabulary — `duration.fast/base/slow`,
`ease.out/inOut`, `distance.sm/md/lg`, `stagger`, and the single `prefersReducedMotion()`
guard everything consults. `index.css` mirrors the same numbers as `--duration-*` and
`--ease-out` for the transitions written in Tailwind. `useScrollReveals` is rebuilt on
them, so the two object literals at the top of that file are no longer the de facto
system.

**Reveals gained variants**, chosen per element with `data-inview="up|fade|scale|stagger"`.
`stagger` animates the element's *children* under one trigger — the homepage bento and the
playground category grid use it. Measured mid-flight: `0.42 / 0.22 / 0.00` across the first
tiles, which is the whole point of it.

Triggers are now re-measured once webfonts and images have settled. They were being
measured against a layout still reflowing underneath them.

**Page transitions** — a 350ms fade on arrival. Three deliberate departures from what
`SUGGESTION-007` sketched, each recorded in `PageTransition.tsx`:

- **enter only** — an exit animation has to hold the outgoing tree while the incoming one
  mounts, which fights the scroll reset for the same frame;
- **opacity only** — a transform would make the wrapper the containing block for the
  case-study rail and break its stickiness;
- **no `key` on the subtree** — keying by pathname would remount every page, which is the
  behaviour the scroll hooks are written *around* (`ARCH-01`).

**`ISSUE-020`** — `Suspense` had `fallback={null}`, so a first visit to a case study showed
header, blank, footer. It now shows a 2px accent bar and announces "Loading page…".

**`ISSUE-012`** — the process canvas's rAF loop ran for as long as the homepage was
mounted. An `IntersectionObserver` starts and stops it with the track.

## What was deliberately not done

**Lazy-importing GSAP** (`ISSUE-019`, listed as a task on this milestone). The at-rest
state is applied in a layout effect *before the browser paints*, precisely so an incoming
page never flashes fully visible. `await import("gsap")` there would put the hide after the
first paint and reintroduce the flash — the same trap SESSION-010 hit from the other
direction with prerendering. It is worth revisiting only alongside a decision about whether
GSAP earns its 46 KB at all.

**`SUGGESTION-008`** — hero parallax, figure scale-ins, velocity-linked marquees. The
vocabulary they would use now exists; the effects themselves are a session's work and the
milestone stays open for them.

## Measuring the canvas

A `MutationObserver` on the map's `style` attribute reported **zero** writes whether the
canvas was on screen or off — because writing the same value twice is not a mutation, and
at rest the loop recomputes the same numbers every frame. The honest measure was to
instrument the loop with a counter, build, measure, and revert:

| | frames per second |
| --- | --- |
| track on screen | 120 |
| scrolled far past it | **0** |
| scrolled back | 120 |

## Validation

- 38 routes render with no console errors and no overflow; under `prefers-reduced-motion`,
  **nothing is hidden and no animation runs** on any of them.
- axe-core: 0 violations across 6 routes, with the new loading state in the tree.
- Every scroll journey unchanged: cold hash landings at 104px in both locales, a route
  change from a scrolled page starts at 0, back restores 5000px exactly.
- The case-study reveal ring across three hops: nothing left hidden.
- The prerendered metadata still correct after the RootLayout change.
- The loading state verified on a throttled connection **with caching disabled** — a warm
  chunk never suspends, so the first attempt showed nothing and proved nothing.

## Remaining Concerns

- **`SUGGESTION-008` is the visible half of what the owner asked for** — parallax and
  scale-ins are what "scroll animations" usually means. What exists now is the system and
  three restrained uses of it.
- `ISSUE-019` (46 KB of GSAP for a fade and a lift) is now the open question this milestone
  raises rather than answers.
- The stagger is on two grids. The case-study media grids are nested inside sections that
  already reveal, so staggering them would mean deciding what a nested reveal should do.
