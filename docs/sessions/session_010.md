# SESSION-010 — Metadata, so a shared link shows the right page

Date: 2026-08-24
Milestone: `MILESTONE-008` — Performance, SEO, deployment (first slice)
Objective: `ISSUE-014` (metadata leaking between routes) and `ISSUE-013` (every URL serving
the same hard-coded English head to scrapers).
Outcome: **Both resolved** (`c7bca1d`). The head is prerendered per route; the body
deliberately is not, and that call is the substance of the session.

## Starting state

Clean, on `milestone-003-content-model` at `b9ad070`, thirteen commits ahead of `main` and
unpushed.

## What Changed

**`ISSUE-014`** — `Seo` restored only `document.title` on unmount, so everything else
persisted into the next route: the résumé carried WikiMind's description and hero image. It
now writes the complete set on every route — description, `og:title`, `og:description`,
`og:image`, `og:url`, `og:locale`, `twitter:*` and canonical — falling back to the site
defaults. Writing everything is what makes leaking impossible; there is nothing left to
restore.

**`ISSUE-013`** — `npm run prerender` writes each of the 36 routes its own HTML file with
its own head, plus `sitemap.xml`; `robots.txt` points at it; `predeploy` runs it so
publishing cannot forget. No new dependency: it serves `dist/` from a 20-line static server
and drives the same headless Chrome the project already verifies with.

## The judgment call

Capturing the rendered **body** as well works, and gives a non-JS crawler the whole page —
1,279 words on a case study, 1,101 on the German QIS page, no hidden sections. It was built,
measured, and reverted.

Pages are lazy (`ARCH-01`). React hydrates into a `<Suspense fallback={null}>` before the
route's chunk arrives, which empties the markup already on screen: **content paints at
~110ms, is gone from ~150ms, and returns at ~400ms.** Every human visitor pays that flicker
so that crawlers which do not execute JavaScript can read the page — while the search
engines that matter here do execute it, and social scrapers only ever read the head.

Two attempts to remove the flicker, both reverted rather than left in:

- **`hydrateRoot` with a route preloader.** Awaiting the route's `import()` primes the
  module cache but not `React.lazy`'s own payload, so React suspends anyway.
- **Skipping the reveal for whatever is already on screen at first load.** It hid the
  symptom, existed only for that, and quietly changed the entrance the site was designed
  with.

Both are written up in `ISSUE-013` with what making the body safe would take.

## A measurement that lied

The first flicker measurement showed content present at 50ms, gone, then fading back — and
a later run showed the opposite ordering. Both were polluted:
`Page.addScriptToEvaluateOnNewDocument` accumulates across runs in the same browser, so
several observers from earlier tests were writing to the same globals. Re-measured in a
freshly launched browser, and only then trusted. **Instrumentation that persists across
navigations needs a fresh browser per experiment.**

## Validation

- **The test that actually proves `ISSUE-013`**: plain HTTP fetches with JavaScript never
  executed — 10 distinct titles across 13 sampled routes, each with its own canonical,
  description, image and language. Doing this in a browser would have passed either way.
- 38 routes render with no console errors, no broken images, no horizontal overflow.
- axe-core: 0 violations across 8 routes.
- The reveal ring, anchor clearance at 375 and 1440, and reduced motion: unchanged.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green in ~0.8s. The
  prerender adds ~38s, and only to `predeploy`.

## Remaining Concerns

- **`og:image` is still a solid-colour placeholder** for every route that has no hero
  image of its own (`ISSUE-006`) — the previews will be right in shape and wrong in
  substance until real files land.
- Canonicals have no trailing slash while GitHub Pages serves directories; search engines
  normalise this, and matching exactly would mean the canonical differing between the
  static file and the client-side router.
- `ISSUE-019` (bundle size) is the last open item in `MILESTONE-008`, and it is also what
  would have to move for body prerendering to be worth revisiting.
- The prerender script hard-codes the macOS Chrome path, overridable with `CHROME=…`. It
  runs on a developer machine at deploy time, not in CI — there is no CI.
