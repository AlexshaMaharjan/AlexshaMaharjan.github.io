# SESSION-034 — The playground becomes one page, and Chrome turns out to be an encoder

Date: 2026-09-10
Branch: `milestone-003-content-model`
Status: verified. **Nothing pushed.**

## Two requests, in order

The session began by finishing SESSION-033's loose end — the owner's message had been cut
off mid-word. The rest of it arrived:

> "most of the images are cut and is not visible… everything is looking too colourful right
> now and the moving animation is also abit too busy"

That produced `DECISION-025`, which shipped and was verified: a uniform 3/4 box, nothing
cropped, matted in each image's own colour, and one marquee row moving at a time. **It is
committed as `cf64c51` and it was the right fix for the page as it then was.**

Then the owner changed direction:

> "i want this whole playground page to be a gally type page with bento grid type layout,
> more like journal or scrapbooking style. i dont want the user to click and land on other
> pages but everything needs to be here… try to work with original aspect ratos and sizes
> and make the bento box work."

So `DECISION-026` supersedes most of `DECISION-025` four hours later. That is not waste —
the mat sampling `DECISION-025` added is what `@/lib/tint` now uses to colour the sections,
and the crop measurements are what proved the old layout had to go.

## What the page is now

Twelve routes became one. `/playground/:category` and `/playground/:category/:slug` are
gone; the five categories are sections, the tiles are the work at full size, and clicking a
picture opens it larger **in place** via the lightbox `DECISION-018` already built. Routes:
**34 → 22.**

Tiles keep their **own aspect ratios**, justified into rows of two, three and four by
`bentoRows` — varying the row count is what makes a bento rather than a grid.

**Nothing was deleted to make this fit.** Two pieces of content would have gone with the
pages, and both were kept: the motorbike study's reflection became a **written card** among
the pictures, and each category's "more to come" line is rendered under its run.

**A gallery shows what exists.** `DECISION-006`'s hatched placeholder was right for small
even cards; at a 430px row height it made the two empty categories into **ten enormous
hatched rectangles across two screens** — the first thing a visitor met. They are now one
line of text naming what is planned.

## Chrome is an encoder — `DECISION-022` was too general

`DECISION-022` concluded there is **no encoder on this machine**, and `ISSUE-038` had been
open on that basis: 121 MB of craft video, unplaceable. `ffmpeg` is genuinely absent and
`avconvert` genuinely grew two of four test files.

The conclusion was right about transcoding whole films and wrong as a rule, because neither
it nor the issue asked the question a gallery asks: **a tile does not need the film. It
needs eight seconds of it, 640 pixels wide.**

`scripts/video-clip.mjs` plays the source in Chrome, draws it to a canvas at the wanted
size, and records `canvas.captureStream()` through `MediaRecorder`:

**121 MB → 1035 KB**, three clips, and `DECISION-012`'s thin toolchain is untouched.

Three things that were not obvious and are now written down:

- It records **MP4/H.264**, not WebM — Chrome 130+ can, and Safari's WebM support is
  inconsistent. Confirmed readable by AVFoundation, the best Safari proxy available here.
  `mdls` reports nothing at all for these files; **that is Spotlight's metadata extractor,
  not a playback test**, and it cost a few minutes of misplaced worry.
- The source is **served over HTTP by the script**. A canvas drawn from a `file://` video is
  tainted and `captureStream` throws.
- **The in-points were chosen by looking at frames.** `craftgift3` is a static cardboard box
  for its first fifteen seconds and only pops open at the very end. A clip from the start
  would have been six seconds of nothing.

## Motion, honestly

The clips autoplay, muted, looping. Three rules, all measured rather than asserted:

- **Muted, with no audio track at all** — zero audio bytes decoded.
- **Nothing under `prefers-reduced-motion`**: no `<video>` element is created, so the clip is
  never fetched. A full scroll of the page made **zero mp4 requests**.
- **Nothing off screen**, and the page's motion control stops all three (three playing → none).

## Two faults I introduced and caught by measuring

**The bento squeezed tiles to 82px at 768px wide.** Row counts are fixed at render; the
viewport is not. `SectionMedia` hit the same thing at 640px in SESSION-027 and fixed it by
raising a breakpoint — a `min-width` floor plus `flex-wrap` is the general form of that fix,
and it works at every width rather than one. Narrowest tile is now 168–176px everywhere,
overflow 0.

**The clips were under-provisioned for a phone.** Measured, a clip tile renders 328 CSS px
wide at 390px viewport — 656 physical at 2x, against a 460px clip. Re-encoded at 640 and the
posters at 720. The first pass also left two posters out of the variant map entirely,
because at 450px wide they fell under `MIN_SAVING`.

## Verified

- routes **22/22**, `tsc` clean, ESLint 0 errors (3 pre-existing warnings)
- `content-audit.mjs` clean — and its playground half was **rewritten**: SESSION-033's ring
  and cross-file link checks are gone because the links are gone. What replaced them is the
  `en`/`de` parity `image-manifest.mjs` cannot see, plus a rule that **every clip has a
  poster** — the entire fallback for a reader with reduced motion. All proved by injecting
  the fault, including one round where a poster test passed for the wrong reason and had to
  be redone against both locales.
- `image-manifest.mjs` exits 0 — **159 slots, 129 filled**

## The weight, measured three times before it was right

`/playground` is now the heaviest page on the site: **492 KB on landing** at 390/3x, and
**4082 KB after scrolling all 9,100 pixels of it** (2755 KB pictures, 1036 KB clips). Filed
as `ISSUE-040` — every remaining lever trades picture quality, so it is the owner's call.

Three attempts to measure it disagreed with `verify weight` in both directions before I
found why: **`scripts/lib/cdp.mjs`'s `setViewport` hardcodes `deviceScaleFactor: 1`**, so a
run labelled "390/3x" was really 390/1x and reported 662 KB against a truth of 2755 KB.
`verify weight` sets device metrics itself and had been right the whole time.

**When a hand-rolled measurement disagrees with the harness, suspect the measurement.** The
same instinct that caught the `timeout` mistake in SESSION-032 applies: I nearly wrote up a
number that would have made the page look four times lighter than it is.

The dead route `/playground/graphic-design` was also still in the weight sample, cheerfully
reporting "0 KB img, 113 KB total" — **the weight of the 404 page.** A route that stops
existing does not fail that check, it flatters it. Removed.

## Left for the owner

- **`ISSUE-038` part 3** — `Afono/Wireframe.png` is still 14,299 × 8,794 of blank white.
- The colour question the owner deferred in SESSION-033 is answered by `@/lib/tint`, but the
  wash strength (94% toward white) is the knob most likely to want tuning.
- **The branch is 55 commits ahead of `main` and unpushed.**
