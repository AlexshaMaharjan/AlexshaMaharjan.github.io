# ISSUE-033 — The figure-dense case studies are heavy on mobile

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


## Widened after SESSION-026 — AFONO now leads

Re-shooting AFONO from its supplied folder took it from 13 figures to 22, and it is now the
heaviest page on the site by a clear margin:

| Page | 1440/1x | 390/3x | Figures |
| --- | --- | --- | --- |
| `/work/afono` | **694 KB** (518 img) | **1544 KB** (1368 img) | 22 |
| `/work/wikimind` | 710 KB (535) | 1007 KB (832) | 17 |
| `/work/surugami` | 440 KB (267) | 713 KB (540) | 8 |
| `/work/sync-fm` | 421 KB (247) | 654 KB (479) | 10 |

**The mobile number is the one that matters, and it has a structural cause.** Grid runs are
`sm:grid-cols-3` — below 640px every figure collapses to full width. So a phone renders 22
figures at 350px each, and at DPR 3 asks for ~1050px of each, landing on the 1280 variant. The
lone-figure ceiling (`SUGGESTION-017`) does not help here: it is a `max-width`, and at 350px
nothing is capped.

Nothing is malfunctioning. `sizes` is correct, the right variant is being chosen, and the images
genuinely need that many pixels to be sharp at 3x. The page is simply large because the case
study is thorough.

### What would actually move it

1. **Lower the variant ladder's quality.** `image-variants.mjs` re-encodes every variant at a
   fixed 0.82. Dropping it affects every page at once and is the single biggest lever. Needs a
   look at the result before adopting — it should be judged on the 960 and 1280 rungs, which are
   what phones and laptops actually fetch.
2. **Serve fewer figures on small screens.** A real option and a real cost: it means deciding
   which of the owner's work a phone visitor does not get to see.
3. **Accept it.** There is still no documented weight budget. 694 KB gzipped on desktop for a
   22-figure case study is defensible; 1.5 MB on a 3x phone is the number worth a second opinion.

Option 1 is the only one that costs nothing but a judgement about image quality, which is why it
is listed first — and why it is still the owner's call rather than a change made quietly.

## Re-measured after SESSION-029 — AFONO is now 2.1 MB on a 3x phone

Placing every supplied image took AFONO from 22 figures to 29, and the mobile number moved with
it. Deleting 25 orphaned originals took 1.4 MB off what *ships* but nothing off what any single
page *loads*, because none of them was referenced.

| Page | 1440/1x | 390/3x | Figures |
| --- | --- | --- | --- |
| `/work/afono` | **910 KB** (734 img) | **2141 KB** (1964 img) | 29 |
| `/work/wikimind` | 671 KB (497) | 953 KB (778) | 15 |
| `/work/surugami` | 468 KB (295) | 713 KB (540) | 8 |
| `/work/sync-fm` | 379 KB (205) | 600 KB (426) | 7 |

**2.1 MB is past the point where this is only a number in a table.** On a slow connection that is
a page that visibly takes its time, and AFONO is one of the two strongest case studies.

The cause is unchanged and structural: below 640px every figure is full width, so a 3x phone
fetches 29 images at the 1280 rung. The levers are also unchanged — lower the variant ladder's
fixed 0.82 quality (site-wide, biggest single lever, needs a look at the 960 and 1280 rungs
first), or show fewer figures on small screens.

**What changed is that the first lever is now clearly worth trying.** At 22 figures accepting the
weight was defensible; at 29 it is worth spending an experiment on. Still the owner's call,
because it trades image quality across the whole site.
