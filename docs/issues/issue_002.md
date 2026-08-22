# ISSUE-002 — Hash links do not scroll when arriving from another route

Status: Open
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`/#work`, `/#about` and `/#contact` are the site's primary navigation targets, but React
Router does not scroll to a hash on navigation and nothing in the app implements it.
Clicking "Projects" from `/about` lands at the top of the homepage instead of the work
section.

## Evidence / Current Behavior

- `src/components/Header.tsx:64-79` and `src/components/MobileMenu.tsx:33-35` link to
  `localeHref(locale, "/#work" | "/#about" | "/#contact")`.
- `src/components/Footer.tsx:44` links to `/#about`.
- `src/components/case-study/CaseStudyHero.tsx:26` and `NextProjectNav.tsx:49` link to `/#work`.
- `src/pages/Contact.tsx` redirects the whole `/contact` route to `/#contact`.
- No `ScrollRestoration`, `scrollIntoView`, or hash-handling effect exists anywhere in
  `src/` (verified by grep).

Same-page hash clicks still work because the browser handles them natively.

## Expected Behavior

Navigating to a URL with a hash scrolls that element into view, honouring
`prefers-reduced-motion` and the fixed header offset.

## Relevant Files

- `src/components/RootLayout.tsx` (natural home for the fix)
- `src/routes.tsx`
- `src/components/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `case-study/*`
- `src/index.css` (`section { scroll-margin-top: 104px }`)

## Possible Cause

Behaviour lost in the Next.js → Vite migration; Next's router scrolled to hashes
automatically, React Router does not.

## Possible Solution

Add a small `useHashScroll()` effect in `RootLayout` that, on `location.hash` change,
finds the element and scrolls it into view after the lazy page has painted (a `Suspense`
boundary means the target may not exist on the first frame — retry on the next frame or
after the page resolves). Reuse the reduced-motion `behavior` pattern already in
`Footer.tsx:26-30`.

## Dependencies

Interacts with `ISSUE-003` — implement both in one pass so they do not fight each other.

## Related

`ARCH-01`, `MILESTONE-001`, `ISSUE-003`, `ISSUE-022`, `ISSUE-015`.
