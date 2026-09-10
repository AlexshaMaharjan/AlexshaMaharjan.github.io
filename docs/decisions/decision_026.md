# DECISION-026 — The playground is one page: a scrapbook that moves

Status: Active
Date: 2026-09-10 (SESSION-034)
Scope: `/playground` and everything under it
Supersedes: `DECISION-025` (the uniform 3/4 box), and the twelve playground routes
Amends: `DECISION-022` ("there is no encoder on this machine")
Closes: `ISSUE-038` part 1

## Context

The owner, after seeing `DECISION-025` land:

> "i want this whole playground page to be a gally type page with bento grid type
> layout, more like journal or scrapbooking style. i dont want the user to click
> and land on other pages but everything needs to be here… try to work with
> original aspect ratos and sizes and make the bento box work. maybe even try to
> work with colours, so that it is pleasing to the eye to watch"

The old shape was an index that sent you elsewhere: five auto-scrolling marquees,
each a teaser for a category page, with a project page beneath that. Three levels
and twelve routes, and **the pictures were smallest on the page whose whole job
was to show them.**

## Decision

### One page

`/playground/:category` and `/playground/:category/:slug` are gone. The five
categories are sections of one page; the tiles are the real thing at full size.
Routes drop from 34 to 22.

Clicking a picture opens it larger **in place**, using the lightbox
`DECISION-018` built for dense case-study figures. Nothing navigates.

Two pieces of content would have died with those pages, and neither was allowed
to:

- **The motorbike study's reflection** is the owner's prose (`MILESTONE-004`:
  do not rewrite it, and by extension do not bin it). A tile can now be a
  **written card** — `note` — so it sits among the pictures in the owner's hand.
- **Each category's "more to come" line** is rendered under its run.

### Original aspect ratios, in justified rows

`DECISION-025` put every card in one 3/4 box because the page was a row of even
cards and a uniform box was the honest way to hold mixed shapes without cropping.
**A scrapbook has no such constraint** — the shapes are the layout. So the box is
the picture's own shape, and `bentoRows` varies the run — two, three, four,
three — which is what turns an even grid into a bento. Row heights are justified
by `@/lib/justify`, the same maths the case studies use.

**Nothing is cropped and nothing is matted.** The build-time mat colours from
`DECISION-025` are still sampled, and still used — by `@/lib/tint`, below. But
`ui/Media`'s `contain` mode went with the uniform box: no call site needed one
any more, and an unused branch documented against a superseded decision is worse
than no branch. `Media` is back to one rule — **`aspect` is the image's own
ratio**, and anything else is a silent crop.

### A gallery shows what exists

`DECISION-006` renders an unfilled slot as a hatched placeholder. That was right
for small even cards. At a 430px row height it was **ten enormous hatched
rectangles across two screens** — the first thing a visitor met, saying nothing.
Those become one line of text: *"still to come — Unity game · Hibi application ·
…"*. The information survives; the acreage does not.

### Colour taken from the pictures, not invented

Each section stands on a wash of its own contents' colour: the mats
`image-variants.mjs` already samples, averaged and mixed 94% into white
(`@/lib/tint`). Digital drawings come out faintly lilac, crafts faintly green,
photography grey because its pictures are nearly black.

**`DECISION-020` did this and was rejected, so the difference matters.** That
tinted the tiles themselves and put white text on them — eight murky washes under
a restrained page. Here the colour never touches a tile and never sits under
text. It is a ground behind a section, and a gradient rather than a band so the
page does not read as stripes.

### Clips that play themselves

Three of the craft videos now autoplay, muted and looping, in the crafts run.
`ui/LoopVideo` holds three rules that are not negotiable:

- **Muted, always**, and the clips are encoded with no audio track at all —
  measured: zero audio bytes decoded.
- **Nothing plays under `prefers-reduced-motion`**: no `<video>` is created, so
  the clip is never even fetched. Verified — a full scroll of the page under
  reduced motion makes **zero mp4 requests**.
- **Nothing plays off screen**, and it stops when it leaves.

The page's motion control stops all of them (WCAG 2.2.2). Verified: three
playing, all muted, all looping; after pressing pause, none.

## `DECISION-022` was right about films and wrong as a rule

That decision concluded there is **no encoder on this machine**. `ffmpeg` is not
installed, `avconvert` grew two of four test files, and so the 121 MB of craft
video was unplaceable — `ISSUE-038` part 1.

The conclusion was correct about *transcoding whole films* and wrong as a general
statement, because it never asked the question a gallery asks: **a tile does not
need the film. It needs eight seconds of it, 460 pixels wide.**

Chrome ships an encoder — `MediaRecorder`. `scripts/video-clip.mjs` plays the
source, draws it to a canvas at the size actually wanted, and records
`canvas.captureStream()`:

| Source | | Clip |
| --- | --- | --- |
| `craftworkgift1.mp4` 15.4 MB, 48s | → | `pg-gift-explosion.mp4` **312 KB**, 8s, 520×694 |
| `craftgift2.mp4` 60.1 MB, 142s | → | `pg-gift-popup.mp4` **335 KB**, 8s, 460×818 |
| `craftgift3.mp4` 45.9 MB, 23s | → | `pg-gift-riona.mp4` **138 KB**, 6s, 460×818 |

**121 MB became 785 KB**, and `DECISION-012`'s thin toolchain is intact — it is
the same Chrome that already resizes every image.

Two details that are not obvious:

- **It records MP4/H.264**, not WebM, because Chrome 130+ can and Safari's WebM
  support is inconsistent. Confirmed readable by AVFoundation, which is the best
  proxy for Safari available here. (`mdls` reports nothing for these files —
  that is Spotlight's metadata extractor, not a playback test, and it misled me
  for a minute.)
- **The source is served over HTTP by the script**, not read as `file://`: a
  canvas drawn from a file-scheme video is tainted and `captureStream` throws.

**The in-points were chosen by looking.** `craftgift3` is a static box for its
first fifteen seconds and only pops open at the very end; a clip taken from the
start would have been six seconds of a cardboard box not moving.

## Related

- `DECISION-025` — the uniform box, and the crop measurements that motivated it
- `DECISION-022` — click-to-play for a 12 MB film; still correct for that case
- `DECISION-018` — the lightbox, now doing the job the category pages did
- `DECISION-006` — the hatched placeholder, narrowed here
