# SUGGESTION-015 — Add a validation harness

Status: **Partially implemented** (SESSION-021 moved the harness into the repo) — 2 of 4
Priority: Low
Impact: Medium
Effort: Small

## Problem / Opportunity

There are no tests, no CI, and no automated check of any kind beyond `tsc` and ESLint run
by hand. `ISSUE-001` — content invisible on a common navigation path — is exactly the
class of bug a smoke test would have caught.

## Recommendation

Proportionate to a portfolio site, in priority order:

1. **CI:** a GitHub Actions workflow running `npm ci && npm run lint && npm run build` on
   push.
2. **Route smoke test:** visiting all ~36 routes, asserting a 200, an `<h1>`, no console
   errors, and — critically — that content is visible after a same-route navigation
   (`ISSUE-001`).

   SESSION-002 built exactly this check throwaway, driving headless Chrome over the
   DevTools Protocol with Node's built-in `WebSocket` — no dependency, ~90 lines. It
   caught three defects that code reading had missed. Playwright is still the better
   long-term answer, but the cheap version is worth knowing about: this suggestion does
   not have to wait for a dependency decision.
3. **Link check:** assert every internal `<Link to>` resolves to a registered route, and
   every `image` / `heroImage.src` string points at a file that exists in `public/images/`.
4. **Lighthouse budget** on the homepage and one case study.

Skip unit tests — this codebase is presentational and they would not pay for themselves.

## Why

Cheap insurance for a site that will be edited by many short sessions.

## Relevant Files

- `package.json`, new `.github/workflows/ci.yml`, new `tests/`

## Dependencies

The link checker is most useful once real images land (`MILESTONE-005`).

## Risks

None; keep it small enough that it never becomes the thing being maintained.

## Related Issues

`ISSUE-001`, `ISSUE-006`.

## Possible Milestone

`MILESTONE-008`.

## Where it stands (reviewed SESSION-025)

2. **Route smoke test** — done, and then some. `npm run verify` is `scripts/verify/run.mjs`
   plus a static server with GitHub Pages semantics: 36 routes asserted for 200, title and
   `hreflang`; every image on every route at dpr 1, 2 and 3 checked for broken, missing `alt`
   and **failed requests**; axe across all routes; horizontal overflow; stuck reveals; reduced
   motion; and page weight. It is the CDP-over-`WebSocket` approach this file predicted, with
   no dependency — and SESSION-021 moved it into the repository so it stops being rebuilt from
   prose every session (`docs/reference/verification.md`).
3. **Link check** — partly. Image sources are covered from two directions:
   `image-variants.mjs --check` fails the build on a stale variant map, and the image sweep
   catches a `srcset` candidate that 404s. What is *not* checked statically is that every
   internal `<Link to>` resolves to a registered route.

**Still open:**

1. **CI** — there is no GitHub Actions workflow. Everything is run by hand.
4. **Lighthouse budget** — not run. The weight check covers the imagery half of what it would
   have told us, and nothing else.

Both remaining items assume the repository is pushed, and it is not: the branch is forty-odd
commits ahead of `main` and unpushed by the owner's choice. CI on a branch nobody fetches
would be theatre.