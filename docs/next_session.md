# Next Session

## Status

`MILESTONE-003` is complete. `MILESTONE-007` has started: `ISSUE-015` (anchor offset) and
`ISSUE-026` (footer overflow) are fixed and verified (SESSION-005).

Work sits on branch `milestone-003-content-model`, **six commits ahead of `main` and
unpushed** (`e844ad9`, `36cb023`, `1a15cac`, `4e4b5f7`, `776c2e9`, `f32a45e`). **Check
`git` before trusting any status in these files.**

### Nothing is deployed

The live site is served from the `gh-pages` branch and is published only by running
`npm run deploy` — there is no CI workflow (it was removed in `11930a6` for lack of a
workflow token scope). So none of the last three sessions' work is visible anywhere except
locally, via `npm run build && npx vite preview` at `http://localhost:4173`.

Publishing is the owner's call: merge the branch into `main`, then `npm run deploy`.

### What wants the owner

1. **Look at a case study** — the visible answer to their first-named complaint. Body text
   now stops at 680px, so text-only sections leave the right of the column empty; that is
   deliberate, and it is the thing most likely to read as unfinished.
2. **`DECISION-010`** — keep the bento direction for the homepage? Blocks `MILESTONE-002`.
3. **`DECISION-006`** — which placeholder slots stay stylised? Blocks the last 44 image
   slots and `MILESTONE-005`.
4. **Real image exports**, and participation in the copy pass.

## Objective

**Consolidate the design system** — `ISSUE-023`, plus `ISSUE-011` and `ISSUE-021` while
you are in there. This is the rest of `MILESTONE-007`'s unblocked half, and it maps to the
owner's "design should be consistent overall".

`MILESTONE-004` (the copy pass) is the higher priority the moment the owner is available;
`DECISION-011` forbids inventing content, so it wants them in the room. Do that instead if
they are.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed, and the harness bug it describes
2. `docs/issues/issue_023.md` — the drift, with the five different h1 clamps listed
3. `docs/issues/issue_011.md` (breakpoint order), `issue_021.md` (`stripLocale` duplicated)
4. `docs/codebase/styling.md` — what the config actually defines and what is used instead
5. `docs/milestones/milestone_007.md` — the milestone, and what is already ticked
6. `docs/suggestions/suggestion_009.md` — the consolidation this implements

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `tailwind.config.ts` — the named type scale (10 sizes, **0 uses**), the 17-colour
  palette, and the `screens` order that makes `lg:` beat `nav:`
- `src/index.css` — `.container-page`, defined and never used; the new `--header-h` /
  `--anchor-offset` variables
- The five page headings named in `issue_023.md`: `SelectedWork.tsx`, `About.tsx`,
  `CaseStudyHero.tsx`, `CategoryPage.tsx` / `ProjectPage.tsx`, `PlaygroundIndex.tsx`
- `src/components/Header.tsx` and `Footer.tsx` — the duplicated `stripLocale`

## What To Do

- **`ISSUE-023`** — decide the real scale from what the pages actually use, then move them
  onto it. The config's names are a proposal, not scripture: if `text-case-title` does not
  match any heading anyone wants, change the token rather than the page. Same for the raw
  hexes (`#E4E7EE` in ~15 places against a `border` token of `#D7DAE0` — check which one
  is the colour that should survive).
- **`.container-page`** — adopt it, or delete it. ~20 hand-written repetitions of
  `mx-auto max-w-[1440px] px-5 md:px-20` is the thing that made `ISSUE-026` hard to fix in
  one place.
- **`ISSUE-011`** — reorder `theme.screens` so `nav` sits after `lg`, and check nothing
  depended on the old order.
- **`ISSUE-021`** — move `stripLocale` into `src/lib/i18n.ts`.
- Optional, if there is time: **`ISSUE-027`**, which is now diagnosed. Start by logging
  every `record()` write with its key, value and stack through one reproduction.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **This is a refactor: nothing should look different afterwards** unless a specific
  inconsistency is being corrected on purpose. Screenshot before and after — numbers alone
  will not catch a heading that changed size by 2px on one page.
- **Do not break the two scroll hooks** (`DECISION-008`, `DECISION-013`), and leave
  `useScrollBehavior` alone unless you are taking on `ISSUE-027` deliberately.
- `--header-h` and `--anchor-offset` are now load-bearing for every anchor and the
  case-study rail. If the header's markup changes, re-measure at 375px and 1440px.
- `prefers-reduced-motion` must keep producing a fully static, fully visible site.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Verify against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173` — not `127.0.0.1`), in headless Chrome over the DevTools Protocol.

**Use a cold load when you mean a cold load.** `Page.navigate` to a URL that differs only
by its fragment does not reload the document; SESSION-005 lost time to measuring a stale
page. Go via `about:blank` first.

For a refactor of this shape:

- Screenshot every page at 375 / 768 / 1024 / 1440 before and after, and diff them by eye.
  A token consolidation that changes nothing visually is the goal.
- Computed styles for the five page headings at each width, before and after.
- `document.documentElement.scrollWidth` vs `window.innerWidth` across those widths —
  `ISSUE-026` is fixed and must stay fixed.
- Anchored sections still clear the header by 31px at 375px and 1440px.
- The case-study prev/next ring, scrolled end to end, with nothing left hidden.

## Completion Criteria

- One type scale, one palette, one container — and the pages look the same as before
  except where a difference was corrected deliberately.
- `theme.screens` is in ascending order and nothing regressed at 1160px or above.
- `stripLocale` has one definition.
- Both locales verified; reduced motion still fully static and fully visible.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_007.md` and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed** — and if a token's value changes, say so in `docs/reference/design_tokens.md`,
   which is the only copy of those values that is in version control.
5. Create `docs/sessions/session_006.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
