# ISSUE-005 — Homepage work grid is hard-coded English, breaking the German site

Status: Open
Priority: High
Category: Bug / i18n
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`BentoGrid` holds its card titles and category labels as English string literals, so
`/de` renders an English work section on the German homepage.

## Evidence / Current Behavior

`src/components/BentoGrid.tsx:14-26` — `category: "Brand & UI/UX"`, `"UX Research"`,
`"Inclusive Design"`, `"Poster & Print"` etc. are literals in the component. Only
`locale` is threaded through, and only to build hrefs.

Every other section of the site correctly reads from `dictionary` (`ARCH-02`).
Additionally the `aria-label` on each tile is built from these English literals.

## Expected Behavior

All visible strings come from `src/lib/dictionaries/{en,de}.ts`, as everywhere else.

## Relevant Files

- `src/components/BentoGrid.tsx`
- `src/lib/dictionaries/types.ts`, `en.ts`, `de.ts`

## Possible Cause

Rapid prototyping of the new grid without wiring the dictionary.

## Possible Solution

Fold the tile data into `ProjectCopy` (or a new `selectedWork.tiles[]` field typed in
`types.ts`) so TypeScript forces both locales to be filled in. Resolve alongside
`ISSUE-004` — the same rewrite.

## Dependencies

Blocked by the `ISSUE-004` design decision.

## Related

`ARCH-02`, `MILESTONE-002`, `SUGGESTION-001`.
