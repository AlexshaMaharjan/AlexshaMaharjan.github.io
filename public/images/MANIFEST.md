# Image asset manifest

Fetched from Claude Design project `363b7dcd-0f5f-4a96-a43e-0f894e0eca6d` via the DesignSync MCP tool.

`DesignSync.get_file` caps binary reads at 256 KiB of base64 (196,608 decoded bytes). Files whose real
size exceeds that come back truncated (no PNG IEND chunk). For those, this pass extracted the true
width/height from the intact PNG IHDR chunk (always the first 24 bytes, unaffected by truncation) and
generated a solid-color placeholder PNG at the exact same dimensions, so it drops into the layout with
correct aspect ratio and can be swapped 1:1 later with a properly exported file.

Placeholder fill colors follow the site's near-black / cool-grey palette (Part B of the design spec):
- `#0A0A0A` near-black — used for portrait/process imagery
- `#F2F3F5` soft neutral surface — used for product/UI screenshots and mockups
- `#EAECF0` secondary neutral surface — default fallback

## Status

| File | Status | Dimensions | Notes |
|---|---|---|---|
| `alexsha_photo-mrx9hbwx-nif2.png` | **PLACEHOLDER** | 1720x2150 | Portrait — needs full-res re-export |
| `1-ms52o75m-suju.png` | **PLACEHOLDER** | 2000x1414 | User persona worksheet |
| `1-ms52okpl-ih7m.png` | **PLACEHOLDER** | 2000x1414 | User persona worksheet (variant) |
| `frame-6-mrtp0czu-dh8i.png` | REAL | 3314x4080 | Fetched complete (62.7KB) |
| `wikimind-mrx9dhfo-12ys.png` | **PLACEHOLDER** | 5000x3750 | WikiMind render |
| `shop-page-1-mrtp117j-zqqp.png` | **PLACEHOLDER** | 2845x3446 | Shop mockup |
| `chatgpt-image-jul-23-2026-10_31_15-am-ms50alwm-za74.png` | **PLACEHOLDER** | 1586x992 | Generated concept image |
| `chatgpt-image-jul-23-2026-10_31_15-am-ms50aulw-veww.png` | **PLACEHOLDER** | 1586x992 | Generated concept image (variant) |
| `frame-12-mru7pfow-5une.png` | **PLACEHOLDER** | 6788x5802 | Large frame export |
| `frame-4-mru7tnm2-f2iw.png` | **PLACEHOLDER** | 3314x13874 | Tall/scrolling frame export |
| `free-website-presentation-mockup-psd-mrx9j5rn-m2tk.png` | **PLACEHOLDER** | 5000x3750 | Presentation mockup |
| `pasted-1785267656651-0-ms529o1j-bqw0.png` | **PLACEHOLDER** | 610x348 | Small screenshot — fetched complete via MCP but corrupted during manual transcription into a local file; re-export recommended (low priority, small size) |
| `screenshot-2026-01-28-at-01-04-52-mru7sx1g-zyn4.png` | **PLACEHOLDER** | 1752x1132 | Screenshot |
| `screenshot-2026-07-07-at-15-29-39-ms52mvv5-d1vc.png` | REAL | 744x1010 | Fetched complete (143.5KB) |
| `wikimind-mrx9e7jv-nohq.png` | **PLACEHOLDER** | 5000x3750 | WikiMind render (variant) |
| `wikimind-ms50cpky-tw1a.png` | **PLACEHOLDER** | 5000x3750 | WikiMind render (variant) |

**2 of 16 real, 14 of 16 placeholder.**

## To finish this later

Export each placeholder file at full resolution from the claude.ai/design project and drop it into this
folder with the exact same filename — no code changes needed, `next/image` will pick up the real asset.
