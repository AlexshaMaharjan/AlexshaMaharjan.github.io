# Previous Session

**SESSION-034** — 2026-09-10. Full record: `docs/sessions/session_034.md`.

## What it did

**Finished SESSION-033's cut-off request** (`DECISION-025`, committed as `cf64c51`): the
playground marquee had declared `aspect="4/3"` on every card whatever the image was, and
`object-cover` discarded an average of **36% of every picture** — the ITD logo card read
"Infrastruktur Technologie und D—". Fixed with a measured 3/4 box, contained, matted in each
image's own build-time-sampled border colour; and one marquee row moving at a time.

**Then rebuilt the playground entirely** (`DECISION-026`), because the owner changed
direction: one scrapbook page, no sub-pages, **true aspect ratios** in bento rows of two,
three and four. Routes **34 → 22**. Clicking a picture opens it in place. The motorbike
study's reflection survived losing its page as a **written card** among the pictures.

**Found that Chrome is an encoder.** `DECISION-022` had concluded there is none on this
machine, and `ISSUE-038` sat open on that basis. True of `ffmpeg` and `avconvert`; wrong as
a rule. `scripts/video-clip.mjs` records `canvas.captureStream()` through `MediaRecorder`:
**121 MB of craft video → 1035 KB** of muted, looping, autoplaying clips. MP4/H.264, so
Safari plays them.

**Colour comes from the pictures.** Each section stands on a wash averaged from its own
images' sampled mats, mixed 94% into white — never on a tile, never under text, which is
what `DECISION-020` got wrong.

**A gallery shows what exists.** At a 430px row height the two empty categories were ten
huge hatched rectangles across two screens. They are one line of text now.

## Two faults caught by measuring, not by looking

- The bento **squeezed tiles to 82px at 768px wide** — row counts are fixed at render, the
  viewport is not. A `min-width` floor plus `flex-wrap` fixes it at every width.
- The clips were **under-provisioned for a phone** (328 CSS px tile, 460px clip), and two
  posters fell out of the variant map entirely for being under `MIN_SAVING`.

## State

22 routes, `tsc` clean, lint 0 errors, content audit clean, **159 slots / 129 filled**.
**55 commits ahead of `main`, still unpushed. The owner has not seen any of this.**
