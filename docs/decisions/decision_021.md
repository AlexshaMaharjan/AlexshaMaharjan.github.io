# DECISION-021 — The homepage work section is project cards, not a bento grid

Status: **Proposed** — built and shown; awaiting the owner
Date: 2026-09-09 (SESSION-031)
Scope: The homepage work section
Supersedes, if accepted: `DECISION-010` and `DECISION-020`

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

**Nothing was deleted.** `BentoGrid.tsx`, `selectedWork.bento[]` and all eleven
tile images are intact and still exported, so reverting is one import. If this
is accepted, they go, and `check: "bento"` goes with them.

## Related

- `DECISION-010` — the bento, approved 2026-08-24 and superseded here by the same owner
- `DECISION-020` — the pale wash, which fixed the colour and exposed the construction
- `DECISION-019` — the justified rows this reuses
