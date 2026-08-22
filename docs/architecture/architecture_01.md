# ARCH-01 — Application shell, routing & locale

Status: Current

## Purpose

Defines how the SPA boots, how routes are declared for two locales, and how the current
locale is derived and distributed.

## Relevant directories

- `src/` (entry), `src/pages/`, `src/components/` (layouts), `src/lib/`

## Relevant files

- `src/main.tsx` — `createRoot` + `createBrowserRouter(routes)` inside `StrictMode`
- `src/routes.tsx` — route table, `dual()` and `dualPlayground()` helpers
- `src/components/RootLayout.tsx` — header/main/footer frame, `<Suspense>`, sets `<html lang>`
- `src/components/playground/PlaygroundLayout.tsx` — nested layout adding the paper grid
- `src/lib/i18n.ts` — `Locale`, `defaultLocale`, `localeHref()`
- `src/lib/useLocale.ts` — `localeFromPathname()`, `useLocale()`, `useDictionary()`
- `src/components/Header.tsx`, `Footer.tsx`, `ModeSwitch.tsx`, `LanguageSwitch.tsx`, `MobileMenu.tsx`

## How it currently works

`index.html` mounts `#root`; `main.tsx` creates a browser router from `routes`.

Every route is registered **twice** by `dual(path, element)` — once bare (`/about`) and
once prefixed (`/de/about`). The `/playground` subtree is registered twice by
`dualPlayground()` with an extra `PlaygroundLayout` route wrapper carrying the
dotted-grid background. All page components except `NotFound` are `React.lazy`.

Locale is **derived from the URL**, never stored: `localeFromPathname()` returns `"de"`
only when the path is `/de` or begins with `/de/`. `useLocale()` reads it from
`useLocation()`; `useDictionary()` maps it to the right dictionary object. Nothing is
persisted to `localStorage` (the `.dc.html` reference used an `am-lang` key — that
approach was dropped, see `DECISION-002`).

Outgoing links are built with `localeHref(locale, path)`, which omits the prefix for the
default locale. `Header` and `Footer` each keep their own private `stripLocale()` copy to
compute the bare path for the language toggle and the playground/portfolio mode check
(`ISSUE-021`).

`RootLayout` sets `document.documentElement.lang` in an effect and wraps `<Outlet />` in
`<Suspense fallback={null}>`.

Per-route `<title>`/meta are written imperatively by `src/components/Seo.tsx` on mount.

## Important dependencies

`react-router-dom@7` data router. `clsx` for conditional classes.

## Constraints

- The router is a **browser** router, so any host must rewrite unknown paths to
  `index.html` (`public/_redirects`, plus `dist/404.html` from the build script).
- Because locale lives in the path, every internal `<Link>` must go through `localeHref`.
  Adding a route means adding it to **both** locale branches via `dual()`.

## Known weaknesses

- No `<ScrollRestoration />` and no hash handling: cross-route hash links do nothing and
  scroll position carries over between pages — `ISSUE-002`, `ISSUE-003`.
- Route elements are not keyed by params, so `/work/a → /work/b` re-renders the same
  component instance without remounting. Mount-only effects (notably `useScrollReveals`)
  never re-run — `ISSUE-001`.
- `Suspense fallback={null}` gives a blank frame on first visit to a lazy page — `ISSUE-020`.
- `Seo` only restores `document.title` on unmount; description/OG tags leak — `ISSUE-014`.
- No prerendering: crawlers and social scrapers only ever see `index.html`'s static
  English meta — `ISSUE-013`.

## Related decisions

`DECISION-001` (Vite SPA), `DECISION-002` (path-prefix i18n), `DECISION-005` (hand-rolled
`Image`/`Seo`).

## Related issues

`ISSUE-001`, `ISSUE-002`, `ISSUE-003`, `ISSUE-013`, `ISSUE-014`, `ISSUE-020`, `ISSUE-021`, `ISSUE-022`.
