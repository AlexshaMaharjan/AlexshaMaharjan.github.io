# Next Session

## Status

Every engineering milestone that needs nobody is finished. `MILESTONE-005` is now **in
progress rather than blocked**: 18 of 136 image slots are filled from the owner's own project
documentations (SESSION-016), and the homepage reads as a wall of work.

Work sits on branch `milestone-003-content-model`, **twenty-five commits ahead of `main` and
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

**Keep filling slots — but build the pipeline first.**

1. **`SUGGESTION-012`, the responsive image pipeline.** This is now the blocking item, not a
   nicety. 118 slots remain; eighteen were hand-sizable and a hundred and eighteen are not.
   Today a file ships at whatever size it is. Note what `MILESTONE-005` says: this likely
   means moving files from `public/images/` to `src/assets/` and updating every `src` string
   — so it gets harder with every image added. Do it now, while eighteen is the number.
2. **The 71 case-study section figures.** The most mechanical work left and the highest
   volume. The manifest names each one (`[ persona 01 ]`, `[ sitemap ]`, `[ ui kit ]`) and the
   documentation usually has exactly that figure. **Work one project end to end**, not one
   figure type across six — 673 MB of PDF is slow to reopen.
3. **`ISSUE-006`, the `og:image`.** One file, and the last thing wrong with every shared
   link. It is **not a crop** — a designed 1200×630 card with the owner's name on it. If the
   owner is not available to approve one, say so and leave it.

Also worth doing, cheap: **resolve the 14 orphaned PNGs** in `public/images/` (811 KB that
would ship). They need the owner's yes, since they may be source material.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/reference/image_sources.md` — the plan, the tools, the two working habits that make
   this fast, and what each document's sources page forbids
3. `docs/decisions/decision_016.md` — what may not ship, and why extraction is manual
4. `docs/reference/image_crops.json` — every crop already cut; copy an entry to start one
5. `docs/reference/image_manifest.md` — every remaining slot, its aspect, export width and
   data path
6. `docs/milestones/milestone_005.md` — including the `SUGGESTION-012` ordering note

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `scripts/image-treat.mjs` — crop, resize, grade, and measure against the contrast ceiling
- `scripts/pdf-page.js` — render a documentation page; handles the 407 MB text-less one
- `scripts/image-manifest.mjs` — rerun with `--write` after filling slots
- `src/components/ui/Image.tsx` — where a responsive pipeline would land; `sizes` is already
  accepted and ignored
- `src/lib/caseStudies/*.ts` → `sections[].images[]` — the 71 remaining figures

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

- **Weight is the headline number** for a pipeline session. Today, uncached: `/` 372 KB
  (203 KB of it imagery), `/de/` 372 KB, `/work/wikimind` 330 KB, `/work/surugami` 292 KB.
  Report before and after.
- **The contrast ceiling is enforced by the tool** — `scripts/image-treat.mjs` exits non-zero.
  Do not bypass it for a tile.
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
5. Create `docs/sessions/session_017.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed, and rerun `node scripts/image-manifest.mjs --write`.
