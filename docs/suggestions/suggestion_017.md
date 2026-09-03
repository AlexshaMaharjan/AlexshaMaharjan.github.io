# SUGGESTION-017 — A lone narrow figure should not take the full reading column

Status: **Implemented** (SESSION-023)
Priority: Low
Impact: Medium
Effort: Small

## Problem / Opportunity

`SectionMedia` groups a section's figures into runs. A figure whose aspect is 1.5 or wider is
"wide" and gets the full 960px reading column on its own; narrower figures pack two, three or
four across. There is no third case, so **a narrow figure that happens to sit alone in its
run also gets the full column** — `columnsFor(1)` returns no grid classes and the single
child fills the row.

For a 4/3 that is 720px tall and unremarkable. The taller the figure, the worse it gets, and
it is silent: nothing errors, the page just grows.

Measured on the real pages:

| Figure | Aspect | Rendered at 960px |
| --- | --- | --- |
| `wikimind-colour-type` | 6/5 | 800px tall |
| `wikimind-logo-variants` | 4/3 | 720px tall |
| AFONO's social layout system, at its true proportions | 3/5 | **1700px tall** |

SESSION-020 hit the last one and worked around it in the content: it cropped four of the
grid's five rows so the figure is 3/4 rather than 3/5, which brings it to 1280px. That is a
real crop decision, not a fudge — but it was *forced by the layout*, and the next portrait
figure will force another one.

## Recommendation

Give a run of one narrow figure a width ceiling derived from its aspect, so no figure exceeds
a sensible height — something like 720–800px, which is what the existing narrow figures
already land at.

```
lone narrow figure  →  width = min(columnWidth, maxHeight × aspectRatio), centred
```

A 4/3 and a 6/5 are unaffected at a 800px ceiling; a 3/4 renders at 600px wide instead of
960; a 3/5 at 480. Then update the `sizes` string for that case, or the browser will keep
downloading the column-width variant for a figure that is displayed at half of it.

## Why

Three reasons, in order of how much they matter:

1. **It removes a constraint from the content.** Right now the crop has to be chosen partly
   to work around the layout, which is backwards — 47 section figures are still to be
   imported and some of them will be portrait.
2. **It is a weight bug as much as a layout one.** `COLUMN` tells the browser the figure is
   960px wide; a tall figure served at 960 when it should be 600 is roughly 2.5x the pixels.
3. A 1700px-tall figure in a column of 700px-tall ones does not read as emphasis, it reads
   as a mistake.

## Risks

It changes the appearance of two WikiMind figures that are currently full-column. Both are
close to square, so a ceiling around 800px leaves them alone — but the number should be
chosen by looking at the pages, not picked here.

`DECISION-017` settled case-study layout deliberately and recently. This is a refinement
inside it, not a reopening of it, and it should be verified the same way: the 1440/390 ×
motion-on/off journeys, and the reveal ring.

## Hit again, SESSION-021

Sync FM's `[ components ]` figure — four navigation cards, naturally 778×877 in the source —
was cut at 1/1 and rendered **960×960**, blowing the cards up to roughly three times their
size in the app. Same cause, same workaround: crop to a wider aspect (back to the declared
4/3, 960×720) until the height is reasonable.

That is twice in two sessions, and the workaround is getting less honest each time. The crop
is now being chosen by what the layout will do with it rather than by what the figure is,
which is backwards. Two of Sync FM's five figures in that section had their aspect decided
this way.

**The remaining three case studies will hit it too** — the kitchen and QIS both have portrait
figures in their manifests. Worth fixing before them rather than after.


## Implemented, SESSION-023

`SectionMedia` now gives a run of one narrow figure a width of
`min(960, 800 × aspect)`, centred, with a `sizes` string that follows the cap.
`MAX_FIGURE_HEIGHT` is 800px, the number this file proposed.

What it changed on the pages, measured:

| Figure | Was | Now |
| --- | --- | --- |
| `wikimind-initial-sketches` (1200/1805) | 960×1444, fetching the 960 variant | **532×800**, fetching the 640 |
| `wikimind-wireframes` (1400/1311) | — (new figure) | 854×800 |
| `wikimind-components` (1400/1369) | 960×939 | 818×800 |
| `wikimind-mascot` (1600/1317), `wikimind-moodboard` (1400/1153) | 960 | unchanged — a 1.2 aspect wants 972px and the ceiling never bites |

The prediction that near-square figures would be untouched held exactly. The
`sizes` warning in this file was worth heeding: the capped figures were verified
by reading `currentSrc` off the built page rather than by assuming, and the
sketch page does drop a rung.

**The constraint it removes is the point.** Two crops in SESSION-020 and
SESSION-021 were chosen to work around this rather than to suit the artwork. The
kitchen and QIS both have portrait figures still to import, and they can now be
cut at their own proportions.