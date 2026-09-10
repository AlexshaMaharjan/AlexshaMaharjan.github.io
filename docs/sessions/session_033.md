# SESSION-033 — Five categories, and the heaviest page on the site

Date: 2026-09-10
Branch: `milestone-003-content-model`
Status: complete, verified, committed. **Nothing pushed.**

## What was asked

> "i want the categories abit different in the playground. the fifth one, i want game and
> application(software and all) in number 1, then in number 2 maybe photography, animation and 3d
> maybe, then graphic design, then digitalart, then the last one left. also most of thr"

The message ends mid-word. Everything below acts on the part that is complete; **the sentence
beginning "also most of thr" was never received and nothing has been done about it.**

Two things in the request needed the owner rather than a guess, and both were put to them
before anything moved:

1. **Five positions were listed and six categories existed.** "The last one left" is singular,
   which only works if two of the six merge. Answer: **five** — `Calendars and Editorial
   Experiments` folds into Graphic Design.
2. **The two categories asked for first are the only two with no images at all.** Answer:
   **the order stands.** Recorded in `DECISION-023` with the reasoning, because it is a
   deliberate choice and the next session will otherwise read it as an oversight.

## The restructure — `DECISION-023`

| # | Slug | Title | Items |
| --- | --- | --- | --- |
| 1 | `games-and-apps` | Games and Applications | 5 (0 filled) |
| 2 | `photography-3d-motion` | Photography, Animation and 3D | 7 (2 filled) |
| 3 | `graphic-design` | Graphic Design | 14 (all filled) |
| 4 | `digital-art` | Digital Drawings and Portraits | 9 (all filled) |
| 5 | `crafts` | Handmade and Bead Crafts | 8 (all filled) |

Editorial's five items sit between the posters and the packaging, so Graphic Design reads
logo → poster → print → package → storefront. The slugs were renamed to match the new titles;
nothing is published, so no URL anyone holds is broken by doing it now rather than never.

**Both of `ISSUE-038`'s photographs are placed**, which closes part 2 of that issue. They lead
category 2. Neither carried an EXIF rotation and both reduce to an exact ratio — `250/193` and
`2/3` — so neither is cropped.

## The part that nearly shipped broken

Five files have to agree about five categories, and **every link between them is a bare string
that fails silently**:

- `PlaygroundIndex` does `if (!category) return null` — a stale slug in `home.ts` **deletes a
  whole marquee row** and renumbers the ones after it.
- A stale `nextCategorySlug` 404s the "next category" link.
- A stale `categorySlug` 404s a project.

`PlaygroundIndex.tsx` linked its featured project through the literal string
`` `/playground/3d-motion/${item.slug}` ``. The rename would have 404'd it with no type error
and no failing check. It was found by grepping for the old slugs rather than by anything the
harness does — which is the whole problem.

So `content-audit.mjs` gained a playground section: registry/`home.ts` order, title agreement,
a complete next-category ring, project categories, and **en/de `src` parity for category items**,
which `image-manifest.mjs` does not cover because it reads only `en` there.

**All five checks were proved by injecting the fault, including the real `3d-motion` one.**
`SESSION-027` shipped a bug because a check agreed with an expectation and the agreement was
taken as confirmation. A check that has only been seen to pass is not evidence.

## The heaviest page on the site, found by looking

`verify weight` sampled the homepage and four case studies — **no playground route, ever.**
Graphic Design had just grown from 9 items to 14, so the sample list gained `/playground` and
`/playground/graphic-design`.

`/playground` came back at **1692 KB of images at 1440px/1x** — heavier than any case study, and
*heavier at desktop than at 390px/3x*, which is backwards for every other page on the site.

That tell was the answer. `ui/Image` falls back to `sizes="100vw"`, and **every playground call
site passed no `sizes`** — so a 256px marquee card claimed to fill the window and took the
1600px variant. The About carousel's fixed 240px card had the same fault. Fixed at all seven
call sites (`DECISION-024`):

| Route | Before | After |
| --- | --- | --- |
| `/playground` 1440px/1x | 1692 KB | **378 KB** |
| `/playground/graphic-design` 1440px/1x | 804 KB | **225 KB** |
| `/playground` 390px/3x | 830 KB | 808 KB |

**The mobile numbers barely moved, and that is the confirmation.** At 3x a 256px card really
does need ~768px of image, so the large variant was already correct there. Only waste went. A
change that improved both would have meant the images had got worse.

## Verified

- routes **34/34** (down from 36 — `/playground/editorial` in both locales is gone)
- **492 images across 34 routes at dpr 1, 2 and 3** — 0 broken, 0 missing alt, 0 failed requests,
  counts identical across all three
- axe **0 violations**, overflow **0 pages**, reduced motion static
- `tsc` clean, ESLint **0 errors** (3 pre-existing warnings)
- `content-audit.mjs` clean — 6 case studies and 5 playground categories
- `image-manifest.mjs` exits 0 — **163 slots, 127 filled**

## Left alone, deliberately

- **The marquee crops every card to `4/3`** regardless of the item's real aspect, and the
  featured cards to `16/10`. A 1200/2604 beaded planter is savagely cropped by that. It is
  pre-existing, it is the same `object-cover` fault the case studies spent three sessions
  removing, and it is a redesign of the playground index rather than a category reorder —
  so it is written up as `ISSUE-039` and not touched.
- The truncated sentence in the request.
