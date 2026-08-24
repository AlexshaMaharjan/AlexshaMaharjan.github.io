# SESSION-012 — Three things tied to the scroll

Date: 2026-08-25
Milestone: `MILESTONE-006` — Motion system and interaction polish (closing it)
Objective: `SUGGESTION-008` — the scroll-linked half: hero parallax, figure reveals,
velocity-linked marquees.
Outcome: **Three effects built, two deliberately not** (`1f59f04`). `MILESTONE-006` is
complete.

## What Changed

- **Case-study hero drift.** The image moves 6% and grows 4% as the hero leaves, scrubbed
  to the scroll position. Transform only, so it cannot cause layout, and keyed on the slug
  rather than on mount — React Router reuses the component when only `:slug` changes
  (`ARCH-01`), and a mount-only effect would leave the next case study's hero attached to
  the previous one's trigger. Measured: `y 0 → 3.8 → 36`, `scale 1 → 1.004 → 1.04` across
  the scroll, then held.
- **Figure reveals.** Wide figures `scale` in; grids `stagger`. Both use the variants
  SESSION-011 added, and both are **nested** inside sections that already reveal — which
  this session decided is coherent, and recorded in `DECISION-008`: a child is always lower
  in the flow than its section, so its trigger never fires first.
- **Velocity-linked marquees.** The playground rows speed up with the page, capped at 3×,
  easing back after 140ms of stillness.

## Not built, and why

- **Sticky facts.** Merging `FactsStrip` into the contents rail is a layout change, and
  `MILESTONE-003` closed the case-study layout. It wants its own decision, not a drive-by.
- **Active-section tracking** — already done in `MILESTONE-003`.

## The marquee rewrite

It moved from CSS keyframes to a GSAP tween, because `timeScale` can be nudged and eased
without restarting, where changing `animation-duration` mid-flight jumps the row.

`timeScale` is **set outright** on each scroll event rather than tweened to. The row should
track the wheel rather than chase it, and there are six rows on the playground index — a
tween per row per scroll event would allocate hundreds of objects a second to change one
number. The ease is kept only for slowing back down.

The pause control now calls `pause()` on the tween. Verified the way it matters: pause with
the keyboard, then scroll hard — **0.0px of movement**. "Paused" has to mean paused for
WCAG 2.2.2 whatever the velocity is doing.

## Three measurements that were wrong before they were right

This session spent more time on measurement than on code, and all three failures were the
harness rather than the site:

1. **"The figures never appear."** They were below the fold: I had scrolled the *section*
   into view, not the media inside it. They reveal correctly when they actually enter.
2. **"The hero parallax does nothing."** Measured at 600px of scroll, where the hero image
   has not reached its trigger yet — it starts 737px down the page.
3. **"The marquee never speeds up."** `html { scroll-behavior: smooth }` applies to
   *programmatic* scrolls, so `window.scrollBy` in a loop moved the page about 1px per
   frame — velocity was genuinely near zero. Driving `document.documentElement.scrollTop`
   directly showed `timeScale` climbing to 1.88. `useScrollBehavior` documents this same
   trap from the other side; it costs an hour every time it is forgotten.

Only after those did a real weakness show: the first mapping capped the boost at about
1.27× for ordinary scrolling, which is imperceptible. Sharpened, and cheapened, as above.

## Validation

- The pause control stops the rows dead under hard scrolling, and play restarts them.
- **Reduced motion:** on the playground, a case study and the homepage at 375px — the
  marquee transform is `none`, the hero transform is `none`, and nothing is hidden. The
  effects are absent, not slowed.
- 38 routes with nothing hidden and no overflow; axe 0 violations across 4 routes; the
  case-study reveal ring clean; cold hash landings at 104px in both locales; the
  prerendered metadata unchanged.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green.

## Remaining Concerns

- **`ISSUE-019` is the open question this milestone leaves**: 46 KB gzip of GSAP, now
  genuinely used by five things rather than one. Whether that is worth it is a decision
  someone should make deliberately rather than inherit.
- The hero drift is subtle by design. If the owner wants more, the numbers are two
  constants in `CaseStudyHero.tsx` — but the brief in `SPEC` §11 argues for less, not more.
- Six scroll listeners on the playground index, one per row. Each does a subtraction and
  sets a number; hoisting them into one shared velocity source would be tidier if more
  rows ever appear.
