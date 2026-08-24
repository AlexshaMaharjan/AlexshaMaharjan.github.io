# ISSUE-012 — Process canvas runs an unconditional requestAnimationFrame loop

Status: **Resolved** (SESSION-011, `06afc41`)
Priority: Medium
Category: Performance
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

On desktop the homepage runs a `requestAnimationFrame` loop continuously for as long as
the page is mounted, recomputing and writing ~15 inline styles every frame — including
while the hero is far off-screen and nothing is changing.

## Evidence / Current Behavior

`src/components/process/HeroProcess.tsx:106-181`: `frame()` unconditionally calls
`requestAnimationFrame(frame)` at its end. It is started once and only cancelled on
unmount. Each frame reads `window.innerHeight` / `innerWidth` / `scrollY` (layout reads)
and then writes to `canvas.style`, `hero.style`, `q.style`, `map.style`, plus a loop over
five `lineRefs` and, when not interactive, five `groupRefs`.

The static (mobile / reduced-motion) branch has no loop, so this only affects desktop.

## Resolution

An `IntersectionObserver` on the track starts and stops the loop, with a 300px margin so the
first frame is computed before the canvas scrolls into view. Measured by instrumenting the
loop itself — a `MutationObserver` could not see it, because writing the same style value
twice is not a mutation:

| | frames per second |
| --- | --- |
| track on screen | 120 |
| scrolled far past it | **0** |
| scrolled back | 120 |

The per-frame `window.innerWidth` / `innerHeight` reads are still there; they are cheap
next to the style writes, and `measure()` already caches the layout values that matter.

## Expected Behavior

Work happens only when scroll position changes and the section is near the viewport.

## Relevant Files

- `src/components/process/HeroProcess.tsx`

## Possible Cause

Direct port of a `.dc.html` reference script that used a permanent rAF loop.

## Possible Solution

Gate the loop: start on scroll/resize, stop after progress stabilises, or drive it from a
scroll listener with `requestAnimationFrame` coalescing. An `IntersectionObserver` on the
track can suspend it entirely once the section leaves the viewport. Cache the viewport
dimensions from the existing `measure()`/resize path instead of reading them per frame.

## Dependencies

Should be done alongside any motion-system work so the two do not conflict.

## Related

`ARCH-04`, `MILESTONE-006`, `SUGGESTION-006`.
