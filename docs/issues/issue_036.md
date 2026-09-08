# ISSUE-036 — A regex rearranged content into the wrong section and the wrong locale

Status: **Resolved** (SESSION-029)
Priority: High
Category: Content / Correctness
Discovered: 2026-09-08 (SESSION-029)
Introduced: 2026-09-04, commit `37f6b3a` (SESSION-027)

## What shipped

For two commits, `/work/afono` rendered a **German list on the English page**:

> Himal — inspiriert von Nepals Berglandschaft
> City — basierend auf zeitgenössischem urbanem Leben

And the English list it displaced — Himal / City / Mythic / Logo Essentials, the four collections
— sat in **§03 Research**, three sections above the collection it names, between the interview
paragraph and the market-analysis paragraph. The German §06 had no list at all.

## How

SESSION-027 moved AFONO's figures into the prose and noticed one group had landed *before* the
list naming the four collections. It was fixed "by a rule rather than by hand", which the session
record presented as the careful choice:

```python
FIG  = r"(          \{\n            kind: \"figures\",\n(?:.*\n)+?          \},\n)"
LIST = r"(          \{\n            kind: \"list\",\n(?:.*\n)+?          \},\n)"
re.compile(FIG + LIST).subn(lambda m: m.group(2) + m.group(1), s)
```

**The rule matched on shape and had no idea where it was.** It knew what a `figures` block and a
`list` block look like; it did not know which section, which locale, or which case study it was
standing in. It reported two substitutions, which looked exactly like the two intended ones, and
that number was taken as confirmation.

## Why nothing caught it

Every check was green across both commits:

| Check | Why it missed this |
| --- | --- |
| `tsc`, ESLint | Valid TypeScript. Strings moved; types did not change |
| axe, 196-image sweep, overflow, reveals | All structural. A paragraph in the wrong language renders perfectly |
| `image-manifest.mjs` en/de diff | Compares figure `src` only — and the figures were fine. **Prose is never compared, because prose is supposed to differ between locales** |
| Reading the page | The section was screenshotted. The German list is four short lines in a 6,000px screenshot, and I was looking at the figures I had just placed |

The gap is precise: **the harness verifies that images match across locales and that markup is
sound. Nothing verified that the words are in the right language or in the right section.**

## Fix

Both lists restored to §06 of their own locale, verified by dumping the block sequence of every
section in both locales rather than by reading the diff.

**`scripts/content-audit.mjs` is new, and `predeploy` now runs it.** Two checks:

1. **Wrong-language body blocks** — function words only, since content words are cognates far too
   often in a German design context. List items are tested **individually**: the first version
   joined them, and a German line re-injected among three English ones passed. That version was
   discarded after it failed to catch the very fault it was written for.
2. **`en`/`de` structural parity** — same sections in the same order, and the same sequence of
   block kinds within each. This is what catches a list that exists in one locale and not the
   other, which is the other half of what happened here.

Both were proved by re-injecting each fault and confirming a non-zero exit, then confirming clean.

## The lesson worth keeping

**A transformation matched only by shape will eventually match the wrong instance, and a
substitution count is not verification.** Two replacements were expected and two were reported —
the number agreed while the positions did not. Anchoring to surrounding content, or operating on
one section at a time, would have made the mistake impossible instead of merely unlikely.

## Related

- `SESSION-027` — where it was introduced, and where the rule was described as the careful choice
- `scripts/content-audit.mjs`, `docs/reference/verification.md`
