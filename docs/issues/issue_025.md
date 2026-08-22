# ISSUE-025 — No deployment configuration; target host unknown

Status: Resolved
Priority: Low
Category: Deployment
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-22 (SESSION-003)
Last reviewed: 2026-08-22

## Summary

The repository contains hints of two different static hosts and configuration for neither.

## Evidence / Current Behavior

- `public/_redirects` — `/*  /index.html  200`, the **Netlify** SPA rewrite convention.
- `package.json` build script ends with `cp dist/index.html dist/404.html`, the **GitHub
  Pages** SPA fallback convention.
- No `netlify.toml`, `vercel.json`, `.github/workflows/`, `Dockerfile` or `CNAME`.
- `src/lib/dictionaries/en.ts` lists `alexshamaharjan.myportfolio.com` as the portfolio
  URL — an Adobe Portfolio site, i.e. the current live presence is elsewhere.

**Needs verification** with the owner: which host, which domain, and whether this site
replaces the Adobe Portfolio one.

## Expected Behavior

`npm run build` output deploys to a known host by a documented command or push.

## Relevant Files

- `package.json`, `public/_redirects`, `src/lib/dictionaries/en.ts` (`portfolioHref`)

## Possible Cause

Both fallbacks added speculatively during the migration.

## Possible Solution

Once the owner names a host: add its config, remove the irrelevant fallback, add a CI
workflow running `npm run lint && npm run build`, and document the deploy command in
`docs/project_overview.md`. If SEO prerendering (`ISSUE-013`) is wanted, the host choice
affects how it is wired.

## Dependencies

Requires an owner decision.

## Related

`ARCH-06`, `MILESTONE-008`, `SUGGESTION-016`, `ISSUE-013`.
