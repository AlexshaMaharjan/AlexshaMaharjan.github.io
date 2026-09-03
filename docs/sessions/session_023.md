# SESSION-023 — Figures move to the prose, and a figure can be opened

Date: 2026-09-04
Branch: `milestone-003-content-model`
Asked for: real images across all the case studies; rearrange the placement and layout of the
images; fix the mobile version of the case-study page; edit the playground; update the docs.

## Two of the five were blocked, and the owner decided how

The owner supplies their own exports (`Images/wikimind/`), and SESSION-022 established those
beat PDF page renders on every axis. Asked whether the other five case studies would get the
same treatment, the answer was **yes — folders are coming**. The playground answer was the
same: **fill it with images they will supply.**

So neither image task could start, and cutting the remaining 31 slots out of the PDFs would
have produced work that is thrown away the moment those folders land. What was done instead is
everything those folders will benefit from: **the layout and the mobile behaviour that every
future figure inherits.**

One image did arrive. `Images/wikimind/Wireframe.png` appeared since the last session — a board
of eight page wireframes — so `[ wireframes ]` is filled. **WikiMind is 18 slots with 1 empty**,
and the one left is `[ competitor analysis ]`, which has no figure in the documentation at all.

## The mobile defect, stated properly

A figure renders at the reading column: 960px on desktop, `calc(100vw - 40px)` — **350px** — on
a 390px phone. That is fine for a picture and wrong for an artefact, and most of WikiMind's
figures are artefacts. A persona card carries a name, a pull quote, six labelled fields and four
bulleted lists. At 350px the type inside it is roughly 3px.

**The figure was on the page and none of it could be read.** On the largest share of traffic a
portfolio gets, the work was not actually visible. That is the mobile bug; horizontal overflow
was already zero and the harness had been reporting so for sessions.

The column cannot widen — `DECISION-017` settled it. So the figure opens instead: `DECISION-018`,
`ui/Lightbox`, ~140 lines and no dependency. Fitted on open, tap toggles natural size inside a
pannable scroller, Escape closes, focus starts on Close and returns to the figure. Placeholders
stay unclickable, because there is nothing to enlarge.

Two things it got wrong first, both found by looking rather than by the harness:

- **`z-[100]` put it under the header's `z-[200]`.** The site wordmark and Menu painted straight
  through and covered the dialog's own Close button. Now `z-[210]`.
- **A 95% backdrop still ghosted the header** onto the dialog's caption. The backdrop is opaque.

axe stayed at 0 violations across all 36 routes with every figure now a button.

## Rearranging the placement

Two changes, and they compound.

**`SUGGESTION-017`, implemented.** A run of one narrow figure used to fill the whole column
because `columnsFor(1)` returns no grid classes. It now gets `min(960, 800 × aspect)`, centred,
with a `sizes` string that follows the cap. `[ initial sketches ]` goes from 960×1444 to 532×800
and drops a variant rung; near-square figures are untouched, exactly as the suggestion predicted.
This was worth doing **before** the other case studies, not after: two crops in SESSION-020 and
SESSION-021 were chosen to work around the old behaviour rather than to suit the artwork, and the
kitchen and QIS both have portrait figures still to import.

**A new block kind, `figures`.** `sections[].images[]` renders after everything else in a
section, which is right for a gallery of outcomes and wrong when each figure illustrates a
particular passage. WikiMind's section 05 had four sub-headings and six figures stacked below all
of them. `{ kind: "figures", items: [...] }` sits inside `body` and hands its array to the same
`SectionMedia`, so grouping, the lone-figure ceiling and `sizes` all behave identically — only
the position changes. All 17 of WikiMind's figures moved into eleven groups placed at the prose
they illustrate.

`sections[].images[]` still works and every other case study still uses it.

## The bug that change introduced, and the check that did not catch it

`image-manifest.mjs` walked `section.images` only. The moment WikiMind's figures moved inline it
reported **"Case study — WikiMind — 1 slot, all filled"** — and, worse, its `en`/`de` diff
silently stopped covering 16 of them. That diff is the check that caught Sync FM's German hero
in SESSION-020.

The manifest now walks body blocks too, via one `sectionImages()` helper used by both the count
and the locale diff. It reports 18 slots again and exits 0.

**This is the second time a content-model change has quietly narrowed a check** rather than
breaking it. Both times the symptom was a number that looked plausible.

## Weight — `ISSUE-033`

`/work/wikimind` is now the heaviest page on the site: **706 KB at 1440/1x, 995 KB at 390/3x.**
Seventeen figures, three of them full-column photographic persona cards, and two figures that
became lone runs when they moved inline and so fetch a 960 variant where they used to fetch 640.

Nothing here is a defect and the remaining levers all trade something real — dropping `wide: true`
from the personas (~120 KB, they become thumbnails), or lowering the variant ladder's quality
site-wide. `DECISION-018` weakens the case for `wide: true`, since any figure can now be opened.
Written up rather than silently taken, because the entire point of the last two sessions was to
stop the layout deciding what the images look like.

## Verified against the production build

Server: `scripts/verify/serve.mjs`, started first this time.

- routes 36/36, four negative paths correctly 404
- **154 images across 36 routes at dpr 1, 2 and 3** — 0 broken, 0 missing `alt`, 0 `"Placeholder:"`,
  0 failed image requests, per-route counts identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `image-manifest.mjs` exits 0 across the new inline structure
- The lightbox driven through CDP: opens, focus lands on Close, `body` scroll locks, Escape
  closes, scroll lock releases, focus returns to the figure
- `currentSrc` read off the built page to confirm the capped figures fetch the right rung —
  the `sizes` warning in `SUGGESTION-017` was the one thing most likely to be got wrong

## Still open

- **The five image folders.** Nothing else can proceed on figures until they land.
- `ISSUE-033` — the weight, and which lever to pull
- `ISSUE-032` — WikiMind's personas and moodboard
- `ISSUE-006` — the `og:image` and the About portrait
- `[ competitor analysis ]` — no figure exists for it
- Nothing pushed. 40 commits ahead of `main` before this one.
