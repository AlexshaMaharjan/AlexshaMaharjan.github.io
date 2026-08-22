# SUGGESTION-003 — Redesign the case-study reading experience

Status: Proposed
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

This depends on `ISSUE-024` — the layout cannot improve much while sub-headings and lists
are stored as plain paragraphs.

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
