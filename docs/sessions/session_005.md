# SESSION-005 — Anchor offset, footer overflow, and a misdiagnosed scroll bug

Date: 2026-08-23
Milestone: `MILESTONE-007` — Consistency, responsive, accessibility (first slice)
Objective: Fix the three measured, page-independent defects — `ISSUE-015`, `ISSUE-026`,
`ISSUE-027`.
Outcome: **Two fixed and verified** (`f32a45e`). The third turned out to be a different
bug than its file described; it is now diagnosed with measurements, and three candidate
fixes were tried and **reverted** rather than shipped unproven.

## Starting state

Clean, on `milestone-003-content-model` at `776c2e9`, five commits ahead of `main` and
still unpushed. Nothing is deployed: the live site is served from the `gh-pages` branch and
only `npm run deploy` publishes to it — there is no CI workflow.

## What Changed

| | Before | After |
| --- | --- | --- |
| Anchored section, below 480px | 42px of it behind the header | clears the header by 31px |
| Anchored section, 480px and up | clears by 31px | unchanged (104px offset) |
| Where the offset comes from | `scroll-margin-top: 104px`, written down once | `--header-h`, measured by the header itself; `--anchor-offset` derives from it |
| Case-study rail offset | `top-[104px]` | the same variable |
| Footer at 768–839px | every page scrolled sideways by up to 24px | columns wrap; no page scrolls sideways at any width |

## Files Changed

| File | Change |
| --- | --- |
| `src/components/Header.tsx` | measures itself in a layout effect + `ResizeObserver`, publishes `--header-h` |
| `src/index.css` | `--header-h` / `--anchor-offset` with per-breakpoint fallbacks; `section` uses the variable |
| `src/components/case-study/ContentsNav.tsx` | sticky rail offset reads `--anchor-offset` |
| `src/components/case-study/Section.tsx` | the closing section's sticky heading likewise |
| `src/components/Footer.tsx` | link columns wrap |

`src/lib/useScrollBehavior.ts` was changed three times during the session and **ends
unchanged** — see below.

## ISSUE-027: what it actually is

`ISSUE-027` was written in SESSION-004 as "a fragment navigation fires `hashchange`, not
`popstate`, so the router never sees it". Measured with listeners attached, that is simply
**false**: it fires both, and react-router does update. A `hashchange` listener written
against that theory provably never fired.

What the instrumented build showed instead, reproducing on `/work/afono#insights` reached
after a client-side hop:

```
enter key=default|/work/afono stored=4267 navType=POP cameFrom=/work/afono hash=#insights
RESTORE to=4267
```

Three things combine: a fragment navigation arrives as `POP` with `cameFrom` set, so the
back/forward branch runs; `location.key` is `"default"` for more than one entry, so the
positions map shares a bucket between them; and an offset was recorded that no visitor
chose — when a tall page is replaced by a short one the browser clamps the scroll position
and the recorder files that as "where the visitor was". The 18px error is a coincidence of
this page's geometry, not the cause.

Three fixes were built and measured: the `hashchange` listener (never fired), keying
positions by `key|pathname` (the collision is real, but the bogus offset is filed under the
incoming key too), and suppressing the recorder during a landing plus holding the position
afterwards (did not stop the offset being recorded). **All three were reverted.** Where the
4267 gets written was never pinned down, and unproven complexity in the hook `DECISION-013`
exists to keep careful is worse than a known, documented defect.

## Validation

- `npm run lint` — 0 errors, the same 3 pre-existing warnings. `npm run build` — green.
- Headless Chrome over the DevTools Protocol against the **production build**:
  - Anchored sections at 320 / 375 / 390 / 479 / 480 / 768 / 1024 / 1440px, on a case study
    and on the homepage's `#work` and `#contact`: 31px clearance everywhere.
  - Horizontal overflow across seven pages × fourteen widths from 320px to 1920px: none.
  - Every SESSION-002 journey at 1440px and 390px, motion on and off — cold `/#work`,
    `/#contact`, `/contact`, `/de/#about`; cross-route hash click; same-page hash click;
    contents-rail click; route change starts at 0; back restores 5000px exactly.
  - The prev/next ring across all six case studies: nothing left hidden.
  - Reduced motion on three pages at three widths: nothing hidden.
  - A screenshot at 390px confirming the section eyebrow and heading are now fully visible.

## A harness bug worth knowing about

`Page.navigate` to a URL that differs from the current one **only by its fragment** does
not reload the document. Several measurements early in this session were therefore taken
against a stale page — including one that appeared to show the CSS fix not working at all.
`cdp.mjs` now has a `coldGoto` that goes via `about:blank` first, and every cold-load
measurement in this session used it.

This also means part of SESSION-004's "cold hash landings" evidence was measured on
fragment navigations rather than cold loads. Re-measured properly here: they land correctly.

## Remaining Concerns

- **`ISSUE-027` is open and diagnosed.** The next attempt should start by logging every
  `record()` write with its key, value and stack through one reproduction.
- The shared padding scale (`md:px-20` from 768px) is still what makes tablet widths tight;
  `ISSUE-026` was fixed at the footer rather than there, deliberately.
- `--header-h` is measured, but the CSS fallbacks (146px / 73px) are still written down —
  they only apply before the measurement runs, and they will drift if the header changes.
- Nothing here touched the case studies' content or imagery: `MILESTONE-004` and
  `MILESTONE-005` are still what stands between them and finished.
