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
- [ ] **Ask the owner:** which host, which domain, does this replace
      `alexshamaharjan.myportfolio.com`?
- [ ] Configure that host; remove the unused fallback (`_redirects` or the `404.html` copy)
- [ ] Update `resume.portfolio` / `portfolioHref` in both dictionaries
- [ ] Document the deploy command in `docs/project_overview.md`

**SEO (`SUGGESTION-013`)**
- [ ] Prerender all ~36 routes at build time with baked per-locale metadata
- [ ] `hreflang` alternates for every `/x` ↔ `/de/x` pair
- [ ] `sitemap.xml` generated from the same route list
- [ ] **ISSUE-014** — fix the `Seo` meta leak so the client path agrees with the baked HTML
- [ ] A real `og:image`
- [ ] Verify the homepage's pinned canvas prerenders and hydrates without a flash

**Performance (`SUGGESTION-012`)**
- [ ] **ISSUE-019** — lazy-import GSAP; split the case-study chunk per slug
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
