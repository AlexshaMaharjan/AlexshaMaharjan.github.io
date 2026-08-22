# Documentation System — Alexsha Maharjan Portfolio

This folder is the persistent memory of the project. It exists so a fresh coding-agent
session can become productive without re-reading the whole repository.

**The repository is always the source of truth.** If a document disagrees with the code,
the code wins — fix the document.

---

## Session start protocol

When a session begins with `Read docs/next_session.md and proceed.`:

1. Read `docs/next_session.md`.
2. Read **only** the documents it references.
3. Use a category `index.md` if you need more context than that.
4. Inspect **only** the source files named as relevant.
5. Confirm documentation still matches implementation; correct it where it drifted.
6. Do the milestone/session work.
7. Avoid unrelated cleanup.
8. Validate (`npm run build`, `npm run lint`, and browser checks where relevant).
9. Update the documentation system before ending (see "Ending a session").

### Reworking previous work

When a session begins with `Read docs/previous_session.md. I don't like the result…`:

1. Read `docs/previous_session.md`, then its linked `docs/sessions/session_XXX.md`.
2. Read the related milestone / issues / decisions.
3. Inspect the files that session changed.
4. Rework **that same area**. Do not advance to the next milestone.
5. Record the iteration as a new session, update `previous_session.md`, and keep
   `next_session.md` pointed at the same objective until the owner accepts it.

---

## Folder structure

| Path | Holds |
| --- | --- |
| `README.md` | This file — how the system works |
| `next_session.md` | **Router** for the next session. Small on purpose. |
| `previous_session.md` | Summary of the most recent session (single file, overwritten) |
| `current_state.md` | Snapshot of overall project state |
| `project_overview.md` | What the project is, stack, pages, commands |
| `architecture/` | How the system currently works (descriptive, not aspirational) |
| `codebase/` | Map of directories and files — what to open for which task |
| `issues/` | Defects and genuine deficiencies, including UI/UX ones |
| `suggestions/` | Improvements that are not defects |
| `decisions/` | Lightweight ADRs — what was decided and why |
| `milestones/` | The roadmap, one document per milestone |
| `sessions/` | Archive — one document per working session |
| `reference/` | Pointers to external/large project documents + captured design tokens |

Every directory with multiple documents has an `index.md` carrying a compact table.
Read the index first; open a detail file only when you need it.

## Naming and ID conventions

| Kind | ID | File |
| --- | --- | --- |
| Issue | `ISSUE-001` | `issues/issue_001.md` |
| Suggestion | `SUGGESTION-001` | `suggestions/suggestion_001.md` |
| Decision | `DECISION-001` | `decisions/decision_001.md` |
| Milestone | `MILESTONE-001` | `milestones/milestone_001.md` |
| Session | `SESSION-001` | `sessions/session_001.md` |
| Architecture | `ARCH-01` | `architecture/architecture_01.md` |

**IDs are permanent.** A resolved issue keeps its number; nothing is renumbered.
Resolved/completed items stay documented — they explain why the code looks as it does.

Statuses — issues: `Open`, `Investigating`, `Planned`, `In Progress`, `Blocked`,
`Resolved`, `Won't Fix`. Priorities: `Critical`, `High`, `Medium`, `Low`.
Milestones: `Proposed`, `Approved`, `In Progress`, `Complete`, `Deferred`.
Decisions: `Active`, `Superseded`, `Under review`.

Anything that could not be confirmed from the code is marked **Needs verification**.

## Ending a session

Update only what actually changed:

- Fixed an issue → the issue file, `issues/index.md`, the milestone, possibly `current_state.md`.
- Made an architectural choice → a decision file, `decisions/index.md`, the architecture doc.
- Found a new problem → one issue file + `issues/index.md`.
- Milestone progressed → the milestone file + `milestones/index.md`.

Always: create the session archive, rewrite `previous_session.md`, rewrite
`next_session.md`. Update `current_state.md` only when the overall state materially moved.

## File-creation discipline

Before creating a file, check whether an existing document already owns that information
and update it instead. Do not create `notes.md`, `analysis-final.md`, `todo-new.md`,
`fixes.md` or similar. Every active detail file must be listed in its index so nothing
becomes orphaned.
