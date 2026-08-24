# DECISION-010 — Homepage work section replaced with a bento grid

Status: **Active** — confirmed by the owner, 2026-08-24
Date: Uncommitted working tree, 2026-08; confirmed 2026-08-24 (SESSION-008)
Scope: Homepage

## Context

The homepage originally rendered `dictionary.projects` through `ProjectEntry.tsx` as two
large editorial features plus a four-item grid, matching `design-reference/SPEC.md` §4/§6.

## Owner's answer (2026-08-24)

**Keep the bento grid**, and the owner will produce the images for it. That settles the
direction `MILESTONE-002` was blocked on since SESSION-002: the work is no longer "should
this exist" but "make it carry images, in both languages".

What that leaves to do, in `MILESTONE-002`:

- the eleven tiles need images (`ISSUE-004`) — the owner is making them; the slots and the
  manifest are in `docs/reference/image_manifest.md`
- the tile copy has to come from the dictionaries rather than being hard-coded English
  (`ISSUE-005`)
- five of six projects appear twice under different category labels. With images that
  reads as a portfolio of work rather than a duplicate list, so it stays — but it means
  eleven images, not six.

## Decision (as implemented, not yet approved)

Replace it with `BentoGrid` — eleven tiles on a 10-column CSS grid with explicit
`gridArea` placement, each showing a category label and a title on a flat grey background.
`ProjectEntry.tsx` was deleted.

## Reasoning

**Unknown / inherited from an in-progress experiment.** No rationale is recorded in the
code or commit history — the change is uncommitted. The likely intent is a more
distinctive, asymmetric composition than the reference's editorial stack.

## Alternatives

Keeping the editorial layout; an image-backed bento with one tile per project.

## Consequences

- All project imagery, headlines, descriptions, tags, roles and years disappeared from the
  homepage (`ISSUE-004`).
- Tile copy is hard-coded English, breaking `/de` (`ISSUE-005`).
- Five of six projects appear twice under different category labels.
- Several `ProjectCopy` fields became dead (`ISSUE-010`).
- Diverges from `DECISION-009`.

## Status note

Marked **Under review** rather than Active: this is unfinished work, not a settled choice.
The owner should confirm the direction before `MILESTONE-002` proceeds. Recover the
previous implementation with `git show HEAD:src/components/ProjectEntry.tsx`.

## Relevant Files

`src/components/BentoGrid.tsx`, `src/components/SelectedWork.tsx`, `src/index.css`
(the `[data-el="bento"]` override)

## Related Issues / Milestones

`ISSUE-004`, `ISSUE-005`, `ISSUE-010`, `MILESTONE-002`, `SUGGESTION-001`
