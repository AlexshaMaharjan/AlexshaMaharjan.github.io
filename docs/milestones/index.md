# Milestones Index

**Status: approved and under way.** `MILESTONE-001` is complete (SESSION-002). The rest of
the roadmap remains as proposed; the owner may still reprioritise or re-scope it.

Ordering rationale: repair what is broken → fix the two worst-reading surfaces (homepage
work section, case studies) → content and imagery → motion → consistency → ship.

| ID | Title | Status | Priority | Depends on | Addresses | File |
| --- | --- | --- | --- | --- | --- | --- |
| MILESTONE-001 | Stabilize the current implementation | **Complete** | Critical | — | ISSUE-001/002/003/017/018/022 — all resolved | `milestone_001.md` |
| MILESTONE-002 | Rebuild homepage "Selected Work" | Proposed | High | M-001, DECISION-010 | ISSUE-004/005 | `milestone_002.md` |
| MILESTONE-003 | Case-study layout and content model | Proposed | High | M-001 | ISSUE-024/008/007 | `milestone_003.md` |
| MILESTONE-004 | English content pass | Proposed | High | M-003, owner | ISSUE-024 | `milestone_004.md` |
| MILESTONE-005 | Real imagery | Proposed | High | owner assets | ISSUE-006/007 | `milestone_005.md` |
| MILESTONE-006 | Motion system and interaction polish | Proposed | Medium | M-001, M-002/003 | ISSUE-012/019/020 | `milestone_006.md` |
| MILESTONE-007 | Consistency, responsive, accessibility | Proposed | Medium | M-002/003/006 | ISSUE-010/011/015/016/021/023 | `milestone_007.md` |
| MILESTONE-008 | Performance, SEO, deployment | Proposed | Medium | content near-final, owner | ISSUE-013/014/019/025 | `milestone_008.md` |
| MILESTONE-009 | German parity | Proposed | Medium | M-004 | ISSUE-009 | `milestone_009.md` |

## Completed

**MILESTONE-001** (SESSION-002). All six issues resolved and verified in a browser against
the production build. Navigation is now correct: reveals re-run on same-route navigation,
every hash link lands on its section from any starting route, route changes start at the
top, and back/forward restores position. See `milestone_001.md` for the before/after
measurements.

## Recommended next milestone

**MILESTONE-003 — case-study layout and content model.** `MILESTONE-002` is the higher
priority on paper, but it is blocked on `DECISION-010` (is the bento direction being
kept?), which only the owner can answer. `MILESTONE-003` has no such blocker, is the
owner's own first-named complaint, and unblocks `MILESTONE-004`.

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
