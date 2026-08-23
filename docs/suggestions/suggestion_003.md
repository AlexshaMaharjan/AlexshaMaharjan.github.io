# SUGGESTION-003 — Redesign the case-study reading experience

Status: **Implemented** (SESSION-003: 4 and 6; SESSION-004: 1, 2, 3, 5)
Priority: High
Impact: High
Effort: Large

## Problem / Opportunity

The owner's first named priority. Each case study is currently a 240px sticky rail plus a
960px column of uniform 18px paragraphs, punctuated only by hatched placeholder grids.
Sections run 300–390 source lines. There is no visual rhythm, no scale variation, and
nothing that makes a reader want to reach section 09.

## Recommendation

Treat it as an editorial layout, not a document:

1. **Vary media width.** Let figures break out of the 960px column — full-bleed hero
   moments, wide two-ups, and small inline figures with real captions instead of bracketed
   placeholder labels.
2. **Give sections shape.** Alternate a wide intro paragraph with narrower supporting
   text; give the "Design question" callout, the insights grid and the testing 3-up
   distinct visual weights rather than the near-identical bordered blocks they use today.
3. **Add a reading-progress affordance.** The sticky rail is present but passive — mark
   the active section and show progress.
4. **Fix the first-section inconsistency** (`ISSUE-008`).
5. **Strengthen the ending.** The current final section flows straight into prev/next
   cards; a deliberate outcome/reflection treatment would land the work better.
6. **Establish a figure component** with caption, credit and optional full-bleed mode.

This depended on `ISSUE-024` — the layout could not improve much while sub-headings and
lists were stored as plain paragraphs. That dependency was met in SESSION-003 (point 4,
`ISSUE-008`, and point 6, the `Figure` component), and SESSION-004 did the rest.

## What was actually built

1. **Varied media width** — text sits at a 680px measure (~70 characters, down from ~110
   at the old 960px), wide images take the full 960px column, narrower ones pack into a 2-
   or 3-up grid at roughly a third of it. Three media scales against one text measure.
   *Not* built: viewport-wide full-bleed. It collides with the sticky contents rail, which
   shares the same horizontal band — recorded under `DECISION-014`.
2. **Sections have shape** — the design question is a tinted accent panel, the insights
   are numbered white cards, the testing steps a numbered row under accent rules.
3. **Reading progress** — the rail marks the section being read and fills its left edge as
   a progress track. It also moved to 1280px, having been squeezing the reading column to
   ~313px at 768px; below that the collapsible list names the current section.
4. `ISSUE-008` — done in SESSION-003.
5. **A stronger ending** — the closing section leaves the reading column for its own
   tinted band, heading beside text, before the prev/next cards.
6. **A figure component** — done in SESSION-003. Full-bleed mode was not added, per 1.

## Why

Six well-told case studies are the substance of this portfolio. Layout is what determines
whether they are read.

## Relevant Files

- `src/components/case-study/CaseStudyPage.tsx`, `Section.tsx`, `CaseStudyHero.tsx`,
  `FactsStrip.tsx`, `ContentsNav.tsx`, `NextProjectNav.tsx`
- `src/lib/caseStudies/types.ts`
- `design-reference/SPEC.md` §9 (the shell the current version ports)

## Dependencies

`ISSUE-024` / `SUGGESTION-004` (block model) first. `SUGGESTION-002` for real figures.

## Risks

Diverging from `design-reference/SPEC.md` §9. That is probably correct here — the
reference is a static mockup and the owner has explicitly asked for better — but record it
as a decision.

## Related Issues

`ISSUE-024`, `ISSUE-008`, `ISSUE-007`.

## Possible Milestone

`MILESTONE-003`.
