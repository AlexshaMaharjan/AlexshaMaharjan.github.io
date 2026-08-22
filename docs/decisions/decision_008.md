# DECISION-008 — GSAP for scroll reveals, called per page

Status: Active
Date: Uncommitted working tree, 2026-08 (added after `7fb7755`)
Scope: Animation

## Context

The `.dc.html` reference used an `IntersectionObserver` to fade `[data-inview]` elements
in. The Vite port needed an equivalent.

## Decision

Add `gsap` + `ScrollTrigger` and a `useScrollReveals()` hook, **called by each page
component** rather than once in the layout. `index.css` sets `[data-inview] { opacity: 0 }`
so nothing flashes before the first tween, with a reduced-motion override restoring
visibility.

## Reasoning

Recorded in the hook's own docstring: pages are lazy-loaded, so a layout-level effect keyed
on the route would fire before the page's `[data-inview]` markup mounted and find nothing.

## Alternatives

`IntersectionObserver` (what the reference used — zero bytes, no dependency, sufficient
for a fade); a layout-level GSAP context with `ScrollTrigger.refresh()` on navigation.

## Consequences

- ~46 KB gzip of GSAP for a fade and an 18px lift (`ISSUE-019`) — justified only if the
  motion work in `MILESTONE-006` actually uses GSAP's range.
- Every new page must remember to call the hook.
- The mount-only effect combined with the CSS `opacity: 0` guard produces `ISSUE-001`, a
  critical bug: content stays invisible when only a route param changes.
- The CSS guard is a single point of failure — if the hook does not run, content is gone.

## Relevant Files

`src/lib/useScrollReveals.ts`, `src/index.css`, `package.json`, all page components

## Related Issues / Milestones

`ISSUE-001`, `ISSUE-019`, `MILESTONE-001`, `MILESTONE-006`, `SUGGESTION-006`
