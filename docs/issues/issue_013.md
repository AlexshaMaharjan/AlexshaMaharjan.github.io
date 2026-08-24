# ISSUE-013 — No prerendering: crawlers and link previews see one static English page

Status: **Resolved** (SESSION-010, `c7bca1d`) — head prerendered per route; the body
deliberately not, see below
Priority: Medium
Category: SEO
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-24

## Resolution

`npm run prerender` (`scripts/prerender.mjs`, run by `predeploy`) writes each of the 36
routes its own HTML file carrying its own `<title>`, description, canonical, Open Graph
tags and `lang`, plus `sitemap.xml`; `robots.txt` points at the sitemap.

**No new dependency.** It serves `dist/` from a 20-line static server, drives the same
headless Chrome the project already verifies with, reads the head the app produced for each
route, and writes it into a copy of the built shell. `DECISION-001` chose a
client-rendered SPA deliberately and this keeps that choice.

Verified the only way that counts — plain HTTP fetches with **no JavaScript**: 10 distinct
titles across 13 sampled routes, each with its own canonical, description, image and
language.

### Why the head only, and what the body would cost

Capturing the rendered **body** as well works, and gives a non-JS crawler the whole page —
1,279 words on a case study, 1,101 on the German QIS page, with no hidden sections. It was
built, measured and reverted, because pages are lazy (`ARCH-01`): React hydrates into a
`<Suspense fallback={null}>` before the route's chunk arrives, which empties the markup
that is already on screen. Measured in a clean browser: content paints at ~110ms, is gone
from ~150ms, and returns at ~400ms. Every human visitor pays that flicker so that crawlers
which do not execute JavaScript can read the page — and the search engines that matter here
do execute it, while social scrapers only ever read the head.

Two attempts to remove the flicker, both reverted:

- **`hydrateRoot` plus a route preloader.** Awaiting the route's `import()` primes the
  module cache but not `React.lazy`'s own payload, so React still suspends and still
  empties the container.
- **Skipping the reveal animation for whatever is already on screen at first load.** It
  hid the symptom, but only existed for that, and it quietly changed the entrance the site
  was designed with.

Making the body prerender safe means the initial route rendering synchronously — eager
imports for the matched route, traded against `ISSUE-019`'s bundle-size concern. Worth
doing if non-JS crawlers ever matter more than they do now; the script is one `evaluate`
away from capturing `outerHTML` again.

### Known nicety, not fixed

Canonicals have no trailing slash (`/about`), while GitHub Pages serves the directory and
redirects `/about` → `/about/`. Search engines normalise this; matching them exactly would
mean the canonical differing between the static file and the client-side router.

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
