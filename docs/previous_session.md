# Previous Session

**SESSION-028** — 2026-09-08. Full record: `docs/sessions/session_028.md`.

## What it did

No new folders had arrived, so no case-study figure work was possible and none was invented. What
was available is the one item the hand-off named: **the homepage was the last surface still
running entirely on PDF page crops**, while four case studies had moved to the owner's own
exports.

**Five bento tiles were re-cut** — both WikiMind, AFONO brand, both Sync FM. All five pass
`image-treat.mjs`'s contrast ceiling, which is what keeps the white tile text legible.

## The thing worth carrying forward

**The hand-off's own premise was wrong, and one grid overlay showed it.**

It said to re-cut Surugami's two tiles because `Images/Surugami/` "now holds sharper sources for
both". It does not. A tile needs one element **at the tile's aspect and at least its export
width** — `tile-surugami-brand` needs 900 × 647. A decile grid over `Poster.png` (2518 × 1824)
gives the real numbers:

| Element | Pixels |
| --- | --- |
| Stairwell photo | 944 × 465 — too short |
| Corridor poster | 491 × 684 — too narrow |
| Outdoor banner | 964 × 274 — too short |

**A supplied board is a composite.** Its total resolution is high, but each element inside it is
only 400–1000px, and a PDF page rendered at scale 4–6 gives *more* pixels per element. Re-cutting
would have upscaled — a visible downgrade done in the name of an upgrade.

**A supplied export beats a page render for a figure, and often loses to it for a tile.** A figure
shows the whole board; a tile shows one thing inside it. The same test ruled out
`tile-afono-graphic`. Recorded in `image_sources.md` so nobody re-tests it.

## What the contrast check does not do

**Two crops passed the contrast check and were still wrong**, and both were found by looking at
the rendered grid rather than at the numbers. Sync FM's first crop clipped the phones top and
bottom. AFONO's *second* crop was worse than its first — narrowing `x` to isolate the red block
clipped the lockups horizontally, because they span the full width of the source. Reverted.

The check measures luminance in two bands. It has no opinion about composition and was never
meant to.

## Verified

Production build: routes 36/36; 196 images across 36 routes at dpr 1, 2 and 3, 0 broken, 0 missing
`alt`, 0 failed requests, counts identical at all densities; axe 0 violations; 0 overflow; reduced
motion static; `tsc` clean; lint 0 errors. The bento grid was read at 1440px after every re-cut.

## What it left for the owner

Nothing new. The kitchen, QIS and playground folders; `ISSUE-031` through `ISSUE-035` and
`ISSUE-006`. **Nothing pushed — 45 commits ahead of `main` before this one, and the live site
still shows none of it.**
