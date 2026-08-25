# ISSUE-029 — The About page's hand annotation overlaps the Biography heading at 768px

Status: **Resolved** (SESSION-014, `a1f4370`)
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

## Resolution

The annotation was positioned at a fixed `left-[150px]` inside a column that is less than
half its desktop width at `md`, so it left the column and landed on the heading. It is
positioned proportionally now — `left-[30%]`, which reproduces the desktop placement to
within two pixels — and measures clear at 768, 800, 840, 880, 900, 1024, 1160 and 1440.

The collision band was 768–~870px, narrower than "at `md`" suggested; the fix covers all of
it without hiding the note at any width, which the alternative (`lg:block`) would have done
between 880 and 1023.

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
