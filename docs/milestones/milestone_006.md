# MILESTONE-006 — Motion system and interaction polish

Status: **Mostly complete** (SESSION-011) — the vocabulary, the reveals, the transitions
and the canvas gating are done; `SUGGESTION-008`'s scroll-linked effects are not
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

- [x] **SUGGESTION-006** — `src/lib/motion.ts` holds duration / ease / distance / stagger
      and the one reduced-motion guard; `index.css` mirrors the numbers for CSS transitions
- [x] Rebuild `useScrollReveals` on those tokens, with `refresh()` after fonts and images
      settle and opt-in variants via `data-inview="up|fade|scale|stagger"`. Stagger is one
      trigger animating the element's children, which is what `ScrollTrigger.batch` was for
- [ ] ~~Lazy-import GSAP inside the effect (`ISSUE-019`)~~ — **not done, deliberately.**
      The at-rest state is applied in a layout effect *before paint* so an incoming page
      never flashes visible; awaiting an import there puts the hide after the first paint
      and reintroduces the flash. See `SUGGESTION-006`
- [x] **ISSUE-012** — the canvas loop is gated by an `IntersectionObserver`: 120 fps on
      screen, 0 off screen, measured by instrumenting the loop
- [x] **SUGGESTION-007** — a 350ms fade on arrival, plus `ISSUE-020`'s loading state
- [ ] **SUGGESTION-008** — case-study hero parallax, figure scale-ins, velocity-linked
      marquees. The vocabulary these would use now exists; active-section tracking was
      already done in `MILESTONE-003`
- [x] Verify every effect is a no-op under `prefers-reduced-motion` — 38 routes, nothing
      hidden, no running animations
- [x] Check for jank: the reveals animate opacity and transform only; the page transition
      is opacity only

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
