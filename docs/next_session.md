# Next Session

## Status

`MILESTONE-005` is **waiting on the owner, not on work**: 60 of 139 image slots filled, up from
7 before SESSION-016. **Four case studies now carry real imagery** — WikiMind, AFONO, Sync FM
and Surugami. Every engineering milestone that needs nobody is finished.

Work sits on branch `milestone-003-content-model`, **forty-two commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

The site is publishable; the pre-flight is in `docs/reference/publishing.md`. Two commands,
both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

## Objective

**The images are blocked on the owner, and they know it.** SESSION-023 asked directly, and the
answer was that the remaining case studies and the playground will get **their own export
folders**, the way `Images/wikimind/` did. That is the right call — those PNGs beat PDF page
renders on every axis, and three of WikiMind's showed figures the document never contained — but
it means **do not cut the remaining 21 slots out of the PDFs.** That work would be thrown away
the moment the folders land. **SESSION-024 proved the point**: `Images/Surugami/` arrived and
Surugami was built without opening `FInalDesmeth.pdf` once — 407 MB, no text layer, and not
needed.

**So: check `Images/` first.** If new folders are there, that is the session. What is still
missing is **the barrier-free kitchen (10 slots), QIS Portal (11) and the playground (39)**.

```bash
find Images -type f \( -name '*.png' -o -name '*.jpg' \) | sort
```

The method is `docs/sessions/session_022.md`, and it is now well-worn:

1. **Open every image before mapping it.** Filenames are a guess, not a label: WikiMind's
   `Wireframe.png` was a board of eight pages, and Surugami's `BrandPallete.png` was the entire
   identity board rather than a palette — three of Surugami's nine were not what they were
   called. **Rename the caption when the figure disagrees with it** (`[ logo exploration ]`
   became `[ brand system ]`), and **split a slot when two artefacts arrive for it**, as
   `[ sitemap + wireframes ]` did.
2. **Measure the aspect from the file** — `sips -g pixelWidth -g pixelHeight` — and declare that
   exact ratio (`1600/1131`). Never a round number. `ui/Media` paints with `object-cover`, so a
   mismatch is a silent crop; all fourteen of WikiMind's declared aspects were wrong.
3. Export WebP through `scripts/image-treat.mjs` with `crop: [0,0,1,1]`. Photographic material
   takes q0.78–0.82; flat vector boards stay at 0.9 and cost 6–31 KB anyway.
4. Place the figures **in the prose** with `{ kind: "figures", items: [...] }`, not in
   `sections[].images[]`. Group them at the passage each illustrates.
5. Record every export in `docs/reference/image_crops.json` by source path, width, height and
   quality, so it is reproducible.
6. `npm run images`, then the full verification.

**If the folders are not there yet, say so and do not invent work.** The remaining non-image
items are below, and they are small.

Then:

4. **`ISSUE-006`'s remainder** — the `og:image` (a designed 1200×630 card, **not a crop**, and
   still the last thing wrong with every shared link) and the About portrait. Both need the
   owner; if they are not available, say so and leave them.
5. **The 15 orphaned PNGs** — 817 KB that ships and that nothing references. Owner's yes.
6. **`ISSUE-033`** — `/work/wikimind` is the heaviest page on the site, 706 KB at 1440/1x
   across seventeen figures. Every lever left trades quality or figure size, so it is the
   owner's pick, not a defect to fix quietly.
7. **`ISSUE-032`** — WikiMind's persona portraits and moodboard tiles are not the owner's work.
   Four options are written up; all of them need the owner.
8. **`ISSUE-034`** — which Surugami poster is the owner's. One sentence from them fills a slot
   that is hatched only because guessing authorship is not allowed.
9. **WikiMind's last two soft figures** — `[ prototype video ]` and `[ interface detail ]` still
   carry SESSION-019's PDF crops and sit next to fifteen sharp exports. If the owner has
   originals, this is minutes of work.

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

# verification needs its server started first — run.mjs does NOT start or check it
node scripts/verify/serve.mjs dist 8099 &
npm run verify -- images                      # one check at a time; the server is single-threaded
```

**Start `serve.mjs` before any `verify` subcommand.** SESSION-022 forgot, and 36 routes
navigated to a refused connection and timed out silently for twenty minutes. It looks exactly
like a hang. `run.mjs` defaults its base to `127.0.0.1:8099` and never checks anything is there.

**An aspect ratio in the content data is a crop instruction.** `ui/Media` sets `aspectRatio`
from the data and paints with `object-cover`, so a declared aspect that does not match the file
silently throws away the difference — and `SectionMedia` also reads it to decide full-column
versus grid, so it moves the layout too. Declare the exported file's exact pixel ratio
(`1600/1131`), never a round number chosen by eye. All fourteen of WikiMind's were wrong.

**The grid picks *what* to crop; `ink-box` decides *where*.** Reading coordinates off the grid
by eye cost SESSION-020 three rounds — it reads short, and every crop clipped a figure's right
edge.

**Narrow the band until the number stops moving.** `ink-box` measures whatever is inside the
band you give it, so a band reaching into the page header, or a column limit clipping body
text mid-word, silently widens the box. Both happened in SESSION-021 and both surfaced as a
stray `en` in the export. Sweep the limit — `0.57`, `0.59`, `0.61` — until the answer
stabilises. It takes seconds.

**Cut the crop the artwork wants, not the one the layout tolerates.** `SUGGESTION-017` is
implemented, so a lone narrow figure is held to 800px tall and centred rather than stretched to
the column. Portrait figures — the kitchen and QIS both have them — no longer need their aspect
bent to keep the page sane.

**When the shape of the content data changes, check what the checks still see.** Twice now a
model change has quietly *narrowed* a check instead of breaking it: SESSION-023's inline
`figures` block made `image-manifest.mjs` report "WikiMind — 1 slot, all filled" and stop diffing
16 sources across `en` and `de`. Both times the symptom was a plausible-looking number.

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
