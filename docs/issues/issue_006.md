# ISSUE-006 — Wired-up images that are solid-colour stand-ins

Status: **Mostly resolved** — one stand-in left (the About portrait) plus the `og:image`
Priority: High
Category: Content / Assets
Discovered: 2026-08-22 (documented earlier in `docs/reference/image_files.md`)
Last reviewed: 2026-08-25 (SESSION-020)

## Where this stands (2026-08-25)

The body below describes 2026-08-22 and is kept as the record of what was found. Four
sessions have changed most of it:

| Then | Now |
| --- | --- |
| 4 of 6 case-study heroes were colour blocks | **All six are real**, from the owner's documentations (SESSION-016) |
| 3 alt strings began "Placeholder: " | Gone from the case studies (SESSION-016). Eight remain in `about.carouselItems` in both dictionaries — those slots have no `src`, so nothing is read aloud today, but they must not gain one while the string says that |
| The Sync FM hero | English was fixed in SESSION-016; **German was missed and still pointed at the 6.9 KB stand-in until SESSION-020**. `scripts/image-manifest.mjs` now diffs `en` against `de` and exits non-zero, because no browser-side check can see this |
| 9 unused PNGs | **15**, 817 KB, still shipping — the count keeps rising as replaced files are orphaned. Needs the owner's yes to delete |
| The About portrait | **Still a stand-in.** `alexsha_photo-mrx9hbwx-nif2.png`, 14 KB at 1720×2150, on `/about` and the homepage. Needs a photograph; nothing in the documentations substitutes |
| `og:image` | Still absent, so every shared link previews as a blank rectangle. **Not a crop** — a designed 1200×630 card. The single highest-visibility item left in `MILESTONE-005` |

What is left is exactly the part that needs the owner: **a photograph of them, and an
approved `og:image`.** Neither can be extracted from a project documentation.

---

## Summary

Of the seven image slots that have a working `<img>` tag, only two contain a real
picture. The other five — including the portrait of the site's owner and four of the six
case-study heroes — are flat colour blocks at the correct dimensions.

## Evidence / Current Behavior

Per `docs/reference/image_files.md`, cross-checked against `src/`:

| File | Status | Used by |
| --- | --- | --- |
| `frame-6-mrtp0czu-dh8i.png` | real, 62.7 KB | Barrier-Free Kitchen hero |
| `screenshot-2026-07-07-…-d1vc.png` | real, 143.5 KB | QIS Portal hero |
| `alexsha_photo-mrx9hbwx-nif2.png` | **stand-in**, 14 KB / 1720×2150 | About + homepage portrait |
| `wikimind-mrx9dhfo-12ys.png` | **stand-in**, 63 KB / 5000×3750 | WikiMind hero |
| `shop-page-1-mrtp117j-zqqp.png` | **stand-in**, 36 KB / 2845×3446 | AFONO hero |
| `1-ms52o75m-suju.png` | **stand-in**, 11.6 KB / 2000×1414 | Surugami hero |
| `chatgpt-image-…-ms50alwm-za74.png` | **stand-in**, 6.9 KB / 1586×992 | Sync FM hero |

Three of the stand-ins also carry alt text that literally begins "Placeholder: "
(`wikimind.ts:20`, `afono.ts:22`, `sync-fm.ts:20`) — that string is read aloud by screen
readers today.

Nine further PNGs sit unused in `public/images/`.

## Expected Behavior

Every wired-up slot shows the real exported artwork, with descriptive alt text.

## Relevant Files

- `public/images/` + `docs/reference/image_files.md`
- `src/lib/caseStudies/{wikimind,afono,sync-fm,surugami}.ts` → `heroImage`
- `src/lib/dictionaries/{en,de}.ts` → `projects[].image` / `imageAlt`
- `src/pages/About.tsx:39`, `src/components/AboutPreview.tsx:18`

## Possible Cause

Assets were pulled from a design tool whose single-file read cap truncated large exports;
same-size colour placeholders were generated so layouts stayed correct.

## Possible Solution

Owner exports the five real files and drops them in under the **same filenames** — no
code change needed. Then fix the three "Placeholder: …" alt strings, and decide what to do
with the nine unused files (`ROADMAP.md` Phase 2 already asks this).

## Dependencies

Requires owner-supplied assets. Blocks `ISSUE-004` from looking finished.

## Related

`ARCH-05`, `MILESTONE-005`, `ISSUE-007`, `ROADMAP.md` Phase 2.
