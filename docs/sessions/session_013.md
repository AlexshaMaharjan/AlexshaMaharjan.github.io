# SESSION-013 — The bundle, and connecting the two locales

Date: 2026-08-25
Milestone: `MILESTONE-008` — Performance, SEO, deployment (closing it)
Objective: `hreflang` alternates, `ISSUE-019`'s bundle question, and deleting the dead
Netlify redirect.
Outcome: **All three done** (`93aa40b`). `ISSUE-019` is resolved, half by fixing it and
half by `DECISION-015` saying why the other half stays as it is.

## What Changed

**The case-study registry is split per slug.** It statically imported all six studies in
both locales — 126 KB / 40 KB gzip to read any one of them. Each is now a dynamic
`import()` behind a cached promise:

| | Before | After |
| --- | --- | --- |
| Case-study chunk | 126 KB / 40 KB gzip | 13 KB shell + 15–22 KB for the study being read |
| Chunks on a case-study page | 3 | 5, totalling slightly less |

It is read with React's `use()`, so the page **suspends into the loading bar** added in
SESSION-011 and then renders with its content in hand. That choice is load-bearing: loading
in an effect would render the page empty first, and `useScrollReveals` would build its
triggers against markup that did not exist yet — `ISSUE-001` rebuilt from parts.

**`hreflang` alternates.** The two locales were invisible to each other: nothing told a
search engine that `/de/work/x` is the same page as `/work/x`. Every route now declares
`en`, `de` and `x-default`, in the static HTML and from the client, which must agree —
`Seo` writes the same tags the prerender bakes.

**`public/_redirects` is gone** — the Netlify convention, dead since `DECISION-012` settled
on GitHub Pages.

## The half that was answered rather than fixed

`ISSUE-019` also asked for GSAP to be lazy-imported. It stays eager, recorded as
`DECISION-015`:

- it is already its own chunk, not part of the main bundle;
- deferring it puts the reveals' at-rest state **after** the first paint, which is exactly
  the flicker SESSION-010 spent its time removing, from the other direction;
- the alternative — not hiding what is already on screen — was built and reverted in
  SESSION-011 because it removed the entrance the site was designed with;
- it now drives five features rather than the single fade it drove when the issue was
  filed.

Dropping GSAP entirely would save 46 KB gzip and is a rewrite of five working features. The
decision records that as the alternative it is, rather than leaving a ticket open implying
someone should get around to it.

## A regression that was not one

The battery reported a route change landing at scrollY 41 instead of 0, and back/forward
restoring 3912 instead of 5000. Both looked like the suspense boundary breaking the scroll
behaviour SESSION-002 built.

Measured against the previous commit: **identical numbers on both builds.** The cause was
the harness again — `document.documentElement.scrollTop = 5000` is animated by
`html { scroll-behavior: smooth }`, so the page was genuinely at ~4,300 when the click
happened, and the restore was correct to the pixel. Run twice on each build, warm and cold
chunk, to be sure.

This is the same trap as SESSION-012's, in a new disguise: **anything that scrolls the page
programmatically in a test needs to finish scrolling before the test acts on it.**

## Validation

- 38 routes render, nothing hidden, no overflow.
- An unknown slug still renders the 404 rather than a spinner — the registry answers
  immediately for a slug it does not have.
- The prev/next ring across three hops with per-slug chunks: nothing left stuck.
- `hreflang` checked over plain HTTP with no JavaScript on 8 routes, both locales: 8/8.
- axe 0 violations across 4 routes; cold hash landings at 104px; back/forward restore A/B'd
  against the previous commit.
- `npm run lint` 0 errors / 3 pre-existing warnings; `npm run build` green; the prerender
  still writes 36/36.

## Remaining Concerns

- **`og:image` is the last thing standing between this and a finished link preview**, and
  it is the owner's to supply. Everything around it is correct.
- `ISSUE-010` (dead content fields, waiting on `MILESTONE-002`) and `ISSUE-029` (the About
  annotation at 768px) are the two loose ends left in the tracker.
- `MILESTONE-004` (the copy pass) and `MILESTONE-005` (images) are what remain of the
  roadmap, and both need the owner.
