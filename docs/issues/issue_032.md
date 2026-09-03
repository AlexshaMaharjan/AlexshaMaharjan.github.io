# ISSUE-032 — WikiMind's personas and moodboard ship third-party imagery

Status: Open
Priority: Medium
Category: Content / Provenance
Discovered: 2026-09-03 (SESSION-022)
Owner decision: yes — `DECISION-016` makes borrowed imagery the owner's call, not a rule I can apply for them

## What

SESSION-022 replaced WikiMind's figures with originals the owner supplied in `Images/wikimind/`,
at each image's true aspect ratio. Two of them contain material the owner did not make.

**The three persona cards** (`wikimind-persona-01..03.webp`). Each card devotes its left third
to a full-bleed portrait photograph — Markus Weber, Prof. Dr. Elena Schmidt, Sabine Richter.
The layout, the type, the colour blocks and every word on the card are the owner's. The faces
are not: they are unattributed stock or AI-generated, and `docs/reference/image_sources.md`
has said so since SESSION-016 — *"its persona photographs (9–11) are unattributed stock"*.

**The moodboard** (`wikimind-moodboard.webp`). A moodboard is by definition a collection of
references, and this one is: a dolphin photograph, a macOS screenshot, a healthcare website,
an AI robot illustration. The board is the owner's composition; roughly half the tiles in it
are not.

## Why this is not simply a rule violation

`DECISION-016` does not ban borrowed imagery outright. It says:

> Stock photography used inside a mockup is acceptable where it is incidental to a design the
> owner made (a placeholder face inside their own UI), and only if the licence permits it.
> A stock photograph shown as the work is not.

A persona card reads as the first case rather than the second — the artefact on display is the
card, and the portrait is a component inside it, exactly like a placeholder face in a UI. The
moodboard is a genuinely harder call: showing references *as references* is standard design
practice and the figure is captioned `[ moodboard ]`, but the tiles are still other people's
images, reproduced whole.

Neither is the clear-cut case the decision was written for, and both turn on a licence
question I cannot answer: **where the portraits came from**. If they were generated rather
than licensed, the question changes shape entirely and becomes the same one AFONO's AI product
imagery raises.

## What changed, and what did not

SESSION-019 exported the personas as a 3:4 crop that cut most of the portrait away. That crop
also cut the card's left edge mid-word and spilled into the next section — it was a poor
figure, and the aspect it was forced into is exactly what this session was asked to fix.
Shipping the card whole is the better figure and the more honest one; it is also the reason
this issue exists, because the portrait is now fully visible.

## Options for the owner

1. **Ship as-is** — treat the portraits as incidental components of the owner's card design.
   Nothing to do; close this issue.
2. **Say where the faces came from** — one line of caption or a `heroDisclosure`-style note.
   Cheapest option that removes the ambiguity entirely.
3. **Replace the faces** in the source file and re-export. The record in
   `docs/reference/image_crops.json` makes that one command.
4. **Drop the moodboard**, keep the personas. The slot returns to hatched, which
   `DECISION-006` already treats as a valid state.

## Related

- `DECISION-016` — only the owner's own work ships, and its stock-photography carve-out
- `docs/reference/image_sources.md` — the WikiMind row, which has flagged the portraits since SESSION-016
- AFONO's AI product imagery — the same "owner's call, not a licensing question" shape
