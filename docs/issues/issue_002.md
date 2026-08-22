# ISSUE-002 — Hash links do not scroll when arriving from another route

Status: Resolved
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

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

~~Same-page hash clicks still work because the browser handles them natively.~~ **Wrong** — corrected in SESSION-002 by browser testing. The header links are
react-router `<Link>`s, so a same-page click is a `pushState`, which the browser does
not scroll for either. Clicking "Contact" *on the homepage* also did nothing.

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

## Resolution

Fixed in SESSION-002 (`65f2b2d`), `MILESTONE-001`, by `src/lib/useScrollBehavior.ts`
called from `RootLayout` — the `useHashScroll()` shape suggested above, with two additions
found by testing in Chrome:

- **Scroll behaviour must be `"instant"`, not `"auto"`.** `"auto"` means *defer to the CSS*,
  and `index.css` sets `html { scroll-behavior: smooth }`. Passing `"auto"` left the scroll
  still in flight on return, which also broke `ISSUE-001`'s fix.
- **Landing once is not enough.** The target usually does not exist on the first frame
  (lazy pages), and the page keeps growing after it appears — the homepage gains ~735px a
  frame or two later, when its hero swaps to the pinned track. The hook re-aims every frame
  until the target stops moving.

The jump is smooth within a page the visitor can already see, and instant across a route
change (and always instant under reduced motion).

Verified against the production build at 1440px and 390px, both locales, with and without
`prefers-reduced-motion`: `/about → "Projects"`, `/de/about → /de/#work`, homepage →
"Contact", and cold loads of `/#work`, `/#contact`, `/de/#about` all land with the target
at exactly its 104px `scroll-margin-top`.
