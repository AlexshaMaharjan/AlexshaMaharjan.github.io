# Next Session

## Status

`MILESTONE-005` is **waiting on the owner, not on work**: 73 of 148 image slots filled, up from
7 before SESSION-016. **Four case studies are complete, and all four run on the owner's own
exports rather than PDF page renders** — WikiMind, AFONO, Sync FM and Surugami. **`MILESTONE-002` closed in SESSION-025**, and with `ISSUE-009` and `ISSUE-010` it
took the last of the actionable non-image queue with it.

**Six issues are open and five of them need the owner, not work.** That is the real state of
this project: it is not short of engineering, it is short of two photographs, a poster's name,
three judgement calls and three folders of images.

Work sits on branch `milestone-003-content-model`, **fifty-two commits ahead of `main` and
unpushed**. **The live site shows none of the last twenty-odd sessions.** That gap is now the
largest single thing on this list — say so plainly to the owner before proposing anything else. **Check `git` before trusting any status in these files.**

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
the moment the folders land. **SESSION-024 and SESSION-026 proved the point three times over**:
Surugami, AFONO and Sync FM were all built or rebuilt from supplied folders, and twelve PDF crops
were superseded in SESSION-026 alone.

**So: check `Images/` first.** All six case studies are now placed. What is still missing:

- **The playground — 39 slots, and the only surface with no supplied imagery at all.** This is
  now the single largest gap on the site.
- **The barrier-free kitchen's last two** — the textured render and the Blender animation. The
  case study describes both; `Images/kitchen/` holds the grey-box only.
- **QIS Portal's seven** — `[ survey 01 ]`, `[ survey 02 ]`, `[ paper prototypes ]`,
  `[ original hi-fi screens ]`, `[ new dashboard ]`, `[ mobile redesign ]`, `[ before / after ]`.
  The folder supplied the cover, the three original-portal screenshots, both architectures and
  the SUS chart.

**A supplied folder outranks the manifest.** Sync FM's three persona slots became one because one
board arrived; Surugami's `[ sitemap + wireframes ]` became two because two did. Match the slots
to the artefacts, not the artefacts to the slots — and rename a caption when the figure disagrees
with it.

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
2. **Measure the aspect as the browser decodes it**, and declare that exact ratio (`1600/1131`).
   Never a round number: `ui/Media` paints with `object-cover`, so a mismatch is a silent crop,
   and all fourteen of WikiMind's declared aspects were wrong.
   **`sips` is not enough.** It reports the pixels a file *stores*; a JPEG with an EXIF rotation
   renders at the transpose. The kitchen's `test1.jpg` and `test2.jpg` store 8160 × 3768 and
   decode as **3768 × 8160** — declaring the stored ratio would have squashed both, and
   `image-treat.mjs` draws through Chrome, which applies the rotation, so the export would have
   come out distorted rather than failing. Decode with an `Image()` in the browser first.
3. Export WebP through `scripts/image-treat.mjs` with `crop: [0,0,1,1]`. Photographic material
   takes q0.78–0.82; flat vector boards stay at 0.9 and cost 6–31 KB anyway.
4. Place the figures **in the prose** with `{ kind: "figures", items: [...] }`, not in
   `sections[].images[]`. Group them at the passage each illustrates.
5. Record every export in `docs/reference/image_crops.json` by source path, width, height and
   quality, so it is reproducible.
6. `npm run images`, then the full verification.

**If the folders are not there yet, say so and do not invent work.** SESSION-025 took the last
of the non-image queue that could be done without the owner. What is left below is either a
decision only they can make, or work that assumes the repository is pushed.

**Two things could be done without anyone**, if a session genuinely has nothing else:

- ~~**Re-cut the two Surugami bento tiles.**~~ **Tested and ruled out in SESSION-028.** A tile
  needs one element at the tile's aspect and at least its export width; `Poster.png`'s largest
  element is 964 × 274 against a requirement of 900 × 647, so re-cutting would upscale. **A
  supplied board is a composite and holds fewer pixels per element than a page render.** Five
  other tiles *were* re-cut. Do not re-test this — the measurements are in `image_sources.md`.
- **CI** (`SUGGESTION-015`) — a workflow running lint and build. It only earns its keep once the
  branch is pushed, which is the owner's call. **This is now the only remaining item that needs
  nobody**, and it needs the push first.

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
9. **`ISSUE-035`** — AFONO's empty `Wireframe.png`, the cropped-out inspiration board, and the
   AI-imagery inference that was read from the folder rather than stated. Worth confirming.
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
