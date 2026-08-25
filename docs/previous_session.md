# Previous Session

**SESSION-015** — 2026-08-25 — `MILESTONE-005` / `MILESTONE-002` — Complete
Full record: `docs/sessions/session_015.md`. Documentation and one script; no application
code changed.

## What changed

**The largest recorded blocker in this project was wrong.** `MILESTONE-005` said "blocked on
owner-supplied assets — the largest external dependency in the roadmap", and
`current_state.md` repeated it in three places. The assets exist: six project documentations,
330 pages, in `../../ProjectsDokus/` beside the repository. They are the documents the six
case studies were written from, so they contain the personas, sitemaps, wireframes and final
screens the manifest is asking for.

**`docs/reference/image_sources.md`** is the plan: which document belongs to which project,
how to render a page out of one, what may not be taken, the order to work in, and the
treatment the eleven bento tiles need.

**`DECISION-016` — only work the owner made ships.** Surugami's documentation credits Freepik
photographs and states that five of its pages come from Pinterest. An academic submission may
quote its references; a portfolio showing the same image beside "I designed this" is making a
different claim. This is `DECISION-011` applied to images.

**`scripts/pdf-page.js`** renders PDF pages to PNG through macOS PDFKit via the ObjC bridge —
no install, no dependency. It renders whole pages rather than bulk-extracting embedded
images, deliberately: a bulk extractor would pull the borrowed images out with the owner's
and lose the distinction `DECISION-016` turns on.

**A seventh project surfaced.** Hibi has two full documentations and no page on the site.
That is an owner decision, recorded as one.

## What this constrains

- **Read a document's sources page before exporting anything from it.** Every one of the six
  has one. This is `DECISION-016` and it is the reason extraction is manual.
- **Position in a PDF is not the printed page number.** `FInalDesmeth.pdf` puts Sources at
  position 1; position 60 carries printed page 58.
- **Build the responsive image pipeline (`SUGGESTION-012`) before the bulk import**, not
  after. 129 full-size PNGs in `public/images/` would be the largest performance regression
  this project could hand itself.
- The eleven bento tiles have a measured contrast ceiling — `#80` or darker behind the white
  label and title. Most of this source material is light-background UI work, so exports will
  need grading before they pass.

## What did not change

No images extracted, cropped or committed. Nothing pushed, nothing deployed. No application
code, so the verification battery was not re-run — it was last green in SESSION-014.
