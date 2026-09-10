# Reference handbook

Design tokens, the publishing runbook and the verification harness, in one place. The data files beside this one (`image_sources.md`, `image_manifest.md`, `image_files.md`, `image_crops.json`) are referenced by `scripts/` by path and stay where they are.


---

<a id="design-tokens"></a>

## Design tokens and rules (captured)

Mirrored from `design-reference/SPEC.md` §1 and §11 because that directory is gitignored
and exists only on this machine. Where the prose brief and the coded `.dc.html` files
disagreed, the coded value is recorded — see `DECISION-009`.

### Colour

| Role | Value | In `tailwind.config.ts` |
| --- | --- | --- |
| White | `#FFFFFF` | `white` |
| Portfolio page bg | `#FFFFFF` | — (`body` uses `bg-white`) |
| Playground page bg | `#F8F9FB` | `page` |
| Soft neutral surface | `#F2F3F5` | `surface` |
| Secondary surface | `#EAECF0` | `surface-2` |
| Primary text | `#111111` | `ink` |
| Secondary text | `#62666D` | `ink-secondary` |
| Muted text (mono captions) | `#6A6F78` | `ink-muted` — was `#858A92` until SESSION-009, which is 3.13:1 on the page background and fails WCAG AA |
| Long-form body text | `#3A3D42` | `ink-body` |
| Border (tag pills) | `#D7DAE0` | `border` |
| Near-black (dark bands) | `#0A0A0A` | `near-black` |
| Process canvas black | `#050505` | `canvas-black` |
| Header pill / selected segment | `#111114` | — (arbitrary) |
| **Accent** | `#1B3FE0` | `accent` |
| Focus outline | `#1233C4` | `accent-focus` |
| Soft accent / selection | `#E1E7FF` | `accent-soft` |
| Card / figure border | `#E4E7EE` | `card-border` (named in SESSION-006) |
| Text on the near-black bands | `#A7ACB4` | `ink-on-dark` (named in SESSION-009) |
| Muted text on the near-black bands | `#8A8F98` | `ink-on-dark-muted` — replaced a `#6C7078` literal at 3.98:1 (SESSION-009) |
| Dashed rules | `#C9CEDB` | `border-muted` (named in SESSION-006) |
| Accent on the dark canvases | `#8FA6FF` | `accent-on-dark` (named in SESSION-006) |
| Playground grid major (32px) | `rgba(78,96,135,0.055)` | — |
| Playground grid minor (8px) | `rgba(78,96,135,0.025)` | — |
| Playground border tint | `rgba(78,96,135,0.18–0.35)` | — |
| Placeholder fill | `repeating-linear-gradient(45deg,#F2F3F5 0 10px,#EDEFF3 10px 20px)` | — |

> The prose brief names `#5C6CFF` / `#4055FF` as accent/focus. **Ignore those** — every
> coded design uses `#1B3FE0` / `#1233C4`.

### Type

- Body: **Inter** 400/500/600, Google Fonts, with the system stack behind it.
- Hand annotations: **Caveat** 500/600/700 (`font-hand`).
- Metadata / eyebrows / captions: `ui-monospace, Menlo, Consolas, monospace`.

Sizes as coded in the reference:

| Role | Value |
| --- | --- |
| Case-study / About h1 | `clamp(40px,5.4vw,84px)`, or `clamp(44px,5.8vw,86px)`, or `clamp(40px,5vw,76px)` for longer headlines (Sync FM, QIS); mobile 38–44px |
| Section heading | `clamp(30px,3.2vw,44px)` case studies; `clamp(26px,2.6vw,34px)`–`clamp(30px,3vw,40px)` About; mobile 30px |
| Playground category h1 | `clamp(38px,4.6vw,68px)`; mobile 38px |
| Long-form body | 18px / 1.65 |
| Hero intro | 19px / 1.6 |
| Metadata | 12–13px mono |
| Large-heading letter-spacing | −0.025em to −0.028em |

#### As implemented

The reference's sizes were ported as per-component `clamp()` values and drifted into ~20
near-duplicates. SESSION-006 reconciled them into seven named sizes in
`tailwind.config.ts` (`ISSUE-023`) — these are the implementation's scale, and the closest
thing the project has to a canonical one:

| Token | Value |
| --- | --- |
| `hero` | `clamp(2.75rem, 5.8vw, 5.5rem)` |
| `page-title` | `clamp(2.5rem, 5.4vw, 5.25rem)` |
| `section` | `clamp(2.125rem, 4.6vw, 4.25rem)` |
| `feature` | `clamp(1.875rem, 3.6vw, 3.25rem)` |
| `heading` | `clamp(1.875rem, 3.2vw, 2.75rem)` |
| `subheading` | `clamp(1.625rem, 2.6vw, 2.25rem)` |
| `lead` | `clamp(1.375rem, 2.2vw, 1.875rem)` |

Sizes only — line-height and letter-spacing are still per component. A font-size token must
never share a name with a colour token: `text-page` resolved to the *colour* `page` and
rendered two h1s near-white on white before it was renamed `page-title`.

### Spacing, width, radius

- Vertical rhythm in round numbers: 56, 64, 72, 76, 90, 96, 100, 110, 120, 130, 140, 150 px.
- Max widths: 1440px outer, 1280px content, ~960px case-study reading column, 240px rail.
  As implemented: `.container-page` is `mx-auto max-w-[1440px] px-5 md:px-20`, i.e. the
  1280px content width falls out of the outer width minus the padding. The case-study
  column is 960px for media and 680px for text (`DECISION-014`).
- Side padding: 80px desktop → 20px mobile. The 80px starts at 768px, which is what makes
  tablet widths tight (`ISSUE-026`, `ISSUE-028`).
- Radii: 3px (small thumbs), 6/8px (cards), 10px (portrait/hero images), 40–44px (process
  canvas at rest), 999px (pills).

### Breakpoints as coded in the reference

- `1160px` — nav links collapse to a hamburger
- `880px` — the main mobile breakpoint (padding drops, grids collapse, headings shrink),
  and the cutover between the process canvas's pinned and static flows
- `640px` — secondary mobile adjustments

### Accessibility rules (SPEC §11, stated non-negotiable)

**Verified in SESSION-009** — axe-core over 8 pages × 2 locales against `wcag2a`/`2aa`/
`21a`/`21aa`/`22aa` plus best-practice: 0 violations. What it took, and what measuring
disproved, is in [`issues.md#issue-030`](../issues.md#issue-030).

- WCAG 2.2 AA.
- `:focus-visible { outline: 2px solid #1233C4; outline-offset: 3px; border-radius: 2px }`
  globally.
- `aria-current="page"` on the active mode segment; `aria-label` on the language toggle;
  `aria-expanded` on the mobile menu button.
- Every `[data-inview]` element fully visible with no transition under
  `prefers-reduced-motion: reduce`. The same guard gates the pinned canvas, the
  "I love ___" cycle, and smooth scrolling.
- Every process-section image and icon needs a real non-empty `aria-label`/alt even though
  no caption is shown.
- 44×44px minimum touch targets.

### Content rules (SPEC §12)

See `DECISION-011` — no invented metrics, clients, employers, awards or testimonials;
never present collaborative work as independent; no generic portfolio-speak; no lorem ipsum.


---

<a id="publishing"></a>

## Publishing — the two commands, and what has been checked

The site is **not published automatically**. There is no CI; nothing happens on push
(`DECISION-012`). Publishing is a deliberate act on a developer machine.

### The two commands

```bash
git checkout main
git merge milestone-003-content-model     # or whatever branch the work is on
npm run deploy
```

`npm run deploy` runs `predeploy` first, which is `npm run build && npm run prerender`, and
then pushes `dist/` to the `gh-pages` branch with the `gh-pages` package. The live site is
`https://alexshamaharjan.github.io`.

**The machine that deploys needs Chrome**, because the prerender drives it to read each
route's metadata. Override the path with `CHROME=/path/to/chrome npm run deploy` if it is
not at the macOS default.

Expect the whole thing to take about a minute: the build is under a second, the prerender
about 38 seconds for 36 routes, the push a few seconds.

### What a pre-flight on the built artifact found (SESSION-014)

Checked against a server that behaves the way GitHub Pages does — real file, then directory
index, then `404.html` with a 404 status:

| | |
| --- | --- |
| `dist/` | 78 files, 37 HTML, 1.57 MB |
| Assets referenced by any HTML | all served, none missing |
| Asset paths inside `/work/wikimind/` | absolute — a relative one would 404 a level down |
| `404.html` | boots the app, carries no `<h1>` of its own, keeps the site's default title |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | all served; robots points at the sitemap |
| Files that should not ship | none — no source, no sourcemaps, no `.DS_Store` |

And end to end, through that server:

| URL | Status | What renders |
| --- | --- | --- |
| `/work/wikimind/` | 200 | the case study, loading only the `wikimind` chunk |
| `/de/work/afono/` | 200 | the German case study, only the `afono` chunk |
| `/work/nonsense/` | **404** | the 404 page — a real 404 status, not a soft 200 |
| `/totally/made/up` | **404** | the 404 page |

The 404 status matters: a SPA that answers every URL with 200 teaches search engines that
its missing pages are real ones.

### What to check after publishing

- Open `https://alexshamaharjan.github.io/work/wikimind` directly, not through the
  homepage — that is the path that depends on the prerendered directories.
- Paste a case-study link into Slack or LinkedIn and look at the preview card. The title
  and description will be right; **the image will be a solid-colour placeholder** until a
  real `og:image` exists (`ISSUE-006`).
- Check `https://alexshamaharjan.github.io/de/` shows German.

### If something is wrong

`gh-pages` overwrites the `gh-pages` branch each time, so publishing again after a fix is
the rollback. Nothing on `main` is touched by deployment.


---

<a id="verification"></a>

## Verification — the checks, as commands

Every hand-off in this project has described these checks in prose, and every session has
rebuilt them by hand in a temporary directory that does not survive to the next one.
SESSION-021 moved them into the repository.

```bash
npm run build && npm run prerender          # always verify the production build
node scripts/verify/serve.mjs dist 8099 &   # gzip, GitHub Pages resolution order
npm run verify                              # routes, images, a11y, weight
```

Individual checks: `npm run verify routes`, `… images`, `… a11y`, `… weight`.
Exits non-zero on any failure.

### The browser

The scripts drive a Chrome you start yourself, so runs are fast and repeatable:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/cdp-9333 \
  --no-first-run --disable-gpu about:blank &
```

**Run one check at a time.** Two runs on one browser drive the same page target and
interleave navigations. Two runs on *separate* browsers are no better: `serve.mjs` is a
single-threaded Node server doing synchronous `gzipSync` per request, so two sweeps starve
each other and the CDP awaits stop settling — the run dies with `Detected unsettled top-level
await` and, because the summary only prints at the end, **produces no output at all**. Both
were tried in SESSION-021, twice each. Run them in sequence.

`--port` exists so a second Chrome can be used deliberately, not so two sweeps can race.

**Do not rebuild while a check is running.** `npm run build` empties `dist/`, and the run
either crashes on a missing `sitemap.xml` or — worse — silently reports a different image
count. That happened twice in SESSION-021 and both results had to be thrown away.

Between them, these two rules account for every confusing result SESSION-021 produced. Both
failures look like product bugs and neither is: contention shows up as wildly unstable image
counts (`/work/sync-fm` reporting 0 images it plainly has), and a mid-run rebuild shows up as
a count that quietly changes between passes. **If a number looks impossible, check what else
was running before believing it.**

### What each check knows that a person would forget

#### `routes`

36 routes, driven from the **generated** `dist/sitemap.xml` rather than a hand-written list,
so a route that stops being generated cannot quietly stop being checked. Asserts 200, a real
`<title>`, and `hreflang` alternates.

It also asserts that **`/work` and `/de/work` return 404**. There is no work index route —
the homepage bento is the work listing, and nothing links to `/work`. A dev server that falls
back to the SPA shell for everything hides this, which is why `serve.mjs` implements Pages'
actual order: exact file, then `dir/index.html`, then `404.html` with a 404 status.

#### `images`

Sweeps every image on every route at **device pixel ratios 1, 2 and 3**. A 1x-only run hid a
real bug in SESSION-019: a bento tile described as `40vw` told a 3x phone it needed 515px when
it needed 1050, so it was served a 640px file — soft on the device most likely to open the
page first, and invisible at 1x.

Three things it checks, and why the third is the one that matters:

1. No broken image, no missing `alt`, no `alt` still starting `"Placeholder:"`.
2. Every route scrolled **in steps with a pause at each one**. The pause is the point: an
   `IntersectionObserver` needs a frame to fire, so a single jump to the bottom leaves every
   lazy image unfetched and they all report broken. That cost a full debugging round in
   SESSION-016 and produced 34 false positives in SESSION-020.
3. **The same route holds the same number of `<img>` elements at every ratio** — only the
   chosen `srcset` candidate should differ. A count that moves between passes was measured
   before the page settled, which means that pass under-covered the route. Counting *zero* is
   not itself suspicious: Playground's slots are all still unfilled and `/resume` is text.
4. **Zero failed image requests**, read from `Network.loadingFailed` and from 4xx responses.
   A `srcset` candidate that 404s is *invisible* — the browser silently uses another
   candidate and the page looks perfect. `img.complete` cannot see it either, because it
   cannot distinguish a lazy image mid-load from a broken one. Proved in SESSION-021 by
   adding a variant to the map that did not exist on disk: the page rendered fine, and the
   check caught `HTTP 404 — /images/sync-fm-dial-640.webp`.

`node scripts/image-variants.mjs --check` catches the same fault before a build, and
`predeploy` runs it.

Each ratio runs as its own process — `node scripts/verify/run.mjs images --dpr 1`. One CDP
connection is not reliable across 108 page loads with scrolling; the combined sweep died
partway through its second pass before this was split. Set `VERBOSE=1` to print each route
and its image count as it goes, which is the only way to see *where* a run stops.

#### `a11y`

axe-core across all 36 routes at 1440, plus horizontal overflow and stuck reveals at 1440 and
390, plus a reduced-motion pass asserting every revealed element is visible and untransformed.

**It waits for the page, not for a duration.** Case-study routes are a lazy chunk behind
Suspense; axe run against the fallback reports `landmark-one-main` and `page-has-heading-one`,
which look exactly like real defects. SESSION-020 chased two of those before noticing the
route was simply not rendered yet.

#### `weight`

Whole-page transfer, uncached, at 1440/1x and 390/3x, split into imagery and total. Only
meaningful **through the gzipping server** — without gzip the JS bundle roughly doubles every
total and drowns the number being watched.

### Traps that are not in the harness

- **`file://` images taint a canvas**, breaking `getImageData` and `toDataURL`. Pass the bytes
  in as a `data:` URI. But a `data:` **page** cannot load `file://` images — write the HTML to
  disk and navigate to it. Both apply to `contact-sheet.mjs` and `image-treat.mjs`.
- **`Page.captureScreenshot`'s `clip` is in page coordinates**, not viewport coordinates — add
  `scrollX`/`scrollY` and pass `captureBeyondViewport`.
- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** Two false alarms
  already; scroll with `behavior: "instant"`.
- **`Page.addScriptToEvaluateOnNewDocument` accumulates across runs.** Nothing here uses it.
- **Assert an anchor against the element's own `scroll-margin-top`**, never a fixed number:
  the header is 73px at 1440 and 146px at 390.

### Two traps this harness cannot see on its own

**`run.mjs` does not start the server, and does not check it is there.** It takes its base from
`--base`, defaulting to `127.0.0.1:8099`. Started without `serve.mjs`, all 36 routes navigate to
a refused connection and sit out their timeouts — SESSION-022 lost twenty minutes to what looked
exactly like a hang, with no output at all. Start the server first:

```bash
node scripts/verify/serve.mjs dist 8099 &
```

**`image-manifest.mjs` only sees the slots it knows how to walk.** It counts case-study figures
and diffs `en` against `de` — the check that caught Sync FM's German colour stand-in. When
SESSION-023 moved WikiMind's figures from `sections[].images[]` into inline `{ kind: "figures" }`
blocks, it reported *"WikiMind — 1 slot, all filled"* and silently stopped diffing 16 sources. It
now walks body blocks too, through one `sectionImages()` helper shared by the count and the diff.

If the content model grows another home for images, **that helper is the place to teach it**, and
the symptom of forgetting is a slot count that looks plausible.

### The harness does not read words

Everything above is structural. `tsc` and ESLint check types and syntax; axe, the image sweep,
the overflow and reveal checks all read markup; `image-manifest.mjs` diffs figure `src` across
`en` and `de` — **but never prose, because prose is supposed to differ between locales.**

So a German list sitting in the English object renders perfectly and passes every one of them.
That shipped in two commits (`ISSUE-036`).

```bash
npm run audit        # node scripts/content-audit.mjs
```

`content-audit.mjs` closes that gap with two checks, and `predeploy` now runs it:

1. **Wrong-language body blocks.** Function words only — content words are cognates far too often
   in a German design context ("Design", "Prototyp", "Interface"). **List items are tested
   individually**: the first version joined them and passed a German line hidden among three
   English ones, which is the fault it was written to catch, so that version was discarded.
2. **`en`/`de` structural parity** — the same sections in the same order, and the same sequence of
   block kinds within each. This catches a block that exists in one locale and not the other.

Both were proved by re-injecting each fault and confirming a non-zero exit before confirming
clean. **A check that has never failed has not been tested.**

