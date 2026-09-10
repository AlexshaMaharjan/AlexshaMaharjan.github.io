# ISSUE-040 — Scrolling the whole playground costs 4 MB on a phone

Status: Open
Priority: Medium
Category: Performance
Discovered: 2026-09-10 (SESSION-034)
Owner decision: yes — every remaining lever trades picture quality

## Measured

`/playground`, uncached, gzipped, at 390px and device pixel ratio 3:

| | images | clips | code | total |
| --- | --- | --- | --- | --- |
| **Landing, before scrolling** | 200 KB | 0 KB | 292 KB | **492 KB** |
| **After scrolling the whole gallery** | 2755 KB | 1036 KB | 292 KB | **4082 KB** |

At 1440px/1x, landing is 368 KB and the full page is 2004 KB.

**The landing number is the good news and it is not an accident.** Every tile is
lazy, and no clip is fetched until it is near the viewport — so arriving at the
page costs 492 KB whatever the gallery holds behind it. The 4 MB is paid only by
someone who scrolls all 9,100 pixels of it, and it arrives in pieces as they go.

## Why it is big

It is a **gallery of 33 pictures shown at full size**, which is what the page was
asked to be (`DECISION-026`). On a 3x phone a tile 350 CSS px wide legitimately
asks for a ~1050px image, so ~83 KB per picture is correct behaviour, not waste.
`DECISION-024` already removed the actual waste — every call site declares the
width it renders at.

The clips are 1036 KB of the total and they are the cheapest thing on the page
per second of interest: 121 MB of source became that.

## Options, all of which are the owner's

1. **Accept it.** Landing is 492 KB, it loads as you scroll, and it is a
   portfolio gallery. This is the honest default.
2. **Cap the largest variant a tile may request.** Tiles are at most ~350 CSS px
   on a phone; offering them the 1280 rung rather than 960 is close to
   invisible on that screen and would cut a large share of the 2755 KB. One
   line in `sizesFor`.
3. **Re-encode the playground images at a lower quality.** They are currently
   WebP 0.8–0.9. Dropping the photographic ones to ~0.72 would cut perhaps a
   third. This trades visible quality on the biggest tiles.
4. **Show fewer pictures at once**, with a "show the rest" per category. This
   fights the instruction the page was built to — "everything needs to be here" —
   so it is listed for completeness, not recommended.

## A note on measuring this

The first three attempts to measure it were wrong, in both directions, because
`scripts/lib/cdp.mjs`'s `setViewport` **hardcodes `deviceScaleFactor: 1`**. A run
labelled "390/3x" was really 390/1x and reported 662 KB against the truth of
2755 KB. `verify weight` sets device metrics itself and was right all along.

**When a hand-rolled measurement disagrees with the harness, suspect the
measurement.** The numbers above were re-taken with the pixel ratio set
explicitly and now agree with `npm run verify weight` to within 5 KB.

## Related

- `DECISION-026` — the gallery, and why the pictures are shown at full size
- `DECISION-024` — `sizes` at every call site; the waste that was already removed
- `ISSUE-033` — the same shape of decision for `/work/wikimind`
