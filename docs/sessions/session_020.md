# SESSION-020 — AFONO's figures, and reading a sources page properly

Date: 2026-08-25
Milestone: MILESTONE-005
Status: Complete
Commits: `7678de7` (figures + tooling), plus this record

---

## Objective

From the hand-off: keep filling case-study figures, one project end to end, using the method
SESSION-019 proved. Then `og:image`, then the orphaned PNGs.

AFONO — 14 empty slots, from the 52-page `DesignProjekt_Dokumentation_Maharjan.pdf`.

## 1. The sources page said more than the summary did

`image_sources.md` had AFONO down as one line: pages 25–27 are AI-generated fashion mockups.
Re-reading the actual page before exporting — which `DECISION-016` requires and which took a
minute — found four more entries the row had compressed away:

- **KI-generierte Mockups (ChatGPT)** covers *"Mode- und Produkt­mockups"*. Not only the model
  shots: **every product visual in the prototype** is a placeholder for later real photography.
- **Screen Mockup** — a `graphicgata.com` 3D iMac template. The "Screen Mockup" figure is a
  downloaded asset.
- **T-shirt Mockup** and **T-shirt Oversized Vorne und Hinten** — a pixelbuddha PSD and a
  Behance PSD. **The blank garment renders on pages 20 and 21 are someone else's asset**, with
  the owner's print applied to them.
- **Visuelle Referenzen** — Zara, Mango, H&M, Noah NYC, Awake NY: the market-analysis
  page's photography.

This changed the plan for four slots before a single crop was cut. Recorded as
`DECISION-016` Amendment 1, with the general lesson: **the row in `image_sources.md` is an
index, not a substitute for the page.**

### What it meant for the tees

A mockup PSD is licensed for exactly this use and the design on it is the owner's, so it sits
in an awkward middle. Rather than settle that question site-wide, the slots were filled with
**the print artwork itself** — the vertical AFONO wordmark for `[ tee — front ]`, a Himal
Series mountain print for `[ tee — back print ]`.

That is the stricter reading and it is also the better figure. The copy says "a small front
mark keeps the garments easy to wear; larger back prints carry the main visual narrative",
and the artwork shows precisely that, legibly, instead of a 200px graphic on a stock tee.

## 2. Twelve of fourteen slots

| Slot | Source | Note |
| --- | --- | --- |
| interview findings | personas, p5 | pure diagram, no stock portraits |
| logo sketches | p9 | |
| logo system + colours | p11 | palette, hex values, applications |
| tee — front | p17 | the print artwork, not a mockup |
| tee — back print | p16 | |
| print development | p15 | aspect 3/4 → **5/6** |
| size finder | p37 | aspect 4/3 → **7/4**; two modal steps |
| cart | p35 | |
| checkout | p36 | |
| final brand system | p12 | |
| social media | p43 | aspect 16/10 → **3/4** |
| e-commerce prototype | p38 | account screens — the only prototype pages free of AI imagery |

**Two stay hatched, which `DECISION-006` makes a designed state rather than a gap:**

- **`[ market analysis ]`** — the figure is competitors' product and shop photography, named
  on the sources page. Nothing in the document substitutes for it.
- **`[ product page ]`** — every product screen in the prototype is carried by the
  AI-generated model imagery. **Whether that may be shown is the owner's open decision**, so
  the slot waits on it rather than being filled or quietly dropped. The case study already
  discloses the AI use twice, in the summary and in the reflection, which is why this is a
  judgement call and not a licensing one.

136 slots, **42 filled**, up from 30.

## 3. Three aspects changed rather than three figures cut

The manifest's aspect for a slot is an assumption made before anyone had seen the figure.
Where the real artwork disagreed, the aspect moved — the same call SESSION-019 made twice.

The one that mattered was `[ social media ]`. The AFONO layout system is genuinely 3/5
portrait, and **a lone narrow figure is given the full 960px reading column**, so it rendered
1700px tall next to figures of 700. Four of its five rows at 3/4 say the same thing in 1280.

That is a workaround in the content for a layout gap, so the gap is now written down as
`SUGGESTION-017`: `columnsFor(1)` has no case for a narrow figure alone in its run, and it is
a weight bug as well as a layout one — `sizes` claims 960px for something that should be
displayed at 600.

## 4. Tooling

**`scripts/contact-sheet.mjs`** (new). The two habits `image_sources.md` has recommended since
SESSION-016 were still being done by hand every time. Now: `sheet` tiles a rendered document
into one labelled image; `grid` overlays a decile grid on a page. No dependency — same Chrome.

**`scripts/image-treat.mjs`** renders a PDF page on demand when a job names a document plus a
`page` and `renderScale`. `image_crops.json` records the *source document*, not an
intermediate PNG that was never committed, so the file the docs called runnable now is. The
twelve AFONO crops are recorded in it; WikiMind's twelve were not, and are lost to `git show`.

**Read crop boxes, do not estimate them.** Three rounds of recutting were spent on crops whose
coordinates were eyeballed off the decile grid, and every one clipped a figure's right edge —
the grid consistently read ~0.1 short. Measuring the bounding box of non-white pixels in a
band of the page settled each remaining crop in one pass. The grid is for choosing *what* to
crop; a measurement is for deciding *where*.

## 5. Verification

Against the production build, through a server that behaves like GitHub Pages — real file,
then directory index, then `404.html` with a real 404 — **and gzipping**, without which the JS
bundle doubles every total and drowns the number being measured.

- **Routes: 36/36** — 200, titled, `hreflang` present. Driven from the generated
  `sitemap.xml` rather than a hand-written list, so it cannot drift.
- `/work`, `/de/work`, `/work/nonsense`, `/totally/made/up` → **404**, correctly: there is no
  work index route, the homepage bento is the work listing, and nothing links to `/work`.
- **134 images across 36 routes at 1x, 2x and 3x — 0 broken, 0 missing `alt`, 0 still saying
  "Placeholder:", 0 failed image requests.**
- **axe: 0 violations. Overflow: 0 pages. Reveal ring: 0 stuck**, at 1440 and 390.
- **Journeys all green** — 1440/390 × motion on/off × both locales, including a rail click.
- Reduced motion: every revealed element visible and untransformed.
- Variant map up to date, 42 images. `npm run lint` 0 errors, `build` and `prerender` clean.

**Weight**, whole page, uncached, gzipped:

| | 1440/1x | 1440/2x | 390/1x | 390/3x |
| --- | --- | --- | --- | --- |
| homepage | 259 KB (88 img) | 366 (195) | 227 (56) | 358 (187) |
| `/work/afono` | 484 KB (309 img) | 608 (433) | 317 (143) | 548 (373) |
| `/work/wikimind` | 438 KB (264 img) | 735 (561) | 317 (142) | 595 (420) |

AFONO's thirteen figures come to 624 KB on disk including every variant.

### Two traps paid for again

- **A scroll step with no pause never lets `IntersectionObserver` fire.** The first image
  sweep reported 34 broken images that were simply never fetched. 120ms per stop fixed it —
  and the deciding evidence was that *zero* image requests had failed, which is the signal to
  trust. `i.complete` is not: a lazy image read mid-load is indistinguishable from a broken one.
- **An anchor assertion has to compare against the element's own `scroll-margin-top`**, not a
  fixed number. At 390px the header is 146px and the target correctly lands at 177; a
  desktop-shaped threshold called that a failure four times.

## 6. What the verification found that the figures did not

Two defects surfaced while checking the work, neither of them caused by it.

**Sync FM's German hero was still the 6.9 KB colour stand-in.** SESSION-016 filled the
English `heroImage` and missed the German one, and it survived four sessions because the file
loads, carries proper alt text and is the right aspect — every browser-side check passes. The
manifest generator only ever read `en`, so it reported the slot filled.

`scripts/image-manifest.mjs` now diffs the `en` and `de` image sources across every case study
and dictionary slot and exits non-zero when they disagree. Proved by putting the defect back
and watching it fail with the two paths printed. This is the constraint the hand-off has
repeated every session — *every `src` goes in both objects* — and it is now checked rather
than remembered.

**`image-variants.mjs` never reaped its own output.** Re-pointing that one `src` left four
generated WebP variants of the stand-in in `public/images/`, referenced by nothing and
shipping. The script now deletes variants whose source is no longer referenced. It only
removes files matching its own naming convention — the hand-made originals are the owner's
and are still left alone.

The orphan count is now **15 files, 817 KB**, up from 14: the Sync FM stand-in joined the pile.

## Not done

- **`ISSUE-006`, the `og:image`.** Still the last thing wrong with every shared link, and
  still not a crop — a designed 1200×630 card with the owner's name on it. Making one out of
  a documentation page would be inventing a brand asset, so it was left.
- **The 14 orphaned PNGs** — 811 KB that ships and that nothing references. Needs the owner's
  yes to delete.
- Sync FM, Surugami, the barrier-free kitchen, QIS Portal — **47 section figures**.

## Owner decisions now outstanding

1. **May AFONO's AI-generated product imagery be shown?** It unblocks `[ product page ]` and
   would make a much stronger `[ social media ]` and `[ e-commerce prototype ]` available.
2. Does **Hibi** become a seventh case study? Two documentations exist for a project with no page.
3. Delete the 14 orphaned PNGs?
4. Approve an `og:image`.
