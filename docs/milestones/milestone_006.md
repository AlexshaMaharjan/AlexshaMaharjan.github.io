# MILESTONE-006 — Motion system and interaction polish

Status: Proposed
Priority: Medium
Goal: Give the site a coherent, restrained motion vocabulary — and add the scroll and
interaction animation the owner asked for.

## Why This Milestone Exists

The owner's fourth stated priority: interactive animations, scroll animations, GSAP.
Today there is one effect (a 0.7s fade + 18px lift) plus three unrelated ad-hoc systems.
Anything added now without a shared vocabulary will drift.

## Scope

The motion system, scroll-linked effects, page transitions. Cross-cutting but additive.

## Tasks

- [ ] **SUGGESTION-006** — create `src/lib/motion.ts` with duration / ease / distance /
      stagger tokens and one reduced-motion guard
- [ ] Rebuild `useScrollReveals` on those tokens: `ScrollTrigger.batch` for grids,
      `refresh()` after fonts and images settle, opt-in variants via
      `data-inview="up|fade|scale|stagger"`
- [ ] Lazy-import GSAP inside the effect (`ISSUE-019`)
- [ ] **ISSUE-012** — gate the process-canvas rAF loop with an `IntersectionObserver`;
      cache viewport dimensions instead of reading per frame
- [ ] **SUGGESTION-007** — page transitions (~250–350 ms), with `ISSUE-020`'s loading state
- [ ] **SUGGESTION-008** — case-study hero parallax, figure scale-ins, active-section
      tracking, velocity-linked playground marquees
- [ ] Verify every effect is a no-op under `prefers-reduced-motion`
- [ ] Check for jank: no layout-triggering properties in scrubbed animations

## Relevant Issues

`ISSUE-012`, `ISSUE-019`, `ISSUE-020` (and `ISSUE-001` if `MILESTONE-001` left anything)

## Relevant Suggestions

`SUGGESTION-006`, `SUGGESTION-007`, `SUGGESTION-008`

## Relevant Decisions

`DECISION-007` (the canvas stays rAF unless deliberately rewritten — record a new decision
if it moves to ScrollTrigger), `DECISION-008`

## Relevant Code

- `src/lib/useScrollReveals.ts` → new `src/lib/motion.ts`
- `src/components/process/HeroProcess.tsx`
- `src/components/RootLayout.tsx`, `src/components/case-study/*`,
  `src/components/playground/CategoryMarquee.tsx`
- `src/index.css`

## Dependencies

`MILESTONE-001` (the reveal bug), and layout should be settled (`MILESTONE-002`/`003`) —
animating a layout that is about to change is wasted work.

## Completion Criteria

- One motion module; no bare durations or eases at call sites.
- Reduced motion produces a fully static, fully visible site.
- No dropped frames on a mid-range laptop while scrolling the homepage or a case study.
- The owner recognises the site as more alive without it feeling busy.

## Out of Scope

Rewriting the process canvas from scratch. If that becomes desirable, make it its own
milestone — it is a rewrite, not a refactor.

## Notes

The restraint matters. Both `design-reference/SPEC.md` §11 and the site's own WikiMind
copy say the same thing: motion should guide, not distract.
