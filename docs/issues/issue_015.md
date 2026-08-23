# ISSUE-015 — Anchor scroll offset does not match the taller mobile header

Status: **Resolved** (SESSION-005, `f32a45e`)
Priority: Low
Category: UI/UX
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-005)
Last reviewed: 2026-08-23

## Summary

`section { scroll-margin-top: 104px }` is tuned to the 72px desktop header. Below 480px
the header gains a second row containing the mode switch, making it roughly 117px tall, so
anchored sections land partly underneath it.

## Evidence / Current Behavior

- `src/index.css:47-49` — `section { scroll-margin-top: 104px }`.
- `src/components/Header.tsx:47` — first row is `h-[72px]`.
- `src/components/Header.tsx:88-92` — an additional `sm:hidden` row with `py-2.5`
  wrapping a `min-h-[44px]` `ModeSwitch`, i.e. ~44 + 20 = ~64px more, only below `sm`
  (480px).
- `src/components/case-study/ContentsNav.tsx:16` also assumes 104px (`sticky top-[104px]`).

~~**Needs verification** in a browser at <480px~~ — **measured in SESSION-002** and
confirmed, while verifying `ISSUE-002`:

| Viewport | Header height | Section top after an anchor jump | Overlap |
| --- | --- | --- | --- |
| 1440px | 73px | 104px | none |
| 390px | **146px** | 104px | **42px hidden behind the header** |

So the effect is real, and the header is taller than the ~117px estimated from the class
values. It is also *wider* than the `<480px` this file assumed — the second row is
`sm:hidden`, so every width below 480px is affected, and the 390px measurement above is
representative.

Left unfixed deliberately: `MILESTONE-001` was navigation repair only and explicitly
excluded the design system. The fix belongs with `MILESTONE-007`, which owns this issue.

## Resolution

The header measures itself — `Math.round(getBoundingClientRect().height)` in a layout
effect, re-run by a `ResizeObserver` — and publishes `--header-h` on the document element.
`index.css` derives `--anchor-offset: calc(var(--header-h) + 31px)` from it, and both
`section { scroll-margin-top }` and the case-study contents rail read that. The CSS also
declares per-breakpoint fallbacks (146px below 480px, 73px above) for the moment before
the measurement runs.

Measured rather than written down a second time on purpose: a written-down number is
exactly what drifted here, and the estimate in this file (~117px) was itself wrong by 29px.

Verified in Chrome against the production build, on a case study and on the homepage's
`#work` / `#contact`:

| Viewport | Header | Section top | Clearance |
| --- | --- | --- | --- |
| 320 / 375 / 390 / 479px | 146px | 177px | **31px** |
| 480 / 768 / 1024 / 1440px | 73px | 104px | **31px** |

The desktop offset is unchanged at 104px, so nothing above 480px moved. Every SESSION-002
navigation journey was re-run at both widths with motion on and off, plus contents-rail
clicks, and all land with the same 31px clearance.

## Expected Behavior

An anchored section's heading is fully visible below the header at every width.

## Relevant Files

- `src/index.css`, `src/components/Header.tsx`, `src/components/case-study/ContentsNav.tsx`

## Possible Cause

A single fixed offset for a header whose height is responsive.

## Possible Solution

Publish the header height as a CSS variable (`--header-h`) set per breakpoint, and use
`calc(var(--header-h) + 32px)` for both `scroll-margin-top` and the sticky rail offset.

## Dependencies

Should be verified after `ISSUE-002` lands, since that is what makes anchor scrolling work
cross-route in the first place.

## Related

`ARCH-03`, `ISSUE-002`, `MILESTONE-007`.
