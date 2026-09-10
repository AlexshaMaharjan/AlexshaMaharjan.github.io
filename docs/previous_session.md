# Previous Session

**SESSION-035** — 2026-09-10. Full record: `docs/sessions/session_035.md`.

## What it did

**Rebuilt the playground again** (`DECISION-027`), on the owner's new direction: a centred
title and a **deck of four cards that stack as you scroll**, after
`https://www.tanujashastri.com`. The five category sections, the contents nav, the taped
hero collage, the exploring line, the closing note and the return link are gone.

The stack is **`position: sticky`, not script** — four siblings in one container, each
stopping below the header while the next scrolls over it. GSAP only narrows a covered card
for depth, and does not run under reduced motion; the stacking still does.

**Then filled the four cards from Figma.** `Portfolio.fig` page 2 holds four 16000 × 10000
frames of pictures sorted by colour. `src/lib/playground/collage.ts` holds all 48 slots in
**the design's own coordinates**, unconverted, in the design's own paint order — so a slot
can be checked against the Figma inspector by reading it.

**Fifteen new assets** through the existing pipeline, including two that
`next_session.md` had listed as *waiting for material that does not exist*: the **3D
motorbike** and the **Hibi application**. Both were sitting in `Images/Playground` all
along.

**Merged to `main`, pushed and deployed.** This closes the item that had been the largest
single thing on the list for twenty-odd sessions: the branch was 55 commits ahead of `main`
and had never been pushed, so the live site showed none of it.

## Three faults measurement caught and looking did not

- **`--from` was a lie on any large video.** `video-clip.mjs` served files with no
  `accept-ranges`, so Chrome could not seek past what it had buffered — and it will not
  buffer 151 MB to oblige. Every seek snapped to frame zero. `currentTime` reading back as
  `0.02` is the tell. Range support added.
- **`sips` lied about `painting4.jpg`** — 4000 × 3000 stored, 3000 × 4000 decoded. The same
  EXIF trap SESSION-030 recorded. **The browser's decode is the only truth.**
- **Equal card heights collapsed the fan** in the last 400px of the deck's travel, because a
  sticky element cannot pass `parent.bottom - element.height` and that limit was one
  position for all four. Stepping the heights gives each its own.

## State

22 routes, `tsc` clean, lint 0 errors, content audit clean, `verify all` green, **axe 0
violations**. `/playground` is the heaviest page on the site at 2630 KB (810 KB images,
~1.7 MB of clips that load only as each comes on screen).

**Deployed.** `main` and `gh-pages` are current.
