# Codebase — Assets (`public/`)

Everything here is served verbatim at the site root; there is no processing step.

```
public/
├── _redirects                 /*  /index.html  200      (Netlify SPA rewrite)
├── favicon.svg
├── robots.txt                 User-agent: *  /  Allow: /
└── images/
    ├── MANIFEST.md            which PNGs are real vs solid-colour stand-ins
    └── 16 PNGs                868 KB total
```

## Image status (from `MANIFEST.md`, verified against `src/`)

| Group | Count | Note |
| --- | --- | --- |
| Real exports, wired up | 2 | `frame-6-…-dh8i.png` (Kitchen hero), `screenshot-2026-07-07-…-d1vc.png` (QIS hero) |
| Solid-colour stand-ins, wired up | 5 | portrait, WikiMind, AFONO, Surugami, Sync FM heroes |
| Unused files | 9 | no page references them; owner decision pending |

Stand-ins are correct-dimension flat colour blocks generated when the original exports
exceeded a 256 KiB fetch cap. **Dropping a real export in under the same filename fixes
them with zero code change.**

Filenames are opaque design-tool hashes. Consider renaming when real exports land (this
requires editing the `src` strings in `src/lib/**`).

## The ~115 slots with no file at all

Case-study `sections[].images[]` (71), About `carouselItems[]` (8) and every playground
`PlaygroundItem` (36) render `PlaceholderImage` because their types carry no `src`.
Attaching real photos requires a type + call-site change — `ISSUE-007`,
`SUGGESTION-002`. `CONTENT_GUIDE.md` §10.4 enumerates every slot with its caption.

## Missing entirely

- No `og:image` that is a real photograph (`index.html` points at the stand-in portrait).
- No `sitemap.xml`.
- No résumé PDF — `/resume` relies on `window.print()`.
- No apple-touch-icon / web manifest.

## Related

`ARCH-05`. Issues: `ISSUE-006`, `ISSUE-007`.
