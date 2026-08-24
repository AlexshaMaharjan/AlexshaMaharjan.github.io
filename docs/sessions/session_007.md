# SESSION-007 — The header at every width

Date: 2026-08-24
Milestone: `MILESTONE-007` — Consistency, responsive, accessibility (third slice)
Objective: `ISSUE-016` (the header's centred control may collide between 480 and 1160px)
and `ISSUE-028` (the German header does not fit below ~360px).
Outcome: **Both resolved** (`53e212e`). `ISSUE-028`'s diagnosis turned out to be wrong and
was rewritten. One pre-existing defect found and recorded (`ISSUE-029`), and one
pre-existing overlap on phones fixed along the way.

## Starting state

Clean, on `milestone-003-content-model` at `197ef03`, eight commits ahead of `main` and
unpushed. The scratchpad from previous sessions was gone, so the CDP harness was rebuilt —
with `coldGoto` and the `scrollWidth`/`clientWidth` rule baked in this time.

## ISSUE-016: measured first, and it was real

The switch is centred on the *viewport*, so it collides with whichever side is wider — the
136px wordmark, not the 49px menu button. Identical in both locales:

| Viewport | wordmark → switch | switch → right |
| --- | --- | --- |
| **480px** | **−34px** | 53px |
| **520px** | **−14px** | 73px |
| 560px | 6px | 93px |
| 768px | 86px | 173px |

So it appeared from 480px but had no real clearance until ~560px. The fix is the one the
issue proposed: the switch appears from `md` (768px), and the second header row carries it
below that. One switch at every width; smallest gap anywhere now 86px.

## What that exposed

The header is now 146px tall up to 768px rather than 480px — and pages hard-coded where
their content starts as a *distance from the top of the viewport*: 132px, 150px, 168px, all
tuned to the 73px desktop header. Measured before touching anything:

- `/` at 375px: content started **28px underneath** the header. Pre-existing, on phones.
- Every other page at 375px cleared it by **8px**.

So this is `ISSUE-015` again in a different guise. Page tops now derive from the measured
header height — `--page-top: calc(var(--header-h) + var(--page-air))`, where the air is
40px on small screens (the header already takes twice the room there) and 77px from `md`
up, which is exactly the 150px they used to hard-code. Desktop is unchanged everywhere
except the playground index, which used 168px where every other page used 150px.

`SelectedWork`'s `pt-[160px]` was reverted after being changed: it is rhythm between two
sections, not header clearance. Worth checking that distinction before making any padding
header-relative.

## ISSUE-028: the diagnosis was wrong

The file blamed the header. It was a symptom: under mobile emulation the header stretches
to the layout viewport, so it always measures as the widest thing on an overflowing page.

Bisecting the DOM — hiding subtrees one at a time to see which removed the overflow — found
the real cause: **German compound words in display headings**. "Studierendenservice" in the
QIS h1 at `text-hero`'s 2.75rem minimum is ~425px wide, which is why
`/de/work/qis-portal` was 65px too wide at 375px; "Designmöglichkeiten." did the same to
`/de/` at 320px.

Headings now hyphenate, scoped twice: to German, so English wraps exactly as it did, and to
below `md`. That second scope came from looking at the result — with hyphenation everywhere,
the German QIS h1 at 1440px went from five lines to four by hyphenating "Hoch-schulportal",
which is correct German and wrong for a hero.

## Files Changed

| File | Change |
| --- | --- |
| `src/components/Header.tsx` | the centred switch and the second row both move to the `md` boundary |
| `src/index.css` | `--page-air` / `--page-top`; heading hyphenation; the `--header-h` fallback switches at 768px |
| `HeroProcess`, `CaseStudyHero`, `CategoryPage`, `ProjectPage`, `PlaygroundIndex`, `About`, `Resume`, `NotFound`, `MobileMenu` | page tops derive from the header height |

## Validation

- `npm run lint` — 0 errors, the same 3 pre-existing warnings. `npm run build` — green.
- Headless Chrome against the **production build**:
  - Header element boxes at 18 widths × 2 locales: no overlap anywhere.
  - Horizontal overflow across 9 pages × 12 widths × 2 locales: clean everywhere.
  - Anchors clear the header by 31px at 8 widths in both locales.
  - Page-top clearance measured before and after on 7 pages × 3 widths.
  - English heading geometry unchanged on all 9 sampled page/width combinations; German
    changes only below `md`.
  - Case-study ring and reduced motion clean.
  - Screenshots of the two-row band at 500 / 700 / 767 / 768px.

## Remaining Concerns

- **`ISSUE-029`** (new, pre-existing) — the About page's hand annotation sits on the
  Biography heading at exactly 768px. Measured on both builds.
- **The header is 146px tall up to 768px now**, which is a lot of a small screen. It buys
  a switch that always fits and content that always clears; if the owner dislikes it, the
  alternative is a narrower switch rather than a lower breakpoint.
- `ISSUE-027` (scroll-position bookkeeping) is still open and still diagnosed.
- `MILESTONE-007`'s accessibility block is untouched, and is the largest unblocked piece
  left.
