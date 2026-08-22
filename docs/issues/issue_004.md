# ISSUE-004 — Homepage "Selected Work" shows no project imagery and duplicates projects

Status: Open
Priority: High
Category: UI/UX / Regression
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

The homepage's central section — the one that has to sell six projects — currently
renders eleven flat grey rectangles containing only a category label and a title. No
images, no headline, no description, no tags, no role, no year. Six projects are spread
across eleven tiles, so five of them appear twice under different category labels.

## Evidence / Current Behavior

- `src/components/BentoGrid.tsx:14-26` — 11 hard-coded cards. `wikimind`, `afono`,
  `sync-fm`, `surugami` and `qis-portal` each appear twice (e.g. "WikiMind — Brand &
  UI/UX" and "WikiMind — Web Design" both link to `/work/wikimind`).
- `src/components/BentoGrid.tsx:44` — tile background is a flat `bg-[#E6E7E9]`.
- `src/components/SelectedWork.tsx` no longer reads `dictionary.projects` at all
  (`git diff src/components/SelectedWork.tsx`).
- `src/components/ProjectEntry.tsx` — which rendered image + headline + description +
  tags + role/year per project — is **deleted** in the working tree.
- `barrier-free-kitchen` appears once, labelled only "Kitchen".

This is uncommitted in-progress work, not shipped state.

## Expected Behavior

The section should present each project once, image-led, with enough copy for a visitor
to decide whether to open the case study — per `design-reference/SPEC.md` §4 item 7 and
§6 (a 2 + 4 hierarchy: WikiMind and AFONO as large editorial features, the other four in
a two-column grid).

## Relevant Files

- `src/components/BentoGrid.tsx`, `src/components/SelectedWork.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx` (the deleted previous implementation)
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`
- `design-reference/SPEC.md` §4, §6

## Possible Cause

A layout experiment (bento grid) that was started but never given imagery or content, and
which the prior implementation was deleted for.

## Possible Solution

Decide with the owner between (a) restoring the editorial `ProjectEntry` layout, (b)
keeping a bento but making each tile image-backed, one tile per project, driven by
`dictionary.projects`. Either way the tiles must read from the dictionary so German works
(`ISSUE-005`) and the imagery problem (`ISSUE-006`) is on the critical path.

## Dependencies

`ISSUE-006` (real images) determines how good any version can look.

## Related

`ARCH-05`, `DECISION-010`, `MILESTONE-002`, `SUGGESTION-001`, `ISSUE-005`.
