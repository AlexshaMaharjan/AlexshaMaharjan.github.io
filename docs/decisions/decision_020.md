# DECISION-020 — The bento tiles are washed pale, not darkened

Status: Active
Date: 2026-09-09 (SESSION-030)
Scope: The homepage work grid
Supersedes: the tile treatment established in SESSION-014/SESSION-016

## Context

Each of the eleven tiles carried an image that was darkened to roughly 40–80%
brightness, desaturated, and tinted with its project's colour — navy for
WikiMind, maroon for AFONO, purple for Sync FM, teal for Surugami — so that
white text could sit on top of it. `image-treat.mjs` measured two bands and
failed the export if a tile was too *light* to hold white text.

Seen on the page, eleven of those together read as a patchwork of murky colour
washes under a white, restrained layout. The owner's words: **"i donnot like the
bento grid backgrounds, it does not fit the whole aesthetic of this website."**

They are right, and the reason is structural rather than a matter of taste. The
rest of the site is white surfaces, thin `card-border` rules, mono labels, ink
text and one blue accent. The tiles were the only place doing the opposite, and
they were doing it eight different times.

## Decision

**Wash the tiles pale and set the text in ink.**

- A tile's image is brightened, kept near its own saturation, and covered with a
  white overlay at ~50% — so it survives as a **faint tint of its own colour**
  rather than as a project-coloured stain. Asked what he wanted instead, the
  owner said *"maybe subtle colour backgrounds? maybe from title images?"* — the
  colour comes from the work itself, not from a palette entry.
- The category and title are `text-ink-secondary` and `text-ink`. **The dark
  gradient scrim is deleted**, not lightened: the contrast now comes from the
  image being pale, so there is no second layer to maintain.
- The tile gains `border-card-border` and `hover:border-accent`, which is what
  every case-study figure already does.

## The check flipped with it

`check: "bento"` measured the same two bands before and after; it asserted
`<= 128/138` and now asserts `>= 190`. **Same measurement, opposite direction** —
a ceiling for white text became a floor for ink.

190 puts the darkest tile at roughly 8:1 against the ink, past WCAG 1.4.3's
4.5:1 with room for the image's own darker passages.

**It earned its keep immediately.** At a 50% wash, `tile-syncfm-mobile` came out
at 176/178 and failed — its source is Sync FM's *dark mode* screens, and no wash
that suits ten light sources suits that one. It gets a stronger wash of its own.

## What it does not check

The bands are means. **Nothing measures the contrast directly behind the
glyphs**, so a title crossing a dark passage of an otherwise-pale image would
pass. The tiles were read at 1440px after every export for that reason, and axe
covers the rendered result.

## Consequences

The per-project tint colours are gone from `image_crops.json` — eleven `grade`
blocks now differ only in the one tile that needed a stronger wash. The homepage
reads as one surface with the rest of the site, and each project still has a hue.

## Related

- `DECISION-010` — the bento grid itself, which this does not reopen
- `SESSION-014` — where the original contrast ceiling was measured
