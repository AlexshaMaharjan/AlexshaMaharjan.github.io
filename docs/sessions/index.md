# Sessions Index

One document per working session. Chronological; IDs are permanent.

| ID | Date | Milestone | Objective | Status | File |
| --- | --- | --- | --- | --- | --- |
| SESSION-001 | 2026-08-22 | — (initialization) | Full repository analysis; establish the `docs/` system | Complete | `session_001.md` |
| SESSION-002 | 2026-08-22 | MILESTONE-001 | Fix the three navigation defects; clean the repository | Complete | `session_002.md` |
| SESSION-003 | 2026-08-23 | MILESTONE-003 | Case-study content model: blocks instead of `string[]`, all six studies migrated | Complete | `session_003.md` |
| SESSION-004 | 2026-08-23 | MILESTONE-003 | Case-study layout: measure, media widths, set pieces, reading progress, closing band | Complete | `session_004.md` |
| SESSION-005 | 2026-08-23 | MILESTONE-007 | Anchor offset matched to the real header; footer overflow; ISSUE-027 diagnosed, not fixed | Complete | `session_005.md` |

## Conventions

- A session file is written **at the end** of the session it describes.
- Summarize; never paste diffs. Reference source files by path.
- After archiving, rewrite `docs/previous_session.md` to point at the new entry, and
  rewrite `docs/next_session.md` for the next objective.
- A rework of an earlier session gets its **own** new session ID — it does not edit the
  original.
