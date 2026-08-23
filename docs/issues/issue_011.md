# ISSUE-011 — Tailwind breakpoint order makes `lg:` override `nav:`

Status: **Resolved** (SESSION-006, `2880697`)
Priority: Low
Category: Bug / Styling (latent)
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-006)
Last reviewed: 2026-08-23

## Resolution

`theme.screens` is in ascending order — `sm md lg nav xl 2xl` — so a breakpoint can no
longer lose to a smaller one declared after it. Verified that the `nav:` breakpoint still
switches exactly where it did: the primary nav is hidden at 1023/1024/1159px and shown at
1160/1280/1440px, with the mobile menu the mirror image.

## Summary

`theme.screens` lists the custom `nav: 1160px` breakpoint *before* `lg: 1024px`. Tailwind
emits media queries in declaration order, so `lg:` rules are written after `nav:` rules
and win at widths ≥ 1160px for any shared property.

## Evidence / Current Behavior

`tailwind.config.ts:8-15`:

```ts
screens: { sm: "480px", md: "768px", nav: "1160px", lg: "1024px", xl: "1280px", "2xl": "1440px" }
```

No component currently sets the same property at both `nav:` and `lg:` — `Header.tsx`
uses `nav:flex` / `nav:hidden`, `CategoryPage.tsx` uses `lg:grid-cols-3` — so nothing is
visibly broken today. It is a trap for the next person who combines them.

**Needs verification** in the generated CSS if anyone wants to confirm the emission order
empirically (`npm run build` then inspect `dist/assets/index-*.css`).

## Expected Behavior

Breakpoints ascend in declaration order, so larger breakpoints always override smaller.

## Relevant Files

- `tailwind.config.ts`

## Possible Cause

`nav` was appended near the semantically related entries rather than in size order.

## Possible Solution

Reorder to `sm, md, lg, nav, xl, 2xl`. Purely additive risk: verify the header's
`nav:flex` / `nav:hidden` still behave at 1024–1160px after the change.

## Dependencies

None.

## Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-010`.
