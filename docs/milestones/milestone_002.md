# MILESTONE-002 — Rebuild the homepage "Selected Work" section

Status: **Complete** (SESSION-025). `DECISION-010` answered 2026-08-24 (keep the bento);
`ISSUE-005` fixed SESSION-008; all eleven tiles carry real images since SESSION-016; the
`!important` override removed and the grid verified at six widths in SESSION-025.
**Two of the original tasks were superseded by `DECISION-010` rather than done** — see below.
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

- [x] **Get the owner's decision on `DECISION-010`** — answered 2026-08-24: keep the bento
- [~] ~~Rebuild the section from `dictionary.projects`: one entry per project~~ —
      **superseded by `DECISION-010`**, which kept the eleven-tile wall on purpose: "five of
      six projects appear twice under different category labels. With images that reads as a
      portfolio of work rather than a duplicate list, so it stays"
- [x] **Wire real tile imagery** — all eleven done in SESSION-016 from the six project
      documentations. Each is cropped, darkened, desaturated and tinted with its own
      project's colour, and each is *measured* against the contrast ceiling by
      `scripts/image-treat.mjs`, which fails the run if a tile is too bright
- [~] ~~Restore visible headline / description / tags / role / year at an appropriate
      density~~ — **superseded by `DECISION-010`**, which specifies a category label and a
      title over the image and nothing else. Adding four more fields to eleven tiles would
      undo the composition the owner approved. The copy is kept in the data for a future
      `/work` index (`SUGGESTION-014`); see `ISSUE-010`
- [x] **ISSUE-005** — every string from the dictionary; `/de` verified in Chrome
- [x] Give tiles a hover/focus treatment consistent with the rest of the site — hover moves
      the background and scales the image 1.03; focus uses the site-wide `:focus-visible`
      ring from `index.css`, which the tile inherits rather than redefining
- [x] Responsive check at 375 / 768 / 1024 / 1440 **and at the 880/881 boundary itself**;
      the `!important` override is gone (SESSION-025)
- [x] Confirm which `ProjectCopy` fields are live again and update `ISSUE-010` — five are
      live, four were removed, four are kept for `SUGGESTION-014`. `ISSUE-010` is resolved

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

- ~~Six projects, each appearing exactly once, each with an image.~~ **Superseded** — eleven
  tiles, all with images, five projects appearing twice by the owner's decision.
- [x] German homepage fully German — `ISSUE-005`, verified in Chrome.
- [x] No dead `ProjectCopy` fields left unaccounted for — `ISSUE-010`.
- [x] Owner has seen and approved the direction — `DECISION-010`, 2026-08-24.

## How the `!important` came out (SESSION-025)

The override existed because the grid was defined as inline `style` on the component, and no
stylesheet rule can outrank a `style` attribute. Both the container styles and the per-tile
placement moved into `index.css`; the placement, which is per-tile data, arrives as a custom
property (`--bento-area`) that a stylesheet rule then consumes. **A variable set inline can be
used by a rule, and that rule can be overridden by a later one** — which is what lets the
phone layout win on ordinary cascade order.

Verified at 375 / 768 / **880 / 881** / 1024 / 1440 against the production build. The
boundary is the part worth checking, and it behaves exactly as before: 1 column capped at
520px below it, 10 columns capped at 1120px above it, 11 tiles and no horizontal overflow at
any width.

## Out of Scope

Case-study pages, a `/work` index page (`SUGGESTION-014`), the wider design-system sweep.

## Notes

Tile 8 (AFONO — Graphic) renders at 224×322 and exports at 400px: it needs a detail crop, not
a page screenshot. Several projects appear on two tiles under different categories — those
two images have to be visibly different work, or the wall reads as padding.


Do not delete `BentoGrid` before the owner has decided — the asymmetric composition may be
exactly what they want, just with images in it.
