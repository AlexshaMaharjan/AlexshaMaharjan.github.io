# DECISION-003 — Content lives in typed TypeScript modules

Status: Active
Date: Inherited from the original implementation
Scope: Content architecture

## Context

~975 discrete text fields across six case studies, six playground categories, an About
page, a résumé and shared UI labels — each needing an English and a German version.

## Decision

Everything is a typed TypeScript module under `src/lib/`. No CMS, no MDX, no JSON. Slug
registries (`as const` objects) map URL segments to content, with getters returning `null`
for unknown slugs.

## Reasoning

The owner is the only author, and the content is highly structured (a case study is not
free-form prose — it has facts, insights, testing steps, image slots). A typed model makes
the structure explicit and both locales mandatory. Editing happens through
`CONTENT_GUIDE.md`, which mirrors every field with its exact source path.

## Alternatives

MDX (better for free-form writing, worse for structured fields and bilingual pairing);
a headless CMS (overhead unjustified for a single author).

## Consequences

- Every copy edit is a code edit and a rebuild.
- Content structure is constrained by the types — which is exactly the limitation behind
  `ISSUE-024`: `body: string[]` could not express sub-headings or lists. Fixed in
  SESSION-003 by making it a `Block[]` union (`DECISION-014`) — within the typed-module
  approach, not by abandoning it.
- All six case studies are statically imported into one registry, so they cannot be
  code-split (`ISSUE-019`).
- `CONTENT_GUIDE.md` must be regenerated whenever the shape changes, or it misleads.

## Relevant Files

`src/lib/dictionaries/*`, `src/lib/caseStudies/*`, `src/lib/playground/*`, `CONTENT_GUIDE.md`

## Related Issues / Milestones

`ISSUE-007`, `ISSUE-010`, `ISSUE-019`, `ISSUE-024`, `MILESTONE-003`
