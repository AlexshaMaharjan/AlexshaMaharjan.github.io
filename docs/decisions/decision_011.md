# DECISION-011 — Copy honesty constraint

Status: Active
Date: Recorded in `design-reference/SPEC.md` §12 (brief Part AP)
Scope: All written content

## Context

Design-portfolio copy conventionally inflates: invented metrics ("increased engagement by
40%"), implied clients, sole credit for team work, and generic craft language.

## Decision

None of that. Specifically, from `SPEC.md` §12 and visible throughout the case studies:

- No invented employers, clients, awards, testimonials, metrics or dates.
- Never describe collaborative work as independent — Role/Contribution/Type facts encode
  who worked alone (WikiMind, AFONO) versus with others (Sync FM, Kitchen, Surugami, QIS).
- Collaborators are credited explicitly ("Final rendering by a team member").
- Claims are hedged where evidence is absent ("does not claim a measured improvement").
- No portfolio-speak — no "pixel perfect", no "crafting delightful experiences".
- No lorem ipsum.

## Reasoning

The work is student and personal work presented honestly. The candour is a differentiator,
not a weakness — and inflated claims are easy for an interviewer to puncture.

## Alternatives

Conventional portfolio marketing language. Rejected in the brief.

## Consequences

- Case studies end in reflection and limitation rather than triumph — honest, but it does
  leave the "what happened as a result" question weakly answered (`SUGGESTION-014`).
- Any copy pass (`MILESTONE-004`) must preserve every factual claim exactly. "Make it more
  compelling" must never become "make it less true".
- The AI-use disclosure on the About page follows the same principle.

## Relevant Files

All six `src/lib/caseStudies/*.ts`, `src/lib/dictionaries/{en,de}.ts` (`about.aiBody`),
`design-reference/SPEC.md` §12

## Related Issues / Milestones

`MILESTONE-004`, `SUGGESTION-005`, `SUGGESTION-014`
