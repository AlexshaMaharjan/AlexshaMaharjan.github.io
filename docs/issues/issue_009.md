# ISSUE-009 — German dictionary has untranslated and missing fields

Status: Open
Priority: Medium
Category: Content / i18n
Discovered: 2026-08-22 (partly flagged in `ROADMAP.md`)
Last reviewed: 2026-08-22

## Summary

Four known gaps in the German content: two visible hand-written annotations on the About
page are still English, one aria-label is untranslated, and AFONO's hero disclosure line
exists only in English.

## Evidence / Current Behavior

| Field | Current DE value | Visible? |
| --- | --- | --- |
| `de.about.handNoteOrigin` (`de.ts:320`) | `"Nepal → Germany"` | **Yes** — Caveat annotation over the portrait |
| `de.about.handNoteMaking` (`de.ts:321`) | `"always making something!"` | **Yes** — second annotation |
| `de.nav.switchToGerman` (`de.ts:18`) | `"Switch to German"` | No — dead in the DE branch, `LanguageSwitch` only reads `switchToEnglish` when locale is `de` |
| `afono.de.heroDisclosure` | **absent** (only `afono.ts:11`, the EN block, defines it) | Yes — the EN page shows a disclosure line the DE page silently drops |

Also, per `CONTENT_GUIDE.md` §11, the decorative labels inside
`src/components/process/clusters.tsx` are hard-coded English on both locales, and all
structural `aria-label`s ("Primary", "Footer", "Project navigation", …) are English-only.

## Expected Behavior

German visitors see German text everywhere visible text appears.

## Relevant Files

- `src/lib/dictionaries/de.ts`
- `src/lib/caseStudies/afono.ts`
- `src/components/process/clusters.tsx`
- `src/components/about/LoveLine.tsx` call site in `src/pages/About.tsx`

## Possible Cause

Incremental translation; `heroDisclosure` is optional in the type so its absence is not a
compile error.

## Possible Solution

Fix the four fields directly. For `clusters.tsx`, decide whether the decorative collage
labels should be translated at all (they are tiny, illustrative, and arguably part of the
artwork) — record the choice as a decision either way.

## Dependencies

Belongs to the German pass; the owner's roadmap puts German after English is final.

## Related

`ARCH-02`, `MILESTONE-009`, `ROADMAP.md` Phase 4.
