# SESSION-021 — Sync FM's figures, and the verification harness moves into the repository

Date: 2026-08-26
Branch: `milestone-003-content-model`
Objective (from `next_session.md`): keep filling case-study figures, one project end to end,
starting with Sync FM.

## 1. Sync FM — six figures, and four deliberate gaps

`Enddokumentation.pdf`, 43 pages, is the cleanest of the six documentations and by far the
most image-rich. Eleven slots were empty. **Six are now filled; four stay hatched on purpose;
one was already the hero.**

| Slot | Filled with | Page |
| --- | --- | --- |
| `[ sync dial ]` | the annotated dial, segmented into its six news categories | 32 |
| `[ mood bar ]` | the three sliders in the dark app: news type, location, truth level | 23 |
| `[ opinion filter ]` | the expanded player, truth scale reading 75/100 | 23 |
| `[ logo + visual system ]` | the two **refined** marks — outlined radio, filled robot | 12 |
| `[ components ]` | the navigation cards for general, voice, topic, model | 34 |
| `[ final mobile screens ]` | three screens: dial, dial with filters set, expanded player | 20 |

Three declared aspects were wrong for their artwork and were changed rather than the artwork
being forced into them: `[ logo + visual system ]` 4/3 → **16/8** (the two marks sit side by
side, and 4/3 could not clear the prompt box above them), and `[ components ]` briefly 1/1
before going back to **4/3** — see §4.

## 2. Reading the sources page changed four slots, not one

The document has no page headed *Quellen*. It has **"Tools und KI"** on page 43, which is the
same thing, and `image_sources.md`'s row for it — *"page 38 states three perspective images
were made with AI"* — was true and badly incomplete.

What page 43 actually says:

- *"Mit **ChatGPT** haben wir **Personas** für die App erstellt."*
- *"**Gemini 3 (Nano Banana)** wurde für die **erste Logo-Ideen** verwendet."*
- *"Gemini … um **Perspektivansichten** unserer selbst gestalteten Illustrationen zu generieren."*
- ElevenLabs for audio — no visual consequence.

The personas were the bigger exclusion and were named on a different line from the one the
summary had captured. This is the second consecutive session where re-reading the source page
moved slots that the index row would have left alone; `DECISION-016` Amendment 2 records both
the finding and the general rule.

### The refined-from-generated case

Page 12 is the clearest instance yet of a page that must be **cropped rather than taken or
rejected whole**. Its top half is an uploaded photograph of a vintage radio plus three Gemini
drafts. Its bottom half is the sentence *"Wir haben die KI-generierten Entwürfe eigenständig
angepasst und verfeinert, um einen klaren flachen Vektorstil mit schwarzem Umriss zu
erreichen"* — and the two marks that resulted.

**The refined vectors ship; the drafts and the reference photo do not.** Redrawing something
as your own artwork is authorship, and the document states it plainly.

## 3. Four slots with nothing behind them

Only one of the four hatched slots is a provenance decision. The other three have no figure
in the document at all:

- `[ competitor comparison ]` — page 5 analyses bigGPT, RadioGPT and Spotify's AI DJ **in
  prose**. There is no comparison figure.
- `[ persona 01–03 ]` — pages 9–11 are running text: no card, no portrait, no layout. Even
  setting the ChatGPT authorship aside, **there is nothing to export.**
- `[ ethical-risk diagram ]` — the ethics section is the strongest writing in the case study,
  and the documentation has no diagram behind it.

Section 03 therefore reads as four hatched panels under two paragraphs of text, which is
sparse. It is also true. **A slot is a question the manifest asks, not a promise the
documentation made.**

## 4. What the browser caught that the contact sheet did not

**`[ components ]` at 1/1 took the whole 960px column** and rendered the four cards at roughly
three times their size in the app. This is `SUGGESTION-017` from SESSION-020 arriving exactly
where that note predicted: a lone figure gets the full reading column, so a squarish one is
enormous. Reverting to the declared 4/3 halved the height and settled it. The suggestion is
still the real fix; this is the second workaround in two sessions.

**A stray `en` in two exports** turned out to be the *dial* crop, not the components crop —
its left edge had caught the tail of "Kategorien". The lesson is in §5.

## 5. Tooling — the habits become commands

The hand-off has described this work in prose every session, and every session has rebuilt it
by hand. Three pieces are now in the repository:

- **`scripts/contact-sheet.mjs`** — already in the repository since SESSION-020; `sheet` tiles
  a rendered document into one labelled image, `grid` overlays a decile grid on a page.
- **`scripts/ink-box.mjs`** (new) — measures the bounding box of non-white pixels within a band and
  prints the `crop` for each candidate aspect, computed from that box's own centre. SESSION-020
  lost three rounds to coordinates read off the grid by eye; this settled every Sync FM crop
  in one pass.
- **`scripts/verify/`** — `serve.mjs` (gzip, GitHub Pages resolution order) and `run.mjs`
  (`routes`, `images`, `a11y`, `weight`), wired to `npm run verify`.

**Narrow the band until the number stops moving.** `ink-box` measures whatever is inside the
band it is given, so a band reaching into the purple page header, or a column limit clipping
body text mid-word, silently widens the box — both happened here, and both surfaced as that
stray `en`. Sweeping the limit (`0.57`, `0.59`, `0.61`) until the answer stabilises takes
seconds.

### Everything that looked like a bug was concurrency

Most of the time this session went into verification, and nearly all of it into results that
looked like defects and were not:

- An image count that moved between runs (168, then 146) — **two rebuilds landed on top of
  running sweeps** and emptied `dist/` underneath them.
- Route counts that looked wildly unstable, `/work/sync-fm` reporting **0 images** it plainly
  has — an ad-hoc counting script driving **the same Chrome as a running a11y sweep**.
- Four sweeps that exited 13 with **no output whatsoever** — two pairs run concurrently. Not
  the shared-browser hazard: they were on separate Chromes. `serve.mjs` is a single-threaded
  Node server doing synchronous `gzipSync` per request, so two sweeps starve each other until
  the CDP awaits stop settling. Because the summary only prints at the end, a starved run
  produces nothing at all.

Run alone, every number is stable and identical between passes: 146 images across 36 routes
at 1x, 2x and 3x. `/` 12, `/work/afono` 15, `/work/wikimind` 15, `/work/sync-fm` 9, the three
unfilled case studies 3 each, Playground and `/resume` 0.

Two changes came out of it. `settle()` now waits for the image count to stop moving rather
than for a fixed delay, so coverage depends on the page rather than on how loaded the machine
is. And `VERBOSE=1` prints each route as it goes — without it, a run that stops halfway is
indistinguishable from one that never started, which is what made this take as long as it did.

**The harness is only as trustworthy as the discipline of running one thing at a time.**

### A guard that was wrong, and one that is right

The first attempt at catching an under-covering pass asserted that **no route renders zero
images**, on the assumption that every page carries at least a header mark. It does not:
Playground's slots are all still unfilled placeholders and `/resume` is text, so the guard
fired on eighteen legitimate routes.

What actually holds is weaker and more useful: **the same route contains the same number of
`<img>` elements at every device pixel ratio** — only the chosen `srcset` candidate changes.
A count that moves between passes was measured before the page settled. That is now the
check, and it is the one that would have caught SESSION-021's unstable counts by itself
instead of leaving them to be noticed by eye.

The sweep also died partway through its second pass with an unsettled top-level await — one
CDP connection is not reliable across 108 page loads with scrolling. Each ratio now runs as
its own process (`--dpr 1`), which is both more robust and easier to re-run.

### A gap in the harness, found by writing it down

`run.mjs`'s header claimed it read failed image requests, because that is what the hand-off
says to trust. The first version **did not** — it declared the listener and never subscribed,
since `lib/cdp.mjs` had no way to subscribe to CDP events at all. `connect()` now returns an
`on(method, fn)`, and the image check listens on `Network.loadingFailed` and on 4xx responses.

Worth stating plainly: for about an hour the harness would have reported "0 failed image
requests" without ever having looked. A check that cannot fail is worse than no check.

## 6. Verified

Against the production build, through the gzipping Pages-like server.

- **36/36 routes** — 200, titled, `hreflang`, driven from the generated `sitemap.xml`.
  `/work` and `/de/work` correctly 404.
- **Images at dpr 1, 2 and 3** — 146 images across 36 routes on every pass: 0 broken,
  0 missing `alt`, 0 `"Placeholder:"`, 0 failed image requests, and **per-route counts
  byte-identical between the three passes**.
- axe 0 violations; 0 horizontal overflow; 0 stuck reveals at 1440 and 390.
- Reduced motion: every revealed element visible and untransformed.
- `en`/`de` image sources identical.
- Lint 0 errors (3 pre-existing warnings); build and prerender clean.

Weight, whole page, uncached, gzipped: homepage 255 KB (85 img) at 1440/1x and 354 KB
(184 img) at 390/3x; `/work/sync-fm` 296 KB (124 img) and 406 KB (233 img).

## 7. Counts

**136 slots, 48 filled** (was 42). Three case studies are now complete end to end —
WikiMind, AFONO, Sync FM. Three remain: the barrier-free kitchen (10), QIS Portal (11),
Surugami (10).

## 8. Recorded

- `DECISION-016` Amendment 2 — the Tools und KI page, the refined-from-generated case, and
  the "no figure exists" case.
- `ISSUE-031` — the case study says **Gemini** generated the personas; the documentation says
  **ChatGPT** did. One word in each locale, left for the owner under `MILESTONE-004`.

## 9. Not done

The `og:image` and the About portrait (`ISSUE-006`), both needing the owner. The 15 orphaned
PNGs. `SUGGESTION-017`, worked around twice now. Three case studies of figures.
