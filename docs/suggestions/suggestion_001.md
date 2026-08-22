# SUGGESTION-001 — Rebuild "Selected Work" as an image-led, single-entry-per-project section

Status: Proposed
Priority: High
Impact: High
Effort: Medium

## Problem / Opportunity

The homepage's work section is the deciding moment for a visiting recruiter or client. It
currently shows eleven grey rectangles with a title and a category, five projects listed
twice, and no imagery or description (`ISSUE-004`, `ISSUE-005`).

## Recommendation

One tile per project, image-backed, driven entirely by `dictionary.projects`. Two viable
directions:

- **A — Editorial (matches the design reference).** WikiMind and AFONO as full-width
  features with large imagery, headline, description, tags, role and year; the other four
  in a two-column grid. This is what `design-reference/SPEC.md` §4/§6 specifies and what
  the deleted `ProjectEntry.tsx` implemented.
- **B — Image-backed bento.** Keep the asymmetric grid the owner started, but make each
  tile a real image with an overlaid title/category, six tiles instead of eleven, sized
  to express hierarchy.

B is more distinctive and closer to the owner's current intent; A is safer and already
has a working implementation in git history. Either way: read from the dictionary, one
entry per project, real imagery, and a visible affordance to open the case study.

## Why

An image-led grid is the difference between "six links" and "six pieces of work". It also
reactivates `ProjectCopy` fields that are currently dead (`ISSUE-010`).

## Relevant Files

- `src/components/SelectedWork.tsx`, `src/components/BentoGrid.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx`
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`, `selectedWork`
- `design-reference/SPEC.md` §4, §6

## Dependencies

Real hero images (`ISSUE-006`) — a bento of stand-in colour blocks will look no better
than grey boxes.

## Risks

Reverting to A discards the owner's in-progress bento direction; confirm before choosing.

## Related Issues

`ISSUE-004`, `ISSUE-005`, `ISSUE-006`, `ISSUE-010`.

## Possible Milestone

`MILESTONE-002`.
