# Next Session

## Status

**Read this first: the branch is 53 commits ahead of `main` and has never been pushed.**
The live site shows none of the last twenty-odd sessions — not the images, not the work grid,
not the playground. **That gap is the largest single thing on this list.** Say so plainly to the
owner before proposing anything else. **Check `git` before trusting any status in these files.**

The site is publishable; the pre-flight is in `docs/reference/publishing.md`. Two commands,
both the owner's to run:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

**163 image slots, 127 filled.** All six case studies are complete and run on the owner's own
exports. The playground was restructured in SESSION-033 and now has five categories
(`DECISION-023`); three of them are full.

## The one thing that is actually outstanding

**The owner's last message was cut off mid-word.** It read:

> "…then digitalart, then the last one left. also most of thr"

Everything before "also" was done. **Ask what the rest of that sentence was.** Do not guess —
"also most of the…" could be about the images, the categories, the captions or something else
entirely, and the four preceding clauses were all specific instructions.

## What needs the owner, not work

Nothing on this list can be closed by a session working alone.

1. **`ISSUE-038` part 1 — three craft videos, 121 MB.** They show gift boxes being *made*,
   which the eight craft stills do not. There is no encoder on this machine (`DECISION-022` has
   the measurements — `avconvert` grew two of four files). One pass makes all three shippable:
   ```bash
   ffmpeg -i craftgift2.mp4 -vf scale=-2:720 -crf 28 -c:a aac -b:a 96k craftgift2-web.mp4
   ```
   The component, the poster extractor and the content model all exist. Drop compressed files
   in and they take three slots in Handmade and Bead Crafts in minutes.
2. **`ISSUE-039` — the playground index crops every card.** The marquee declares `4/3` and the
   featured cards `16/10` whatever the item's real aspect is, so `object-cover` takes ~65% off
   the beaded planter. Three options are written up. It is a redesign of that page, not a bug
   fix, which is why SESSION-033 stopped at it.
3. **`ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`** —
   provenance judgements, a weight trade-off, one word of copy, and a portrait plus a designed
   `og:image` card.
4. **`Afono/Wireframe.png` is still blank** — 14,299 × 8,794 and entirely white. Re-export it if
   a real wireframe board exists.

## Empty slots, and what they are waiting for

**Do not invent work to fill these.** Every one needs source material that does not exist yet.

- **Games and Applications — 5 slots, none filled.** This is category 1 on the playground, by
  the owner's explicit choice (`DECISION-023`). A Unity game, Hibi, a NetBeans planner. Nothing
  has been supplied for any of them.
- **Photography, Animation and 3D — 7 slots, 2 filled.** The two photographs landed in
  SESSION-033. The five 3D and motion slots have nothing.
- **Motorbike Study — 4 slots, all empty**, including the main render.
- **QIS Portal — 6 of 14 empty.** `[ survey 01 ]`, `[ survey 02 ]`, `[ original hi-fi screens ]`,
  `[ new dashboard ]`, `[ mobile redesign ]`, `[ before / after ]`.
- **About — 8 of 9 empty**, including the portrait.
- **The kitchen's textured render**, and WikiMind's `[ interface detail ]`.

## If a session genuinely has nothing else

**CI** (`SUGGESTION-015`) — a workflow running lint and build. It needs the push first, which is
the owner's call. It remains the only item that needs nobody.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** Two sessions found that a documentation's own
sources page said materially more than `image_sources.md`'s row summarising it. **The row is an
index, not a substitute. Read the page, every time.**

**A supplied folder outranks the manifest.** Match the slots to the artefacts, not the artefacts
to the slots, and rename a caption when the figure disagrees with it.

**Open every image before mapping it.** Filenames are a guess. **Measure the aspect as the
browser decodes it** — `sips` reports stored pixels, and a JPEG with an EXIF rotation renders at
the transpose. Declare the exact ratio; `object-cover` makes a mismatch a silent crop.

**Declare `sizes` at every call site** (`DECISION-024`). `ui/Image` falls back to `100vw`, which
is a claim that the image fills the window — it cost `/playground` 1314 KB before SESSION-033
caught it. Where the width is a constant, `sizes` is that constant in px.

## The harness

```bash
npm run build && npm run prerender
node scripts/verify/serve.mjs dist 8099 &     # start this BEFORE any verify subcommand
npm run verify                                 # routes, images, a11y, weight
node scripts/content-audit.mjs                 # language, block shape, playground structure
node scripts/image-manifest.mjs                # slot counts, en/de src parity
```

**Run one check at a time, and never rebuild while one is running.** Both rules are in
`docs/reference/verification.md` and both were learned the hard way.

**`timeout` does not exist on macOS.** A command that fails to start looks exactly like the
command failing — SESSION-032 wrote up two transcodes as failures that had never run.

**A check that has only ever been seen to pass is not evidence.** `content-audit.mjs`'s eleven
checks were each proved by re-injecting the fault they exist to catch. Do the same for any new
one.
