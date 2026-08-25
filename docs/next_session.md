# Next Session

## Status

Every engineering milestone that needs nobody is finished (`MILESTONE-001`, `003`, `006`,
`007`, `008`). SESSION-015 then established that the milestone everyone treated as blocked —
`MILESTONE-005`, real imagery — was never blocked on missing material. The images exist in
the owner's six project documentations. What is left is doing the work.

Work sits on branch `milestone-003-content-model`, **twenty-three commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

The site is publishable: the pre-flight is done and written up in
`docs/reference/publishing.md`. Two commands, both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

## Objective

**Fill the first images.** The plan exists (`docs/reference/image_sources.md`); this session
executes the top of it. Do not re-derive the plan — read it and work.

1. **The eleven bento tiles.** The homepage is where a visitor decides whether to stay, and
   it is eleven grey rectangles. Sources are mapped per tile. These are *covers*, not
   evidence: crop, darken to the ceiling, desaturate slightly, tint with that project's own
   colour. Eleven tiles from six palettes have to read as one wall.
2. **The six case-study heroes.** 2560px, 16/7.5. Their alt text currently says
   "Placeholder:" out loud.
3. **`ISSUE-006` — a real `og:image`.** One file. Every link anyone shares is a blank
   rectangle until it exists, and it is the thing people see before they click.

**Before importing in bulk, build `SUGGESTION-012`** — the responsive image pipeline. This is
an ordering dependency, not a nicety: there is no pipeline today, files ship at whatever size
they are, and 129 full-size PNGs would be the largest performance regression this project
could give itself. Twenty tiles and heroes is small enough to hand-size; the other 109 are
not. Decide which side of that line this session is on and say so.

If the owner is present, the two questions worth their time are **which figure represents
each section** and **whether Hibi becomes a seventh case study** — it has two full
documentations and no page.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/reference/image_sources.md` — the plan. Document-to-project mapping, the render
   command, the provenance gate, the bento treatment and its measured contrast ceiling
3. `docs/decisions/decision_016.md` — what may not ship, and why extraction is manual
4. `docs/reference/image_manifest.md` — every slot, its aspect ratio, export width and data
   path
5. `docs/milestones/milestone_005.md` and `milestone_002.md`
6. `docs/decisions/decision_006.md` — the hatched placeholder is a designed state, so a
   half-filled page is presentable rather than broken

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `scripts/pdf-page.js` — renders a documentation page to PNG; no dependency
- `scripts/image-manifest.mjs` — rerun with `--write` after filling slots
- `src/lib/dictionaries/{en,de}.ts` → `selectedWork.bento[]` — the eleven tiles
- `src/components/BentoGrid.tsx` — the scrim and the white label the images sit under
- `src/lib/caseStudies/*.ts` → `heroImage`, `sections[].images[]`

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`DECISION-016`: only the owner's own work ships.** Read a document's sources page before
  exporting from it. Surugami's names Freepik and Pinterest for five pages.
- **Nothing from `ProjectsDokus/` is committed** — 673 MB of PDF stays outside the repo. Only
  finished, cropped, resized exports land in `public/images/`.
- **Nothing internal may land under `public/`** — it ships. SESSION-014 found a manifest being
  served publicly.
- Every `src` goes in **both** the `en` and the `de` object. Same file, translated `alt`.
- Fix the alt strings that literally say "Placeholder:" as you replace each one.
- **Do not publish anything.** Merging to `main` and `npm run deploy` are the owner's calls.
- Do not rewrite prose (`MILESTONE-004`).
- No new runtime dependency; `axe-core` stays the only dev dependency.

## Verification

Against the **production build**, in a real browser.

- **The bento contrast ceiling is the acceptance test for every tile image.** White label and
  title over the image; the scrim is transparent at the top where the 12px label sits.
  Measure the composited result rather than trusting the export — anything brighter than
  about `#B4` behind the title fails WCAG 1.4.3, and most of this source material is
  light-background interface design.
- No layout shift: an image whose real ratio differs from the slot's `aspect` is centre-cropped
  by `object-cover`, so check the subject survives the crop or change the `aspect` in the data.
- Watch total page weight. Note the homepage's transferred bytes before and after.
- Rerun `node scripts/image-manifest.mjs --write` so the counts stop being anyone's memory.

Five traps this project has already paid for:

- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** A test that sets
  `scrollTop` and acts immediately is acting on a page still in motion — two false alarms
  already, and the reason `ISSUE-027` took three attempts.
- **Measure where the thing happens.** A trigger 737px down does nothing at 600px of scroll.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs.
- A `MutationObserver` cannot see a style write that does not change the value.
- `document.activeElement.textContent` is the whole page when focus is on `body`, and
  `[].every()` is `true`.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys
(1440/390 × motion on/off), reduced motion, the overflow sweep, the no-JavaScript metadata
fetch, and `hreflang` on both locales.

## Completion Criteria

- The eleven bento tiles carry real images, every one measured against the contrast ceiling,
  or the ones deliberately left are named with reasons.
- Every image shipped is the owner's own work (`DECISION-016`).
- The pipeline question is answered out loud: built, or explicitly deferred with the count of
  hand-sized files.
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_016.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed, and rerun `node scripts/image-manifest.mjs --write`.
