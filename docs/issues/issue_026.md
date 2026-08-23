# ISSUE-026 — Footer columns overflow the viewport between 768px and 839px

Status: **Resolved** (SESSION-005, `f32a45e`)
Priority: Low
Category: Responsive / Layout
Discovered: 2026-08-23 (SESSION-004, while width-testing the case studies)
Resolved: 2026-08-23 (SESSION-005)
Last reviewed: 2026-08-23

## Summary

Every page scrolls horizontally by up to 24px on tablet-width screens. The footer's link
columns are wider than the space the `md:` padding leaves them.

## Evidence / Current Behavior

Measured in Chrome against the production build, on `/`, `/about` and `/work/wikimind`
alike — `document.documentElement.scrollWidth` against `window.innerWidth`:

| Viewport | Document | Overflow |
| --- | --- | --- |
| 740px | 740 | — |
| **768px** | **792** | **24px** |
| **800px** | **810** | **10px** |
| 840px | 840 | — |

The overflowing element is `src/components/Footer.tsx:40`,
`<div className="flex gap-16 md:col-span-5">` — two link columns with a 64px gap, inside
`px-5 md:px-20` (80px of padding each side from 768px up). At 768px the padding and the
gap together exceed what is left for the columns, and the flex row refuses to shrink.

It appears exactly at the `md` breakpoint because that is where the 80px padding starts.

## Resolution

The footer's link columns wrap — `flex flex-wrap gap-x-16 gap-y-6` — so they can never
demand more width than the row has. Verified across seven pages (home, About, résumé, a
case study, Playground, a Playground category, and the German homepage) at fourteen widths
from 320px to 1920px: no page scrolls horizontally at any of them.

The shared padding scale (`md:px-20` from 768px up, which is what makes the room so tight)
was left alone deliberately. Changing it moves the gutters on every page at every width
between 768px and 1023px — a visual change to the whole site, which belongs with
`SUGGESTION-009`/`SUGGESTION-010`, not with a defect fix.

## Expected Behavior

No page scrolls horizontally at any viewport width.

## Relevant Files

- `src/components/Footer.tsx` (the `flex gap-16 md:col-span-5` row)

## Possible Cause

`md:px-20` was chosen for the wide layouts and applied from 768px up, where it costs 160px
of a 768px viewport. `ISSUE-016` and `SUGGESTION-010` describe the same gap in coverage:
the 768–1160px band has never been systematically checked.

## Possible Solution

Either stagger the padding (`md:px-10 lg:px-20`) or let the footer columns wrap
(`gap-8 lg:gap-16`, or `flex-wrap`). The padding scale is the more general fix and would
want doing across the shared container, not just here — which is why this belongs with the
responsive audit rather than as a spot fix.

## Dependencies

None. Pre-existing — measured on the pre-`MILESTONE-003` build too.

## Related

`ISSUE-016`, `SUGGESTION-010`, `MILESTONE-007`.
