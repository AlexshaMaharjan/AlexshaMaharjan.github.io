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

`ProjectCopy[]` (six entries) is read by exactly one component — `NextProjectNav`, the
case-study prev/next ring — which uses `slug`, `name`, `tags`, `image` and `imageAlt`.

`imageAspect`, `projectTag`, `placeholderLabel` and `featured` were removed in SESSION-025
once `DECISION-010` settled the homepage as a category label plus a title, which ended any
prospect of the editorial fields coming back (`ISSUE-010`).

`headline`, `description`, `role` and `year` are **kept although nothing renders them**: 48
authored strings across two locales, and what a `/work` index page would need
(`SUGGESTION-014`). The type says so at the declaration.

**Inspect when:** changing nav labels, hero copy, About copy, résumé, footer, 404, or any
shared case-study/playground UI label.

## Case studies — `src/lib/caseStudies/`

| File | Lines | Sections (per locale) |
| --- | --- | --- |
| `types.ts` | 68 | `CaseStudyContent`, `CaseStudySection`, `Block` (the body union), `InsightItem`, `TestingStep`, `SectionImage` (with optional `src`/`alt`) |
| `index.ts` | 52 | slug registry of **dynamic imports** + `caseStudyPromise(slug)` / `localeContent(content, locale)`. One chunk per study since `DECISION-015`; read with React's `use()` so the page suspends rather than rendering empty |
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
paragraph; `{ kind: "h3" | "list" | "quote" | "note" | "figure" | "figures" }` cover the rest.
`figures` carries an array and hands it to the same `SectionMedia` as `sections[].images[]`,
so a run of figures can sit at the prose it illustrates instead of after the whole section —
WikiMind uses it for all 17 of its figures. All seven
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
| `home.ts` | 121 | hero, 3 featured, 5 category summaries, exploring/note/return copy |
| `categories/index.ts` | 29 | registry + `getCategory` / `getAllCategories` |
| `categories/{games-and-apps,photography-3d-motion,graphic-design,digital-art,crafts}.ts` | 37–60 each | title, intro, 5–14 items, "more coming" note, next-category ring link |
| `projects/index.ts` | 15 | registry + `getProject` |
| `projects/motorbike-study.ts` | 58 | the only built experiment detail page |

Category ring order (`DECISION-023`): `games-and-apps → photography-3d-motion →
graphic-design → digital-art → crafts → games-and-apps`. **`categories/index.ts` insertion
order is the site's order**, and `content-audit.mjs` asserts that `home.ts`, the ring and
each project's `categorySlug` all agree with it — every one of those links is a bare string
that otherwise fails silently.

## Helpers

| File | Lines | Purpose |
| --- | --- | --- |
| `i18n.ts` | 13 | `Locale`, `defaultLocale`, `isLocale()`, `localeHref()` |
| `useLocale.ts` | 16 | `localeFromPathname()`, `useLocale()`, `useDictionary()` |
| `useScrollReveals.ts` | 85 | GSAP reveal hook; effects keyed on pathname, owns the `[data-inview]` at-rest state (`ISSUE-001`) |
| `useScrollBehavior.ts` | 231 | All scroll side effects of a navigation: top reset, hash landing (aimed at layout position, not the rendered box), back/forward restore (`DECISION-013`, `DECISION-014`) |

## Adding content — checklist

- **New case study:** create `src/lib/caseStudies/<slug>.ts` with both locales → register
  in `caseStudies/index.ts` → add a `ProjectCopy` entry to **both** dictionaries (the
  prev/next ring reads from `dictionary.projects`) → add a tile in `BentoGrid.tsx`.
- **New playground category:** data file → `categories/index.ts` → a summary entry in
  `home.ts` → fix the ring links on the neighbouring categories.
- **New playground experiment:** data file → `projects/index.ts` → give the matching
  `PlaygroundItem` a `slug`.

## Images

Every image slot on the site takes an optional `src`/`alt` and falls back to the hatched
placeholder without one (`ISSUE-007`, closed in SESSION-008): case-study `heroImage` and
`sections[].images[]`, `selectedWork.bento[]`, `about.carouselItems[]`, `PlaygroundItem`,
the playground project's `mainSrc`, and the playground home's `heroCards`.

`src/components/ui/Media.tsx` is the single component that chooses between the two.
`docs/reference/image_manifest.md` lists all 136 slots with the data path that fills each.

## Related

`ARCH-02`. Decisions: `DECISION-003`, `DECISION-014`. Issues: `ISSUE-007` (Playground and
About slots), `ISSUE-009`, `ISSUE-010`.
