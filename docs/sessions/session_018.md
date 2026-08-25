# SESSION-018 — One width down the case-study column

Date: 2026-08-25
Milestone: MILESTONE-003 (owner-directed design change)
Status: Complete
Commit: `fecd070`

---

## Objective

The owner, looking at a case study after SESSION-017: *"the size of the images are perfect but
why does the text end in the middle, and not upto the images? fix that"*

## What was actually wrong

Not one mismatch — four. Measured down the reading column at 1440px:

| | width |
| --- | --- |
| the column, and the media in it | 960 |
| section heading | 900 |
| design-question band | 840 |
| body text, summary, facts | 680 |

So every paragraph stopped with 280px of empty page beside it, directly above a figure that
ran to the edge. That is what reads as unfinished.

## The awkward part

The 680px measure was not an oversight. SESSION-004 chose it deliberately (`DECISION-014`,
layout point 1) and wrote down why: the reference's full-width column is about 110 characters
a line, past comfortable. That reasoning was correct then and is still correct.

**What changed was the setting, not the arithmetic.** 680px was picked when the reading column
sat below a full-width hero and beside full-width media — there, the difference in width reads
as rhythm. `DECISION-017` moved the hero and the title into the column and made it narrower,
and the same gap now reads as a mistake.

Recorded as `DECISION-014` amendment 2, against the decision it reverses rather than as a new
one, so the next session finds the reversal where it would look for the rule.

## What changed

Everything in the column shares the column's width: body, lists, quotes, the design-question
band, section headings, the `h1`, the summary and the facts list. `MEASURE` is `max-w-full`.

Body type went from 18px/1.7 to **19px/1.75** — a long line suffers most from tight leading,
so the size and the leading had to go up with the width.

The closing band was left alone. Its 680px text column is one half of a heading-beside-text
spread, not a measure cap, so it already fills its side; a screenshot confirmed it.

## The cost, stated plainly

**~101 characters a line at 1440px**, against ~76 before and the ~66 that is ideal. This is
past what typography convention recommends and it is the owner's call to make. The alternative
— narrowing the column so text and media meet at a comfortable measure — costs the image size
the owner had just said was right, so it was not taken. If it is revisited, that is the lever:
the column, not the measure.

---

## Verification

- **Column fill measured at 1440 / 1280 / 1024 / 768 / 390** — body width equals column width
  exactly at all five, no horizontal overflow at any.
- **Journeys** at 1440 and 390, motion on and off: five cold hash loads, cross-route and
  same-page hash clicks, the contents-rail click, route change, back/forward restore. All ok.
- 38 routes fine under reduced motion, axe **0 violations**, reveal ring clear, overflow clean.
- 86 images across 24 route/locale pairs — none broken, none missing `alt`.
- `npm run lint` (0 errors, 3 pre-existing warnings) and `npm run build` green.

## A harness note worth keeping

The image sweep hung twice with *"Detected unsettled top-level await"*. Cause: a single
awaited `Runtime.evaluate` that scrolls a whole page and then reports, run across 24
navigations — an awaited evaluate that outlives its page never settles. Split the scrolling
into fire-and-forget evaluates with the reporting one kept short, and it runs clean.

## What did not change

No prose, no images, no data. Nothing pushed, nothing deployed.
