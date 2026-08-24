# ISSUE-019 — GSAP and all six case studies ship in oversized shared chunks

Status: **Resolved** (SESSION-013, `93aa40b`) — the registry is split; GSAP staying eager
is now `DECISION-015` rather than an open ticket
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

## Resolution

The two halves had different answers, both recorded in `DECISION-015`.

**The case-study registry is split per slug.** Each study is a dynamic `import()` behind a
cached promise, read with React's `use()` so the page suspends into the loading bar rather
than rendering empty:

| | Before | After |
| --- | --- | --- |
| Case-study chunk | 126 KB / 40 KB gzip | 13 KB shell + 15–22 KB for the study being read |
| JS on a case-study page | ~480 KB | ~474 KB, and it no longer grows with every study added |

Suspending rather than loading in an effect is load-bearing: an effect renders the page
empty first, and `useScrollReveals` would build its triggers against markup that does not
exist yet — `ISSUE-001` rebuilt from parts.

**GSAP stays eager.** It is already its own chunk; deferring it puts the reveals' at-rest
state after the first paint (the flicker `ISSUE-013` describes from the other side); the
alternative of not hiding what is already on screen was built and reverted in SESSION-011;
and it now drives five features rather than the single fade it did when this was filed.
Dropping it altogether would save 46 KB gzip and is a rewrite of five working features —
`DECISION-015` records that as the alternative it is.

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
