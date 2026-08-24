# SUGGESTION-002 — Give every image slot an optional real source

Status: **Implemented** (SESSION-003 `e844ad9`, completed SESSION-008 `ee3857f`)
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

## What was actually built

`SectionImage` took the `src?` / `alt?` fields and `src/components/case-study/Figure.tsx`
is the shared component, used by both `section.images[]` and the (as yet unused) `figure`
block kind. `PlaygroundItem` and `about.carouselItems[]` were left alone: they are
outside `MILESTONE-003`, and the Playground is exactly where the placeholder may be a
deliberate choice rather than a gap, which is still `DECISION-006`'s open question for
the owner.

SESSION-008 finished the rest, once `DECISION-006` was answered: `PlaygroundItem`, the
About carousel, the playground project image and the two hero collage cards all take a
`src`/`alt`, and `src/components/ui/Media.tsx` is the one component that chooses between
the image and the placeholder. `Figure` builds on it.

One departure: `Figure` shows a caption **only** when a real `src` exists. A placeholder
keeps its `[ bracketed label ]` inside the hatched box, and repeating it underneath as a
caption would say the same thing twice — the bracket is the site's signal that no asset
exists yet (`DECISION-014`).

## Related Issues

`ISSUE-007`, `ISSUE-006`.

## Possible Milestone

`MILESTONE-005` (or pull forward into `MILESTONE-003`, since case-study figures need it).
