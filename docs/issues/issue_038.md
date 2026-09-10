# ISSUE-038 — Five supplied files are still unplaced: three videos and two photographs

Status: Open — part 2 closed 2026-09-10 (SESSION-033)
Priority: Medium
Category: Content
Discovered: 2026-09-10 (SESSION-032)
Owner decision: yes for all three groups

## 1. Three craft videos — 121 MB, and no encoder here

`craftworkgift1.mp4` (15.4 MB), `craftgift3.mp4` (45.9 MB), `craftgift2.mp4` (60.1 MB). They show
gift boxes being *made*, which the eight craft stills on the page do not — so they are genuinely
additive, not duplicates.

They were not shipped because **there is no encoder on this machine.** `ffmpeg` is not installed,
and `avconvert`'s presets target quality: on these four files it grew two, left one unchanged, and
only usefully shrank one. `DECISION-022` has the numbers.

`ui/Video` means a page carrying a film costs its poster — 34 KB — and the film only downloads on
a click. **But click-to-play makes a page cheap, not a repository small.** 121 MB of phone footage
is more than this repository has ever carried, and `ProjectsDokus/` is git-ignored for exactly
that reason.

**One command makes all three shippable:**

```bash
ffmpeg -i craftgift2.mp4 -vf scale=-2:720 -crf 28 -c:a aac -b:a 96k craftgift2-web.mp4
```

That should put all three comfortably inside 15 MB together. HandBrake's "Fast 720p30" preset does
the same thing with a GUI. Drop the compressed files in and they take three slots in
`Handmade and Bead Crafts` in minutes — the component, the poster extractor and the content model
all exist now.

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
