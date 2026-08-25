# Previous Session

**SESSION-018** — 2026-08-25 — owner-directed design change — Complete
Full record: `docs/sessions/session_018.md` (and `session_017.md` immediately before it).
Commits `a8aa0fd`, `fecd070`.

## What changed

**SESSION-018 — one width down the column.** The reading column had four widths running down
it (media 960, section heading 900, design-question band 840, body 680), so every paragraph
stopped with 280px of empty page beside it above a figure that ran to the edge. Everything in
the column now shares the column's width, and body type went to 19px/1.75 to carry the longer
line. Recorded as `DECISION-014` amendment 2, because it reverses that decision's layout
point 1.

**SESSION-017 — the layout itself.** The owner asked for three things, and they turned out to
be one change (`DECISION-017`):

- **The contents rail is on screen when a case study opens.** It was already `sticky`; it was
  not *present*, because the grid it lived in only began after a full-width hero and facts
  strip — close to two screenfuls.
- **The title, description, tags and facts are inside the Overview section**, through a new
  optional `intro` slot on `Section`. The page reads `01 Overview` → title → description →
  tags → facts → the section's own heading → prose.
- **The headline dropped** from `text-hero` to `text-feature` (84px → 52px at 1440), and the
  first section's heading from `text-heading` to `text-subheading`, because at 44px under a
  52px `h1` the two competed.
- **The facts are a label/value list** at the 680px measure instead of a full-width auto-fit
  card grid. `year` is gone from the data, the type and the dictionary. `type` now reads
  "Semester project · solo" / "Semester project · team" in both locales.

All six studies, both locales.

## What this constrains — read this before touching a case study

- **The measure is gone on purpose.** `MEASURE` is `max-w-full` and the line is ~101
  characters at 1440px, past the ~66 that is ideal. SESSION-004's reasoning for 680px was
  right for its setting; `DECISION-017` changed the setting. **If this is revisited, the lever
  is the column width, not the measure** — matching them at a comfortable measure means
  shrinking the media, which the owner explicitly did not want.

- **Nothing may go above the grid in `CaseStudyPage`.** That is the entire mechanism by which
  the rail is visible on load. Adding a band above it silently undoes `DECISION-017`.
- **`CaseStudyHero` is the image and nothing else**, rendered inside the reading column at
  ~960px rather than across the container at ~1280px. That shrink is the price, paid knowingly.
- **`Section` has an `intro` slot** used only by the first section. It sits between the
  eyebrow and the heading.
- The solo/team half of `type` is load-bearing — `DECISION-011` does not allow collaborative
  work to read as independent.
- **`npm run build` alone leaves the prerendered heads stale.** `hreflang` reads 0/8 until
  `npm run prerender` runs. That looked like a regression for a minute and was not.

## What the owner should know

**QIS Portal's year was `"2024 · 2026 visual iteration"`.** Removing the year removed the only
statement that the project was revisited. If that matters it belongs in prose
(`MILESTONE-004`).

## What did not change

No prose, no images. The rail is still `xl`-and-up, with the collapsible `<details>` below
1280px. Nothing pushed, nothing deployed.
