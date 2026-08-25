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

## Conventions

- A session file is written **at the end** of the session it describes.
- Summarize; never paste diffs. Reference source files by path.
- After archiving, rewrite `docs/previous_session.md` to point at the new entry, and
  rewrite `docs/next_session.md` for the next objective.
- A rework of an earlier session gets its **own** new session ID — it does not edit the
  original.
