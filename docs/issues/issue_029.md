# ISSUE-029 — The About page's hand annotation overlaps the Biography heading at 768px

Status: Open
Priority: Low
Category: UI/UX / Responsive
Discovered: 2026-08-24 (SESSION-007, while checking the header at 768px)
Last reviewed: 2026-08-24

## Summary

At exactly 768px the "Nepal → Germany" hand-written annotation sits on top of the
"Biography" heading. It is clear at 700px, 900px and 1024px — only the `md` layout, where
the portrait column and the text column first sit side by side, is too tight.

## Evidence / Current Behavior

Bounding boxes on `/about`, measured against the production build:

| Viewport | Biography heading | Annotation | |
| --- | --- | --- | --- |
| 700px | (20, 1230)–(660, 1275) | not rendered | clear (stacked layout) |
| **768px** | **(371, 432)–(688, 477)** | **(229, 416)–(411, 464)** | **overlaps by 40×32px** |
| 900px | (426, 447)–(820, 492) | (229, 430)–(411, 478) | clear |
| 1024px | (477, 460)–(944, 509) | (229, 444)–(411, 491) | clear |

Pre-existing: identical coordinates on the build before SESSION-007.

## Expected Behavior

Decorative annotations never sit on top of text.

## Relevant Files

- `src/pages/About.tsx` — the portrait block and the biography section
- `src/components/about/*` — the annotation components

## Possible Cause

The annotation is absolutely positioned relative to the portrait, and at `md` the text
column starts closer to the portrait than the annotation's right edge.

## Possible Solution

Either hold the annotation inside the portrait's own width, or delay the two-column layout
to `lg`. Worth checking the other hand annotations on the page at the same width while
there.

## Related

`ISSUE-016`, `SUGGESTION-010`, `MILESTONE-007`.
