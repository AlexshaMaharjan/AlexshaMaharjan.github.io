# SUGGESTION-013 — Prerender routes and complete the SEO story

Status: **Mostly implemented** (SESSION-013 / SESSION-017) — 5 of 6; the `og:image` remains
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

## Where it stands (reviewed SESSION-025)

1. **Prerender at build time** — done. `scripts/prerender.mjs` emits the head of all 36 routes
   plus the SPA fallback, driving the same headless Chrome the verification uses. No
   `vite-react-ssg`, no Puppeteer, no new dependency.
2. **Per-locale meta, including `<html lang>`** — done, and asserted by `verify routes`.
3. **`hreflang` alternates** — done, and asserted by `verify routes` on every one of the 36.
4. **`sitemap.xml`** — done, generated from the same route list the prerender walks. The
   verification harness reads its route list *from* the sitemap, so the two cannot drift.
5. **A real `og:image`** — **still open** (`ISSUE-006`). It is a designed 1200×630 card, not a
   crop, and it needs the owner.
6. **The `Seo` meta leak** — done (`ISSUE-014`).

The one item left is the one that needs a person, so this stays open rather than closing.