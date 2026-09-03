# DECISION-018 — A figure opens full screen

Status: Active
Date: 2026-09-04 (SESSION-023)
Scope: Every case-study figure

## Context

A case-study figure renders at the reading column: 960px on a desktop, and
`calc(100vw - 40px)` — **350px** — on a 390px phone.

That is fine for a picture and wrong for an artefact. Several of the figures this
portfolio exists to show are dense documents rather than images: a persona card
carries a name, a pull quote, six labelled fields and four bulleted lists; a
component sheet carries nine labelled component groups; a UI kit carries a type
scale and a footer. At 350px wide, the type inside a persona card is roughly 3px.

The figure is on the page. None of it can be read. **On the largest share of
traffic a portfolio gets, the work is not actually visible.**

Widening the figure is not available — the column is the column, and
`DECISION-017` settled it deliberately. Cropping to a legible detail throws away
the artefact. Shipping it unreadable is what was happening.

## Decision

**A figure with a `src` is a button that opens it full screen.** A placeholder is
not, because there is nothing to enlarge.

The viewer opens fitted to the viewport and toggles, on tap or click, to the
image's natural width inside a pannable scroller — "see the whole thing" and
"read the small print" are different jobs and neither substitutes for the other.

- Portalled to `body` at `z-[210]`, above the header's `z-[200]`.
- Escape closes; focus starts on Close and returns to the figure that opened it.
- The backdrop is opaque: at 95% the header's own wordmark ghosted through and
  landed on top of the dialog's caption.
- No dependency, and no focus-trap library — the dialog holds exactly two
  focusable elements, so the trap is a few lines.

## Consequences

**It changes what `wide: true` is for.** The three WikiMind personas carry it
because a persona card at a third of the column is 217px tall and illegible; that
argument is weaker now that any figure can be opened. It is kept because a
thumbnail row of key artefacts reads as an afterthought, not because legibility
depends on it any more. **Dropping it would save roughly 120 KB on
`/work/wikimind`** and is a live option (`ISSUE-033`).

**It does not reduce page weight, and it is not meant to.** The inline figure is
still fetched at the size it displays; the viewer reuses the same file.

**Every figure gains a control**, so every figure is in the tab order. Verified:
axe reports 0 violations across all 36 routes, and the button takes its
accessible name from the figure's `alt`.

## Alternatives rejected

- **A lightbox library.** `axe-core` has been the only devDependency for the
  project's life (`DECISION-012`), and this is ~140 lines.
- **Linking the figure to the raw file.** It leaves the site, has no caption, and
  on a phone hands the reader a 1600px image in a browser tab with no way back.
- **Cropping dense figures to a legible detail.** Throws away the artefact, and
  makes the crop a workaround for the layout — the same mistake `SUGGESTION-017`
  was written to stop.

## Related

- `SUGGESTION-017` — the lone-figure ceiling, implemented in the same session
- `DECISION-017` — the reading column this works within
- `DECISION-006` — placeholders are a designed state, and stay unclickable
