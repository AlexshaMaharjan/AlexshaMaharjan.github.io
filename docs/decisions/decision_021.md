# DECISION-021 — The homepage work section is project cards, not a bento grid

Status: **Active** — approved by the owner, 2026-09-09
Date: 2026-09-09 (SESSION-031)
Scope: The homepage work section
Supersedes: `DECISION-010` (the bento) and `DECISION-020` (its pale wash)

## Context

The owner rejected the bento twice. `DECISION-020` had already answered the first
rejection by washing the tiles pale instead of darkening them — and the second
rejection came straight back: *"i still dot like the benti boxes design, it looks
really bad."*

That is the signal to stop adjusting the treatment and look at the construction.

## What was actually wrong

Read at 1440px, three faults, none of them about colour:

1. **Labels land on image content.** The category sits centred at the top of the
   tile whatever is underneath it — "Interaction Design" across the Sync FM
   screens, "Brand & Print" across the paper crane, "Poster & Print" across pink
   lettering.
2. **Titles compete with the thing they name.** "WikiMind" over the WikiMind
   logo; "QIS Portal" over bar charts.
3. **`object-cover` crops each image to whatever shape its `gridArea` is.** The
   results read as broken screenshots: one tile showed `gami is much / nore fun
   together / nity`, another a cut figure caption `…bildung 5: Auswertung der
   Fragen…`, another half-letters.

**Washing the tiles pale did not cause any of this. It revealed it** — the dark
tint had been hiding the mess rather than solving it, which is why the first fix
made things look worse rather than better.

## Decision

**Nothing sits on an image, and nothing is cropped.**

- One card per project, six rather than eleven.
- The project's **cover shown whole at its own aspect** in a rounded, bordered
  box. Five of the six covers are designed title cards the owner made; they are
  meant to be seen whole.
- Name and tags in ink **underneath** the image — the arrangement the
  case-study figures and the prev/next ring already use.
- Rows justified by `@/lib/justify`, extracted from `SectionMedia` so the
  homepage and the case studies cannot drift apart. A row of covers with
  different aspects still shares one height.

## Consequences

**`imageAspect` comes back to `ProjectCopy`.** It was removed in SESSION-025 as
dead; the whole point of this grid is that a cover renders at its own
proportions, so it is now the field the layout depends on. Recorded here rather
than quietly re-added.

**Five of six covers are designed; the kitchen's is not.** Its card uses the
SESSION-016 PDF crop at 16/7.5 — wider, shorter and visibly softer than the
other five. It is the one obvious gap.

**Five projects lose their second appearance.** `DECISION-010` kept eleven tiles
so the grid read as a wall of work. Six cards do not read as a wall, so the
duplication would read as repetition instead.

**The bento is gone.** `BentoGrid.tsx`, `selectedWork.bento[]`, the `BentoTile`
type and all eleven tile images were deleted once the owner approved the cards —
247 KB of originals plus 22 variants. `image-manifest.mjs` now reports the
homepage from `projects[]` instead of from tiles, so a card's image is the same
file its case study opens with and there is no second copy to keep in step.

## Related

- `DECISION-010` — the bento, approved 2026-08-24 and superseded here by the same owner
- `DECISION-020` — the pale wash, which fixed the colour and exposed the construction
- `DECISION-019` — the justified rows this reuses


## Approved, with two changes (2026-09-09)

**"I like this look but i dont like the text below the images/cards. i think
title is not needed because it is already there in the title image."**

Right, and it is the same fault as the bento in miniature: the name was being
said twice, once inside the cover and once underneath it. The cards now carry
**no visible text at all**.

The link still needs a name for anyone not looking at it. Without one the
accessible name falls back to the cover's `alt`, which describes the picture
rather than where the link goes — so the `<a>` carries
`aria-label="{name} — {tags}"`. axe passes, and a screen reader hears the
project and its disciplines rather than "the AFONO shop and size finder in two
browser windows".

**The kitchen got a cover.** It was the one project without a designed title
card, and its card was visibly the odd one out. `scripts/cover.mjs` composes one
to match the other five — pale ground, name, one-line subtitle, the work
bleeding off the right edge — from the cleanest render in the documentation.

That render needed picking rather than taking: the existing hero was two Blender
*viewport screenshots* side by side, one of them with the axis gizmo still in
frame. The new cover uses "Rollstuhlfahrerin sitzt an Arbeitsplatte" from page
22, cropped to exclude the gizmo.

**It copies a layout rather than inventing one**, and it should be replaced if
the owner ever makes a real one. It is what makes six cards read as a set
instead of five plus an exception.


## The tags came back (2026-09-09)

**"i se ehat you removed the tags also, like the type of project."**

Removing the caption block had taken the disciplines with the name, and they are
not the same thing. **The name is repeated — every cover carries it. The
disciplines appear nowhere else on the page**, so without them a card says what
a project is called and never what it is.

So the card carries **one line: the tags**, in mono at 12px, and still no title.

The owner asked for it "in the photos". Compositing it into the covers was
tested and put aside: five of the six are the owner's own artwork with five
different type systems, positions and grounds, so a line added on top would be
impersonating five designs rather than matching one — and it would be *text on
an image*, which is the fault this decision exists to remove. A measurement pass
confirmed the practical half: the left-hand text block cannot be bounded
reliably, because product imagery bleeds into the left 46% on four of the six.

It is also brittle in a way the page is not: burn the tags in, and they are
wrong the moment a cover is redrawn. The line reads from `projects[].tags`, so
it cannot drift.

**One accessibility detail worth keeping.** The link's `aria-label` joins the
tags with `" · "` — the same separator as the visible line — so the visible text
is a substring of the accessible name. WCAG 2.5.3 asks for that and axe checks
it; joining with `", "` in one place and `" · "` in the other fails
`label-content-name-mismatch`. Caught before the sweep rather than by it.
