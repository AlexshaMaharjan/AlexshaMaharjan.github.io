# DECISION-001 — Vite + React SPA instead of Next.js App Router

Status: Active
Date: Commit `7fb7755` (before 2026-08-22)
Scope: Whole project

## Context

The project was originally built on Next.js (App Router) — commit `aa527f9` is a
checkpoint of that implementation. Commit `7fb7755` migrated the whole codebase to
Vite + React + TypeScript as a static SPA.

## Decision

Ship as a client-rendered static SPA built by Vite, deployed as plain files with an SPA
rewrite.

## Reasoning

Not recorded in the repository. Inferable from what the migration produced: a portfolio
with no server-side data needs, no API routes and no authentication gains little from
Next, while Vite gives a much faster dev loop and simpler hosting.
**Partly Unknown / inherited from the migration commit.**

## Alternatives

Staying on Next.js (static export would have kept per-route metadata); Astro (better fit
for a content site of this shape).

## Consequences

- Dev and build are fast (a full production build takes ~1s).
- Deployment is any static host with a catch-all rewrite.
- **Lost:** per-route server-rendered metadata (`ISSUE-013`), automatic hash-anchor
  scrolling (`ISSUE-002`), automatic scroll restoration (`ISSUE-003`), and `next/image`
  (replaced by a stub, `DECISION-005`).
- Next.js artefacts remain in the tree (`ISSUE-018`).

## Relevant Files

`vite.config.ts`, `package.json`, `src/main.tsx`, `src/routes.tsx`, `index.html`

## Related Issues / Milestones

`ISSUE-002`, `ISSUE-003`, `ISSUE-013`, `ISSUE-018`, `MILESTONE-001`, `MILESTONE-008`
