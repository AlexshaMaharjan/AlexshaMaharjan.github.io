# ISSUE-028 — German compound words in headings overflow the page at narrow widths

Status: **Resolved** (SESSION-007, `53e212e`)
Priority: Low
Category: Responsive / i18n
Discovered: 2026-08-23 (SESSION-006, while re-checking `ISSUE-026`)
Resolved: 2026-08-24 (SESSION-007)
Last reviewed: 2026-08-24

## Summary

A German compound word in a display heading can be wider than the viewport, and a word
that cannot fit its line overflows the page. Two cases: `/de/work/qis-portal` was 65px too
wide at 375px ("Studierendenservice" in the h1), and `/de/` was 39px too wide at 320px
("Designmöglichkeiten." in the contact heading).

> **The original diagnosis in this file was wrong.** It blamed the header, because under
> mobile emulation the header stretches to the layout viewport and so measures as the
> widest thing on the page. It was a symptom. SESSION-007 bisected the DOM — hiding
> subtrees one at a time to see which removed the overflow — and found the headings.
> Worth remembering: the widest element is not necessarily the cause, and a `position:
> fixed` element that spans the viewport will always look like one.

## Evidence / Current Behavior

Measured in Chrome against the production build, `scrollWidth` against `clientWidth`:

| Page | 320px | 360px | 375px |
| --- | --- | --- | --- |
| `/de/` | **+39px** | clean | clean |
| `/de/work/qis-portal` | **+120px** | **+80px** | **+65px** |
| the same pages in English | clean | clean | clean |

The offenders, found by bisection:

- `h1` — "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice
  verwandeln." at `text-hero`'s 2.75rem minimum. "Studierendenservice" alone is ~425px at
  44px.
- `h2` — "Offen für Designmöglichkeiten." at `text-section`'s 2.125rem minimum: 339px in a
  320px viewport.

Pre-existing: both minimum sizes predate SESSION-006's type scale, and the overflow
measured identically on the older build.

## Measuring it

Two things made this hard to see, and both matter for the next responsive sweep:

- **`scrollWidth` must be compared against `clientWidth`, not `window.innerWidth`.**
  `innerWidth` includes the scrollbar, so it hides up to ~15px of overflow. `ISSUE-026`
  was large enough to show up either way; this one is only visible with the right test.
- **The measurement is timing-sensitive.** Sampling 200ms after navigation reports 320px
  (clean); from 600ms on it reports 359px. SESSION-005's sweep recorded `/de/` as clean at
  320px, which is most likely this — settle before measuring, and prefer the layout to
  have painted at least one frame with the real fonts.

## Resolution

Headings hyphenate, in `src/index.css`, scoped twice over:

- **to German** (`:root:lang(de)`), so English headings wrap exactly as they did —
  `hyphens: auto` changes line breaking wherever it applies, and only German needs it;
- **to below `md`**, because above it the words fit, and a hyphen in an 84px display
  headline reads worse than the wrap it replaces. Verified: with hyphenation applied at
  all widths, the German QIS h1 at 1440px went from five lines to four with a hyphenated
  "Hoch-schulportal" — correct German, wrong for a hero.

`overflow-wrap: break-word` applies to `h1`/`h2`/`h3` at every width as the guard of last
resort. It does nothing until a word genuinely cannot fit, so it changes nothing today.

Verified clean across 9 pages × 12 widths × 2 locales, and English heading geometry
unchanged on all 9 sampled page/width combinations.

## Expected Behavior

No page scrolls horizontally at any width the site claims to support.

## Relevant Files

- `src/index.css` — the hyphenation rules
- `src/lib/dictionaries/de.ts` — the German headings themselves

## Related

`ISSUE-026`, `ISSUE-016`, `ISSUE-015`, `SUGGESTION-010`, `MILESTONE-007`, `MILESTONE-009`.
