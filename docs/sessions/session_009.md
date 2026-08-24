# SESSION-009 — Accessibility, measured

Date: 2026-08-24
Milestone: `MILESTONE-007` — Consistency, responsive, accessibility (fourth slice)
Objective: The accessibility block — `SUGGESTION-011`, with WCAG 2.2 AA named
non-negotiable in `SPEC` §11 and never verified.
Outcome: **Seven defects found and fixed** (`ISSUE-030`), three of them keyboard defects
that made parts of the site unusable without a mouse. axe-core now reports 0 violations
across 8 pages × 2 locales.

## Starting state

Clean, on `milestone-003-content-model` at `1ce0a94`, eleven commits ahead of `main` and
unpushed. Scratchpad gone again; harness rebuilt with `coldGoto` and the
`scrollWidth`/`clientWidth` rule in it from the start.

## Measuring changed what the work was

`SUGGESTION-011` named two touch-target suspects — the language pill and back-to-top.
**Both are fine** (34px). The real misses were a dozen standalone links sitting at the
height of their line box, 17–23px against the 24×24 floor. Predictions from reading code
are worth exactly what they cost.

## What Changed

**Contrast**, computed per text node against its real background:

| What | Was | Now |
| --- | --- | --- |
| `ink-muted` — dates, captions, footer, facts labels | `#858A92`, 3.13:1 | `#6A6F78`, 4.55–5.05:1 |
| Grey on the near-black bands | `#6C7078`, 3.98:1 | token `ink-on-dark-muted` `#8A8F98`, 6.09:1 |
| Process-canvas illustration labels | 3.0–4.49:1 | ≥4.55:1, and `aria-hidden` |

**Three keyboard defects**, none visible from reading the code:

1. **The process canvas trapped focus in invisible controls.** Its five branch buttons were
   in the tab order while the map sat at `opacity: 0` with `pointer-events: none` — five
   controls a keyboard user could neither see nor operate. The map is `inert` until the
   scroll track says it is interactive.
2. **Scroll reveals removed content from the tab order.** GSAP's `autoAlpha` sets
   `visibility: hidden`; a hidden subtree is unreachable by keyboard. This is how the new
   pause control turned out to be unreachable — the fix I had just written was itself
   unusable. At rest is `opacity` alone now, and focus entering a section completes its
   reveal tween. `DECISION-008` amended.
3. **The About carousel could not be scrolled by keyboard.** It is a focusable, labelled
   region now.

**A pause control for the six playground marquees** (WCAG 2.2.2) — bilingual, reachable in
9 tabs, operable with Enter and Space.

**The canvas illustrations are `aria-hidden`.** They are pictures of interfaces drawn in
DOM; a screen reader was reading their fake UI text out as content, in English, on the
German site. `dictionary.process.srSummary` is the text alternative and already existed.

## Tooling

Added **axe-core** as a dev dependency, injected into the page from `node_modules` by a
scratch script. It ships in nothing. The judgment: my own probe covers contrast, heading
order, names, landmarks and target sizes, but axe covers ARIA validity, region semantics
and the long tail — and it found `scrollable-region-focusable`, which I would have missed.
Worth the dependency for an audit that is stated as non-negotiable.

## Validation

- **axe-core**: 8 pages × 2 locales, `wcag2a`/`2aa`/`21a`/`21aa`/`22aa` + best-practice —
  **0 violations**.
- Hand-rolled probe over the same pages: contrast, heading order, accessible names,
  landmarks, target sizes — clean.
- Keyboard paths driven with `Input.dispatchKeyEvent`, read back from `document.activeElement`.
- Regressions: case-study ring, reduced motion on four pages, anchor clearance at three
  widths, horizontal overflow in both locales, the 38-route sweep.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green.

## Two harness traps worth remembering

- `document.activeElement.textContent` is the **whole page** when focus is on `body`. "Did
  focus land on the button?" must test `tagName`, not text. This produced a confident false
  positive before I caught it.
- `[].every()` is `true`. "Are all marquees paused?" answered yes on a page that had
  navigated away and had none.

## Remaining Concerns

- **Alt text still says "Placeholder: …"** on the slots without images — reasonable while
  assets are missing, and it is what a screen reader announces. Revisit as images land
  (`ISSUE-006`).
- `ISSUE-027` (scroll-position bookkeeping) and `ISSUE-029` (About annotation at 768px)
  remain open, both Low.
- `ISSUE-010`'s dead content fields still wait on `MILESTONE-002` finishing.
- The audit covered 8 representative pages, not all 19 routes; the six playground
  categories and five other case studies share their templates with pages that were checked.
