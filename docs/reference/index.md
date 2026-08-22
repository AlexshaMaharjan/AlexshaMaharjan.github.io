# Reference Index

Pointers to large documents that already exist outside `docs/`, plus values captured here
because their source is not in version control.

**These are not duplicated into `docs/`.** Read the source file when you need it.

| Document | Where | Size | Read it when… |
| --- | --- | --- | --- |
| `CONTENT_GUIDE.md` | repo root | 1355 lines | editing **any** copy — it maps every one of ~975 text fields to its exact `file → object.key.path` |
| `ROADMAP.md` | repo root | 74 lines | you want the owner's own phased plan (EN content → images → animation → German). `docs/milestones/` is the engineering roadmap; this is the owner's |
| `public/images/MANIFEST.md` | `public/images/` | 2.9 KB | working with images — states which PNGs are real and which are colour stand-ins |
| `design-reference/SPEC.md` | **gitignored** | 439 lines | implementing or changing any layout — the condensed, authoritative implementation spec |
| `design-reference/master-prompt.md` | **gitignored** | 5095 lines | you need original design intent that SPEC.md compressed away |
| `design-reference/pages/*.dc.html` | **gitignored** | 16 files | you need the exact coded design for one page. `Playground.dc.html` (101 KB) and `Portfolio Home.dc.html` are the largest and most detailed |
| `design_tokens.md` | here | — | you need the design values and `design-reference/` is unavailable |

## Important: `design-reference/` is not in version control

`.gitignore` excludes it. The authoritative visual source for this project exists **only
on this machine**. If a session cannot find it, fall back to `design_tokens.md` and the
existing implementation, and tell the owner it is missing.

## How to use `CONTENT_GUIDE.md`

Each entry carries a label like `[src/lib/caseStudies/wikimind.ts → wikimind.en.sections[3].insights[1].body]`
followed by `EN:` and `DE:` values. The label must stay intact; only the text after the
locale marker changes. Array indices are explicit, so "the second insight in the key-insights
section" maps to exactly one line.

**Caveat:** it mirrors the code as of its writing. `MILESTONE-003` changes the shape of
`sections[].body[]`, which invalidates every `body[n]` index in §5 — regenerate the guide
in the same session that changes the model, or it will actively mislead the next one.
