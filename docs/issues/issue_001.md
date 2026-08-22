# ISSUE-001 — Scroll reveals never re-run on same-route navigation

Status: Open
Priority: Critical
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

Navigating between two URLs that match the *same* route (e.g. `/work/wikimind` →
`/work/afono`, or `/playground/crafts` → `/playground/editorial`) leaves every
`[data-inview]` element on the new page permanently invisible.

## Evidence / Current Behavior

- `src/routes.tsx` registers `{ path: "/work/:slug", element: <CaseStudy /> }` with no
  `key`. React Router reuses the same component instance when only a param changes, so
  the component does not remount.
- `src/lib/useScrollReveals.ts:16` runs its effect with `[]` dependencies — it fires once
  per mount and never again.
- `src/index.css:105` sets `[data-inview] { opacity: 0 }` at rest, on the assumption GSAP
  will always take over.
- Result: the new page's sections keep `opacity: 0`. On a case study that is
  `src/components/case-study/Section.tsx:80` — every section after the first.

The affected navigation paths are ones a visitor will actually take:
`NextProjectNav` prev/next links, and the `CategoryPage` next-category link.

Derived from code reading; **runtime confirmation in a browser is recommended** before
and after the fix.

## Expected Behavior

Content is visible and animates in on every navigation, including param-only changes.

## Relevant Files

- `src/lib/useScrollReveals.ts`
- `src/routes.tsx`
- `src/index.css` (the `[data-inview]` at-rest rule)
- `src/components/case-study/NextProjectNav.tsx`, `src/components/playground/CategoryPage.tsx`

## Possible Cause

A mount-only effect combined with a CSS rule that hides content until that effect runs.

## Possible Solution

Any one of:
1. Key the page element by param so it remounts (`<CaseStudy key={slug} />` pattern — needs
   a wrapper since `routes.tsx` builds elements statically).
2. Add `useLocation().pathname` to the hook's dependency array and re-create the tweens.
3. Have the hook run `ScrollTrigger.refresh()` and re-scan on pathname change.

Option 2 is the smallest change and keeps the "call once per page" contract.
Whichever is chosen, also make the at-rest CSS fail safe (e.g. reveal after a timeout, or
set `opacity: 0` from JS rather than CSS) so a future regression cannot blank the page.

## Dependencies

None.

## Related

`ARCH-01`, `ARCH-04`, `MILESTONE-001`. Sibling navigation bugs: `ISSUE-002`, `ISSUE-003`.
