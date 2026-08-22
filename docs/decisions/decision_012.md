# DECISION-012 — Static hosting with a catch-all SPA rewrite

Status: Decided (GitHub Pages via GitHub Actions)
Date: 2026-08-22
Scope: Deployment

## Context

Client-side routing means a request for `/work/wikimind` must be answered with
`index.html`, or the host returns 404.

## Decision

Ship `dist/` to a static host, providing the rewrite two ways: `public/_redirects`
(Netlify) and `cp dist/index.html dist/404.html` in the build script (GitHub Pages).

## Reasoning

**Unknown / inherited.** Both fallbacks appear to have been added speculatively so the
build would work on either host without a further decision.

## Alternatives

A Node server (unnecessary); Next.js static export (superseded by `DECISION-001`).

## Consequences

- The build output works on either host without further configuration.
- But neither host is actually configured, and there is no CI (`ISSUE-025`).
- Carrying both conventions is mildly confusing — a reader cannot tell which is intended.
- Deep links only work if the chosen host honours one of the two mechanisms.

## Open question for the owner

Which host, which domain, and does this replace `alexshamaharjan.myportfolio.com` (the
Adobe Portfolio URL still cited on the résumé page)?

## Relevant Files

`package.json`, `public/_redirects`, `src/lib/dictionaries/{en,de}.ts` (`portfolioHref`)

## Related Issues / Milestones

`ISSUE-025`, `MILESTONE-008`, `SUGGESTION-016`
