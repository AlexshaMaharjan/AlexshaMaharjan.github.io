# Codebase — Content and data (`src/lib/`)

Every visible string lives here. Components read; they do not author.
`CONTENT_GUIDE.md` (repo root) is the field-by-field editing surface — see
`docs/reference/index.md`.

## Dictionaries — `src/lib/dictionaries/`

| File | Lines | Contents |
| --- | --- | --- |
| `types.ts` | 203 | the `Dictionary` contract: `meta`, `nav`, `hero`, `process`, `selectedWork`, `projects[]`, `resume`, `aboutPreview`, `contact`, `footer`, `playgroundNav`, `about`, `caseStudy`, `notFound` |
| `en.ts` | 380 | full English implementation |
| `de.ts` | 380 | full German implementation |
| `index.ts` | 22 | `getDictionary(locale)` + type re-exports |

`ProjectCopy[]` (six entries) still carries `headline`, `description`, `image`,
`imageAspect`, `projectTag`, `placeholderLabel`, `featured` — most now unused since
`BentoGrid` replaced `ProjectEntry`. It is still the source of the case-study prev/next
ring and the preview thumbnails in `NextProjectNav`.

**Inspect when:** changing nav labels, hero copy, About copy, résumé, footer, 404, or any
shared case-study/playground UI label.

## Case studies — `src/lib/caseStudies/`

| File | Lines | Sections (per locale) |
| --- | --- | --- |
| `types.ts` | 68 | `CaseStudyContent`, `CaseStudySection`, `Block` (the body union), `InsightItem`, `TestingStep`, `SectionImage` (with optional `src`/`alt`) |
| `index.ts` | 25 | slug registry + `getCaseStudy(slug, locale)` |
| `wikimind.ts` | 324 | 8 |
| `afono.ts` | 348 | 9 — the only one with `heroDisclosure` (EN only, `ISSUE-009`) |
| `sync-fm.ts` | 282 | 8 |
| `barrier-free-kitchen.ts` | 350 | 8 |
| `surugami.ts` | 306 | 9 |
| `qis-portal.ts` | 388 | 9 |

Each file exports `{ en: CaseStudyContent, de: CaseStudyContent }`. Section `id`s are
shared vocabulary: `overview`, `challenge`, `research`, `insights`, `direction`,
`development`, `testing`, `outcome`, `reflection` (exact set varies).

**Body content is blocks, not strings** (`DECISION-014`). A bare string is still a
paragraph; `{ kind: "h3" | "list" | "quote" | "note" | "figure" }` cover the rest. All six
studies were migrated in SESSION-003 — 38 sub-headings, 22 lists, 8 notes — and `en` and
`de` are structurally identical block for block. Keep them that way: the types make a
missing field a compile error, but not a mismatched structure.

After changing any case-study content or shape, rerun
`node scripts/content-guide-case-studies.mjs --write` so `CONTENT_GUIDE.md` §5 keeps
matching.

**Inspect when:** editing any case-study copy, adding a section, or changing the section
model.

## Playground — `src/lib/playground/`

| File | Lines | Contents |
| --- | --- | --- |
| `types.ts` | 69 | `PlaygroundItem`, `PlaygroundCategoryContent`, `PlaygroundHomeContent`, `PlaygroundProjectContent` |
| `home.ts` | 129 | hero, 3 featured, 6 category summaries, exploring/note/return copy |
| `categories/index.ts` | 29 | registry + `getCategory` / `getAllCategories` |
| `categories/{digital-art,crafts,editorial,graphic-experiments,3d-motion,interactive}.ts` | 36–37 each | title, intro, 5 items, "more coming" note, next-category ring link |
| `projects/index.ts` | 15 | registry + `getProject` |
| `projects/motorbike-study.ts` | 58 | the only built experiment detail page |

Category ring order: `digital-art → crafts → editorial → graphic-experiments → 3d-motion
→ interactive → digital-art`.

## Helpers

| File | Lines | Purpose |
| --- | --- | --- |
| `i18n.ts` | 13 | `Locale`, `defaultLocale`, `isLocale()`, `localeHref()` |
| `useLocale.ts` | 16 | `localeFromPathname()`, `useLocale()`, `useDictionary()` |
| `useScrollReveals.ts` | 85 | GSAP reveal hook; effects keyed on pathname, owns the `[data-inview]` at-rest state (`ISSUE-001`) |
| `useScrollBehavior.ts` | 203 | All scroll side effects of a navigation: top reset, hash landing, back/forward restore (`DECISION-013`) |

## Adding content — checklist

- **New case study:** create `src/lib/caseStudies/<slug>.ts` with both locales → register
  in `caseStudies/index.ts` → add a `ProjectCopy` entry to **both** dictionaries (the
  prev/next ring reads from `dictionary.projects`) → add a tile in `BentoGrid.tsx`.
- **New playground category:** data file → `categories/index.ts` → a summary entry in
  `home.ts` → fix the ring links on the neighbouring categories.
- **New playground experiment:** data file → `projects/index.ts` → give the matching
  `PlaygroundItem` a `slug`.

## Related

`ARCH-02`. Decisions: `DECISION-003`, `DECISION-014`. Issues: `ISSUE-007` (Playground and
About slots), `ISSUE-009`, `ISSUE-010`.
