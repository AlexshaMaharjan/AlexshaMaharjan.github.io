# ISSUE-037 — QIS ships three screenshots of the university's own portal

Status: Open
Priority: Medium
Category: Content / Provenance
Discovered: 2026-09-09 (SESSION-030)
Owner decision: yes — `DECISION-016` is written against exactly this, and this is the one case where it may be wrong

## What

`Images/qis/` supplied three screenshots of the **existing** QIS portal —
`oldinfo.jpg`, `oldlogin.jpg`, `oldprufunganabmeldung.jpg` — and all three are now placed in
§01 Overview as `[ original portal — overview / login / exam registration ]`.

They are TH Lübeck's software, not the team's design. `image_sources.md` has said so since
SESSION-016: *"its 'Originale' screenshots are the university's existing portal, not the team's
design."*

## Why they were placed anyway

`DECISION-016` says competitor screenshots and market analyses stay out. It was written for
AFONO's market analysis and Surugami's Pinterest moodboards — **material used as inspiration,
where showing it borrows someone else's work to make yours look considered.**

This is the opposite case. A redesign case study's subject *is* the existing system. The
screenshots are the evidence for the problem, they are captioned as the original portal in both
locales, and their alt text names them as the existing portal. Nobody reading the page could
take them for the owner's design — the whole section is about why they needed replacing.

Removing them would leave a redesign case study that never shows what was redesigned.

## What is actually at risk

Not misrepresentation — the captions handle that. Two smaller things:

1. **The screenshots contain a real student record.** `oldinfo.jpg` shows a grade overview with
   a name, a matriculation number and module results. It looks like test or demo data
   ("Max Mustermann" appears in the redesigned screens), but **the original screenshots were
   not checked field by field**, and they are the highest-resolution of the three at 1194×834.
   Worth one look before publishing.
2. **Institutional screenshots are the university's.** Reproducing them for critique in a
   student portfolio is ordinary practice; it is still their interface.

## Options

1. **Ship as placed** — captioned as the original portal, which is what they are.
2. **Blur or redact the personal fields** in `oldinfo.jpg` and re-export. One `crop` and a
   `grade` away in `image_crops.json`.
3. **Drop them** and let §01 describe the old portal in prose. The section already does.

Option 2 is the cheapest way to remove the only real risk while keeping the evidence.

## Related

- `DECISION-016` — the rule this tests
- `docs/reference/image_sources.md` — the QIS row, which flagged these screenshots in SESSION-016
