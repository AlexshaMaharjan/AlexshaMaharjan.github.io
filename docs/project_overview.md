# Project Overview

A bilingual (EN/DE) personal design portfolio for **Alexsha Maharjan** — a UI/UX, brand
and visual designer based in Lübeck, Germany, originally from Nepal, studying
Information Technology and Design (B.Sc.) at Technische Hochschule Lübeck.

The site has two "modes" the visitor toggles between in the header:

- **Portfolio** — professional work: six case studies, About, Résumé, contact.
- **Playground** — personal/unbriefed work: five categories of experiments on a
  paper-grid background with a deliberately hand-made, taped-photo visual language.

## Purpose

Communicate who Alexsha is, how she works (the signature scroll-driven "process canvas"
on the homepage), and the depth of six real projects — as a job/collaboration-seeking
portfolio. Copy is held to an explicit honesty constraint: no invented metrics, clients
or awards, and collaborative work is credited as such (see `DECISION-011`).

## Technology

| Area | Choice |
| --- | --- |
| Build | Vite 6, `@vitejs/plugin-react` |
| UI | React 19, TypeScript 5.7 (strict, `noUncheckedIndexedAccess`) |
| Routing | `react-router-dom` 7 (`createBrowserRouter`), client-side SPA |
| Styling | Tailwind CSS 3.4 with a fully replaced token palette + `src/index.css` |
| Animation | GSAP 3.15 + ScrollTrigger (scroll reveals); hand-written rAF for the process canvas; CSS keyframes for playground marquees |
| Utility | `clsx` |
| Lint | ESLint 9 flat config + typescript-eslint + react-hooks/react-refresh |

Migrated from Next.js (App Router) to a Vite SPA in commit `7fb7755` — see
`DECISION-001`. Next.js leftovers still sit in the tree (`ISSUE-018`).

## Pages / routes

Every route is registered twice — bare (English) and `/de`-prefixed (German), via the
`dual()` helper in `src/routes.tsx`.

| Route | Page |
| --- | --- |
| `/` | Home — hero + pinned process canvas + selected work + about preview + contact |
| `/about` | About — portrait, biography, focus/tools, "outside the work" carousel, "I love ___" line, résumé CTA |
| `/resume` | Résumé — print-optimised single column |
| `/contact` | Redirect to `/#contact` |
| `/work/:slug` | Case study — 6 slugs: `wikimind`, `afono`, `sync-fm`, `barrier-free-kitchen`, `surugami`, `qis-portal` |
| `/playground` | Playground home — featured, category index, five auto-scrolling marquees |
| `/playground/:category` | 5 categories, in this order: `games-and-apps`, `photography-3d-motion`, `graphic-design`, `digital-art`, `crafts` (`DECISION-023`) |
| `/playground/:category/:slug` | Playground project — only `motorbike-study` exists |
| `*` | 404 |

## Major features

- Scroll-pinned "process canvas": a rounded black card that grows full-bleed and reveals
  five interactive process branches with illustrated clusters (`ARCH-04`).
- Two-language content system driven entirely by typed TS data modules (`ARCH-02`).
- Six long-form case studies sharing one template with a sticky "on this page" rail.
- Playground with paper-grid texture, rotated/taped cards, CSS marquees, hand-written
  Caveat annotations.
- Print-ready résumé page.
- `prefers-reduced-motion` respected throughout.

## Design direction (inferred from the repo)

Editorial and restrained: near-white page, `#111111` ink, a single cobalt accent
`#1B3FE0`, Inter for everything except monospace metadata and Caveat hand-notes.
Very large negative space and large clamp-scaled display type. The Playground inverts
this into a warmer, tactile, "scrapbook" register. Full token table:
`docs/reference/design_tokens.md`.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build && cp dist/index.html dist/404.html
npm run preview   # serve dist/
npm run lint      # eslint .
npm run deploy    # gh-pages -d dist (predeploy runs the build)

npm run prerender # write each route's <head> into dist/ + sitemap.xml (predeploy runs it)

node scripts/content-guide-case-studies.mjs --write   # regenerate CONTENT_GUIDE.md §5
node scripts/image-manifest.mjs --write               # regenerate the image manifest
```

Build is currently green; lint emits 3 `react-refresh/only-export-components` warnings,
0 errors.

## Deployment

**GitHub Pages**, set up by the owner on 2026-08-22 (`f8df707`, `7332ad8`, `11930a6`):
`npm run deploy` builds and pushes `dist/` to the `gh-pages` branch via the `gh-pages`
package. The build copies `index.html` to `404.html` as the SPA fallback. There is no CI
workflow — the push-time attempt was reverted for lack of a workflow token scope — and
`public/_redirects` (the Netlify convention) is now a leftover. `ISSUE-025` is resolved;
the domain question is still open.

## Significant dependencies

- **gsap** (~115 KB in the bundle) — currently pulled into a shared chunk loaded by every
  page that reveals content (`ISSUE-019`).
- **react-router-dom 7** — data router; note it does *not* restore scroll or handle hash
  anchors on its own. Both are handled by `src/lib/useScrollBehavior.ts`, deliberately
  **not** by `<ScrollRestoration />` — see `DECISION-013`.
- **tailwindcss 3.4** — `theme.colors` and `theme.screens` are *replaced*, not extended.

## Related documents

- Current state → `docs/current_state.md`
- Architecture → `docs/architecture/index.md`
- Where code lives → `docs/codebase/index.md`
- External project documents (content guide, design spec, image manifest) →
  `docs/reference/index.md`
