# Previous Session

Session: SESSION-010
Milestone: `MILESTONE-008` — Performance, SEO, deployment (first slice)
Objective: `ISSUE-014` (metadata leaking between routes) and `ISSUE-013` (every URL serving
scrapers the same hard-coded English head).
Outcome: **Both resolved.** Each route's head is prerendered; the body deliberately is not,
and that call is the substance of the session.

## What Changed

**`ISSUE-014`** — `Seo` restored only `document.title`, so description, `og:title`,
`og:description` and `og:image` persisted into the next route: the résumé carried
WikiMind's description and hero image. It now writes the complete set on every route —
including `og:url`, `og:locale`, `twitter:*` and a canonical — falling back to the site
defaults. Writing everything is what makes leaking impossible.

**`ISSUE-013`** — `npm run prerender` writes each of the 36 routes its own HTML file with
its own head, plus `sitemap.xml`, with `robots.txt` pointing at it. `predeploy` runs it, so
publishing cannot forget. **No new dependency**: it serves `dist/` from a 20-line static
server and drives the same headless Chrome the project already verifies with.

## The judgment call worth knowing about

Prerendering the **body** as well works — a non-JS crawler gets 1,279 words on a case
study. It was built, measured, and reverted.

Pages are lazy, so React hydrates into a null Suspense fallback before the route's chunk
arrives and empties the markup already on screen: **content at ~110ms, blank from ~150ms,
back at ~400ms**. That flicker is paid by every human visitor to serve crawlers that do not
run JavaScript — while the search engines that matter here do, and social scrapers only read
the head.

Two attempts to remove it, both reverted rather than left in the code: `hydrateRoot` with a
route preloader (awaiting `import()` primes the module cache but not `React.lazy`'s own
payload), and skipping the reveal for whatever is already on screen at first load (it hid
the symptom and quietly changed the site's designed entrance). `ISSUE-013` records what
making the body safe would take.

## A measurement that lied

Two flicker measurements disagreed with each other. Both were polluted:
`Page.addScriptToEvaluateOnNewDocument` accumulates across runs in the same browser, so
observers from earlier experiments were writing to the same globals. Re-measured in a
freshly launched browser, and only then trusted. **Instrumentation that survives navigation
needs a fresh browser per experiment.**

## Validation

- **The test that proves `ISSUE-013`**: plain HTTP fetches with JavaScript never executed —
  10 distinct titles across 13 sampled routes, each with its own canonical, description,
  image and language. A browser test would have passed either way.
- 38 routes render with no console errors, broken images or overflow; axe-core 0 violations
  across 8 routes; the reveal ring, anchor clearance and reduced motion unchanged.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green in ~0.8s. The
  prerender adds ~38s and only to `predeploy`.

## Remaining Concerns

- **`og:image` is still a solid-colour placeholder** on every route without its own hero
  (`ISSUE-006`): previews will be right in shape and wrong in substance until real files
  land. Of everything outstanding, this is the one the owner can fix.
- `ISSUE-019` (bundle size) is the last open item in `MILESTONE-008`, and is also what
  would have to move for body prerendering to be worth revisiting.
- The prerender hard-codes the macOS Chrome path (`CHROME=…` overrides). It runs on a
  developer machine at deploy time; there is no CI.
- **Nothing is deployed.** Fifteen commits sit unpushed on `milestone-003-content-model`.

## Detailed Session Record

See `docs/sessions/session_010.md`.
