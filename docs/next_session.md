# Next Session

## Status

`MILESTONE-005` is **in progress and moving steadily**: 48 of 136 image slots filled, up from
7 before SESSION-016. **Three case studies are complete end to end** — WikiMind, AFONO,
Sync FM — at roughly one session each. Every engineering milestone that needs nobody is
finished.

Work sits on branch `milestone-003-content-model`, **thirty-nine commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

The site is publishable; the pre-flight is in `docs/reference/publishing.md`. Two commands,
both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

**Half the case studies now carry real imagery.** Worth saying to the owner plainly — the gap
between what is built and what anyone can see is the largest thing on this list.

## Objective

**Finish the case-study figures. Three projects, 41 slots, one project end to end.**

Suggested order — easiest first, hardest last:

1. **The barrier-free kitchen** — `Dokumentation_Kueche_Haaks_Kocak_Maharjan.pdf`, 26 pages,
   10 slots. Its sources page names **three Sketchfab models** — the wheelchair figure, a jar,
   a decor pack. The scene, the kitchen and the renders are the team's.
2. **QIS Portal** — `Usability_SoSe24_…pdf`, 85 pages, 11 slots. flaticon icons, Freepik
   illustrations, a Google-sourced login background — and note that its **"Originale"
   screenshots are the university's live portal, not the team's design.** Represent it by the
   team's Figma screens.
3. **Surugami** — `FInalDesmeth.pdf`, 100 pages, 10 slots. **The hard one**: 407 MB with **no
   text layer at all**, so every page is a flat image and there is no embedded artwork to
   extract — you render and crop. Its sources page rules out the moodboards (7–9) and personas
   (12–13): Freepik by URL, and *"P4, P5, P6, P7, P8: All references were taken from
   Pinterest"*.

Then:

4. **`ISSUE-006`'s remainder** — the `og:image` (a designed 1200×630 card, **not a crop**, and
   still the last thing wrong with every shared link) and the About portrait. Both need the
   owner; if they are not available, say so and leave them.
5. **The 15 orphaned PNGs** — 817 KB that ships and that nothing references. Owner's yes.
6. **`SUGGESTION-017`** — see below. It is now the thing most likely to distort the remaining
   work.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** Two consecutive sessions have found that the
document's own sources page said materially more than `image_sources.md`'s row summarising it
— AFONO's named three borrowed mockup templates, Sync FM's named ChatGPT-authored personas
that the row had missed entirely. **The row is an index, not a substitute.** Read the page.

It may not be headed *Quellen*. Sync FM's is headed **"Tools und KI"**. WikiMind's does not
exist at all.

Three shapes of answer, all of which have now come up:

- **Borrowed outright** — crop it out, or skip the slot.
- **Refined from generated** — the owner adjusted an AI draft into their own artwork, and the
  documentation says so. **The refined version ships; the draft does not.**
- **No figure exists** — the documentation covers it in prose. Leave the hatch and say so.
  `DECISION-006` makes a placeholder a designed state, not a defect.

## The method

```bash
osascript -l JavaScript scripts/pdf-page.js "<pdf>" "1-26" /tmp/doc 0.5
node scripts/contact-sheet.mjs sheet /tmp/doc /tmp/sheet.png --cols 8 --cell 300
# pick candidates, re-render those at scale 6, then for each:
node scripts/contact-sheet.mjs grid /tmp/doc/p012.png /tmp/grid.png --width 1000
node scripts/ink-box.mjs /tmp/doc/p012.png --band 0.72,0.95 --cols 0.08,0.58
node scripts/image-treat.mjs <spec.json>     # a job names the PDF + page + renderScale
npm run images                                # after ANY image change
```

**The grid picks *what* to crop; `ink-box` decides *where*.** Reading coordinates off the grid
by eye cost SESSION-020 three rounds — it reads short, and every crop clipped a figure's right
edge.

**Narrow the band until the number stops moving.** `ink-box` measures whatever is inside the
band you give it, so a band reaching into the page header, or a column limit clipping body
text mid-word, silently widens the box. Both happened in SESSION-021 and both surfaced as a
stray `en` in the export. Sweep the limit — `0.57`, `0.59`, `0.61` — until the answer
stabilises. It takes seconds.

**Change the declared aspect when the artwork disagrees with it** — but see `SUGGESTION-017`
first. Eight slots have had their aspect changed across three sessions. Some were the honest
call; two in SESSION-021 were the layout forcing the crop's hand, which is backwards.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **Nothing from `ProjectsDokus/` is committed.** Only finished exports land in the repo.
- **Nothing internal may land under `public/`** — it ships. Two sessions have caught something.
- Every `src` goes in **both** the `en` and the `de` object. This is **checked**:
  `node scripts/image-manifest.mjs` diffs them and exits non-zero.
- Export **WebP**, then `npm run images`. Render the source page wide enough for the output
  width — upscaling is the one thing the pipeline will not catch.
- **Do not publish anything.** Merging to `main` and `npm run deploy` are the owner's calls.
- Do not rewrite prose (`MILESTONE-004`) — `ISSUE-031` is one word and it still belongs to
  the owner.
- No new runtime dependency; `axe-core` is still the only devDependency the project has had.

## Verification

`docs/reference/verification.md` is the full account. In short:

```bash
npm run build && npm run prerender
node scripts/verify/serve.mjs dist 8099 &
npm run verify          # routes, images at 1x/2x/3x, a11y, weight
```

Leave passing: 36/36 routes (and `/work` correctly 404); every image on every route at dpr 1,
2 and 3 with **zero failed image requests**; axe 0 violations; 0 overflow; 0 stuck reveals;
reduced motion fully static and visible; `image-variants.mjs --check`; `image-manifest.mjs`.

**Two rules the harness cannot enforce on itself, and both bit in SESSION-021:**

- **Run one check at a time.** Two runs share one Chrome page target and interleave
  navigations. It shows up as wildly unstable image counts, which looks exactly like a
  product bug.
- **Never rebuild while a check is running.** `npm run build` empties `dist/` underneath it.

If a number looks impossible, check what else was running before believing it.

## Owner decisions outstanding

1. **The `og:image`** — approve a designed 1200×630 card. Highest visibility item left.
2. **A photograph for the About portrait**, still a 14 KB colour stand-in.
3. **May AFONO's AI-generated product imagery be shown?** Its sources page calls it a
   placeholder for later real photography, and the case study already discloses it twice.
   Unblocks `[ product page ]` and improves two more slots.
4. **Delete the 15 orphaned PNGs?** 817 KB, shipping, referenced by nothing.
5. **`ISSUE-031`** — Sync FM's copy credits Gemini with the personas; the documentation says
   ChatGPT. One word per locale.
6. **Does Hibi become a seventh case study?** Two documentations, no page.

## Completion Criteria

- At least one more case study's figures filled end to end, or an explicit reason why not.
- Every image shipped is the owner's own (`DECISION-016`), checked against the sources page
  itself.
- Every remaining placeholder is a recorded, deliberate choice.
- `npm run verify` green; `en`/`de` sources identical.
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_022.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed, and rerun `node scripts/image-manifest.mjs --write`.
