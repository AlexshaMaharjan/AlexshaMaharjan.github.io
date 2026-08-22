# MILESTONE-009 — German parity

Status: Proposed
Priority: Medium
Goal: Bring the German site fully level with the English one, once English is final.

## Why This Milestone Exists

`ROADMAP.md` Phase 4 puts German last for a good reason — translating copy that is still
being rewritten doubles the work. But the German site is a first-class part of this
portfolio (the owner lives and is job-hunting in Germany), and it currently has visible
English text on it.

## Scope

Every German string, plus the structural questions the German site raises.

## Tasks

- [ ] **ISSUE-009** — `de.about.handNoteOrigin`, `de.about.handNoteMaking`,
      `de.nav.switchToGerman`, and the missing `afono.de.heroDisclosure`
- [ ] Translate every English change made in `MILESTONE-004`
- [ ] Migrate the German case-study blocks to the new block model if `MILESTONE-003` left
      any behind (the build should have forced this already)
- [ ] Decide whether the decorative labels in `src/components/process/clusters.tsx` should
      be translated at all — record the answer as a decision either way
- [ ] Decide whether structural `aria-label`s ("Primary", "Footer", "Project navigation")
      should be localised
- [ ] Consider a language preference hint: a German visitor landing on `/` currently gets
      English with no signal that `/de` exists
- [ ] Read every German page end to end at both desktop and mobile — German runs longer
      than English and will break tight layouts, especially large headlines
- [ ] Verify `hreflang` from `MILESTONE-008` is correct

## Relevant Issues

`ISSUE-009`

## Relevant Suggestions

`SUGGESTION-005` (the German half)

## Relevant Decisions

`DECISION-002`, `DECISION-011` (the honesty constraint applies to German too)

## Relevant Code

- `src/lib/dictionaries/de.ts`
- The `de` block of all six `src/lib/caseStudies/*.ts`
- `src/lib/playground/**` German blocks
- `src/components/process/clusters.tsx`, `CONTENT_GUIDE.md`

## Dependencies

`MILESTONE-004` must be complete and accepted. Translating before then wastes effort.

## Completion Criteria

- No English text visible anywhere on `/de/*`.
- German copy reads naturally, not as a literal translation.
- No layout breaks from longer German words.
- `CONTENT_GUIDE.md` DE entries match the code.

## Out of Scope

Additional languages.

## Notes

`ROADMAP.md` notes the owner may want a native-speaker sanity check — worth offering, not
strictly required.
