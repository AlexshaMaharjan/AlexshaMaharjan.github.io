# Milestones Index

**Status: approved and under way.** `MILESTONE-001` (SESSION-002) and `MILESTONE-003`
(SESSION-003 content model, SESSION-004 layout) are complete. The rest of the roadmap
remains as proposed; the owner may still reprioritise or re-scope it.

Ordering rationale: repair what is broken → fix the two worst-reading surfaces (homepage
work section, case studies) → content and imagery → motion → consistency → ship.

| ID | Title | Status | Priority | Depends on | Addresses | File |
| --- | --- | --- | --- | --- | --- | --- |
| MILESTONE-001 | Stabilize the current implementation | **Complete** | Critical | — | ISSUE-001/002/003/017/018/022 — all resolved | `milestone_001.md` |
| MILESTONE-002 | Rebuild homepage "Selected Work" | **In progress** | High | M-001, ~~DECISION-010~~ answered | ISSUE-005 ✅, ISSUE-004 (images pending) | `milestone_002.md` |
| MILESTONE-003 | Case-study layout and content model | **Complete** | High | M-001 | ISSUE-024 ✅, ISSUE-008 ✅, ISSUE-007 (case studies ✅) | `milestone_003.md` |
| MILESTONE-004 | English content pass | Proposed — **unblocked** | High | M-003 model ✅, owner | ISSUE-024 ✅ | `milestone_004.md` |
| MILESTONE-005 | Real imagery | **Unblocked** | High | owner assets | ISSUE-007 ✅, ISSUE-006 | `milestone_005.md` |
| MILESTONE-006 | Motion system and interaction polish | Proposed | Medium | M-001, M-002/003 | ISSUE-012/019/020 | `milestone_006.md` |
| MILESTONE-007 | Consistency, responsive, accessibility | **In progress** | Medium | M-002/003/006 | ISSUE-011/015/016/021/023/026/028/030 ✅, ISSUE-010/027/029 | `milestone_007.md` |
| MILESTONE-008 | Performance, SEO, deployment | Proposed | Medium | content near-final, owner | ISSUE-013/014/019/025 | `milestone_008.md` |
| MILESTONE-009 | German parity | Proposed | Medium | M-004 | ISSUE-009 | `milestone_009.md` |

## Completed

**MILESTONE-003** (SESSION-003 + SESSION-004) — the case studies. Part one replaced
`body: string[]` with a block model and migrated all six studies in both locales
(`ISSUE-024`, `ISSUE-008`, and the case-study half of `ISSUE-007`). Part two laid them
out: a 680px text measure against three media widths, three distinct set pieces, a
contents rail that tracks the reading position, and a closing band. Both halves verified
in a browser against the production build.

**MILESTONE-001** (SESSION-002). All six issues resolved and verified in a browser against
the production build. Navigation is now correct: reveals re-run on same-route navigation,
every hash link lands on its section from any starting route, route changes start at the
top, and back/forward restores position. See `milestone_001.md` for the before/after
measurements.

## The owner's decisions, answered 2026-08-24

`DECISION-010` (keep the bento), `DECISION-006` (almost every placeholder becomes a real
image) and `DECISION-012` (point the résumé here, not at Adobe Portfolio) are all settled.
Nothing on the roadmap is blocked on a decision any more — only on **images** and on the
owner's **participation in the copy pass**.

## Recommended next milestone

**`MILESTONE-004` — the English content pass.** Its prerequisite (the block model) is
done, the layout it will be written into is settled, and it is the owner's third stated
priority. It needs the owner in the room: the copy is theirs, and `DECISION-011` forbids
inventing anything to fill gaps.

If the owner is not available, the rest of `MILESTONE-007` needs nothing from them —
`ISSUE-023` (type scale and colour tokens bypassed) is the largest remaining piece, and
`ISSUE-027` is diagnosed and waiting. `MILESTONE-002` is still blocked on `DECISION-010`,
unanswered since SESSION-002.

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
