# DECISION-006 — The hatched placeholder is a design element, not just a missing asset

Status: **Superseded in practice** — the owner's answer, 2026-08-24: almost every
placeholder is meant to become a real image
Date: Inherited from the design reference; answered 2026-08-24 (SESSION-008)
Scope: Visual language

## Owner's answer (2026-08-24)

> "almost all placeholders are images"

So the hatched box is a **fallback**, not a destination. It stays in the code because it is
what renders until a file exists — and it is still the right treatment for a slot with no
asset — but no slot is planned to keep it permanently. The open question below is
answered: every image slot on the site should end up carrying a real image.

The consequence for the code is that the remaining 44 slots need a source field, which is
the rest of `ISSUE-007` and was blocked on exactly this.

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
- ~~The types were built around it and carry no `src` field at all~~ — **fixed for case
  studies in SESSION-003**: `SectionImage` takes an optional `src`/`alt` and the hatched
  box is now the *fallback* rather than the only option (`ISSUE-007`). `PlaygroundItem`
  and `about.carouselItems[]` still carry no source field.
- `DECISION-014` adds one rule on top: a caption is rendered only where a real image
  exists. A placeholder keeps its `[ bracketed label ]` inside the box and gets no
  caption underneath, so the bracket stays the visible signal that no asset exists yet.

## ~~Open question for the owner~~ — answered

~~Which slots keep the placeholder aesthetic permanently and which must become real
photographs?~~ **Answered 2026-08-24: almost all of them are images.** The 44 remaining
slots got their source fields in SESSION-008, which closes `ISSUE-007`.

## Relevant Files

`src/components/PlaceholderImage.tsx`, `src/components/case-study/Section.tsx`,
`src/components/playground/*`

## Related Issues / Milestones

`ISSUE-007`, `MILESTONE-005`, `SUGGESTION-002`
