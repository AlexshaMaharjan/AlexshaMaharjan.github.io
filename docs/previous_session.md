# Previous Session

Session: SESSION-012
Milestone: `MILESTONE-006` — Motion system and interaction polish (**closed**)
Objective: `SUGGESTION-008` — the scroll-linked half: hero parallax, figure reveals,
velocity-linked marquees.
Outcome: **Three effects built, two deliberately not.** `MILESTONE-006` is complete.

## What Changed

- **Case-study hero drift** — the image moves 6% and grows 4% as the hero leaves, scrubbed
  to scroll position, transform only. Keyed on the slug rather than on mount: React Router
  reuses the component when only `:slug` changes (`ARCH-01`), and a mount-only effect would
  leave the next hero attached to the previous trigger.
- **Figure reveals** — wide figures scale in, grids stagger. Both are **nested** inside
  sections that already reveal, which this session decided is coherent and recorded in
  `DECISION-008`: a child is always lower in the flow, so its trigger never fires first.
- **Velocity-linked marquees** — the playground rows speed up with the page, capped at 3×,
  easing back after 140ms of stillness. They moved from CSS keyframes to a GSAP tween,
  because `timeScale` can be nudged without the jump that changing `animation-duration`
  mid-flight causes.

**Not built:** sticky facts (merging `FactsStrip` into the rail is a layout change, and
`MILESTONE-003` is closed) and active-section tracking (already done there).

## What the pause control had to keep doing

Verified the way it matters: pause with the keyboard, then scroll hard — **0.0px of
movement**. "Paused" has to mean paused for WCAG 2.2.2, whatever the velocity is doing.

## Three measurements that were wrong before they were right

More of this session went on measurement than on code, and every failure was the harness:

1. **"The figures never appear."** They were below the fold — I had scrolled the *section*
   into view, not the media inside it.
2. **"The hero parallax does nothing."** Measured at 600px of scroll; the hero image starts
   737px down the page and had not reached its trigger.
3. **"The marquee never speeds up."** `html { scroll-behavior: smooth }` applies to
   *programmatic* scrolls, so `window.scrollBy` in a loop moved the page ~1px a frame and
   the velocity really was near zero. Driving `document.documentElement.scrollTop` showed
   `timeScale` climbing to 1.88. `useScrollBehavior` documents this trap from the other
   side.

Only then did a real weakness surface: the first mapping capped the boost near 1.27× for
ordinary scrolling — imperceptible. It was sharpened, and made cheaper: `timeScale` is now
set outright rather than tweened to, because six rows each allocating a tween per scroll
event is hundreds of objects a second to change one number.

## Validation

- Reduced motion on three pages: the marquee transform is `none`, the hero transform is
  `none`, nothing hidden. The effects are **absent, not slowed**.
- 38 routes with nothing hidden and no overflow; axe 0 violations; the reveal ring clean;
  cold hash landings at 104px in both locales; prerendered metadata unchanged.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green.

## Remaining Concerns

- **`ISSUE-019`** is the question this milestone leaves behind: 46 KB gzip of GSAP, now
  used by five things rather than one. Worth deciding deliberately rather than inheriting.
- The hero drift is subtle by design; the numbers are two constants if the owner wants more,
  though `SPEC` §11 argues for less.
- Six scroll listeners on the playground index, one per row — tidy them into one shared
  velocity source if more rows ever appear.
- **Nothing is deployed.** Nineteen commits sit unpushed on `milestone-003-content-model`.

## Detailed Session Record

See `docs/sessions/session_012.md`.
