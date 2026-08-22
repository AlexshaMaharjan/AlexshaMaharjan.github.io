# ISSUE-013 — No prerendering: crawlers and link previews see one static English page

Status: Open
Priority: Medium
Category: SEO
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

The site is a pure client-rendered SPA. Every URL serves the same `index.html` with the
same hard-coded English title, description and Open Graph tags. Per-route metadata is
written by JavaScript after load, which social-media scrapers do not execute.

## Evidence / Current Behavior

- `index.html:14-33` — a single static `<title>`, `description`, `og:*` and
  `twitter:card` set, copied from the English homepage. `og:image` points at
  `alexsha_photo-mrx9hbwx-nif2.png`, which is currently a solid colour block
  (`ISSUE-006`).
- `src/components/Seo.tsx` writes `document.title` and meta tags in a `useEffect` — after
  hydration only.
- `public/robots.txt` allows everything; there is no `sitemap.xml`.
- No `hreflang` alternates linking `/x` and `/de/x`.
- `vite.config.ts` has no prerender/SSG plugin.

Practical effect: sharing `/work/wikimind` on LinkedIn shows the generic homepage title
and a grey square.

## Expected Behavior

Each route serves correct, per-locale metadata to crawlers and unfurlers.

## Relevant Files

- `index.html`, `src/components/Seo.tsx`, `vite.config.ts`, `public/robots.txt`

## Possible Cause

Lost with the move off Next.js, which handled per-route metadata server-side.

## Possible Solution

Add a build-time prerender step (e.g. `vite-plugin-ssr`/`vite-react-ssg`, or a small
Puppeteer post-build) emitting one HTML file per known route with baked meta — the route
set is finite and fully enumerable from `caseStudySlugs`, `categorySlugs`, `projectSlugs`
and the static pages. Add `sitemap.xml` and `hreflang` alternates at the same time.

## Dependencies

Interacts with the deployment decision (`ISSUE-025`).

## Related

`ARCH-01`, `ARCH-06`, `MILESTONE-008`, `SUGGESTION-013`.
