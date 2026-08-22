# ISSUE-022 — `/contact` redirects to a hash that does not scroll

Status: Resolved
Priority: Low
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

## Summary

`/contact` (and `/de/contact`) exist purely to redirect to `/#contact`. Because hash
navigation from another route does nothing (`ISSUE-002`), visiting `/contact` silently
lands on the top of the homepage.

## Evidence / Current Behavior

`src/pages/Contact.tsx` is eight lines: `<Navigate to={localeHref(locale, "/#contact")} replace />`.
`src/components/ContactSection.tsx:7` renders the actual `id="contact"` section at the
bottom of the homepage.

## Expected Behavior

`/contact` puts the visitor in front of the contact section.

## Relevant Files

- `src/pages/Contact.tsx`, `src/components/ContactSection.tsx`, `src/routes.tsx`

## Possible Cause

`design-reference/SPEC.md` §2 explicitly flags this: the coded reference has no standalone
contact page and recommends deep-linking `/contact → /#contact`. The redirect was
implemented; the scroll behaviour it depends on was not.

## Possible Solution

Resolved automatically once `ISSUE-002` lands. Verify afterwards. Alternatively give
contact a real page — worth raising with the owner, since a dedicated contact page is a
common expectation for a job-seeking portfolio.

## Dependencies

Blocked by `ISSUE-002`.

## Related

`ISSUE-002`, `MILESTONE-001`.

## Resolution

Fixed in SESSION-002, `MILESTONE-001` — automatically, as predicted, once `ISSUE-002`
landed. `src/pages/Contact.tsx` was not changed.

Verified in Chrome against the production build: loading `/contact` at both 1440px and
390px ends with the URL at `/#contact` and the contact section's top at 104px, i.e. exactly
at its `scroll-margin-top` below the header. The redirect is a `REPLACE`, which the hook
treats as a normal hash navigation.

The open question the issue raises — whether contact deserves a real page rather than a
deep link — is untouched and still worth putting to the owner.
