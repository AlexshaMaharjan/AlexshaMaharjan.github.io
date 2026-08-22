# SUGGESTION-005 — Editorial pass: humanise the copy and cut redundancy

Status: Proposed
Priority: High
Impact: High
Effort: Large

## Problem / Opportunity

The owner's stated concern: the writing should read as a person talking about their work,
not as a coursework report — and repetitive or unnecessary passages should go.

The current copy is honest and detailed but written in a uniformly formal, passive,
academic register. Examples from `src/lib/caseStudies/wikimind.ts`:

- "I conducted a qualitative visual and structural analysis of existing AI and technology
  websites."
- "The analysis revealed a common tension."
- Section `overview` and section `challenge` both explain that AI websites feel technical
  and inaccessible — the same point made twice in consecutive sections.

Sentence length is very even, which flattens emphasis. There is little first-person
narrative and almost no concrete detail (what was actually said in an interview, what
specifically broke).

## Recommendation

A per-case-study editing pass, in this order: WikiMind → AFONO → Sync FM →
Barrier-Free Kitchen → Surugami → QIS Portal (highest-visibility first, matching
`ROADMAP.md` Phase 1). For each:

1. Cut duplicated argument across `overview` / `challenge` / `research`.
2. Vary sentence length; lead sections with a short, concrete sentence.
3. Move from "an analysis was conducted" to "I compared eleven AI websites and found…".
4. Keep the honesty constraint absolutely (`DECISION-011`): no invented metrics, no
   inflated claims, collaborators still credited.
5. Restructure into the new block model as you go (`SUGGESTION-004`).

Then the same treatment for the About page and Playground blurbs.

## Why

Copy quality is what separates a portfolio that gets read from one that gets skimmed —
and the owner has asked for it directly.

## Relevant Files

- All six `src/lib/caseStudies/*.ts` (EN blocks first)
- `src/lib/dictionaries/en.ts` (`about`, `hero`, `selectedWork`, `contact`)
- `src/lib/playground/home.ts`, `categories/*.ts`
- `CONTENT_GUIDE.md` — the field-by-field map; regenerate afterwards

## Dependencies

`SUGGESTION-004` ideally lands first. German follows in `MILESTONE-009`.

## Risks

Editing can quietly change claims. Every factual statement must survive the pass intact —
`ROADMAP.md` Phase 1 sets the right process: ask the owner what actually happened, draft
from real answers, let them react.

## Related Issues

`ISSUE-024`, `ISSUE-009`.

## Possible Milestone

`MILESTONE-004`.
