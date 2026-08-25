# Previous Session

**SESSION-017** — 2026-08-25 — owner-directed design change — Complete
Full record: `docs/sessions/session_017.md`. Commit `a8aa0fd`, plus the docs commit after it.

## What changed

The owner asked for three things on the case-study pages, and they turned out to be one
change (`DECISION-017`):

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

## What this constrains

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
