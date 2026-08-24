# DECISION-012 — Static hosting with a catch-all SPA rewrite

Status: Decided (GitHub Pages) — and the résumé now links here, not to Adobe Portfolio
Date: 2026-08-22; the link answered by the owner 2026-08-24 (SESSION-008)
Scope: Deployment

## Owner's answer (2026-08-24)

> "dont point at the adobe one. point at this website."

The résumé's portfolio link pointed at `alexshamaharjan.myportfolio.com`, an Adobe
Portfolio site — i.e. the page that presents this designer's work pointed visitors at a
different portfolio. It now points at this one, `https://alexshamaharjan.github.io`.

Still open, and smaller: whether a custom domain is wanted. If one is added,
`dictionaries/{en,de}.ts` (`resume.portfolio` / `resume.portfolioHref`) is the one place to
change it. Note also that deployment is manual — `npm run deploy` — because the Actions
workflow was removed for lack of a token scope; nothing publishes on push.

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
