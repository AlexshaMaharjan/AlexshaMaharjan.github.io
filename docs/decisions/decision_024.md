# DECISION-024 — Every image call site declares the width it actually renders at

Status: Active
Date: 2026-09-10 (SESSION-033)
Scope: `ui/Image` call sites

## Context

`SUGGESTION-012` gave the site responsive images: `image-variants.mjs` writes a
400/640/960/1280/1600 ladder beside every export, and `ui/Image` turns that into
a `srcset`. Which rung the browser takes is decided entirely by `sizes`.

`ui/Image` falls back to `sizes="100vw"` when a call site passes none. That
fallback is not neutral — **it is a claim that the image fills the window**, and
the browser believes it. A card 256px wide that declares `100vw` at a 1440px
viewport asks for the 1600px variant.

Every call site on the playground and the About carousel passed no `sizes`. The
case studies and the work grid always had, so the fault was invisible in the one
place anybody was measuring: `verify weight` sampled the homepage and four case
studies and no playground route at all.

Adding `/playground` to that sample is what surfaced it — 1692 KB of images at
1440/1x, making it comfortably the heaviest page on the site, and heavier at
desktop than at 390px/3x, which is backwards for every other page and was the
tell.

## Decision

**A call site that renders an image at a known width must say so.** Where the
width is a constant — a `basis-[280px]` marquee card, a `w-60` carousel card —
`sizes` is that constant in px, not a viewport fraction.

Measured on the built site, uncached and gzipped:

| Route | Before | After |
| --- | --- | --- |
| `/playground` 1440px/1x | 1692 KB | **378 KB** |
| `/playground/graphic-design` 1440px/1x | 804 KB | **225 KB** |
| `/playground` 390px/3x | 830 KB | 808 KB |
| `/playground/graphic-design` 390px/3x | 804 KB | 804 KB |

**The mobile figures barely move, and that is the point.** At 390px/3x a 256px
card genuinely needs ~768px of image, so the large variant was already the right
choice there. Only the desktop waste disappeared. A change that had improved
both numbers would have meant the images had simply got worse.

`case-study/Figure.tsx` still has one `<Media>` with no `sizes`: it is the
`!src` branch, which renders the hatched placeholder and fetches nothing.

## `verify weight` now samples the playground

The sample list was five case-study-shaped routes. It gained `/playground` and
`/playground/graphic-design` — the index renders every category's items into its
marquees, and Graphic Design is the largest single category at 14 items. **A
weight check that only looks at case studies cannot see the heaviest page on the
site**, which is exactly what happened here.

## Related

- `SUGGESTION-012` — the variant ladder and `srcset`
- `DECISION-023` — the playground restructure that put a 14-item category on one page
