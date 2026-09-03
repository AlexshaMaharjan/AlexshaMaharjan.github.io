# ISSUE-034 — Which Surugami poster is the owner's?

Status: Open
Priority: Medium
Category: Content / Credit
Discovered: 2026-09-04 (SESSION-024)
Owner decision: yes — only the owner knows which poster they designed

## What

Surugami's manifest has always carried **two** poster slots, and the split is deliberate:

- `[ poster — by alexsha ]`
- `[ posters — team credit ]`

It exists because the case study's own credit line is specific:

> `contribution`: "Created illustrations, **one poster**, mock-ups and co-designed the website."

`DECISION-011` requires that copy credit collaborators, and this is the image half of the same
rule: one poster is the owner's, the rest are teammates'.

`Images/Surugami/Poster.png` is a **single board** carrying the whole campaign — first sketches,
three posters mounted in a stairwell, one large poster in a corridor, an outdoor sign and a
banner. Nothing on it says which poster is whose.

## What was done, and why

The board went into **`[ posters — team credit ]`**, and `[ poster — by alexsha ]` was left
hatched.

That is the conservative direction. Putting a board containing teammates' posters under a
caption reading "by alexsha" would claim authorship of other people's work — the exact failure
`DECISION-011` and `DECISION-016` exist to prevent. Leaving the owner's own poster uncredited is
the smaller error, and it is reversible in a minute.

Guessing was available and was not taken: the corridor poster is the only one shown alone and at
scale, which *suggests* it is the owner's. That is a hunch about authorship, and asserting a
hunch about who made what is not a thing this repository should do.

## Fix

The owner names their poster. Then either:

1. **Export it on its own** into `Images/Surugami/` — best outcome, since the slot then shows the
   owner's poster at full size rather than as one tile on a board; or
2. **Say which one it is** and it gets cropped out of `Poster.png` into the slot.

Either way the caption pair finally means what it says.

## A second question on the same board

The poster mock-ups sit in photographed environments — a school corridor, a stairwell, an
outdoor sign frame. The deliverables line says the owner made the **mock-ups**, so the
compositing is theirs; the underlying photographs are very likely licensed mockup templates.

`DECISION-016` has met this exact shape before: AFONO's sources page named a graphicgata iMac
template and a pixelbuddha tee mockup, and SESSION-020 moved two slots from "crop the mockup" to
"crop the print artwork". Surugami's documentation cites Freepik photographs by URL.

**This is not a reason to pull the figure** — a mockup template used to present your own artwork
is standard practice and the artwork is the subject. It is worth knowing before the site is
published, which is why it is written down rather than left as an assumption.

## Related

- `DECISION-011` — copy must credit collaborators
- `DECISION-016` — only the owner's own work ships, and its mockup-template precedent
- `ISSUE-032` — the same shape of question on WikiMind's personas and moodboard
