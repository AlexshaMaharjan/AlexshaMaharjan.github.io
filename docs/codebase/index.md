# Codebase Index

A map of where things live, so a session does not have to rediscover the repository.
Trivial files are deliberately omitted.

| Doc | Covers | Open it when… |
| --- | --- | --- |
| `pages_and_routes.md` | `src/main.tsx`, `src/routes.tsx`, `src/pages/**`, layouts | adding/changing a route or a whole page |
| `components.md` | `src/components/**` | changing anything visual or interactive |
| `content_data.md` | `src/lib/**` | changing copy, adding a case study/category/project |
| `styling.md` | `tailwind.config.ts`, `src/index.css` | changing tokens, type scale, breakpoints |
| `assets.md` | `public/**` | adding real images, favicon, robots |
| `configuration.md` | build/lint/TS config, repo-root files | changing tooling, scripts, deployment |

## Top-level layout

```
index.html              single HTML entry (static meta lives here)
src/                    all application code
public/                 served verbatim — images, favicon, robots, _redirects
design-reference/       GITIGNORED authoritative .dc.html designs + 5095-line brief
dist/                   build output (gitignored)
CONTENT_GUIDE.md        ~975 labelled copy fields, mirrors the data modules (§5 generated)
scripts/                one script: regenerates CONTENT_GUIDE.md §5 from the case studies
ROADMAP.md              owner-facing content/asset roadmap (pre-dates docs/)
docs/                   this documentation system
```

## Fastest paths to common tasks

| Task | Start here |
| --- | --- |
| Change any visible text | `CONTENT_GUIDE.md` → the named file in `src/lib/**` |
| Fix a case-study layout | `src/components/case-study/*` + `content_data.md` |
| Change case-study section structure | `src/lib/caseStudies/types.ts` (`Block`) + `Section.tsx`, then rerun `node scripts/content-guide-case-studies.mjs --write` |
| Fix the homepage work grid | `src/components/BentoGrid.tsx`, `SelectedWork.tsx` |
| Touch scroll animation | `src/lib/useScrollReveals.ts` + `ARCH-04` |
| Touch scroll position, hash links, back button | `src/lib/useScrollBehavior.ts` + `ARCH-01`, `DECISION-013` |
| Touch the process canvas | `src/components/process/HeroProcess.tsx` + `ARCH-04` |
| Add a real image | `ARCH-05` + `assets.md`. Case-study figures need only `src`/`alt` in the data file; Playground and About still need a type change |
| Add a route | `src/routes.tsx` (`dual()`), then a page in `src/pages/` |
