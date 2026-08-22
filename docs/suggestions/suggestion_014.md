# SUGGESTION-014 — Strengthen the portfolio narrative

Status: Proposed
Priority: Medium
Impact: High
Effort: Medium

## Problem / Opportunity

Judged as a portfolio rather than as code, the site answers some questions well and others
not at all.

**Answered well:** who she is and where she's from (hero, About, the hand-drawn
annotations); how she works (the process canvas is genuinely distinctive); breadth
(Playground); background (a real, detailed résumé); honesty (explicit collaborator credits
and an unusually candid AI-use statement).

**Answered weakly:**

- **What happened as a result.** Every case study ends in reflection and limitation. The
  honesty constraint (`DECISION-011`) rightly forbids invented metrics — but qualitative
  outcomes ("the tutor group chose this direction", "the prototype was tested with six
  people") are both true and currently absent.
- **What she wants next.** "Available for design opportunities" is the only signal. No
  statement of the kind of role, no availability date, no location preference.
- **The contact path.** One `mailto:` and a LinkedIn link. No form, no PDF résumé
  download (only `window.print()`), no scheduling link.
- **There is no `/work` index.** "Projects" points at a homepage anchor; there is no page
  listing all six with filtering.
- **Playground vs Portfolio.** The mode switch is distinctive but a first-time visitor is
  not told what "Playground" means before clicking.

## Recommendation

Add an outcome line to each case study; make the contact section state what she is looking
for; offer a downloadable PDF résumé; build a real `/work` index page; add one sentence
of orientation to the mode switch or hero.

## Why

The site currently presents work. It does not quite ask for anything.

## Relevant Files

- `src/components/ContactSection.tsx`, `src/pages/Resume.tsx`, `src/routes.tsx`,
  all six `src/lib/caseStudies/*.ts` (an `outcome` section already exists in most)

## Dependencies

Needs owner input for every factual claim — this is content, not code.

## Risks

The honesty constraint is a real asset; do not let "stronger outcomes" become invented
ones.

## Related Issues

`ISSUE-024`.

## Possible Milestone

`MILESTONE-004`.
