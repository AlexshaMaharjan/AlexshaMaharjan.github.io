# Next Session

## Status

Every engineering milestone that needs nobody is finished. `MILESTONE-005` is now **in
progress rather than blocked**: 30 of 136 image slots are filled from the owner's own project
documentations, the homepage reads as a wall of work, and the responsive image pipeline is
in (SESSION-019) — so the remaining 106 can be imported without making the site heavy.

Work sits on branch `milestone-003-content-model`, **thirty-six commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

The site is publishable and the pre-flight is written up in `docs/reference/publishing.md`.
Two commands, both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

**This is the first time publishing would show real imagery.** It is worth saying to the
owner plainly.

## Objective

**Keep filling case-study figures — the pipeline is done and the method is proven.**

1. **The remaining five case studies' figures** — 106 slots. AFONO, Sync FM, Surugami, the
   barrier-free kitchen, QIS Portal. **Work one project end to end.** SESSION-019 did
   WikiMind in one pass and the method is written down in `image_sources.md`: contact-sheet
   the document, grid-overlay the finalists, crop, review, recut. Expect two or three rounds.
2. **`ISSUE-006`, the `og:image`.** One file, the last thing wrong with every shared link,
   and **not a crop** — a designed 1200×630 card with the owner's name on it. If the owner
   is not available to approve one, say so and leave it.
3. **The 14 orphaned PNGs** — 811 KB that ships and that nothing references. They get no
   variants, but they still deploy. Needs the owner's yes.

After every image change, run `npm run images`. `predeploy` refuses to build on a stale
variant map, because a missing variant is a 404 inside a `srcset` and a browser hides it.

**Two slots per project will not have a source.** WikiMind's competitor analysis and
wireframes do not exist in its documentation, and its moodboard is stock. Leaving a hatched
placeholder is a designed state (`DECISION-006`) — say which ones and why, do not invent.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`DECISION-016`: only the owner's own work ships**, and its table in `image_sources.md` is
  not optional reading — every one of the six documentations cites borrowed material inside
  itself.
- **Nothing from `ProjectsDokus/` is committed.** Only finished exports land in the repo.
- **Nothing internal may land under `public/`** — it ships. Two separate sessions have now
  caught something that should not have been there.
- Every `src` goes in **both** the `en` and the `de` object. Same file, translated `alt`.
- Export **WebP**. Give a centre, a width fraction and a target aspect — never a raw crop
  rect — so a crop cannot distort.
- **Do not publish anything.** Merging to `main` and `npm run deploy` are the owner's calls.
- Do not rewrite prose (`MILESTONE-004`).
- No new runtime dependency. If the pipeline needs a build-time one, say so explicitly and
  justify it — `axe-core` has been the only dev dependency for the whole project.

## Verification

Against the **production build**, in a real browser.

- **Weight, uncached, today:** homepage 254 KB (85 KB imagery) at 1440px/1x and 221 KB
  (52 KB) at 390px/1x; `/work/wikimind` 432 KB (259 KB) with fifteen images. **Measure at 2x
  and 3x too** — a 1x-only measurement hid a real bug in SESSION-019.
- **The contrast ceiling is enforced by the tool** — `scripts/image-treat.mjs` exits non-zero.
  Do not bypass it for a tile.
- **No failed image request at 1x, 2x and 3x.** A `srcset` candidate that 404s is invisible
  in a browser; it has to be read off the network.
- **Sweep every image on every route**: none broken, none missing `alt`, none whose alt still
  says "Placeholder:". SESSION-016's run was 86 images across 24 route/locale pairs, clean.
- No layout shift: an image whose real ratio differs from the slot's `aspect` is centre-cropped
  by `object-cover`.
- Rerun `node scripts/image-manifest.mjs --write`.

Five traps this project has already paid for:

- **Lazy images do not load off-screen.** A screenshot of a section you did not scroll to is
  a screenshot of the scrim. Cost a full debugging round in SESSION-016.
- **`Page.captureScreenshot`'s `clip` is in page coordinates**, not viewport coordinates — add
  `scrollX`/`scrollY`, and pass `captureBeyondViewport`.
- **`file://` images taint a canvas**, breaking `getImageData` and `toDataURL`. Pass the bytes
  in as a `data:` URI instead.
- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** Two false alarms
  already, and the reason `ISSUE-027` took three attempts.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys
(1440/390 × motion on/off), reduced motion, the overflow sweep, the no-JavaScript metadata
fetch, and `hreflang` on both locales.

## Completion Criteria

- The pipeline is built and the weight numbers moved, **or** it is explicitly deferred again
  with a reason and the current slot count.
- Every image shipped is the owner's own work (`DECISION-016`).
- No image on any route is broken, missing `alt`, or still labelled "Placeholder:".
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_020.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed, and rerun `node scripts/image-manifest.mjs --write`.
