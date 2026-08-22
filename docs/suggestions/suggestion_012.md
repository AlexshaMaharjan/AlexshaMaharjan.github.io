# SUGGESTION-012 — Image pipeline and bundle budget

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

`src/components/ui/Image.tsx` is a plain `<img>`; `sizes` is accepted and ignored. Today
that costs nothing because the real images are colour blocks — but the originals are
5000×3750 (`MANIFEST.md`). Dropping them in unprocessed would make the site very heavy.
Separately, GSAP and the case-study bundle are oversized (`ISSUE-019`).

## Recommendation

**Before real assets land:**

1. Add a build-time image step — `vite-imagetools` or `@unpic`/`sharp` — emitting WebP/AVIF
   plus a `srcset` at 3–4 widths, and teach `Image` to use `sizes` properly.
2. Add explicit `width`/`height` (or keep the existing aspect-ratio wrappers) so nothing
   shifts on load.
3. Keep `loading="lazy"` everywhere except the LCP hero, which should be `priority`
   (`Image` already supports this; `CaseStudyHero` currently does **not** pass it).

**Bundle:**

4. Lazy-import GSAP inside the effect.
5. Split case studies per slug, or configure `manualChunks`.
6. Set a Lighthouse/bundle budget so regressions are visible.

## Why

Image weight is the one thing most likely to make a finished, image-rich portfolio slow.

## Relevant Files

- `src/components/ui/Image.tsx`, `vite.config.ts`, `src/lib/useScrollReveals.ts`,
  `src/lib/caseStudies/index.ts`, `src/components/case-study/CaseStudyHero.tsx`

## Dependencies

Do the pipeline before `MILESTONE-005` bulk-imports real photos.

## Risks

An image plugin changes how `src` strings resolve — files currently live in `public/` and
are referenced by absolute path, which most plugins do **not** process. Moving them into
`src/assets/` is likely required; that touches every `src` string in `src/lib/**`.

## Related Issues

`ISSUE-019`, `ISSUE-006`, `ISSUE-007`.

## Possible Milestone

`MILESTONE-008` (pipeline pulled forward to just before `MILESTONE-005`).
