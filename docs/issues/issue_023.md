# ISSUE-023 — Type scale and colour tokens are bypassed, producing visual drift

Status: Open
Priority: Medium
Category: UI/UX / Consistency
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`tailwind.config.ts` defines a considered type scale and colour palette, but components
almost never use them — headings are written as ad-hoc inline `clamp()` values and card
borders as raw hex. The result is many near-but-not-quite-identical sizes across pages,
which reads as inconsistency rather than intent.

## Evidence / Current Behavior

Named sizes defined and their actual usage (grep across `src/`):

| Token | Uses |
| --- | --- |
| `text-hero`, `text-section`, `text-case-title`, `text-case-heading`, `text-project-title`, `text-subheading`, `text-body-lg`, `text-body`, `text-meta`, `text-caption` | **0** |

What is written instead — five different "page h1" clamps:

- `SelectedWork.tsx:14` — `clamp(2.125rem,4.6vw,4.25rem)`
- `About.tsx:26` — `clamp(2.5rem,5.4vw,5.25rem)`
- `CaseStudyHero.tsx:33` — `clamp(2.75rem,5.8vw,5.375rem)`
- `CategoryPage.tsx:31` / `ProjectPage.tsx:29` — `clamp(2.375rem,4.6vw,4.25rem)`
- `PlaygroundIndex.tsx:24` — `clamp(2.5rem,5.4vw,5rem)`

Similarly `border-[#E4E7EE]` appears in ~15 places while a `border` token (`#D7DAE0`)
exists; `#8FA6FF`, `#A7ACB4`, `#6C7078`, `#C9CEDB`, `#4E6087`, `#E6E7E9` are all raw.
`.container-page` is defined in `index.css` and used **zero** times, while
`mx-auto max-w-[1440px] px-5 md:px-20` is hand-written ~20 times.

## Expected Behavior

One scale, one palette, one container — differences between pages should be deliberate.

## Relevant Files

- `tailwind.config.ts`, `src/index.css`, and essentially every component

## Possible Cause

The port followed the `.dc.html` reference literally, transcribing each file's inline CSS
rather than reconciling them into a system afterwards.

## Possible Solution

Reconcile the five clamps into 2–3 named roles, extend `theme.colors` with the raw hexes
that earn a name, adopt `.container-page` everywhere, then sweep components. Best done as
one deliberate pass rather than opportunistically — see `SUGGESTION-009`.

## Dependencies

Do it after the layout work in `MILESTONE-002`/`003`, or those pages will need sweeping
twice.

## Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-009`.
