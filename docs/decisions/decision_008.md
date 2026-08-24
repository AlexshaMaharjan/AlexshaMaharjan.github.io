# DECISION-008 — GSAP for scroll reveals, called per page

Status: Active — amended in SESSION-002
Date: Uncommitted working tree, 2026-08 (added after `7fb7755`)
Scope: Animation

## Context

The `.dc.html` reference used an `IntersectionObserver` to fade `[data-inview]` elements
in. The Vite port needed an equivalent.

## Decision

Add `gsap` + `ScrollTrigger` and a `useScrollReveals()` hook, **called by each page
component** rather than once in the layout. ~~`index.css` sets `[data-inview] { opacity: 0 }`
so nothing flashes before the first tween, with a reduced-motion override restoring
visibility.~~

**Amended, SESSION-002:** the CSS guard is gone. The hook now applies the at-rest state
itself from a `useLayoutEffect` — before the first paint, so it still does not flash — and
its effects are keyed on the pathname rather than on mount. See the Consequences below.

**Amended, SESSION-012:** nested reveals are allowed, and coherent. A `[data-inview]`
element inside a section that also carries one is always lower in the flow than its
section, so its trigger never fires first: while the section is at rest the child is
invisible with it, and once the section has arrived the child waits for its own turn.
Case-study media uses this — wide figures `scale`, grids `stagger`.

**Amended, SESSION-011:** the timings moved to `src/lib/motion.ts` (`SUGGESTION-006`) and
the hook gained `data-inview` variants — `up` (the default), `fade`, `scale` and `stagger`,
where one trigger animates the element's children. The contract below is unchanged: the
at-rest state is still applied in a layout effect before paint, still `opacity` rather than
`autoAlpha`, and still consults one reduced-motion guard — which now lives in the motion
module rather than in this file.

**Amended, SESSION-009:** the at-rest state is `opacity: 0`, not GSAP's `autoAlpha`.
`autoAlpha` also sets `visibility: hidden`, and a hidden subtree is removed from the tab
order — so any control inside a section that had not been revealed yet was unreachable by
keyboard, which is how the playground's new pause control turned out to be unusable
(`ISSUE-030`). At-rest elements are below the fold by definition, so being nominally
clickable while invisible costs nothing. Focus entering a `[data-inview]` section now
**completes that section's reveal tween** — not `gsap.set`, which would leave the trigger
armed to replay the reveal and flash the control the visitor is focused on.

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
- ~~The mount-only effect combined with the CSS `opacity: 0` guard produces `ISSUE-001`, a
  critical bug: content stays invisible when only a route param changes.~~ Fixed in
  SESSION-002 (`92b63f4`).
- ~~The CSS guard is a single point of failure — if the hook does not run, content is gone.~~
  Removed: the at-rest state is now owned by the hook, so a page whose script never runs is
  readable rather than blank.
- A `focusin` listener lives alongside the triggers and is torn down with them. It is a
  passive listener, so it does not touch the effect-ordering contract below.
- The hook is now coupled to `useScrollBehavior` by effect ordering: the at-rest state is
  applied in a layout effect (child, so it runs first), the ScrollTriggers are built in a
  passive effect (after `RootLayout` has finalised the scroll offset), and
  `ScrollTrigger.update()` is called first so GSAP does not measure against the outgoing
  page's offset. Changing either hook's effect *kind* will break the other.

## Relevant Files

`src/lib/useScrollReveals.ts`, `src/index.css`, `package.json`, all page components

## Related Issues / Milestones

`ISSUE-001` (resolved), `ISSUE-019`, `MILESTONE-001`, `MILESTONE-006`, `SUGGESTION-006`, `DECISION-013`
