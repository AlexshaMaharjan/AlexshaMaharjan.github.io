# DECISION-017 — A case study opens with its contents rail, and the title lives inside Overview

Status: Active
Date: 2026-08-25 (owner, SESSION-017)
Scope: All six case-study pages, both locales

## Context

The owner's words: *"when a case study is opened, the title, description and all is shown,
when scrolled, the sidebar comes and sticks. what i want is, the sidebar should always be
visible. the title and all is too large right now, they should be smaller and should come
under overview itself."*

The rail was already `position: sticky`. What it was not was *present*: it lived inside a
grid that only began after `CaseStudyHero` (back link, headline at `text-hero` — up to 88px —
summary, disclosure, tags, hero image) and `FactsStrip` (a full-width six-cell grid). That is
close to two screenfuls. The rail could not stick to anything until the reader had scrolled
past all of it.

## Decision

**Nothing sits above the two-column grid.** The grid starts directly under the back link, so
the rail is on screen when the page opens. The hero image and every section moved into the
right-hand column with it.

**The title, description, tags and facts moved inside the first section**, rendered through a
new optional `intro` slot on `Section` between the section's eyebrow and its heading. The page
reads: `01 Overview` → title → description → tags → facts → the section's own heading → prose.

**The headline steps down** from `text-hero` (clamp 44–88px) to `text-feature` (30–52px), and
**the first section's heading steps down** from `text-heading` to `text-subheading`. Under an
`h1` at 52px, a 44px `h2` competed rather than subordinated.

**The facts became a label/value list** at the 680px measure instead of a full-width auto-fit
card grid, and lost a field:

- **`year` is removed** — the owner's call, and removed from the data, the type and the
  dictionary rather than left as another dead field (`ISSUE-010`).
- **`type` reads "Semester project · solo" or "Semester project · team"**, replacing
  "Independent project" / "Collaborative university project". Every one of the six is
  coursework; the documentations behind them are module submissions. The solo/team half is
  not decoration — `DECISION-011` forbids collaborative work reading as independent.

## Reasoning

The three requests are one change. A sticky rail is only visible on load if nothing precedes
it; nothing can precede it unless the title block moves down; the title block only fits in the
column if it gets smaller. Doing any one of them alone would have left the other two odd.

The facts list also fixes something the owner did not name. The old `auto-fit` grid ran the
full page width, so a study with three facts spread them across the whole strip while one with
five wrapped — six case studies, six different shapes. As a label/value list the sparse studies
simply have fewer rows.

## Consequences

- **The hero image is smaller**: it renders in the reading column, about 960px at desktop
  instead of the container's ~1280px. This is the price of the rail being visible, and it was
  paid knowingly.
- **QIS Portal's "2024 · 2026 visual iteration" is gone with the year.** That the project was
  revisited is no longer stated anywhere on the page. Flagged to the owner; if it matters it
  belongs in prose, which is `MILESTONE-004`.
- `CaseStudyHero` is now the image and nothing else, and passes `priority`, closing part of
  `SUGGESTION-012` point 3.
- **`SUGGESTION-008`'s "sticky facts" idea is largely answered.** The facts are no longer a
  band the reader scrolls past and loses; they sit inside Overview, one rail-click away.

## Alternatives Rejected

**Leave the hero full-width and start the grid below it.** Keeps the image at 1280px, but at
1440×900 the rail's first item lands around y≈700 — technically on screen, and gone on any
shorter laptop. "Always visible" then depends on the reader's viewport, which is exactly the
complaint.

**Move the rail into the header as a horizontal progress bar.** Visible everywhere, but it
stops being a table of contents, and the section list is the thing worth having.

**Keep `year` in the data and only stop rendering it.** Less work, and it creates precisely
the dead-field problem `ISSUE-010` exists to clean up.
