# MILESTONE-005 — Real imagery

Status: **Unblocked, and the files have been located** (2026-08-25) — the mechanism was
finished on 2026-08-24; SESSION-015 found that most of the missing images already exist,
inside the owner's six project documentations. See `docs/reference/image_sources.md`.
Priority: High
Goal: Replace stand-ins and placeholders with the owner's actual work.

## Why This Milestone Exists

The owner's second stated priority: "in all the placeholders, the images must be correct".
Two problems sat behind it — five wired-up files are flat colour blocks, and ~115 further
slots had no way to hold an image at all. The second is fixed; every slot can hold one now.

**This milestone was described for months as "blocked on owner-supplied assets". That was
wrong.** The six case studies were written *from* six project documentations — 330 pages
totalling 673 MB, in `../../ProjectsDokus/` — and those documents contain the personas,
sitemaps, wireframes, logo sheets and final screens the slots are asking for. The blocker was
never the assets. It was that nobody had looked in the documents.

## Scope

The image data model, the asset pipeline, and importing the owner's exports.

## Tasks

Order matters here: the pipeline comes before the import, and the provenance check comes
before every export.

- [x] **SUGGESTION-002 / ISSUE-007** — optional `src`/`alt` on `SectionImage`,
      `PlaygroundItem` and `carouselItems`, with a shared `<Figure>` falling back to
      `PlaceholderImage`. Done in `MILESTONE-003`
- [x] **Locate the source material** — six documentations mapped to six projects, with a
      renderer that needs no dependency (`scripts/pdf-page.js`). SESSION-015
- [ ] **`DECISION-016` on every export** — read the document's sources page first. Surugami's
      cites Freepik and Pinterest for five pages; those may not ship
- [x] **SUGGESTION-012** — the responsive pipeline is in (SESSION-019), and **without**
      moving anything out of `public/images/`: `scripts/image-variants.mjs` writes width
      variants beside the originals and `ui/Image` builds the `srcset` from a generated map.
      No new dependency. `predeploy` refuses to build on a stale map
- [x] **The eleven bento tiles and the six case-study heroes** — filled from the
      documentations in SESSION-016, plus six `projects[].image` prev/next cards that turned
      out to be live. 18 of 136 slots, up from 7
- [ ] **ISSUE-006** — a real `og:image`. **Not a crop**: a designed 1200×630 card. Highest visible return of
      anything in this milestone: every shared link is a blank rectangle until it exists
- [ ] **The eleven bento tiles** (`MILESTONE-002`) — covers, not evidence, and the only slots
      needing the darken-and-tint treatment. The contrast ceiling is measured and recorded in
      `image_sources.md`: `#80` or darker behind the label and title, or white text fails
      WCAG 1.4.3 on the owner's own homepage
- [ ] **Decide whether Hibi becomes a seventh case study** — two documentations exist for a
      project that has no page. Owner's call; not a gap to fill quietly
- [x] Fix the three alt strings that literally say "Placeholder: …" — gone (SESSION-016);
      86 images across 24 route/locale pairs carry real alt text in both locales
- [ ] About portrait — a real photograph
- [ ] Case-study section figures — **12 of 71 done** (WikiMind, SESSION-019). Three of its
      slots are deliberate placeholders: two have no such figure in the documentation, and
      the moodboard is stock photography (`DECISION-016`)
- [ ] About carousel — 8 photos
- [ ] **DECISION-006** — decide with the owner which Playground slots (36) keep the
      stylised placeholder permanently and which become photographs
- [ ] Resolve the **14** now-unused files in `public/images/` — 811 KB that would ship. The
      count went up, not down: replacing the old heroes orphaned five more
- [x] Give `CaseStudyHero` `priority` so the LCP image is not lazy-loaded (2026-08-25)
- [ ] A real `og:image`

## Relevant Issues

`ISSUE-006`, `ISSUE-007`

## Relevant Suggestions

`SUGGESTION-002`, `SUGGESTION-012`

## Relevant Decisions

`DECISION-005`, `DECISION-006`

## Relevant Code

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/ui/Image.tsx`, `src/components/PlaceholderImage.tsx`
- `public/images/` + `MANIFEST.md`, `vite.config.ts`
- `CONTENT_GUIDE.md` §10

## Dependencies

**No longer blocked on the owner producing assets.** The dependency is now the owner's time
and judgement — which figure best represents a section, what may be shown, and whether Hibi
joins the site — rather than material that does not exist. `ROADMAP.md` Phase 2 describes
the hand-off as it was understood before the documentations were found.

`SUGGESTION-012` (the responsive image pipeline) is a genuine ordering dependency: it should
land **before** the bulk import, not after 129 full-size PNGs are already in `public/images/`.

## Completion Criteria

- Every wired-up slot shows real work, and every shipped image is the owner's own
  (`DECISION-016`).
- Every remaining placeholder is a deliberate, recorded choice.
- Images are served in modern formats at sensible sizes; no layout shift.
- `MANIFEST.md` updated to reflect reality.

## Out of Scope

Copy, layout, motion.

## Notes

Can proceed incrementally — each delivered image is an immediate visible improvement, and the
hatched placeholder is a designed state (`DECISION-006`), so a half-filled page is
presentable rather than broken.

Work **one project end to end**, not one figure type across six. The documentation is open in
front of you either way, and 673 MB of PDF is slow to reopen.

Two of the six have no text layer or are too large for text extraction; `FInalDesmeth.pdf`
is 407 MB of flat page images. `scripts/pdf-page.js` handles both, because it renders rather
than extracts.
