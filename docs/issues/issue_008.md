# ISSUE-008 — First case-study section renders without its number, label and reveal

Status: Open
Priority: Medium
Category: UI/UX / Consistency
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

Every case-study section is introduced by a monospace number and a blue nav label
("01 / Overview"). The first one is not — it silently loses both, and also never fades in,
because it takes a different render branch.

## Evidence / Current Behavior

`src/components/case-study/Section.tsx:76-87`: when `first` is true the component returns
the bare content `<div>`. The `<section id … data-inview>` wrapper — which carries the
`section.number` + `section.navLabel` header block **and** the `data-inview` reveal hook —
is only rendered for non-first sections.

The `id` is compensated for in `CaseStudyPage.tsx:31` (`<section id={firstSection?.id}>`),
so anchor navigation still works, but the visual eyebrow is gone. The data is present and
unused: every case study's `sections[0]` has `number: "01"` and a `navLabel`.

Consequence: the reading column starts with a bare `<h2>` while sections 02–09 all have a
two-line eyebrow, and the first section has no entrance animation while the rest do.

## Expected Behavior

Consistent treatment for every section, or an intentional, documented difference.

## Relevant Files

- `src/components/case-study/Section.tsx`
- `src/components/case-study/CaseStudyPage.tsx`
- `src/components/case-study/ContentsNav.tsx`

## Possible Cause

The `first` branch exists to avoid a top margin (`mt-24`) and a duplicate `id`; it removed
more than intended.

## Possible Solution

Keep one render path and vary only the top margin, moving the `id` responsibility fully
into `Section`. Folds naturally into the case-study layout rework.

## Dependencies

None.

## Related

`MILESTONE-003`, `SUGGESTION-003`.
