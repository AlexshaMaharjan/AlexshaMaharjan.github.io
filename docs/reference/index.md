# Reference Index

Pointers to large documents that already exist outside `docs/`, plus values captured here
because their source is not in version control.

**These are not duplicated into `docs/`.** Read the source file when you need it.

| Document | Where | Size | Read it when… |
| --- | --- | --- | --- |
| `CONTENT_GUIDE.md` | repo root | ~1855 lines | editing **any** copy — it maps every one of ~975 text fields to its exact `file → object.key.path`. §5 (the six case studies) is generated from the data |
| `ROADMAP.md` | repo root | 74 lines | you want the owner's own phased plan (EN content → images → animation → German). `docs/milestones/` is the engineering roadmap; this is the owner's |
| `image_manifest.md` | here | 254 lines | **making images** — every slot on the site with its aspect ratio, export width and the data path that fills it. Generated: `node scripts/image-manifest.mjs --write` |
| `image_files.md` | here | 2.9 KB | working with image *files* — states which PNGs are real and which are colour stand-ins |
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

**Caveat:** it mirrors the code as of its writing. `MILESTONE-003` changed the shape of
`sections[].body[]` in SESSION-003, and §5 was regenerated in the same commit — it is now
produced by `node scripts/content-guide-case-studies.mjs --write` and covers all six
studies in full, where before only WikiMind was listed field by field. Rerun it after any
case-study content or structure change; every other section of the guide is still
maintained by hand.
