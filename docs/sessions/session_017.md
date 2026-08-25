# SESSION-017 — The case-study page opens with its rail

Date: 2026-08-25
Milestone: MILESTONE-003 / MILESTONE-007 (owner-directed design change)
Status: Complete
Commit: `a8aa0fd`

---

## Objective

Three changes the owner asked for, in their words: the sidebar should always be visible; the
title and description are too large and should come under Overview; remove the year, have
every project say "semester project" somewhere, and make that facts section better and short.

## They were one change

The rail was already `sticky`. What it was not was *present* — it lived in a grid that only
began after the hero (back link, `text-hero` headline up to 88px, summary, disclosure, tags,
image) and a full-width facts strip. Close to two screenfuls before the rail existed to stick.

So: nothing may sit above the grid → the title block has to move down → it only fits in the
column if it gets smaller. Each request is the precondition for the next. Recorded as
`DECISION-017`.

The page now reads: back link, then rail beside the hero image, then `01 Overview`, then
title, description, tags, facts, then the section's own heading and prose.

`Section` gained one optional slot, `intro`, rendered between the eyebrow and the heading.
`CaseStudyIntro` fills it. `CaseStudyHero` is the image and nothing else.

## Two things that fell out of it

**The heading hierarchy went flat before it went right.** With the `h1` at `text-feature`
(52px at 1440) sitting directly above the first section's `h2` at `text-heading` (44px), the
two competed. The first section's heading now steps down to `text-subheading` (36px) — it is
an introduction, not a chapter title.

**The facts strip had a problem the owner did not name.** It was an `auto-fit` grid across the
full page width, so a study with three facts spread them across the whole strip while one with
five wrapped: six case studies, six different shapes. As a label/value list at the reading
measure, the sparse ones simply have fewer rows.

## The data changes

- **`year` removed** from the six studies, from `CaseStudyContent`, and from the dictionary
  label — not merely hidden, which would have made it another `ISSUE-010` dead field.
- **`type` now reads "Semester project · solo" / "Semester project · team"** (and
  "Semesterprojekt · allein" / "· Team"), replacing "Independent project" and "Collaborative
  university project". Every one of the six is coursework — the documentations behind them are
  module submissions — and `DECISION-011` does not allow collaborative work to read as
  independent, so the solo/team half stays.

## What the owner should know

**QIS Portal's year was `"2024 · 2026 visual iteration"`.** Removing the year removed the only
statement that the project was revisited two years later. If that matters it belongs in prose,
which is `MILESTONE-004`.

**The hero image is smaller** — it renders inside the reading column now, about 960px at
desktop instead of ~1280px. That is the price of the rail being visible from the top.

---

## Verification

Against the production build, in Chrome, through CDP:

- **The scroll journeys, which this layout could most easily have broken** — every anchored
  section moved into a grid. Green at 1440 and 390 with motion on and off: five cold hash
  loads, cross-route and same-page hash clicks, **the contents-rail click**, route change to
  the top, and back/forward restore.
- **All twelve case-study pages** (six studies × two locales): exactly one `h1`, valid heading
  order, `h1` 51.84px against `h2` 36px, every one saying "Semester project"/"Semesterprojekt",
  no year anywhere.
- **The rail measured on load**, not eyeballed: on screen at `scrollY: 0`, top 208px.
- 38 routes fine under reduced motion, axe **0 violations**, reveal ring clear, overflow clean.
- 86 images across 24 route/locale pairs — none broken, none missing `alt`.
- `hreflang` 8/8 **after `npm run prerender`** — `npm run build` alone leaves the baked heads
  stale, which looked like a regression for a minute and was not.
- `npm run lint` (0 errors, 3 pre-existing warnings), `npm run build` and `tsc --noEmit` clean.

## Documentation kept honest

`CONTENT_GUIDE.md` §5 regenerated, and its stale `year` label line removed by hand.
`architecture_02.md`, `codebase/components.md`, `suggestion_012.md` and `milestone_005.md`
updated — the last two because `CaseStudyHero` now passes `priority`, which closes part of
`SUGGESTION-012` point 3.

## What did not change

No prose (`MILESTONE-004`). No images. The rail is still `xl`-and-up only, with the
collapsible `<details>` below 1280px — the owner's complaint was about it arriving late, not
about its absence on narrow screens. Nothing pushed, nothing deployed.
