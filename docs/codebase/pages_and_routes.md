# Codebase — Entry points, routes and pages

## `src/main.tsx` (13 lines)

Mounts `#root`, builds `createBrowserRouter(routes)`, wraps in `StrictMode`. Imports
`@/index.css`. Nothing else happens here.

## `src/routes.tsx` (52 lines)

The whole route table. `dual(path, element)` returns the bare and `/de`-prefixed
`RouteObject` pair; `dualPlayground()` does the same for the nested playground subtree
wrapped in `PlaygroundLayout`. All pages except `NotFound` are `lazy()`.

**Inspect when:** adding a route, changing locale prefixing, or fixing scroll/hash
behaviour (`ISSUE-001`–`ISSUE-003` all land here or in `RootLayout`).

## Layouts

| File | Role |
| --- | --- |
| `src/components/RootLayout.tsx` | flex column, `<Header>` / `<main><Suspense><Outlet/></Suspense></main>` / `<Footer>`; sets `<html lang>` |
| `src/components/playground/PlaygroundLayout.tsx` | adds the four-layer CSS dotted-grid background (8px minor + 32px major) |

## `src/pages/`

| File | Lines | What it renders | Notes |
| --- | --- | --- | --- |
| `Home.tsx` | 23 | `HeroProcess` → `SelectedWork` → `AboutPreview` → `ContactSection` | thin composition shell; calls `useScrollReveals()` |
| `About.tsx` | 208 | full About page inline (hero, portrait+bio, focus/tools+AI block, carousel, `LoveLine`, résumé CTA) | the only large page component; hand-drawn SVG arrows are inline here |
| `Resume.tsx` | 179 | print-oriented single column with local `EntryHeader`/`EducationRow`/`ProjectRow`/`ExperienceRow`/`FurtherRow` sub-components | `print:` variants throughout; does **not** call `useScrollReveals` |
| `CaseStudy.tsx` | 36 | reads the study with `use(caseStudyPromise(slug))` — suspending into the loading bar on first visit (`DECISION-015`) — computes prev/next as a ring over `dictionary.projects`, renders `CaseStudyPage` | returns `<NotFound/>` for unknown slugs, without a round trip |
| `Contact.tsx` | 8 | `<Navigate>` to `/#contact` | broken in practice, `ISSUE-022` |
| `NotFound.tsx` | 25 | 404 | not lazy — imported directly by `routes.tsx` |
| `playground/PlaygroundIndex.tsx` | 155 | playground home: hero + two taped cards, featured 3-up, six `CategoryMarquee`s, exploring/note/return blocks | largest playground file |
| `playground/PlaygroundCategory.tsx` | 24 | slug → `getCategory` → `CategoryPage` | |
| `playground/PlaygroundProject.tsx` | 24 | slug → `getProject` → `ProjectPage`; validates `categorySlug` matches | |

**Pattern:** every page resolves its own content, renders `<Seo>`, calls
`useScrollReveals()`, and delegates markup to components — except `About.tsx` and
`Resume.tsx`, which hold their markup inline.

## Related

`ARCH-01`. Issues: `ISSUE-001`, `ISSUE-002`, `ISSUE-003`, `ISSUE-020`, `ISSUE-022`.
