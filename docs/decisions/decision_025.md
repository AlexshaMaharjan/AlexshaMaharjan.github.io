# DECISION-025 — One uniform card, nothing cropped, matted in the image's own colour

Status: Active
Date: 2026-09-10 (SESSION-034)
Scope: The playground — index marquees, featured cards, category grids
Supersedes: `SUGGESTION-008` (scroll-velocity coupling)
Closes: `ISSUE-039`

## Context

The owner: *"most of the images are cut and is not visible… everything is
looking too colourful right now and the moving animation is also abit too busy."*

Three separate faults, measured rather than guessed:

**1. The cropping was a bug, not a taste.** `CategoryMarquee` declared
`aspect="4/3"` and the featured cards `16/10`, hard-coded, whatever the image
actually was. `ui/Media` paints with `object-cover`, so the rest was discarded:

```
71% of its height lost   1200/2604   Bead & Plant Objects
65%                      1200/2604   Beaded hanging planter
62% of its width         1200/343    VTRI banner
46%                      803/1115    Logo study     ← lockup sliced mid-word
46%                      1200/1658   Museum poster  ← title cut off

average loss across all 34 images: 36%   ·   23 lost ≥30%   ·   6 lost ≥50%
```

The ITD logo card read "Infrastruktur Technologie **und D—**".

**2. "Too colourful" was density, not palette.** The page chrome is restrained —
white, grey grid, black type, one blue. What was loud was 34 saturated images at
identical size, five across, 12px apart, with no hierarchy: nothing told the eye
where to land, so every image competed. **This is the same diagnosis as the
bento grid** (`DECISION-021`): the fault was never the colour.

**3. Five rows moved at once**, in alternating directions, accelerating with the
wheel — and two of the five were entirely hatched placeholders.

## Decision

### One box, contained, matted in the image's own colour

Every playground card is a **3/4 box** with the image `object-contain` inside
it, and the leftover space painted the image's own border colour.

**3/4 is measured, not chosen.** The median aspect of the 33 real playground
images is 0.762. Mat left over, by box:

| Box | Average mat | Worst card |
| --- | --- | --- |
| 4/3 (what it was) | 34% | 65% |
| 1/1 | 25% | 71% |
| **3/4** | **19%** | 79% |
| 2/3 | 24% | 81% |

And 34% as mat is not the same as 34% destroyed. The worst case is the 3.50
VTRI banner, which no uniform box can flatter.

**The mat colour is sampled at build time**, by `image-variants.mjs`, into the
same generated map that already carries the `srcset` widths. It is the
**median** of a two-pixel border ring — not the mean, which any bright object
touching an edge drags into a muddy average of subject and background. On a
flat-background illustration every ring pixel is identical, so the median is
exact and the image appears to run to the card's edges:

```
#ffffff  pg-line-study        (white ground — mat invisible)
#ead8ff  pg-character         (lilac)
#063938  pg-forest            (dark green)
#484e31  pg-bead              (foliage)
```

Sampling in the browser instead would paint 33 cards white for a frame and then
repaint them — a visible flash. Doing it in the loop that already decodes each
image to read its natural size costs nothing.

**Category grids got the same box.** Passing each item's own aspect there was
never a crop — those images were whole — but it made the grid ragged, with rows
that did not line up and white voids under the short cards.

### One row moves at a time

A row runs only while **the horizontal centre line of the viewport falls inside
its own section**, or while the pointer is on it. The sections are contiguous,
so that line is inside exactly one of them; the rows need no parent state and no
shared scroll handler to coordinate.

**The margin describes a line, not a band, deliberately.** The first attempt used
the middle 20% of the viewport, and a band of any real height straddles the
boundary between two sections for part of the scroll — measured, that put two
rows in motion at once, which is the fault being fixed.

`SUGGESTION-008`'s scroll-velocity coupling is **removed**. It was a good idea
attached to the wrong number of moving things.

Verified across six scroll positions: exactly one row moving at each, none at the
top of the page, none with the pause control pressed, none under
`prefers-reduced-motion`.

## Still open

**The colour question is deliberately unanswered.** The owner asked to be shown
the crop and motion fixes first and asked again after. Fixing the crop already
changes the colour impression a great deal — a matted card reads as one object
rather than a bright rectangle in a white frame — so the right time to judge
density and saturation is now, not before.

## Related

- `ISSUE-039` — the crop, as first written up
- `DECISION-021` — "the fault was arrangement, not colour", the first time
- `DECISION-024` — `sizes` at every call site; the same components
