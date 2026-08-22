# MILESTONE-003 — Case-study layout and content model

Status: Proposed
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

- [ ] **ISSUE-024 / SUGGESTION-004** — introduce a block union
      (`p` | `h3` | `list` | `quote` | `figure`), keeping bare strings as paragraph
      shorthand so migration is incremental
- [ ] Update `Section.tsx` to render each block kind distinctly
- [ ] **SUGGESTION-002** — add optional `src`/`alt` so figures can hold real images
- [ ] Migrate the six data files, one at a time, starting with `wikimind.ts` `direction`
- [ ] **SUGGESTION-003** — rework the layout: varied media widths (including full-bleed),
      a proper `<Figure>` with caption, differentiated treatments for the design-question
      callout / insights grid / testing 3-up, and a stronger ending before the prev/next nav
- [ ] Active-section tracking and progress in `ContentsNav`
- [ ] **ISSUE-008** — one render path for all sections; first section keeps its number and label
- [ ] Regenerate the affected parts of `CONTENT_GUIDE.md` §5 (its `body[n]` indices become
      invalid)
- [ ] Verify at 375 / 768 / 1024 / 1440, both locales, reduced motion on and off

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

- A case study reads with visible rhythm and hierarchy at every viewport.
- Sub-headings and lists render as sub-headings and lists in all six studies, both locales.
- Figures can carry real images; captions read as captions, not `[ bracketed labels ]`.
- `CONTENT_GUIDE.md` matches the new structure.

## Out of Scope

Rewriting the prose (`MILESTONE-004`); supplying photographs (`MILESTONE-005`);
scroll-linked animation (`MILESTONE-006`).

## Notes

The German blocks must migrate alongside the English ones or the build breaks — the union
type applies to both. This is the largest structural change in the roadmap; consider
splitting it across two sessions (model first, layout second).
