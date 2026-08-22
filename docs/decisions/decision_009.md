# DECISION-009 — The coded `.dc.html` designs are authoritative over the prose brief

Status: Active
Date: Recorded in `design-reference/SPEC.md`
Scope: Design fidelity

## Context

Two design sources exist: `design-reference/master-prompt.md` (5095 lines of prose brief)
and 16 `.dc.html` coded reference designs. They disagree in places — most visibly on the
accent colour, where the brief names `#5C6CFF` and every coded file uses `#1B3FE0`.

## Decision

The `.dc.html` files win. `design-reference/SPEC.md` states it in its opening lines:
"treat these as the authoritative visual source; the prose brief is background/intent
only."

## Reasoning

The coded files are what was actually designed against and reviewed; the brief describes
intent that was revised during design.

## Alternatives

Following the brief (would have produced a different accent colour, a persistent mobile
second row, a standalone `/contact` page and a fuller About outline).

## Consequences

- Accent is `#1B3FE0`, focus `#1233C4`.
- `/contact` is a redirect to a homepage anchor rather than a page (`ISSUE-022`).
- The About page has four sections, not the brief's seven.
- **`design-reference/` is gitignored** — the authoritative source exists only on this
  machine and is not backed up by the repository. Key values are mirrored into
  `docs/reference/design_tokens.md` as insurance.

## Deliberate departures so far

None recorded. If a milestone knowingly diverges from the reference — and
`SUGGESTION-003` proposes exactly that for case studies — record it as a new decision.

## Relevant Files

`design-reference/SPEC.md`, `design-reference/master-prompt.md`,
`design-reference/pages/*.dc.html`, `.gitignore`, `docs/reference/design_tokens.md`

## Related Issues / Milestones

`ISSUE-022`, `MILESTONE-003`
