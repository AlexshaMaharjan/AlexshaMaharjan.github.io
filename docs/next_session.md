# Next Session

## Status

**The branch is merged, pushed and deployed** (SESSION-035). The twenty-odd-session gap
between the repository and the live site — the largest single item on this list since
SESSION-014 — is closed. **Check `git` before trusting any status in these files.**

```bash
git checkout main && git merge milestone-003-content-model
npm run predeploy && npm run deploy
```

**159 image slots, 131 filled.** Six case studies complete on the owner's own exports. The
playground is **a title and a deck of four stacking collage cards** as of SESSION-035
(`DECISION-027`), traced from `Portfolio.fig` page 2.

## The objective: three things the owner asked for next

Given in one message, at the end of SESSION-035, immediately after asking for the deploy:

> "1. the title and description in playground should be bit higher so that the half of the
> card can be visible in the hero page already.
> 2. in each of the cards, i want scribbles like in other pages of the website, for example
> pointing toways something, some note or something relatzed to those pictures.
> 3. when each of the image is clicked, the image or video needs to be expanded with a
> little description"

### 1. Raise the hero

Arithmetic, not taste. The deck starts at the hero's height `H`; a card is
`100svh − header − 40`. Half a card visible at rest means `H ≈ 100svh − C/2` — about
**56svh** at 1440 × 900. `PlaygroundIndex.tsx` currently sets
`min-h-[calc(100svh_-_var(--header-h))]`.

### 2. Scribbles

**The idiom already exists** — `src/pages/About.tsx` lines 54–79: `font-hand` (Caveat) at
25–28px bold, `[transform:rotate(±3deg)]`, and a hand-drawn SVG arrow (one cubic curve plus
two short strokes for the head). Lift it into a reusable component rather than copying it a
third time.

A scribble must be **positioned against a slot, not against the card**, or it will drift
from what it points at when the collage is contained at a different scale. Both locales,
and `aria-hidden` — the About ones are decorative and these are too.

### 3. Click to expand

`ui/Lightbox.tsx` already does this for case-study figures (`DECISION-018`) — portalled to
`body` at `z-[210]`, fitted/actual-size toggle, two-element focus trap, Escape to close. It
takes `src`, `alt`, `caption`. It needs **video** and **a longer description**, and the
description has to be written per slot in both locales — 48 of them. That is the real cost
of item 3, and it is copy the repository cannot invent: **ask the owner whether they want
to write them, or whether a one-line caption derived from the existing `alt` is enough for
now.**

## What needs the owner, not work

1. **`ISSUE-038` part 3** — `Afono/Wireframe.png` is 14,299 × 8,794 and entirely white.
2. **`ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`,
   `ISSUE-006`** — provenance judgements, a weight trade-off, one word of copy, and a
   portrait plus a designed `og:image` card.

## Empty slots, and what they are waiting for

**Do not invent work to fill these.** SESSION-035 filled two of them (the 3D motorbike and
Hibi) from material that was in `Images/Playground` the whole time — **look in the folder
before believing this list.**

- **Games and Applications** — Hibi is now placed as a clip on card 1. A Unity game and a
  NetBeans planner remain.
- **Photography, Animation and 3D** — the motorbike is placed on card 3. Blender, Unreal
  and After Effects remain.
- **QIS Portal — 6 of 14**, About — 8 of 9 including the portrait, the kitchen's textured
  render, WikiMind's `[ interface detail ]`.

## Things worth knowing before touching the playground

**`collage.ts` is the page.** `categories/` is kept, still audited, and no longer rendered.

**Coordinates are the design's own** — Figma pixels on a 16000 × 10000 frame. Do not
convert them on the way in; `Collage.tsx` converts.

**The two layouts are switched by a container query on the card**, in `index.css`, not by a
breakpoint. The card carries `container-type: size`; the stage's `min(100cqw, 160cqh)` is
measured against it. Change one and check the other.

**The deck's geometry has three traps** (`DECISION-027`): one shared parent, stepped
heights, a trailing spacer. Read the decision before changing `PEEK`, `GAP` or a height.

**Clips.**

```bash
node scripts/video-clip.mjs <src.mp4> public/videos/<name>.mp4 --from 38 --seconds 8 --width 640
```

**Choose the in-point by looking at frames, not by guessing**, and **check `currentTime`
reads back as the value you asked for** — a seek that silently fails records the opening
titles. Every clip needs a poster (`content-audit.mjs` enforces it): under
`prefers-reduced-motion` no `<video>` is created at all.

**`sips` reports stored pixels and misses EXIF rotation.** `image-treat.mjs` prints the
decoded size as `from WxH` — read it.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** A documentation's own sources page has twice
said materially more than `image_sources.md`'s row summarising it. **Read the page, every
time.**

**A supplied folder outranks the manifest.** Match slots to artefacts, not the reverse.

**Declare `sizes` at every call site** (`DECISION-024`). `ui/Image` falls back to `100vw`.

## The harness

```bash
npm run build && npm run prerender
node scripts/verify/serve.mjs dist 8099 &     # start this BEFORE any verify subcommand
npm run verify                                 # routes, images, a11y, weight
node scripts/content-audit.mjs                 # language, block shape, playground parity
node scripts/image-manifest.mjs                # slot counts, en/de src parity
npm run images                                 # after ANY image change; --check gates deploy
```

**Run one check at a time, and never rebuild while one is running.**

**`timeout` does not exist on macOS.** A command that fails to start looks exactly like the
command failing.

**`docs/reference/image_manifest.md` is stale** and was left that way in SESSION-035:
regenerating it produces a 172-line diff of *unrelated* drift from SESSION-031's work grid,
and it does not know about `collage.ts` at all. Teaching `image-manifest.mjs` to read the
collage is a small job worth doing before trusting its counts again.
