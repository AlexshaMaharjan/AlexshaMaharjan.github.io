# ISSUE-014 — `Seo` leaks description and Open Graph tags between routes

Status: Open
Priority: Low
Category: Bug / SEO
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`Seo` restores only `document.title` on unmount. The `description`, `og:title`,
`og:description` and `og:image` it wrote stay in the document, so a page that sets fewer
fields inherits the previous page's values.

## Evidence / Current Behavior

`src/components/Seo.tsx:25-38`: the cleanup captures and restores `prevTitle` only.
Concretely: visit `/work/wikimind` (sets `og:image` to the WikiMind hero) then navigate to
`/resume` (`<Seo title={r.metaTitle} />`, no description or image) — the document keeps
WikiMind's description and og:image.

Low real-world impact today because no scraper executes this JS (`ISSUE-013`), but it will
matter as soon as prerendering exists, and it affects anything reading live DOM meta.

## Expected Behavior

Every meta value either gets set per route or reverts to the site default.

## Relevant Files

- `src/components/Seo.tsx`
- Call sites: `src/pages/Home.tsx`, `About.tsx`, `Resume.tsx`, `CaseStudy.tsx`,
  `NotFound.tsx`, `playground/*.tsx`

## Possible Cause

Partial cleanup implementation.

## Possible Solution

Snapshot every attribute the component touches and restore all of them, or always pass a
complete set (fall back to `dictionary.meta` when a page has none).

## Dependencies

Best resolved together with `ISSUE-013`.

## Related

`ARCH-01`, `MILESTONE-008`.
