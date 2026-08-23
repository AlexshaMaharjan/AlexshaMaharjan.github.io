# ISSUE-027 — A hash navigation after a client-side route change restores a scroll offset nobody chose

Status: Open — **diagnosed in SESSION-005, not fixed.** Three candidate fixes were tried
and reverted; the evidence below is what the next attempt should start from.
Priority: Low
Category: Routing / Navigation
Discovered: 2026-08-23 (SESSION-004)
Last reviewed: 2026-08-23 (SESSION-005 — rewritten; the original diagnosis was wrong)

## Summary

Going to an anchor on the page you are already on — editing the hash in the URL bar, or a
plain `<a href="#id">` — lands 18px past the anchor, but only if you reached that page by
a client-side route change first. The offset is the scroll reveal's at-rest transform, and
the mechanism is a stale entry in the scroll-position map, not the anchor logic.

## What SESSION-004 got wrong

The original text said a fragment navigation "fires `hashchange`, not `popstate`, so React
Router never sees it". **That is false.** Measured with listeners attached: a fragment
navigation fires **both**, in that order, and react-router does update its location.

A `hashchange` listener written against that theory was verified to never fire, and was
removed rather than shipped.

## Evidence / Current Behavior

All measured in Chrome against the production build at 1440px, motion enabled, on
`/work/afono` (reached from `/work/wikimind` via the next-project link), then navigating to
`/work/afono#insights`:

| | |
| --- | --- |
| `#insights` layout offset | 4360px, constant throughout |
| `scroll-margin-top` | 104px → correct scroll offset **4256px** |
| Where the page ends up | **4274px** — 18px too far |
| The section's transform | animates `y: 18 → 0` over ~700ms after landing |

Instrumenting the hook's own branches (a throwaway build) showed the decision:

```
enter key=default|/work/afono stored=4267 navType=POP cameFrom=/work/afono hash=#insights y=0
RESTORE to=4267
```

So the hash branch never runs. Three things combine:

1. **A fragment navigation arrives as `POP`** with `cameFrom` set, which is the branch
   meant for back/forward.
2. **`location.key` is `"default"` for more than one entry.** The positions map is keyed by
   `location.key` alone, so entries share a bucket — here the pushed `/work/afono` entry and
   the fragment-navigation entry are both `"default"`.
3. **A position was recorded that no visitor chose (4267).** When a tall page is replaced by
   a short one, the browser clamps the scroll offset and fires scroll events; the recorder
   files those as "where the visitor was". The restore branch then honours it.

The 18px is a coincidence of this page's geometry, not the cause — the bogus offset simply
happens to land near the anchor.

## Expected Behavior

An anchor lands under the header whichever way it is reached, and a restored offset is one
the visitor actually scrolled to.

## Relevant Files

- `src/lib/useScrollBehavior.ts` — the positions map, the restore branch, the hash branch
- `src/lib/useScrollReveals.ts` — the at-rest transform the browser's own jump measures

## What was tried in SESSION-005, and what each did

Each was measured, then reverted, because none closed the case and unproven complexity in
this hook is worse than a known defect (`DECISION-013`):

1. **A `hashchange` listener** re-aiming through the layout maths — never fired (see above).
2. **Keying positions by `key|pathname`** — sound on its own evidence (the `"default"`
   collision is real), but the bogus offset is filed under the *incoming* composite key too,
   so the restore branch still found it.
3. **Suppressing the recorder while a landing is in flight**, plus a hold after arrival to
   absorb a scroll the browser starts itself — did not stop `stored` being set. Where the
   4267 is recorded was never pinned down; that is the next thing to find out.

## Possible Solution

Start by finding **when** 4267 is written: log every `record()` with its key, value and a
stack, through one reproduction. Then either stop that write, or make the restore branch
refuse an offset it cannot attribute to the visitor. A rule worth considering once the
recording is understood: on a `POP` whose pathname is unchanged and whose hash differs from
the previous entry's, honour the hash rather than any stored offset.

Whatever lands, re-run the full journey suite — cold hash loads, cross-route and same-page
hash clicks, rail clicks, route change to top, and back/forward restore — at 1440px and
390px with motion on and off. The scripts for it are described in `session_005.md`.

## Dependencies

None. Rare journey, and every other route to an anchor is exact (all measured at 31px
clearance in SESSION-005).

## Related

`DECISION-008`, `DECISION-013`, `ISSUE-001`, `ISSUE-002`, `ISSUE-015`, `ARCH-01`.
