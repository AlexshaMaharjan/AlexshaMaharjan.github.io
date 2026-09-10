# ISSUE-038 — Five supplied files are still unplaced: three videos and two photographs

Status: Open — parts 1 and 2 closed (SESSION-034, SESSION-033). **Part 3 stands: `Afono/Wireframe.png` is still blank.**
Priority: Medium
Category: Content
Discovered: 2026-09-10 (SESSION-032)
Owner decision: yes for all three groups

## 1. ~~Three craft videos — 121 MB, and no encoder here~~ — CLOSED

**Resolved in SESSION-034** (`DECISION-026`). The premise was wrong, and it was my own:
this issue said there is no encoder on this machine, because `ffmpeg` is absent and
`avconvert` grew two of four files.

**Chrome is an encoder.** `scripts/video-clip.mjs` plays the source, draws it to a canvas
at the size actually wanted, and records `canvas.captureStream()` through `MediaRecorder`.
The question this issue never asked was the one that mattered: a gallery tile does not need
the film, it needs eight seconds of it at 640px.

| Source | | Clip |
| --- | --- | --- |
| `craftworkgift1.mp4` 15.4 MB, 48s | → | `pg-gift-explosion.mp4` **349 KB**, 8s |
| `craftgift2.mp4` 60.1 MB, 142s | → | `pg-gift-popup.mp4` **476 KB**, 8s |
| `craftgift3.mp4` 45.9 MB, 23s | → | `pg-gift-riona.mp4` **210 KB**, 6s |

**121 MB → 1035 KB.** All three autoplay muted and looping in Handmade and Bead Crafts,
and none of them is fetched at all under `prefers-reduced-motion`.

## 2. ~~Two photographs — the playground has no category for them~~ — CLOSED

**Resolved in SESSION-033 by option 2, as part of the owner's category restructure**
(`DECISION-023`). `3D and Motion` became **Photography, Animation and 3D**, and both
photographs lead it:

| Source | Decoded | Export | Aspect |
| --- | --- | --- | --- |
| `photographystilllife.jpg` | 8000 × 6176 | `pg-photo-stilllife.webp` 1250 × 965, 35 KB | `250/193` |
| `PhotographyLowkey.jpg` | 3840 × 5760 | `pg-photo-lowkey.webp` 1200 × 1800, 165 KB | `2/3` |

Both decode as they are stored — no EXIF rotation this time — and both reduce to an exact
ratio (8000/6176 is 250/193; 3840/5760 is 2/3), so neither is cropped by `object-cover`.

A seventh category was not needed: two photographs do not make a section, and the three
subjects share one — light, and what it does to a surface over time.

## 3. `Afono/Wireframe.png` — still blank

14,299 × 8,794 and entirely white; `ink-box` finds nothing anywhere on the canvas. Flagged since
`ISSUE-035` and unchanged. Re-export it if a real wireframe board exists.

## Related

- `DECISION-022` — how video is handled, and the compression measurements
- `ISSUE-035` — where the blank wireframe was first recorded
