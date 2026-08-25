# Image manifest — every slot, and what to make for it

Generated from the content data by `node scripts/image-manifest.mjs --write`. Rerun it
after adding content or dropping images in; the counts below come from the data rather
than from anyone's memory of it.

**136 slots. 7 filled, 129 still empty.**

## How to fill one

1. Export the image, name it something readable (`wikimind-moodboard.png`, not a hash).
2. Drop it in `public/images/`.
3. Add `src` and `alt` at the data path in the last column — **in both the `en` and the
   `de` object**, which are in the same file. Same `src`, translated `alt`.
4. `npm run build`. No code change is needed anywhere.

```
{ aspect: "4/3", caption: "[ moodboard ]", src: "/images/wikimind-moodboard.png", alt: "WikiMind moodboard" }
```

Any slot left empty keeps the hatched placeholder, so the site stays presentable while
the images are made and the two states can mix on a page.

## Sizes

The width column is the rendered width at a 1440px viewport, doubled for retina screens.
Exporting wider than that costs load time and gains nothing — there is no responsive
image pipeline yet (`SUGGESTION-012`), so the file ships at whatever size it is.

Aspect ratios are what the layout reserves. An image at a different ratio is cropped to
fill, from the centre — so keep the subject away from the edges, or change the `aspect`
in the data to match the export.

## Homepage — work grid — 11 slots, 11 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | tile 1: WikiMind | Brand & UI/UX | ≈672×322 | 1300px | `dictionaries/{en,de}.ts → selectedWork.bento[0].src` |
| 2 | tile 2: AFONO | Brand & E-commerce | ≈448×322 | 900px | `dictionaries/{en,de}.ts → selectedWork.bento[1].src` |
| 3 | tile 3: Sync FM | Interaction Design | ≈448×322 | 900px | `dictionaries/{en,de}.ts → selectedWork.bento[2].src` |
| 4 | tile 4: Surugami | Brand & Print | ≈448×322 | 900px | `dictionaries/{en,de}.ts → selectedWork.bento[3].src` |
| 5 | tile 5: QIS Portal | UX Research | ≈672×644 | 1300px | `dictionaries/{en,de}.ts → selectedWork.bento[4].src` |
| 6 | tile 6: Kitchen | Inclusive Design | ≈560×644 | 1100px | `dictionaries/{en,de}.ts → selectedWork.bento[5].src` |
| 7 | tile 7: WikiMind | Web Design | ≈560×322 | 1100px | `dictionaries/{en,de}.ts → selectedWork.bento[6].src` |
| 8 | tile 8: AFONO | Graphic | ≈224×322 | 400px | `dictionaries/{en,de}.ts → selectedWork.bento[7].src` |
| 9 | tile 9: Sync FM | Mobile UI | ≈336×322 | 700px | `dictionaries/{en,de}.ts → selectedWork.bento[8].src` |
| 10 | tile 10: Surugami | Poster & Print | ≈784×322 | 1600px | `dictionaries/{en,de}.ts → selectedWork.bento[9].src` |
| 11 | tile 11: QIS Portal | Product Design | ≈336×322 | 700px | `dictionaries/{en,de}.ts → selectedWork.bento[10].src` |

## Case study — WikiMind — 16 slots, 15 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Placeholder: WikiMind final homepage hero visual | 16/7.5 | 2560px | `caseStudies/wikimind.ts → {en,de}.heroImage.src` |
| 2 | 03 Research | [ competitor analysis ] | 16/8 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[2].images[0].src` |
| 3 | 03 Research | [ persona 01 ] | 3/4 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[2].images[1].src` |
| 4 | 03 Research | [ persona 02 ] | 3/4 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[2].images[2].src` |
| 5 | 03 Research | [ persona 03 ] | 3/4 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[2].images[3].src` |
| 6 | 05 Strategy & identity | [ moodboard ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[4].images[0].src` |
| 7 | 05 Strategy & identity | [ colour + type system ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[4].images[1].src` |
| 8 | 05 Strategy & identity | [ logo sketches ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[4].images[2].src` |
| 9 | 05 Strategy & identity | [ logo variants ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[4].images[3].src` |
| 10 | 05 Strategy & identity | [ mascot development ] | 16/8 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[4].images[4].src` |
| 11 | 06 Structure & system | [ sitemap ] | 16/8 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[5].images[0].src` |
| 12 | 06 Structure & system | [ wireframes ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[5].images[1].src` |
| 13 | 06 Structure & system | [ ui kit ] | 4/3 | 600px | `caseStudies/wikimind.ts → {en,de}.sections[5].images[2].src` |
| 14 | 07 Final outcome | [ final screens — large showcase ] | 16/9 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[6].images[0].src` |
| 15 | 07 Final outcome | [ prototype video ] | 16/10 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[6].images[1].src` |
| 16 | 07 Final outcome | [ interface detail ] | 16/10 | 1900px | `caseStudies/wikimind.ts → {en,de}.sections[6].images[2].src` |

## Case study — AFONO — 15 slots, 14 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Placeholder: AFONO campaign hero visual | 16/7.5 | 2560px | `caseStudies/afono.ts → {en,de}.heroImage.src` |
| 2 | 03 Research | [ interview findings ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[2].images[0].src` |
| 3 | 03 Research | [ market analysis ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[2].images[1].src` |
| 4 | 05 Strategy & identity | [ logo sketches ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[4].images[0].src` |
| 5 | 05 Strategy & identity | [ logo system + colours ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[4].images[1].src` |
| 6 | 06 Collection & e-commerce | [ tee — front ] | 3/4 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[0].src` |
| 7 | 06 Collection & e-commerce | [ tee — back print ] | 3/4 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[1].src` |
| 8 | 06 Collection & e-commerce | [ print development ] | 3/4 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[2].src` |
| 9 | 06 Collection & e-commerce | [ product page ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[3].src` |
| 10 | 06 Collection & e-commerce | [ size finder ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[4].src` |
| 11 | 06 Collection & e-commerce | [ cart ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[5].src` |
| 12 | 06 Collection & e-commerce | [ checkout ] | 4/3 | 600px | `caseStudies/afono.ts → {en,de}.sections[5].images[6].src` |
| 13 | 08 Final outcome | [ final brand system — large showcase ] | 16/9 | 1900px | `caseStudies/afono.ts → {en,de}.sections[7].images[0].src` |
| 14 | 08 Final outcome | [ social media ] | 16/10 | 1900px | `caseStudies/afono.ts → {en,de}.sections[7].images[1].src` |
| 15 | 08 Final outcome | [ e-commerce prototype ] | 16/10 | 1900px | `caseStudies/afono.ts → {en,de}.sections[7].images[2].src` |

## Case study — Sync FM — 12 slots, 11 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Placeholder: Sync FM mobile interface hero visual | 16/7.5 | 2560px | `caseStudies/sync-fm.ts → {en,de}.heroImage.src` |
| 2 | 03 Analysis & personas | [ competitor comparison ] | 16/8 | 1900px | `caseStudies/sync-fm.ts → {en,de}.sections[2].images[0].src` |
| 3 | 03 Analysis & personas | [ persona 01 ] | 3/4 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[2].images[1].src` |
| 4 | 03 Analysis & personas | [ persona 02 ] | 3/4 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[2].images[2].src` |
| 5 | 03 Analysis & personas | [ persona 03 ] | 3/4 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[2].images[3].src` |
| 6 | 05 The three controls | [ sync dial ] | 1/1 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[4].images[0].src` |
| 7 | 05 The three controls | [ mood bar ] | 1/1 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[4].images[1].src` |
| 8 | 05 The three controls | [ opinion filter ] | 1/1 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[4].images[2].src` |
| 9 | 05 The three controls | [ logo + visual system ] | 4/3 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[4].images[3].src` |
| 10 | 05 The three controls | [ components ] | 4/3 | 600px | `caseStudies/sync-fm.ts → {en,de}.sections[4].images[4].src` |
| 11 | 06 Final experience | [ final mobile screens — large showcase ] | 16/9 | 1900px | `caseStudies/sync-fm.ts → {en,de}.sections[5].images[0].src` |
| 12 | 07 Evaluation & ethics | [ ethical-risk diagram ] | 16/8 | 1900px | `caseStudies/sync-fm.ts → {en,de}.sections[6].images[0].src` |

## Case study — Barrier-Free Kitchen — 11 slots, 10 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Final kitchen render, full width | 16/7.5 | 2560px | `caseStudies/barrier-free-kitchen.ts → {en,de}.heroImage.src` |
| 2 | 03 Research | [ kitchen observation ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[2].images[0].src` |
| 3 | 03 Research | [ simulation testing ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[2].images[1].src` |
| 4 | 05 Concept development | [ wooden blocks ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[4].images[0].src` |
| 5 | 05 Concept development | [ lego study ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[4].images[1].src` |
| 6 | 05 Concept development | [ journey map ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[4].images[2].src` |
| 7 | 06 Full-scale testing | [ full-scale prototype ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[5].images[0].src` |
| 8 | 06 Full-scale testing | [ testing session ] | 4/3 | 600px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[5].images[1].src` |
| 9 | 07 Principles & outcome | [ blender environment + animation — large showcase ] | 16/9 | 1900px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[6].images[0].src` |
| 10 | 07 Principles & outcome | [ 3d model process ] | 16/10 | 1900px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[6].images[1].src` |
| 11 | 07 Principles & outcome | [ materials + textures ] | 16/10 | 1900px | `caseStudies/barrier-free-kitchen.ts → {en,de}.sections[6].images[2].src` |

## Case study — Surugami — 11 slots, 10 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Surugami poster and identity hero visual, full width | 16/7.5 | 2560px | `caseStudies/surugami.ts → {en,de}.heroImage.src` |
| 2 | 03 Research | [ research board ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[2].images[0].src` |
| 3 | 03 Research | [ concept map ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[2].images[1].src` |
| 4 | 05 Concept & identity | [ logo exploration ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[4].images[0].src` |
| 5 | 05 Concept & identity | [ illustration — by alexsha ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[4].images[1].src` |
| 6 | 06 Print & website | [ poster — by alexsha ] | 3/4 | 600px | `caseStudies/surugami.ts → {en,de}.sections[5].images[0].src` |
| 7 | 06 Print & website | [ posters — team credit ] | 3/4 | 600px | `caseStudies/surugami.ts → {en,de}.sections[5].images[1].src` |
| 8 | 06 Print & website | [ flyer + banner ] | 3/4 | 600px | `caseStudies/surugami.ts → {en,de}.sections[5].images[2].src` |
| 9 | 06 Print & website | [ sitemap + wireframes ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[5].images[3].src` |
| 10 | 06 Print & website | [ website — co-designed ] | 4/3 | 600px | `caseStudies/surugami.ts → {en,de}.sections[5].images[4].src` |
| 11 | 08 Final outcome | [ final system — large showcase ] | 16/9 | 1900px | `caseStudies/surugami.ts → {en,de}.sections[7].images[0].src` |

## Case study — QIS Portal Redesign — 12 slots, 11 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | hero | Redesigned QIS dashboard, full width | 16/7.5 | 2560px | `caseStudies/qis-portal.ts → {en,de}.heroImage.src` |
| 2 | 01 Overview | [ original portal — before ] | 16/8 | 1900px | `caseStudies/qis-portal.ts → {en,de}.sections[0].images[0].src` |
| 3 | 03 Research | [ survey 01 — 150 responses ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[2].images[0].src` |
| 4 | 03 Research | [ survey 02 — 137 responses ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[2].images[1].src` |
| 5 | 05 Information architecture | [ 21-page structure ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[4].images[0].src` |
| 6 | 05 Information architecture | [ 14-page structure ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[4].images[1].src` |
| 7 | 05 Information architecture | [ paper prototypes ] | 16/8 | 1900px | `caseStudies/qis-portal.ts → {en,de}.sections[4].images[2].src` |
| 8 | 06 Usability testing | [ original hi-fi screens ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[5].images[0].src` |
| 9 | 06 Usability testing | [ sus chart — 77.5–100 ] | 4/3 | 600px | `caseStudies/qis-portal.ts → {en,de}.sections[5].images[1].src` |
| 10 | 08 Final outcome | [ new dashboard — large showcase ] | 16/9 | 1900px | `caseStudies/qis-portal.ts → {en,de}.sections[7].images[0].src` |
| 11 | 08 Final outcome | [ mobile redesign ] | 16/10 | 1900px | `caseStudies/qis-portal.ts → {en,de}.sections[7].images[1].src` |
| 12 | 08 Final outcome | [ before / after ] | 16/10 | 1900px | `caseStudies/qis-portal.ts → {en,de}.sections[7].images[2].src` |

## About — 9 slots, 8 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| ✅ | portrait | Portrait of Alexsha. | 4/5 | 1720px | `dictionaries/{en,de}.ts → (portrait file is wired; needs a real export)` |
| 2 | carousel | drawing | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[0].src` |
| 3 | carousel | painting | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[1].src` |
| 4 | carousel | crafting | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[2].src` |
| 5 | carousel | beadwork | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[3].src` |
| 6 | carousel | photography | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[4].src` |
| 7 | carousel | travel | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[5].src` |
| 8 | carousel | handmade objects | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[6].src` |
| 9 | carousel | personal experiments | 4/5 | 500px | `dictionaries/{en,de}.ts → about.carouselItems[7].src` |

## Playground — home — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | hero collage | digital portrait | 4/5 | 600px | `playground/home.ts → {en,de}.heroCards[0].src` |
| 2 | hero collage | beadwork object | 4/3 | 600px | `playground/home.ts → {en,de}.heroCards[1].src` |
| 3 | featured | Motorbike Study | 16/10 | 700px | `playground/home.ts → {en,de}.featured[0].src` |
| 4 | featured | Bead & Plant Objects | 16/10 | 700px | `playground/home.ts → {en,de}.featured[1].src` |
| 5 | featured | Hibi | 16/10 | 700px | `playground/home.ts → {en,de}.featured[2].src` |

## Playground — Digital Drawings and Portraits — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | Digital portraits | 4/5 | 600px | `playground/categories/digital-art.ts → {en,de}.items[0].src` |
| 2 | card | Character studies | 4/3 | 600px | `playground/categories/digital-art.ts → {en,de}.items[1].src` |
| 3 | card | Illustration experiments | 3/4 | 600px | `playground/categories/digital-art.ts → {en,de}.items[2].src` |
| 4 | card | Colour studies | 4/3 | 600px | `playground/categories/digital-art.ts → {en,de}.items[3].src` |
| 5 | card | Personal drawings | 16/10 | 600px | `playground/categories/digital-art.ts → {en,de}.items[4].src` |

## Playground — Handmade and Bead Crafts — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | Bead crafts | 4/5 | 600px | `playground/categories/crafts.ts → {en,de}.items[0].src` |
| 2 | card | Plant-inspired objects | 4/3 | 600px | `playground/categories/crafts.ts → {en,de}.items[1].src` |
| 3 | card | Handmade decorations | 3/4 | 600px | `playground/categories/crafts.ts → {en,de}.items[2].src` |
| 4 | card | Material experiments | 4/3 | 600px | `playground/categories/crafts.ts → {en,de}.items[3].src` |
| 5 | card | Small physical objects | 16/10 | 600px | `playground/categories/crafts.ts → {en,de}.items[4].src` |

## Playground — Calendars and Editorial Experiments — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | Calendar designs | 4/5 | 600px | `playground/categories/editorial.ts → {en,de}.items[0].src` |
| 2 | card | Typographic layouts | 4/3 | 600px | `playground/categories/editorial.ts → {en,de}.items[1].src` |
| 3 | card | Print compositions | 3/4 | 600px | `playground/categories/editorial.ts → {en,de}.items[2].src` |
| 4 | card | Grid experiments | 4/3 | 600px | `playground/categories/editorial.ts → {en,de}.items[3].src` |
| 5 | card | Editorial studies | 16/10 | 600px | `playground/categories/editorial.ts → {en,de}.items[4].src` |

## Playground — Graphic and Logo Experiments — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | Posters | 4/5 | 600px | `playground/categories/graphic-experiments.ts → {en,de}.items[0].src` |
| 2 | card | Logo studies | 4/3 | 600px | `playground/categories/graphic-experiments.ts → {en,de}.items[1].src` |
| 3 | card | Identity concepts | 3/4 | 600px | `playground/categories/graphic-experiments.ts → {en,de}.items[2].src` |
| 4 | card | Typography experiments | 4/3 | 600px | `playground/categories/graphic-experiments.ts → {en,de}.items[3].src` |
| 5 | card | Unused directions | 16/10 | 600px | `playground/categories/graphic-experiments.ts → {en,de}.items[4].src` |

## Playground — 3D and Motion — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | 3D motorbike | 4/5 | 600px | `playground/categories/3d-motion.ts → {en,de}.items[0].src` |
| 2 | card | Blender experiments | 4/3 | 600px | `playground/categories/3d-motion.ts → {en,de}.items[1].src` |
| 3 | card | Unreal animation | 3/4 | 600px | `playground/categories/3d-motion.ts → {en,de}.items[2].src` |
| 4 | card | After Effects compositions | 4/3 | 600px | `playground/categories/3d-motion.ts → {en,de}.items[3].src` |
| 5 | card | Motion studies | 16/10 | 600px | `playground/categories/3d-motion.ts → {en,de}.items[4].src` |

## Playground — Games and Interactive Experiments — 5 slots, 5 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | card | Unity game | 4/5 | 600px | `playground/categories/interactive.ts → {en,de}.items[0].src` |
| 2 | card | Hibi application | 4/3 | 600px | `playground/categories/interactive.ts → {en,de}.items[1].src` |
| 3 | card | NetBeans student planner | 3/4 | 600px | `playground/categories/interactive.ts → {en,de}.items[2].src` |
| 4 | card | Small prototypes | 4/3 | 600px | `playground/categories/interactive.ts → {en,de}.items[3].src` |
| 5 | card | Code-based experiments | 16/10 | 600px | `playground/categories/interactive.ts → {en,de}.items[4].src` |

## Playground — Motorbike Study — 4 slots, 4 empty

| # | Where | Caption / subject | Aspect | Export width | Data path |
| --- | --- | --- | --- | --- | --- |
| 1 | main | final render — studio lighting setup | 16/9 | 1900px | `playground/projects/motorbike-study.ts → {en,de}.mainSrc` |
| 2 | process | blockout in Blender | 4/3 | 600px | `playground/projects/motorbike-study.ts → {en,de}.processItems[0].src` |
| 3 | process | material + lighting tests | 4/3 | 600px | `playground/projects/motorbike-study.ts → {en,de}.processItems[1].src` |
| 4 | process | camera move in Unreal | 4/3 | 600px | `playground/projects/motorbike-study.ts → {en,de}.processItems[2].src` |

## Also worth replacing

`docs/reference/image_files.md` lists five files that are wired up but are solid-colour
stand-ins, not photographs — four case-study heroes and the portrait. Dropping a real
export in with **the same filename** replaces them with no data change at all.
