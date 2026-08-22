# SUGGESTION-013 — Prerender routes and complete the SEO story

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

Every URL serves the same English `index.html`; per-route meta is written by JS that no
scraper runs (`ISSUE-013`). Sharing a case study on LinkedIn — the single most likely way
this portfolio gets seen — shows a generic title and a grey square.

## Recommendation

1. **Prerender at build time.** The route set is finite and enumerable in code
   (`caseStudySlugs`, `categorySlugs`, `projectSlugs`, plus the static pages, × 2 locales
   ≈ 36 URLs). Use `vite-react-ssg` or a small Puppeteer post-build step to emit one HTML
   file per route with baked title/description/OG.
2. **Per-locale meta**, including `<html lang>` in the emitted HTML.
3. **`hreflang` alternates** linking each `/x` ↔ `/de/x` pair.
4. **`sitemap.xml`**, generated from the same route list.
5. **A real `og:image`** — currently the stand-in portrait (`ISSUE-006`).
6. Fix the meta leak in `Seo` (`ISSUE-014`) so the client-side path agrees with the baked
   HTML.

## Why

A portfolio that cannot be shared attractively loses most of its reach.

## Relevant Files

- `vite.config.ts`, `index.html`, `src/components/Seo.tsx`, `src/routes.tsx`,
  `src/lib/caseStudies/index.ts`, `src/lib/playground/categories/index.ts`

## Dependencies

Host choice (`ISSUE-025`) affects how prerendered files are served.

## Risks

Prerendering a page whose hero is a scroll-pinned rAF animation needs care — verify the
homepage renders sensibly with JS disabled and hydrates without a flash.

## Related Issues

`ISSUE-013`, `ISSUE-014`, `ISSUE-006`, `ISSUE-025`.

## Possible Milestone

`MILESTONE-008`.
