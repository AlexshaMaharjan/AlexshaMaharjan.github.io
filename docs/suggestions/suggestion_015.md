# SUGGESTION-015 — Add a validation harness

Status: Proposed
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
2. **Route smoke test:** Playwright visiting all ~36 routes, asserting a 200, an `<h1>`,
   no console errors, and — critically — that content is visible after a same-route
   navigation (`ISSUE-001`).
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
