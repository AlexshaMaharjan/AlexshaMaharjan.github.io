# ISSUE-033 — `/work/wikimind` is the heaviest page on the site

Status: Open
Priority: Medium
Category: Performance
Discovered: 2026-09-04 (SESSION-023)
Owner decision: yes — the remaining lever is a design trade, not a defect

## What

Measured against the production build, gzipped, whole page, scrolled:

| Page | 1440/1x | 390/3x |
| --- | --- | --- |
| `/` | 255 KB (85 img) | 354 KB (184) |
| `/work/sync-fm` | 308 KB (134) | 407 KB (233) |
| `/work/afono` | 482 KB (307) | 547 KB (372) |
| **`/work/wikimind`** | **706 KB (532)** | **995 KB (821)** |

It was 438 KB / 595 KB two sessions ago, when it had 10 PDF-cropped figures.

## Why it grew, in order of size

1. **Three persona cards render at the full column** (`wide: true`), not at a
   third of it. Roughly 158 KB of the desktop total. They carry the flag because
   a persona card at 307px is a thumbnail of a document.
2. **Seventeen figures**, up from thirteen. `[ moodboard ]`, `[ initial sketches ]`,
   `[ component library ]` and `[ wireframes ]` were all hatched or absent before.
3. **Two figures got larger on purpose** when the figures moved inline
   (SESSION-023): `[ moodboard ]` and `[ component library ]` are lone runs now
   rather than half-width pairs, so each fetches a 960 variant instead of a 640.

None of these is a bug. The page is the most figure-dense on the site and every
figure is legible, correctly proportioned and correctly sized for its slot —
verified by reading `currentSrc` off the built page.

## What has already been done

- The photographic figures were re-encoded at WebP q0.78–0.82 rather than 0.9,
  checked by eye at full size first. That took 390/3x from 904 KB to 796 KB.
- `SUGGESTION-017`'s ceiling moved `[ initial sketches ]` down a rung.
- Variants are re-encoded at a fixed 0.82 by `image-variants.mjs`, so the natural
  file's quality only affects bytes served above the top of the ladder. This is
  why re-encoding the naturals moved 3x and left 1x untouched.

## The levers left, and what each costs

1. **Drop `wide: true` from the three personas** — saves ~120 KB on desktop and
   more on mobile. Costs: they become 307px thumbnails. Less damaging than it was
   before `DECISION-018`, since any figure can now be opened full screen.
2. **Lower the variant ladder's quality** from 0.82. Site-wide, so it would also
   lighten AFONO and Sync FM. Needs a look at the result before adopting.
3. **Accept it.** 706 KB gzipped for a seventeen-figure case study is not
   unreasonable, and there is no documented weight budget to test it against.

## Why it is not simply fixed

Every option trades image quality or figure size for bytes, and the whole point
of SESSION-022 and SESSION-023 was to stop the layout deciding what the images
look like. Picking one silently would repeat that mistake in the other direction.

## Related

- `DECISION-018` — the full-screen viewer, which weakens the case for `wide: true`
- `SUGGESTION-017` — the lone-figure ceiling
- `SUGGESTION-012` — the responsive pipeline this all runs through
