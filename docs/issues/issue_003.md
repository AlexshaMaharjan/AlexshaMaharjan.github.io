# ISSUE-003 — Scroll position is not reset on route change

Status: Open
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

Navigating from deep inside a long page (a case study is several thousand pixels tall) to
another route keeps the previous scroll offset, dropping the visitor into the middle of
the new page.

## Evidence / Current Behavior

`createBrowserRouter` in `src/main.tsx` is used without rendering `<ScrollRestoration />`,
and no manual scroll reset exists (verified by grep for `ScrollRestoration` /
`scrollIntoView` / `window.scrollTo` — the only `scrollTo` is `Footer`'s back-to-top
button).

Worst case: `/work/qis-portal` (long) → `/playground` via the mode switch.

## Expected Behavior

A new route starts at the top, unless the URL carries a hash (`ISSUE-002`) or the visitor
used the browser back button, in which case the previous position is restored.

## Relevant Files

- `src/main.tsx`, `src/routes.tsx`, `src/components/RootLayout.tsx`

## Possible Cause

Same migration gap as `ISSUE-002`.

## Possible Solution

Render `<ScrollRestoration />` inside `RootLayout` (supported by the data router), or a
manual `useEffect` on `pathname`. Must cooperate with the hash handling from `ISSUE-002`
and must not fight the pinned scroll track on the homepage.

## Dependencies

Implement together with `ISSUE-002`.

## Related

`ARCH-01`, `MILESTONE-001`.
