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
- `src/lib/caseStudies/index.ts` — slug → **dynamic import** registry,
  `caseStudyPromise(slug)` + `localeContent(content, locale)` (`DECISION-015`)
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

**Case studies are the exception**: their registry holds one `import()` per slug rather
than six static imports, so a visitor downloads the study they asked for (`DECISION-015`).
An unknown slug still resolves to `null` immediately, without a round trip, which is what
keeps the 404 instant.

A case study is `CaseStudyContent`: identity fields (`slug`, `name`, `headline`,
`summary`, `tags`), a facts block (`role`, `contribution`, `type`, `year`, `tools`,
`deliverables`) rendered by `FactsStrip`, one `heroImage`, and an ordered
`sections[]`. Each `CaseStudySection` has `id` / `navLabel` / `number` / `heading` plus
optional `body: Block[]`, `designQuestion`, `insights[]`, `testing[]`, `images[]`.

`Block` is a discriminated union (`DECISION-014`):

```
string                                        // shorthand: a paragraph
{ kind: "h3";    text }                       // sub-heading
{ kind: "list";  items[]; ordered? }
{ kind: "quote"; text; attribution? }         // implemented, unused
{ kind: "note";  text }                       // disclosures, stats lines
{ kind: "figure"; …SectionImage }             // implemented, unused
```

`Section.tsx` switches on the kind. Today the six studies use 224 paragraphs, 38
sub-headings, 22 lists and 8 notes, and **both locales are structurally identical block
for block** — nothing enforces that beyond review, so a restructure has to touch `en`
and `de` together.

`SectionImage` is `{ aspect, caption, src?, alt? }`. With a `src` the slot renders a real
image and a caption; without one it stays a hatched placeholder.

Playground content is thinner: `PlaygroundItem` is `{ caption, aspect, slug?, rotated?,
subtitle?, description? }` — caption + aspect ratio only, no image source.

Section `id`s double as anchor targets for `ContentsNav`.

## Important dependencies

None — pure data modules. Case studies are loaded on demand, one chunk each.

## Constraints

- Adding a field means editing `types.ts` **and** both locale objects everywhere, or
  TypeScript fails the build. This is deliberate: it makes missing translations a
  compile error.
- `CONTENT_GUIDE.md` at the repo root mirrors every field with its exact path and is the
  intended editing surface for copy work — see `docs/reference/index.md`. Its §5 (the six
  case studies) is **generated** from these modules by
  `scripts/content-guide-case-studies.mjs --write`; rerun it after any content or shape
  change or the guide's `body[n]` indices will lie.

## Known weaknesses

- `PlaygroundItem` and `about.carouselItems[]` still carry **no image source field**, so
  44 image slots can only render as placeholders — `ISSUE-007`. `SectionImage` (the 71
  case-study slots) was fixed in SESSION-003.
- ~~`CaseStudySection.body` is a flat `string[]`~~ — **resolved in SESSION-003**
  (`ISSUE-024`); it is a `Block[]` now.
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
honesty constraint), `DECISION-014` (the block model).

## Related issues

`ISSUE-007`, `ISSUE-009`, `ISSUE-010`, `ISSUE-024`.
