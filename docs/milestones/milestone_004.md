# MILESTONE-004 — English content pass

Status: Proposed
Priority: High
Goal: Make the writing sound like a person talking about their work — and remove what does
not earn its place.

## Why This Milestone Exists

The owner's third stated priority: humanised, well-written text with redundancy removed.
The current copy is honest and thorough but uniformly formal and passive, with real
duplication — WikiMind's `overview` and `challenge` sections make the same argument twice
in a row. Sentence length barely varies, which flattens emphasis across nine sections.

`ROADMAP.md` Phase 1 already sets the right process and order.

## Scope

English prose across case studies, About, Playground and homepage. German follows in
`MILESTONE-009`.

## Tasks

Per `ROADMAP.md` Phase 1 order, one at a time, asking the owner what actually happened and
drafting from their answers:

- [ ] Home — hero heading + intro
- [ ] About — biography, focus, tools, AI blurb
- [ ] Case study: WikiMind
- [ ] Case study: AFONO
- [ ] Case study: Sync FM
- [ ] Case study: Barrier-Free Kitchen
- [ ] Case study: Surugami
- [ ] Case study: QIS Portal
- [ ] Playground — home intro + six category blurbs

For each: cut duplicated argument across sections; vary sentence length; lead with
something concrete; move from "an analysis was conducted" to "I compared eleven sites and
found…"; restructure into the block model from `MILESTONE-003`.

- [ ] **SUGGESTION-014** — add a real outcome line to each case study, state what she is
      looking for in the contact section
- [ ] Update `CONTENT_GUIDE.md` to match

## Relevant Issues

`ISSUE-024`

## Relevant Suggestions

`SUGGESTION-005`, `SUGGESTION-014`

## Relevant Decisions

`DECISION-011` — **the honesty constraint is absolute.** Every factual claim must survive
the pass unchanged. "More compelling" must never become "less true".

## Relevant Code

- All six `src/lib/caseStudies/*.ts` (EN blocks)
- `src/lib/dictionaries/en.ts`, `src/lib/playground/home.ts`, `categories/*.ts`
- `CONTENT_GUIDE.md`

## Dependencies

`MILESTONE-003` should land first so the writing can use sub-headings and lists.
Requires the owner's participation — this cannot be done alone.

## Completion Criteria

- No two sections make the same point.
- Each case study opens with something concrete and specific.
- Every factual claim traceable to what actually happened; collaborators still credited.
- Owner has read and accepted each page.

## Out of Scope

German (`MILESTONE-009`); résumé copy (already real, per `ROADMAP.md`).

## Notes

Résumé content was completed in an earlier session and should not be rewritten.
