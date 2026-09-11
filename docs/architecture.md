# Architecture

How the system currently works. Descriptive, not aspirational.

These documents describe **what currently exists**, not what should exist.
Improvement proposals live in `docs/suggestions.md`.

| ID | Title | Status | Summary | File |
| --- | --- | --- | --- | --- |
| ARCH-01 | Application shell, routing & locale | Current | SPA shell, dual-registered routes, path-prefix i18n, lazy pages | [#arch-01](#arch-01) |
| ARCH-02 | Content & data model | Current | Typed TS modules: dictionaries, case studies (block-model bodies), playground | [#arch-02](#arch-02) |
| ARCH-03 | Styling architecture | Current | Tailwind token override + `index.css` layers + inline styles | [#arch-03](#arch-03) |
| ARCH-04 | Animation & motion | Current | GSAP reveals, rAF process canvas, CSS marquees, reduced-motion | [#arch-04](#arch-04) |
| ARCH-05 | Image & asset handling | Current | Custom `Image`, `PlaceholderImage`, `Figure`, `public/images`, no pipeline | [#arch-05](#arch-05) |
| ARCH-06 | Build, tooling & deployment | Current | Vite, project-reference tsconfigs, ESLint flat config, static host | [#arch-06](#arch-06) |

### Reading order for a newcomer

`ARCH-01` → `ARCH-02` covers 80% of what you need to change content or add a page.
Add `ARCH-04` before touching anything that moves, and `ARCH-05` before touching images.


---

<a id="arch-01"></a>

## ARCH-01 — Application shell, routing & locale

Status: Current

### Purpose

Defines how the SPA boots, how routes are declared for two locales, and how the current
locale is derived and distributed.

### Relevant directories

- `src/` (entry), `src/pages/`, `src/components/` (layouts), `src/lib/`

### Relevant files

- `src/main.tsx` — `createRoot` + `createBrowserRouter(routes)` inside `StrictMode`
- `src/routes.tsx` — route table, `dual()` and `dualPlayground()` helpers
- `src/components/RootLayout.tsx` — header/main/footer frame, `<Suspense>`, sets `<html lang>`,
  calls `useScrollBehavior()`
- `src/lib/useScrollBehavior.ts` — all scroll side effects of a navigation (`DECISION-013`)
- `src/components/playground/PlaygroundLayout.tsx` — nested layout adding the paper grid
- `src/lib/i18n.ts` — `Locale`, `defaultLocale`, `localeHref()`
- `src/lib/useLocale.ts` — `localeFromPathname()`, `useLocale()`, `useDictionary()`
- `src/components/Header.tsx`, `Footer.tsx`, `ModeSwitch.tsx`, `LanguageSwitch.tsx`, `MobileMenu.tsx`

### How it currently works

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

### Important dependencies

`react-router-dom@7` data router. `clsx` for conditional classes.

### Constraints

- The router is a **browser** router, so any host must rewrite unknown paths to
  `index.html` (`public/_redirects`, plus `dist/404.html` from the build script).
- Because locale lives in the path, every internal `<Link>` must go through `localeHref`.
  Adding a route means adding it to **both** locale branches via `dual()`.

### Known weaknesses

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

### Related decisions

`DECISION-001` (Vite SPA), `DECISION-002` (path-prefix i18n), `DECISION-005` (hand-rolled
`Image`/`Seo`), `DECISION-013` (hand-rolled scroll behaviour).

### Related issues

Resolved: `ISSUE-001`, `ISSUE-002`, `ISSUE-003`, `ISSUE-022`.
Open: `ISSUE-013`, `ISSUE-014`, `ISSUE-015`, `ISSUE-020`, `ISSUE-021`.


---

<a id="arch-02"></a>

## ARCH-02 — Content & data model

Status: Current

### Purpose

All visible copy and content structure live in typed TypeScript modules under
`src/lib/`. Components read from them and contain (almost) no text of their own.

### Relevant directories

- `src/lib/dictionaries/` — site-wide UI + home + about + résumé copy
- `src/lib/caseStudies/` — one module per case study
- `src/lib/playground/` — the playground's home copy and `collage.ts`, which holds all 48 pictures (`DECISION-047`; the categories were deleted in `MILESTONE-014`)

### Relevant files

- `src/lib/dictionaries/types.ts` — the `Dictionary` interface (~200 lines, the contract)
- `src/lib/dictionaries/en.ts`, `de.ts` — two full implementations, 380 lines each
- `src/lib/dictionaries/index.ts` — `getDictionary(locale)`
- `src/lib/caseStudies/types.ts` — `CaseStudyContent`, `CaseStudySection`, `SectionImage`
- `src/lib/caseStudies/index.ts` — slug → **dynamic import** registry,
  `caseStudyPromise(slug)` + `localeContent(content, locale)` (`DECISION-015`)
- `src/lib/playground/types.ts`, `home.ts`, `collage.ts`, `placeScribbles.ts`

### How it currently works

**Three parallel systems, one shape.** Each keeps both locales side by side:

```
Dictionary          getDictionary(locale)      → object per locale
CaseStudyLocaleContent  Record<"en"|"de", CaseStudyContent>
PlaygroundCategoryLocaleContent  Record<"en"|"de", ...>
```

Registries are plain `as const` objects keyed by slug; the getters return `null` for an
unknown slug and the page renders `<NotFound />`.

**Case studies are the exception**: their registry holds one `import()` per slug rather
than six static imports, so a visitor downloads the study they asked for (`DECISION-015`).
An unknown slug still resolves to `null` immediately, without a round trip, which is what
keeps the 404 instant.

A case study is `CaseStudyContent`: identity fields (`slug`, `name`, `headline`,
`summary`, `tags`), a facts block (`type`, `role`, `contribution`, `tools`,
`deliverables`) rendered by `FactsStrip`, one `heroImage`, and an ordered
`sections[]`. Each `CaseStudySection` has `id` / `navLabel` / `number` / `heading` plus
optional `body: Block[]`, `designQuestion`, `insights[]`, `testing[]`, `images[]`.

`Block` is a discriminated union (`DECISION-014`):

```
string                                        // shorthand: a paragraph
{ kind: "h3";    text }                       // sub-heading
{ kind: "list";  items[]; ordered? }
{ kind: "quote"; text; attribution? }         // implemented, unused
{ kind: "note";  text }                       // disclosures, stats lines
{ kind: "figure"; …SectionImage }             // implemented, unused
```

`Section.tsx` switches on the kind. Today the six studies use 224 paragraphs, 38
sub-headings, 22 lists and 8 notes, and **both locales are structurally identical block
for block** — nothing enforces that beyond review, so a restructure has to touch `en`
and `de` together.

`SectionImage` is `{ aspect, caption, src?, alt? }`. With a `src` the slot renders a real
image and a caption; without one it stays a hatched placeholder.

**Superseded (`MILESTONE-014`).** `PlaygroundItem` and the category files are deleted; the
playground's content model is `CollageSlot` in `collage.ts`, which carries `caption` and
`alt` as `Record<Locale, string>` beside the picture's coordinates. The paragraph below
describes the model as it was: `PlaygroundItem` was `{ caption, aspect, slug?, rotated?,
subtitle?, description? }` — caption + aspect ratio only, no image source.

Section `id`s double as anchor targets for `ContentsNav`.

### Important dependencies

None — pure data modules. Case studies are loaded on demand, one chunk each.

### Constraints

- Adding a field means editing `types.ts` **and** both locale objects everywhere, or
  TypeScript fails the build. This is deliberate: it makes missing translations a
  compile error.
- `CONTENT_GUIDE.md` at the repo root mirrors every field with its exact path and is the
  intended editing surface for copy work — see `docs/reference/index.md`. Its §5 (the six
  case studies) is **generated** from these modules by
  `scripts/content-guide-case-studies.mjs --write`; rerun it after any content or shape
  change or the guide's `body[n]` indices will lie.

### Known weaknesses

- ~~`PlaygroundItem`~~ (deleted, `MILESTONE-014`) and `about.carouselItems[]` carry **no image source field**, so
  44 image slots can only render as placeholders — `ISSUE-007`. `SectionImage` (the 71
  case-study slots) was fixed in SESSION-003.
- ~~`CaseStudySection.body` is a flat `string[]`~~ — **resolved in SESSION-003**
  (`ISSUE-024`); it is a `Block[]` now.
- Several typed fields are now dead: `ProjectCopy.projectTag`/`placeholderLabel`/
  `imageAspect`/`headline`/`description`, `selectedWork.viewCaseStudy`/`projectLabel`,
  `PlaygroundHomeContent.gallery`/`galleryHeading`/`noteHeading`/`returnHeading`,
  `PlaygroundProjectContent.eyebrow` — `ISSUE-010`.
- German gaps: `about.handNoteOrigin`/`handNoteMaking` and `nav.switchToGerman` are still
  English; `afono.heroDisclosure` exists only in EN — `ISSUE-009`.
- Decorative text inside `src/components/process/clusters.tsx` is hard-coded English on
  both locales (documented in `CONTENT_GUIDE.md` §11).

### Related decisions

`DECISION-003` (typed TS modules over CMS/MDX), `DECISION-002`, `DECISION-011` (copy
honesty constraint), `DECISION-014` (the block model).

### Related issues

`ISSUE-007`, `ISSUE-009`, `ISSUE-010`, `ISSUE-024`.


---

<a id="arch-03"></a>

## ARCH-03 — Styling architecture

Status: Current

### Purpose

How visual design is expressed: Tailwind token overrides, a small global stylesheet, and
a large amount of arbitrary-value utility classes written directly in components.

### Relevant files

- `tailwind.config.ts` — the design tokens
- `postcss.config.js` — tailwindcss + autoprefixer
- `src/index.css` — `@layer base` resets, `.container-page`, marquee keyframes, the
  bento mobile override, the `[data-inview]` pre-reveal state
- `index.html` — Google Fonts link (Inter 400/500/600, Caveat 500/600/700)

### How it currently works

`tailwind.config.ts` **replaces** rather than extends two theme keys:

- `theme.colors` — a closed 17-colour palette (`page`, `surface`, `surface-2`, `ink`,
  `ink-secondary`, `ink-muted`, `ink-body`, `border`, `near-black`, `canvas-black`,
  `accent` `#1B3FE0`, `accent-focus`, `accent-soft`, …). Tailwind's default palette is
  gone, so `text-gray-500` etc. simply do not exist.
- `theme.screens` — `sm:480 md:768 nav:1160 lg:1024 xl:1280 2xl:1440`. `nav` is a custom
  breakpoint for the header's link/hamburger switch.

`theme.extend` adds font families driven by CSS variables (`--font-inter`,
`--font-caveat`, declared in `index.css`), a `content: 1280px` max-width, a `canvas: 40px`
radius, half-step spacing (`4.5`, `13`, `18`, `30`, `38`, `48`) and a named clamp-based
type scale (`hero`, `section`, `case-title`, `case-heading`, `project-title`,
`subheading`, `body-lg`, `body`, `meta`, `caption`).

`src/index.css` sets `color-scheme: light`, `scroll-behavior: smooth`, a global
reduced-motion kill-switch, `body` base classes, `::selection`, `section {
scroll-margin-top: 104px }`, and the global `:focus-visible` outline (`2px solid #1233c4`,
3px offset) required by the accessibility spec.

### Important dependencies

Tailwind 3.4 JIT scanning `./src/**/*.{js,ts,jsx,tsx,mdx}`.

### Constraints

- Because the palette is closed, any new colour must be added to the config or written as
  an arbitrary value.
- Fonts come from a render-blocking Google Fonts `<link>` in `index.html` — there is no
  self-hosting or `next/font` equivalent.

### Known weaknesses

- **The named type scale is barely used.** Almost every heading is written as an inline
  arbitrary clamp, e.g. `text-[clamp(2.125rem,4.6vw,4.25rem)]` in `SelectedWork.tsx`,
  `text-[clamp(2.375rem,4.6vw,4.25rem)]` in `CategoryPage.tsx`,
  `text-[clamp(2.5rem,5.4vw,5.25rem)]` in `About.tsx`. Near-identical but not identical
  values are scattered across files — the main source of visual inconsistency (`ISSUE-023`).
- Raw hex values bypass the token layer in many components: `#E4E7EE` (card borders,
  ~15 sites), `#8FA6FF`, `#A7ACB4`, `#6C7078`, `#C9CEDB`, `#4E6087`, `#E6E7E9`,
  `rgba(78,96,135,0.18)`.
- `.container-page` exists in `index.css` but **no component uses it** — every page
  re-writes `mx-auto max-w-[1440px] px-5 md:px-20` by hand.
- `theme.screens` declares `nav: 1160px` *before* `lg: 1024px`; Tailwind emits media
  queries in key order, so `lg:` rules come after `nav:` rules in the stylesheet and win
  at ≥1160px — `ISSUE-011`.
- `BentoGrid` and `HeroProcess` set layout through inline `style` objects rather than
  classes, so the responsive behaviour needs an `!important` override block in
  `index.css` (`[data-el="bento"]`).

### Related decisions

`DECISION-004` (replaced palette), `DECISION-009` (`.dc.html` reference is authoritative).

### Related issues

`ISSUE-011`, `ISSUE-023`.

### Related suggestions

`SUGGESTION-009` (design-system consolidation), `SUGGESTION-010` (responsive audit).


---

<a id="arch-04"></a>

## ARCH-04 — Animation & motion

Status: Current

### Purpose

Three independent motion systems coexist. Knowing which one owns a given effect is the
prerequisite for changing anything that moves.

### Relevant files

- `src/lib/useScrollReveals.ts` — GSAP + ScrollTrigger fade/lift for `[data-inview]`
- `src/lib/useScrollBehavior.ts` — not motion itself, but it sets the scroll offset the
  reveals are measured against (`DECISION-013`)
- `src/components/process/HeroProcess.tsx` — the pinned process-canvas choreography
- `src/components/process/BranchGroup.tsx`, `clusters.tsx`, `branchData.ts`, `icons.tsx`
- `src/components/playground/CategoryMarquee.tsx` + `@keyframes mqA/mqB` in `index.css`
- `src/components/about/LoveLine.tsx` — the cycling "I love ___" word
- `src/components/Header.tsx` — scroll-state background/blur transition

### How it currently works

#### 1. Scroll reveals (GSAP)

`useScrollReveals()` is called **per page component**, not in the layout — the comment in
the file explains why (lazy pages mean a layout-level effect would run before the page's
markup mounts). It collects every `[data-inview]` element and creates one
`gsap.fromTo(el, {autoAlpha:0, y:18}, {autoAlpha:1, y:0, duration:.7, ease:"power2.out",
scrollTrigger:{trigger:el, start:"top 88%"}})` per element, killing them on unmount.

Rewritten in SESSION-002 to fix `ISSUE-001`. Three things now matter:

- **Both effects are keyed on `useLocation().pathname`**, not `[]`. React Router reuses one
  component instance across `/work/a → /work/b` (`ARCH-01`), and a mount-only effect left
  the incoming page's sections stuck at the outgoing page's inline state.
- **The at-rest state is applied by the hook, from a `useLayoutEffect`** — before the first
  paint, so it still does not flash — rather than by `index.css`. That rule and its
  reduced-motion override are gone. The point is failing safe: a page whose script never
  runs is now readable rather than blank.
- **The tweens are built in a passive effect**, which runs after `RootLayout` has finalised
  the scroll offset, and calls `ScrollTrigger.update()` first so GSAP re-reads the scroll
  position instead of measuring every trigger against the offset of the page the visitor
  came from.

That ordering is load-bearing and is spelled out in `DECISION-008`: changing either hook's
effect *kind* will break the other.

There are 15 `[data-inview]` call sites across the site.

#### 2. The process canvas (hand-written rAF)

`HeroProcess` chooses between two entirely separate renders:

- **Static flow** (`max-width: 880px` **or** reduced motion): hero section, then a normal
  black section containing a scaled 1440×900 map. No scroll effects.
- **Pinned flow** (desktop): a `280svh` track with a `sticky top-0 h-svh` stage. A
  permanent `requestAnimationFrame` loop reads `window.scrollY`, derives a progress `p`,
  and drives every property imperatively through `smoothstep()` easing — canvas `top`,
  `width`, `height`, `borderRadius` (44 → 0), hero `opacity`/`translateY`, the question's
  `left`/`top`/`width`/`fontSize`, map `scale`/`opacity`, per-line `strokeDashoffset`
  (staggered by index), and per-branch reveal. Above `p ≥ 0.9` the map becomes
  interactive (`setInteractiveOn(true)`); below `0.85` it resets.

Branch geometry is data in `branchData.ts` (percentage `left`/`top`, SVG path, endpoint
caps). Each branch renders a `BranchGroup` with a number, a title button (hover = soft
focus, click = lock, close button), a question, and an illustrated `Cluster` from
`clusters.tsx` — 630 lines of hand-built SVG/CSS collage (polaroids with `clip-path`
torn edges, pins, dark panels, icon badges) with hard-coded English labels.

#### 3. CSS animations

`@keyframes mqA` / `mqB` translate a tripled item list by ∓33.333% for the playground
category marquees; direction alternates by index, duration `47 + index*3` seconds; hover
pauses via `hover:[animation-play-state:paused]`; a `mask-image` gradient fades both
edges. Disabled under reduced motion via `[data-marquee] { animation: none !important }`.

`LoveLine` cycles a word every 2400 ms, measuring each word's width with a hidden mirror
span and transitioning `width` + `opacity`.

#### Reduced motion

Handled in several places: the global `index.css` kill-switch (`animation-duration: .01ms`
etc.), an early `return` in **both** of `useScrollReveals`' effects — so nothing is hidden
in the first place — the `staticFlow` branch in `HeroProcess`, a branch in `LoveLine`,
`Footer`'s back-to-top `behavior` choice, and `useScrollBehavior`, which never scrolls
smoothly under reduced motion.

Verified in SESSION-002 with Chrome's `--force-prefers-reduced-motion`: across every
navigation tested, no `[data-inview]` element is ever hidden.

### Important dependencies

`gsap@3.15` and `gsap/ScrollTrigger`, registered at module scope in `useScrollReveals.ts`.

### Constraints

- The pinned flow writes inline styles every frame; anything else that sets those same
  properties will be overwritten.
- The static/pinned split is decided by a media query listener, so switching flows
  remounts a very different tree.

### Known weaknesses

- ~~Reveals never re-run when only a route param changes — `ISSUE-001` (critical).~~
  Fixed in SESSION-002.
- The rAF loop never idles: it runs continuously while the homepage is mounted, even when
  the hero is off-screen — `ISSUE-012`.
- Still no `ScrollTrigger.refresh()` after fonts/images load, so trigger positions can be
  stale. `useScrollReveals` calls `ScrollTrigger.update()` when it builds its triggers,
  which re-reads the *scroll position*; it does not re-measure trigger geometry.
- Motion values (durations, eases, distances) are ad-hoc per call site; there is no shared
  motion token module — `SUGGESTION-006`.
- No route transitions at all; navigation is an instant swap — `SUGGESTION-007`.
- The marquee has no visible pause control for keyboard users — `ISSUE-016` / `SUGGESTION-011`.

### Related decisions

`DECISION-007` (rAF, not ScrollTrigger, for the canvas), `DECISION-008` (GSAP for reveals,
amended), `DECISION-013` (hand-rolled scroll behaviour).

### Related issues

`ISSUE-001` (resolved), `ISSUE-012`, `ISSUE-016`, `ISSUE-019`.

### Related suggestions

`SUGGESTION-006`, `SUGGESTION-007`, `SUGGESTION-008`.


---

<a id="arch-05"></a>

## ARCH-05 — Image & asset handling

Status: Current — and the weakest area of the project

### Purpose

How images are declared, rendered and served, and why most of the site currently shows
hatched placeholder boxes instead of work.

### Relevant files

- `src/components/ui/Image.tsx` — 32-line `next/image` stand-in
- `src/components/PlaceholderImage.tsx` — the hatched `role="img"` box
- `public/images/` — 16 PNGs + `docs/reference/image_files.md`
- `public/favicon.svg`, `public/robots.txt`, `public/_redirects`

### How it currently works

`Image` renders a plain `<img>` with `loading={priority ? "eager" : "lazy"}`,
`decoding="async"` and, when `fill` (the default and only implemented mode), absolute
positioning to fill a `position: relative` parent. It accepts `sizes` purely for API
compatibility and ignores it — **there is no responsive-image or format pipeline of any
kind**. Files are served byte-for-byte from `public/`.

`PlaceholderImage` renders a 45° hatched box (`repeating-linear-gradient(45deg,#F2F3F5 0
10px,#EDEFF3 10px 20px)`), a border, the correct `aspect-ratio`, a monospace
`[ bracketed caption ]`, and `role="img"` + `aria-label="Placeholder: …"`. This is a
deliberate part of the visual language (`DECISION-006`), not only a missing-asset marker.

#### Where real `<img>` tags exist (7 slots, 7 files)

| File | Real content? | Used by |
| --- | --- | --- |
| `frame-6-mrtp0czu-dh8i.png` | ✅ real (62.7 KB) | Barrier-Free Kitchen hero |
| `screenshot-2026-07-07-…-d1vc.png` | ✅ real (143.5 KB) | QIS Portal hero |
| `alexsha_photo-mrx9hbwx-nif2.png` | ⚠️ solid-colour stand-in | About + home portrait |
| `wikimind-mrx9dhfo-12ys.png` | ⚠️ stand-in | WikiMind hero |
| `shop-page-1-mrtp117j-zqqp.png` | ⚠️ stand-in | AFONO hero |
| `1-ms52o75m-suju.png` | ⚠️ stand-in | Surugami hero |
| `chatgpt-image-…-ms50alwm-za74.png` | ⚠️ stand-in | Sync FM hero |

The stand-ins were generated at the correct pixel dimensions when the original exports
exceeded a 256 KiB fetch cap — see `docs/reference/image_files.md`. Dropping a real export in
with the **same filename** fixes them with no code change.

9 further PNGs sit in `public/images/` referenced by nothing.

#### Case-study figures — a real source is now a data edit (71 slots)

Since SESSION-003, `SectionImage` is `{ aspect, caption, src?, alt? }` and
`src/components/case-study/Figure.tsx` decides what to render: `Image` plus a
`<figcaption>` when `src` is set, `PlaceholderImage` with its `[ bracketed label ]` when
it is not (`DECISION-014`). All 71 slots still show placeholders today, but filling one
needs only a line in the data file. `Figure` is also what the `figure` block kind renders,
so a figure can sit inline in `body[]` rather than only in the trailing `images[]` grid.

#### Where no image mechanism exists at all (44 slots)

~~`PlaygroundItem` (36 slots)~~ (deleted, `MILESTONE-014`) and `about.carouselItems[]` (8 slots) carry only `caption` +
`aspect`. Attaching a real photo there still requires a **type change plus a call-site
change**, not just a data edit — `ISSUE-007`. These are also the slots where the
placeholder may be a deliberate choice, which is `DECISION-006`'s open question.

Since the homepage's `SelectedWork` was switched to `BentoGrid`, the six project preview
images are no longer rendered anywhere on the homepage — `ISSUE-004`.

### Constraints

- Everything under `public/` ships verbatim; large exports will ship large.
- Alt text lives beside the source in the data modules (`imageAlt`, `heroImage.alt`).

### Known weaknesses

- No `srcset`/`sizes`, no WebP/AVIF, no width/height attributes → layout shift risk and
  oversized downloads once real exports (5000×3750 originals) land.
- Alt text on several stand-ins still literally reads "Placeholder: …" (`wikimind.ts`,
  `afono.ts`, `sync-fm.ts`) — that string will be announced to screen-reader users as-is.
- Filenames are opaque design-tool hashes, making it hard to tell which file is which.

### Related decisions

`DECISION-005`, `DECISION-006`, `DECISION-014` (captions only where a real image exists).

### Related issues

`ISSUE-004`, `ISSUE-006`, `ISSUE-007`.

### Related suggestions

`SUGGESTION-002` (add image sources to the data model), `SUGGESTION-012` (image pipeline).


---

<a id="arch-06"></a>

## ARCH-06 — Build, tooling & deployment

Status: Current

### Purpose

How the project is compiled, checked and (intended to be) shipped.

### Relevant files

- `package.json` — scripts and dependencies
- `vite.config.ts` — React plugin, `@` → `./src` alias, `outDir: dist`, no sourcemaps
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — project references
- `eslint.config.mjs` — flat config
- `postcss.config.js`, `tailwind.config.ts`
- `index.html` — the single HTML entry
- `public/_redirects`, and the `cp dist/index.html dist/404.html` build step

### How it currently works

```
npm run dev     vite
npm run build   tsc -b && vite build && cp dist/index.html dist/404.html
npm run preview vite preview
npm run lint    eslint .
```

`tsc -b` type-checks via project references; `tsconfig.app.json` covers `src` with
`strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`,
`noFallthroughCasesInSwitch` and `noEmit`. `tsconfig.node.json` covers `vite.config.ts`.
The `@/*` alias is declared in both `tsconfig.app.json` and `vite.config.ts`.

ESLint flat config extends `js.configs.recommended` + `tseslint.configs.recommended` plus
react-hooks and react-refresh, ignoring `dist/`, `design-reference/`, `node_modules/`.

#### Current build output (verified)

```
dist/assets/index-*.js            327.58 kB │ gzip 104.82 kB   React + router + shell
dist/assets/CaseStudy-*.js        121.00 kB │ gzip  38.36 kB   all 6 studies, both locales
dist/assets/useScrollReveals-*.js 115.35 kB │ gzip  45.69 kB   GSAP + ScrollTrigger
dist/assets/Home-*.js              37.94 kB │ gzip  10.23 kB
dist/assets/index-*.css            34.54 kB │ gzip   7.46 kB
```

Build succeeds. Lint: **0 errors, 3 warnings** (`react-refresh/only-export-components` in
`process/clusters.tsx` and `process/icons.tsx`, where component files also export arrays).

### Constraints

- Client-side routing requires an SPA rewrite on the host.
- `design-reference/` is **gitignored** — the authoritative `.dc.html` design files and
  the 5095-line brief exist only on this machine. Losing them loses the design source of
  truth. Key values are captured in `docs/reference/handbook.md` as insurance.

### Known weaknesses

- **No deployment configuration.** `_redirects` implies Netlify; `404.html` implies GitHub
  Pages. Neither host is configured and there is no CI — `ISSUE-025`, **Needs verification**.
- No test suite, no CI, no Lighthouse/bundle budget — nothing prevents a regression.
- Next.js leftovers still in the tree: an untracked `.next/` cache directory (not in
  `.gitignore`, so it can be committed by accident), a stale 114 KB
  `tsconfig.tsbuildinfo`, and an empty `NewHomePage/` folder — `ISSUE-018`.
- Substantial work is uncommitted: 13 modified files, one deletion
  (`src/components/ProjectEntry.tsx`), and four untracked files including two new source
  modules — `ISSUE-017`.
- GSAP lands in a chunk fetched by every page that reveals content, and all six case
  studies share one 121 KB chunk — `ISSUE-019`.

### Related decisions

`DECISION-001`, `DECISION-012`.

### Related issues

`ISSUE-017`, `ISSUE-018`, `ISSUE-019`, `ISSUE-025`.

