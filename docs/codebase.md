# Codebase map

What to open for which task.

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

### Top-level layout

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

### Fastest paths to common tasks

| Task | Start here |
| --- | --- |
| Change any visible text | `CONTENT_GUIDE.md` → the named file in `src/lib/**` |
| Fix a case-study layout | `src/components/case-study/*` + `content_data.md` |
| Change case-study section structure | `src/lib/caseStudies/types.ts` (`Block`) + `Section.tsx`, then rerun `node scripts/content-guide-case-studies.mjs --write` |
| Fix the homepage work grid | `src/components/WorkGrid.tsx`, `SelectedWork.tsx` |
| Touch scroll animation | `src/lib/useScrollReveals.ts` + `ARCH-04` |
| Touch scroll position, hash links, back button | `src/lib/useScrollBehavior.ts` + `ARCH-01`, `DECISION-013` |
| Touch the process canvas | `src/components/process/HeroProcess.tsx` + `ARCH-04` |
| Add a real image | `ARCH-05` + `assets.md`. Case-study figures need only `src`/`alt` in the data file; Playground and About still need a type change |
| Add a route | `src/routes.tsx` (`dual()`), then a page in `src/pages/` |


---

<a id="assets"></a>

## Codebase — Assets (`public/`)

Everything here is served verbatim at the site root; there is no processing step.

```
public/
├── _redirects                 /*  /index.html  200      (Netlify SPA rewrite)
├── favicon.svg
├── robots.txt                 User-agent: *  /  Allow: /
└── images/
    ├── MANIFEST.md            which PNGs are real vs solid-colour stand-ins
    └── 16 PNGs                868 KB total
```

### Image status (from `MANIFEST.md`, verified against `src/`)

| Group | Count | Note |
| --- | --- | --- |
| Real exports, wired up | 2 | `frame-6-…-dh8i.png` (Kitchen hero), `screenshot-2026-07-07-…-d1vc.png` (QIS hero) |
| Solid-colour stand-ins, wired up | 5 | portrait, WikiMind, AFONO, Surugami, Sync FM heroes |
| Unused files | 9 | no page references them; owner decision pending |

Stand-ins are correct-dimension flat colour blocks generated when the original exports
exceeded a 256 KiB fetch cap. **Dropping a real export in under the same filename fixes
them with zero code change.**

Filenames are opaque design-tool hashes. Consider renaming when real exports land (this
requires editing the `src` strings in `src/lib/**`).

### The ~115 slots with no file yet

- **Case studies — 71 slots, mechanism ready.** Since SESSION-003, `sections[].images[]`
  takes an optional `src`/`alt` and `case-study/Figure.tsx` renders a real image with a
  caption when one is set, the hatched placeholder when not (`DECISION-014`). Dropping a
  photo in is now a data edit.
- **About `carouselItems[]` (8) and every `PlaygroundItem` (36) — 44 slots, no
  mechanism.** Their types still carry no `src`, so a real photo needs a type + call-site
  change — `ISSUE-007`, `SUGGESTION-002`. For the Playground, whether they *should* is
  still `DECISION-006`'s open question.

`CONTENT_GUIDE.md` §10.4 enumerates every slot with its caption.

### Missing entirely

- No `og:image` that is a real photograph (`index.html` points at the stand-in portrait).
- No `sitemap.xml`.
- No résumé PDF — `/resume` relies on `window.print()`.
- No apple-touch-icon / web manifest.

### Related

`ARCH-05`. Issues: `ISSUE-006`, `ISSUE-007`.


---

<a id="components"></a>

## Codebase — Components

`src/components/` — 27 files. Grouped by area.

### Shell / navigation

| File | Lines | Controls |
| --- | --- | --- |
| `Header.tsx` | 93 | fixed 72px bar, wordmark, absolutely-centred `ModeSwitch`, nav links (`nav:` ≥1160px), `MobileMenu`, scroll-state blur/background, a second `sm:hidden` row holding the mode switch |
| `Footer.tsx` | 77 | two-column footer, playground vs portfolio border/bg variant, language switch, back-to-top, copyright |
| `ModeSwitch.tsx` | 47 | Portfolio ⇄ Playground segmented pill, `aria-current`, 44px min height |
| `LanguageSwitch.tsx` | 29 | EN/DE pill; links to `localeHref(target, pathname)` |
| `MobileMenu.tsx` | 80 | full-screen panel below `nav:`, Escape to close, body scroll lock |
| `Seo.tsx` | 41 | imperative `document.title` + meta writes |

`Header` and `Footer` each contain a private duplicate of `stripLocale()` (`ISSUE-021`).

### Homepage

| File | Lines | Controls |
| --- | --- | --- |
| `SelectedWork.tsx` | 25 | `#work` section heading block + `<WorkGrid>` |
| `WorkGrid.tsx` | 97 | six project cards, image-only, read from `dictionary.projects[]` (`DECISION-021`, SESSION-031 — the bento and its eleven tiles were deleted; the fault was text over images and `object-cover` crops, not colour) |
| `AboutPreview.tsx` | 57 | portrait + annotation pills + copy + two links |
| `ContactSection.tsx` | 34 | `#contact`, near-black band, two CTAs, email |

`src/components/ProjectEntry.tsx` (`FeaturedProject` / `GridProject`) was **deleted** in
the uncommitted working tree; recover it with `git show HEAD:src/components/ProjectEntry.tsx`.

### Process canvas (`src/components/process/`)

| File | Lines | Controls |
| --- | --- | --- |
| `HeroProcess.tsx` | 408 | the whole hero + canvas; two complete renders (static / pinned) and the rAF scroll choreography |
| `clusters.tsx` | 630 | five illustrated collages (`Cluster1`–`Cluster5`) — polaroids with `clip-path` torn edges, pins, dark panels, sketches. Hard-coded English labels |
| `icons.tsx` | 209 | 20 inline SVG icons + `branchIcons` / `tileIcons` arrays |
| `BranchGroup.tsx` | 89 | one branch: number, title button, question, cluster, close button |
| `branchData.ts` | 51 | five `BranchLayout` records — `left`/`top` %, SVG path, endpoint caps |

This is the most intricate area of the codebase. Read `ARCH-04` before changing it.

| `PageTransition.tsx` | 40 | fades a page in on arrival — opacity only, no key on the subtree, and the file says why (`SUGGESTION-007`) |
| `RouteLoading.tsx` | 18 | the Suspense fallback: a 2px bar and an announced "Loading page…" (`ISSUE-020`) |

### Case study (`src/components/case-study/`)

| File | Lines | Controls |
| --- | --- | --- |
| `CaseStudyPage.tsx` | 78 | back link, then **the rail + reading column grid starting at the top of the page**, then the closing band and next-project nav. Nothing sits above the grid, which is what lets the rail be on screen when the page opens (`DECISION-017`). The rail column exists from `xl` (1280px) only; the last section is lifted out onto its own tinted band (`outro`) |
| `CaseStudyHero.tsx` | 62 | the hero image and nothing else, with the scrubbed drift and `priority` so it is not lazy-loaded. Renders inside the reading column (~960px), not across the container |
| `CaseStudyIntro.tsx` | 57 | the page's `h1` at `text-feature`, summary, optional disclosure, tags and `FactsStrip`. Rendered *inside* the first section via `Section`'s `intro` slot, so the page reads 01 Overview → title → description → facts → the section's own heading (`DECISION-017`) |
| `FactsStrip.tsx` | 52 | label/value `<dl>` of Type/Role/Contribution/Tools/Deliverables at the 680px measure, empties filtered out. `year` is gone; `type` carries "Semester project · solo/team" |
| `ContentsNav.tsx` | 116 | sticky rail from `xl` + collapsible `<details>` below it, both marking the section being read. `useActiveSection` runs an `IntersectionObserver` rebuilt on every pathname change (never mount-only — `ARCH-01`); the rail's left edge fills as a progress track |
| `Section.tsx` | 195 | one section: number + nav label, optional `intro` slot, heading, `body[]` blocks, then its set pieces and media. One render path; `first` and `outro` vary only spacing, scale and (for `outro`) heading-beside-text. Text sits at a 680px measure, everything else runs wider. `BodyBlock` switches on the block kind — paragraph / `h3` / `list` / `quote` / `note` / `figure` (`DECISION-014`) |
| `SectionMedia.tsx` | 159 | groups figures into runs, then justifies each run into rows of at most three. **Every figure in a row shares one height** (`MAX_FIGURE_HEIGHT`, 640px, or less when the 960px column binds) and its width follows from its own aspect — `flex-grow: <ratio>` against `flex-basis: 0`, so the browser does the justification and nothing is cropped (`DECISION-019`). Stacks below 768px. A nested reveal, deliberately (`DECISION-008`) |
| `Figure.tsx` | 72 | a case-study image slot: `Media` plus a `<figcaption>` when `src` is set. A real figure is also the button that opens `ui/Lightbox`; a placeholder is not |
| `NextProjectNav.tsx` | 52 | prev/next preview cards + "View all work" |

### Playground (`src/components/playground/`)

| File | Lines | Controls |
| --- | --- | --- |
| `PlaygroundLayout.tsx` | 8 | the paper grid behind the whole section; the grid itself lives in `gridBackground.ts` because a card has to paint its own copy |
| `gridBackground.ts` | 14 | the shared 32px/8px grid, used by the layout and by every card |
| `CardStack.tsx` | ~190 | the deck (`DECISION-027`): four `position: sticky` siblings in one container, stepped in `top` and in `height`; a GSAP shrink for depth only; the sticky motion control, pinned with `top: calc(100svh - 84px)` |
| `Collage.tsx` | ~140 | one card's slots. The contained design stage (`min(100cqw, 160cqh)`) on a landscape card, a masonry on a portrait one — switched by a container query in `index.css`, not a breakpoint |
| `Scrapbook.tsx` | 118 | **no longer rendered** (`DECISION-027`). The SESSION-034 bento rows |
| `Tile.tsx` | 78 | **no longer rendered** (`DECISION-027`). One scrapbook tile: matted media, written cards, click-to-enlarge |

### Shared

| File | Lines | Controls |
| --- | --- | --- |
| `ui/Image.tsx` | 32 | `<img>` wrapper, `fill` only, builds a `srcset` from `imageVariants` |
| `ui/Lightbox.tsx` | 141 | full-screen view of one figure, portalled to `body` at `z-[210]` (over the header's `z-[200]`). Opens fitted, tap toggles the image's natural size inside a pannable scroller. Escape closes, focus starts on Close and returns to the figure. Exists because a dense figure is unreadable at 350px on a phone |
| `PlaceholderImage.tsx` | 23 | hatched `role="img"` box with bracketed caption |
| `about/LoveLine.tsx` | 65 | cycling word with measured width transition |
| `resume/PrintButton.tsx` | 11 | `window.print()` |

### Related

`ARCH-03`, `ARCH-04`, `ARCH-05`.


---

<a id="configuration"></a>

## Codebase — Configuration and repo-root files

| File | Purpose | Notes |
| --- | --- | --- |
| `package.json` | scripts + deps | `type: module`, private, v0.1.0. One dev dependency exists purely for verification: **`axe-core`**, injected into the page by a scratch script during accessibility runs (SESSION-009). It ships in nothing |
| `vite.config.ts` | React plugin, `@` → `./src`, `outDir: dist`, `sourcemap: false` | |
| `tsconfig.json` | project references only | |
| `tsconfig.app.json` | `src` — strict + `noUncheckedIndexedAccess` + `noUnusedLocals`/`Parameters`, `noEmit`, `@/*` paths | |
| `tsconfig.node.json` | `vite.config.ts` only | |
| `eslint.config.mjs` | flat config; ignores `dist/`, `design-reference/`, `node_modules/` | 3 warnings, 0 errors |
| `postcss.config.js` | tailwindcss + autoprefixer | |
| `tailwind.config.ts` | design tokens — see `styling.md` | |
| `index.html` | single entry; **static EN meta + OG tags live here** | not per-locale, `ISSUE-013` |
| `.gitignore` | node_modules, dist, `/.next`, .DS_Store, `*.tsbuildinfo`, `design-reference/` | complete; `ISSUE-018` resolved |
| `scripts/content-guide-case-studies.mjs` | regenerates `CONTENT_GUIDE.md` §5 from the case-study data | `node scripts/content-guide-case-studies.mjs --write`; bundles the TS with esbuild (a vite dependency), not wired into `npm run` |
| `scripts/image-manifest.mjs` | regenerates `docs/reference/image_manifest.md` | `node scripts/image-manifest.mjs --write` |
| `scripts/prerender.mjs` | writes each route's own `<head>` into `dist/`, plus `sitemap.xml` (`ISSUE-013`) | `npm run prerender`, and `predeploy` runs it. Serves `dist` itself and drives headless Chrome — macOS path built in, override with `CHROME=…` |

### Repo-root documents (not code)

| File | Role |
| --- | --- |
| `CONTENT_GUIDE.md` (~1855 lines) | every editable text field and image slot with its exact source path; the intended copy-editing surface. §5 is generated — see `scripts/` above |
| `ROADMAP.md` (2.9 KB) | the owner's content/asset roadmap — phases: EN content → images → animation → German |
| `design-reference/` | **gitignored.** `SPEC.md` (439 lines, condensed implementation spec), `master-prompt.md` (5095 lines, the design brief), and 16 `.dc.html` coded reference designs — the authoritative visual source |
| `docs/reference/image_files.md` | real vs stand-in image status |

See `docs/reference/index.md` for how to use these without duplicating them.

### Leftovers to clean (`ISSUE-018`) — resolved

`.next/`, `tsconfig.tsbuildinfo` and the empty `NewHomePage/` were deleted in SESSION-002
after checking each was disposable. `/.next` is in `.gitignore`. Nothing remains from the
Next.js era.

### Uncommitted working tree (`ISSUE-017`) — resolved

The tree is clean. The work this section described was committed in `cc6e1c8` before
SESSION-002 started. **Always re-check with `git status` at session start** rather than
trusting a snapshot in these documents — that is exactly how this one went stale.

### Related

`ARCH-06`.


---

<a id="content-data"></a>

## Codebase — Content and data (`src/lib/`)

Every visible string lives here. Components read; they do not author.
`CONTENT_GUIDE.md` (repo root) is the field-by-field editing surface — see
`docs/reference/index.md`.

### Dictionaries — `src/lib/dictionaries/`

| File | Lines | Contents |
| --- | --- | --- |
| `types.ts` | 203 | the `Dictionary` contract: `meta`, `nav`, `hero`, `process`, `selectedWork`, `projects[]`, `resume`, `aboutPreview`, `contact`, `footer`, `playgroundNav`, `about`, `caseStudy`, `notFound` |
| `en.ts` | 380 | full English implementation |
| `de.ts` | 380 | full German implementation |
| `index.ts` | 22 | `getDictionary(locale)` + type re-exports |

`ProjectCopy[]` (six entries) is read by exactly one component — `NextProjectNav`, the
case-study prev/next ring — which uses `slug`, `name`, `tags`, `image` and `imageAlt`.

`imageAspect`, `projectTag`, `placeholderLabel` and `featured` were removed in SESSION-025
once `DECISION-010` settled the homepage as a category label plus a title, which ended any
prospect of the editorial fields coming back (`ISSUE-010`).

`headline`, `description`, `role` and `year` are **kept although nothing renders them**: 48
authored strings across two locales, and what a `/work` index page would need
(`SUGGESTION-014`). The type says so at the declaration.

**Inspect when:** changing nav labels, hero copy, About copy, résumé, footer, 404, or any
shared case-study/playground UI label.

### Case studies — `src/lib/caseStudies/`

| File | Lines | Sections (per locale) |
| --- | --- | --- |
| `types.ts` | 68 | `CaseStudyContent`, `CaseStudySection`, `Block` (the body union), `InsightItem`, `TestingStep`, `SectionImage` (with optional `src`/`alt`) |
| `index.ts` | 52 | slug registry of **dynamic imports** + `caseStudyPromise(slug)` / `localeContent(content, locale)`. One chunk per study since `DECISION-015`; read with React's `use()` so the page suspends rather than rendering empty |
| `wikimind.ts` | 324 | 8 |
| `afono.ts` | 348 | 9 — the only one with `heroDisclosure` (EN only, `ISSUE-009`) |
| `sync-fm.ts` | 282 | 8 |
| `barrier-free-kitchen.ts` | 350 | 8 |
| `surugami.ts` | 306 | 9 |
| `qis-portal.ts` | 388 | 9 |

Each file exports `{ en: CaseStudyContent, de: CaseStudyContent }`. Section `id`s are
shared vocabulary: `overview`, `challenge`, `research`, `insights`, `direction`,
`development`, `testing`, `outcome`, `reflection` (exact set varies).

**Body content is blocks, not strings** (`DECISION-014`). A bare string is still a
paragraph; `{ kind: "h3" | "list" | "quote" | "note" | "figure" | "figures" }` cover the rest.
`figures` carries an array and hands it to the same `SectionMedia` as `sections[].images[]`,
so a run of figures can sit at the prose it illustrates instead of after the whole section —
WikiMind uses it for all 17 of its figures. All seven
studies were migrated in SESSION-003 — 38 sub-headings, 22 lists, 8 notes — and `en` and
`de` are structurally identical block for block. Keep them that way: the types make a
missing field a compile error, but not a mismatched structure.

After changing any case-study content or shape, rerun
`node scripts/content-guide-case-studies.mjs --write` so `CONTENT_GUIDE.md` §5 keeps
matching.

**Inspect when:** editing any case-study copy, adding a section, or changing the section
model.

### Playground — `src/lib/playground/`

| File | Lines | Contents |
| --- | --- | --- |
| `collage.ts` | ~430 | **what the page renders** (`DECISION-027`): four cards, 48 slots traced from `Portfolio.fig` page 2. Each slot holds `x/y/w/h` in the design's own pixels on its 16000 × 10000 frame, plus `src`, an optional `video`, both locales' `alt`, and `focus`/`rotate` where the design crops or turns a picture |
| `types.ts` | 69 | `PlaygroundItem`, `PlaygroundCategoryContent`, `PlaygroundHomeContent` |
| `home.ts` | 44 | the page's copy. Only `eyebrow`, `heading`, `intro`, `pauseMotion` and `playMotion` are read now; the rest is kept |
| `categories/index.ts` | 29 | registry + `getCategory` / `getAllCategories` |
| `categories/{games-and-apps,photography-3d-motion,graphic-design,digital-art,crafts}.ts` | 33–56 each | title, intro, 5–17 items (pictures, clips and written cards), "more coming" note |

**The category files are no longer rendered** (`DECISION-027`) and are deliberately kept:
they are the only written record of the captions and of the slots still waiting for
material, and `content-audit.mjs` still holds their two locales together. `collage.ts` is
what to edit to change the page.

**Order in `collage.ts` is paint order** — the Figma frames have deliberate overlaps, so
the slots are listed bottom-to-top exactly as Figma lists them.

### Helpers

| File | Lines | Purpose |
| --- | --- | --- |
| `i18n.ts` | 13 | `Locale`, `defaultLocale`, `isLocale()`, `localeHref()` |
| `useLocale.ts` | 16 | `localeFromPathname()`, `useLocale()`, `useDictionary()` |
| `useScrollReveals.ts` | 85 | GSAP reveal hook; effects keyed on pathname, owns the `[data-inview]` at-rest state (`ISSUE-001`) |
| `useScrollBehavior.ts` | 231 | All scroll side effects of a navigation: top reset, hash landing (aimed at layout position, not the rendered box), back/forward restore (`DECISION-013`, `DECISION-014`) |

### Adding content — checklist

- **New case study:** create `src/lib/caseStudies/<slug>.ts` with both locales → register
  in `caseStudies/index.ts` → add a `ProjectCopy` entry to **both** dictionaries (the
  prev/next ring reads from `dictionary.projects`) → add a card entry in `dictionaries/{en,de}.ts → projects[]`.
- **New playground picture:** add a `CollageSlot` to the right card in
  `collage.ts` — `x/y/w/h` read straight off the Figma inspector, both locales' `alt` — then
  `node scripts/image-treat.mjs <spec>` for the asset, record it in
  `docs/reference/image_crops.json`, and `npm run images`.

### Images

Every image slot on the site takes an optional `src`/`alt` and falls back to the hatched
placeholder without one (`ISSUE-007`, closed in SESSION-008): case-study `heroImage` and
`sections[].images[]`, `selectedWork.bento[]`, `about.carouselItems[]`, `PlaygroundItem`,
the playground project's `mainSrc`, and the playground home's `heroCards`.

`src/components/ui/Media.tsx` is the single component that chooses between the two.
`docs/reference/image_manifest.md` lists all 136 slots with the data path that fills each.

### Related

`ARCH-02`. Decisions: `DECISION-003`, `DECISION-014`. Issues: `ISSUE-007` (Playground and
About slots), `ISSUE-009`, `ISSUE-010`.


---

<a id="pages-and-routes"></a>

## Codebase — Entry points, routes and pages

### `src/main.tsx` (13 lines)

Mounts `#root`, builds `createBrowserRouter(routes)`, wraps in `StrictMode`. Imports
`@/index.css`. Nothing else happens here.

### `src/routes.tsx` (52 lines)

The whole route table. `dual(path, element)` returns the bare and `/de`-prefixed
`RouteObject` pair; `dualPlayground()` does the same for the nested playground subtree
wrapped in `PlaygroundLayout`. All pages except `NotFound` are `lazy()`.

**Inspect when:** adding a route, changing locale prefixing, or fixing scroll/hash
behaviour (`ISSUE-001`–`ISSUE-003` all land here or in `RootLayout`).

### Layouts

| File | Role |
| --- | --- |
| `src/components/RootLayout.tsx` | flex column, `<Header>` / `<main><Suspense><Outlet/></Suspense></main>` / `<Footer>`; sets `<html lang>` |
| `src/components/playground/PlaygroundLayout.tsx` | adds the four-layer CSS dotted-grid background (8px minor + 32px major), shared with every card via `gridBackground.ts` |

### `src/pages/`

| File | Lines | What it renders | Notes |
| --- | --- | --- | --- |
| `Home.tsx` | 23 | `HeroProcess` → `SelectedWork` → `AboutPreview` → `ContactSection` | thin composition shell; calls `useScrollReveals()` |
| `About.tsx` | 208 | full About page inline (hero, portrait+bio, focus/tools+AI block, carousel, `LoveLine`, résumé CTA) | the only large page component; hand-drawn SVG arrows are inline here |
| `Resume.tsx` | 179 | print-oriented single column with local `EntryHeader`/`EducationRow`/`ProjectRow`/`ExperienceRow`/`FurtherRow` sub-components | `print:` variants throughout; does **not** call `useScrollReveals` |
| `CaseStudy.tsx` | 36 | reads the study with `use(caseStudyPromise(slug))` — suspending into the loading bar on first visit (`DECISION-015`) — computes prev/next as a ring over `dictionary.projects`, renders `CaseStudyPage` | returns `<NotFound/>` for unknown slugs, without a round trip |
| `Contact.tsx` | 8 | `<Navigate>` to `/#contact` | broken in practice, `ISSUE-022` |
| `NotFound.tsx` | 25 | 404 | not lazy — imported directly by `routes.tsx` |
| `playground/PlaygroundIndex.tsx` | 66 | the whole playground: a centred title and `CardStack` (`DECISION-027`). Owns the one `paused` state the clips read | does **not** call `useScrollReveals` — the deck is its own motion |

**Pattern:** every page resolves its own content, renders `<Seo>`, calls
`useScrollReveals()`, and delegates markup to components — except `About.tsx` and
`Resume.tsx`, which hold their markup inline.

### Related

`ARCH-01`. Issues: `ISSUE-001`, `ISSUE-002`, `ISSUE-003`, `ISSUE-020`, `ISSUE-022`.


---

<a id="styling"></a>

## Codebase — Styling

### `tailwind.config.ts` (2.4 KB)

- `content`: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- `theme.screens` (**replaced**): `sm:480 md:768 lg:1024 nav:1160 xl:1280 2xl:1440`
  — ascending since SESSION-006, so a breakpoint can no longer lose to a smaller one
  declared after it (`ISSUE-011`, resolved).
- `theme.colors` (**replaced**, 17 tokens): `page #F8F9FB`, `surface #F2F3F5`,
  `surface-2 #EAECF0`, `ink #111111`, `ink-secondary #62666D`, `ink-muted #858A92`,
  `ink-body #3A3D42`, `border #D7DAE0`, `near-black #0A0A0A`, `canvas-black #050505`,
  `accent #1B3FE0`, `accent-focus #1233C4`, `accent-soft #E1E7FF`,
  `card-border #E4E7EE`, `border-muted #C9CEDB`, `accent-on-dark #8FA6FF`, plus
  white/black/transparent/current. Tailwind's default palette is unavailable.
- `theme.extend`: `fontFamily.sans/mono/hand`, `borderRadius.canvas 40px`, spacing
  `4.5 13 18 30 38 48`, and the display type scale — `hero`, `page-title`, `section`,
  `feature`, `heading`, `subheading`, `lead` — **in use at 24 call sites** since
  SESSION-006 (`ISSUE-023`). Sizes only: line-height and letter-spacing are still written
  per component.
  - **A font-size token must not share a name with a colour token.** `text-*` serves both
    and the colour wins: a size called `page` made two h1s render in `#F8F9FB` on white.

### `src/index.css` (113 lines)

| Block | Contents |
| --- | --- |
| `@layer base` | `--font-inter` / `--font-caveat` vars, **`--header-h` / `--anchor-offset`** (see below), `box-sizing`, `scroll-behavior: smooth` (note: this is why `useScrollBehavior` must pass `"instant"` explicitly — `"auto"` defers to it), global reduced-motion kill-switch, `body` classes, `::selection`, `a { color: inherit }`, `section { scroll-margin-top: var(--anchor-offset) }`, `:focus-visible` outline |
| `@layer components` | `.container-page` — `mx-auto max-w-[1440px] px-5 md:px-20`, used at all 31 page-container call sites since SESSION-006. The one place to change the gutters |
| keyframes | `mqA` / `mqB` marquee translations + reduced-motion disable |
| `@media (max-width: 880px)` | `!important` overrides collapsing `[data-el="bento"]` to a single column |
| `[data-inview]` | **no rule** — removed in SESSION-002. The at-rest state is applied by `useScrollReveals` from a layout effect so it fails safe (`ISSUE-001`) |

### Header height (`--header-h`, `--anchor-offset`, `--page-top`)

`Header.tsx` measures its own height in a layout effect and a `ResizeObserver`, and writes
`--header-h` onto the document element. `index.css` derives everything that has to clear
the header from it:

| Variable | Value | Read by |
| --- | --- | --- |
| `--header-h` | measured; CSS falls back to 146px, or 73px from **768px** up | the two below |
| `--anchor-offset` | `calc(var(--header-h) + 31px)` | `section { scroll-margin-top }`, the case-study rail's sticky offset |
| `--page-top` | `calc(var(--header-h) + var(--page-air))` — air is 40px, and 77px from `md` up, which is the 150px pages used to hard-code | the first section of every page |

The header is 73px tall from 768px up, and 146px below that, where it carries a second row
for the mode switch (`ISSUE-016` moved that boundary from 480px). Numbers tuned to the
desktop header hid 42px of every anchored section on a phone (`ISSUE-015`) and started the
homepage hero 28px *underneath* the header (`ISSUE-016`). **A number that has to clear the
header belongs in a `calc()` off these variables, not in a class.**

Two things that deliberately do *not* use them: `SelectedWork`'s `pt-[160px]` and About's
`pt-[110px]` are rhythm between sections, not header clearance.

The CSS fallbacks apply only until the measurement runs, and are the one part still written
by hand — re-check them if the header's markup changes.

### Accessibility rules baked into the CSS

- `.tap-target` (`inline-flex min-h-[24px] items-center`) is the 24×24 floor from WCAG
  2.5.8. Standalone links were 17–23px — the height of their line box (`ISSUE-030`). Links
  inline in a sentence are exempt and do not need it.
- The palette clears 4.5:1 on the grounds each colour is used on. `ink-muted` was `#858A92`
  (3.13:1) until SESSION-009; `ink-on-dark-muted` replaced a `#6C7078` literal at 3.98:1.
  **Any new colour needs its contrast computed against the ground it sits on**, not
  eyeballed — [`issues.md#issue-030`](issues.md#issue-030) records the method.

### Motion

`src/lib/motion.ts` is the vocabulary: `duration.fast/base/slow`, `ease.out/inOut`,
`distance.sm/md/lg`, `stagger`, and the single `prefersReducedMotion()` guard everything
consults. `index.css` mirrors the same numbers as `--duration-fast/base/slow` and
`--ease-out`, for transitions written in Tailwind rather than GSAP — **change them
together**.

Reveals are opt-in per element: `data-inview` alone means `up`; `data-inview="fade"`,
`"scale"` or `"stagger"` pick the others. `stagger` animates the element's *children* under
one trigger — the homepage bento, the playground category grid and case-study media grids
use it. Nesting a reveal inside a section that already has one is fine (`DECISION-008`).

Three things are tied to the scroll position rather than to a trigger: the case-study hero
drifts as it leaves, and the playground marquee rows speed up with the page. Both are
transform-only, both are absent entirely under `prefers-reduced-motion` — **not slowed, not
present**, which is the rule for anything scroll-linked here.

The marquee rows are a GSAP tween rather than a CSS animation, because `timeScale` can be
nudged without the jump that changing `animation-duration` mid-flight causes. Their pause
control calls `pause()` on the tween, so paused means stopped whatever the velocity is
doing (WCAG 2.2.2).

### Heading hyphenation

`h1`/`h2`/`h3` carry `overflow-wrap: break-word` at every width — a guard that does nothing
until a word cannot fit — plus `hyphens: auto` scoped to `:root:lang(de)` **below `md`**.
German compounds are long enough to overflow the page at narrow widths (`ISSUE-028`);
English is not, and `hyphens: auto` changes line breaking wherever it applies, so it is kept
off English and off the large display sizes, where a hyphen in an 84px headline reads worse
than the wrap it replaces.

### Fonts

Loaded render-blocking from Google Fonts in `index.html`: Inter 400/500/600, Caveat
500/600/700, `display=swap`. Referenced via the CSS variables above.

### Conventions actually in use

- Page container: `.container-page`. The 80px padding from 768px up is what made
  `ISSUE-026` possible and what `ISSUE-028` runs into at 320px.
- Headings: the named scale above. Only two `clamp()` literals remain — the process
  canvas's question heading.
- Case studies: text at a 680px measure, media to 960px, rail 240px from `xl` up
  (`DECISION-014`).
- Card border: `border border-card-border`.
- Section rhythm: large round paddings — `pt-[150px]`, `py-[120px]`, `pb-[130px]`, etc.
- CTA pill: `flex h-12 items-center rounded-full px-7 text-[15px] font-medium`.

### Inspect when

Changing tokens, adding a breakpoint, or fixing responsive behaviour. Related: `ARCH-03`,
`SUGGESTION-009` (point 4, the card and pill primitives, is still open), `SUGGESTION-010`,
`ISSUE-028`.

