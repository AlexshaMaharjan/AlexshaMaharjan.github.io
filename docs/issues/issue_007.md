# ISSUE-007 — ~115 image slots have no image mechanism in the data model

Status: **Partially resolved** (SESSION-003, `e844ad9`) — case studies done, 44 slots left
Priority: High
Category: Architecture / Content
Discovered: 2026-08-22 (documented earlier in `CONTENT_GUIDE.md` §10.4)
Last reviewed: 2026-08-23

## Summary

Most images on the site cannot be supplied at all, because the types describing them
carry only a caption and an aspect ratio — no source field. Attaching a real photo needs a
code change, not a content edit.

## Evidence / Current Behavior

- `src/lib/caseStudies/types.ts:11-14` — `SectionImage { aspect, caption }`. Consumed by
  `src/components/case-study/Section.tsx:66-72`, which unconditionally renders
  `<PlaceholderImage>`. **71 slots** across the six case studies.
- `src/lib/playground/types.ts:1-8` — `PlaygroundItem { caption, aspect, … }`. Consumed
  by `PlaygroundCard.tsx:31`, `CategoryMarquee.tsx:57`, `ProjectPage.tsx:38`,
  `PlaygroundIndex.tsx`. **36 slots**.
- `src/lib/dictionaries/types.ts` → `about.carouselItems: { alt, caption }[]`. Consumed by
  `src/pages/About.tsx:164`. **8 slots**.

## Progress

**The 71 case-study slots are done.** `SectionImage` now carries optional `src` and
`alt`, and a new `src/components/case-study/Figure.tsx` renders a real `<img>` with a
readable caption when `src` is set, falling back to `PlaceholderImage` when it is not.
Attaching a photo to a case-study figure is now a one-line data edit; verified in the
browser with a real file wired temporarily into WikiMind's `direction` section (image
loaded, caption read "moodboard", the other four slots stayed placeholders) and then
reverted, since none of the spare files in `public/images/` is a real export.

**Still open: 44 slots** — `PlaygroundItem` (36) and `about.carouselItems[]` (8). Both
still carry caption + aspect only. The Playground ones are also the slots where the
placeholder may be a deliberate choice rather than a gap (`DECISION-006`), so they need
the owner's answer before the type changes.

## Expected Behavior

Any of these slots can be given a real image by editing data alone, falling back to
`PlaceholderImage` when no source is set.

## Relevant Files

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/case-study/Section.tsx`, `src/components/playground/PlaygroundCard.tsx`,
  `src/components/playground/CategoryMarquee.tsx`, `src/components/playground/ProjectPage.tsx`,
  `src/pages/About.tsx`, `src/pages/playground/PlaygroundIndex.tsx`
- `src/components/ui/Image.tsx`, `src/components/PlaceholderImage.tsx`

## Possible Cause

The design reference models every image slot as a placeholder, and the port implemented
the placeholder faithfully without adding the eventual real-asset path.

## Possible Solution

Add optional `src?: string` and `alt?: string` to the three item types, then introduce one
shared `<Figure>` that renders `<Image>` when `src` is present and `PlaceholderImage`
otherwise. TypeScript optionality means no existing data has to change. See
`SUGGESTION-002`.

**Note:** for the Playground, the hatched placeholder is a deliberate part of the visual
language (`DECISION-006`) — decide per slot, not wholesale.

## Dependencies

Prerequisite for `MILESTONE-005`. Owner needs to supply photos afterwards.

## Related

`ARCH-02`, `ARCH-05`, `SUGGESTION-002`, `MILESTONE-005`, `ISSUE-006`.
