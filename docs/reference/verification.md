# Verification — the checks, as commands

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

## The browser

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

## What each check knows that a person would forget

### `routes`

36 routes, driven from the **generated** `dist/sitemap.xml` rather than a hand-written list,
so a route that stops being generated cannot quietly stop being checked. Asserts 200, a real
`<title>`, and `hreflang` alternates.

It also asserts that **`/work` and `/de/work` return 404**. There is no work index route —
the homepage bento is the work listing, and nothing links to `/work`. A dev server that falls
back to the SPA shell for everything hides this, which is why `serve.mjs` implements Pages'
actual order: exact file, then `dir/index.html`, then `404.html` with a 404 status.

### `images`

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

### `a11y`

axe-core across all 36 routes at 1440, plus horizontal overflow and stuck reveals at 1440 and
390, plus a reduced-motion pass asserting every revealed element is visible and untransformed.

**It waits for the page, not for a duration.** Case-study routes are a lazy chunk behind
Suspense; axe run against the fallback reports `landmark-one-main` and `page-has-heading-one`,
which look exactly like real defects. SESSION-020 chased two of those before noticing the
route was simply not rendered yet.

### `weight`

Whole-page transfer, uncached, at 1440/1x and 390/3x, split into imagery and total. Only
meaningful **through the gzipping server** — without gzip the JS bundle roughly doubles every
total and drowns the number being watched.

## Traps that are not in the harness

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

## Two traps this harness cannot see on its own

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

## The harness does not read words

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
