# ISSUE-020 — Lazy routes render a blank frame

Status: Open
Priority: Low
Category: UI/UX
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

Every page is `React.lazy`, and the single Suspense boundary has `fallback={null}`. On a
first visit to a route (or a slow connection) the visitor sees header, empty white space
and footer with no indication anything is loading.

## Evidence / Current Behavior

`src/components/RootLayout.tsx:19` — `<Suspense fallback={null}>`.
`src/routes.tsx:6-13` — eight lazy page components.

The largest lazy chunk is `CaseStudy` at 121 KB (`ISSUE-019`), so the gap is most visible
opening a case study cold.

## Expected Behavior

A minimal, non-jarring loading state — or an eager preload of the likely next route.

## Relevant Files

- `src/components/RootLayout.tsx`, `src/routes.tsx`

## Possible Cause

Placeholder left in during the migration.

## Possible Solution

A quiet skeleton or a thin top progress bar matching the design language, plus link
prefetch on hover for `NextProjectNav` and the mode switch. Keep it subtle — a spinner
would be off-register for this design.

## Dependencies

Nice to combine with page transitions (`SUGGESTION-007`), which need a defined
enter/exit state anyway.

## Related

`ARCH-01`, `MILESTONE-006`.
