# ISSUE-038 — Five supplied files are still unplaced: three videos and two photographs

Status: Open
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

## 2. Two photographs — the playground has no category for them

`PhotographyLowkey.jpg` (13.6 MB, 3840×5760) and `photographystilllife.jpg` (12.0 MB, 8000×6176).

The playground's six categories are Digital Drawings and Portraits, Handmade and Bead Crafts,
Calendars and Editorial Experiments, Graphic and Logo Experiments, 3D and Motion, and Games and
Interactive Experiments. **Photography is not one of them**, and filing photographs under any of
those would miscategorise them.

Three ways forward, and this one is genuinely the owner's:

1. **Add a Photography category.** It is a real change — a route, a nav entry, a category card and
   copy in both locales — but the structure is built for it and five other categories show the
   shape.
2. **Fold them into an existing category** if they belong to one in the owner's mind — the still
   life could sit under Handmade if it photographs their own objects.
3. **Leave them out.** Two photographs do not make a portfolio section.

## 3. `Afono/Wireframe.png` — still blank

14,299 × 8,794 and entirely white; `ink-box` finds nothing anywhere on the canvas. Flagged since
`ISSUE-035` and unchanged. Re-export it if a real wireframe board exists.

## Related

- `DECISION-022` — how video is handled, and the compression measurements
- `ISSUE-035` — where the blank wireframe was first recorded
