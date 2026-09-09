# SESSION-030 — All six case studies on the owner's own images, and the bento made light

Date: 2026-09-09
Branch: `milestone-003-content-model`
Asked for: the remaining images placed and the docs updated — and *"i donnot like the bento grid
backgrounds, it does not fit the whole aesthetic of this website."*

## `ProjectsDokus/` had moved inside the repository

644 MB of PDFs, untracked, one `git add -A` from being committed — and every session here commits
with `git add -A`. They have always been source material that must not ship (`DECISION-016`), and
they used to live outside the repository.

Added to `.gitignore` before anything else was touched.

## The bento — `DECISION-020`

Each tile was darkened to 40–80% brightness, desaturated and tinted with its project's colour so
that white text could sit on it. Eleven of those together, under a white and restrained layout,
read as a patchwork of murky washes. The owner was right, and the reason is structural: the rest
of the site is white surfaces, thin rules, mono labels and ink text, and the tiles were the only
thing doing the opposite — eight different times.

Asked what he wanted instead: **"maybe subtle colour backgrounds? maybe from title images?"**

So the tiles are now **washed pale** — brightened, near their own saturation, under a ~50% white
overlay — and the text is ink. The colour survives as a faint tint **of each image's own hue**
rather than a palette entry, and the dark gradient scrim is deleted outright rather than
lightened: contrast now comes from the image being pale, so there is no second layer to keep in
step. Tiles gained the `card-border` and `hover:border-accent` that every figure already has.

**The contrast check flipped with it.** `check: "bento"` measured the same two bands before and
after; it asserted `<= 128/138` for white text and now asserts `>= 190` for ink. Same
measurement, opposite direction.

**It earned that immediately.** At the 50% wash, `tile-syncfm-mobile` came out at 176/178 and
failed — its source is Sync FM's *dark mode* screens, and no wash that suits ten light sources
suits that one. It gets a stronger wash of its own, and the check is why that was noticed rather
than shipped.

What the check still cannot see: the bands are means, so nothing measures contrast directly
behind the glyphs. The grid was read at 1440px after every export for that reason.

## The last two case studies arrived

`Images/kitchen/` (12) and `Images/qis/` (7), plus an AFONO cover. **All six case studies now run
on the owner's own exports.**

**155 slots, 94 filled** — up from 148/75. Every supplied file across six folders is placed except
`Afono/Wireframe.png`, which is 14,299 × 8,794 and entirely white.

- **Barrier-free kitchen** — 11 → **15 slots, 2 empty.** The wooden-block and Lego layout studies,
  the reach studies, the journey map, three sets of full-scale paper prototypes, two observation
  photographs and the simulation tests, plus the Blender grey-box. The two still empty are the
  textured render and the animation, which the case study describes and the folder does not hold.
- **QIS Portal** — 12 → **14 slots, 7 empty.** The cover, the three original-portal screenshots,
  both information architectures and the SUS chart. Seven remain hatched, and they are named in
  the hand-off so the owner can export them.
- **AFONO** — the new `00 · Cover · Afono.png` becomes the hero, matching how every other case
  study now opens; the previous hero, a monitor render, becomes `[ desktop presentation ]` in §08.

## The trap that would have shipped silently

`sips` reports the pixels a file **stores**. The kitchen's `test1.jpg` and `test2.jpg` store
8160 × 3768 and **decode as 3768 × 8160** — they carry an EXIF rotation.

Declaring the stored ratio would have squashed two portrait photographs into landscape, and
nothing downstream would have caught it: `image-treat.mjs` draws through Chrome, which *applies*
the rotation, so the export would have come out distorted rather than failing. The contact sheet
showed them portrait while `sips` said landscape, which is what prompted the check.

Both were measured with an `Image()` decode before any aspect was written. The method in
`next_session.md` said "measure with `sips`" and now says otherwise.

## A redundant placeholder, caught by a check

`[ original portal — before ]` survived the first removal pass because it was a single-line
`images: [{ … }]` rather than a multi-line block. Removing the English one alone put `en` and `de`
out of step — and `image-manifest.mjs` exited 1 on the spot. The German twin had a **localised
caption** (`[ ursprüngliches portal … ]`), which is why one regex missed it.

## `ISSUE-037` — the QIS screenshots

Three screenshots of TH Lübeck's existing portal are now on the page. `DECISION-016` says
competitor screenshots stay out; it was written for material used as *inspiration*, and here the
borrowed thing is **the subject of the redesign**. They are captioned and described as the
original portal in both locales, and removing them would leave a redesign case study that never
shows what was redesigned.

The real risk is smaller and specific: `oldinfo.jpg` shows a grade record with a name and
matriculation number that **were not checked field by field**. Written up with a one-line fix.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- All eleven tiles pass the new contrast floor; the grid and the kitchen section read at 1440px

## Still open

- **The playground — 39 slots, untouched.** The only surface with no supplied imagery at all.
- Kitchen's two renders and QIS's seven figures
- `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 47 commits ahead of `main` before this one.
