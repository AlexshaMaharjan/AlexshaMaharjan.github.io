# Next session

## Status

**`MILESTONE-014` is complete.** SESSION-044 applied the owner's captions, deleted the
playground's category data, gave the image viewer next/previous, coloured the hover tag by
its card, and put the footer back to a conventional one. It opened `ISSUE-058` and closed
`ISSUE-057`.

**The branch is `milestone-003-content-model` and it is ahead of `main`.** SESSION-037 to
SESSION-040 are committed to it. **SESSION-041 to SESSION-044 are all in the working tree and
not committed** — check `git status` first, and commit them before anything else. None of it
is merged or deployed; the last deploy was SESSION-035.

**Check `git` before trusting any status in these files.** SESSION-039 opened with this file
claiming two sessions were committed when `HEAD` was three sessions old.

## Do not deploy yet: two hard blockers, both legal

Neither is a matter of taste.

1. **The Impressum has a placeholder where its postal address goes.** `/impressum` ships
   `[ Street and number ]` and `[ Postcode and city ]`, which does not satisfy § 5 DDG. The
   strings are in one place, `legal.address` in both `src/lib/dictionaries/en.ts` and `de.ts`,
   and are rendered into both the Impressum and the privacy page's controller block
   (`DECISION-046`).
2. **[`ISSUE-055`](issues.md#issue-055): the typefaces come from Google's CDN**, so every
   visitor's IP reaches Google before consent. The Datenschutzerklärung discloses it
   honestly, which is not the same as fixing it. Self-hosting six woff2 files is about 150 KB
   and removes the disclosure, the exposure and a third-party connection on every page load.
   Owner's call: it changes what ships.

```bash
git checkout main && git merge milestone-003-content-model
npm run predeploy && npm run deploy
```

## What the owner has to answer

**[`ISSUE-058`](issues.md#issue-058): the AFONO market analysis is blank for the third time.**
`Images/Afono/Market.png` is byte-identical to the previous upload and every one of its
3,607,704 pixels is opaque pure white. `Afono/Wireframe.png` is the same story at
14,299 × 8,794 (`ISSUE-038` part 3). Something in that export path drops the artwork before
writing the file. **The `[ market analysis ]` slot in `caseStudies/afono.ts` is still empty,
in both locales**, and is one good export away from being filled.

The older judgement calls, none blocking: [`ISSUE-037`](issues.md#issue-037),
[`ISSUE-035`](issues.md#issue-035), [`ISSUE-034`](issues.md#issue-034),
[`ISSUE-033`](issues.md#issue-033), [`ISSUE-032`](issues.md#issue-032),
[`ISSUE-031`](issues.md#issue-031), [`ISSUE-006`](issues.md#issue-006) (now only the designed
`og:image`), and [`ISSUE-052`](issues.md#issue-052), the 9.1 MB film.

**`MILESTONE-011` task 7 is closed by the owner's own instruction.** It wanted a second
still-life photograph for collage card 3 and the library has only one. The owner has since
said there will be no more playground images, so the card is finished as it stands.

## Real work, in order

1. **[`ISSUE-055`](issues.md#issue-055)**, if the owner says self-host. Highest priority open
   issue, about half an hour.
2. **The `og:image`** (`ISSUE-006`). A designed 1200×630 card; the portrait stands in.
3. **`ISSUE-052`**, the 9.1 MB film, if the owner wants the page lighter.
4. **`ISSUE-033`**, `/work/afono` at 2141 KB on a 3x phone across 29 figures. Lowering the
   variant ladder's quality is worth an experiment nobody has run.
5. **`ISSUE-047`'s grep**, over the whole tree rather than `src/`.
6. **[`ISSUE-053`](issues.md#issue-053)**, nine collage arrows still under 24 CSS px on
   crowded cards between 900 and 1,080px. Low priority; residue of a defect that went from
   127 cases to nine.

## What SESSION-044 changed that you might trip over

**The playground has one data file.** `lib/playground/collage.ts` holds every picture, its
caption and its alt text in both locales, on the card it is on. `lib/playground/categories/`
is gone, along with `PlaygroundItem`, `Scrapbook.tsx` and `Tile.tsx` (`DECISION-047`). If you
find a comment anywhere claiming the categories are the record of something, it is stale —
delete it.

**`content-audit.mjs`'s playground check is a different check now.** It audits the 48 collage
slots: caption and alt non-empty in both locales, every clip has a poster, every `film` has a
`video` loop, no picture on two cards. `en`/`de` parity by comparison is gone because a slot
holds both locales on one object and cannot drift.

**`image-manifest.mjs` reads the collage too**, so the playground now reports as complete
rather than as 47 unfilled slots.

**An export is checked by re-deriving it, not by its timestamp** (`DECISION-050`).
`image-treat.mjs` is deterministic: re-export every entry in `image_crops.json` and diff the
bytes. The mtime comparison SESSION-043 used missed six re-cropped images
([`ISSUE-057`](issues.md#issue-057)). Do not use the sampled mat colour as the detector — it
moved on four of the six and not on the other two.

**Three exports were deleted** with the categories: `pg-gift-explosion.webp`,
`pg-postcard-2.webp`, `pg-postcard-3.webp`, 148 KB that nothing referenced. Their sources are
untouched in `Images/`; putting one back on a card is a slot plus `npm run images`.

**`Lightbox` takes `onPrev`/`onNext`/`position`** and renders navigation only when given a
handler (`DECISION-048`). Case-study figures pass none and are unchanged. `Collage` holds an
**index** rather than a slot, and wraps.

**`Collage` takes an `accent` prop.** The cursor tag is portalled to `document.body`, so it
inherits nothing from the card and has to be told the colour (`DECISION-049`).

## What SESSION-043 changed that you might trip over

**The prerender route list is hand-written** — `scripts/prerender.mjs`, `loadRoutes()`.
Adding a route to `routes.tsx` puts it in the app and leaves it out of `sitemap.xml`,
silently. **Any new route has to be added in both places.**

**The header is one row at every width**, and `ModeSwitch` has two forms: below `md` a single
link drawn as an on/off toggle (`DECISION-042`), above it the segmented control.
`--header-h` is measured, so nothing downstream had to change — but `ISSUE-015` is what
happens if anybody writes that offset down as a number.

**`processClusters` is `ComponentType<ClusterProps>[]`**, and 04 reads `stacked`. A cluster
laid out as explicit rows has to know whether it hangs from the right edge of a map or the
left edge of a phone card.

**`branchData.ts` moved three bands and all five connectors.** The five `line` paths, the
three bands and the two alignments are one piece of geometry. The doc comment at the top has
the conversion from the owner's 1512 × 868 Figma frame.

## Read before you write a single string

**The site writing rules are in [README.md](README.md).** No em dashes, both locales or
`content-audit` fails the build, and never invent a fact to fill a gap (`DECISION-011`).

**One caveat on the em dash rule, unresolved.** `content-audit.mjs` does not check for them,
and there are around 100 in shipped content — almost all separating a label from a name
("Calendar — March", "WikiMind — Corporate Design & Website"). Whether the rule covers the
separators is the owner's call; do not mass-edit them on your own judgement.

## What SESSION-042 changed that you might trip over

**The Figma file's key is written down now** — [reference/figma.md](reference/figma.md). Two
sessions have had to go hunting for it. Page 2 is node `1:3`, and `get_metadata` with no
`nodeId` lists "Page 1" only, which makes a two-page file look like a one-page file. The
`Process` frame SESSION-043 implemented is `310:736` on that same page, and it is **1512 x
868** where the map in code is 1440 x 900 — read it as fractions, never as coordinates.

**Collage arrows are arcs, and the arc is the default** (`DECISION-039`). `scoreArrow`'s
middle term measures the distance from `BOW = 0.28`, not from straight — a straight line is
not free any more. **Which way an arrow bows is not charged for at all**, deliberately: a
mirrored arc is the same arc, so the sign is left to clearance, and that is the only thing
keeping the four cards from drawing one gesture eleven times.

**Every note carries a `prefer` now**, read off the owner's frames. If you add a note, give it
one; if you move a picture, check the corner still has room.

**`shortRun` replaced `crampedBy`, and the difference is the whole point.** A seat is priced
on **the arrow it actually draws**, measured from the routed stroke's own endpoints — not on
the gap between two rectangles, which for a diagonal seat is a completely different number. A
seat could clear the old test comfortably and draw four pixels of ink. Do not go back to
measuring boxes.

**Ring seats are clamped onto the card before they are scored.** A seat that falls off the
frame used to be priced out by the off-frame term at 40 a unit, so a picture near an edge had
no usable seats on that side at all — and the note fell back to sitting 24 units from its own
picture with the arrowhead drawn *inside the note*.

**Four constants in `placeScribbles` moved together, and they trade against each other**:
`MIN_RUN_PX` (34 → 80), `NEAR`/`FAR_SLOPE` (2600/2 → 4200/1), `PREFER_MISS` (2400 → 9000) and
`shortRun`'s weight. **Do not move one by feeling.** Every setting that lengthens an arrow
also tempts it across a photograph; sweep all 22 stage widths and four cards and watch four
numbers at once — shortest arrow, count under 34px, corner misses, worst crossing. Three
earlier sessions each fixed one of these by making another worse.

**`content-audit.mjs` has a sixth check: an arrow shorter than 12 CSS px fails the build.**
It is a ratchet set just under the 13px the deck currently draws, not a target — see
`ISSUE-053`. Checks 4 and 5 are both about *where* a stroke goes and neither can see one that
barely exists, which is how 127 of 264 placements shipped with an arrow under 34px for three
sessions.

**The process map has two connector idioms** (`DECISION-040`), and `BranchLayout.align` is
read **only on the pinned map** — the phone's column has nothing to mirror.

**The homepage's pill is the playground's** (`DECISION-041`). About has a text link under a
faded paragraph. The fade is a `mask-image`, so the text is all still in the DOM and read
aloud in full; do not "fix" it by truncating the string.

**`aboutPreview.copyDim` is real biography now**, not a signpost — it is the about page's own
third paragraph, and it is the thing that fades. If you edit it, keep it long enough to fill
three lines or the fade has nothing to work on.

## What SESSION-041 changed that you might trip over

**The process map is three bands now, not two** (`DECISION-035`). Clusters 01 and 02 lay their
contents out in one row each, which makes them *short*, which is what opened a real horizontal
band across the middle for the question. Consequences:

- **The clusters are placed by their outer edge**, 65 units in from each side of the map, so
  the four are symmetric about x = 720 by construction. Do not go back to placing them by a
  fixed `left`.
- **The connectors are one piece of geometry with the rows.** Change a cluster width or a
  row's `top` and the five `line` paths change with it. Since SESSION-042 there are two
  idioms, not one (`DECISION-040`): the **top** row leans, 124 units across and 62 up, the
  same stroke reflected; the **bottom** row is an L-shaped elbow, out along the question's
  foot and then down. All four land 287 units in from their own cluster's outer edge.
- **Widening a cluster's contents will wrap them again.** 01 fits 580 units of panels in 584
  and 02 fits 578. There is no slack.

**The step reveal is a derived schedule, not four magic numbers** (`ISSUE-048`). `STEPS_DONE`
is computed from the stagger and the durations, and `INTERACTIVE_ON` from that. **Do not type
a threshold in.** The bug this replaced was cluster 05 being written to full opacity in one
frame at the instant it was supposed to start appearing, and a typed threshold is exactly how
it happened.

**Below 880px the process canvas is a stacked column, not a scaled map** (`ISSUE-049`).
`BranchGroup` takes a `stacked` prop. The connector SVG is not rendered there at all, which is
deliberate: in that layout the question is a heading above the steps, so the strokes pointed
at nothing.

**Both modes' first screens come from one component** (`DECISION-037`). `src/components/PageHero.tsx`.
If you change a margin there you change both modes, which is the point. Three things in it are
load-bearing and are commented as such: `w-full` on the inner container, the heading's
two-line floor and the subheading's three-line floor.

**`--header-h` is 116px below `md`, not 146.** The mode switch's second row was tightened
(`MILESTONE-011` task 11). It is measured by a `ResizeObserver`, so nothing needs updating —
but if you add anything to the header, that number moves and every anchored section moves
with it.

**Playground arrows stop 22 CSS px short of the picture** (`DECISION-036`). The curl is gone,
along with `arcOf` and the `Curl` type. They are no longer *straight* — SESSION-042 made them
arcs (`DECISION-039`) — but everything below still holds. Two traps:

- **Seats are priced, not filtered.** `seatCost` charges linearly for lying on a picture and
  quadratically-but-mildly for being inside its `CLEAR` margin. The all-or-nothing version
  moved a note 8,900 units across the card when it grew by thirty units.
- **`penaltyOf` is gone.** It returned an area *divided by a thousand* plus an off-frame term,
  and the first cut of `seatCost` divided that by the note's area and got shares of 0.001
  where it wanted 0.4. Every note landed on top of its own picture. If you reintroduce a
  mixed-unit cost function, this is what it costs.

**`content-audit.mjs` sweeps stage widths, 900 to 1320 in 20px steps** (`ISSUE-051`; the
floor moved from 860 in SESSION-042). **The stage is never as wide as the window** — 1,256 at
a 1440 window, 1,278 at 1920 — so the old five-width list tested a layout that cannot occur
and missed the one every desktop gets. Do not replace the sweep with a shorter list. 900
rather than 860 because the `.collage-scribble` container query hides notes *and* arrows
below a 900px stage, so the two narrowest widths were testing a layout nobody can see.

**A note's lines must stay inside 15 characters in *both* locales.** `max-w-[15ch]` wraps them
and `sizeOf` counts the wrapped rows, so a long German line silently makes the note a row
taller and the placement solves for a box nobody wrote.

**The collage cards play `film`, not `video`** (`DECISION-038`). `video` is the eight-second
cut and is now only a fallback. `/playground` is 7,518 KB over a full scroll.

**The résumé's print rules are in `index.css` under `@media print`**, keyed on `.resume-sheet`
and four classes under it. **Nothing there changes a type size** — only spacing — and it has
about 0.15 of a page of headroom on purpose, because `break-inside: avoid` can only honour
itself by pushing a block onto the next page.

**Reset `Emulation.setEmulatedMedia` after you use it.** It persists on the Chrome target, and
a print-layout measurement left it set: the next `a11y` run reported six violations that were
the print stylesheet doing its job. The verify file already warns that two checks cannot share
one browser; this is the same hazard one level down.

## What SESSION-040 changed that you might trip over

**`placeScribbles` is a search, not a placement** (`DECISION-033`). A seat for a note is
scored partly on **what the arrow from it would lie across**, and both of the arrow's control
points are chosen by that search.

- **It costs about 4 ms a card** and it runs on resize. `stageUnits` quantises the stage
  measurement to a quarter of a design unit so a window drag does not re-run it every frame.
- **`content-audit.mjs` fails the build** if any arrow runs more than 40 CSS px over another
  picture, or is drawn outside the card at all, at any swept stage width. If you change the
  geometry and the audit goes red, the audit is right.
- **The clearance test clips segments, it does not sample points.** Point sampling missed a
  corner clip **between two samples** and reported it clear.

**A collage slot can carry two videos.** `video` is the eight-second loop and `film` is the
whole thing. Since `DECISION-038` the card plays `film` and only `ui/Lightbox` still asks for
`video`'s old role. `Lightbox` takes `loopVideo`, which is off wherever a `film` is playing.

**`scripts/verify/serve.mjs` serves `video/mp4` and answers `Range`.** It did neither, and
against that a 25-second film reports a duration of 4.77 and cannot be seeked.

**The process question sizes itself from a measurement** (`DECISION-034`). `HeroProcess` reads
the heading's width at a font size of one pixel in `measure()` and solves the end-state size
from it. Do not replace that with a `clamp()`: German is a quarter wider than English and it
is the one that sets the width. `HUB_W` and `HUB_Y` live in `branchData.ts` with the
connectors, because they are the same geometry.

## What SESSION-039 changed that you might trip over

**`ui/Lightbox` has a `zoomable` prop**, defaulting to true. The playground passes `false`:
the image opens large and centred, is not a button, and a click anywhere outside it closes.
Case studies are untouched and still zoom (`DECISION-018`). If you change the dialog's DOM,
the backdrop close keys on `event.target === event.currentTarget` at three levels.

**A justified row can hold a column of figures** (`DECISION-032`). `stackWithNext` on a
figure joins it to the next one as one cell, and `justifyCells` replaced `rowMetrics` in
`SectionMedia`. It reduces to `rowMetrics` exactly when every cell holds one figure, which is
why no other page moved — do not "simplify" that back.

**`CAPTION_PX = 30` in `justify.ts` is load-bearing.** It is what makes a stacked cell and a
single figure end on the same line. If the figcaption's type changes, that number changes.

**Note placement is measured.** `Collage` runs a `ResizeObserver` on the stage and hands
`placeScribbles` the design-units-per-CSS-pixel. The size constants in `placeScribbles` are
**CSS pixels**, not design units. Do not convert them.

**And the note's type size is no longer fixed** (SESSION-042). `placeScribbles.notePx` returns
18px at a 900px stage rising to 22 at 1,180; `Collage` publishes it as `--pg-note-px` and
`Scribble` reads it. **Those are one number with two consumers on purpose** — a note drawn at
a size `placeScribbles` did not predict is `ISSUE-043` again, a collision box smaller than the
ink that lands on the page.

**The notes' container query asks for height as well as width.** The stage is
`min(100cqw, 160cqh)`, so a wide short card has a much smaller stage than its own width — the
query is `(min-width: 900px) and (min-height: 563px)` and 563 is 900 / 1.6.

**The playground hero is 70svh from `sm` up and 58svh below it** (`MILESTONE-011` task 11), and
so is the homepage's, because both come from `PageHero`. The homepage's *pinned* canvas is the
only thing that depends on 70svh and that layout does not exist below 880px.

## Things worth knowing before touching the playground

**`collage.ts` is the page.** `categories/` is kept, still audited, and no longer rendered.

**Coordinates are the design's own** — Figma pixels on a 16000 × 10000 frame. Do not convert
them on the way in; `Collage.tsx` converts.

**The two layouts are switched by a container query on the card**, in `index.css`, not by a
breakpoint. The card carries `container-type: size`; the stage's `min(100cqw, 160cqh)` is
measured against it. Change one and check the other.

**The deck's geometry has four traps** (`DECISION-027`): one shared parent, stepped heights, a
trailing spacer, and a `RUNWAY` spacer after every card. Read the decision before changing
`PEEK`, `GAP`, `RUNWAY` or a height.

**The reveal is one number per card, and CSS does the rest.** `CardStack` scrubs `--pg-reveal`
from 0 to 1 across each card's runway; `index.css` turns that into `--pg-sweep` (the pictures
coming back to colour, one at a time, in an order shuffled per visit in `Collage.tsx`) and
`--pg-full` (the notes, the card index and the ruling turning that card's colour, now from
the start of the runway to 60% of it — `DECISION-031`).
**Nothing here is a per-picture tween** — 58 scrubbed filters would be, and the whole point of
the arithmetic is that they are not. A missing `--pg-order` or `--pg-steps` makes the `filter`
invalid at computed-value time and freezes a picture wherever it was.

**Card one has an entrance and the rest do not.** `GROW` is `SHRINK` run backwards on
`panels[0]` only. The two cannot collide: the shrink is triggered by the *next* card reaching
the bottom of the viewport, which is a runway plus a card height away.

**The runway is measured off the runway element, not off `innerHeight`.** `svh` and
`innerHeight` are different numbers on a phone, and the reveal has to finish on the frame the
next card's top edge reaches the bottom of the viewport.

**A note names its picture; nothing places one by hand.** `collage.ts` gives a scribble a
`target` (a slot `src`) and `lib/playground/placeScribbles.ts` works out where it goes. Three
rules that cost a round each:

1. **The picture a note is about is an obstacle like any other.** Excluding it put every note
   on top of its own picture.
2. **Nearest free seat, not first free seat.** First-free sent a note to the far corner with a
   5,600-unit arrow behind it.
3. **Any free seat beats every occupied one**, which is why it is two passes and not one score.

The placement is seeded from the note's own text, so it is stable across reloads and resizes,
unlike the reveal order, which is deliberately shuffled per visit. The seed now decides only
which of the eight directions a note starts looking in, and its rotation — **no arrow is
seeded any more.** The sentence that used to be here said "the same seed decides which arrows
curl", and there has been no curl since `DECISION-036`.

**The arrows are one SVG per card in the frame's own coordinates**, with
`vector-effect="non-scaling-stroke"` so a 2.2px pen stays 2.2px at any scale.

**The page is dotted, the cards are ruled, and the cards are white.** Two different patterns
on purpose: the page is the desk the deck lies on. `dotBackground` and `gridBackground` are
both in `gridBackground.ts`. The card ruling was lightened in SESSION-039; at full reveal a
second grid in the card's own colour is painted over it, so **judge the lit card, not the
resting one.**

**The playground's two grounds are in `index.css`, not in `tailwind.config.ts`**, and that is
deliberate. They shipped as colour tokens first and both came out **transparent** on a dev
server that was already running: a Tailwind config change is not always picked up by a live
server, and the page lost its background without anything looking wrong in the diff.

**Each card leaves the blue for its own colour**: orange, green, black, purple, as `accent` on
the card in `collage.ts`. It was accent-blue for all four first, and **a blue note turning a
slightly different blue is a change nobody can see.**

**Never declare a component inside another component.** `Opener` was, and opening the viewer
remounted all 48 slot buttons, detaching the node focus was meant to return to. Check
`document.activeElement` after closing a dialog; nothing else shows this.

## Clips

```bash
node scripts/video-clip.mjs <src.mp4> public/videos/<name>.mp4 --from 38 --seconds 8 --width 640
```

**`--from 0` hangs.** Use `--from 0.04`: the script waits on a `seeked` event and assigning
`currentTime = 0` to a video already at zero is not a seek. **Recording is real time**, so a
142-second film takes 142 seconds, and asking for more `--seconds` than the source has records
its frozen last frame.

**Choose the in-point by looking at frames, not by guessing**, and **check `currentTime` reads
back as the value you asked for** — a seek that silently fails records the opening titles.
Every clip needs a poster (`content-audit.mjs` enforces it): under `prefers-reduced-motion` no
`<video>` is created at all.

**`sips` reports stored pixels and misses EXIF rotation.** `image-treat.mjs` prints the decoded
size as `from WxH` — read it.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** A documentation's own sources page has twice said
materially more than `image_sources.md`'s row summarising it. **Read the page, every time.**

**Look at the image before you crop it.** SESSION-039's kitchen re-crop was described in
`MILESTONE-010` as removing "a second image above it" and the word "Abblendung". Neither was
right: there were three panels side by side and the word was "Abbildung 26 Verschiedene
Haken". The instruction's *intent* was right and its details were not.

**A supplied folder outranks the manifest.** Match slots to artefacts, not the reverse.

**Declare `sizes` at every call site** (`DECISION-024`). `ui/Image` falls back to `100vw`.

**Restore one string, not one file.** `git checkout <file>` on an uncommitted file reverts
everything in it. SESSION-038 lost an hour of edits to `collage.ts` that way.

## The harness

```bash
npm run build && npm run prerender
node scripts/verify/serve.mjs dist 8099 &     # start this BEFORE any verify subcommand
npm run verify                                 # routes, images, a11y, weight
node scripts/content-audit.mjs                 # language, block shape, playground parity,
                                               # collage note targets
node scripts/image-manifest.mjs                # slot counts, en/de src parity
npm run images                                 # after ANY image change; --check gates deploy
```

**Run one check at a time, and never rebuild while one is running.**

Several `scripts/` need a Chrome you start yourself — `image-treat`, `image-variants`,
`video-clip`, `verify`. The command is in [reference/handbook.md](reference/handbook.md):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/cdp-9333 \
  --no-first-run --disable-gpu about:blank &
```

**Drive the page rather than photographing it.** `scripts/lib/cdp.mjs` gives you `connect`,
`evaluate`, `coldGoto` and `setViewport` in four lines, and SESSION-039 used it to settle the
résumé's page count, the bento's alignment, the hover overflow and the viewer's close
behaviour — none of which a screenshot answers. Note that React batches: a `.click()` followed
by a synchronous read will tell you nothing changed.

The dev server binds IPv6 only. Use `http://localhost:4000`, not `127.0.0.1`.
