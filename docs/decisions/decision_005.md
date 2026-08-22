# DECISION-005 — Hand-rolled `Image` and `Seo` replacing the Next.js equivalents

Status: Active
Date: Commit `7fb7755`
Scope: Components

## Context

The migration off Next.js removed `next/image` and the metadata API, both of which the
implementation depended on.

## Decision

Two minimal stand-ins:

- `src/components/ui/Image.tsx` — an `<img>` with `loading`/`decoding` and the `fill`
  layout mode only. `sizes` is accepted for API compatibility and **ignored**; the
  docstring says so explicitly.
- `src/components/Seo.tsx` — imperative `document.title` and `<meta>` writes in an effect.

## Reasoning

Stated in the `Image` docstring: every call site uses the `fill` pattern, and there is no
build-time responsive-image pipeline, so implementing more would be speculative. Keeping
the same prop names made the migration a near-mechanical find-and-replace.

## Alternatives

`vite-imagetools` (a real pipeline — deferred, see `SUGGESTION-012`); `react-helmet-async`
(a dependency for what is ~40 lines).

## Consequences

- No `srcset`, no modern formats, no width/height — fine while images are colour blocks,
  a problem once 5000×3750 originals arrive (`SUGGESTION-012`).
- `Seo` runs after hydration, so crawlers never see it (`ISSUE-013`), and it only restores
  `title` on unmount (`ISSUE-014`).
- The ignored `sizes` prop is a small trap: call sites pass it and it does nothing.

## Relevant Files

`src/components/ui/Image.tsx`, `src/components/Seo.tsx`

## Related Issues / Milestones

`ISSUE-013`, `ISSUE-014`, `MILESTONE-008`
