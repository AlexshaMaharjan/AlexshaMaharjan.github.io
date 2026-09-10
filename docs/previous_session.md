# Previous Session

**SESSION-036** — 2026-09-10. Full record: `docs/sessions/session_036.md`.
Immediately preceded by **SESSION-035** (`session_035.md`), which rebuilt the playground as
a deck of four Figma collages and **deployed the branch** after 55 unpushed commits.

## What it did

Three changes to `/playground`, all asked for in one message:

**The hero is 56svh**, so half of the first card is on screen before anyone scrolls. That
is arithmetic — the deck starts at the hero's height, a card is `100svh − header − 40`, so
half a card showing wants `100svh − card/2`. Measured: 396 of 787px, exactly 50%.

**Ten scribbles**, two or three per card. The idiom is the site's own — the two notes beside
the About portrait — lifted into `components/playground/Scribble.tsx` rather than copied a
third time. Anchored in the design's coordinates so a note travels with the collage, sized
in CSS pixels so the handwriting stays handwriting, `aria-hidden` because the pictures
already carry their own alt text. **They say only what is visible**: technique and subject,
never biography.

**Every slot opens.** `ui/Lightbox` learned `video` and `description` rather than being
duplicated — a clip plays with its controls, an image keeps the fit/actual-size toggle. 48
captions were added to `collage.ts`, 32 of them lifted from the category data that already
held them in both locales. No prose was invented.

## Two faults worth remembering

- **A component declared inside its parent is a new type every render.** `Opener` was, so
  opening the viewer remounted all 48 buttons and the node the dialog meant to return focus
  to was detached. Focus landed on `body`. Invisible unless you read `document.activeElement`
  after closing — which is now how it is checked.
- **An absolutely positioned box wraps in the space from its `left` to its container's
  right edge.** A note anchored at 98% and slid back with `translateX(-100%)` had 2% of the
  stage to wrap in and came out one word per line. Anchor the edge you mean.

## One flake, deliberately recorded

The first `verify all` after the viewer landed reported `landmark-one-main` and
`page-has-heading-one` on `/playground` — the harness's own signature for axe running
against the Suspense fallback. It did not reproduce in four subsequent runs.
`goto()` accepts `main` plus any `h1,h2` as proof a page rendered, and the layout supplies
those before the route's chunk arrives; on the heaviest page on the site that window is now
wide enough to lose a race. **Tighten `goto()` to wait for an `h1`.** Not done.

## State

22 routes, `tsc` clean, lint 0 errors, content audit clean, `verify all` green, axe 0
violations. `/playground` 2633 KB at 1440/1x. **Deployed** — `main` and `gh-pages` current.
