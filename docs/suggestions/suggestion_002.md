# SUGGESTION-002 — Give every image slot an optional real source

Status: Proposed
Priority: High
Impact: High
Effort: Small

## Problem / Opportunity

~115 image slots can only ever render as hatched placeholders because their types carry no
source field (`ISSUE-007`). No amount of content editing can fix that.

## Recommendation

Add optional fields — `src?: string`, `alt?: string` — to `SectionImage`,
`PlaygroundItem` and `about.carouselItems[]`, and introduce one shared component:

```
<Figure src? alt? aspect caption />
  → <Image> when src is set, <PlaceholderImage> otherwise
```

Replace the direct `PlaceholderImage` calls in `Section.tsx`, `PlaygroundCard.tsx`,
`CategoryMarquee.tsx`, `ProjectPage.tsx`, `PlaygroundIndex.tsx` and `About.tsx`.

Because the fields are optional, no existing data changes and the build stays green — the
placeholder stays the default, which preserves `DECISION-006`.

## Why

Small, low-risk, and it unblocks every future image task: after this, adding a photo is a
one-line data edit.

## Relevant Files

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/PlaceholderImage.tsx`, `src/components/ui/Image.tsx`
- The six call sites listed above

## Dependencies

None. Should land before any bulk image work.

## Risks

Minimal. Watch that the Playground keeps its intentional placeholder aesthetic where it
is a design choice rather than a gap.

## Related Issues

`ISSUE-007`, `ISSUE-006`.

## Possible Milestone

`MILESTONE-005` (or pull forward into `MILESTONE-003`, since case-study figures need it).
