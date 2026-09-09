# SESSION-032 — The playground fills, and the site learns to carry video

Date: 2026-09-10
Branch: `milestone-003-content-model`
Asked for: *"i have added videos and photos so use them whereever possible."*

## 161 slots, 125 filled

Up from 150 / 89. **The playground was the last surface with no imagery at all** and now carries
34 figures across four of its six categories. The barrier-free kitchen's animation and QIS's
lo-fi prototypes — both described in prose and hatched since the manifest was written — are in.

| Surface | Before | After |
| --- | --- | --- |
| Playground — Digital Drawings | 0 of 5 | **9 of 9** |
| Playground — Handmade and Bead Crafts | 0 of 5 | **8 of 8** |
| Playground — Editorial | 0 of 5 | **5 of 5** |
| Playground — Graphic and Logo | 0 of 5 | **9 of 9** |
| Playground — home | 0 of 5 | 3 of 5 |
| Barrier-free kitchen | 13 of 15 | **14 of 15** |
| QIS Portal | 7 of 14 | **8 of 14** |

Captions were rewritten to name what actually arrived — "Beaded hanging planter", "Explosion gift
box", "Typographic postcard 1–3" — rather than leaving the manifest's placeholders describing work
that was never supplied.

## Video, and the constraint that shaped it

The kitchen case study has always described an animated Blender walkthrough. The obvious move —
compress the 12 MB file to something a page can carry — turned out not to be available. **There is
no encoder on this machine:** no `ffmpeg`, and macOS's `avconvert` optimises for quality, not size.

Measured on all four supplied videos:

| File | Source | `Preset960x540` |
| --- | --- | --- |
| `kitchen/Video.mp4` | 11.9 MB | **31.3 MB** |
| `craftworkgift1.mp4` | 15.4 MB | 15.4 MB |
| `craftgift2.mp4` | 60.1 MB | **77.2 MB** |
| `craftgift3.mp4` | 45.9 MB | 13.2 MB |

One of four usefully compresses. So `DECISION-022`: **do not shrink the video, do not fetch it.**
A film is a figure whose `src` is a poster still, with the film in a separate `video` field;
`ui/Video` swaps in a `<video controls>` only on a click, `preload="none"` until then. The page
carries **34 KB against a 12 MB film**.

`scripts/video-frame.mjs` grabs the poster — no encoder needed for that, since Chrome already
decodes the video: seek it and draw one frame to a canvas.

**The claim was verified rather than assumed.** Driving the built page through CDP with a network
listener: after a full scroll of `/work/barrier-free-kitchen`, mp4 requests were `NONE`; after
clicking play, exactly one, and a `<video>` with controls at 1024×576.

The poster is also better than what it replaced: the old kitchen hero was two Blender *viewport
screenshots*, one with the axis gizmo in frame. This is a clean render of the whole room.

## Two traps, one of them mine

**The EXIF trap again, and it is now three for three.** `bead.jpg` and `gift4.jpg` store landscape
and decode portrait. Every session that has taken a folder of photographs has hit this, and the
method in `next_session.md` now says to decode with `Image()` rather than trust `sips` — which is
why it was caught before export this time rather than after.

**`timeout` does not exist on macOS.** I wrapped the video transcodes in `timeout 600 avconvert …`,
got "command not found" on both, and wrote them up as *failed transcodes*. They had never run. The
real numbers — including the two files that grew — only appeared on the re-run. **A command that
fails to start looks exactly like the command failing**, and the difference matters: one of those
conclusions would have gone into a decision record as fact.

**Two source files exceed Chrome's decoder.** `digitalart6.jpg` and `digitalart9.jpg` are 581 and
670 megapixels; `Image.decode()` refuses them. Pre-scaled with `sips` first. The QIS prototype PDF
rendered to 479 MP and needed the same.

## Still unplaced — `ISSUE-038`

- **Three craft videos, 121 MB.** They show gift boxes being *made*, which the stills do not, so
  they are additive rather than duplicates. Click-to-play makes a page cheap but not a repository
  small, and 121 MB is more than this repository has ever carried. One `ffmpeg -crf 28` pass makes
  all three shippable; the component, the poster extractor and the content model are already there.
- **Two photographs**, and the playground has no photography category. Filing them under Handmade
  or Digital Drawings would miscategorise them. Adding a category is a real change — route, nav,
  copy in both locales — and it is the owner's call.
- `Afono/Wireframe.png`, still entirely white.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- The video's load behaviour driven end to end through CDP

## Still open

- Playground: 3D and Motion (5), Games and Interactive (5), Motorbike Study (4), home featured (2)
- QIS's six remaining figures; the kitchen's textured render
- `ISSUE-038`, `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 51 commits ahead of `main` before this one.
