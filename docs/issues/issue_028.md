# ISSUE-028 — The German header does not fit below ~360px

Status: Open
Priority: Low
Category: Responsive / i18n
Discovered: 2026-08-23 (SESSION-006, while re-checking `ISSUE-026`)
Last reviewed: 2026-08-23

## Summary

At 320px the German header's contents are wider than the viewport, so every German page
scrolls sideways by 39px. English is fine at the same width; the German labels are longer.

## Evidence / Current Behavior

Measured in Chrome against the production build, `document.documentElement.scrollWidth`
against `clientWidth` (the layout viewport):

| Viewport | `/de/` | `/` |
| --- | --- | --- |
| **320px** | **359px — overflows by 39px** | 320px, clean |
| 360px | 360px, clean | clean |
| 375px | 375px, clean | clean |

The overflowing element is the `<header>` itself: the wordmark, the mode switch and the
`Menü` button together demand 359px. Pre-existing — measured identically on the build
before SESSION-006's refactor.

## Measuring it

Two things made this hard to see, and both matter for the next responsive sweep:

- **`scrollWidth` must be compared against `clientWidth`, not `window.innerWidth`.**
  `innerWidth` includes the scrollbar, so it hides up to ~15px of overflow. `ISSUE-026`
  was large enough to show up either way; this one is only visible with the right test.
- **The measurement is timing-sensitive.** Sampling 200ms after navigation reports 320px
  (clean); from 600ms on it reports 359px. SESSION-005's sweep recorded `/de/` as clean at
  320px, which is most likely this — settle before measuring, and prefer the layout to
  have painted at least one frame with the real fonts.

## Expected Behavior

No page scrolls horizontally at any width the site claims to support. If 320px is out of
scope, say so somewhere — currently nothing does.

## Relevant Files

- `src/components/Header.tsx` — the 72px row: wordmark, `ModeSwitch`, `MobileMenu`
- `src/lib/dictionaries/de.ts` — `nav.menu` / the mode-switch labels

## Possible Cause

The header row is a fixed three-part layout with `gap-7` and no wrapping or shrinking, and
the German labels are longer than the English ones it was spaced for.

## Possible Solution

Let the wordmark truncate or shorten below `sm`, or reduce the gap and the mode-switch
padding at the smallest widths. Worth deciding first whether 320px is supported at all —
`ISSUE-015`'s fix now makes the two-row header 146px tall there, which is already a lot of
a 320×568 screen.

## Related

`ISSUE-026`, `ISSUE-016`, `ISSUE-015`, `SUGGESTION-010`, `MILESTONE-007`, `MILESTONE-009`.
