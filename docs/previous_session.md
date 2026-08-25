# Previous Session

**SESSION-020** — 2026-08-25/26. Full record: `docs/sessions/session_020.md`.

## What it did

**AFONO's section figures, one project end to end** — twelve of its fourteen empty slots,
cut from the 52-page `DesignProjekt_Dokumentation_Maharjan.pdf`. **136 slots, 42 filled**,
up from 30. WikiMind and AFONO are now both complete; four case studies remain.

**Re-read AFONO's sources page before exporting, and it changed the plan.** The row in
`image_sources.md` said "pages 25–27 are AI-generated". The page itself also names a
graphicgata iMac template, a pixelbuddha tee mockup, a Behance oversized-tee PSD and five
fashion brands used as market-analysis references. So the tee mockups on pages 20–21 are
someone else's garment renders with the owner's print on them, and the market-analysis figure
is competitors' photography.

The tees are therefore represented by **the print artwork itself** rather than by a mockup
render — the stricter reading of `DECISION-016`, and the better figure: the copy says "a
small front mark, larger back prints carry the narrative", and the artwork shows exactly that.
Recorded as `DECISION-016` Amendment 1, with the general point that **the row is an index,
not a substitute for the page**.

**Two slots stay hatched, deliberately** (`DECISION-006`): `[ market analysis ]`, whose figure
is competitors' photography with no substitute in the document; and `[ product page ]`,
because every product screen in the prototype is carried by the AI-generated imagery the
sources page calls a placeholder — **an open owner decision, not a gap.**

## What the verification caught, unrelated to the figures

**Sync FM's German hero was still a 6.9 KB colour stand-in.** SESSION-016 fixed the English
one and missed the German one, and it survived four sessions of checking because the file
loads, has proper alt text and is the right aspect. Every browser-side check passes on it.

`scripts/image-manifest.mjs` now diffs `en` against `de` across every case study and
dictionary slot and exits non-zero when they disagree — proved by putting the defect back.
The hand-off has repeated *every `src` goes in both objects* every session; it is now checked
rather than remembered.

**`image-variants.mjs` never reaped its own output.** Re-pointing that one `src` orphaned four
generated WebPs that still shipped. It now deletes variants whose source is unreferenced —
its own files only; the owner's originals are untouched. Orphan count is now 15 files, 817 KB.

## Tooling

- **`scripts/contact-sheet.mjs`** (new) — `sheet` tiles a rendered document into one labelled
  image; `grid` overlays a decile grid on a page. Both habits were recommended since
  SESSION-016 and still done by hand each time. No dependency.
- **`scripts/image-treat.mjs`** renders a PDF page on demand from `page` + `renderScale`, so
  `image_crops.json` — which records the source document — is re-runnable, not just descriptive.

## Verified, against the production build in Chrome

36/36 routes 200/titled/hreflang, driven from the generated `sitemap.xml`. 134 images across
36 routes at 1x, 2x **and** 3x: 0 broken, 0 missing `alt`, 0 "Placeholder:", 0 failed image
requests. axe 0 violations, 0 overflow, 0 stuck reveals at 1440 and 390. Journeys green
across 1440/390 × motion on/off × both locales, rail click included. Reduced motion fully
static and visible. Lint 0 errors; build and prerender clean.

Weight, whole page, uncached, gzipped: homepage 259 KB (88 img) at 1440/1x; `/work/afono`
484 KB (309 img); `/work/wikimind` 438 KB (264 img).

## Worth knowing

- **Read crop boxes, do not estimate them.** Three rounds were spent recutting crops
  eyeballed off the decile grid — it read consistently ~0.1 short and every one clipped a
  figure's right edge. Measuring the non-white bounding box in a band of the page settled
  each remaining crop in one pass.
- **A scroll step with no pause never lets `IntersectionObserver` fire**, so 34 images
  reported broken that were simply never fetched. The signal to trust is *failed requests*,
  not `img.complete`.
- **Wait for the page, not for a duration**, before running axe: it hit the Suspense
  fallback on `/work/surugami` and reported `landmark-one-main` twice.
- `/work` and `/de/work` return 404 **correctly** — there is no work index route, the
  homepage bento is the work listing, and nothing links to it.

## New

`SUGGESTION-017` — a lone narrow figure is given the full 960px reading column, so AFONO's
social layout system rendered 1700px tall at its true 3/5. Worked around in the crop (four
of five rows, 3/4, 1280px), but it is a weight bug as well as a layout one and the next
portrait figure will hit it again.

## Not done

`ISSUE-006`'s remainder — the About portrait and the `og:image`, both of which need the
owner. The 15 orphaned PNGs. 47 section figures across four case studies.
