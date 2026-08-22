# ISSUE-018 — Next.js leftovers still in the repository

Status: Resolved
Priority: Low
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

## Summary

Three artefacts of the pre-migration Next.js project are still on disk and serve no
purpose.

## Evidence / Current Behavior

| Path | What it is |
| --- | --- |
| `.next/` | Next.js webpack cache (`cache/webpack/client-development`, …). Untracked **and not listed in `.gitignore`** |
| `tsconfig.tsbuildinfo` | 114 KB, dated 2026-08-07, superseded by `tsconfig.app.tsbuildinfo` / `tsconfig.node.tsbuildinfo`. Matched by the `*.tsbuildinfo` ignore rule, so it is only clutter |
| `NewHomePage/` | empty directory (git does not track it) |

`src/.DS_Store` and `src/components/.DS_Store` also exist but are correctly gitignored.

## Expected Behavior

The tree contains only what the Vite project needs.

## Relevant Files

- `.gitignore`

## Possible Cause

The migration commit did not clean the workspace.

## Possible Solution

Delete `.next/`, `tsconfig.tsbuildinfo` and `NewHomePage/`; add `.next/` to `.gitignore`
defensively. Confirm the empty `NewHomePage/` was not a deliberate placeholder before
removing it.

## Dependencies

Bundle with `ISSUE-017`.

## Related

`ARCH-06`, `MILESTONE-001`.

## Resolution

Fixed in SESSION-002, `MILESTONE-001`. All three artefacts deleted after inspection:

| Path | Confirmed before deleting |
| --- | --- |
| `.next/` | 6 files, 24 KB, all under `cache/webpack/`. Already covered by the `/.next` line in `.gitignore` |
| `tsconfig.tsbuildinfo` | referenced by nothing in the repo; superseded by `tsconfig.app.tsbuildinfo` / `tsconfig.node.tsbuildinfo` |
| `NewHomePage/` | empty, and `git log --all -- NewHomePage` shows it was never tracked — not a deliberate placeholder |

No commit accompanies this: every path was either gitignored or untracked, so the deletions
do not appear in `git status`.
