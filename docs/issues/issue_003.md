# ISSUE-003 — Scroll position is not reset on route change

Status: Resolved
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

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

## Resolution

Fixed in SESSION-002 (`65f2b2d`), `MILESTONE-001`, in the same
`src/lib/useScrollBehavior.ts` as `ISSUE-002` so the two cannot fight.

`<ScrollRestoration />` was evaluated and rejected — see `DECISION-013`. The hook records
`window.scrollY` per `location.key` (persisted to `sessionStorage` on `pagehide`), sets
`history.scrollRestoration = "manual"`, and on navigation either restores that offset
(back/forward), lands on the hash (`ISSUE-002`), or jumps to the top.

Measured before the fix: `/work/qis-portal` at 6000px → `/playground` landed at 4466px,
and every case-study hop arrived ~8000–9500px down the incoming page. After: every route
change arrives at `scrollY 0`, and back from `/resume` returns to `/about` at 1500px.
Verified against the production build at 1440px and 390px.
