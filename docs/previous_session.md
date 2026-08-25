# Previous Session

**SESSION-019** — 2026-08-25 — `MILESTONE-005` / `SUGGESTION-012` — Complete
Full record: `docs/sessions/session_019.md`.

## What changed

**The responsive image pipeline is in, with no new dependency.**
`scripts/image-variants.mjs` writes width variants **beside** the originals in
`public/images/`, so not one `src` string moved — the risk `SUGGESTION-012` itself listed.
`ui/Image` builds a `srcset` from the generated `src/lib/imageVariants.ts`; anything not
listed there renders as a plain `<img>`.

**WikiMind's figures: 12 of its 15 empty slots.** 136 slots, **30 filled**, up from 18.

## What this constrains — read before touching images

- **`predeploy` runs `node scripts/image-variants.mjs --check` and refuses to build if the
  map is stale.** This is not fussiness: a variant listed but missing is a 404 *inside* a
  `srcset`, which a browser hides completely. After adding or recutting any image, run
  `npm run images`.
- **`sizes` must describe where the image renders, not the viewport.** A bento tile is a
  fraction of a 1120px grid; a hero is a 960px reading column (`DECISION-017`); a figure is
  a column, a half or a third.
- **Measure at 2x and 3x, never only at 1x.** `index.css` collapses the bento to one 520px
  column below 881px, so a four-of-ten tile is full width on a phone. Describing it as
  `40vw` told a 3x screen it needed 515px when it needed 1050 — a soft image on the most
  likely first device, and completely invisible at 1x.
- **Aspect may be changed to fit the figure**, and twice was: the colour-and-type page is
  6/5 and the hand-drawn logo 27/10. Forcing them into the slot's assumed 4/3 cut them in half.
- **`DECISION-016` bit again.** WikiMind's moodboard is stock photography and its
  documentation is one of the two with no sources page, so it stays a placeholder; and every
  persona crop starts to the right of an unattributed stock portrait.

## Weight

Imagery per page load, uncached — the honest reading is that the big saving is at 1x, and at
high DPR the win is smaller because the device genuinely needs the pixels, but it now gets
the right ones:

| | before | 1x | 2x | 3x |
| --- | --- | --- | --- | --- |
| 1440px homepage | 203 KB | **85** | 192 | — |
| 390px homepage | 203 KB | **52** | 161 | 184 |

## What did not change

`og:image` is still missing and is still **not a crop** — a designed 1200×630 card. Five case
studies' figures remain (106 slots). The 14 orphaned PNGs still ship. Nothing pushed.
