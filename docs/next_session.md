# Next Session

## Status

`MILESTONE-005` is **in progress and moving**: 42 of 136 image slots filled, up from 7 before
SESSION-016. Two case studies — WikiMind and AFONO — are complete end to end, at roughly one
session each. Every engineering milestone that needs nobody is finished.

Work sits on branch `milestone-003-content-model`, **thirty-eight commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

The site is publishable; the pre-flight is in `docs/reference/publishing.md`. Two commands,
both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

**This would be the first publish showing real imagery on two full case studies.** Worth
saying to the owner plainly.

## Objective

**Keep filling case-study figures. Four projects, 47 slots, one project end to end.**

Suggested order — smallest document first, and the one whose sources page is cleanest:

1. **Sync FM** — `Enddokumentation.pdf`, 43 pages, 11 slots. No sources page, but **page 38
   states three perspective images were made with AI**; find them before exporting.
2. **The barrier-free kitchen** — `Dokumentation_Kueche_…pdf`, 26 pages, 10 slots. Three
   Sketchfab models (the wheelchair figure, a jar, a decor pack); the scene and the kitchen
   are the team's.
3. **QIS Portal** — `Usability_SoSe24_…pdf`, 85 pages, 11 slots. flaticon icons, Freepik
   illustrations, a Google-sourced login background, and its "Originale" screenshots are the
   university's live portal, not the team's design.
4. **Surugami** — `FInalDesmeth.pdf`, 100 pages, 10 slots. **The hardest**: 407 MB, no text
   layer at all, and its sources page puts moodboards (7–9) and personas (12–13) out of reach
   — Freepik by URL and *"P4, P5, P6, P7, P8: All references were taken from Pinterest"*.

Then, if there is room:

5. **`ISSUE-006`'s remainder.** The `og:image` — one designed 1200×630 card, still the last
   thing wrong with every shared link, and **not a crop**. And the About portrait. Both need
   the owner; if they are not available, say so and leave them.
6. **The 15 orphaned PNGs** — 817 KB that ships and that nothing references. Owner's yes.

## The method, which is now proven twice

```bash
osascript -l JavaScript scripts/pdf-page.js "<pdf>" "1-43" /tmp/syncfm 0.5
node scripts/contact-sheet.mjs sheet /tmp/syncfm /tmp/sheet.png --cols 8 --cell 300
# pick candidates, re-render those at scale 6, then:
node scripts/contact-sheet.mjs grid /tmp/syncfm/p019.png /tmp/grid.png --width 1100
node scripts/image-treat.mjs <spec.json>      # a job may name the PDF + page + renderScale
npm run images                                 # after ANY image change
```

**Read the crop box, do not estimate it.** SESSION-020 lost three rounds to coordinates
eyeballed off the decile grid — it reads short, and every crop clipped a figure's right edge.
Measure the bounding box of non-white pixels in a band of the page instead; it settles a crop
in one pass. The grid is for choosing *what* to crop, a measurement for deciding *where*.

Give a **centre, a width fraction and a target aspect**, and compute the rect —
`h = w × (pageW/pageH) × (aspectH/aspectW)`. `image-treat` stretches whatever rect it is
given to the output size, so a mismatched one distorts silently.

**Change the declared aspect when the artwork disagrees with it.** The manifest's aspect was
assumed before anyone saw the figure. Five slots have been changed across two sessions and
each was the honest call; forcing the figure would have cut it in half.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`DECISION-016`: only the owner's own work ships.** Read the document's **sources page
  itself**, every time — `image_sources.md`'s table is an index, and re-reading AFONO's found
  three borrowed mockup templates the row had compressed away (Amendment 1).
- **Nothing from `ProjectsDokus/` is committed.** Only finished exports land in the repo.
- **Nothing internal may land under `public/`** — it ships. Two sessions have caught something.
- Every `src` goes in **both** the `en` and the `de` object. This is now **checked**:
  `node scripts/image-manifest.mjs` diffs them and exits non-zero. Run it.
- Export **WebP**, then `npm run images`. Render the source page wide enough for the output
  width — upscaling is the one thing the pipeline will not catch.
- **Do not publish anything.** Merging to `main` and `npm run deploy` are the owner's calls.
- Do not rewrite prose (`MILESTONE-004`).
- No new runtime dependency; `axe-core` is still the only devDependency the project has had.

## Verification

Against the **production build**, in a real browser, through a server that behaves like
GitHub Pages — real file, then directory index, then `404.html` with a real 404 — **and that
gzips**, or the JS bundle doubles every total and drowns the number being measured.

Leave passing:

- **36/36 routes** — 200, titled, `hreflang`. Drive the list from the generated `sitemap.xml`,
  never a hand-written one. `/work` and `/de/work` are **correctly 404**: there is no work
  index route.
- **Every image on every route at 1x, 2x and 3x** — none broken, none missing `alt`, none
  still saying "Placeholder:", **and zero failed image requests**. The last is the signal to
  trust; `img.complete` cannot distinguish a lazy image mid-load from a broken one.
- axe 0 violations, 0 overflow, 0 stuck reveals, at 1440 and 390.
- Journeys at 1440/390 × motion on/off × both locales, rail click included.
- Reduced motion: completely static, fully visible.
- `node scripts/image-variants.mjs --check`, `node scripts/image-manifest.mjs --write`.
- `npm run lint && npm run build && npm run prerender`.

Traps this project has already paid for — all of them cost a debugging round:

- **A scroll step with no pause never lets `IntersectionObserver` fire.** Lazy images then
  report broken when they were simply never fetched. ~120ms per stop.
- **Wait for the page, not for a duration**, before running axe — it hits the Suspense
  fallback on case-study routes and reports `landmark-one-main` and `page-has-heading-one`.
- **Assert an anchor against the element's own `scroll-margin-top`**, not a fixed number.
  The header is 73px at 1440 and 146px at 390.
- **`file://` images taint a canvas**; pass bytes as a `data:` URI. But a `data:` **page**
  cannot load `file://` images — write the HTML to disk and navigate to it.
- **`Page.captureScreenshot`'s `clip` is in page coordinates**; add `scrollX`/`scrollY` and
  pass `captureBeyondViewport`.
- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.**
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs.

## Owner decisions outstanding

1. **May AFONO's AI-generated product imagery be shown?** Its sources page calls it a
   placeholder for later real photography, and the case study already discloses it twice. It
   unblocks `[ product page ]` and offers better options for two more slots.
2. **The `og:image`** — approve a designed 1200×630 card.
3. **A photograph for the About portrait**, still a 14 KB colour stand-in.
4. **Delete the 15 orphaned PNGs?** 817 KB, shipping, referenced by nothing.
5. **Does Hibi become a seventh case study?** Two documentations, no page.

## Completion Criteria

- At least one more case study's figures filled end to end, or an explicit reason why not.
- Every image shipped is the owner's own (`DECISION-016`), checked against the sources page.
- Every remaining placeholder is a recorded, deliberate choice.
- `en` and `de` image sources identical (`image-manifest.mjs` exits 0).
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_021.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed, and rerun `node scripts/image-manifest.mjs --write`.
