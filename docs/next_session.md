# Next session

## Status

**`MILESTONE-010` is complete.** The owner answered all four gates on 2026-09-11 and
SESSION-040 closed them, along with `ISSUE-043`, `ISSUE-044` and `ISSUE-045` — the last three
defects on the tracker. Everything still open is a provenance or judgement call for the owner.

**The branch is `milestone-003-content-model` and it is ahead of `main`.** SESSION-037 to
SESSION-040 are committed to it but **not merged and not deployed**. The last deploy was
SESSION-035.

```bash
git checkout main && git merge milestone-003-content-model
npm run predeploy && npm run deploy
```

**Check `git` before trusting any status in these files.** SESSION-039 opened with this file
claiming two sessions were committed when `HEAD` was three sessions old.

**Do not deploy without asking.** The live-facing copy has no placeholders left in it — the
biography's `[ N ]` is 6,570 kilometres now — but the deploy is still the owner's call.

## What the owner has to answer

**Nothing is blocking.** These are the judgement calls that have been open for a while, none
of which stops any work:

[`ISSUE-038`](issues.md#issue-038) part 3 (`Afono/Wireframe.png` is 14,299 × 8,794 and
entirely white), [`ISSUE-037`](issues.md#issue-037), [`ISSUE-035`](issues.md#issue-035),
[`ISSUE-034`](issues.md#issue-034), [`ISSUE-033`](issues.md#issue-033),
[`ISSUE-032`](issues.md#issue-032), [`ISSUE-031`](issues.md#issue-031),
[`ISSUE-006`](issues.md#issue-006) (now only the designed `og:image` card).

**Two things SESSION-040 changed that the owner has not seen**, and should:

1. **The process canvas.** They authorised 3b and 3c without a review round. The question is
   on one line and the five clusters and connectors moved to suit — and **it cost the question
   some size**: `DECISION-034` sets out why 480 units is what the map affords and why the
   connectors are 72 units rather than 150. If they want a bigger question, something else has
   to give, and the decision says what.

2. **In the reduced-motion and mobile process layout the connectors point at nothing**,
   because there the question is a heading above the map rather than in it. That was equally
   true before SESSION-040 and was deliberately left alone. It is a real thing to fix if the
   owner cares about that view.

## Real work, in order

1. **The `og:image`** (`ISSUE-006`). A designed 1200×630 card. The portrait is standing in for
   it, which is better than the blank rectangle it replaced and is not the answer.
2. **`ISSUE-033`**, `/work/afono` at 2141 KB on a 3x phone across 29 figures. Lowering the
   variant ladder's quality is worth an experiment, and nobody has run it.
3. **`ISSUE-047`'s grep**, run over the whole tree rather than `src/`. Three dead spacing
   classes were found in one file; nothing proves they were the only ones.

## Read before you write a single string

**The site writing rules are in [README.md](README.md).** No em dashes, both locales or
`content-audit` fails the build, and never invent a fact to fill a gap (`DECISION-011`).

**One caveat on the em dash rule, unresolved.** `content-audit.mjs` does not check for them,
and there are around 100 in shipped content — almost all separating a label from a name
("Calendar — March", "WikiMind — Corporate Design & Website"). SESSION-039 changed only the
one that was in prose. Whether the rule covers the separators is the owner's call; do not
mass-edit them on your own judgement.

## What SESSION-040 changed that you might trip over

**`placeScribbles` is a search now, not a placement** (`DECISION-033`). A seat for a note is
scored partly on **what the arrow from it would lie across**, and both of the arrow's control
points are chosen by that search. Three consequences:

- **It costs about 4 ms a card**, up from under 1, and it runs on resize. `stageUnits`
  quantises the stage measurement to a quarter of a design unit so a window drag does not
  re-run it every frame. Do not make that finer without re-measuring.
- **`content-audit.mjs` fails the build** if any arrow runs more than 40 CSS px over another
  picture, or is drawn outside the card at all, at any of five stage widths. If you change the
  geometry and the audit goes red, the audit is right — this issue has been "fixed" twice by
  looking at one card at one width.
- **The clearance test clips segments, it does not sample points.** Point sampling missed a
  corner clip **between two samples** and reported it clear. Adding samples only shrinks the
  crossing it can miss.

**A collage slot can carry two videos.** `video` is the eight-second loop the collage plays;
`film` is the whole thing and only `ui/Lightbox` asks for it (`DECISION-030`). `Lightbox`
takes `loopVideo`, which is off wherever a `film` is playing.

**`scripts/verify/serve.mjs` serves `video/mp4` and answers `Range` now.** It did neither, and
against that a 25-second film reports a duration of 4.77 and cannot be seeked. If you see
that, check the server before the file.

**The process question sizes itself from a measurement.** `HeroProcess` reads the heading's
width at a font size of one pixel in `measure()` and solves the end-state size from it. Do not
replace that with a `clamp()`: German is a quarter wider than English and it is the one that
sets the width. `HUB_W` and `HUB_Y` live in `branchData.ts` with the connectors, because they
are the same geometry.

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

**Note placement is now measured.** `Collage` runs a `ResizeObserver` on the stage and hands
`placeScribbles` the design-units-per-CSS-pixel. The size constants in `placeScribbles` are
**CSS pixels** now, not design units. Do not convert them.

**The notes' container query asks for height as well as width.** The stage is
`min(100cqw, 160cqh)`, so a wide short card has a much smaller stage than its own width — the
query is `(min-width: 900px) and (min-height: 563px)` and 563 is 900 / 1.6.

**Three spacing values were added to `tailwind.config.ts`**: `5.5`, `6.5`, `8.5`. They were
already being used and were producing nothing.

**The playground hero is 70svh**, matching the homepage's pinned process canvas. That means
about a third of the first card shows at rest, not half — SESSION-036's arithmetic no longer
describes the page.

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
unlike the reveal order, which is deliberately shuffled per visit. The same seed decides which
arrows curl; short ones do not get one, because at a proportional radius a 970-unit arrow was
drawn a ten-pixel blob.

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
