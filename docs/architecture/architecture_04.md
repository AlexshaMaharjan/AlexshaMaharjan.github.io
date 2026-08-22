# ARCH-04 — Animation & motion

Status: Current

## Purpose

Three independent motion systems coexist. Knowing which one owns a given effect is the
prerequisite for changing anything that moves.

## Relevant files

- `src/lib/useScrollReveals.ts` — GSAP + ScrollTrigger fade/lift for `[data-inview]`
- `src/components/process/HeroProcess.tsx` — the pinned process-canvas choreography
- `src/components/process/BranchGroup.tsx`, `clusters.tsx`, `branchData.ts`, `icons.tsx`
- `src/components/playground/CategoryMarquee.tsx` + `@keyframes mqA/mqB` in `index.css`
- `src/components/about/LoveLine.tsx` — the cycling "I love ___" word
- `src/components/Header.tsx` — scroll-state background/blur transition

## How it currently works

### 1. Scroll reveals (GSAP)

`useScrollReveals()` is called **per page component**, not in the layout — the comment in
the file explains why (lazy pages mean a layout-level effect would run before the page's
markup mounts). It collects every `[data-inview]` element and creates one
`gsap.fromTo(el, {autoAlpha:0, y:18}, {autoAlpha:1, y:0, duration:.7, ease:"power2.out",
scrollTrigger:{trigger:el, start:"top 88%"}})` per element, killing them on unmount.
`index.css` sets `[data-inview] { opacity: 0 }` so nothing flashes before GSAP mounts, and
restores `opacity: 1` under `prefers-reduced-motion`.

There are 15 `[data-inview]` call sites across the site.

### 2. The process canvas (hand-written rAF)

`HeroProcess` chooses between two entirely separate renders:

- **Static flow** (`max-width: 880px` **or** reduced motion): hero section, then a normal
  black section containing a scaled 1440×900 map. No scroll effects.
- **Pinned flow** (desktop): a `280svh` track with a `sticky top-0 h-svh` stage. A
  permanent `requestAnimationFrame` loop reads `window.scrollY`, derives a progress `p`,
  and drives every property imperatively through `smoothstep()` easing — canvas `top`,
  `width`, `height`, `borderRadius` (44 → 0), hero `opacity`/`translateY`, the question's
  `left`/`top`/`width`/`fontSize`, map `scale`/`opacity`, per-line `strokeDashoffset`
  (staggered by index), and per-branch reveal. Above `p ≥ 0.9` the map becomes
  interactive (`setInteractiveOn(true)`); below `0.85` it resets.

Branch geometry is data in `branchData.ts` (percentage `left`/`top`, SVG path, endpoint
caps). Each branch renders a `BranchGroup` with a number, a title button (hover = soft
focus, click = lock, close button), a question, and an illustrated `Cluster` from
`clusters.tsx` — 630 lines of hand-built SVG/CSS collage (polaroids with `clip-path`
torn edges, pins, dark panels, icon badges) with hard-coded English labels.

### 3. CSS animations

`@keyframes mqA` / `mqB` translate a tripled item list by ∓33.333% for the playground
category marquees; direction alternates by index, duration `47 + index*3` seconds; hover
pauses via `hover:[animation-play-state:paused]`; a `mask-image` gradient fades both
edges. Disabled under reduced motion via `[data-marquee] { animation: none !important }`.

`LoveLine` cycles a word every 2400 ms, measuring each word's width with a hidden mirror
span and transitioning `width` + `opacity`.

### Reduced motion

Handled in three places: the global `index.css` kill-switch (`animation-duration: .01ms`
etc.), an early `return` in `useScrollReveals`, the `staticFlow` branch in `HeroProcess`,
a branch in `LoveLine`, and `Footer`'s back-to-top `behavior` choice.

## Important dependencies

`gsap@3.15` and `gsap/ScrollTrigger`, registered at module scope in `useScrollReveals.ts`.

## Constraints

- The pinned flow writes inline styles every frame; anything else that sets those same
  properties will be overwritten.
- The static/pinned split is decided by a media query listener, so switching flows
  remounts a very different tree.

## Known weaknesses

- Reveals never re-run when only a route param changes — `ISSUE-001` (critical).
- The rAF loop never idles: it runs continuously while the homepage is mounted, even when
  the hero is off-screen — `ISSUE-012`.
- No `ScrollTrigger.refresh()` after fonts/images load, so trigger positions can be stale.
- Motion values (durations, eases, distances) are ad-hoc per call site; there is no shared
  motion token module — `SUGGESTION-006`.
- No route transitions at all; navigation is an instant swap — `SUGGESTION-007`.
- The marquee has no visible pause control for keyboard users — `ISSUE-016` / `SUGGESTION-011`.

## Related decisions

`DECISION-007` (rAF, not ScrollTrigger, for the canvas), `DECISION-008` (GSAP for reveals).

## Related issues

`ISSUE-001`, `ISSUE-012`, `ISSUE-016`, `ISSUE-019`.

## Related suggestions

`SUGGESTION-006`, `SUGGESTION-007`, `SUGGESTION-008`.
