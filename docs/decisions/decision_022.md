# DECISION-022 — Video ships at full size and loads only on demand

Status: Active
Date: 2026-09-10 (SESSION-032)
Scope: Case-study and playground figures that are films

## Context

The owner supplied four videos. The barrier-free kitchen's case study has always
described an animated Blender walkthrough and carried a hatched slot where it
should have been.

The obvious move — compress them to something a web page can carry — is not
available. **There is no encoder on this machine.** `ffmpeg` is not installed,
and macOS's own `avconvert` optimises for quality rather than size, so its
presets are as likely to grow a file as shrink it. Measured, on the four:

| File | Source | `Preset960x540` |
| --- | --- | --- |
| `kitchen/Video.mp4` | 11.9 MB | **31.3 MB** |
| `craftworkgift1.mp4` | 15.4 MB | 15.4 MB |
| `craftgift2.mp4` | 60.1 MB | **77.2 MB** |
| `craftgift3.mp4` | 45.9 MB | 13.2 MB |

One of four usefully compresses. That is not a pipeline.

## Decision

**Do not shrink the video. Do not fetch it.**

A film is a figure whose `src` is a **poster still**, with the film itself in a
separate `video` field. `ui/Video` renders the poster, and swaps in a
`<video controls autoPlay>` only when the play button is pressed —
`preload="none"` until then.

So the page carries the poster: **34 KB against a 12 MB film.** The 12 MB
arrives on a click, or never.

**Verified rather than assumed.** Driving the built page through CDP with a
network listener: after a full scroll of `/work/barrier-free-kitchen`, mp4
requests were `NONE`; after clicking play, exactly one — `kitchen-animation.mp4`
— and a `<video>` element with controls at 1024×576.

## What follows from it

**There is no `prefers-reduced-motion` branch, and there should not be.** Nothing
plays unless a person presses play, and `DECISION-008`'s rule is about
*unsolicited* movement. A click is a request.

**The controls are the browser's.** They are keyboard-operable, localised, and
carry the full-screen affordance for free — which is also why a film skips the
`Lightbox`: `DECISION-018` exists so a dense *still* can be read at full size,
and nesting a zoom button inside a video would put one interactive element
inside another.

**The poster carries the aspect.** `aspect` must match the poster exactly, as for
any other figure, so a film sits in the justified rows of `DECISION-019` with no
special case.

## What was not shipped, and why

**The three craft videos — 121 MB between them.** Click-to-play makes a page
cheap, but it does not make a repository small, and this project has been
careful about that: `ProjectsDokus/` is git-ignored for exactly this reason.
One 12 MB film that fills a gap the case study describes is a reasonable cost;
121 MB of phone footage that duplicates eight craft stills already on the page
is not.

They become shippable the moment they are compressed — `ffmpeg -crf 28 -vf
scale=-2:720` or a HandBrake pass would put all three inside 15 MB. Recorded in
`ISSUE-038`.

## Related

- `DECISION-018` — the lightbox, which a film deliberately does not use
- `DECISION-019` — the justified rows a film sits in unchanged
- `ISSUE-038` — the unplaced videos and photographs
