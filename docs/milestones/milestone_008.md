# MILESTONE-008 — Performance, SEO and deployment readiness

Status: Proposed
Priority: Medium
Goal: Make the finished site fast, findable, shareable, and actually deployed.

## Why This Milestone Exists

Nothing in the roadmap matters if the site is not reachable, and a portfolio that unfurls
on LinkedIn as a generic title over a grey square loses most of its reach. Both problems
are structural consequences of the SPA migration and both are fixed at build time.

## Scope

Build output, metadata, hosting, and a minimal safety net.

## Tasks

**Deployment (`SUGGESTION-016`)**
- [x] **Ask the owner** — answered 2026-08-24: GitHub Pages, and the résumé points here
      rather than at Adobe Portfolio (`DECISION-012`)
- [x] Remove the unused fallback — `public/_redirects` deleted (SESSION-013)
- [x] Update `resume.portfolio` / `portfolioHref` in both dictionaries (SESSION-008)
- [x] Document the deploy command in `docs/project_overview.md`
- [ ] A custom domain, if the owner wants one — still open, and blocks nothing

**SEO (`SUGGESTION-013`)**
- [x] Prerender all 36 routes with baked per-locale metadata (SESSION-010) — the **head**
      only, and `ISSUE-013` records what prerendering the body would cost
- [x] `hreflang` alternates for every `/x` ↔ `/de/x` pair (SESSION-013) — `en`, `de` and
      `x-default`, in the static HTML and from the client, verified over plain HTTP
- [x] `sitemap.xml` generated from the same route list (SESSION-010)
- [x] **ISSUE-014** — the meta leak is fixed and the client path agrees with the baked HTML
- [ ] **A real `og:image`** — every preview is still a solid-colour placeholder. The owner's
      to supply; it is the single highest-value image on the manifest
- [x] Verify the pinned canvas prerenders without a flash — moot for a head-only prerender,
      and measured either way in SESSION-010

**Performance (`SUGGESTION-012`)**
- [x] **ISSUE-019** — the case-study chunk is split per slug (126 KB → 13 KB + one study).
      GSAP stays eager, recorded as `DECISION-015` with the alternative it forecloses
- [ ] Confirm the image pipeline from `MILESTONE-005` is producing modern formats
- [ ] Lighthouse pass on homepage + one case study; set a budget

**Safety net (`SUGGESTION-015`)**
- [ ] CI running `npm ci && npm run lint && npm run build`
- [ ] Playwright smoke test over all routes, including a same-route navigation
      (the `ISSUE-001` regression guard)
- [ ] Link/asset checker: every `<Link to>` resolves; every image `src` exists

## Relevant Issues

`ISSUE-013`, `ISSUE-014`, `ISSUE-019`, `ISSUE-025`

## Relevant Suggestions

`SUGGESTION-012`, `SUGGESTION-013`, `SUGGESTION-015`, `SUGGESTION-016`

## Relevant Decisions

`DECISION-001`, `DECISION-005`, `DECISION-012`

## Relevant Code

`vite.config.ts`, `index.html`, `src/components/Seo.tsx`, `src/routes.tsx`,
`package.json`, `public/`

## Dependencies

Content and imagery should be close to final — prerendering stale copy just means
prerendering twice. The host decision is an owner blocker.

## Completion Criteria

- The site is live at a known URL, deployed by a documented command.
- Sharing any case-study URL shows that project's title, description and image.
- Lighthouse ≥ 90 on performance and ≥ 95 on accessibility for the homepage and a case study.
- CI green on every push.

## Out of Scope

Analytics, a contact form backend, a CMS.
