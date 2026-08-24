# ISSUE-030 — Accessibility gaps found by the WCAG 2.2 AA audit

Status: **Resolved** (SESSION-009, `d9bb612`)
Priority: Medium
Category: Accessibility
Discovered: 2026-08-24 (SESSION-009, auditing against `SUGGESTION-011`)
Resolved: 2026-08-24 (SESSION-009)
Last reviewed: 2026-08-24

## Summary

`design-reference/SPEC.md` §11 names WCAG 2.2 AA as non-negotiable and it had never been
verified. Measuring found seven defects — three of them keyboard defects that made parts of
the site unusable without a mouse, and none of them visible from reading the code.

## What measuring changed

`SUGGESTION-011` predicted the two touch-target misses. **Both were wrong**: the language
pill and the back-to-top button are 34px and fine. The real misses were a dozen standalone
links sitting at the height of their line box — 17–23px against the 24×24 floor (WCAG
2.5.8). Worth remembering before fixing anything on suspicion.

## The defects, and what was done

**Contrast** (1.4.3), computed rather than eyeballed:

| What | Was | Now |
| --- | --- | --- |
| `ink-muted` on page/white/surface — dates, captions, footer, facts labels | `#858A92`, 3.13:1 | `#6A6F78`, 4.55–5.05:1 |
| The grey on the near-black bands | `#6C7078`, 3.98:1 | token `ink-on-dark-muted` `#8A8F98`, 6.09:1 |
| Process-canvas illustration labels (7–9px) | 3.0–4.49:1 | nudged to ≥4.55:1 |

The canvas labels are decorative and arguably exempt under 1.4.3's "pure decoration"
clause, but they are cheap to fix and an automated audit of a *designer's* portfolio should
come back clean. They are also `aria-hidden` now — they are pictures of interfaces, and a
screen reader was reading their fake UI text out as content, in English, on the German site.

**Keyboard** (2.1.1, 2.4.3, 2.4.7):

- **The process canvas trapped focus in invisible controls.** Its five branch buttons stayed
  in the tab order while the map was at `opacity: 0` and `pointer-events: none`, so a
  keyboard user tabbed into five controls they could neither see nor operate. The map is
  `inert` until the scroll track says it is interactive; measured before and after.
- **Scroll reveals removed content from the tab order.** GSAP's `autoAlpha` sets
  `visibility: hidden`, and a hidden subtree is unreachable by keyboard — which is how the
  new pause control turned out to be unreachable. At rest is `opacity` alone now, and focus
  entering a section **completes its reveal tween** (rather than setting properties, which
  would leave the trigger armed to replay the reveal and flash the focused control).
- **The About carousel could not be scrolled by keyboard** (axe:
  `scrollable-region-focusable`). It is a focusable, labelled region now.

**Moving content** (2.2.2): the six playground marquees ran indefinitely and paused only on
hover. There is a bilingual pause control now — reachable in 9 tabs, operable with Enter and
Space, and it stops all six rows.

**Touch targets** (2.5.8): a `.tap-target` utility (`inline-flex min-h-[24px] items-center`)
on the standalone links that were under the floor. Inline links inside a sentence are exempt
and keep their natural size.

## Verification

- **axe-core**, 8 pages × 2 locales, against `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`,
  `wcag22aa` and `best-practice`: **0 violations**.
- A hand-rolled probe over the same pages: contrast computed per text node against its real
  background, heading order, accessible names, landmarks, and target sizes — all clean.
- Keyboard paths driven with `Input.dispatchKeyEvent` and read back from
  `document.activeElement`.
- Regressions: the case-study ring, reduced motion on four pages, anchor clearance at three
  widths, horizontal overflow in both locales.

## A note on the harness

Two false positives cost time and are worth knowing about:

- `document.activeElement.textContent` is the **whole page** when focus is on `body`, so
  "did focus land on the button?" must test `tagName`, not text.
- `[].every()` is `true`, so "are all marquees paused?" answered yes on a page that had
  navigated away and had none.

## Relevant Files

`tailwind.config.ts`, `src/index.css`, `src/lib/useScrollReveals.ts`,
`src/components/process/HeroProcess.tsx`, `BranchGroup.tsx`, `clusters.tsx`,
`src/components/playground/CategoryMarquee.tsx`, `src/pages/playground/PlaygroundIndex.tsx`,
`src/pages/About.tsx`, and the dozen link call sites now using `.tap-target`.

## Related

`SUGGESTION-011`, `DECISION-008` (the reveal contract this changed), `MILESTONE-007`.
