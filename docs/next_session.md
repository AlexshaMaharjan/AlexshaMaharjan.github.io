# Next Session

## Status

`MILESTONE-003` is **complete** (SESSION-003 content model, SESSION-004 layout). The case
studies — the owner's first-named complaint — now have both internal structure and a
layout built for it. Everything left on them belongs to other milestones: real photographs
(`MILESTONE-005`), the copy pass (`MILESTONE-004`), scroll-linked motion (`MILESTONE-006`).

Work sits on branch `milestone-003-content-model`, four commits ahead of `main`
(`e844ad9`, `36cb023`, `1a15cac`, `4e4b5f7` + docs). **Check `git` before trusting any
status in these files.**

### What wants the owner

1. **Look at a case study.** This is the visible answer to "case study description pages
   layout should be improved", and the one judgement a session cannot make for them. One
   thing to point at specifically: body text now stops at 680px, so text-only sections
   leave the right-hand side of the column empty. That is deliberate — it is what makes
   media feel wide — but it is the most likely thing to read as unfinished.
2. **`DECISION-010`** — is the bento direction for the homepage being kept? Still blocking
   `MILESTONE-002`, unanswered since SESSION-002.
3. **`DECISION-006`** — which placeholder slots stay stylised? Blocks the last 44 image
   slots (`ISSUE-007`) and `MILESTONE-005`.
4. **Real image exports**, and participation in the copy pass.

## Objective

**Fix the three measured navigation and responsive defects** — `ISSUE-015`, `ISSUE-026`,
`ISSUE-027`. They are a coherent slice of `MILESTONE-007`: all three are page-independent
(header, footer, scroll offsets), all three are measured rather than suspected, and none
of them waits on the owner or on `MILESTONE-002`.

`MILESTONE-004` (the copy pass) is the higher priority on paper and is now unblocked —
but `DECISION-011` forbids inventing content, so it wants the owner in the room. If they
are available, do that instead and leave this.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/issues/issue_015.md`, `issue_026.md`, `issue_027.md` — the three defects, each
   with its measurements
3. `docs/architecture/architecture_01.md` — routing, and how the scroll hook now aims
4. `docs/decisions/decision_013.md` (why the scroll behaviour is hand-rolled),
   `decision_008.md` (the two coupled hooks)
5. `docs/milestones/milestone_007.md` — the milestone these three belong to
6. `docs/codebase/styling.md` — the token and breakpoint situation, before changing padding

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/index.css` — `section { scroll-margin-top: 104px }`, the single fixed offset
  `ISSUE-015` is about
- `src/components/Header.tsx` — the 146px mobile header the 104px is wrong against
- `src/components/Footer.tsx:40` — `flex gap-16 md:col-span-5`, the `ISSUE-026` overflow
- `src/lib/useScrollBehavior.ts` — `scrollTopFor` already does layout-based aiming;
  `ISSUE-027` needs a `hashchange` path into the same maths
- `tailwind.config.ts` — the `screens` order that makes `lg:` beat `nav:` (`ISSUE-011`),
  worth knowing before adding breakpoints

## What To Do

- **`ISSUE-015`** — the anchor offset is one fixed 104px against a header that is 146px
  tall below 480px, so 42px of every anchored section hides behind it. A responsive
  `scroll-margin-top` is the obvious fix; check it against the real header height rather
  than assuming 146.
- **`ISSUE-026`** — the footer's two link columns plus `md:px-20` exceed the viewport
  between 768px and 839px, so every page scrolls sideways. Consider whether the padding
  scale is the real fix (it would touch the shared container, not just the footer).
- **`ISSUE-027`** — a URL-bar hash change on the current page never reaches the router. A
  `hashchange` listener re-aiming through `scrollTopFor` would close it; watch that it
  does not fight the router or double-scroll.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **Do not break the two scroll hooks.** `useScrollReveals` and `useScrollBehavior` are
  coupled by effect ordering (`DECISION-008`, `DECISION-013`). SESSION-004 changed how the
  hash landing aims; if you change it again, re-run the whole journey suite below.
- **Any new `:param` route effect must not be mount-only** (`ARCH-01`, `ISSUE-001`).
- `prefers-reduced-motion` must keep producing a fully static, fully visible site.
- Changing shared padding or breakpoints touches every page — verify the homepage, About,
  résumé and Playground too, not only the surface you were aiming at.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Verify in a browser against the **production build** (`npm run build && npx vite preview`,
then `http://localhost:4173` — not `127.0.0.1`). Headless Chrome over the DevTools
Protocol, driven from Node's built-in `WebSocket`: launch with `--headless=new
--remote-debugging-port=…`, read `/json/list`, drive `Page.navigate` / `Runtime.evaluate`.
About 40 lines.

The suite these three defects need, all of which SESSION-004 ran and left passing:

- Cold loads of `/#work`, `/#contact`, `/contact`, `/de/#about` — section top should equal
  the header offset exactly, at 1440px **and** at 390px (that second one is `ISSUE-015`).
- Cross-route hash click, same-page hash click, contents-rail anchor click.
- Route change from a scrolled page starts at 0; back restores the previous offset.
- `document.documentElement.scrollWidth` vs `window.innerWidth` at 375 / 740 / **768** /
  800 / 840 / 1024 / 1280 / 1440, on the homepage, a case study and About — that is how
  `ISSUE-026` was found and it is how you will know it is gone.
- The case-study prev/next ring, scrolled end to end at each stop, with nothing left
  hidden.

Two things worth carrying forward:

- **Give reveals time to settle before measuring position** — measure, wait a second,
  measure again, and compare. A single early reading looks like a bug that is not there,
  and a single late one hides one that is.
- **Screenshot as well as measure.** Numbers confirm structure; only a picture shows
  whether the result reads.

## Completion Criteria

- No page scrolls horizontally at any width from 320px to 1440px.
- Every anchor lands its section clear of the header at every width, by every route in —
  cold load, `<Link>`, rail click, and URL-bar hash edit.
- Both locales verified; reduced motion still fully static and fully visible.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_007.md` and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed**.
5. Create `docs/sessions/session_005.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
