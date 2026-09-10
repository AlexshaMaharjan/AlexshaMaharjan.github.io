# Session log

One row per working session. **IDs are permanent.**

SESSION-001 to SESSION-028 are the table only: their reasoning lives in [decisions.md](decisions.md) and [issues.md](issues.md), which is where it is actually looked up. From SESSION-029 the full write-up is kept below, because that is the stretch the current code came out of.

One document per working session. Chronological; IDs are permanent.

| ID | Date | Milestone | Objective | Status |
| --- | --- | --- | --- | --- |
| SESSION-001 | 2026-08-22 | — (initialization) | Full repository analysis; establish the `docs/` system | Complete |
| SESSION-002 | 2026-08-22 | MILESTONE-001 | Fix the three navigation defects; clean the repository | Complete |
| SESSION-003 | 2026-08-23 | MILESTONE-003 | Case-study content model: blocks instead of `string[]`, all six studies migrated | Complete |
| SESSION-004 | 2026-08-23 | MILESTONE-003 | Case-study layout: measure, media widths, set pieces, reading progress, closing band | Complete |
| SESSION-005 | 2026-08-23 | MILESTONE-007 | Anchor offset matched to the real header; footer overflow; ISSUE-027 diagnosed, not fixed | Complete |
| SESSION-006 | 2026-08-23 | MILESTONE-007 | Design-system consolidation: one type scale, three colour tokens, one container | Complete |
| SESSION-007 | 2026-08-24 | MILESTONE-007 | The header at every width: the centred switch, and German headings that overflowed | Complete |
| SESSION-008 | 2026-08-24 | MILESTONE-002 / 005 | The owner's three decisions, acted on: bilingual image-ready bento, every slot fillable from data, image manifest | Complete |
| SESSION-009 | 2026-08-24 | MILESTONE-007 | Accessibility: contrast, three keyboard defects, marquee pause control; axe-core clean | Complete |
| SESSION-010 | 2026-08-24 | MILESTONE-008 | Per-route metadata: no more leaking, and each route's head prerendered for scrapers | Complete |
| SESSION-011 | 2026-08-24 | MILESTONE-006 | Motion: one vocabulary, reveal variants, page transitions, a loading state, and the canvas loop finally idling | Complete |
| SESSION-012 | 2026-08-25 | MILESTONE-006 | Scroll-linked: hero drift, figure reveals, velocity-linked marquees — closing the milestone | Complete |
| SESSION-013 | 2026-08-25 | MILESTONE-008 | Case-study chunk split per slug, hreflang alternates, GSAP decided — closing the milestone | Complete |
| SESSION-014 | 2026-08-25 | MILESTONE-007 / 008 | The last two defects closed, and a deploy pre-flight written down | Complete |
| SESSION-015 | 2026-08-25 | MILESTONE-005 / 002 | The project documentations mapped to the image slots; provenance rule recorded | Complete |
| SESSION-016 | 2026-08-25 | MILESTONE-005 / 002 | The first eighteen image slots filled from the documentations, with a contrast-enforcing treatment tool | Complete |
| SESSION-017 | 2026-08-25 | MILESTONE-003 / 007 | Case studies open with the contents rail; title inside Overview; facts shortened, year removed | Complete |
| SESSION-018 | 2026-08-25 | MILESTONE-003 | One width down the case-study column: text runs to the media edge | Complete |
| SESSION-019 | 2026-08-25 | MILESTONE-005 / SUGGESTION-012 | Responsive image pipeline with no new dependency; WikiMind's twelve section figures | Complete |
| SESSION-020 | 2026-08-25 | MILESTONE-005 | AFONO's twelve section figures; AFONO's sources page re-read and DECISION-016 amended; contact-sheet tooling | Complete |
| SESSION-021 | 2026-08-26 | Sync FM's figures (6 of 11, 4 hatched with reasons); DECISION-016 Amendment 2; the verification harness moves into the repository |
| SESSION-022 | 2026-09-03 | WikiMind re-shot from owner-supplied originals — 14 figures at their true aspect ratios, 2 new slots, 1 previously hatched slot filled; ISSUE-032 |
| SESSION-023 | 2026-09-04 | Figures move inline to their prose (`figures` block); SUGGESTION-017 implemented; full-screen figure viewer for mobile legibility (DECISION-018); ISSUE-033 |
| SESSION-024 | 2026-09-04 | Surugami built entirely from supplied exports — 8 figures plus a new hero, 3 slots deliberately hatched; ISSUE-034 |
| SESSION-025 | 2026-09-04 | No images to place: ISSUE-009 (German landmarks axe cannot see) and ISSUE-010 closed, MILESTONE-002 complete, `!important` removed, doc accuracy pass |
| SESSION-026 | 2026-09-04 | AFONO and Sync FM re-shot from supplied folders — 12 PDF crops superseded, 9 new slots, Sync FM's three persona slots merged into the one board that exists; ISSUE-035 |
| SESSION-027 | 2026-09-04 | DECISION-019: figures sized by height and rows justified, superseding SUGGESTION-017; AFONO's 22 figures moved into the prose |
| SESSION-028 | 2026-09-08 | Five bento tiles re-cut from supplied exports; measuring disproved the hand-off's premise that Surugami's two could be — a composite board holds fewer pixels per element than a page render |
| SESSION-029 | 2026-09-08 | Every supplied image placed (AFONO 23 → 30 slots); 25 orphaned originals deleted, 1.4 MB; found and fixed ISSUE-036, a German list I shipped on the English page in SESSION-027, and added `content-audit.mjs` |
| SESSION-030 | 2026-09-09 | Kitchen and QIS folders placed — all six case studies now on the owner's own images, 155 slots / 94 filled; bento tiles washed pale with ink text (DECISION-020); ProjectsDokus git-ignored; EXIF-rotation trap caught |
| SESSION-031 | 2026-09-09 | Bento replaced by six project cards with no text (DECISION-021) — the fault was text on images and object-cover crops, not colour; kitchen cover composed to match the other five; bento and its 11 tiles deleted |
| SESSION-032 | 2026-09-10 | Playground filled — 34 figures across four categories, 161 slots / 125 filled; video arrives (DECISION-022): poster + `preload="none"`, verified over CDP; kitchen animation and QIS lo-fi prototypes placed |
| SESSION-033 | 2026-09-10 | Playground categories reordered to the owner's five (`DECISION-023`); `/playground/editorial` folded into graphic design; the heaviest page on the site measured and cut |
| SESSION-034 | 2026-09-10 | Playground rebuilt as one scrapbook page (`DECISION-026`) — 34 routes → 22, true aspect ratios, click-to-enlarge in place; Chrome's `MediaRecorder` turns 121 MB of craft video into 1035 KB, amending `DECISION-022` |
| SESSION-035 | 2026-09-10 | Playground rebuilt again as a deck of four sticky cards (`DECISION-027`), then filled with 48 slots traced from `Portfolio.fig` page 2; 15 new assets including the motorbike and Hibi clips that `next_session.md` had listed as impossible; **branch merged to `main`, pushed and deployed — the first deploy in 56 commits** |
| SESSION-036 | 2026-09-10 | The deck gets its own hand: hero raised to 56svh so half a card shows at rest, ten `aria-hidden` scribbles lifted from the About idiom, and every slot opens in `ui/Lightbox` — which learned `video` and `description` rather than being duplicated. Caught a detached focus target caused by declaring a component inside its parent |
| SESSION-037 | 2026-09-10 | The deck arrives in black and white and the scroll puts the colour back: a `RUNWAY` of empty scroll behind every card, one scrubbed `--pg-reveal` per card and the rest arithmetic in CSS; per-card accent colours; hover holds a picture up to the light and names it beside the cursor |
| SESSION-038 | 2026-09-10 | Notes name their picture instead of their position (`placeScribbles.ts`); white cards on a dotted page; `content-audit` learns to check note targets; **`docs/` consolidated from 159 files to 16** and `MILESTONE-010` written from the owner's fifteen-item list |
| SESSION-039 | 2026-09-10 | `MILESTONE-010`: the eleven tasks that needed nobody, leaving only the four owner gates. Hero split into title and description; the About page rewritten and its portrait made real after being a solid-black stand-in the whole time; WikiMind's sketches become a bento (`DECISION-032`); nine playground changes; three spacing classes that produced no CSS at all (`ISSUE-047`) |

### Conventions

- A session file is written **at the end** of the session it describes.
- Summarize; never paste diffs. Reference source files by path.
- After archiving, rewrite `docs/previous_session.md` to point at the new entry, and
  rewrite `docs/next_session.md` for the next objective.
- A rework of an earlier session gets its **own** new session ID — it does not edit the
  original.


---

## Full write-ups, SESSION-029 onwards


---

<a id="session-029"></a>

### SESSION-029 — Every supplied image placed, and a bug of my own found

Date: 2026-09-08
Branch: `milestone-003-content-model`
Asked for: use every image in the folders; remove the old photos; add placeholders where images
have no slot; drop Surugami's two "by alexsha" placeholders; put AFONO's prints 1, 2 and 3
together.

#### The bug found on the way

Screenshotting AFONO to check the new figures showed a **German list on the English page**. It
had shipped in two commits, and I put it there — `37f6b3a`, SESSION-027, where I moved a figure
group that had landed before the list naming the four collections and fixed it "by a rule rather
than by hand".

The rule matched a `figures` block immediately followed by a `list` block, **anywhere in the
file**. It knew the shape and not the position: not the section, not the locale, not the case
study. It reported two substitutions — exactly the number expected — and that agreement was taken
as confirmation. The English list ended up in **§03 Research**, three sections above the
collection it names; the German one ended up in the **English** §06; the German §06 lost its list
entirely.

**Every check was green throughout.** `tsc`, ESLint, axe, the 196-image sweep, overflow, reveals,
and `image-manifest.mjs`'s en/de diff — which compares figure `src` only, because prose is
*supposed* to differ between locales. Nothing in the harness reads words.

`scripts/content-audit.mjs` now does, and `predeploy` runs it: wrong-language body blocks
(function words only, and **list items tested individually** — the first version joined them and
passed a German line hidden among three English ones, so it was discarded), plus `en`/`de`
structural parity, which catches a list that exists in one locale and not the other. Both proved
by re-injecting each fault, confirming exit 1, then confirming clean. Written up as `ISSUE-036`.

The lesson: **a transformation matched only by shape will eventually match the wrong instance, and
a substitution count is not verification.** Two were expected and two were reported; the number
agreed while the positions did not.

#### Every supplied image is now placed

| Folder | Files | Used |
| --- | --- | --- |
| `wikimind` | 16 | 16 (`InitialSketches.jpg` is the original of the `.png` the pipeline converted) |
| `Surugami` | 9 | 9 |
| `SyncFM` | 8 | 8 |
| `Afono` | 30 | **29** — `Wireframe.png` is 14,299 × 8,794 and entirely white |

**148 slots, 75 filled.** AFONO went 23 → **30 slots**, taking twelve images that had no slot:
print sketches, the HIMAL / mask / wordmark prints, the dark tee mockups, the landing, City
Series and register pages, two more component sheets, the wishlist buttons, and the social grid.

`InstaInspiration.png` is now used, **cropped to the owner's own panel** at
`[0.6196, 0.1694, 0.3673, 0.8124]` — the left two thirds is other brands' Instagram feeds, which
`DECISION-016` keeps out. That is the rule working as written: crop to the owner's part rather
than drop the file.

Prints 1, 2 and 3 sit **together and consecutive**, each taking the full column. Side by side in
one justified row they would have been 140px tall; three full-width rows is what "together" can
mean at this column width and still be legible.

#### The old photos are gone

Every figure on the four case studies with folders now comes from the owner's own exports. The
PDF-derived ones were unwired and **deleted**, along with fifteen long-orphaned PNGs that had been
shipping unreferenced since before SESSION-016:

- AFONO — interview findings, tee front, tee back, checkout, final brand system
- Sync FM — sync dial, mood bar, opinion filter
- WikiMind — prototype, interface detail

**25 originals and 22 variants removed, 1.4 MB off what ships.** Nothing referenced them: checked
across every `src`, `scripts`, `public` and `index.html` file before deleting, not just the case
studies.

Five figures are gone with them, and it is worth being explicit: Sync FM's three control
close-ups had a paragraph each, and no supplied file replaces them — the components board covers
the same controls at a smaller size. If those should come back, the crops are still in git.

Surugami's `[ illustration — by alexsha ]` and `[ poster — by alexsha ]` placeholders are
removed as asked. `[ market analysis ]` remains AFONO's one empty slot, for the reason
`DECISION-016` gives.

#### Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, per-route counts
  identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean, and proved to fail on both faults it exists for
- `image-manifest.mjs` exits 0 on en/de parity

#### Weight — `ISSUE-033` raised to High

Twenty-nine figures on one page has a cost: `/work/afono` is now **910 KB at 1440/1x and 2141 KB
at 390/3x**, up from 1544 KB. Deleting 1.4 MB of orphans took weight off what *ships* but nothing
off what a page *loads* — none of it was referenced.

**2.1 MB is past the point where this is only a number in a table.** The cause is structural and
unchanged: below 640px every figure is full width, so a 3x phone fetches 29 images at the 1280
rung. What changed is that lowering the variant ladder's fixed 0.82 quality — site-wide, and the
one lever that costs nothing but a judgement about image quality — is now clearly worth an
experiment rather than a note. Raised to High and left with the owner, because it trades quality
across every page.

#### Still open

- The kitchen (10 slots), QIS Portal (11) and the playground (39)
- `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 46 commits ahead of `main` before this one.


---

<a id="session-030"></a>

### SESSION-030 — All six case studies on the owner's own images, and the bento made light

Date: 2026-09-09
Branch: `milestone-003-content-model`
Asked for: the remaining images placed and the docs updated — and *"i donnot like the bento grid
backgrounds, it does not fit the whole aesthetic of this website."*

#### `ProjectsDokus/` had moved inside the repository

644 MB of PDFs, untracked, one `git add -A` from being committed — and every session here commits
with `git add -A`. They have always been source material that must not ship (`DECISION-016`), and
they used to live outside the repository.

Added to `.gitignore` before anything else was touched.

#### The bento — `DECISION-020`

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

#### The last two case studies arrived

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

#### The trap that would have shipped silently

`sips` reports the pixels a file **stores**. The kitchen's `test1.jpg` and `test2.jpg` store
8160 × 3768 and **decode as 3768 × 8160** — they carry an EXIF rotation.

Declaring the stored ratio would have squashed two portrait photographs into landscape, and
nothing downstream would have caught it: `image-treat.mjs` draws through Chrome, which *applies*
the rotation, so the export would have come out distorted rather than failing. The contact sheet
showed them portrait while `sips` said landscape, which is what prompted the check.

Both were measured with an `Image()` decode before any aspect was written. The method in
`next_session.md` said "measure with `sips`" and now says otherwise.

#### A redundant placeholder, caught by a check

`[ original portal — before ]` survived the first removal pass because it was a single-line
`images: [{ … }]` rather than a multi-line block. Removing the English one alone put `en` and `de`
out of step — and `image-manifest.mjs` exited 1 on the spot. The German twin had a **localised
caption** (`[ ursprüngliches portal … ]`), which is why one regex missed it.

#### `ISSUE-037` — the QIS screenshots

Three screenshots of TH Lübeck's existing portal are now on the page. `DECISION-016` says
competitor screenshots stay out; it was written for material used as *inspiration*, and here the
borrowed thing is **the subject of the redesign**. They are captioned and described as the
original portal in both locales, and removing them would leave a redesign case study that never
shows what was redesigned.

The real risk is smaller and specific: `oldinfo.jpg` shows a grade record with a name and
matriculation number that **were not checked field by field**. Written up with a one-line fix.

#### Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- All eleven tiles pass the new contrast floor; the grid and the kitchen section read at 1440px

#### Still open

- **The playground — 39 slots, untouched.** The only surface with no supplied imagery at all.
- Kitchen's two renders and QIS's seven figures
- `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 47 commits ahead of `main` before this one.


---

<a id="session-031"></a>

### SESSION-031 — The bento becomes six cards, and the kitchen gets a cover

Date: 2026-09-09
Branch: `milestone-003-content-model`
Asked for: *"i still dot like the benti boxes design, it looks really bad. what dio you suggest?"*
— then, of the replacement: *"I like this look but i dont like the text below the images/cards.
i think title is not needed because it is already there in the title image, for 3d kitchen, for
now make similar title image with the existing images."*

#### Two sessions were spent on the wrong axis

SESSION-030 answered the first rejection by re-colouring the tiles: dark project tints out, pale
washes in. The second rejection came straight back. That is the point at which the treatment
stops being the thing to adjust.

Read close up at 1440px, the faults had nothing to do with colour:

1. **The category label sits centred at the top of every tile regardless of what is underneath.**
   "Interaction Design" across the Sync FM screens, "Brand & Print" across the paper crane.
2. **Titles compete with the thing they name** — "WikiMind" over the WikiMind logo.
3. **`object-cover` crops each image to whatever shape its `gridArea` happens to be.** Tiles read
   as broken screenshots: `gami is much / nore fun together / nity`, a cut figure caption
   `…bildung 5: Auswertung der Fragen…`, half-letters.

**Washing the tiles pale did not cause that — it revealed it.** The dark tint had been hiding the
mess. Which is why the first fix made things look worse rather than better, and why re-colouring
again would have failed too.

#### `DECISION-021` — nothing on an image, nothing cropped

Six project cards, one per project. The cover is shown **whole at its own aspect** in a rounded
bordered box, and — after the owner's second note — **the card carries no text at all.** Five of
the six covers are designed title cards from the owner's folders; they already name their project,
so a name underneath said it twice. The same fault as the bento, in miniature.

The link still needs a name for anyone not looking at it. Without one the accessible name falls
back to the cover's `alt`, which describes the picture rather than the destination, so the `<a>`
carries `aria-label="{name} — {tags}"`. A screen reader hears "AFONO — Branding, E-commerce,
Graphic Design" rather than "the AFONO shop and size finder in two browser windows".

Then a third note: *"i se ehat you removed the tags also, like the type of project."* Removing
the caption block had taken the disciplines with the name, and they are not the same thing — the
name is repeated on every cover, the disciplines appear nowhere else. The card ends up carrying
**one mono line of tags and no title.**

Compositing them into the covers, which is what "in the photos" asked for, was tested and put
aside. Five of the six covers are the owner's artwork with five different type systems and
grounds, so a line added on top would impersonate five designs rather than match one — and it
would be text on an image, the fault this whole change removes. Measurement settled the practical
half: the left-hand text block cannot be bounded reliably, because product imagery bleeds into the
left 46% on four of the six. Burned-in tags would also be wrong the moment a cover is redrawn;
the line reads from `projects[].tags`.

Rows are justified by `@/lib/justify`, **extracted from `SectionMedia`** so the homepage and the
case studies cannot drift apart — a row of covers with different aspects still shares one height.

`imageAspect` came back to `ProjectCopy`, removed in SESSION-025 as dead. The whole point of these
cards is that a cover renders at its own proportions, so it is now the field the layout depends
on. Worth noting rather than quietly re-adding: "dead" meant "dead for the design we had".

#### The kitchen cover

Five projects had designed covers and the kitchen did not, so its card was visibly the odd one
out — a 16/7.5 PDF crop against five 16/9 title cards.

`scripts/cover.mjs` composes one to match: pale ground, project name, one-line subtitle, the work
bleeding off the right edge. It **copies a layout rather than inventing one**, and it should be
replaced if the owner makes a real one.

The render inside it needed picking rather than taking. The old hero was **two Blender viewport
screenshots side by side, one with the axis gizmo still in frame.** The cover uses
*"Rollstuhlfahrerin sitzt an Arbeitsplatte"* from page 22, re-rendered at scale 5 and cropped to
exclude the gizmo — checked by eye at full size, because the gizmo survived the first crop.

#### The bento is gone

Once the cards were approved: `BentoGrid.tsx`, `selectedWork.bento[]`, the `BentoTile` type and
**all eleven tile images** — 247 KB of originals plus 22 variants. `image-manifest.mjs` reports
the homepage from `projects[]` now, so a card's image is the same file its case study opens with
and there is no second copy to keep in step.

`check: "bento"` survives in `image-treat.mjs` with nothing using it. Left in place: it is nine
lines, and the two sessions of measurement behind its threshold are the kind of thing that is
cheap to keep and expensive to rediscover.

**150 slots, 89 filled** — the homepage went from 11 slots to 6, so the totals fall while nothing
was lost.

#### Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations — including the cards, which now have no visible text
- 0 overflow at 390px; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- The grid read at 1440px after each of the three iterations

#### Still open

- **The playground — 39 slots, and the only surface with no supplied imagery at all.**
- Kitchen's textured render and animation; QIS's seven remaining figures
- `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 49 commits ahead of `main` before this one.


---

<a id="session-032"></a>

### SESSION-032 — The playground fills, and the site learns to carry video

Date: 2026-09-10
Branch: `milestone-003-content-model`
Asked for: *"i have added videos and photos so use them whereever possible."*

#### 161 slots, 125 filled

Up from 150 / 89. **The playground was the last surface with no imagery at all** and now carries
34 figures across four of its six categories. The barrier-free kitchen's animation and QIS's
lo-fi prototypes — both described in prose and hatched since the manifest was written — are in.

| Surface | Before | After |
| --- | --- | --- |
| Playground — Digital Drawings | 0 of 5 | **9 of 9** |
| Playground — Handmade and Bead Crafts | 0 of 5 | **8 of 8** |
| Playground — Editorial | 0 of 5 | **5 of 5** |
| Playground — Graphic and Logo | 0 of 5 | **9 of 9** |
| Playground — home | 0 of 5 | 3 of 5 |
| Barrier-free kitchen | 13 of 15 | **14 of 15** |
| QIS Portal | 7 of 14 | **8 of 14** |

Captions were rewritten to name what actually arrived — "Beaded hanging planter", "Explosion gift
box", "Typographic postcard 1–3" — rather than leaving the manifest's placeholders describing work
that was never supplied.

#### Video, and the constraint that shaped it

The kitchen case study has always described an animated Blender walkthrough. The obvious move —
compress the 12 MB file to something a page can carry — turned out not to be available. **There is
no encoder on this machine:** no `ffmpeg`, and macOS's `avconvert` optimises for quality, not size.

Measured on all four supplied videos:

| File | Source | `Preset960x540` |
| --- | --- | --- |
| `kitchen/Video.mp4` | 11.9 MB | **31.3 MB** |
| `craftworkgift1.mp4` | 15.4 MB | 15.4 MB |
| `craftgift2.mp4` | 60.1 MB | **77.2 MB** |
| `craftgift3.mp4` | 45.9 MB | 13.2 MB |

One of four usefully compresses. So `DECISION-022`: **do not shrink the video, do not fetch it.**
A film is a figure whose `src` is a poster still, with the film in a separate `video` field;
`ui/Video` swaps in a `<video controls>` only on a click, `preload="none"` until then. The page
carries **34 KB against a 12 MB film**.

`scripts/video-frame.mjs` grabs the poster — no encoder needed for that, since Chrome already
decodes the video: seek it and draw one frame to a canvas.

**The claim was verified rather than assumed.** Driving the built page through CDP with a network
listener: after a full scroll of `/work/barrier-free-kitchen`, mp4 requests were `NONE`; after
clicking play, exactly one, and a `<video>` with controls at 1024×576.

The poster is also better than what it replaced: the old kitchen hero was two Blender *viewport
screenshots*, one with the axis gizmo in frame. This is a clean render of the whole room.

#### Two traps, one of them mine

**The EXIF trap again, and it is now three for three.** `bead.jpg` and `gift4.jpg` store landscape
and decode portrait. Every session that has taken a folder of photographs has hit this, and the
method in `next_session.md` now says to decode with `Image()` rather than trust `sips` — which is
why it was caught before export this time rather than after.

**`timeout` does not exist on macOS.** I wrapped the video transcodes in `timeout 600 avconvert …`,
got "command not found" on both, and wrote them up as *failed transcodes*. They had never run. The
real numbers — including the two files that grew — only appeared on the re-run. **A command that
fails to start looks exactly like the command failing**, and the difference matters: one of those
conclusions would have gone into a decision record as fact.

**Two source files exceed Chrome's decoder.** `digitalart6.jpg` and `digitalart9.jpg` are 581 and
670 megapixels; `Image.decode()` refuses them. Pre-scaled with `sips` first. The QIS prototype PDF
rendered to 479 MP and needed the same.

#### Still unplaced — `ISSUE-038`

- **Three craft videos, 121 MB.** They show gift boxes being *made*, which the stills do not, so
  they are additive rather than duplicates. Click-to-play makes a page cheap but not a repository
  small, and 121 MB is more than this repository has ever carried. One `ffmpeg -crf 28` pass makes
  all three shippable; the component, the poster extractor and the content model are already there.
- **Two photographs**, and the playground has no photography category. Filing them under Handmade
  or Digital Drawings would miscategorise them. Adding a category is a real change — route, nav,
  copy in both locales — and it is the owner's call.
- `Afono/Wireframe.png`, still entirely white.

#### Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- The video's load behaviour driven end to end through CDP

#### Still open

- Playground: 3D and Motion (5), Games and Interactive (5), Motorbike Study (4), home featured (2)
- QIS's six remaining figures; the kitchen's textured render
- `ISSUE-038`, `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 51 commits ahead of `main` before this one.


---

<a id="session-033"></a>

### SESSION-033 — Five categories, and the heaviest page on the site

Date: 2026-09-10
Branch: `milestone-003-content-model`
Status: complete, verified, committed. **Nothing pushed.**

#### What was asked

> "i want the categories abit different in the playground. the fifth one, i want game and
> application(software and all) in number 1, then in number 2 maybe photography, animation and 3d
> maybe, then graphic design, then digitalart, then the last one left. also most of thr"

The message ends mid-word. Everything below acts on the part that is complete; **the sentence
beginning "also most of thr" was never received and nothing has been done about it.**

Two things in the request needed the owner rather than a guess, and both were put to them
before anything moved:

1. **Five positions were listed and six categories existed.** "The last one left" is singular,
   which only works if two of the six merge. Answer: **five** — `Calendars and Editorial
   Experiments` folds into Graphic Design.
2. **The two categories asked for first are the only two with no images at all.** Answer:
   **the order stands.** Recorded in `DECISION-023` with the reasoning, because it is a
   deliberate choice and the next session will otherwise read it as an oversight.

#### The restructure — `DECISION-023`

| # | Slug | Title | Items |
| --- | --- | --- | --- |
| 1 | `games-and-apps` | Games and Applications | 5 (0 filled) |
| 2 | `photography-3d-motion` | Photography, Animation and 3D | 7 (2 filled) |
| 3 | `graphic-design` | Graphic Design | 14 (all filled) |
| 4 | `digital-art` | Digital Drawings and Portraits | 9 (all filled) |
| 5 | `crafts` | Handmade and Bead Crafts | 8 (all filled) |

Editorial's five items sit between the posters and the packaging, so Graphic Design reads
logo → poster → print → package → storefront. The slugs were renamed to match the new titles;
nothing is published, so no URL anyone holds is broken by doing it now rather than never.

**Both of `ISSUE-038`'s photographs are placed**, which closes part 2 of that issue. They lead
category 2. Neither carried an EXIF rotation and both reduce to an exact ratio — `250/193` and
`2/3` — so neither is cropped.

#### The part that nearly shipped broken

Five files have to agree about five categories, and **every link between them is a bare string
that fails silently**:

- `PlaygroundIndex` does `if (!category) return null` — a stale slug in `home.ts` **deletes a
  whole marquee row** and renumbers the ones after it.
- A stale `nextCategorySlug` 404s the "next category" link.
- A stale `categorySlug` 404s a project.

`PlaygroundIndex.tsx` linked its featured project through the literal string
`` `/playground/3d-motion/${item.slug}` ``. The rename would have 404'd it with no type error
and no failing check. It was found by grepping for the old slugs rather than by anything the
harness does — which is the whole problem.

So `content-audit.mjs` gained a playground section: registry/`home.ts` order, title agreement,
a complete next-category ring, project categories, and **en/de `src` parity for category items**,
which `image-manifest.mjs` does not cover because it reads only `en` there.

**All five checks were proved by injecting the fault, including the real `3d-motion` one.**
`SESSION-027` shipped a bug because a check agreed with an expectation and the agreement was
taken as confirmation. A check that has only been seen to pass is not evidence.

#### The heaviest page on the site, found by looking

`verify weight` sampled the homepage and four case studies — **no playground route, ever.**
Graphic Design had just grown from 9 items to 14, so the sample list gained `/playground` and
`/playground/graphic-design`.

`/playground` came back at **1692 KB of images at 1440px/1x** — heavier than any case study, and
*heavier at desktop than at 390px/3x*, which is backwards for every other page on the site.

That tell was the answer. `ui/Image` falls back to `sizes="100vw"`, and **every playground call
site passed no `sizes`** — so a 256px marquee card claimed to fill the window and took the
1600px variant. The About carousel's fixed 240px card had the same fault. Fixed at all seven
call sites (`DECISION-024`):

| Route | Before | After |
| --- | --- | --- |
| `/playground` 1440px/1x | 1692 KB | **378 KB** |
| `/playground/graphic-design` 1440px/1x | 804 KB | **225 KB** |
| `/playground` 390px/3x | 830 KB | 808 KB |

**The mobile numbers barely moved, and that is the confirmation.** At 3x a 256px card really
does need ~768px of image, so the large variant was already correct there. Only waste went. A
change that improved both would have meant the images had got worse.

#### Verified

- routes **34/34** (down from 36 — `/playground/editorial` in both locales is gone)
- **492 images across 34 routes at dpr 1, 2 and 3** — 0 broken, 0 missing alt, 0 failed requests,
  counts identical across all three
- axe **0 violations**, overflow **0 pages**, reduced motion static
- `tsc` clean, ESLint **0 errors** (3 pre-existing warnings)
- `content-audit.mjs` clean — 6 case studies and 5 playground categories
- `image-manifest.mjs` exits 0 — **163 slots, 127 filled**

#### Left alone, deliberately

- **The marquee crops every card to `4/3`** regardless of the item's real aspect, and the
  featured cards to `16/10`. A 1200/2604 beaded planter is savagely cropped by that. It is
  pre-existing, it is the same `object-cover` fault the case studies spent three sessions
  removing, and it is a redesign of the playground index rather than a category reorder —
  so it is written up as `ISSUE-039` and not touched.
- The truncated sentence in the request.


---

<a id="session-034"></a>

### SESSION-034 — The playground becomes one page, and Chrome turns out to be an encoder

Date: 2026-09-10
Branch: `milestone-003-content-model`
Status: verified. **Nothing pushed.**

#### Two requests, in order

The session began by finishing SESSION-033's loose end — the owner's message had been cut
off mid-word. The rest of it arrived:

> "most of the images are cut and is not visible… everything is looking too colourful right
> now and the moving animation is also abit too busy"

That produced `DECISION-025`, which shipped and was verified: a uniform 3/4 box, nothing
cropped, matted in each image's own colour, and one marquee row moving at a time. **It is
committed as `cf64c51` and it was the right fix for the page as it then was.**

Then the owner changed direction:

> "i want this whole playground page to be a gally type page with bento grid type layout,
> more like journal or scrapbooking style. i dont want the user to click and land on other
> pages but everything needs to be here… try to work with original aspect ratos and sizes
> and make the bento box work."

So `DECISION-026` supersedes most of `DECISION-025` four hours later. That is not waste —
the mat sampling `DECISION-025` added is what `@/lib/tint` now uses to colour the sections,
and the crop measurements are what proved the old layout had to go.

#### What the page is now

Twelve routes became one. `/playground/:category` and `/playground/:category/:slug` are
gone; the five categories are sections, the tiles are the work at full size, and clicking a
picture opens it larger **in place** via the lightbox `DECISION-018` already built. Routes:
**34 → 22.**

Tiles keep their **own aspect ratios**, justified into rows of two, three and four by
`bentoRows` — varying the row count is what makes a bento rather than a grid.

**Nothing was deleted to make this fit.** Two pieces of content would have gone with the
pages, and both were kept: the motorbike study's reflection became a **written card** among
the pictures, and each category's "more to come" line is rendered under its run.

**A gallery shows what exists.** `DECISION-006`'s hatched placeholder was right for small
even cards; at a 430px row height it made the two empty categories into **ten enormous
hatched rectangles across two screens** — the first thing a visitor met. They are now one
line of text naming what is planned.

#### Chrome is an encoder — `DECISION-022` was too general

`DECISION-022` concluded there is **no encoder on this machine**, and `ISSUE-038` had been
open on that basis: 121 MB of craft video, unplaceable. `ffmpeg` is genuinely absent and
`avconvert` genuinely grew two of four test files.

The conclusion was right about transcoding whole films and wrong as a rule, because neither
it nor the issue asked the question a gallery asks: **a tile does not need the film. It
needs eight seconds of it, 640 pixels wide.**

`scripts/video-clip.mjs` plays the source in Chrome, draws it to a canvas at the wanted
size, and records `canvas.captureStream()` through `MediaRecorder`:

**121 MB → 1035 KB**, three clips, and `DECISION-012`'s thin toolchain is untouched.

Three things that were not obvious and are now written down:

- It records **MP4/H.264**, not WebM — Chrome 130+ can, and Safari's WebM support is
  inconsistent. Confirmed readable by AVFoundation, the best Safari proxy available here.
  `mdls` reports nothing at all for these files; **that is Spotlight's metadata extractor,
  not a playback test**, and it cost a few minutes of misplaced worry.
- The source is **served over HTTP by the script**. A canvas drawn from a `file://` video is
  tainted and `captureStream` throws.
- **The in-points were chosen by looking at frames.** `craftgift3` is a static cardboard box
  for its first fifteen seconds and only pops open at the very end. A clip from the start
  would have been six seconds of nothing.

#### Motion, honestly

The clips autoplay, muted, looping. Three rules, all measured rather than asserted:

- **Muted, with no audio track at all** — zero audio bytes decoded.
- **Nothing under `prefers-reduced-motion`**: no `<video>` element is created, so the clip is
  never fetched. A full scroll of the page made **zero mp4 requests**.
- **Nothing off screen**, and the page's motion control stops all three (three playing → none).

#### Two faults I introduced and caught by measuring

**The bento squeezed tiles to 82px at 768px wide.** Row counts are fixed at render; the
viewport is not. `SectionMedia` hit the same thing at 640px in SESSION-027 and fixed it by
raising a breakpoint — a `min-width` floor plus `flex-wrap` is the general form of that fix,
and it works at every width rather than one. Narrowest tile is now 168–176px everywhere,
overflow 0.

**The clips were under-provisioned for a phone.** Measured, a clip tile renders 328 CSS px
wide at 390px viewport — 656 physical at 2x, against a 460px clip. Re-encoded at 640 and the
posters at 720. The first pass also left two posters out of the variant map entirely,
because at 450px wide they fell under `MIN_SAVING`.

#### Verified

- routes **22/22**, `tsc` clean, ESLint 0 errors (3 pre-existing warnings)
- `content-audit.mjs` clean — and its playground half was **rewritten**: SESSION-033's ring
  and cross-file link checks are gone because the links are gone. What replaced them is the
  `en`/`de` parity `image-manifest.mjs` cannot see, plus a rule that **every clip has a
  poster** — the entire fallback for a reader with reduced motion. All proved by injecting
  the fault, including one round where a poster test passed for the wrong reason and had to
  be redone against both locales.
- `image-manifest.mjs` exits 0 — **159 slots, 129 filled**

#### The weight, measured three times before it was right

`/playground` is now the heaviest page on the site: **492 KB on landing** at 390/3x, and
**4082 KB after scrolling all 9,100 pixels of it** (2755 KB pictures, 1036 KB clips). Filed
as `ISSUE-040` — every remaining lever trades picture quality, so it is the owner's call.

Three attempts to measure it disagreed with `verify weight` in both directions before I
found why: **`scripts/lib/cdp.mjs`'s `setViewport` hardcodes `deviceScaleFactor: 1`**, so a
run labelled "390/3x" was really 390/1x and reported 662 KB against a truth of 2755 KB.
`verify weight` sets device metrics itself and had been right the whole time.

**When a hand-rolled measurement disagrees with the harness, suspect the measurement.** The
same instinct that caught the `timeout` mistake in SESSION-032 applies: I nearly wrote up a
number that would have made the page look four times lighter than it is.

The dead route `/playground/graphic-design` was also still in the weight sample, cheerfully
reporting "0 KB img, 113 KB total" — **the weight of the 404 page.** A route that stops
existing does not fail that check, it flatters it. Removed.

#### Left for the owner

- **`ISSUE-038` part 3** — `Afono/Wireframe.png` is still 14,299 × 8,794 of blank white.
- The colour question the owner deferred in SESSION-033 is answered by `@/lib/tint`, but the
  wash strength (94% toward white) is the knob most likely to want tuning.
- **The branch is 55 commits ahead of `main` and unpushed.**


---

<a id="session-035"></a>

### SESSION-035 — The playground becomes a deck of four Figma collages

Date: 2026-09-10
Objective: not from `next_session.md` — the owner arrived with a new direction for
`/playground`, twice in one session.
Decisions: `DECISION-027`
Amends: `DECISION-026` (its page shape; its picture rules stand)

#### What the owner asked

First:

> "i want to change the playground page completely… i want the title nand description in
> the middle and rest gone. https://www.tanujashastri.com/#f1 … i want a card scroll
> animation like in this website, where a user scrolls and 4 cards stack on top of each
> other. each card eshould be the full length of the viewport. each cards should also have
> the background like in the playground page. for now leave the pages mpty i just want the
> nimtion to work."

Then, having seen it work, they filled the four cards in Figma and asked for those:

> "in this figma file, in page 2, there are 4 frames where images and videos are placed in
> a layout with the assets in the image folder. use them and place then in the 4 cards"

#### What was built

**The deck** (`components/playground/CardStack.tsx`). Four `position: sticky` siblings in
one container. No JS in the stacking itself. See `DECISION-027` for the three traps —
one shared parent, stepped heights, a trailing spacer — each of which was hit before it was
understood.

**The collages** (`lib/playground/collage.ts`, `components/playground/Collage.tsx`).
Forty-eight slots traced from `Portfolio.fig` page 2, frames 1–4, holding the design's own
coordinates on its 16000 × 10000 canvas. Two layouts, chosen by a **container query on the
card's own aspect ratio**, not by a viewport breakpoint.

**Fifteen new assets**, all through the project's existing pipeline and all recorded in
`docs/reference/image_crops.json`:

| What | Out |
| --- | --- |
| `painting4.jpg` | `pg-painting-framed.webp` |
| nine `kalender/Artboard*.png` | `pg-kalender-{cover,februar,maerz,mai,juni,juli,september,oktober,dezember}.webp` |
| two screen captures | `pg-typography-posters.webp`, `pg-desmark-logo.webp` |
| a MindRuhe laptop mockup | `pg-mindruhe.webp` |
| `motorbikeVideoAnimation.mp4` | `pg-motorbike.mp4` + `pg-clip-motorbike.webp` |
| `HibiVideo/…13-16-11.mov` | `pg-hibi.mp4` + `pg-clip-hibi.webp` |

Two of these fill slots `next_session.md` had listed as **waiting for material that does
not exist**: the 3D motorbike and the Hibi application.

#### Three things measurement caught that looking did not

**`--from` was a lie on any large source.** `scripts/video-clip.mjs` served the whole file
with no `accept-ranges`, so Chrome could not seek outside what it had buffered — and it does
not buffer 151 MB to oblige. Every seek snapped back to frame zero and recorded the opening
titles. `currentTime` reads back as `0.02` when this happens; that is the tell. Fixed by
adding Range support to the script's server.

**`sips` lied about `painting4.jpg`.** It reports 4000 × 3000; Chrome decodes it as
3000 × 4000. The first render squashed a portrait painting into a landscape box. This is the
same EXIF-rotation trap SESSION-030 recorded — **the browser's decode is the only truth.**

**Equal card heights collapsed the fan.** The deck looked right for its whole travel and
then, in the last 400px before it scrolled away, slid into a single flush pile. Nothing in
the code said so; only reading `getBoundingClientRect()` at five scroll positions did.

#### Verification

`npm run verify all` against the production build: 22/22 routes, 414 images at DPR 1/2/3
with 0 broken and 0 missing alt, **axe 0 violations**, 0 horizontal overflow, reduced motion
clean. Content audit clean. Layout probed at 1920 × 1080, 1440 × 900, 1440 × 760, 820 × 1180
and 390 × 844, both locales.

`/playground` is **2630 KB** at 1440/1x — 810 KB of images and ~1.7 MB of clips that load
only as each comes on screen. It is the heaviest page on the site by some way, and that is
a deliberate trade for forty-eight pictures and five films.

#### State at the end

Twenty-two routes, `tsc` clean, lint 0 errors. `Scrapbook.tsx` and `Tile.tsx` are no longer
rendered; the category data behind them is kept and still audited.


---

<a id="session-036"></a>

### SESSION-036 — The deck gets its own hand: a raised hero, scribbles, and a viewer

Date: 2026-09-10
Objective: three changes to `/playground`, asked for immediately after SESSION-035 was
deployed.
Decisions: none new — this works inside `DECISION-027`, and extends `DECISION-018`'s
lightbox rather than adding a second one.

#### What the owner asked

> "1. the title and description in playground should be bit higher so that the half of the
> card can be visible in the hero page already. 2. in each of the cards, i want scribbles
> like in other pages of the website, for example pointing toways something, some note or
> something relatzed to those pictures. 3. when each of the image is clicked, the image or
> video needs to be expanded with a little description"

#### 1. The hero is 56svh, and that is arithmetic

The deck starts at the hero's height `H`; a card is `100svh − header − 40`. Half a card
showing before anyone scrolls wants `H = 100svh − card/2`, which is **56svh**. Measured at
1440 × 900: hero 504px, card 787px, 396px of it on screen — **50%**. In `svh` the ratio
holds at any window height, which is why it is not a pixel value.

#### 2. Scribbles

The idiom already existed twice, beside the About portrait: Caveat at a bold weight, tipped
a couple of degrees, and an arrow drawn as one cubic curve with two short strokes for the
head. `components/playground/Scribble.tsx` is that gesture lifted out rather than copied a
third time, and `down-right` is the same path mirrored — so both directions are drawn by
the same hand.

**Ten notes, two or three per card**, written next to the slots they belong with in
`collage.ts`. They are **`aria-hidden`**, like the About pair: the pictures carry their own
alt text and their own captions in the viewer, so a note adds the owner's voice, not
information a screen reader is missing.

**Anchored in the design's coordinates, sized in CSS pixels.** A note travels with the
collage, so it keeps its relationship to what it points at however the stage is contained;
the handwriting does not shrink with it, because handwriting at 14px is not handwriting.
That is also why a card narrower than 900px gets no notes — another container query on the
card, like everything else in this layout — and why the masonry shows the card's first note
in the strip beside its index, without an arrow. There is no clear space to point across a
contact sheet.

**The notes say only what is visible.** Technique and subject, not biography: "acrylic on
canvas", "one weight, no fill", "a whole year, one flower a month". The repository cannot
invent the owner's life and did not try.

##### One fault worth keeping

The right-hung notes came out **one word per line**. An absolutely positioned box shrinks to
fit the space between its `left` edge and its container's right edge, so anchoring one at
98% and sliding it back with `translateX(-100%)` gave it 2% of the stage to wrap in. Anchor
the edge you actually mean — `right: 2%` — and the explicit line breaks decide.

#### 3. Every slot opens

`ui/Lightbox` already owned the dialog: the scroll lock, the two-element focus trap, the
`z-[210]` that clears the fixed header. It learned two optional props — `video` and
`description` — rather than being duplicated. A clip plays with its controls and skips the
fit/actual-size toggle, because a film has one size and a pannable zoom would only take the
controls away from the pointer.

The description is the slot's own `alt`, and the heading its `caption`; **48 captions were
added to `collage.ts`**, 32 of them lifted from the category data that already held them in
both locales. No prose was invented.

##### The fault this one hid

`Opener` — the button wrapping each slot — was first declared **inside** `Collage`. That
makes it a new component type on every render, so opening the viewer remounted all
forty-eight buttons and the node the dialog had been told to return focus to was detached
by the time it tried. Focus landed on `body`: the one thing a dialog must not do, and
invisible unless you go looking. Hoisting `Opener` to module scope fixes it. Verified by
reading `document.activeElement` after close, for an image and for a clip.

#### Verification

`npm run verify all`: 22/22 routes, 414 images at DPR 1/2/3 with 0 broken and 0 missing
alt, **axe 0 violations**, 0 overflow, reduced motion clean. Opening, closing and focus
return probed for an image and a clip, in both layouts, in both locales.

**One flake worth recording.** The first `verify all` after the viewer landed reported
`landmark-one-main` and `page-has-heading-one` on `/playground`. Both are the signature the
harness's own header warns about — axe running against the Suspense fallback — and neither
reproduced: 0 violations from a direct probe, from `verify a11y` alone, and from two
subsequent full runs. `goto()` accepts `main` plus any `h1,h2` as proof a page has
rendered, and the layout supplies those before the route's chunk arrives. **On the heaviest
page on the site that window is now wide enough to lose a race.** Tightening `goto()` to
wait for an `h1` specifically is the fix, and it was left undone.

#### State at the end

22 routes, `tsc` clean, lint 0 errors, content audit clean. `/playground` **2633 KB** at
1440/1x. Merged to `main`, pushed and deployed.


---
<a id="session-037"></a>

## SESSION-037 — The deck arrives in black and white, and the scroll puts the colour back

Date: 2026-09-10
Objective: the owner's four-part change to `/playground`, asked for immediately after
SESSION-036.
Decisions: no new ADR at the time. `DECISION-031` was written in SESSION-038 to record where
the reveal's timing ended up.

### What the owner asked

> images black and white and the scribbles blue; the page background and grids blue-toned and
> the cards greyish; when card 1 reaches top, scrolling further reveals the colours of the
> images, randomly, one at a time, until all are revealed, then the scribbles and the grid
> turn to the accent colour; the same for all cards; and on hover an image gets bigger in
> place with a tag beside the cursor showing its name.

### What was built

**A runway per card.** Every card is now followed by 75svh of empty scroll
(`RUNWAY`, `CardStack.tsx`). Because it is a sibling spacer rather than a pin, the card lands
under the header and then nothing in the deck moves for the length of it: the next card's top
edge is still below the fold. The runway ends on the frame the next card reaches the bottom
of the viewport, so the deck starts moving again as the reveal finishes.

**One scrubbed number per card, and arithmetic for the rest.** GSAP drives `--pg-reveal` from
0 to 1 across the runway; `index.css` turns that into `--pg-sweep` (the pictures, one at a
time, against a `--pg-order` shuffled per card per visit) and `--pg-full` (the notes, the card
index and the ruling). **Fifty-eight pictures cost four scrubbed values and no React render.**
A tween per picture was the obvious build and a much worse one.

**Hover.** `.pg-piece:hover` scales 1.16 with a shadow, `.pg-slot:hover` lifts the slot over
its neighbours, and the piece's caption follows the cursor in a pill portalled to `body` —
every ancestor inside the deck is either transformed by the stacking tween or clipped by the
card's `overflow: hidden`, and `position: fixed` under either of those is not fixed to the
viewport.

### Three things that were wrong first

**The card background vanished.** Both grounds shipped as colour tokens in
`tailwind.config.ts`, and a dev server that was already running never picked the config up:
`background-color` computed to `rgba(0,0,0,0)` on the owner's screen while the built CSS was
correct. Confirmed by pointing a headless browser at the running dev server. They now live in
`index.css` as `.pg-page` and `.pg-card`, where HMR sees them.

**The colour turn was invisible.** The notes went muted blue to accent blue, which on 2px of
handwriting is a change nobody can see. Each card now leaves the blue for **its own** colour:
orange, green, black, purple, as `accent` on the card in `collage.ts`.

**Hovering a picture that had not had its turn showed it in black and white.** `.pg-piece:hover`
now sets `--pg-lit: 1`, so holding one up to the light brings its colour back out of turn and
lets it go again when the pointer leaves.

### Verification

`npm run build`, `npm run lint`, `content-audit`, `npm run verify all` green: 0 axe
violations, 0 overflow, images clean at 1x/2x/3x, reduced motion delivering finished cards.

---
<a id="session-038"></a>

## SESSION-038 — Notes that name their picture, and 159 documents that became 16

Date: 2026-09-10
Objective: four more changes to `/playground`, then the owner's fifteen-item list for the
whole site turned into documentation.
Decisions: `DECISION-028`, `DECISION-029`, `DECISION-030`, `DECISION-031`.
Issues raised: `ISSUE-041` to `ISSUE-046`.

### The playground, part two

**Notes name their picture, not their position.** Three sessions of placing scribbles by
looking at the card had produced a pattern nobody chose: a note in the top-left of every card
and another anchored at `x: 15700` in the top-right of every card, with arrows pointing at
roughly nothing. A scribble now carries a `target`, the `src` of the slot it is about, and
`lib/playground/placeScribbles.ts` works out where it can sit: every seat around that picture
at three distances, scored against the slots, the card index, the motion control and the notes
already placed, with a whole-frame sweep behind that. The first seat each note tries is seeded
from its own text, so two notes on one card start looking in different corners.

Three things cost a round each, and all three are the same lesson about scoring:

1. **The picture a note is about is an obstacle like any other.** Excluding it, on the theory
   that a note wants to sit close to its subject, put every note directly on top of its own
   picture the moment free seats were scored by nearness.
2. **Nearest free seat, not first free seat.** Taking the first free seat in the note's own
   preference order sent one note to the far corner of card 02 with a 5,600-unit arrow behind
   it, because that corner came earlier in its rotation than the gap next door.
3. **Any free seat beats every occupied one**, which is why the search is two passes and not
   one weighted score.

Seeded rather than random on purpose: the reveal order is shuffled per visit because that is a
surprise worth having twice, but a note that jumped on every reload or resize would look
unstable.

**The arrows** moved into one SVG per card drawn in the frame's own coordinates, with
`vector-effect="non-scaling-stroke"`. That is the only way a line can start at a note measured
in CSS pixels and land on a picture measured in design units.

**White cards on a dotted page.** `.pg-card` is white; the page keeps its blue and takes a
24px notebook dot grid while the cards keep the ruled one.

**A gap closed.** A `target` with a typo in it is not a type error and does not throw: it
silently becomes a note in the middle of the card pointing at nothing. `content-audit.mjs` now
checks every note against its own card's slots, and that each card's accent is a real colour.
Verified by breaking a target deliberately.

### One mistake worth recording

Undoing that deliberate break, `git checkout src/lib/playground/collage.ts` reverted **every**
change in the file: the four accent colours and all ten rewritten notes. Re-applied, and the
rebuild produced a byte-identical bundle hash, so nothing was lost. **Restore one string, not
one file, when the file is uncommitted.**

### The documentation, rebuilt

`docs/` was **159 files and 16,210 lines**. One file per issue, per decision, per session and
per milestone meant a session spent its first minutes opening directories.

It is now **16 files**. One per kind, each opening with the index table that used to be its
`index.md`, each section anchored by ID so `decisions.md#decision-016` is both a link and a
grep. Nothing was deleted except `SESSION-001` to `SESSION-028`'s full write-ups, which are
now their one-line rows: their reasoning already lives in `decisions.md` and `issues.md`,
which is where it is actually looked up.

Paths that pointed into the old directories were repointed, including the two in `scripts/`
that are read by people rather than by code. `docs/reference/` kept its data files, because
`scripts/image-manifest.mjs` **writes** one of them by path.

### `MILESTONE-010`

The owner's fifteen items, written up with the file and line for each, four owner gates
marked, and copy drafted for the three tasks that asked for it. The site's writing rules
(no em dashes, both locales, never invent a fact) are now in `README.md` rather than being
re-derived every session.

---
<a id="session-039"></a>

## SESSION-039 — The owner's list, minus the four things only they can answer

Date: 2026-09-10
Branch: `milestone-003-content-model`
Follows: SESSION-038.
Decisions: `DECISION-032` written. `DECISION-028` and `DECISION-031` amended with what shipped.
Issues: `ISSUE-041`, `ISSUE-042`, `ISSUE-046` resolved. `ISSUE-047` raised and resolved.
`ISSUE-043` partially. `ISSUE-006` lost one of its two remaining items.

### First: the previous session's work was not committed

`next_session.md` said SESSION-037 and SESSION-038 were committed to the branch. `git log`
said `HEAD` was SESSION-036's. Both sessions' work — the scroll reveal, the note placement,
and the 159-file documentation consolidation — was sitting uncommitted in the working tree.
That file also says **"check `git` before trusting any status in these files"**, which is the
only reason it was caught in the first minute rather than lost to a stray `git checkout`.

Committed as two: the playground code, then the documentation rebuild.

### `MILESTONE-010`, eleven of fifteen

Committed in three parts: group A (copy and data), tasks 3a and 12, then task 14.

**The About portrait was never a missing asset.** `image_files.md` had it as a placeholder
needing a "full-res re-export". The real photograph was in the repo at
`Images/Alexsha_Photo.png`, at **exactly** the stand-in's 1720x2150 — the placeholder had
been generated to the photograph's own dimensions and then never swapped. The page had been
showing a black rectangle where a face was meant to be.

It did not go back under the same filename, which is what `image_files.md` recommends: a
photograph as PNG is megabytes, and the base file sits in the `srcset` at its full intrinsic
width, so a 3x phone would have fetched it. It is `alexsha-portrait.webp` at 242 KB, plus
`alexsha-portrait-og.jpg` for the social card — the one image with no fallback, where WebP
support is good rather than universal.

**The WikiMind bento needed the layout to grow, not the data.** See `DECISION-032`. The
short version: a row is made of cells now, a cell can be a column, and the arithmetic reduces
exactly to `rowMetrics` when every cell holds one figure — which is the only reason it could
replace it at the call site.

Two things the milestone predicted that turned out not to be true, both worth knowing because
the milestone is still the reference for tasks 3, 13 and 15:

- **The bento does not come out square.** Both columns scale linearly with the row height, so
  the block's aspect is fixed at about 2.2:1 at any size. The arrangement is the owner's ask
  and that is what shipped.
- **The word legible in the kitchen crop was "Abbildung 26 Verschiedene Haken"**, the source
  document's own figure caption, not "Abblendung". It was on the third of three panels, so
  the crop trims horizontally rather than vertically and the figure went from 1600/495 to
  1600/743.

### Three classes that were never there

`About.tsx` was written with `mt-8.5`, `pt-6.5` and `mt-5.5`. None of them are on Tailwind's
scale and none of them were in this project's `spacing` extension, so **no CSS was generated
for any of them.** Nothing reports this: an unknown class and a class you meant to write look
identical.

It stayed invisible for as long as `about.aiLabel` sat between the rule and the paragraph.
Deleting that label put the paragraph flush against its own `border-t`, which is what showed
it. `ISSUE-047` has the one-line grep that finds the rest.

### The playground, and a third cause of `ISSUE-043`

Eight of task 14's nine parts were what they said on the tin. The ninth was not.

Note sizes were design units, which are only right at one card width; they are CSS pixels
now, and `Collage` measures the stage with a `ResizeObserver` and hands `placeScribbles` the
conversion. That fixed what `ISSUE-043` called cause 2 — and left a 78%-of-a-note overlap at
a 1180x700 window.

That one was not placement at all. **Notes are hidden below a 900px card, but they are drawn
on the stage, and the stage is `min(100cqw, 160cqh)`.** A card that is wide and short is
height-bound, so it passed a width-only query with a stage 300px narrower than itself, and
`placeScribbles` was correctly reporting that there was nowhere left to put anything. The
container query asks for the height too now. Worst overlap across five window sizes: 78% to
14%, and the 14% is a rotated bounding box brushing a corner rather than ink on a picture.

### Measured rather than assumed

Four things this session that a screenshot would have got wrong:

- **The résumé still prints to three pages** after task 12's extra air. Checked by driving
  `Page.printToPDF` on the branch and on a `git stash` of it, not by looking at the screen.
- **Hover at 1.42 does not clip.** Nothing on cards one to three reaches its card's edge;
  card four overruns by 7px.
- **The bento's columns end together** — 1px apart at 1440, 5px at 1024, 17px at 800, which
  is what `DECISION-032`'s approximation predicts.
- **The `zoomable={false}` viewer**: clicking the scroll container, the centring wrapper or
  the dialog root all close it, and clicking the image does nothing. The case-study viewer
  still opens fitted at 1297, zooms to 1600 on a click, and ignores its backdrop.

### One thing worth arguing about

`content-audit.mjs` does not check for em dashes, and there are around 100 in shipped content
— almost all of them separating a label from a name ("Calendar — March", "WikiMind —
Corporate Design"). Only one was in prose, a playground note reading "perfume — flat, then
folded", and that one is now a colon. **Whether the site rule means the separators too is the
owner's call**, and it is not one of the fifteen tasks, so nothing else was touched.
