# SUGGESTION-004 — Replace `body: string[]` with a typed block model

Status: Proposed
Priority: High
Impact: High
Effort: Medium

## Problem / Opportunity

Sub-headings, lists and paragraphs are all stored as bare strings in one array and render
identically (`ISSUE-024`). The content model, not the CSS, is what limits the case-study
layout.

## Recommendation

A discriminated union, with the current shape kept as shorthand so migration is
incremental:

```ts
type Block =
  | string                                   // shorthand: paragraph
  | { kind: "h3";    text: string }
  | { kind: "list";  items: string[]; ordered?: boolean }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "figure"; src?: string; alt?: string; aspect: string; caption: string; wide?: boolean };

interface CaseStudySection { …; body?: Block[] }
```

`Section.tsx` switches on `kind`. Migrate one case study at a time; `wikimind.ts`'s
`direction` section is the natural first (it contains a list *and* three sub-headings
currently rendered as paragraphs).

## Why

Unlocks `SUGGESTION-003` and makes the copy pass (`SUGGESTION-005`) far easier — a writer
can restructure rather than only reword.

## Relevant Files

- `src/lib/caseStudies/types.ts`, `src/components/case-study/Section.tsx`
- All six `src/lib/caseStudies/*.ts`
- `CONTENT_GUIDE.md` §5 — mirrors these arrays by index and must be regenerated after

## Dependencies

None technically; do it before the copy pass.

## Risks

`CONTENT_GUIDE.md` indexes every entry as `body[0]`, `body[1]`… Restructuring invalidates
those labels, so the guide needs regenerating in the same pass or it will mislead.

## Related Issues

`ISSUE-024`.

## Possible Milestone

`MILESTONE-003`.
