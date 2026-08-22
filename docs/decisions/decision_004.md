# DECISION-004 — Replace, rather than extend, Tailwind's palette and breakpoints

Status: Active
Date: Inherited from the original implementation
Scope: Styling

## Context

The design has a tight, specific palette taken from the coded reference designs, and a
custom `1160px` breakpoint where the header's nav links collapse.

## Decision

`theme.colors` and `theme.screens` are set directly on `theme` (not `theme.extend`),
replacing Tailwind's defaults. 17 named colours; six breakpoints including a custom `nav`.
Type scale, spacing and fonts go in `theme.extend`.

## Reasoning

Replacing the palette makes off-palette colours impossible to write accidentally —
`text-gray-500` simply does not compile. For a design portfolio that discipline is
appropriate.

## Alternatives

Extending (keeps defaults available, weakens the constraint).

## Consequences

- Any new colour must be added to the config — good discipline, but in practice it has
  been circumvented by arbitrary values (`bg-[#E6E7E9]`, `border-[#E4E7EE]`) rather than
  by extending the palette (`ISSUE-023`).
- `theme.screens` is order-sensitive and `nav: 1160px` sits before `lg: 1024px`
  (`ISSUE-011`).

## Relevant Files

`tailwind.config.ts`, `src/index.css`

## Related Issues / Milestones

`ISSUE-011`, `ISSUE-023`, `MILESTONE-007`
