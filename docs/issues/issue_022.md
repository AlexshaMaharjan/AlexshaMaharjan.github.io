# ISSUE-022 — `/contact` redirects to a hash that does not scroll

Status: Open
Priority: Low
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

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
