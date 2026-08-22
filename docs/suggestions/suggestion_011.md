# SUGGESTION-011 — Accessibility pass to WCAG 2.2 AA

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

## Problem / Opportunity

`design-reference/SPEC.md` §11 names WCAG 2.2 AA as non-negotiable, and the foundations
are genuinely good: global `:focus-visible`, `aria-current` on the mode switch,
`aria-expanded` on the menu, `role="img"` + label on every placeholder, an `sr-only`
process summary, and a thorough reduced-motion story. What is missing is verification and
a handful of specific gaps.

## Recommendation

1. **Marquee control.** `CategoryMarquee` auto-scrolls indefinitely and pauses only on
   hover — WCAG 2.2.2 requires a pause mechanism reachable by keyboard.
2. **Alt text.** Three heroes announce "Placeholder: …" today (`ISSUE-006`); the ~115
   caption-only slots announce "Placeholder: <caption>" by design — reasonable while assets
   are missing, but revisit as real images land.
3. **Heading order.** Verify no page skips a level, especially `PlaygroundIndex` (h1 → h2
   → h3 across marquees) and case studies (`Section` emits h2, insights emit h3).
4. **Contrast.** Check `ink-muted #858A92` on `page #F8F9FB` (likely below 4.5:1 for the
   monospace captions used throughout) and `#6C7078` on `near-black #0A0A0A` in
   `ContactSection`.
5. **Touch targets.** Mode switch and menu are 44px; the language pill (`py-2`, ~34px) and
   the footer back-to-top button are smaller.
6. **Keyboard path through the process canvas.** The branch buttons are focusable but the
   canvas only becomes interactive past 90% scroll progress — verify a keyboard user can
   reach and operate them at all.
7. Run axe/Lighthouse on every route and record results.

## Why

It is stated as a project requirement, and for a design portfolio it is also part of the
work being demonstrated.

## Relevant Files

- `src/components/playground/CategoryMarquee.tsx`, `src/components/LanguageSwitch.tsx`,
  `src/components/Footer.tsx`, `src/components/process/HeroProcess.tsx`,
  `src/components/PlaceholderImage.tsx`, `tailwind.config.ts`

## Dependencies

Best after the layout milestones; contrast decisions may change tokens
(`SUGGESTION-009`).

## Risks

Contrast fixes can alter the intended restraint of the palette — resolve with the owner
rather than unilaterally darkening greys.

## Related Issues

`ISSUE-006`, `ISSUE-016`, `ISSUE-023`.

## Possible Milestone

`MILESTONE-007`.
