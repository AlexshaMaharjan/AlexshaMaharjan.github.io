# Milestones Index

**Status: proposed roadmap, awaiting owner review.** Nothing here has been started. The
owner may reprioritise or re-scope before development begins.

Ordering rationale: repair what is broken → fix the two worst-reading surfaces (homepage
work section, case studies) → content and imagery → motion → consistency → ship.

| ID | Title | Status | Priority | Depends on | Addresses | File |
| --- | --- | --- | --- | --- | --- | --- |
| MILESTONE-001 | Stabilize the current implementation | Proposed | Critical | — | ISSUE-001/002/003/017/018/022 | `milestone_001.md` |
| MILESTONE-002 | Rebuild homepage "Selected Work" | Proposed | High | M-001, DECISION-010 | ISSUE-004/005 | `milestone_002.md` |
| MILESTONE-003 | Case-study layout and content model | Proposed | High | M-001 | ISSUE-024/008/007 | `milestone_003.md` |
| MILESTONE-004 | English content pass | Proposed | High | M-003, owner | ISSUE-024 | `milestone_004.md` |
| MILESTONE-005 | Real imagery | Proposed | High | owner assets | ISSUE-006/007 | `milestone_005.md` |
| MILESTONE-006 | Motion system and interaction polish | Proposed | Medium | M-001, M-002/003 | ISSUE-012/019/020 | `milestone_006.md` |
| MILESTONE-007 | Consistency, responsive, accessibility | Proposed | Medium | M-002/003/006 | ISSUE-010/011/015/016/021/023 | `milestone_007.md` |
| MILESTONE-008 | Performance, SEO, deployment | Proposed | Medium | content near-final, owner | ISSUE-013/014/019/025 | `milestone_008.md` |
| MILESTONE-009 | German parity | Proposed | Medium | M-004 | ISSUE-009 | `milestone_009.md` |

## Recommended first milestone

**MILESTONE-001.** It is small, entirely repair, unblocks everything else, and fixes a
critical bug where content is invisible on a navigation path visitors will actually take.
It also gets a session's worth of uncommitted work safely committed before any redesign
touches it.

## How the owner's stated priorities map

| Owner's words | Milestone |
| --- | --- |
| "case study description pages layout should be improved" | M-003 |
| "in all the placeholder, the images must be correct" | M-005 (model work starts in M-003) |
| "content of the text must be humanized … redundant text removed" | M-004 |
| "interactive animations, scroll animations, gsap animation" | M-006 |
| "design should be consistent overall" | M-007 (and M-002 for the homepage) |

## Blocked on the owner

- `DECISION-010` — keep the bento grid direction? (blocks M-002)
- `DECISION-006` — which placeholders stay stylised? (affects M-005)
- `DECISION-012` — which host and domain? (blocks M-008)
- Real image exports (blocks M-005)
- Participation in the content pass (blocks M-004)
