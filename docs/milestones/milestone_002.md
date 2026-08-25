# MILESTONE-002 — Rebuild the homepage "Selected Work" section

Status: **In progress** — `DECISION-010` answered 2026-08-24 (keep the bento);
`ISSUE-005` fixed and the tiles are image-ready (SESSION-008)
Priority: High
Goal: Make the homepage's central section present six projects, once each, with real
imagery and enough copy to earn a click — in both languages.

## Why This Milestone Exists

This section is where a visitor decides whether to read further. Today it is eleven flat
grey tiles, five projects listed twice, no images, no descriptions, and English text on
the German site. It is also unfinished, uncommitted work whose direction the owner has not
confirmed.

## Scope

`SelectedWork` / `BentoGrid` and the `ProjectCopy` data behind them. Homepage only.

## Tasks

- [ ] **Get the owner's decision on `DECISION-010`** — keep the bento direction, or return
      to the editorial layout in `git show HEAD:src/components/ProjectEntry.tsx`
- [ ] Rebuild the section from `dictionary.projects`: one entry per project
- [ ] Wire real hero imagery. **The source is known now** — the eleven tiles map to six
      project documentations, listed in `docs/reference/image_sources.md`. Tiles are *covers*,
      so they take the darken-and-tint treatment described there; the contrast ceiling
      (`#80` or darker behind the white label and title) is measured, not a guess
- [ ] Restore visible headline / description / tags / role / year at an appropriate density
- [ ] **ISSUE-005** — every string from the dictionary; verify `/de`
- [ ] Give tiles a hover/focus treatment consistent with the rest of the site
- [ ] Responsive check at 375 / 768 / 1024 / 1440; remove the `!important`
      `[data-el="bento"]` override from `index.css` if the grid moves to classes
- [ ] Confirm which `ProjectCopy` fields are live again and update `ISSUE-010`

## Relevant Issues

`ISSUE-004`, `ISSUE-005`, `ISSUE-006` (dependency), `ISSUE-010`

## Relevant Suggestions

`SUGGESTION-001`

## Relevant Decisions

`DECISION-010` (must be resolved first), `DECISION-009`, `DECISION-002`

## Relevant Code

- `src/components/SelectedWork.tsx`, `src/components/BentoGrid.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx`
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`, `selectedWork`
- `src/index.css` (`[data-el="bento"]`), `design-reference/SPEC.md` §4, §6

## Dependencies

`MILESTONE-001` (a stable base). Real hero images (`ISSUE-006`) for the section to look
finished — the work can proceed with stand-ins.

## Completion Criteria

- Six projects, each appearing exactly once, each with an image.
- German homepage fully German.
- No dead `ProjectCopy` fields left unaccounted for.
- Owner has seen and approved the direction.

## Out of Scope

Case-study pages, a `/work` index page (`SUGGESTION-014`), the wider design-system sweep.

## Notes

Tile 8 (AFONO — Graphic) renders at 224×322 and exports at 400px: it needs a detail crop, not
a page screenshot. Several projects appear on two tiles under different categories — those
two images have to be visibly different work, or the wall reads as padding.


Do not delete `BentoGrid` before the owner has decided — the asymmetric composition may be
exactly what they want, just with images in it.
