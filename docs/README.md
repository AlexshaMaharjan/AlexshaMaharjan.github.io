# Documentation system — Alexsha Maharjan portfolio

This folder is the persistent memory of the project. It exists so a fresh coding-agent
session can become productive without re-reading the whole repository.

**The repository is always the source of truth.** If a document disagrees with the code,
the code wins. Fix the document.

---

## The files

Eleven of them, plus four data files. It was 159 until SESSION-038; one file per issue, per
decision, per session and per milestone meant an agent spent its first minutes opening
directories instead of reading.

| File | Holds |
| --- | --- |
| `README.md` | This file. How the system works. |
| `next_session.md` | **Start here.** The router for the next session. Small on purpose. |
| `current_state.md` | Snapshot of overall project state. |
| `project_overview.md` | What the project is, the stack, the pages, the commands. |
| `milestones.md` | The roadmap. Index table at the top, one section per milestone. |
| `issues.md` | Defects and deficiencies, open and resolved. |
| `suggestions.md` | Improvements that are not defects. |
| `decisions.md` | Lightweight ADRs. What was decided and why. |
| `architecture.md` | How the system works today. Descriptive, not aspirational. |
| `codebase.md` | Map of directories and files. What to open for which task. |
| `sessions.md` | History. A table of every session, full write-ups from SESSION-029. |
| `reference/handbook.md` | Design tokens, the publishing runbook, the verification harness. |
| `reference/image_sources.md` | Which project document each image came from. Read by `scripts/`. |
| `reference/image_manifest.md` | Every image slot. **Generated** by `scripts/image-manifest.mjs`. |
| `reference/image_files.md` | Which image files are real and which are stand-ins. |
| `reference/image_crops.json` | Every crop already cut, so an export stays reproducible. |

**Every multi-item file opens with its index table.** Read the table; jump to a section only
when you need it. Sections are anchored by ID, so `decisions.md#decision-016` is a link you
can follow and a string you can grep.

## IDs

| Kind | ID | Where it lives |
| --- | --- | --- |
| Issue | `ISSUE-001` | `issues.md#issue-001` |
| Suggestion | `SUGGESTION-001` | `suggestions.md#suggestion-001` |
| Decision | `DECISION-001` | `decisions.md#decision-001` |
| Milestone | `MILESTONE-001` | `milestones.md#milestone-001` |
| Session | `SESSION-001` | `sessions.md#session-001` |
| Architecture | `ARCH-01` | `architecture.md#arch-01` |

**IDs are permanent.** A resolved issue keeps its number; nothing is renumbered, nothing is
deleted. Resolved and completed items explain why the code looks as it does, and several of
them are cited by ID in `src/` and `scripts/` comments.

Statuses. Issues: `Open`, `Investigating`, `Planned`, `In Progress`, `Blocked`, `Resolved`,
`Won't Fix`. Priorities: `Critical`, `High`, `Medium`, `Low`. Milestones: `Proposed`,
`Approved`, `In Progress`, `Complete`, `Deferred`. Decisions: `Active`, `Superseded`,
`Under review`.

Anything that could not be confirmed from the code is marked **Needs verification**.

## Session start

When a session begins with `Read docs/next_session.md and proceed.`:

1. Read `next_session.md`.
2. Read only what it points at.
3. Open the source files it names, and only those.
4. Confirm the documentation still matches the implementation. Correct it where it drifted.
5. Do the work.
6. Avoid unrelated cleanup.
7. Validate: `npm run build`, `npm run lint`, `node scripts/content-audit.mjs`, and a browser
   check against the production build. See `reference/handbook.md#verification`.
8. Update the documentation before ending.

### Reworking previous work

When a session begins with `I don't like the result…`, read the relevant section of
`sessions.md`, then the decisions and issues it names. Rework **that same area**; do not
advance to the next milestone. Record the iteration as a **new** session ID. A rework never
edits the older session's entry.

## Session end

Update only what actually changed:

- Fixed an issue → its section in `issues.md`, the index table at the top, the milestone.
- Made an architectural choice → a new section in `decisions.md`, its index row, and
  `architecture.md`.
- Found a new problem → a new section in `issues.md` and its index row.
- Milestone progressed → its section in `milestones.md` and its index row.

Always: add the session row and, from SESSION-029 onward, the write-up in `sessions.md`;
rewrite `next_session.md`. Update `current_state.md` only when the overall state materially
moved.

## File discipline

**Do not create new files.** Every kind of information already has a home above. Adding
`notes.md`, `analysis-final.md`, `todo-new.md` or `fixes.md` is how this folder got to 159
files. If something genuinely has no home, add a section to the closest existing file and
say so in `next_session.md`.

## Writing rules for the site itself

These are the owner's, and they apply to every string that ships in `src/lib/dictionaries/`
and `src/lib/caseStudies/`:

- **No em dashes.** Not in headings, not in body copy, not in captions. Use a full stop, a
  comma or a rewrite. This applies to the website only; these documents may use them.
- **Write it like a person talking.** The owner supplies the substance and asks for it to be
  made human. Keep the meaning, fix the grammar, cut the padding.
- **Never invent a fact to fill a gap** (`DECISION-011`). If copy needs something only the
  owner knows, leave the gap and put it in `next_session.md` under "What needs the owner".
- **Both locales or neither.** `scripts/content-audit.mjs` fails the build on a string that
  exists in one language only.
