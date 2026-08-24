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
- `src/components/RootLayout.tsx` — header/main/footer frame, `<Suspense>`, sets `<html lang>`,
  calls `useScrollBehavior()`
- `src/lib/useScrollBehavior.ts` — all scroll side effects of a navigation (`DECISION-013`)
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

It also calls `useScrollBehavior()`, which owns every scroll side effect of a navigation:
a new route starts at the top, a URL with a hash lands on that section (offset by
`section { scroll-margin-top }`), and back/forward restores the previous offset from a
`sessionStorage` map keyed by `location.key`. It sets `history.scrollRestoration = "manual"`.
Because pages are lazy, it re-tries across animation frames until the target exists *and*
the incoming page has stopped growing. react-router's `<ScrollRestoration />` is
deliberately not used — `DECISION-013`.

A hash target's position is taken from **layout** — the `offsetTop` chain minus the
element's own `scroll-margin-top` — not from `getBoundingClientRect` or `scrollIntoView`.
Sections carry the scroll reveal's at-rest transform until they play, so the rendered box
is up to 18px below the layout box and aiming at it lands short (SESSION-004,
`DECISION-014`).

Per-route `<title>` and metadata are written imperatively by `src/components/Seo.tsx`,
which writes **every** field on every route — description, `og:*`, `twitter:*` and a
canonical link — falling back to the site defaults. Writing the full set is what stops one
route inheriting another's (`ISSUE-014`).

Scrapers do not execute that, so `npm run prerender` (run by `predeploy`) writes each of the
36 routes a static HTML file carrying the same head. The **body** is deliberately not
prerendered: pages are lazy, and hydrating into a null Suspense fallback empties markup that
is already on screen — `ISSUE-013` records the measurements.

## Important dependencies

`react-router-dom@7` data router. `clsx` for conditional classes.

## Constraints

- The router is a **browser** router, so any host must rewrite unknown paths to
  `index.html` (`public/_redirects`, plus `dist/404.html` from the build script).
- Because locale lives in the path, every internal `<Link>` must go through `localeHref`.
  Adding a route means adding it to **both** locale branches via `dual()`.

## Known weaknesses

- ~~No `<ScrollRestoration />` and no hash handling~~ — fixed in SESSION-002 by
  `useScrollBehavior` (`ISSUE-002`, `ISSUE-003`, `ISSUE-022`).
- Route elements are still not keyed by params, so `/work/a → /work/b` re-renders the same
  component instance without remounting. That is now handled by the affected hooks keying
  their effects on the pathname rather than by remounting the route (`ISSUE-001`,
  resolved), so **any new mount-only effect in a `:param` route is a latent repeat of that
  bug**.
- ~~The anchor offset is a single fixed 104px~~ — **fixed in SESSION-005** (`ISSUE-015`),
  and the same variable now drives where every page's content starts (`--page-top`,
  SESSION-007). The header is 146px tall below 768px, not 480px (`ISSUE-016`).
  `Header.tsx` measures itself into `--header-h` and `index.css` derives
  `--anchor-offset: calc(var(--header-h) + 31px)`, which `section { scroll-margin-top }`
  and the case-study rail both read. 31px of clearance at every width.
- A hash navigation performed after a client-side route change can restore a scroll offset
  nobody chose, landing past the anchor. It arrives as a `POP` with `cameFrom` set, so the
  back/forward branch runs; `location.key` is `"default"` for more than one entry, so the
  positions map shares a bucket; and the offset it finds was recorded when the browser
  clamped the scroll position after a tall page was replaced by a short one — `ISSUE-027`,
  diagnosed in SESSION-005, still open.
- `Suspense fallback={null}` gives a blank frame on first visit to a lazy page — `ISSUE-020`.
- `Seo` only restores `document.title` on unmount; description/OG tags leak — `ISSUE-014`.
- No prerendering: crawlers and social scrapers only ever see `index.html`'s static
  English meta — `ISSUE-013`.

## Related decisions

`DECISION-001` (Vite SPA), `DECISION-002` (path-prefix i18n), `DECISION-005` (hand-rolled
`Image`/`Seo`), `DECISION-013` (hand-rolled scroll behaviour).

## Related issues

Resolved: `ISSUE-001`, `ISSUE-002`, `ISSUE-003`, `ISSUE-022`.
Open: `ISSUE-013`, `ISSUE-014`, `ISSUE-015`, `ISSUE-020`, `ISSUE-021`.
