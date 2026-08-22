# ISSUE-024 — Case-study section model cannot express sub-headings or lists

Status: Open
Priority: High
Category: Content architecture / UI/UX
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

## Summary

`CaseStudySection.body` is a flat `string[]` rendered as identical paragraphs. Where the
writing needs a sub-heading or a bullet list, those have been written as ordinary strings
— so they render as full-size body paragraphs, and long sections read as an undifferentiated
wall of text.

## Evidence / Current Behavior

`src/lib/caseStudies/types.ts:23` — `body?: string[]`.
`src/components/case-study/Section.tsx:15-24` — every entry becomes
`<p class="text-[18px] leading-[1.65]">`.

`src/lib/caseStudies/wikimind.ts`, section `direction` (lines 95-107) is a clear case —
13 array entries, of which:

- 5 are one-line list items ("Trust through transparent communication", "Accessibility
  through friendly visuals and plain language", …) that were plainly meant as a list;
- 4 are sub-headings ("A light and structured visual language", "A symbol for connected
  knowledge", "A controlled human element") that render at body size with no emphasis;
- the rest are real paragraphs.

`qis-portal.ts` (388 lines) and `barrier-free-kitchen.ts` (350 lines) have the same shape.
`research` sections carry a stray sub-heading mid-array too ("Translating the audience
into design needs", `wikimind.ts:50`).

This is the single biggest reason the case-study pages read as dense and academic — the
owner's stated concern about layout and "redundant text".

## Expected Behavior

The content model can express: paragraph, sub-heading, list, callout, figure with caption
— and the template gives each its own typographic treatment.

## Relevant Files

- `src/lib/caseStudies/types.ts`, `src/components/case-study/Section.tsx`
- All six `src/lib/caseStudies/*.ts` (both locales)
- `CONTENT_GUIDE.md` §5 (mirrors every one of these strings and will need updating)

## Possible Cause

The `.dc.html` reference expressed these distinctions with per-element inline styles; the
port flattened them into a single `body[]` array.

## Possible Solution

Introduce a discriminated union block type, e.g.
`{ kind: "p" | "h3" | "list" | "quote", ... }`, keeping `string[]` accepted as shorthand
for paragraphs so migration can be incremental per case study. Then re-cut each section's
content into the new shape as part of the copy pass.

Migrating the data is the bulk of the work: ~580 content fields across six files × two
locales. Do English first (`MILESTONE-004`), German after (`MILESTONE-009`).

## Dependencies

Prerequisite for a meaningful case-study redesign (`MILESTONE-003`) and for the copy pass
(`MILESTONE-004`).

## Related

`ARCH-02`, `MILESTONE-003`, `MILESTONE-004`, `SUGGESTION-003`, `SUGGESTION-004`, `SUGGESTION-005`.
