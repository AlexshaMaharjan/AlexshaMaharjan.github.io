# DECISION-006 — The hatched placeholder is a design element, not just a missing asset

Status: Active
Date: Inherited from the design reference
Scope: Visual language

## Context

Over 115 image slots have no photo. Rather than leaving gaps or grey rectangles, every one
renders a 45° hatched box with the correct aspect ratio and a monospace
`[ bracketed caption ]`.

## Decision

Keep `PlaceholderImage` as an intentional part of the visual language, particularly in the
Playground where the taped, rotated, hand-labelled cards read as a working sketchbook.

## Reasoning

`design-reference/SPEC.md` §13 states this directly: "Reuse this as a
`<PlaceholderImage>` component — it's already the intended fallback treatment, not just a
design-tool artifact." `CONTENT_GUIDE.md` §10.4 repeats it for the Playground: "This is a
deliberate visual style choice on this site … as much as it is 'images not supplied yet' —
worth deciding intentionally rather than assuming all 36 need real photos."

## Alternatives

Blur-up placeholders; hiding empty slots entirely (would collapse the layouts and hide the
intended structure).

## Consequences

- The site is presentable even with almost no real imagery.
- But the boundary between "styled choice" and "unfinished" is invisible to a visitor —
  on case studies, 71 hatched boxes read unambiguously as unfinished.
- The types were built around it and carry no `src` field at all, which is now a blocker
  (`ISSUE-007`).

## Open question for the owner

Which slots keep the placeholder aesthetic permanently (probably: some Playground cards)
and which must become real photographs (certainly: all 71 case-study figures)?

## Relevant Files

`src/components/PlaceholderImage.tsx`, `src/components/case-study/Section.tsx`,
`src/components/playground/*`

## Related Issues / Milestones

`ISSUE-007`, `MILESTONE-005`, `SUGGESTION-002`
