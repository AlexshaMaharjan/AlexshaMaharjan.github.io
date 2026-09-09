# Previous Session

**SESSION-030** — 2026-09-09. Full record: `docs/sessions/session_030.md`.

## What it did

The last two image folders arrived — `Images/kitchen/` (12) and `Images/qis/` (7), plus an AFONO
cover. **All six case studies now run on the owner's own exports.** **155 slots, 94 filled**, up
from 148/75. Every supplied file across six folders is placed except `Afono/Wireframe.png`, which
is blank.

And the bento grid was rebuilt: the owner said the tile backgrounds did not fit the site, and they
were right.

## The first thing done, before anything else

**`ProjectsDokus/` had moved inside the repository** — 644 MB of PDFs, untracked, one `git add -A`
away from being committed, and every session here commits with `git add -A`. Git-ignored
immediately. They have always been source material that must not ship.

## The bento — `DECISION-020`

Each tile was darkened to 40–80%, desaturated and tinted with its project's colour so white text
could sit on it. Eleven of those under a white, restrained layout read as a patchwork of murky
washes. Asked what he wanted instead, the owner said *"maybe subtle colour backgrounds? maybe from
title images?"*

Tiles are now **washed pale** — a ~50% white overlay over a brightened image — with **ink** text,
and the dark scrim is deleted rather than lightened. The colour survives as a faint tint of each
image's **own** hue rather than a palette entry.

**The contrast check flipped with it**: `check: "bento"` measured the same two bands before and
after, asserting `<= 128/138` for white text and now `>= 190` for ink. It earned its keep on the
first run — `tile-syncfm-mobile` failed at 176/178, because its source is Sync FM's *dark mode*
screens and no wash that suits ten light sources suits that one.

## The thing worth carrying forward

**`sips` reports the pixels a file stores, not the pixels anything renders.**

The kitchen's `test1.jpg` and `test2.jpg` store 8160 × 3768 and **decode as 3768 × 8160** — they
carry an EXIF rotation. Declaring the stored ratio would have squashed two portrait photographs
into landscape, and **nothing downstream would have caught it**: `image-treat.mjs` draws through
Chrome, which *applies* the rotation, so the export comes out distorted rather than failing.

What prompted the check was the contact sheet showing them portrait while `sips` said landscape.
Both were re-measured with an `Image()` decode before any aspect was written, and the method in
this file's Objective now says so.

## Two smaller notes

- A `[ original portal — before ]` placeholder survived the first removal because it was a
  single-line `images: [{ … }]`. Removing the English one alone put the locales out of step and
  **`image-manifest.mjs` exited 1 immediately** — the German twin had a localised caption, which
  is why one regex missed it.
- **`ISSUE-037`**: three screenshots of TH Lübeck's existing portal are now on the QIS page.
  `DECISION-016` says competitor screenshots stay out, but it was written for material used as
  *inspiration*; here the borrowed thing is the subject of the redesign, and it is captioned as
  such in both locales. The real risk is narrower — `oldinfo.jpg` shows a grade record whose
  fields were **not checked one by one.**

## What it left for the owner

- **The playground — 39 slots, and the only surface with no supplied imagery at all.**
- Kitchen's textured render and animation; QIS's seven remaining figures, named in the hand-off.
- `ISSUE-037` and the six standing decisions.
- **Nothing pushed — 47 commits ahead of `main` before this one.**
