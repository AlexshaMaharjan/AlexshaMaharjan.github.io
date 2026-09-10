# Next Session

## Status

**Read this first: the branch is 55 commits ahead of `main` and has never been pushed.**
The live site shows none of the last twenty-odd sessions. **That gap is the largest single
thing on this list.** Say so plainly to the owner before proposing anything else. **Check
`git` before trusting any status in these files.**

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

**159 image slots, 129 filled.** Six case studies complete on the owner's own exports. The
playground is **one scrapbook page** as of SESSION-034 (`DECISION-026`) — 22 routes, down
from 34.

## What the owner has not yet seen

SESSION-034 rebuilt the playground twice in one session, because the owner changed direction
mid-way and was right to. **Nothing since `cf64c51` has been looked at by them.** Before
starting anything new, ask what they think of:

- the **bento rows at true aspect ratios** — nothing is cropped or boxed any more
- the **three autoplaying clips** in Handmade and Bead Crafts
- the **section colour** (`@/lib/tint`), averaged from each category's own pictures and mixed
  94% toward white. **This is the knob most likely to want tuning** — the owner deferred the
  colour question in SESSION-033 and has not answered it since.
- the **empty categories reduced to one line** of "still to come" text rather than hatched
  cards. This narrows `DECISION-006` and they should agree with it.

## What needs the owner, not work

1. **`ISSUE-038` part 3** — `Afono/Wireframe.png` is 14,299 × 8,794 and entirely white.
   Re-export it if a real wireframe board exists.
2. **`ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`,
   `ISSUE-006`** — provenance judgements, a weight trade-off, one word of copy, and a
   portrait plus a designed `og:image` card.

## Empty slots, and what they are waiting for

**Do not invent work to fill these.** Each needs material that does not exist yet. They now
render as a line of text rather than a hatched card, so an empty category costs three lines
instead of two screens.

- **Games and Applications — 5, none filled.** Category 1 by the owner's explicit choice
  (`DECISION-023`). A Unity game, Hibi, a NetBeans planner.
- **Photography, Animation and 3D — 5 of 7 empty.** The two photographs landed in
  SESSION-033; the 3D and motion slots have nothing.
- **QIS Portal — 6 of 14**, About — 8 of 9 including the portrait, the kitchen's textured
  render, WikiMind's `[ interface detail ]`.

## Things worth knowing before touching the playground

**Clips.** `scripts/video-clip.mjs` makes one: it plays a source in Chrome, draws it to a
canvas at the wanted size and records `canvas.captureStream()`. `DECISION-022` said there is
no encoder on this machine; that was true of `ffmpeg` and `avconvert` and **wrong as a
rule**. 121 MB of craft video became 1035 KB this way.

```bash
node scripts/video-clip.mjs <src.mp4> public/videos/<name>.mp4 --from 14 --seconds 8 --width 640
```

**Choose the in-point by looking at frames, not by guessing.** `craftgift3` is a static box
for its first fifteen seconds.

**Every clip needs a poster** (`src`), and `content-audit.mjs` enforces it: under
`prefers-reduced-motion` no `<video>` is created at all, so the poster is the entire
fallback.

**A tile keeps its own aspect ratio.** Nothing on the playground is cropped or letterboxed
any more. If a row looks wrong at some width, the fix is the `min-width` floor in
`Scrapbook.tsx`, not a crop — row counts are fixed at render and the viewport is not.

## Read this before cutting anything

**`DECISION-016` and both its amendments.** A documentation's own sources page has twice
said materially more than `image_sources.md`'s row summarising it. **Read the page, every
time.**

**A supplied folder outranks the manifest.** Match slots to artefacts, not the reverse.

**Open every image before mapping it**, and **measure the aspect as the browser decodes it**
— `sips` reports stored pixels and misses EXIF rotation.

**Declare `sizes` at every call site** (`DECISION-024`). `ui/Image` falls back to `100vw`,
which is a claim that the image fills the window.

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

**A check that has only ever been seen to pass is not evidence.** Every check in
`content-audit.mjs` was proved by re-injecting the fault it exists to catch. In SESSION-034
one of them passed *for the wrong reason* — a poster test that was actually caught by the
locale-parity test — and had to be redone. Break it in the exact way you mean.
