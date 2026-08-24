# DECISION-015 — GSAP stays eagerly loaded; the case-study registry does not

Status: Active
Date: 2026-08-25 (SESSION-013)
Scope: Performance, motion

## Context

`ISSUE-019` filed two bundle complaints together, and they turned out to have different
answers.

Measured on the production build, uncompressed transfer, cache disabled:

| Chunk | Before | After |
| --- | --- | --- |
| Case study (all six studies, both locales) | 126 KB / 40 KB gzip | 13 KB shell + 15–22 KB per study |
| GSAP + ScrollTrigger | 114 KB / 46 KB gzip | unchanged |
| Total JS on a case-study page | ~480 KB | ~474 KB, of which a quarter is GSAP |

First contentful paint: 152ms on the homepage, 168ms on a case study.

## Decision

**Split the case-study registry per slug.** Each study is a dynamic `import()` behind a
cached promise, read with React's `use()` so the page suspends into the loading bar rather
than rendering empty. A visitor reading one case study downloads that one.

**Leave GSAP eagerly imported**, and stop treating that as a defect to be fixed later.

## Reasoning

The registry split is free: nobody needs the other five studies, the loading state already
existed (`ISSUE-020`), and suspending keeps the content present before `useScrollReveals`
builds its triggers — an effect-based load would render the page empty first and rebuild
the `ISSUE-001` bug from parts.

GSAP is a different case:

- **It is already code-split.** It is not in the main bundle; it is its own chunk.
- **Deferring it hides content rather than saving time.** The reveals apply their at-rest
  state in a layout effect *before the first paint*, deliberately, so an incoming page never
  flashes fully visible. Behind an `await`, that hide lands after the paint — which is the
  flicker SESSION-010 spent its session removing, in the other direction.
- **The alternative is to stop hiding what is already on screen**, which SESSION-011 built,
  measured, and reverted: it removed the entrance animation the site was designed with.
- **It earns more than it did when `ISSUE-019` was filed.** Then it drove one fade. It now
  drives the reveals and their four variants, the case-study hero drift, the velocity-linked
  playground rows, and the trigger refresh after fonts settle.

## Alternatives

**Drop GSAP entirely.** Everything it does here could be rebuilt on `IntersectionObserver`,
a scroll listener and the Web Animations API in perhaps a hundred lines — the reveals were
originally an `IntersectionObserver` in the design reference (`DECISION-008`). That would
save 46 KB gzip on every page.

It is a rewrite of five working features, not a refactor, and it should be its own decision
with its own session — the same line `MILESTONE-006` drew around the process canvas. Worth
revisiting if the site ever needs to be fast on a slow connection more than it needs to be
what it is.

## Consequences

- A case-study visit is ~100 KB lighter, and the six studies no longer grow one chunk
  together as content is added.
- `getCaseStudy` is gone; the registry exposes `caseStudyPromise` and `localeContent`. The
  two generator scripts await it.
- GSAP remains a quarter of the JavaScript on every page. That is now a recorded choice
  rather than an open ticket.
- `ISSUE-019` is closed by this decision, not by fixing everything it listed.

## Relevant Files

`src/lib/caseStudies/index.ts`, `src/pages/CaseStudy.tsx`, `src/lib/useScrollReveals.ts`,
`scripts/content-guide-case-studies.mjs`, `scripts/image-manifest.mjs`

## Related Issues / Milestones

`ISSUE-019`, `ISSUE-020`, `ISSUE-001`, `DECISION-008`, `MILESTONE-006`, `MILESTONE-008`
