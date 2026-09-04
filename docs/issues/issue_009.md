# ISSUE-009 — German dictionary has untranslated and missing fields

Status: **Resolved** (SESSION-025)
Priority: Medium
Category: Content / i18n
Discovered: 2026-08-22 (partly flagged in `ROADMAP.md`)
Last reviewed: 2026-09-04 (SESSION-025)

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


## Resolved, SESSION-025

**All four listed fields fixed**, and the two questions the file left open turned out to have
different answers from the ones it expected.

| Field | Now |
| --- | --- |
| `de.about.handNoteOrigin` | "Nepal → Deutschland" |
| `de.about.handNoteMaking` | "immer am Gestalten!" |
| `de.nav.switchToGerman` | "Zu Deutsch wechseln" |
| `afono.de.heroDisclosure` | added — a faithful translation of the English disclosure |

Verified in Chrome against the production build: `/de/about` renders both annotations in
German, and `/de/work/afono` shows the disclosure line the German page used to drop silently.

### The `clusters.tsx` question was already answered

This file asked for a decision on whether the process collage's decorative labels should be
translated. **They are already inert.** `BranchGroup.tsx` wraps the whole cluster area in
`aria-hidden="true"` and gives the canvas `dictionary.process.srSummary` as its text
alternative — that was `ISSUE-030`'s fix, and it landed after this issue was written. The
English labels inside are texture on an illustration no screen reader reads, in either locale.
No decision needed; the code comment already states the reasoning.

### The structural `aria-label`s were the real defect

This file listed them as an afterthought. They were the larger half of the problem: six
landmark names were hard-coded English and, unlike the collage labels, they **are** announced.
A German visitor tabbing between regions heard "Primary", "Footer", "Menu", "Category
navigation", "Project navigation" and "My design process" around German content.

They now come from a new `landmarks` group in the dictionary:

| | EN | DE |
| --- | --- | --- |
| `primaryNav` | Primary | Hauptnavigation |
| `menu` | Menu | Menü |
| `footerNav` | Footer | Fußzeile |
| `categoryNav` | Category navigation | Kategorie-Navigation |
| `projectNav` | Project navigation | Projekt-Navigation |
| `processCanvas` | My design process | Mein Designprozess |

Read off the built German pages: `/de` announces Hauptnavigation, Mein Designprozess, Fußzeile;
`/de/work/surugami` announces Hauptnavigation, Auf dieser Seite, Projekt-Navigation, Fußzeile.

**axe does not catch this.** It checks that a landmark has an accessible name, not that the
name is in the page's language — so nothing in the harness would ever have reported it.

### A note on who wrote the German

The four translations are mine, not the owner's. They are translations of copy the owner
already approved in English rather than new prose, which is why they were not held back under
`MILESTONE-004` — but the wording is worth a glance, particularly "immer am Gestalten!", where
a hand-written annotation has more than one idiomatic reading.
