# Next Session

## Status

`MILESTONE-003` is complete. `MILESTONE-007` is well under way: `ISSUE-015` and
`ISSUE-026` (SESSION-005), `ISSUE-023`, `ISSUE-011` and `ISSUE-021` (SESSION-006).

Work sits on branch `milestone-003-content-model`, **eight commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

The live site is served from the `gh-pages` branch and published only by `npm run deploy`
— there is no CI workflow. None of the last four sessions is visible anywhere but locally
(`npm run build && npx vite preview`, then `http://localhost:4173`). Publishing means
merging to `main` and running that, which is the owner's call.

### What wants the owner

1. **Look at a case study, and at the homepage.** The case studies answer their
   first-named complaint. On the homepage, the three section headings were three different
   sizes and are now one — that is the most visible thing SESSION-006 changed.
2. **`DECISION-010`** — keep the bento direction? Blocks `MILESTONE-002`.
3. **`DECISION-006`** — which placeholder slots stay stylised? Blocks the last 44 image
   slots and `MILESTONE-005`.
4. **Real image exports**, and participation in the copy pass (`MILESTONE-004`).

## Objective

**Make the header correct at every width** — `ISSUE-016` and `ISSUE-028`.

Both are about the same component, both are page-independent, and neither needs the owner.
`ISSUE-016` has been `Investigating` since SESSION-001 and wants a measurement before a
fix; `ISSUE-028` is measured already.

`MILESTONE-004` (the copy pass) remains the higher priority the moment the owner is
available. After the header, the largest unblocked piece left in `MILESTONE-007` is the
accessibility block — marquee pause, contrast audit, heading order, touch targets,
keyboard access to the process canvas, and an axe/Lighthouse run.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed, and the two measurement lessons in it
2. `docs/issues/issue_016.md` — the suspected collision, with the arithmetic that suggested it
3. `docs/issues/issue_028.md` — the German header at 320px, measured
4. `docs/issues/issue_015.md` — the header's height is now published as `--header-h`;
   anything that changes its height changes every anchor on the site
5. `docs/codebase/styling.md` — the token scale and breakpoints as they now stand
6. `docs/milestones/milestone_007.md` — what is ticked and what is left

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/components/Header.tsx` — the 72px row (wordmark · absolutely-centred `ModeSwitch` ·
  nav/`MobileMenu`), the `sm:hidden` second row below 480px, and the `ResizeObserver` that
  publishes `--header-h`
- `src/components/ModeSwitch.tsx` — the centred control `ISSUE-016` is about
- `src/components/MobileMenu.tsx` — the "Menu" / "Menü" button
- `src/lib/dictionaries/{en,de}.ts` — `nav.*`, the labels that differ in length

## What To Do

- **`ISSUE-016`** — measure first: the wordmark's right edge against the mode switch's left
  edge, and the switch's right edge against the menu button's left edge, at 480 / 520 / 560
  / 640 / 768 / 900 / 1024 / 1159px, in **both locales** (German is longer, which is what
  `ISSUE-028` is). Then decide: does the switch move into the flex flow, shrink, or drop to
  the second row at more widths?
- **`ISSUE-028`** — the German header needs 359px of content at 320px. Fixing `ISSUE-016`
  properly may fix this as a side effect; if not, decide whether 320px is supported at all
  and write that down somewhere.
- If the header's **height** changes at any width, re-measure anchor clearance — the
  scroll offset is derived from it now.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **The header's height is load-bearing.** `--header-h` feeds `--anchor-offset`, which
  positions every anchored section and the case-study rail. Changing the header's height,
  or its markup, means re-running the anchor checks at 375px and 1440px.
- **Do not break the two scroll hooks** (`DECISION-008`, `DECISION-013`), and leave
  `useScrollBehavior` alone unless you are taking on `ISSUE-027` deliberately.
- Use the tokens (`text-*` scale, `card-border`, `.container-page`) rather than adding new
  literals — and **never name a font size after a colour token** (`styling.md` explains).
- `prefers-reduced-motion` must keep producing a fully static, fully visible site.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173` — not `127.0.0.1`), in headless Chrome over the DevTools Protocol.

Two things SESSION-005 and SESSION-006 learned the hard way:

- **Compare `scrollWidth` against `clientWidth`, not `window.innerWidth`** — `innerWidth`
  includes the scrollbar and hides up to ~15px of overflow.
- **Settle before measuring, and use a real cold load.** At 200ms a page can measure clean
  and at 600ms not; and `Page.navigate` to a URL differing only by its fragment does not
  reload the document (go via `about:blank`).

The suite to leave passing:

- Element bounding boxes in the header — no overlap — at the widths listed above, in both
  locales.
- `scrollWidth` vs `clientWidth` across nine pages × twelve widths from 320px to 1920px.
- Anchored sections clear the header at 375 / 480 / 768 / 1024 / 1440px (31px today).
- The case-study prev/next ring with nothing left hidden; reduced motion clean.
- Screenshots of the header at each width in both locales — overlap is easier to see than
  to measure.

## Completion Criteria

- No overlap in the header at any width, in either locale.
- No page scrolls horizontally at any supported width — or 320px is documented as out of
  scope.
- Anchors still clear the header everywhere.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_007.md` and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed** — and if a token's value changes, say so in `docs/reference/design_tokens.md`.
5. Create `docs/sessions/session_007.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
