# DECISION-019 — Figures are sized by height, and rows are justified

Status: Active
Date: 2026-09-04 (SESSION-027)
Scope: Every case-study figure

## Context

Two rules were already fixed and neither was going to move:

- **A figure's declared aspect must equal its file's true aspect** (SESSION-022). `ui/Media`
  paints with `object-cover`, so any mismatch is a silent crop. Four sessions of work depend on
  this, and it is why nothing on the site is cropped to fit a layout any more.
- **The reading column is 960px** (`DECISION-017`).

Together they meant figures were laid out by *width* — a row gave each figure an equal share of
the column — and therefore their heights were whatever their aspects made them. AFONO's
collection row held a 0.375 cart drawer, a 0.545 product page and a 4/3 checkout. At 307px wide
that is **819px, 563px and 230px tall**: three figures, one row, no two bottoms within 300px of
each other, and three captions at three different levels.

`SUGGESTION-017` had already capped the height of a *lone* figure, but by deriving a width from
it — `min(960, 800 × aspect)` — which produced a different bespoke width for every aspect and did
nothing at all for rows.

## Decision

**A figure's size is decided by its height. Its width follows from its own aspect.**

- **`MAX_FIGURE_HEIGHT` is 640px.** Every figure renders at that height unless the column is the
  binding constraint.
- **A row is justified**: all figures in it share one height, and each one's width is
  proportional to its ratio. Nothing is cropped; the widths absorb the difference.
- A row's height is `min(640, (960 − gaps) ÷ Σ ratios)`, and the row is centred at exactly the
  width that height implies.
- Rows hold at most three figures; a run of four splits two-and-two.
- Below 768px a row stacks and every figure is the full viewport column.

## How it is implemented

Almost entirely by CSS, which is why it is worth writing down. Each figure gets
`flex-grow: <its ratio>` against `flex-basis: 0`, so widths come out proportional to ratios —
and because each figure's box is `aspect-ratio: <ratio>`, width ∝ ratio means **every height in
the row is identical**. The browser justifies the row; no arithmetic reaches the markup.

What is computed in JS is only what CSS cannot know: the row's height, so the row can be capped
and centred, and each figure's `sizes` string.

## Consequences

**Wide figures did not change.** Anything 1.5 or wider fits its full 960px inside 640px of
height, so it still takes the whole column. The rule is uniform rather than special-cased.

**`SUGGESTION-017` is superseded.** Its ceiling was the right instinct applied to the wrong axis;
this replaces it and covers rows as well as lone figures.

**A very narrow figure is genuinely narrow.** A 0.375 cart drawer at 640px tall is 240px wide.
That is what it is — a narrow drawer — and `DECISION-018` lets anyone open it full screen.

**The row breakpoint moved from 640px to 768px.** At 640 a three-figure row put the narrowest
figure at 140px.

## Alternatives rejected

- **Uniform aspect per row** — the only way to get equal widths *and* equal heights, and it means
  cropping. That is the thing four sessions of work exists to prevent.
- **`object-contain` in a fixed box** — no crop and perfectly even rows, but every non-matching
  figure gets letterboxed onto a neutral ground, which reads as a slideshow rather than a page.
- **Leaving it ragged** — defensible for two figures, indefensible for AFONO's nine.

## Related

- `SUGGESTION-017` — superseded by this
- `DECISION-018` — the full-screen viewer that makes a narrow figure acceptable
- `DECISION-017` — the 960px reading column this works inside
