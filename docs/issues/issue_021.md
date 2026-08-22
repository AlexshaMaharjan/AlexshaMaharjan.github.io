# ISSUE-021 — `stripLocale` duplicated in Header and Footer

Status: Open
Priority: Low
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

The same eight-line helper is defined twice, byte-for-byte, while an obvious home for it
already exists in `src/lib/i18n.ts` alongside `localeHref`.

## Evidence / Current Behavior

`src/components/Header.tsx:12-17` and `src/components/Footer.tsx:6-11` are identical:

```ts
function stripLocale(pathname: string, locale: Locale): string {
  if (locale === "de" && pathname.startsWith("/de")) return pathname.slice(3) || "/";
  return pathname;
}
```

Both callers then derive `isPlayground` from the result in the same way.

## Expected Behavior

One implementation, exported from `src/lib/i18n.ts`.

## Relevant Files

- `src/lib/i18n.ts`, `src/components/Header.tsx`, `src/components/Footer.tsx`

## Possible Cause

Copy-paste while building the two components in sequence.

## Possible Solution

Move it to `i18n.ts` and import in both places. Consider also lifting the shared
`isPlayground` derivation into a small `usePlaygroundMode()` hook, since both components
need it for their colour variant.

## Dependencies

None.

## Related

`ARCH-01`, `MILESTONE-007`.
