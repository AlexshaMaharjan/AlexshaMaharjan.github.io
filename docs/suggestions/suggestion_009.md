# SUGGESTION-009 — Consolidate the design system

Status: **Mostly implemented** (SESSION-006, `2880697`) — points 1–3 done, point 4 open
Priority: Medium
Impact: High
Effort: Medium

## Problem / Opportunity

The owner wants the design to feel consistent. The tokens for that already exist in
`tailwind.config.ts` but are almost entirely unused; components hand-write near-identical
clamps and raw hex values instead (`ISSUE-023`).

## Recommendation

1. **Type scale.** Reconcile the five page-h1 clamps into 2–3 named roles
   (`text-hero`, `text-case-title`, `text-section`) and apply them. Same for section
   headings and body sizes.
2. **Colour.** Promote the recurring raw hexes that deserve a name — `#E4E7EE` (card
   border, ~15 uses), `#C9CEDB` (dashed border), `#4E6087` (playground ink), `#8FA6FF`
   (on-dark accent), `#A7ACB4` / `#6C7078` (on-dark text) — and replace the literals.
3. **Container.** Adopt the already-defined `.container-page`, or replace it with a
   `<Container>` component; remove the ~20 hand-written repetitions.
4. **Card and pill primitives.** `rounded-full border border-border px-3 py-[6px]` (tag
   pill) and the CTA pill recur in 6+ files — extract them.

Do this as one deliberate sweep, after the layout milestones, so pages are not swept twice.

## What was actually built

Points 1–3, in one sweep as advised, with a before/after screenshot and computed-style
comparison (`ISSUE-023` carries the detail):

1. **Type** — seven named display sizes, derived from the clamps in use rather than from
   the config's unused proposal, applied at 24 call sites. Sizes only; line-height and
   letter-spacing stay on the components for now.
2. **Colour** — `card-border`, `border-muted` and `accent-on-dark` are tokens. The process
   canvas's dark sub-palette was left as it is.
3. **Container** — `.container-page` redefined to what the site actually uses, and adopted
   at all 31 call sites.

**Point 4 — the card and pill primitives — was not done.** `rounded-full border
border-border px-3 py-[6px]` and the CTA pill still recur across six or more files. That is
a component-extraction job rather than a token job, and it wants doing when someone is
already editing those components.

## Why

Consistency here is not cosmetic — it is what makes six differently-built pages read as
one designed site.

## Relevant Files

- `tailwind.config.ts`, `src/index.css`, and most of `src/components/**` + `src/pages/**`

## Dependencies

Sequence after `MILESTONE-002` and `MILESTONE-003`.

## Risks

A large diff touching nearly every file. Do it in one focused session with a screenshot
comparison before and after, not incrementally across several.

## Related Issues

`ISSUE-023`, `ISSUE-011`.

## Possible Milestone

`MILESTONE-007`.
