# ARCH-04 — Animation & motion

Status: Current

## Purpose

Three independent motion systems coexist. Knowing which one owns a given effect is the
prerequisite for changing anything that moves.

## Relevant files

- `src/lib/useScrollReveals.ts` — GSAP + ScrollTrigger fade/lift for `[data-inview]`
- `src/lib/useScrollBehavior.ts` — not motion itself, but it sets the scroll offset the
  reveals are measured against (`DECISION-013`)
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

Rewritten in SESSION-002 to fix `ISSUE-001`. Three things now matter:

- **Both effects are keyed on `useLocation().pathname`**, not `[]`. React Router reuses one
  component instance across `/work/a → /work/b` (`ARCH-01`), and a mount-only effect left
  the incoming page's sections stuck at the outgoing page's inline state.
- **The at-rest state is applied by the hook, from a `useLayoutEffect`** — before the first
  paint, so it still does not flash — rather than by `index.css`. That rule and its
  reduced-motion override are gone. The point is failing safe: a page whose script never
  runs is now readable rather than blank.
- **The tweens are built in a passive effect**, which runs after `RootLayout` has finalised
  the scroll offset, and calls `ScrollTrigger.update()` first so GSAP re-reads the scroll
  position instead of measuring every trigger against the offset of the page the visitor
  came from.

That ordering is load-bearing and is spelled out in `DECISION-008`: changing either hook's
effect *kind* will break the other.

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

Handled in several places: the global `index.css` kill-switch (`animation-duration: .01ms`
etc.), an early `return` in **both** of `useScrollReveals`' effects — so nothing is hidden
in the first place — the `staticFlow` branch in `HeroProcess`, a branch in `LoveLine`,
`Footer`'s back-to-top `behavior` choice, and `useScrollBehavior`, which never scrolls
smoothly under reduced motion.

Verified in SESSION-002 with Chrome's `--force-prefers-reduced-motion`: across every
navigation tested, no `[data-inview]` element is ever hidden.

## Important dependencies

`gsap@3.15` and `gsap/ScrollTrigger`, registered at module scope in `useScrollReveals.ts`.

## Constraints

- The pinned flow writes inline styles every frame; anything else that sets those same
  properties will be overwritten.
- The static/pinned split is decided by a media query listener, so switching flows
  remounts a very different tree.

## Known weaknesses

- ~~Reveals never re-run when only a route param changes — `ISSUE-001` (critical).~~
  Fixed in SESSION-002.
- The rAF loop never idles: it runs continuously while the homepage is mounted, even when
  the hero is off-screen — `ISSUE-012`.
- Still no `ScrollTrigger.refresh()` after fonts/images load, so trigger positions can be
  stale. `useScrollReveals` calls `ScrollTrigger.update()` when it builds its triggers,
  which re-reads the *scroll position*; it does not re-measure trigger geometry.
- Motion values (durations, eases, distances) are ad-hoc per call site; there is no shared
  motion token module — `SUGGESTION-006`.
- No route transitions at all; navigation is an instant swap — `SUGGESTION-007`.
- The marquee has no visible pause control for keyboard users — `ISSUE-016` / `SUGGESTION-011`.

## Related decisions

`DECISION-007` (rAF, not ScrollTrigger, for the canvas), `DECISION-008` (GSAP for reveals,
amended), `DECISION-013` (hand-rolled scroll behaviour).

## Related issues

`ISSUE-001` (resolved), `ISSUE-012`, `ISSUE-016`, `ISSUE-019`.

## Related suggestions

`SUGGESTION-006`, `SUGGESTION-007`, `SUGGESTION-008`.
