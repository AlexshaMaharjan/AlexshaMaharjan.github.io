# DECISION-002 — Path-prefix i18n with hand-written dictionaries

Status: Active
Date: Inherited from the original implementation
Scope: Routing, content

## Context

The site is bilingual (English default, German). The `.dc.html` design reference achieved
this with `data-de` attributes swapped by JavaScript and a `localStorage['am-lang']` key;
`design-reference/SPEC.md` §3 explicitly recommends porting it as "data held in a
translation dict per string key" rather than DOM text swapping.

## Decision

Locale lives in the URL path (`/about` vs `/de/about`). Every route is registered twice via
`dual()`. Locale is derived from `pathname` on every render; nothing is persisted. Copy
lives in two fully-typed dictionary objects plus per-locale content modules. No i18n
library.

## Reasoning

The SPEC recommended the dictionary approach. Path prefixes make every page linkable and
shareable per language, which `localStorage` would not. Typing the dictionary means a
missing translation is a compile error rather than a runtime fallback.

## Alternatives

`react-i18next` (heavier, and its runtime interpolation is unnecessary here);
`localStorage` + a single URL set (would break shareable German links).

## Consequences

- Adding a route means editing both branches — `dual()` makes this one line.
- Adding a field means editing `types.ts` plus both locale objects, or the build fails.
- No language preference is remembered across visits; a German speaker landing on `/`
  gets English until they toggle.
- Optional fields escape the compile-time guarantee — `afono.heroDisclosure` is missing in
  German and TypeScript does not complain (`ISSUE-009`).

## Relevant Files

`src/routes.tsx`, `src/lib/i18n.ts`, `src/lib/useLocale.ts`, `src/lib/dictionaries/*`

## Related Issues / Milestones

`ISSUE-005`, `ISSUE-009`, `MILESTONE-009`
