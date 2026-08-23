# ISSUE-027 — A URL-bar hash change on the current page bypasses the app's scroll handling

Status: Open
Priority: Low
Category: Routing / Navigation
Discovered: 2026-08-23 (SESSION-004)
Last reviewed: 2026-08-23

## Summary

Editing only the fragment of the current URL — `/work/wikimind` → `/work/wikimind#overview`
— is a same-document fragment navigation. React Router never sees it, `useScrollBehavior`
never runs, and the browser's own jump lands on wherever the scroll reveal has the section
at that instant: up to 18px past the intended position.

## Evidence / Current Behavior

Measured in Chrome against the production build, 1440px, motion enabled. Load
`/work/wikimind`, sit at the top, then navigate to `/work/wikimind#overview`:

| Build | Section top after landing | Expected |
| --- | --- | --- |
| Before `MILESTONE-003` | 93px (and 92px for `#insights`) | 104px |
| After SESSION-004 | 104px in this repro; 86px when the section is at full at-rest offset | 104px |

The error is exactly the scroll reveal's at-rest `y: 18` (`DECISION-008`), scaled by how
far the reveal tween has run. It is **not** the bug fixed in SESSION-004: that one was in
`useScrollBehavior`'s own aiming and is gone. This path never reaches that hook.

Every other way of reaching an anchor is exact, all measured at 104px: cold cross-document
loads, cross-route `<Link>` clicks, same-page `<Link>` clicks, and the case-study contents
rail's plain `<a href="#id">` clicks (those are native too, but CSS smooth scrolling means
they arrive after the reveal has finished).

## Expected Behavior

Any way of arriving at an anchor lands it under the header, once, at the same offset.

## Relevant Files

- `src/lib/useScrollBehavior.ts` — owns every other scroll side effect (`DECISION-013`)
- `src/lib/useScrollReveals.ts` — the at-rest transform the native jump measures against

## Possible Cause

A fragment navigation fires `hashchange`, not `popstate`, so React Router's location never
updates and the effect keyed on it never re-runs. The browser's built-in "scroll to
fragment" then wins, and it uses the element's rendered box, transform included.

## Possible Solution

A `hashchange` listener in `useScrollBehavior` that re-aims with the same layout-based
maths the rest of the hook now uses. Worth care: it must not fight the router if a future
version does pick these up, and the router's own location would still be stale afterwards.

## Dependencies

None. Rare journey — someone typing or pasting a hash for the page they are already on.

## Related

`DECISION-008`, `DECISION-013`, `ISSUE-001`, `ISSUE-002`, `ARCH-01`.
