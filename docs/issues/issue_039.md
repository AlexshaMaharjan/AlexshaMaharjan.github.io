# ISSUE-039 — The playground index crops every card to a fixed aspect

Status: **Resolved** 2026-09-10 (SESSION-034) — see `DECISION-025`
Priority: Medium
Category: Design
Discovered: 2026-09-10 (SESSION-033)
Owner decision: given. The owner chose a uniform box with the leftover space
filled to match the image, and 'one row at a time' for the motion.

## What

Two components on `/playground` render an item's image at a **hard-coded aspect
ratio** rather than the item's own:

- `CategoryMarquee.tsx` — `<Media ... aspect="4/3" />` for every card in every row.
- `PlaygroundIndex.tsx` — `<Media ... aspect="16/10" />` for the three featured cards.

`ui/Media` paints with `object-cover`, so **a declared aspect that disagrees with
the file is a silent crop.** The items are not close to 4/3:

| Item | True aspect | Shown at | Lost |
| --- | --- | --- | --- |
| Beaded hanging planter | `1200/2604` (0.46) | 4/3 (1.33) | ~65% of its height |
| Low-key portrait | `2/3` (0.67) | 4/3 | ~50% |
| VTRI banner | `1200/343` (3.50) | 4/3 | ~62% of its width |
| Perfume box | `656/770` (0.85) | 4/3 | ~36% |

The category pages themselves are fine — `PlaygroundCard` passes `item.aspect`
straight through, so the same images are uncropped one click away. The index is
the only surface that crops.

## Why it was not fixed in SESSION-033

This is the same `object-cover` fault the case studies spent `SESSION-022`
through `SESSION-030` removing, and the reasoning in `DECISION-021` — nothing
sits on an image and nothing is cropped — applies to it word for word.

But a marquee is a **fixed-height scrolling row**, and that is the whole reason
the aspect is hard-coded: variable aspects at a fixed height mean variable
widths, which is fine, but the row's loop distance is currently `33.3333%` of a
tripled track and the reveal maths assumes uniform cards. `@/lib/justify` already
solves exactly this for figures and the work grid, and would solve it here.

That is a redesign of the playground index. SESSION-033 was asked to reorder
categories, and it stopped at the edge of that.

## Options

1. **Justify the rows by height** the way `DECISION-019` does — every card the
   same height, width from its own aspect. Consistent with the rest of the site
   and reuses `@/lib/justify`. The most work.
2. **Keep a fixed aspect but `object-contain` on a neutral ground** — nothing is
   lost, but tall items become small items with wide margins.
3. **Leave it.** The index is a teaser and the uncropped image is one click away.

## Related

- `DECISION-021` — nothing sits on an image, nothing is cropped (the work grid)
- `DECISION-019` — height-governed justified rows, and `@/lib/justify`
- `DECISION-023` — the restructure that put these items in this order


## Resolution

`DECISION-025`. Every playground card is a 3/4 box with the image contained
rather than cropped, and the leftover space painted the image's own border
colour, sampled at build time. Average mat 19%, against 36% of every image
previously discarded. The ITD logo lockup and the museum poster's title are
back inside the frame.

The motion is settled with it: one row moves at a time, chosen by which section
the viewport's centre line is in.
