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
  owner's call, not a licensing question**, and was left to them. **Its sources page turns
  out to say more than this** — see the amendment below.
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


## Amendment 1 — a summary of a sources page is not the sources page (2026-08-25, SESSION-020)

The table above compresses each document's sources page to a line. For AFONO that line said
"pages 25–27 are AI-generated". Reading the page itself, before exporting, found three more
entries that the summary had dropped:

| Entry on AFONO's sources page | What it means for the site |
| --- | --- |
| *KI-generierte Mockups (ChatGPT)* — "Mode- **und Produkt**mockups … Platzhalter für spätere echte Fotografie" | Not only the model shots. Every product visual in the prototype is a placeholder |
| *Screen Mockup* — `graphicgata.com/3d-imac-screen-mock-up` | The iMac in the "Screen Mockup" figure is a downloaded template |
| *T-shirt Mockup* — `pixelbuddha.net/…/streetwear-t-shirt-mockup-with-rear-view` | The blank garment render is someone else's asset |
| *T-shirt Oversized Vorne und Hinten* — `behance.net/asset/325227/Oversized_Tee_MockUp_PSD` | So is the second one |
| *Visuelle Referenzen* — Zara, Mango, H&M, Noah NYC, Awake NY | The market-analysis page's photography |

None of this changes the decision. It changes what the decision *excludes*, and it would
have been missed by anyone working from the summary rather than the document.

**So: read the sources page of the document you are exporting from, every time, even when
this file already has a row for it.** The row is an index, not a substitute. The cost of
re-reading one page is a minute; the cost of the alternative is shipping someone else's
asset under the sentence "I designed this".

### What "crop to the owner's part" meant here

A mockup PSD sits in an awkward middle: it is licensed for exactly this use, and the design
applied to it is the owner's. It is still not the owner's photograph. Rather than decide
that question site-wide, SESSION-020 sidestepped it — AFONO's `[ tee — front ]` and
`[ tee — back print ]` slots are filled with **the print artwork itself** rather than with a
render of a tee wearing it.

That is the stricter reading, and it also turned out to be the better figure: the case study
says "a small front mark keeps the garments easy to wear, larger back prints carry the main
visual narrative", and the artwork shows exactly that, at a size where it is legible.

An incidental thumbnail *inside* a screenshot of the owner's own interface — the ~10px
product image in AFONO's order summary — is not covered by this. It is illegible, it is part
of a UI the owner built, and the existing clause about stock inside a mockup already allows
it.