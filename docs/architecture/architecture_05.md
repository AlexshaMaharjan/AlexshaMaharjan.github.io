# ARCH-05 — Image & asset handling

Status: Current — and the weakest area of the project

## Purpose

How images are declared, rendered and served, and why most of the site currently shows
hatched placeholder boxes instead of work.

## Relevant files

- `src/components/ui/Image.tsx` — 32-line `next/image` stand-in
- `src/components/PlaceholderImage.tsx` — the hatched `role="img"` box
- `public/images/` — 16 PNGs + `docs/reference/image_files.md`
- `public/favicon.svg`, `public/robots.txt`, `public/_redirects`

## How it currently works

`Image` renders a plain `<img>` with `loading={priority ? "eager" : "lazy"}`,
`decoding="async"` and, when `fill` (the default and only implemented mode), absolute
positioning to fill a `position: relative` parent. It accepts `sizes` purely for API
compatibility and ignores it — **there is no responsive-image or format pipeline of any
kind**. Files are served byte-for-byte from `public/`.

`PlaceholderImage` renders a 45° hatched box (`repeating-linear-gradient(45deg,#F2F3F5 0
10px,#EDEFF3 10px 20px)`), a border, the correct `aspect-ratio`, a monospace
`[ bracketed caption ]`, and `role="img"` + `aria-label="Placeholder: …"`. This is a
deliberate part of the visual language (`DECISION-006`), not only a missing-asset marker.

### Where real `<img>` tags exist (7 slots, 7 files)

| File | Real content? | Used by |
| --- | --- | --- |
| `frame-6-mrtp0czu-dh8i.png` | ✅ real (62.7 KB) | Barrier-Free Kitchen hero |
| `screenshot-2026-07-07-…-d1vc.png` | ✅ real (143.5 KB) | QIS Portal hero |
| `alexsha_photo-mrx9hbwx-nif2.png` | ⚠️ solid-colour stand-in | About + home portrait |
| `wikimind-mrx9dhfo-12ys.png` | ⚠️ stand-in | WikiMind hero |
| `shop-page-1-mrtp117j-zqqp.png` | ⚠️ stand-in | AFONO hero |
| `1-ms52o75m-suju.png` | ⚠️ stand-in | Surugami hero |
| `chatgpt-image-…-ms50alwm-za74.png` | ⚠️ stand-in | Sync FM hero |

The stand-ins were generated at the correct pixel dimensions when the original exports
exceeded a 256 KiB fetch cap — see `docs/reference/image_files.md`. Dropping a real export in
with the **same filename** fixes them with no code change.

9 further PNGs sit in `public/images/` referenced by nothing.

### Case-study figures — a real source is now a data edit (71 slots)

Since SESSION-003, `SectionImage` is `{ aspect, caption, src?, alt? }` and
`src/components/case-study/Figure.tsx` decides what to render: `Image` plus a
`<figcaption>` when `src` is set, `PlaceholderImage` with its `[ bracketed label ]` when
it is not (`DECISION-014`). All 71 slots still show placeholders today, but filling one
needs only a line in the data file. `Figure` is also what the `figure` block kind renders,
so a figure can sit inline in `body[]` rather than only in the trailing `images[]` grid.

### Where no image mechanism exists at all (44 slots)

`PlaygroundItem` (36 slots) and `about.carouselItems[]` (8 slots) carry only `caption` +
`aspect`. Attaching a real photo there still requires a **type change plus a call-site
change**, not just a data edit — `ISSUE-007`. These are also the slots where the
placeholder may be a deliberate choice, which is `DECISION-006`'s open question.

Since the homepage's `SelectedWork` was switched to `BentoGrid`, the six project preview
images are no longer rendered anywhere on the homepage — `ISSUE-004`.

## Constraints

- Everything under `public/` ships verbatim; large exports will ship large.
- Alt text lives beside the source in the data modules (`imageAlt`, `heroImage.alt`).

## Known weaknesses

- No `srcset`/`sizes`, no WebP/AVIF, no width/height attributes → layout shift risk and
  oversized downloads once real exports (5000×3750 originals) land.
- Alt text on several stand-ins still literally reads "Placeholder: …" (`wikimind.ts`,
  `afono.ts`, `sync-fm.ts`) — that string will be announced to screen-reader users as-is.
- Filenames are opaque design-tool hashes, making it hard to tell which file is which.

## Related decisions

`DECISION-005`, `DECISION-006`, `DECISION-014` (captions only where a real image exists).

## Related issues

`ISSUE-004`, `ISSUE-006`, `ISSUE-007`.

## Related suggestions

`SUGGESTION-002` (add image sources to the data model), `SUGGESTION-012` (image pipeline).
