# SUGGESTION-012 — Image pipeline and bundle budget

Status: **Done for images** (SESSION-019); the bundle half still stands
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

1. ~~Add a build-time image step~~ — done SESSION-019, but **not** with a plugin.
   `vite-imagetools` only sees files through the module graph, so it would have forced the
   move to `src/assets/` this file lists under Risks, and it pulls in `sharp`.
   `scripts/image-variants.mjs` generates the widths in the Chrome this project already
   drives, so `axe-core` is still the only devDependency. `ui/Image` builds the `srcset`
   from the generated `src/lib/imageVariants.ts`, and `predeploy` runs `--check` so a stale
   map cannot ship — a missing variant is a 404 inside a `srcset`, which is invisible.
2. ~~Add explicit `width`/`height` (or keep the existing aspect-ratio wrappers)~~ — the
   aspect-ratio wrappers were kept, which this point allows.
3. ~~Keep `loading="lazy"` everywhere except the LCP hero, which should be `priority`~~ —
   done 2026-08-25: `CaseStudyHero` passes `priority`. The rest of point 3 still stands.

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

**This risk is what decided the implementation** (SESSION-019): the generator writes variants
beside the originals in `public/`, so not one `src` string moved.

## Related Issues

`ISSUE-019`, `ISSUE-006`, `ISSUE-007`.

## Possible Milestone

`MILESTONE-008` (pipeline pulled forward to just before `MILESTONE-005`).
