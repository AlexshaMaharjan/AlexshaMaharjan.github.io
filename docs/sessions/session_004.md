# SESSION-004 — Case-study layout

Date: 2026-08-23
Milestone: `MILESTONE-003` — Case-study layout and content model (part two of two)
Objective: Lay the case studies out as editorial pages — `SUGGESTION-003` points 1, 2, 3
and 5 — on top of the content model SESSION-003 built.
Outcome: **Complete. `MILESTONE-003` is closed.** Two pre-existing defects found by
measurement and recorded (`ISSUE-026`, `ISSUE-027`); one latent defect in the hash landing
found and fixed. Committed as `4e4b5f7` (code) plus a documentation commit, on branch
`milestone-003-content-model`.

## Starting state

Clean, and matching the documents for once: branch `milestone-003-content-model` at
`1a15cac`, three commits ahead of `main`. `DECISION-010` and `DECISION-006` are still
unanswered by the owner, and neither blocked this work.

## What Changed

The case studies were a 960px column of uniform-width everything. They are now laid out:

| | Before | After |
| --- | --- | --- |
| Body text | 960px — about 110 characters a line | 680px — about 70 |
| Media | one width, one grid | three: full column, 2-/3-up grid, and the hero |
| Design question | bordered box | tinted accent panel |
| Key insights | border-top rules | numbered white cards |
| Testing steps | border-top rules | numbered row under accent rules |
| Contents rail | present, passive, from 768px | marks the section being read, fills as a progress track, from 1280px |
| Reading column at 768px | ~313px wide, rail reserved but cramped | full width; the collapsible list names the current section |
| Ending | last section ran into the prev/next cards | its own tinted band, heading beside text |

Media grouping is derived rather than annotated: an image 3:2 or wider takes the full
column, narrower ones pack into a grid of two or three. `SectionImage.wide` overrides it
where the data wants to.

## Files Changed

| File | Change |
| --- | --- |
| `src/components/case-study/Section.tsx` | 680px measure on text blocks; three set-piece treatments; `outro` variant |
| `src/components/case-study/SectionMedia.tsx` | new — groups `images[]` into wide rows and grids |
| `src/components/case-study/ContentsNav.tsx` | active-section tracking, progress track, rail moved to `xl` |
| `src/components/case-study/CaseStudyPage.tsx` | rail column from `xl`; closing section lifted onto its own band |
| `src/lib/caseStudies/types.ts` | `SectionImage.wide?` |
| `src/lib/useScrollBehavior.ts` | hash landings aimed at layout position, not the rendered box |

## The bug this layout surfaced

Cold-loading `/work/wikimind#overview` started landing 9–18px above the header line, and
differently on each load. It was not a layout problem.

`useScrollBehavior` aimed with `scrollIntoView` and judged "has the page settled?" by the
target's `getBoundingClientRect().top`. Sections carry the scroll reveal's at-rest
transform — `y: 18` — until they play, so both numbers moved while the tween ran: the
landing was aimed at the *rendered* box and came up short by whatever remained of it.

Verified as a genuine regression rather than an assumption: the pre-session build landed
at 104px on every run, this session's layout build at 93–95px. The layout changed the
timing, not the correctness — the flaw was already there.

The fix aims at layout instead: sum `offsetTop` up the `offsetParent` chain, subtract the
element's own `scroll-margin-top`, scroll there, and judge stability on *that* number, so
page growth still re-aims but reveal animation no longer does. 15 consecutive runs land at
exactly 104px.

Because that hook is `DECISION-013` territory and coupled to the reveals by effect
ordering (`DECISION-008`), every SESSION-002 journey was re-run afterwards — see below.

## Decisions Made

- **`DECISION-014` extended** with the layout half: the 680px measure against wider media;
  no viewport-wide full-bleed while the contents rail is sticky in the same band; the rail
  at 1280px rather than 768px; the closing section on its own band; and the layout-based
  hash aiming.
- **`quote` and `figure` block kinds kept** though still unused. `quote` now has a designed
  pull-quote treatment and `MILESTONE-004` is where one would appear. Worth deleting if
  that pass ends without using them.

## Validation

- `npm run lint` — 0 errors, the same 3 pre-existing warnings. `npm run build` — green.
- Headless Chrome over the DevTools Protocol against the **production build**:
  - Both locales × six studies: identical block counts, one render path, every section
    with its eyebrow and reveal, no duplicate ids, the closing section outside the grid on
    its band in all twelve.
  - Measured widths at 375 / 768 / 1024 / 1280 / 1440: text 680px from 1024 up, media 960
    or 470 in grids, rail present only from 1280.
  - Active-section tracking walked through six sections: the rail names the right one and
    fills to it each time, and returns to 01 at the top.
  - The full prev/next ring, all six studies, scrolled end to end at each stop: nothing
    left hidden, every hop landing at `scrollY` 0.
  - **Every SESSION-002 journey re-run** at 1440px and 390px, with and without
    `prefers-reduced-motion`: cold `/#work`, `/#contact`, `/contact`, `/de/#about` all at
    104px; cross-route hash click 104px; same-page hash click 104px; route change from a
    scrolled page starts at 0; back restores 5000px exactly.
  - Contents-rail anchor clicks measured separately (they are native fragment scrolls, not
    router navigations): exact in both motion modes.
  - Under reduced motion nothing is hidden, on every study.
- Screenshots at each width and for each set piece — numbers confirmed the structure, but
  only the screenshots showed whether it reads better.

## Remaining Concerns

- **`ISSUE-026`** — the footer's link columns overflow the viewport by up to 24px between
  768px and 839px, on every page. Pre-existing, measured on the pre-session build too.
  Left for the responsive audit rather than spot-fixed.
- **`ISSUE-027`** — editing only the hash of the current URL is a fragment navigation the
  router never sees, so the browser's own jump lands on the reveal's at-rest position. Also
  pre-existing; every other route to an anchor is exact.
- **No viewport-wide full-bleed media.** It collides with the sticky rail. Doing it means
  taking the rail out of the flow first.
- **Text-only sections leave the right of the column empty.** That is the measure doing its
  job, but it is the thing most likely to read as "unfinished" to the owner — worth showing
  them early.
- Nothing enforces that `en` and `de` stay structurally identical; still true, still only
  review.
- The case studies are now as good as they get without **real images** (`MILESTONE-005` —
  the mechanism is ready, the files are not) and **the copy pass** (`MILESTONE-004`).
