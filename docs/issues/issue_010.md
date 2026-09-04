# ISSUE-010 — Dead fields across the content types

Status: **Resolved** (SESSION-025)
Priority: Medium
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-09-04 (SESSION-025)

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


## Resolved, SESSION-025

This issue said **"Do not delete yet — most of the `ProjectCopy` fields become live again the
moment `ISSUE-004` is resolved with an image-led work section."** That premise expired:
`DECISION-010` settled the homepage as a bento of eleven tiles showing **a category label and a
title**, and nothing else. The editorial fields are not coming back.

Confirmed by tracing the readers rather than by grepping names — `ProjectCopy` reaches exactly
one component, `NextProjectNav` (via `pages/CaseStudy.tsx`), which uses `slug`, `name`, `tags`,
`image` and `imageAlt`.

**Removed** — structural, no authored prose:

- `ProjectCopy.projectTag`, `.placeholderLabel`, `.imageAspect`, `.featured` (24 lines across
  the two dictionaries)
- `selectedWork.viewCaseStudy`, `.projectLabel`
- `PlaygroundHomeContent.galleryHeading`, `.gallery`, `.noteHeading`, `.returnHeading` — all
  already empty strings and arrays
- `PlaygroundProjectContent.eyebrow` — `ProjectPage` uses `dictionary.playgroundNav.experimentEyebrow`
- `CaseStudyContent.projectTag` — 12 lines; `CaseStudyHero` composes `name · year/type` itself

**Kept, deliberately:** `ProjectCopy.headline`, `.description`, `.role`, `.year`. Nothing renders
them, and they stay anyway — they are **48 authored strings across two locales**, and they are
precisely what a `/work` index page needs (`SUGGESTION-014`, still Proposed). Deleting the
owner's copy to make a type tidier is the wrong trade, and `MILESTONE-004` reserves copy in any
case. The type now says so, so the next reader does not have to re-derive it.

`PlaygroundHomeContent.eyebrow` was on this file's list by association and is **live** —
`PlaygroundIndex` renders it. Only the project-level `eyebrow` was dead.
