# ISSUE-010 — Dead fields across the content types

Status: Open
Priority: Medium
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

Roughly a dozen typed fields are still required (or filled in) in both locale files but
read by nothing. They cost real editing effort in `CONTENT_GUIDE.md` and mislead anyone
reasoning about the data model.

## Evidence / Current Behavior

Verified by grepping `src/components` and `src/pages` for each name — zero hits:

| Field | Declared in |
| --- | --- |
| `selectedWork.viewCaseStudy`, `selectedWork.projectLabel` | `dictionaries/types.ts` |
| `ProjectCopy.projectTag`, `.placeholderLabel`, `.imageAspect` | `dictionaries/types.ts` |
| `ProjectCopy.headline`, `.description`, `.role`, `.year`, `.featured` | used **only** by the deleted `ProjectEntry.tsx`; `NextProjectNav` uses just `slug`/`name`/`tags`/`image`/`imageAlt` |
| `PlaygroundHomeContent.gallery`, `.galleryHeading`, `.noteHeading`, `.returnHeading` | `playground/types.ts` — already empty strings/arrays in `home.ts` |
| `PlaygroundProjectContent.eyebrow` | `ProjectPage` uses `dictionary.playgroundNav.experimentEyebrow` instead |
| `CaseStudyContent.projectTag` | `CaseStudyHero` composes `name · year/type` itself |

## Expected Behavior

The types describe what is actually rendered.

## Relevant Files

- `src/lib/dictionaries/types.ts`, `en.ts`, `de.ts`
- `src/lib/playground/types.ts`, `home.ts`
- `src/lib/caseStudies/types.ts` (+ six data files)

## Possible Cause

Fields were introduced for the original homepage/playground layouts and orphaned when
those components changed.

## Possible Solution

**Do not delete yet.** Most of the `ProjectCopy` fields become live again the moment
`ISSUE-004` is resolved with an image-led work section. Resolve `ISSUE-004` first, then
remove whatever is still dead — that is a mechanical edit across `types.ts` + two locale
files + six case-study files.

## Dependencies

Sequenced after `ISSUE-004` / `MILESTONE-002`.

## Related

`ARCH-02`, `MILESTONE-007`.
