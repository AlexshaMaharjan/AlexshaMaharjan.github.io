# DECISION-016 — Image provenance: only the owner's own work ships

Status: Active
Date: 2026-08-25 (SESSION-015)
Scope: Every image on the site

## Context

`docs/reference/image_sources.md` establishes that most of the site's 129 empty image slots
can be filled from six university project documentations. Those documents are academic work,
and academic work cites its references *inside itself*: mood boards, competitor screenshots,
inspiration pages and stock photography sit on the same pages as the owner's own diagrams,
wireframes and screens.

This is not hypothetical. `FInalDesmeth.pdf` (Surugami) carries a sources page crediting
Freepik photographs by URL and stating that *"P4, P5, P6, P7, P8: All references were taken
from Pinterest"*. Five pages of that document are other people's images.

A documentation submitted for a grade may quote freely under academic fair use. A public
portfolio that shows the same image, uncredited, next to the sentence "I designed this" is a
different act with different consequences — both a licensing exposure and a
misrepresentation.

## Decision

**Only work the owner made ships.**

- **Read the sources / references section of a documentation before exporting from it.**
  Every one of the six has one. It is the fastest way to learn which pages are borrowed.
- Where a page mixes the owner's diagram with borrowed imagery, **crop to the owner's part**.
- Competitor screenshots and market analyses stay out, even where a case study discusses
  them. `[ competitor analysis ]` in the manifest means *the owner's analysis* — the
  comparison chart, the annotated table — not the competitor's interface.
- Stock photography used inside a mockup is acceptable where it is incidental to a design the
  owner made (a placeholder face inside their own UI), and only if the licence permits it.
  A stock photograph shown as the work is not.
- Collaborative work may be shown. Four of the six projects were team projects; `DECISION-011`
  already requires the copy to credit collaborators, and the case studies do.

## Reasoning

`DECISION-011` forbids inventing copy — no fabricated metrics, no implied clients, no sole
credit for team work. The same standard has to hold for images, and images make the claim
more forcefully than a sentence does. A portfolio's entire argument is "this is my work";
the one thing it cannot survive is that claim being false.

There is a practical reason too. This portfolio is for job applications. A reviewer who
recognises a Freepik photograph or a competitor's screenshot presented as original work does
not raise a query — they stop reading.

## What it found when applied (SESSION-016)

All six documentations cite borrowed material inside themselves — the rule was not
hypothetical in a single case:

- **Surugami** — Freepik by URL, and five pages from Pinterest.
- **AFONO** — pages 25–27 are headed *"KI-generierte Modemodelle und Mockups"*, and the
  document itself calls them placeholders for later real photography. **This one is the
  owner's call, not a licensing question**, and was left to them.
- **QIS Portal** — flaticon icons, Freepik illustrations, a login background from a Google
  image search; and its "Originale" screenshots are the university's live portal.
- **Kitchen** — three Sketchfab models: the wheelchair figure, a jar, a decor pack.
- **WikiMind** — no sources page, but unattributed stock portraits in its personas.
- **Sync FM** — no sources page, but page 38 states three images were AI-made.

Nothing borrowed shipped.

## Consequences

- Extraction is a **manual, page-by-page** step. `scripts/pdf-page.js` deliberately renders
  whole pages rather than bulk-extracting embedded images, because a bulk extractor would
  strip the borrowed images out along with the owner's and lose the distinction.
- Some manifest slots will not be fillable from the documentations and will need new work or
  a deliberate empty. The hatched placeholder is a designed state (`DECISION-006`), so an
  unfillable slot is not a broken page.
- Surugami is the most affected project: five of its pages are reference material.

## Alternatives Rejected

**Extract everything, filter later.** Faster to start, and it puts the borrowed images into
`public/images/`, which ships — the exact mistake SESSION-014 caught with the image manifest
being served publicly. Filtering something out of a deploy is harder than never adding it.

**Credit borrowed images in the caption instead of excluding them.** Honest, but it fills a
portfolio's finite space with other people's work, and it does not resolve the licence.
