# MILESTONE-003 — Case-study layout and content model

Status: **Complete** — content model (SESSION-003) and layout (SESSION-004)
Priority: High
Goal: Turn the six case studies from uniform columns of paragraphs into readable
editorial pieces — the owner's first-named priority.

## Why This Milestone Exists

Six long-form case studies are the substance of this portfolio, and they are currently the
weakest-reading part of it: a 960px column of identical 18px paragraphs, punctuated by
hatched boxes, running eight or nine sections. The root cause is structural, not
cosmetic — `body: string[]` cannot express a sub-heading or a list, so sub-headings are
being stored as paragraphs and rendered as body text.

## Scope

The case-study template and the section content model. Layout and structure — **not** the
prose itself (that is `MILESTONE-004`).

## Tasks

Part one — content model (SESSION-003, `e844ad9`):

- [x] **ISSUE-024 / SUGGESTION-004** — block union, bare strings still accepted as
      paragraph shorthand. Shipped as `p` | `h3` | `list` | `quote` | `note` | `figure`;
      `note` was added for the disclosure and stats lines (`DECISION-014`)
- [x] Update `Section.tsx` to render each block kind distinctly
- [x] **SUGGESTION-002** — optional `src`/`alt` on `SectionImage`, plus a `<Figure>` that
      falls back to the hatched placeholder
- [x] Migrate the six data files — done in one pass, both locales together, since only the
      shape changed and no wording did
- [x] **ISSUE-008** — one render path for all sections; the first keeps its number, label,
      reveal and its own anchor id
- [x] Regenerate `CONTENT_GUIDE.md` §5 — now generated from the data by
      `scripts/content-guide-case-studies.mjs`, and complete for all six studies rather
      than only WikiMind
- [x] Verify at 375 / 768 / 1024 / 1440, both locales, reduced motion on and off

Part two — layout (SESSION-004, `4e4b5f7`):

- [x] **SUGGESTION-003** — varied media widths: text at a 680px measure, wide images at
      the full 960px column, narrower ones in a 2- or 3-up grid. Viewport-wide full-bleed
      was rejected — it collides with the sticky rail (`DECISION-014`)
- [x] Differentiated treatments: tinted accent panel for the design question, numbered
      white cards for insights, a numbered row under accent rules for testing steps
- [x] A stronger ending — the closing section leaves the reading column for its own
      tinted band, heading beside text
- [x] Active-section tracking and progress in `ContentsNav`
- [x] Fix the squeezed reading column — the rail now appears at 1280px rather than 768px;
      below that the collapsible list takes over and names the current section
- [x] Re-verify at 375 / 768 / 1024 / 1280 / 1440, both locales, reduced motion on and off

## Relevant Issues

`ISSUE-024`, `ISSUE-008`, `ISSUE-007`

## Relevant Suggestions

`SUGGESTION-003`, `SUGGESTION-004`, `SUGGESTION-002`

## Relevant Decisions

`DECISION-003`, `DECISION-006`, `DECISION-009` (a knowing departure from SPEC §9 — record
it as a new decision)

## Relevant Code

- `src/components/case-study/*` (all six files)
- `src/lib/caseStudies/types.ts` + the six data files
- `src/components/PlaceholderImage.tsx`, `src/components/ui/Image.tsx`
- `CONTENT_GUIDE.md` §5

## Dependencies

`MILESTONE-001`. Independent of `MILESTONE-002` — could run in parallel if preferred.

## Completion Criteria

- ✅ A case study reads with visible rhythm and hierarchy at every viewport. Three media
  scales against one text measure, three distinct set pieces, and a closing spread.
- ✅ Sub-headings and lists render as sub-headings and lists in all six studies, both
  locales. Measured in the browser: 38 sub-headings, 22 lists, 8 notes, both locales
  structurally identical.
- ✅ Figures can carry real images; captions read as captions, not `[ bracketed labels ]`
  — where a real image exists. Placeholders deliberately keep the bracketed label and no
  caption (`DECISION-014`).
- ✅ `CONTENT_GUIDE.md` matches the new structure, and is now generated from it.

## Out of Scope

Rewriting the prose (`MILESTONE-004`); supplying photographs (`MILESTONE-005`);
scroll-linked animation (`MILESTONE-006`).

## Notes

The German blocks must migrate alongside the English ones or the build breaks — the union
type applies to both. This is the largest structural change in the roadmap; consider
splitting it across two sessions (model first, layout second).

**Split as suggested.** SESSION-003 took the content model, SESSION-004 the layout.

What SESSION-004 found on the way: aiming a hash landing at an element's *rendered* box
races the scroll reveal, which translates sections down 18px until they play. The landing
came up short by whatever was left of the tween — invisible until this layout shifted the
timing. `useScrollBehavior` now aims at the layout position instead, which removed the
whole class of error (`DECISION-014`, `ISSUE-027` for the one path that still bypasses the
hook).

What remains for the case studies, and belongs to other milestones: real photographs
(`MILESTONE-005` — the mechanism is ready, the files are not), the copy pass
(`MILESTONE-004`), and scroll-linked motion (`MILESTONE-006`).
