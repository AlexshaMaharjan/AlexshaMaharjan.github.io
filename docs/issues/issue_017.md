# ISSUE-017 — Substantial work is uncommitted and at risk

Status: Resolved
Priority: Medium
Category: Process / Repository hygiene
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

## Summary

The GSAP scroll-reveal system, the new bento work grid, the deletion of the previous work
grid, and both project markdown guides exist only in the working tree. A stray `git
checkout .` would destroy them.

## Evidence / Current Behavior

`git status` at 2026-08-22 (snapshot — re-check at session start):

```
 M package.json, package-lock.json
 M src/components/SelectedWork.tsx, case-study/Section.tsx,
   playground/CategoryPage.tsx, playground/ProjectPage.tsx
 M src/index.css
 M src/pages/{Home,About,CaseStudy}.tsx, pages/playground/*.tsx
 D src/components/ProjectEntry.tsx
?? .next/                      ← not in .gitignore
?? CONTENT_GUIDE.md
?? ROADMAP.md
?? src/components/BentoGrid.tsx
?? src/lib/useScrollReveals.ts
```

Last commit is `7fb7755` "Migrate from Next.js (App Router) to Vite + React + TypeScript
static SPA". Only two commits exist in the repository's history.

`.next/` being untracked *and* unignored means a `git add -A` would commit a webpack
cache directory.

## Expected Behavior

Working increments are committed; build caches are ignored.

## Relevant Files

- `.gitignore`
- everything listed above

## Possible Cause

Fast iterative work without commit checkpoints.

## Possible Solution

Add `.next/` to `.gitignore`, then commit the current state in coherent pieces — GSAP
reveals, the bento experiment, the two guides. Note that committing the bento grid also
commits `ISSUE-004`/`ISSUE-005`; that is acceptable as a checkpoint provided the issues
stay open.

## Dependencies

Do this **before** starting `MILESTONE-001` work, so there is a clean base to revert to.

## Related

`ARCH-06`, `MILESTONE-001`, `ISSUE-018`, `DECISION-010`.

## Resolution

Already resolved before SESSION-002 began. The re-check `MILESTONE-001` asked for found
the working tree **clean**: the GSAP reveal system, `BentoGrid.tsx`, the deleted
`ProjectEntry.tsx` and both guides were committed in `cc6e1c8` ("Add scroll reveal
animations, BentoGrid component, and project docs"), and `/.next` was already in
`.gitignore`. The snapshot in this file was stale, as the milestone warned it might be.

`ISSUE-004` / `ISSUE-005` / `DECISION-010` remain open, as intended for a checkpoint
commit.
