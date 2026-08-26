# Previous Session

**SESSION-021** — 2026-08-26. Full record: `docs/sessions/session_021.md`.

## What it did

**Sync FM's figures, one project end to end.** Six of its eleven empty slots filled from
`Enddokumentation.pdf`; four left hatched on purpose. **136 slots, 48 filled**, up from 42.
Three case studies are now complete: WikiMind, AFONO, Sync FM.

**Reading the sources page moved four slots, not one.** The document has no page headed
*Quellen* — it has **"Tools und KI"** on page 43, which is the same thing. It says ChatGPT
wrote the **personas**, Gemini generated the **first logo drafts** and the **3D perspective
views** of the team's own flat illustrations. `image_sources.md`'s row named only the
perspective images. That is the second consecutive session where the document said more than
the index row summarising it — `DECISION-016` Amendment 2.

**The refined-from-generated case.** Page 12 is the clearest example yet of a page that must
be cropped rather than taken or rejected whole: its top half is a reference photograph plus
three Gemini drafts, its bottom half is *"Wir haben die KI-generierten Entwürfe eigenständig
angepasst und verfeinert"* and the two marks that resulted. **The refined vectors ship; the
drafts and the photo do not.**

**Four slots stay hatched, and only one for a provenance reason.** `[ competitor comparison ]`
is prose on page 5 with no figure; `[ persona 01–03 ]` are running text on pages 9–11 with no
card, portrait or layout to export; `[ ethical-risk diagram ]` has nothing behind it. Section
03 therefore reads as four hatched panels, which is sparse and true. **A slot is a question
the manifest asks, not a promise the documentation made.**

## The harness moved into the repository

Every hand-off has described the checks in prose, and every session has rebuilt them by hand
in a scratch directory that does not survive. This session's scratchpad was empty again, so
they are now in the repo:

- **`npm run verify`** — `scripts/verify/run.mjs` (`routes`, `images`, `a11y`, `weight`) and
  `scripts/verify/serve.mjs`, which gzips and implements GitHub Pages' resolution order.
- **`scripts/ink-box.mjs`** — measures the bounding box of non-white pixels in a band and
  prints the `crop` for each candidate aspect. SESSION-020 lost three rounds to coordinates
  read off the decile grid by eye; this settled every Sync FM crop in one pass.
- **`scripts/contact-sheet.mjs`** was already in from SESSION-020 and did the picking.
- `docs/reference/verification.md` — what each check knows that a person would forget.

### Two things worth knowing about that harness

**Its first version could not fail.** `run.mjs`'s header claimed it read failed image
requests — the signal the hand-off says to trust — and it did not: the listener was declared
and never subscribed, because `lib/cdp.mjs` had no way to subscribe to CDP events at all.
`connect()` now returns `on(method, fn)`. Proved by adding a variant to the map that did not
exist on disk: the page rendered perfectly and the check caught
`HTTP 404 — /images/sync-fm-dial-640.webp`.

**Every confusing result it produced was self-inflicted.** Two rebuilds landed on top of
running sweeps and wiped `dist/` under them; an ad-hoc counting script drove the same Chrome
as a running sweep and made route counts look wildly unstable (`/work/sync-fm` reporting 0
images it plainly has). Both hazards were already written into the harness's own header.
Run one thing at a time.

## Verified

Against the production build, through the gzipping Pages-like server.

- **36/36 routes** — 200, titled, `hreflang`, driven from the generated `sitemap.xml`.
  `/work` and `/de/work` correctly 404.
- **Images at dpr 1, 2 and 3** — 146 images across 36 routes on every pass: 0 broken,
  0 missing `alt`, 0 `"Placeholder:"`, 0 failed image requests, and per-route counts
  identical between passes.
- axe 0 violations; 0 horizontal overflow; 0 stuck reveals at 1440 and 390.
- Reduced motion: every revealed element visible and untransformed.
- `en`/`de` image sources identical; variant map current.
- Lint 0 errors (3 pre-existing warnings); build and prerender clean.

Weight, gzipped: homepage 255 KB (85 img) at 1440/1x, 354 KB (184 img) at 390/3x;
`/work/sync-fm` 296 KB (124 img) and 406 KB (233 img).

## Recorded

- `DECISION-016` Amendment 2 — Tools und KI, the refined-from-generated case, and the
  "no figure exists" case.
- `ISSUE-031` — the case study credits **Gemini** with the personas; the documentation says
  **ChatGPT**. One word per locale, left for the owner under `MILESTONE-004`.
- `SUGGESTION-017` — hit and worked around a second time. `[ components ]` at 1/1 rendered
  960×960, three times its size in the app. The crop is now being chosen by what the layout
  will do with it rather than by what the figure is, which is backwards.

## Not done

`ISSUE-006`'s remainder — the About portrait and the `og:image`, both needing the owner.
The 15 orphaned PNGs. 41 section figures across the barrier-free kitchen, QIS Portal and
Surugami.
