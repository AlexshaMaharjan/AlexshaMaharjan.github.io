# ISSUE-031 — Sync FM's copy credits the wrong AI tool for its personas

Status: Open
Priority: Low
Category: Content / Accuracy
Discovered: 2026-08-26 (SESSION-021)
Owner decision: yes — this is copy, and `MILESTONE-004` reserves copy for the owner

## What

`caseStudies/sync-fm.ts`, section 03, says in both locales:

> "These personas were generated with **Gemini** and then used as concept-development tools.
> They are therefore labelled as hypothesis personas, not as direct evidence from primary
> user research."

The project documentation's own "Tools und KI" page (`Enddokumentation.pdf`, page 43) says:

> "Wir haben **ChatGPT** und **Gemini** genutzt. Mit **ChatGPT** haben wir **Personas** für
> die App erstellt. […] **Gemini 3 (Nano Banana)** wurde für die erste Logo-Ideen verwendet."

Both tools were used on the project, but for different things: **ChatGPT made the personas,
Gemini made the first logo ideas.** The case study has them the wrong way round.

## Why it is worth fixing rather than ignoring

The sentence exists to *disclose* AI assistance, which is the right instinct and is why the
disclosure is there at all. A disclosure that names the wrong tool is a small thing, but it
is the kind of small thing that undermines the larger claim it is making — and this case
study's strongest section is the one about being honest with users.

The same paragraph is also the only place the site describes the personas, and there is no
persona figure to correct the impression: pages 9–11 of the documentation are running text,
so those three slots stay hatched (`DECISION-016` Amendment 2).

## Fix

One word in each locale, in `src/lib/caseStudies/sync-fm.ts`:

- `en`: "generated with Gemini" → "generated with ChatGPT"
- `de`: the matching phrase in the German object

Left for the owner because `MILESTONE-004` reserves the copy pass, and because they may
prefer to name both tools and what each did.

## Related

- `DECISION-016` Amendment 2 — what the Tools und KI page changed about Sync FM's slots
- `MILESTONE-004` — the copy pass
