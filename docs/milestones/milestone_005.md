# MILESTONE-005 — Real imagery

Status: Proposed
Priority: High
Goal: Replace stand-ins and placeholders with the owner's actual work.

## Why This Milestone Exists

The owner's second stated priority: "in all the placeholders, the images must be correct".
Two problems sit behind it — five wired-up files are flat colour blocks, and ~115 further
slots have no way to hold an image at all.

## Scope

The image data model, the asset pipeline, and importing the owner's exports.

## Tasks

- [ ] **SUGGESTION-002 / ISSUE-007** — add optional `src`/`alt` to `SectionImage`,
      `PlaygroundItem` and `carouselItems`; introduce a shared `<Figure>` that falls back
      to `PlaceholderImage` (may already be done in `MILESTONE-003`)
- [ ] **SUGGESTION-012** — add the build-time image pipeline **before** bulk importing, so
      5000×3750 originals do not ship raw. Note this likely means moving files from
      `public/images/` to `src/assets/` and updating every `src` string
- [ ] **ISSUE-006** — owner exports the five real files; drop in under the same filenames
- [ ] Fix the three alt strings that literally say "Placeholder: …"
- [ ] About portrait — a real photograph
- [ ] Case-study section figures — 71 slots, per `CONTENT_GUIDE.md` §5/§10
- [ ] About carousel — 8 photos
- [ ] **DECISION-006** — decide with the owner which Playground slots (36) keep the
      stylised placeholder permanently and which become photographs
- [ ] Resolve the 9 unused files in `public/images/` (delete or wire up)
- [ ] Give `CaseStudyHero` `priority` so the LCP image is not lazy-loaded
- [ ] A real `og:image`

## Relevant Issues

`ISSUE-006`, `ISSUE-007`

## Relevant Suggestions

`SUGGESTION-002`, `SUGGESTION-012`

## Relevant Decisions

`DECISION-005`, `DECISION-006`

## Relevant Code

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/ui/Image.tsx`, `src/components/PlaceholderImage.tsx`
- `public/images/` + `MANIFEST.md`, `vite.config.ts`
- `CONTENT_GUIDE.md` §10

## Dependencies

Blocked on owner-supplied assets — the largest external dependency in the roadmap.
`ROADMAP.md` Phase 2 already describes the hand-off.

## Completion Criteria

- Every wired-up slot shows real work.
- Every remaining placeholder is a deliberate, recorded choice.
- Images are served in modern formats at sensible sizes; no layout shift.
- `MANIFEST.md` updated to reflect reality.

## Out of Scope

Copy, layout, motion.

## Notes

Can proceed incrementally — each delivered photograph is an immediate visible improvement.
Consider doing the model change (`SUGGESTION-002`) early and independently, since it is
small and unblocks everything else here.
