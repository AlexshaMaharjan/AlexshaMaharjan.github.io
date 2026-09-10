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
(`DECISION-027`), traced from `Portfolio.fig` page 2, with hand-written notes over them and
a viewer on every slot as of SESSION-036.

## The objective

**None set.** SESSION-036 finished the three things the owner asked for after the deploy —
the raised hero, the scribbles and the click-to-expand viewer — and the site is deployed and
current. **Ask what they want next before proposing anything.**

Two things this branch of work left deliberately open, both cheap and both worth raising:

1. **The descriptions in the viewer are each slot's `alt`.** That is accurate and it is not
   the owner's voice. If they want a sentence per piece — what it was for, what it was made
   with — that is 48 short paragraphs in two locales and it is copy only they can write. A
   `description` field beside `caption` in `collage.ts` is where it goes; the viewer already
   renders it.
2. **`goto()` in `scripts/verify/run.mjs` accepts `main` plus any `h1,h2`** as proof a route
   has rendered, and the layout supplies both before the route's lazy chunk arrives. On
   `/playground` — now the heaviest page on the site — that window is wide enough to lose a
   race: one `verify all` reported `landmark-one-main` and `page-has-heading-one` there and
   four subsequent runs did not. **Wait for an `h1` specifically.**

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

**The hero's height is arithmetic, not taste.** 56svh is what puts half a card on screen at
rest — `100svh − card/2`, where a card is `100svh − header − 40`. Change one and recompute
the other.

**Notes are anchored in design coordinates and sized in CSS pixels**, and hidden below 900px
of card width. A right-hung note must be anchored with `right`, not `left` plus a translate,
or it wraps one word per line.

**Never declare a component inside another component.** `Opener` was, and opening the viewer
remounted all 48 slot buttons, detaching the node focus was meant to return to. Check
`document.activeElement` after closing a dialog — nothing else shows this.

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
