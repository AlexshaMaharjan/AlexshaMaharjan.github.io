# ISSUE-019 — GSAP and all six case studies ship in oversized shared chunks

Status: Open
Priority: Medium
Category: Performance
Discovered: 2026-08-22 (SESSION-001, from a real build)
Last reviewed: 2026-08-22

## Summary

Two chunks are larger than they need to be: GSAP (115 KB raw / 46 KB gzip) is fetched by
every page that reveals content, and all six case studies plus both locales are bundled
into a single 121 KB chunk downloaded to read any one of them.

## Evidence / Current Behavior

`npm run build` output (2026-08-22):

```
dist/assets/index-C8owE30T.js            327.58 kB │ gzip 104.82 kB
dist/assets/CaseStudy-B_zLQMTa.js        121.00 kB │ gzip  38.36 kB
dist/assets/useScrollReveals-DVVoVByM.js 115.35 kB │ gzip  45.69 kB
dist/assets/Home-BMJOcwFb.js              37.94 kB │ gzip  10.23 kB
```

- `src/lib/useScrollReveals.ts:2-5` imports `gsap` and `gsap/ScrollTrigger` at module
  scope and calls `registerPlugin` immediately, so any page importing the hook pulls all
  of GSAP — that is Home, About, CaseStudy and all three Playground pages.
- `src/lib/caseStudies/index.ts:3-8` statically imports all six modules, so the registry
  cannot be split. Combined EN+DE source of those six files is ~2000 lines.

## Expected Behavior

A visitor downloads roughly the code for the page they are on.

## Relevant Files

- `src/lib/useScrollReveals.ts`, `src/lib/caseStudies/index.ts`, `vite.config.ts`

## Possible Cause

Straightforward static imports; no manual chunking configured.

## Possible Solution

- Import only the GSAP core plus ScrollTrigger (already the case) but load the module
  lazily inside the effect (`await import("gsap")`) so reduced-motion users and
  above-the-fold-only visits never pay for it.
- Make `getCaseStudy` return a dynamic `import()` per slug, or configure
  `build.rollupOptions.output.manualChunks` to split per case study.
- Consider whether the ~46 KB gzip of GSAP is justified for a fade+lift; if the motion
  work in `MILESTONE-006` uses more of GSAP, it becomes worth it.

## Dependencies

Interacts with `MILESTONE-006` — decide the motion system first, then optimise its
loading.

## Related

`ARCH-04`, `ARCH-06`, `MILESTONE-008`, `SUGGESTION-012`.
