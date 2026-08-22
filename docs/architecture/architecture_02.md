# ARCH-02 — Content & data model

Status: Current

## Purpose

All visible copy and content structure live in typed TypeScript modules under
`src/lib/`. Components read from them and contain (almost) no text of their own.

## Relevant directories

- `src/lib/dictionaries/` — site-wide UI + home + about + résumé copy
- `src/lib/caseStudies/` — one module per case study
- `src/lib/playground/` — playground home, categories, projects

## Relevant files

- `src/lib/dictionaries/types.ts` — the `Dictionary` interface (~200 lines, the contract)
- `src/lib/dictionaries/en.ts`, `de.ts` — two full implementations, 380 lines each
- `src/lib/dictionaries/index.ts` — `getDictionary(locale)`
- `src/lib/caseStudies/types.ts` — `CaseStudyContent`, `CaseStudySection`, `SectionImage`
- `src/lib/caseStudies/index.ts` — slug → module registry, `getCaseStudy(slug, locale)`
- `src/lib/playground/types.ts`, `home.ts`, `categories/index.ts`, `projects/index.ts`

## How it currently works

**Three parallel systems, one shape.** Each keeps both locales side by side:

```
Dictionary          getDictionary(locale)      → object per locale
CaseStudyLocaleContent  Record<"en"|"de", CaseStudyContent>
PlaygroundCategoryLocaleContent  Record<"en"|"de", ...>
```

Registries are plain `as const` objects keyed by slug; the getters return `null` for an
unknown slug and the page renders `<NotFound />`.

A case study is `CaseStudyContent`: identity fields (`slug`, `name`, `headline`,
`summary`, `tags`), a facts block (`role`, `contribution`, `type`, `year`, `tools`,
`deliverables`) rendered by `FactsStrip`, one `heroImage`, and an ordered
`sections[]`. Each `CaseStudySection` has `id` / `navLabel` / `number` / `heading` plus
optional `body: string[]`, `designQuestion`, `insights[]`, `testing[]`, `images[]`.

Playground content is thinner: `PlaygroundItem` is `{ caption, aspect, slug?, rotated?,
subtitle?, description? }` — caption + aspect ratio only, no image source.

Section `id`s double as anchor targets for `ContentsNav`.

## Important dependencies

None — pure data modules. Case studies are statically imported by the registry, so all
six (both locales) land in one chunk.

## Constraints

- Adding a field means editing `types.ts` **and** both locale objects everywhere, or
  TypeScript fails the build. This is deliberate: it makes missing translations a
  compile error.
- `CONTENT_GUIDE.md` at the repo root mirrors every field with its exact path and is the
  intended editing surface for copy work — see `docs/reference/index.md`.

## Known weaknesses

- `SectionImage`, `PlaygroundItem` and `about.carouselItems[]` carry **no image source
  field**, so ~115 image slots can only ever render as placeholders — `ISSUE-007`.
- `CaseStudySection.body` is a flat `string[]`; sub-headings and bullet lists are being
  smuggled in as ordinary paragraphs (e.g. `wikimind.ts` "direction" section) and render
  as body text — `ISSUE-024`.
- Several typed fields are now dead: `ProjectCopy.projectTag`/`placeholderLabel`/
  `imageAspect`/`headline`/`description`, `selectedWork.viewCaseStudy`/`projectLabel`,
  `PlaygroundHomeContent.gallery`/`galleryHeading`/`noteHeading`/`returnHeading`,
  `PlaygroundProjectContent.eyebrow` — `ISSUE-010`.
- German gaps: `about.handNoteOrigin`/`handNoteMaking` and `nav.switchToGerman` are still
  English; `afono.heroDisclosure` exists only in EN — `ISSUE-009`.
- Decorative text inside `src/components/process/clusters.tsx` is hard-coded English on
  both locales (documented in `CONTENT_GUIDE.md` §11).

## Related decisions

`DECISION-003` (typed TS modules over CMS/MDX), `DECISION-002`, `DECISION-011` (copy
honesty constraint).

## Related issues

`ISSUE-007`, `ISSUE-009`, `ISSUE-010`, `ISSUE-024`.
