# Suggestions Index

Improvements that are not defects. Two are implemented and two partially, all in
SESSION-003; the rest await owner approval.

Items marked ★ map directly to priorities the owner stated at initialization: case-study
layout, correct images, humanised copy, richer animation, design consistency.

| ID | Title | Status | Priority | Impact | Effort | Milestone | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SUGGESTION-001 | ★ Rebuild "Selected Work" image-led, one tile per project | Proposed | High | High | Medium | M-002 | `suggestion_001.md` |
| SUGGESTION-002 | ★ Give every image slot an optional real source | **Partial** | High | High | Small | M-003/M-005 | `suggestion_002.md` |
| SUGGESTION-003 | ★ Redesign the case-study reading experience | **Partial** | High | High | Large | M-003 | `suggestion_003.md` |
| SUGGESTION-004 | ★ Replace `body: string[]` with a typed block model | **Implemented** | High | High | Medium | M-003 | `suggestion_004.md` |
| SUGGESTION-005 | ★ Editorial pass — humanise copy, cut redundancy | Proposed | High | High | Large | M-004 | `suggestion_005.md` |
| SUGGESTION-006 | ★ Establish a shared GSAP motion system | Proposed | High | High | Medium | M-006 | `suggestion_006.md` |
| SUGGESTION-007 | ★ Page transitions between routes | Proposed | Medium | Medium | Medium | M-006 | `suggestion_007.md` |
| SUGGESTION-008 | ★ Scroll-linked interactions on case studies and media | Proposed | Medium | Medium | Medium | M-006 | `suggestion_008.md` |
| SUGGESTION-009 | ★ Consolidate the design system | Proposed | Medium | High | Medium | M-007 | `suggestion_009.md` |
| SUGGESTION-010 | Responsive audit and one layout vocabulary | Proposed | Medium | Medium | Medium | M-007 | `suggestion_010.md` |
| SUGGESTION-011 | Accessibility pass to WCAG 2.2 AA | Proposed | Medium | Medium | Medium | M-007 | `suggestion_011.md` |
| SUGGESTION-012 | Image pipeline and bundle budget | Proposed | Medium | Medium | Medium | M-008 | `suggestion_012.md` |
| SUGGESTION-013 | Prerender routes, complete the SEO story | Proposed | Medium | Medium | Medium | M-008 | `suggestion_013.md` |
| SUGGESTION-014 | Strengthen the portfolio narrative | Proposed | Medium | High | Medium | M-004 | `suggestion_014.md` |
| SUGGESTION-015 | Add a validation harness (CI + smoke tests) | Proposed | Low | Medium | Small | M-008 | `suggestion_015.md` |
| SUGGESTION-016 | Decide and configure deployment | Proposed | Low | Medium | Small | M-008 | `suggestion_016.md` |

## If you only do three things

1. `SUGGESTION-003` — the case-study layout. Its blocker, `SUGGESTION-004`, is done, so
   this is now unobstructed and is still the whole of what the owner said about "case
   study description pages".
2. `SUGGESTION-005` — the copy pass. The block model makes restructuring possible, not
   just rewording.
3. `SUGGESTION-006` — the motion vocabulary. (`ISSUE-001`, which it was going to fix as a
   side effect, was resolved in `MILESTONE-001`.)
