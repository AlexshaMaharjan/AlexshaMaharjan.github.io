# Next session

## Status

**`docs/` was rebuilt in SESSION-038.** It was 159 files; it is 16. One file per kind, index
table at the top of each, every section anchored by ID. Read [README.md](README.md) once
before anything else if this is your first session under the new layout.

**The branch is `milestone-003-content-model` and it is ahead of `main`.** SESSION-037 and
SESSION-038 are committed to it but **not merged and not deployed**. The last deploy was
SESSION-035.

```bash
git checkout main && git merge milestone-003-content-model
npm run predeploy && npm run deploy
```

**Check `git` before trusting any status in these files.**

## The objective

**[`MILESTONE-010`](milestones.md#milestone-010) — the owner's pass over the whole site.**

Fifteen changes the owner asked for in one message: the homepage hero, the process canvas,
the About page and its landing-page preview, three case studies, the résumé, the navigation
and the playground. They are independent of each other and can be done in any order.

**Do the eleven tasks that need nobody first.** Four have an owner gate and are marked
**OWNER** in the milestone; bring those to the owner with something on screen rather than a
question in the abstract.

Suggested order:

1. **Group A, copy and data** (tasks 1, 2, 4, 5, 6, 7, 8, 9, 10, 11). One sitting. Mostly
   `src/lib/dictionaries/` and `src/lib/caseStudies/`. Task 6, the About page, is the biggest.
2. **Group B, layout** (tasks 12, 13). Needs a browser.
3. **Group C, the playground** (tasks 14, 15). The largest, and task 15 needs a measurement
   before any encoding.

## Read before you write a single string

**The site writing rules are in [README.md](README.md).** Short version: **no em dashes
anywhere on the website**, both locales or `content-audit` fails the build, and never invent
a fact to fill a gap (`DECISION-011`).

The owner's copy is supplied as substance, not as final wording. Refine it into something a
person would say. `MILESTONE-010` already has drafts for tasks 1, 5 and 6.

## What needs the owner, not work

Four gates inside `MILESTONE-010`:

1. **The hero title** (`DECISION-028`). Four candidates, "Design that listens." recommended.
2. **The process spacing** (task 3b). The connectors do not get redrawn until the owner has
   seen the new cluster positions. This is the owner's own instruction and redrawing them
   twice is the expensive way round.
3. **The case-study hover affordance** (`DECISION-029`). Not a scale: a figure in a justified
   row cannot grow without breaking the row. Shadow lift recommended.
4. **Clip length against page weight** (`DECISION-030`). `/playground` is already 2.6 MB.

And one blank the owner left open: **the distance from Nepal to Germany**, `[ N ]` in the new
About biography. They wrote "fly () km away" with the number missing. Do not fill it in.

Still open from before, all provenance or judgement, none blocking:
[`ISSUE-038`](issues.md#issue-038) part 3 (`Afono/Wireframe.png` is 14,299 × 8,794 and
entirely white), [`ISSUE-037`](issues.md#issue-037), [`ISSUE-035`](issues.md#issue-035),
[`ISSUE-034`](issues.md#issue-034), [`ISSUE-033`](issues.md#issue-033),
[`ISSUE-032`](issues.md#issue-032), [`ISSUE-031`](issues.md#issue-031),
[`ISSUE-006`](issues.md#issue-006).

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
`--pg-full` (the notes, the card index and the ruling turning that card's colour).
**Nothing here is a per-picture tween** — 58 scrubbed filters would be, and the whole point of
the arithmetic is that they are not. A missing `--pg-order` or `--pg-steps` makes the `filter`
invalid at computed-value time and freezes a picture wherever it was.

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
unlike the reveal order, which is deliberately shuffled per visit.

**Notes are sized in CSS pixels over a stage that is not**, and hidden below 900px of card
width. The size estimates in `placeScribbles` are design units at ~12.7 to the CSS pixel; they
are collision heuristics, not layout, and [`ISSUE-043`](issues.md#issue-043) is what that
approximation costs.

**The arrows are one SVG per card in the frame's own coordinates**, with
`vector-effect="non-scaling-stroke"` so a 2.2px pen stays 2.2px at any scale.

**The page is dotted, the cards are ruled, and the cards are white.** Two different patterns
on purpose: the page is the desk the deck lies on. `dotBackground` and `gridBackground` are
both in `gridBackground.ts`.

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

**Choose the in-point by looking at frames, not by guessing**, and **check `currentTime` reads
back as the value you asked for** — a seek that silently fails records the opening titles.
Every clip needs a poster (`content-audit.mjs` enforces it): under `prefers-reduced-motion` no
`<video>` is created at all.

**`sips` reports stored pixels and misses EXIF rotation.** `image-treat.mjs` prints the decoded
size as `from WxH` — read it.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** A documentation's own sources page has twice said
materially more than `image_sources.md`'s row summarising it. **Read the page, every time.**

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

The dev server binds IPv6 only. Use `http://localhost:4000`, not `127.0.0.1`.
