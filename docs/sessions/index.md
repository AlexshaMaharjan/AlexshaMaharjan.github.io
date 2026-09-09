# Sessions Index

One document per working session. Chronological; IDs are permanent.

| ID | Date | Milestone | Objective | Status | File |
| --- | --- | --- | --- | --- | --- |
| SESSION-001 | 2026-08-22 | — (initialization) | Full repository analysis; establish the `docs/` system | Complete | `session_001.md` |
| SESSION-002 | 2026-08-22 | MILESTONE-001 | Fix the three navigation defects; clean the repository | Complete | `session_002.md` |
| SESSION-003 | 2026-08-23 | MILESTONE-003 | Case-study content model: blocks instead of `string[]`, all six studies migrated | Complete | `session_003.md` |
| SESSION-004 | 2026-08-23 | MILESTONE-003 | Case-study layout: measure, media widths, set pieces, reading progress, closing band | Complete | `session_004.md` |
| SESSION-005 | 2026-08-23 | MILESTONE-007 | Anchor offset matched to the real header; footer overflow; ISSUE-027 diagnosed, not fixed | Complete | `session_005.md` |
| SESSION-006 | 2026-08-23 | MILESTONE-007 | Design-system consolidation: one type scale, three colour tokens, one container | Complete | `session_006.md` |
| SESSION-007 | 2026-08-24 | MILESTONE-007 | The header at every width: the centred switch, and German headings that overflowed | Complete | `session_007.md` |
| SESSION-008 | 2026-08-24 | MILESTONE-002 / 005 | The owner's three decisions, acted on: bilingual image-ready bento, every slot fillable from data, image manifest | Complete | `session_008.md` |
| SESSION-009 | 2026-08-24 | MILESTONE-007 | Accessibility: contrast, three keyboard defects, marquee pause control; axe-core clean | Complete | `session_009.md` |
| SESSION-010 | 2026-08-24 | MILESTONE-008 | Per-route metadata: no more leaking, and each route's head prerendered for scrapers | Complete | `session_010.md` |
| SESSION-011 | 2026-08-24 | MILESTONE-006 | Motion: one vocabulary, reveal variants, page transitions, a loading state, and the canvas loop finally idling | Complete | `session_011.md` |
| SESSION-012 | 2026-08-25 | MILESTONE-006 | Scroll-linked: hero drift, figure reveals, velocity-linked marquees — closing the milestone | Complete | `session_012.md` |
| SESSION-013 | 2026-08-25 | MILESTONE-008 | Case-study chunk split per slug, hreflang alternates, GSAP decided — closing the milestone | Complete | `session_013.md` |
| SESSION-014 | 2026-08-25 | MILESTONE-007 / 008 | The last two defects closed, and a deploy pre-flight written down | Complete | `session_014.md` |
| SESSION-015 | 2026-08-25 | MILESTONE-005 / 002 | The project documentations mapped to the image slots; provenance rule recorded | Complete | `session_015.md` |
| SESSION-016 | 2026-08-25 | MILESTONE-005 / 002 | The first eighteen image slots filled from the documentations, with a contrast-enforcing treatment tool | Complete | `session_016.md` |
| SESSION-017 | 2026-08-25 | MILESTONE-003 / 007 | Case studies open with the contents rail; title inside Overview; facts shortened, year removed | Complete | `session_017.md` |
| SESSION-018 | 2026-08-25 | MILESTONE-003 | One width down the case-study column: text runs to the media edge | Complete | `session_018.md` |
| SESSION-019 | 2026-08-25 | MILESTONE-005 / SUGGESTION-012 | Responsive image pipeline with no new dependency; WikiMind's twelve section figures | Complete | `session_019.md` |
| SESSION-020 | 2026-08-25 | MILESTONE-005 | AFONO's twelve section figures; AFONO's sources page re-read and DECISION-016 amended; contact-sheet tooling | Complete | `session_020.md` |
| SESSION-021 | 2026-08-26 | Sync FM's figures (6 of 11, 4 hatched with reasons); DECISION-016 Amendment 2; the verification harness moves into the repository | `session_021.md` |
| SESSION-022 | 2026-09-03 | WikiMind re-shot from owner-supplied originals — 14 figures at their true aspect ratios, 2 new slots, 1 previously hatched slot filled; ISSUE-032 | `session_022.md` |
| SESSION-023 | 2026-09-04 | Figures move inline to their prose (`figures` block); SUGGESTION-017 implemented; full-screen figure viewer for mobile legibility (DECISION-018); ISSUE-033 | `session_023.md` |
| SESSION-024 | 2026-09-04 | Surugami built entirely from supplied exports — 8 figures plus a new hero, 3 slots deliberately hatched; ISSUE-034 | `session_024.md` |
| SESSION-025 | 2026-09-04 | No images to place: ISSUE-009 (German landmarks axe cannot see) and ISSUE-010 closed, MILESTONE-002 complete, `!important` removed, doc accuracy pass | `session_025.md` |
| SESSION-026 | 2026-09-04 | AFONO and Sync FM re-shot from supplied folders — 12 PDF crops superseded, 9 new slots, Sync FM's three persona slots merged into the one board that exists; ISSUE-035 | `session_026.md` |
| SESSION-027 | 2026-09-04 | DECISION-019: figures sized by height and rows justified, superseding SUGGESTION-017; AFONO's 22 figures moved into the prose | `session_027.md` |
| SESSION-028 | 2026-09-08 | Five bento tiles re-cut from supplied exports; measuring disproved the hand-off's premise that Surugami's two could be — a composite board holds fewer pixels per element than a page render | `session_028.md` |
| SESSION-029 | 2026-09-08 | Every supplied image placed (AFONO 23 → 30 slots); 25 orphaned originals deleted, 1.4 MB; found and fixed ISSUE-036, a German list I shipped on the English page in SESSION-027, and added `content-audit.mjs` | `session_029.md` |
| SESSION-030 | 2026-09-09 | Kitchen and QIS folders placed — all six case studies now on the owner's own images, 155 slots / 94 filled; bento tiles washed pale with ink text (DECISION-020); ProjectsDokus git-ignored; EXIF-rotation trap caught | `session_030.md` |

## Conventions

- A session file is written **at the end** of the session it describes.
- Summarize; never paste diffs. Reference source files by path.
- After archiving, rewrite `docs/previous_session.md` to point at the new entry, and
  rewrite `docs/next_session.md` for the next objective.
- A rework of an earlier session gets its **own** new session ID — it does not edit the
  original.
