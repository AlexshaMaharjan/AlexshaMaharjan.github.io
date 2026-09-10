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
| `collage.ts` | ~430 | **what the page renders** (`DECISION-027`): four cards, 48 slots traced from `Portfolio.fig` page 2. Each slot holds `x/y/w/h` in the design's own pixels on its 16000 × 10000 frame, plus `src`, an optional `video`, both locales' `alt`, and `focus`/`rotate` where the design crops or turns a picture |
| `types.ts` | 69 | `PlaygroundItem`, `PlaygroundCategoryContent`, `PlaygroundHomeContent` |
| `home.ts` | 44 | the page's copy. Only `eyebrow`, `heading`, `intro`, `pauseMotion` and `playMotion` are read now; the rest is kept |
| `categories/index.ts` | 29 | registry + `getCategory` / `getAllCategories` |
| `categories/{games-and-apps,photography-3d-motion,graphic-design,digital-art,crafts}.ts` | 33–56 each | title, intro, 5–17 items (pictures, clips and written cards), "more coming" note |

**The category files are no longer rendered** (`DECISION-027`) and are deliberately kept:
they are the only written record of the captions and of the slots still waiting for
material, and `content-audit.mjs` still holds their two locales together. `collage.ts` is
what to edit to change the page.

**Order in `collage.ts` is paint order** — the Figma frames have deliberate overlaps, so
the slots are listed bottom-to-top exactly as Figma lists them.

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
  prev/next ring reads from `dictionary.projects`) → add a card entry in `dictionaries/{en,de}.ts → projects[]`.
- **New playground picture:** add a `CollageSlot` to the right card in
  `collage.ts` — `x/y/w/h` read straight off the Figma inspector, both locales' `alt` — then
  `node scripts/image-treat.mjs <spec>` for the asset, record it in
  `docs/reference/image_crops.json`, and `npm run images`.

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
