# SUGGESTION-016 — Decide and configure deployment

Status: Proposed
Priority: Low
Impact: Medium
Effort: Small

## Problem / Opportunity

The repository hints at two hosts and configures neither (`ISSUE-025`), and the résumé
still points visitors to a separate Adobe Portfolio site
(`alexshamaharjan.myportfolio.com`).

## Recommendation

1. Ask the owner: which host, which domain, and does this replace the Adobe Portfolio site?
2. Configure that host (`netlify.toml` **or** a Pages workflow — not both), remove the
   unused fallback, and add the deploy step to CI.
3. Update `resume.portfolio` / `portfolioHref` in both dictionaries once a domain exists.
4. Add a preview-deploy per branch if the host supports it — useful for showing the owner
   design changes before merging.
5. Document the deploy command in `docs/project_overview.md`.

Netlify is the better fit: `_redirects` already exists, SPA rewrites are native, and
preview deploys come free. GitHub Pages needs the `404.html` hack the build script
already performs and has no rewrite support.

## Why

Nothing else in the roadmap matters if the site is not reachable.

## Relevant Files

- `package.json`, `public/_redirects`, `src/lib/dictionaries/{en,de}.ts`

## Dependencies

Owner decision required.

## Risks

Prerendering (`SUGGESTION-013`) changes what gets deployed — settle the host first.

## Related Issues

`ISSUE-025`, `ISSUE-013`.

## Possible Milestone

`MILESTONE-008`.
