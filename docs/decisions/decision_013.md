# DECISION-013 — Hand-rolled scroll behaviour instead of `<ScrollRestoration />`

Status: Active
Date: 2026-08-22 (SESSION-002)
Scope: Routing, navigation

## Context

`ISSUE-002` and `ISSUE-003` both needed fixing, and their own notes offered the obvious
option: render react-router's `<ScrollRestoration />`, which already does top-reset,
back/forward restore, and a hash scroll, backed by `sessionStorage`.

## Decision

Write `src/lib/useScrollBehavior.ts` instead, called once from `RootLayout`, and do not use
`<ScrollRestoration />`.

## Reasoning

Its source (`node_modules/react-router/dist/development/chunk-*.mjs`, `useScrollRestoration`)
was read before deciding. Three things make it the wrong fit here:

1. **Its hash branch cannot see a lazy page.** It runs `document.getElementById(...)` in a
   `useLayoutEffect` that fires on the same commit as the navigation. Every page in this app
   is `React.lazy` behind a `Suspense` boundary (`ARCH-01`), so on a cold navigation the
   target does not exist yet; it falls through to `window.scrollTo(0, 0)` and never retries.
   That is precisely `ISSUE-002`.
2. **It scrolls with the two-argument `window.scrollTo(0, 0)`**, which inherits
   `html { scroll-behavior: smooth }` from `index.css`. Every route change would animate as
   a long sweep back up the outgoing page.
3. **Its hash scroll and its restore cannot be sequenced with the reveals.** `ISSUE-001`'s
   fix depends on the scroll offset being final and synchronous before `useScrollReveals`
   builds its ScrollTriggers.

Combining it with a separate hash hook was considered and rejected: the two would each
scroll on the same commit, and the built-in one would win or lose depending on effect
ordering.

## Alternatives

- `<ScrollRestoration />` alone — fails 1 and 2 above.
- `<ScrollRestoration />` plus a `useHashScroll()` — two components racing for the scroll
  position on every navigation.
- Removing `html { scroll-behavior: smooth }` so the built-in behaves — would silently
  change the case-study contents rail, whose `ContentsNav` uses native `<a href="#…">`
  anchors and relies on that rule.

## Consequences

- ~200 lines to own and keep working, against a maintained upstream component.
- In exchange: the hash scroll survives Suspense, the smooth/instant choice is explicit per
  navigation, reduced motion is honoured, and the ordering that `ISSUE-001` depends on is
  guaranteed.
- `history.scrollRestoration` is set to `"manual"`, so the browser's own restoration is off
  and this hook is now solely responsible for it.
- Scroll offsets live in `sessionStorage` under `am:scroll-positions`, keyed by
  `location.key`; failures there are swallowed (private mode) and degrade to "no restore".

## Relevant Files

`src/lib/useScrollBehavior.ts`, `src/components/RootLayout.tsx`, `src/index.css`

## Related Issues / Milestones

`ISSUE-002`, `ISSUE-003`, `ISSUE-022`, `ISSUE-001`, `MILESTONE-001`, `DECISION-001`
