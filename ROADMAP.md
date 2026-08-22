# Roadmap — getting this portfolio finished

You're overwhelmed because there's a lot of surface area (6 case studies, About, Playground,
images, animations, two languages) and it's been living in your head as one big undifferentiated
pile. This file breaks it into an order. Check things off as we go.

Reference: `CONTENT_GUIDE.md` (same folder) lists every text field and every image slot with its
exact source location — this roadmap is the *order* to work through that file in, not a
replacement for it.

## Phase 1 — English content

Work through these **in order**, one at a time. For each: Claude asks specific questions about
what actually happened on the project, drafts copy from the real answers, you react (yes / no /
tweak) — you are not expected to write drafts yourself.

- [ ] Home page — hero heading + intro line
- [ ] About page — bio, focus areas, tools, AI-use blurb
- [ ] Case study: WikiMind
- [ ] Case study: AFONO
- [ ] Case study: Sync FM
- [ ] Case study: Barrier-Free Kitchen
- [ ] Case study: Surugami
- [ ] Case study: QIS Portal
- [ ] Playground — home intro + each category blurb

(Résumé content is already done from an earlier session — real content, not placeholder.)

## Phase 2 — Images

- [ ] About portrait — real photo (phone camera is fine, good lighting, plain-ish background)
- [ ] Case study hero + section images — export from your actual project files (Figma, Blender
      renders, print layouts, etc.) per project; see `CONTENT_GUIDE.md` §5 and §10 for the exact
      list of slots per case study
- [ ] Playground carousel photos (drawing / painting / crafts / beadwork / photography / travel /
      handmade objects / personal experiments) — phone photos of the real things
- [ ] Decide what to do with the 9 unused files already sitting in `public/images/` (delete, or
      are any of these meant to be used somewhere and just never got wired up?)

Hand off files however's easiest (drag into chat, or tell Claude a folder path) — resizing,
compression, and format conversion happen on Claude's end, not something you need a tool for.

## Phase 3 — Animation polish

Baseline scroll-reveal is already live (GSAP, respects reduced-motion). Once content/images are
real, revisit:
- [ ] Page transitions between routes
- [ ] Process canvas easing refinement
- [ ] Playground marquee hover/drag polish

## Phase 4 — German

- [ ] Full German pass once English is finalized across every page above (Claude translates
      directly; no ChatGPT/DeepL round-trip needed unless you want a native-speaker sanity check)

## Known open questions (from CONTENT_GUIDE.md)

- [ ] `nav.switchToGerman` and the About page hand-drawn note labels look untranslated in `de.ts`
      — confirm and fix during Phase 4
- [ ] Afono's `heroDisclosure` may be missing a German version — confirm during Phase 4
