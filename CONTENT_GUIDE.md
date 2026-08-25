# Content Guide — Alexsha Maharjan Portfolio

This file lists every piece of editable text and every image (real or placeholder) on the
site, with its exact source location, so edits can be applied precisely — including by
pasting sections of this file into an AI assistant and asking it to rewrite the copy.

## How to use this file

- Every text entry is labeled `[file path → object.key.path]`. **That label must stay
  intact** — only the text after `EN:` / `DE:` should change. If you (or an AI) are
  editing, quote the label back so whoever applies the edit knows exactly which field in
  which file to change.
- This file **mirrors** the real source files. Edits here don't change the live site by
  themselves — they need to be copied into:
  - `src/lib/dictionaries/en.ts` and `src/lib/dictionaries/de.ts` — all site-wide copy
    (navigation, home page, about, résumé, footer, 404, and the shared case-study/
    playground UI labels).
  - `src/lib/caseStudies/*.ts` — one file per project (`wikimind.ts`, `afono.ts`,
    `sync-fm.ts`, `barrier-free-kitchen.ts`, `surugami.ts`, `qis-portal.ts`), each
    containing both the `en` and `de` version of that case study.
  - `src/lib/playground/home.ts`, `src/lib/playground/categories/*.ts` (6 files),
    `src/lib/playground/projects/motorbike-study.ts`.
  - Do **not** edit copy inside `src/components/**` or `src/pages/**` — those files only
    read from the data files above. (The one documented exception is a handful of
    decorative labels baked directly into components — see "Text that lives outside the
    data files" near the end.)
- Array items (bullet lists, biography paragraphs, tags, skills, education entries,
  etc.) are numbered `[0]`, `[1]`, `[2]`… so "change bullet 2 of the WikiMind research
  section" maps to exactly one line. Index `[0]` is the first item.
- Image entries use a different format (see "Images" below) and tell you whether a real
  photo exists, whether the current file is a genuine photo or a same-size solid-color
  stand-in, or whether there's no image mechanism there at all yet (a caption-only
  placeholder box).
- The site is bilingual (EN default, DE at `/de/...`). Every text field always has both
  an EN and a DE version — when you ask an AI to rewrite something, ask it to update
  both, or explicitly say "English only, I'll translate the German myself."

---

## 1. Header / Navigation

`[src/lib/dictionaries/en.ts / de.ts → nav.*]`

| Key | EN | DE |
|---|---|---|
| `nav.portfolio` | "Portfolio" | "Portfolio" |
| `nav.playground` | "Playground" | "Playground" |
| `nav.projects` | "Projects" | "Projekte" |
| `nav.about` | "About" | "Über mich" |
| `nav.contact` | "Contact" | "Kontakt" |
| `nav.menu` | "Menu" | "Menü" |
| `nav.close` | "Close" | "Schließen" |
| `nav.modeSwitchLabel` | "Site mode" (aria-label only, not visible) | "Ansichtsmodus" |
| `nav.switchToGerman` | "Switch to German" (aria-label only) | "Switch to German" *(note: DE copy is still in English here — likely unintentional, worth fixing)* |
| `nav.switchToEnglish` | "Switch to English" (aria-label only) | "Zu Englisch wechseln" |

---

## 2. Home page

### 2.1 Hero

`[src/lib/dictionaries/en.ts / de.ts → hero.*]`

```
### hero.eyebrow
EN: "Digital Designer from Lübeck, Germany"
DE: "Digital Designerin aus Lübeck, Deutschland"

### hero.headlineLines[0]
EN: "Designing intuitive"
DE: "Intuitive digitale"

### hero.headlineLines[1]
EN: "digital experiences and"
DE: "Erlebnisse und einzigartige"

### hero.headlineLines[2]
EN: "unique brands"
DE: "Marken gestalten"
```
(These three lines render stacked as separate lines in the big hero heading — they must
stay short. EN and DE don't translate line-by-line 1:1 because the grammar reorders; keep
each language's set of 3 lines self-consistent rather than translating literally line by line.)

```
### hero.intro
EN: "I blend thoughtful design with intuitive usability, creating modern digital experiences and meaningful brand identities that connect with people and solve real user challenges."
DE: "Ich verbinde durchdachtes Design mit intuitiver Usability, entwickle moderne digitale Erlebnisse und schaffe bedeutungsvolle Markenidentitäten, die Menschen verbinden und echte Nutzerprobleme lösen."

### hero.tags
EN: "UI/UX · Branding · Visual Design"
DE: "UI/UX · Branding · Visual Design"
```

### 2.2 Process section ("How do I bring a project to life?")

`[src/lib/dictionaries/en.ts / de.ts → process.*]`

```
### process.label
EN: "My process"
DE: "Mein Prozess"

### process.scrollCue
EN: "Scroll to explore ↓"
DE: "Scrollen zum Entdecken ↓"

### process.question  (the big centered heading on the black canvas)
EN: "How do I bring a project to life?"
DE: "Wie bringe ich ein Projekt zum Leben?"

### process.srSummary  (screen-reader-only summary, not visible)
EN: "My process, in five steps: understand what feels unclear to people, define what is worth solving, explore possibilities through sketches and wireframes, design how the experience should feel, and refine it through testing and iteration."
DE: "Mein Prozess in fünf Schritten: verstehen, was Menschen unklar ist, definieren, was es wert ist, gelöst zu werden, Möglichkeiten durch Skizzen und Wireframes erkunden, gestalten, wie sich das Erlebnis anfühlen soll, und verfeinern durch Tests und Iteration."

### process.closeSelection  (aria-label on the "✕" close button of an expanded step)
EN: "Close selection"
DE: "Auswahl schließen"
```

The five process steps — `process.branches[0]` through `process.branches[4]`:

```
### process.branches[0]  (step 01)
number: "01"
title — EN: "Understand" | DE: "Verstehen"
question — EN: "What feels unclear to people?" | DE: "Was fühlt sich für Menschen unklar an?"
ariaLabel — EN: "Step 1: Understand. What feels unclear to people? Interviews, SWOT market analysis and frustration ratings."
           DE: "Schritt 1: Verstehen. Was fühlt sich für Menschen unklar an? Interviews, SWOT-Marktanalyse und Frustrationswerte."

### process.branches[1]  (step 02)
title — EN: "Define" | DE: "Definieren"
question — EN: "What is actually worth solving?" | DE: "Was ist es wirklich wert, gelöst zu werden?"
ariaLabel — EN: "Step 2: Define. What is actually worth solving? Impact and effort, opportunity statement, success criteria."
           DE: "Schritt 2: Definieren. Was ist es wirklich wert, gelöst zu werden? Wirkung und Aufwand, Chancen-Statement, Erfolgskriterien."

### process.branches[2]  (step 03)
title — EN: "Explore" | DE: "Erkunden"
question — EN: "How can I make possibilities visible?" | DE: "Wie mache ich Möglichkeiten sichtbar?"
ariaLabel — EN: "Step 3: Explore. How can I make possibilities visible? Sitemaps, sketches and concept directions."
           DE: "Schritt 3: Erkunden. Wie mache ich Möglichkeiten sichtbar? Sitemaps, Skizzen und Konzeptrichtungen."

### process.branches[3]  (step 04)
title — EN: "Design" | DE: "Gestalten"
question — EN: "What should the experience feel like?" | DE: "Wie soll sich das Erlebnis anfühlen?"
ariaLabel — EN: "Step 4: Design. What should the experience feel like? Type, colour, components and brand applications."
           DE: "Schritt 4: Gestalten. Wie soll sich das Erlebnis anfühlen? Typografie, Farbe, Komponenten und Markenanwendungen."

### process.branches[4]  (step 05)
title — EN: "Refine" | DE: "Verfeinern"
question — EN: "How do I know it works?" | DE: "Woran erkenne ich, dass es funktioniert?"
ariaLabel — EN: "Step 5: Refine. How do I know it works? Before and after, usability testing, validation and iteration."
           DE: "Schritt 5: Verfeinern. Woran erkenne ich, dass es funktioniert? Vorher-Nachher, Usability-Tests, Validierung und Iteration."
```

> ⚠️ **Not editable from the data files:** each of the 5 steps also shows a cluster of
> small decorative mini-cards when expanded (e.g. step 01 shows a hand-drawn "SWOT"
> card, a sticky-note quote "I just want something that actually works for me.", a
> "Frustration rating" bar chart; step 04 shows "Aa" type specimen, colour swatches,
> "All your work, clear and calm." mock UI copy, etc.). These are hard-coded as JSX in
> `src/components/process/clusters.tsx` (one function per step: `Cluster1`…`Cluster5`),
> not sourced from the dictionary, and are **not translated** for German (same English
> text shows on both locales). Changing them requires editing that component file
> directly — flag any specific line you want changed and it can be done, but it can't be
> done by editing this content guide's data-file entries.

### 2.3 Selected Work section

`[src/lib/dictionaries/en.ts / de.ts → selectedWork.*]`

```
### selectedWork.eyebrow
EN: "Selected Projects" | DE: "Ausgewählte Projekte"

### selectedWork.heading
EN: "Thoughtful design, meaningful impact"
DE: "Durchdachtes Design, bedeutungsvolle Wirkung"

### selectedWork.copy
EN: "My work focuses on creating visual identities and digital experiences that are clear, engaging, and purposeful. From brand systems to user interfaces and experimental projects, I explore how design can communicate ideas, solve problems, and create better experiences for users."
DE: "Meine Arbeit konzentriert sich auf die Entwicklung visueller Identitäten und digitaler Erlebnisse, die klar, ansprechend und zielgerichtet sind. Von Markensystemen über User Interfaces bis hin zu experimentellen Projekten erforsche ich, wie Design Ideen vermittelt, Probleme löst und bessere Erlebnisse für Nutzer schafft."

### selectedWork.viewCaseStudy
EN: "View case study →" | DE: "Fallstudie ansehen →"

### selectedWork.projectLabel
EN: "Project" | DE: "Projekt"  (used as generic label, e.g. in aria text)
```

The 6 project cards shown here (2 large "featured" cards + 4 grid cards) — `[…dictionaries → projects[0..5]]`:

```
### projects[0] — WikiMind
slug: "wikimind"  (do not change — it's the URL /work/wikimind)
projectTag — EN: "Project-01" | DE: "Projekt-01"
name: "WikiMind"  (same both languages)
headline — EN: "Making artificial intelligence feel clear, useful and approachable."
          DE: "Künstliche Intelligenz klar, nützlich und zugänglich gestalten."
description — EN: "Making complex AI services easier to understand through an approachable identity and a clearly structured website."
             DE: "Komplexe KI-Leistungen durch eine zugängliche Markenidentität und eine klar strukturierte Website verständlicher machen."
tags[0..2]: "Branding" / "UI/UX" / "Web Design"  (same both languages)
role — EN: "Brand & UI/UX Designer" | DE: "Brand & UI/UX Designerin"
year: "2026"
placeholderLabel (mono caption shown if no image) — EN: "[ wikimind — final homepage ]" | DE: "[ wikimind — finale startseite ]"
imageAlt — EN: "WikiMind final homepage" | DE: "WikiMind Startseite"
imageAspect: "16/8.4"  (layout value, not really "content")
featured: true

### projects[1] — AFONO
slug: "afono"
projectTag — EN: "Project-02" | DE: "Projekt-02"
name: "AFONO"
headline — EN: "Translating Nepali identity into contemporary streetwear."
          DE: "Nepalesische Identität in moderne Streetwear übersetzen."
description — EN: "A culturally rooted streetwear identity connecting brand strategy, clothing graphics and e-commerce design."
             DE: "Eine kulturell verwurzelte Streetwear-Identität, die Markenstrategie, Bekleidungsgrafik und E-Commerce-Design verbindet."
tags[0..2]: "Branding" / "E-commerce" / "Graphic Design"
role — EN: "Brand, Fashion & UI/UX Designer" | DE: "Brand-, Fashion- & UI/UX-Designerin"
year: "2026"
placeholderLabel — EN: "[ afono — campaign hero ]" | DE: "[ afono — kampagnen-hero ]"
imageAlt — EN: "AFONO campaign hero" | DE: "AFONO Kampagnen-Hero"
imageAspect: "16/8.4"
featured: true

### projects[2] — Sync FM
slug: "sync-fm"
projectTag — EN/DE: "Project-03" / "Projekt-03"
name: "Sync FM"
headline — EN: "Giving listeners control without turning radio into another dashboard."
          DE: "Hörerinnen und Hörern Kontrolle geben, ohne Radio in ein weiteres Dashboard zu verwandeln."
description — EN: "An interactive AI-radio concept that lets listeners shape information depth, presenter tone and journalistic framing."
             DE: "Ein interaktives KI-Radio, mit dem Nutzer Informationstiefe, Moderationston und journalistische Einordnung steuern können."
tags[0..2]: "Interaction Design" / "Mobile UI" / "AI Concept"
role — EN: "Interaction & UI Designer" | DE: "Interaction & UI Designerin"
year: "" (empty — no year shown for this project)
placeholderLabel — EN: "[ sync fm — mobile ui ]" | DE: "[ sync fm — mobile ui ]"
imageAlt — EN: "Sync FM mobile interface" | DE: "Sync FM mobile Oberfläche"
imageAspect: "4/3"
featured: false  (appears in the smaller 4-card grid, not the large featured slot)

### projects[3] — Barrier-Free Kitchen
slug: "barrier-free-kitchen"
projectTag: "Project-04" / "Projekt-04"
name — EN: "Barrier-Free Kitchen" | DE: "Barrierefreie Küche"
headline — EN: "Designing a kitchen through reach, sight and touch."
          DE: "Eine Küche durch Reichweite, Sehen und Berührung gestalten."
description — EN: "An inclusive kitchen developed through observation, full-scale testing and 3D environmental design."
             DE: "Eine inklusive Küche, entwickelt durch Beobachtung, Tests im Maßstab 1:1 und 3D-Umgebungsdesign."
tags[0..2]: "Inclusive Design" / "Design Research" / "3D"
role — EN: "Prototyping & 3D Designer" | DE: "Prototyping & 3D Design"
year: ""
placeholderLabel — EN: "[ kitchen — final render ]" | DE: "[ küche — finales rendering ]"
imageAlt — EN: "Barrier-Free Kitchen final render" | DE: "Barrierefreie Küche, finales Rendering"
imageAspect: "4/3"
featured: false

### projects[4] — Surugami
slug: "surugami"
projectTag: "Project-05" / "Projekt-05"
name: "Surugami"
headline — EN: "Making origami feel social, contemporary and easy to enter."
          DE: "Origami sozial, zeitgemäß und leicht zugänglich gestalten."
description — EN: "An origami-inspired identity translated into a coherent print campaign and digital experience."
             DE: "Eine von Origami inspirierte Identität, übersetzt in eine konsistente Printkampagne und digitale Erfahrung."
tags[0..2]: "Branding" / "Print Design" / "Web Design"
role — EN: "Illustration, Poster & Web Design" | DE: "Illustration, Poster- & Webdesign"
year: ""
placeholderLabel — EN: "[ surugami — poster & identity ]" | DE: "[ surugami — poster & identität ]"
imageAlt — EN: "Surugami poster and identity" | DE: "Surugami Poster und Markenidentität"
imageAspect: "4/3"
featured: false

### projects[5] — QIS Portal Redesign
slug: "qis-portal"
projectTag: "Project-06" / "Projekt-06"
name: "QIS Portal Redesign"  (same both languages)
headline — EN: "Turning a fragmented university portal into a clearer student service."
          DE: "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice verwandeln."
description — EN: "A research-led redesign simplifying essential university-administration tasks for students."
             DE: "Ein forschungsbasiertes Redesign, das zentrale Hochschulverwaltungsaufgaben für Studierende vereinfacht."
tags[0..2]: "UX Research" / "Information Architecture" / "Product Design"
role — EN: "UX/UI Designer & Researcher" | DE: "UX/UI Designerin & Researcherin"
year: "2024"
placeholderLabel — EN: "[ qis — new dashboard ]" | DE: "[ qis — neues dashboard ]"
imageAlt — EN: "QIS redesigned dashboard" | DE: "Neu gestaltetes QIS-Dashboard"
imageAspect: "4/3"
featured: false
```

### 2.4 About-preview section (short teaser on the homepage, not the full About page)

`[src/lib/dictionaries/en.ts / de.ts → aboutPreview.*]`

```
### aboutPreview.annotations[0..3]  (small pill tags next to the portrait)
EN: "From Nepal" / "Based in Germany" / "UI/UX and Brand Designer" / "Always making something"
DE: "Aus Nepal" / "In Deutschland" / "UI/UX- und Brand Designerin" / "Immer am Gestalten"

### aboutPreview.eyebrow
EN: "About" | DE: "Über mich"

### aboutPreview.heading
EN: "Designing across function, identity and visual craft."
DE: "Design zwischen Funktion, Identität und visueller Gestaltung."

### aboutPreview.copy
EN: "I create intuitive and visually engaging solutions with the user at the centre. From brand identities to UX flows, I believe design should connect emotionally while remaining clear, useful and easy to understand."
DE: "Ich entwickle intuitive und visuell ansprechende Lösungen mit den Nutzern im Mittelpunkt. Von Markenidentitäten bis zu UX-Flows glaube ich, dass Design emotional verbinden und gleichzeitig klar, nützlich und verständlich bleiben sollte."

### aboutPreview.linkAbout
EN: "About me →" | DE: "Über mich →"

### aboutPreview.linkPlayground
EN: "Switch to Playground →" | DE: "Zum Playground →"

### aboutPreview.portraitAlt  (alt text on the portrait photo)
EN: "Portrait of Alexsha Maharjan." | DE: "Porträt von Alexsha Maharjan."
```

### 2.5 Contact section (bottom of homepage)

`[src/lib/dictionaries/en.ts / de.ts → contact.*]`

```
### contact.eyebrow
EN: "Contact" | DE: "Kontakt"

### contact.heading
EN: "Available for design opportunities." | DE: "Offen für Designmöglichkeiten."

### contact.copy
EN: "Interested in my work? View my résumé or contact me about a role, project or collaboration."
DE: "Interesse an meiner Arbeit? Sehen Sie sich meinen Lebenslauf an oder kontaktieren Sie mich zu einer Stelle, einem Projekt oder einer Zusammenarbeit."

### contact.resumeCta
EN: "View résumé" | DE: "Lebenslauf ansehen"

### contact.contactCta
EN: "Contact me" | DE: "Kontakt"
```
(The actual email/LinkedIn shown here come from `resume.email` / `resume.linkedinHref` — see §4.)

---

## 3. About page (full page at `/about`)

`[src/lib/dictionaries/en.ts / de.ts → about.*]`

```
### about.backToHome
EN: "← Back to home" | DE: "← Zurück zur Startseite"

### about.eyebrow
EN: "About" | DE: "Über mich"

### about.heading
EN: "Designing with curiosity, clarity and care."
DE: "Gestalten mit Neugier, Klarheit und Sorgfalt."

### about.portraitAlt
EN: "Portrait of Alexsha." | DE: "Porträt von Alexsha."

### about.handNoteOrigin  (hand-written-style note next to the portrait)
EN: "Nepal → Germany" | DE: "Nepal → Germany"  (DE left in English/arrow form — intentional-looking, flag if you want it translated)

### about.handNoteMaking  (second hand-written-style note)
EN: "always making something!" | DE: "always making something!"  (also left in English on DE — same note as above)

### about.portraitTags[0..2]
EN: "UI/UX Design" / "Branding" / "Visual Design"
DE: "UI/UX-Design" / "Branding" / "Visual Design"

### about.biographyHeading
EN: "Biography" | DE: "Biografie"

### about.biography[0]
EN: "I'm a multidisciplinary designer focused on UI/UX, web design, branding and visual communication. I enjoy turning complex ideas into clear, visually engaging experiences."
DE: "Ich bin eine multidisziplinäre Designerin mit Schwerpunkt auf UI/UX, Webdesign, Branding und visueller Kommunikation. Ich übersetze komplexe Ideen gerne in klare und visuell ansprechende Erlebnisse."

### about.biography[1]
EN: "My work often moves between strategy, research, visual identity and interaction. I like understanding why something is difficult before deciding how it should look."
DE: "Meine Arbeit bewegt sich häufig zwischen Strategie, Recherche, visueller Identität und Interaktion. Ich möchte verstehen, warum etwas schwierig ist, bevor ich entscheide, wie es aussehen sollte."

### about.biography[2]
EN: "Originally from Nepal and currently based in Germany, I bring together different cultural perspectives, digital tools and hands-on experimentation in my work."
DE: "Ich komme ursprünglich aus Nepal und lebe derzeit in Deutschland. In meiner Arbeit verbinde ich unterschiedliche kulturelle Perspektiven, digitale Werkzeuge und praktisches Experimentieren."

### about.focusHeading
EN: "Professional focus" | DE: "Schwerpunkte"

### about.focusItems[0..4]
EN: "UI/UX Design" / "Web Design" / "Brand Identity" / "Graphic Design" / "Interaction Design"
DE: "UI/UX Design" / "Webdesign" / "Markenidentität" / "Grafikdesign" / "Interaction Design"

### about.toolsHeading
EN: "Tools" | DE: "Werkzeuge"

### about.tools[0..4]
EN/DE (same both languages): "Figma" / "Adobe Illustrator" / "Adobe Photoshop" / "Blender" / "After Effects"

### about.aiLabel
EN: "and AI — as a tool to explore, not to replace"
DE: "Und KI — als Werkzeug zum Erkunden, nicht als Ersatz"

### about.aiBody
EN: "I use AI to think wider, faster: condensing research, playing out directions, sharpening copy, making ideas testable early. The judgement, the craft and the final decisions stay mine."
DE: "Ich nutze KI, um schneller breiter zu denken: Recherche verdichten, Richtungen durchspielen, Texte schärfen, Ideen früh testbar machen. Die Urteile, das Handwerk und die letzten Entscheidungen bleiben meine."

### about.aiTags[0..3]
EN: "Research" / "Ideation" / "Content" / "Prototyping"
DE: "Recherche" / "Ideenfindung" / "Inhalte" / "Prototyping"

### about.resumeLink
EN: "View résumé" | DE: "Lebenslauf ansehen"

### about.resumeCaption
EN: "education and background live in the CV"
DE: "Ausbildung und Werdegang im Lebenslauf"

### about.carouselHeading
EN: "Outside the work" | DE: "Neben der Arbeit"

### about.carouselItems[0..7]  (8 items — see IMAGES section: all 8 are caption-only placeholders, no photo files exist yet)
[0] EN alt: "Placeholder: drawing" / caption: "drawing"   | DE alt: "Placeholder: Zeichnen" / caption: "Zeichnen"
[1] EN alt: "Placeholder: painting" / caption: "painting"  | DE alt: "Placeholder: Malen" / caption: "Malen"
[2] EN alt: "Placeholder: crafting" / caption: "crafting"  | DE alt: "Placeholder: Basteln" / caption: "Basteln"
[3] EN alt: "Placeholder: beadwork" / caption: "beadwork"  | DE alt: "Placeholder: Perlenkunst" / caption: "Perlenkunst"
[4] EN alt: "Placeholder: photography" / caption: "photography" | DE alt: "Placeholder: Fotografie" / caption: "Fotografie"
[5] EN alt: "Placeholder: travel" / caption: "travel"      | DE alt: "Placeholder: Reisen" / caption: "Reisen"
[6] EN alt: "Placeholder: handmade objects" / caption: "handmade objects" | DE alt: "Placeholder: Handgemachte Objekte" / caption: "handgemachte Objekte"
[7] EN alt: "Placeholder: personal experiments" / caption: "personal experiments" | DE alt: "Placeholder: Persönliche Experimente" / caption: "persönliche Experimente"

### about.loveIntro
EN: "I love" | DE: "Ich liebe"

### about.loveWords[0..6]  (words that cycle/rotate in the "I love ___" line)
EN: "drawing" / "crafting" / "building" / "experimenting" / "learning" / "exploring" / "making things by hand"
DE: "Zeichnen" / "Basteln" / "Bauen" / "Experimentieren" / "Lernen" / "Entdecken" / "Handarbeit"

### about.resumeHeading  (bottom "Résumé & contact" section heading)
EN: "Résumé & contact" | DE: "Lebenslauf & Kontakt"

### about.resumeCopy
EN: "Interested in working together? View my résumé or send me a message."
DE: "Interesse an einer Zusammenarbeit? Sehen Sie sich meinen Lebenslauf an oder schreiben Sie mir."

### about.resumeCta
EN: "View résumé" | DE: "Lebenslauf ansehen"

### about.contactCta
EN: "Contact me" | DE: "Kontakt"
```

---

## 4. Résumé page (full page at `/resume`)

`[src/lib/dictionaries/en.ts / de.ts → resume.*]`

```
### resume.metaTitle  (browser tab title, not visible on page)
EN: "Résumé — Alexsha Maharjan" | DE: "Lebenslauf — Alexsha Maharjan"

### resume.name
"Alexsha Maharjan"  (same both languages)

### resume.tagline
EN/DE (same): "UX/UI Design · Corporate Design · Frontend"

### resume.location
EN: "Lübeck, Germany" | DE: "Lübeck, Deutschland"

### resume.email
"alexsha.maharjan1@gmail.com"  (same both languages — also used for the mailto: links site-wide, see Footer/Contact)

### resume.portfolio (display text) / resume.portfolioHref (link)
"alexshamaharjan.github.io" / "https://alexshamaharjan.github.io"  (was the Adobe Portfolio site until 2026-08-24 — DECISION-012)
(Note: this points to what looks like an older/separate Adobe Portfolio-style site, not this one. Confirm whether this should still be listed.)

### resume.linkedin (display text) / resume.linkedinHref (link)
"linkedin.com/in/alexsham" / "https://www.linkedin.com/in/alexsham"

### resume.backToAbout
EN: "← Back to about" | DE: "← Zurück zu Über mich"

### resume.profileHeading
EN: "Profile" | DE: "Profil"

### resume.profileBody
EN: "Student of Information Technology and Design (B.Sc.) at Technische Hochschule Lübeck, with a focus on human-centred design. Designing interfaces and brand identities across coursework and personal projects, alongside frontend implementation with HTML, CSS and Vue.js. German C1, English fluent."
DE: "Studentin der Informationstechnologie und Design (B.Sc.) an der Technischen Hochschule Lübeck, Schwerpunkt Human-Centered Design. Gestaltung von Interfaces und Markenauftritten in Semester- und eigenen Projekten, dazu die Frontend-Umsetzung mit HTML, CSS und Vue.js. Deutsch C1, Englisch fließend."

### resume.educationHeading
EN: "Education" | DE: "Bildungsweg"
```

Education entries — `resume.education[0..3]`:

```
### resume.education[0]
degree — EN: "Information Technology and Design, B.Sc." | DE: "Informationstechnologie und Design, B.Sc."
period — EN: "03/2024 – 08/2027 (expected)" | DE: "03/2024 – 08/2027 (vorauss.)"
place — EN: "Technische Hochschule Lübeck, Lübeck · current GPA 1.8 (German scale)"
       DE: "Technische Hochschule Lübeck, Lübeck · aktueller Notendurchschnitt 1,8"
detail — EN: "Relevant modules: Typography Fundamentals, Design Methodology, Visual Representation Techniques, Web Development"
        DE: "Relevante Module: Grundlagen der Typografie, Design-Methodologie, Darstellungstechniken, Web-Entwicklung"

### resume.education[1]
degree — EN: "Computer Science, B.Sc. (change of major)" | DE: "Informatik, B.Sc. (Studienfachwechsel)"
period: "09/2022 – 02/2024"
place: "Technische Hochschule Lübeck, Lübeck"
(no detail field)

### resume.education[2]
degree — EN: "Studienkolleg (foundation programme), Technical Track" | DE: "Studienkolleg, Schwerpunktkurs T (Technik)"
period: "09/2021 – 08/2022"
place — EN: "Studienkolleg Coburg, Coburg · Final grade 1.5" | DE: "Studienkolleg Coburg, Coburg · Abschlussnote 1,5"

### resume.education[3]
degree — EN: "Higher Secondary Education (10+2), Science" | DE: "Higher Secondary Education (10+2), Naturwissenschaften"
period: "06/2017 – 05/2019"
place — EN: "GEMS Institute of Higher Education, Kathmandu, Nepal · Instruction in English"
        DE: "GEMS Institute of Higher Education, Kathmandu, Nepal · Unterrichtssprache Englisch"
```

```
### resume.projectsHeading
EN: "Selected Projects" | DE: "Ausgewählte Projekte"
```

Résumé project entries — `resume.projects[0..2]` (this is a **shorter, résumé-specific** list — separate from the 6 homepage/case-study `projects[]` above):

```
### resume.projects[0] — WikiMind
name — EN: "WikiMind — Corporate Design & Website for an AI Company"
      DE: "Wikimind – Corporate Design & Website für ein KI-Unternehmen"
period: "2025"
place — EN: "Semester project, Technische Hochschule Lübeck, Lübeck"
       DE: "Semesterprojekt, Technische Hochschule Lübeck, Lübeck"
bullets[0] — EN: "Visual identity, UI design and website concept, including a mascot for the visual language"
            DE: "Visuelles Erscheinungsbild, UI-Design und Website-Konzept, inklusive Maskottchen für die Bildsprache"
bullets[1] — EN: "Information architecture, wireframing and high-fidelity prototyping in Figma"
            DE: "Informationsarchitektur, Wireframing und High-Fidelity-Prototyping in Figma"

### resume.projects[1] — Surugami
name — EN: "Surugami — Brand Identity, Print & Web Design" | DE: "Surugami – Brand Identity, Print & Webdesign"
period: "2025"
place: "Semester project…" / "Semesterprojekt…" (same pattern as above)
bullets[0] — EN: "Logo, typography and colour system; print-ready layouts for flyers, posters and banners (CMYK, prepress)"
            DE: "Logo, Typografie und Farbwelt; druckfähige Layouts für Flyer, Poster und Banner (CMYK, Reinzeichnung)"
bullets[1] — EN: "Interactive Figma prototype of the brand website" | DE: "Interaktiver Figma-Prototyp der Markenwebsite"

### resume.projects[2] — Hibi
name — EN: "Hibi — Productivity Web App, Design & Development"
      DE: "Hibi – Produktivitäts-Web-App, Design & Entwicklung"
period: "2025"
place — EN: "Personal project, Lübeck" | DE: "Eigenprojekt, Lübeck"
bullets[0] — EN: "UX/UI concept for to-dos, calendar, journal and mood tracking"
            DE: "UX/UI-Konzept für To-do, Kalender, Journal und Mood-Tracking"
bullets[1] — EN: "Frontend implementation with Vue.js and Tailwind CSS"
            DE: "Frontend-Umsetzung mit Vue.js und Tailwind CSS"
```

```
### resume.experienceHeading
EN: "Practical Experience" | DE: "Praktische Erfahrung"
```

`resume.experience[0]` (only one entry):

```
role — EN: "Working Student: Image Data Annotation / Image Processing"
      DE: "Werkstudentin: Bilddatenannotation / Bildverarbeitung"
period: "07/2024 – 06/2026"
place: "Nordischer Maschinenbau Rud. Baader GmbH & Co. KG, Lübeck"
bullets[0] — EN: "Annotation and quality control of image data for AI-driven processing systems"
            DE: "Annotation und Qualitätskontrolle von Bilddaten für KI-gestützte Verarbeitungssysteme"
bullets[1] — EN: "Structured review of large datasets against defined quality standards"
            DE: "Strukturierte Prüfung großer Datensätze nach definierten Qualitätsstandards"
bullets[2] — EN: "Documented results and collaborated with interdisciplinary teams"
            DE: "Dokumentation der Ergebnisse und Zusammenarbeit mit interdisziplinären Teams"
```

```
### resume.furtherHeading
EN: "Further Education & Engagement" | DE: "Weiterbildung & Engagement"
```

`resume.further[0..1]`:

```
### resume.further[0]
title: "AI Builders Arena"
place: "opencampus.sh, Kiel"
description — EN: "Designer in an interdisciplinary team; UX concept and chatbot design for the Waterkant Festival"
             DE: "Designerin im interdisziplinären Team; UX-Konzept und Chatbot-Design für das Waterkant Festival"
period: "04/2024 – 07/2024"

### resume.further[1]
title — EN: "“Prompt like a Pro” workshop" | DE: "Workshop „Prompt like a Pro“"
place: "Technische Hochschule Lübeck, Lübeck"
description — EN: "AI tools for text and image, project week" | DE: "KI-Werkzeuge für Texte und Bilder, Projektwoche"
period — EN: "11/11/2024" | DE: "11.11.2024"
```

```
### resume.skillsHeading
EN: "Skills" | DE: "Kenntnisse"
```

`resume.skills[0..4]`:

```
### resume.skills[0]
label: "Design"
value — EN: "UX/UI design, human-centred design, wireframing, prototyping, corporate design, branding, editorial & print design, typography, responsive design"
       DE: "UX/UI-Design, Human-Centered Design, Wireframing, Prototyping, Corporate Design, Branding, Editorial- & Printdesign, Typografie, Responsive Design"

### resume.skills[1]
label: "Software"
value: "Figma, Adobe Illustrator, Photoshop, InDesign, Fresco, Blender, Microsoft 365"  (same both languages)

### resume.skills[2]
label — EN: "Print & Production" | DE: "Print & Produktion"
value — EN: "Prepress, final artwork, print-ready PDFs, CMYK, packaging design"
       DE: "Druckvorstufe, Reinzeichnung, druckfähige PDFs, CMYK, Verpackungsdesign"

### resume.skills[3]
label — EN: "Development" | DE: "Entwicklung"
value: "HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS, MariaDB, Docker"  (same both languages)

### resume.skills[4]
label — EN: "Languages" | DE: "Sprachen"
value — EN: "Nepali – native · Newari – native · German – fluent (C1) · English – fluent · Hindi – fluent"
       DE: "Nepali – Muttersprache · Newari – Muttersprache · Deutsch – fließend (C1) · Englisch – fließend · Hindi – fließend"

### resume.printCta
EN: "Print / Save as PDF" | DE: "Drucken / Als PDF speichern"
```

> Note: résumé fields `note` there's no street address or birthdate field — those were
> intentionally left off the public résumé page (see prior conversation), even though
> the original Lebenslauf design included them.

---

## 5. Case studies (`/work/<slug>`)

Each case study is a separate file with an `en` and `de` object. Below, every text field
is listed per project, in page order (hero → sections in the order they appear).

Each entry of a section's `body[]` is a **block**. A block is either a plain string (a
paragraph) or an object with a `kind`:

- `paragraph` — body text.
- `sub-heading` — `{ kind: "h3", text }`, rendered larger and bolder than body text.
- `list` — `{ kind: "list", items[], ordered? }`, rendered as bullets (or numbers).
- `note` — `{ kind: "note", text }`, a small aside in a bordered box (disclosures, stats).
- `quote` / `figure` — available in the model, not used by any case study yet.

Rewriting a section can change how many blocks it has, so **the `body[n]` numbers below
are only valid for the current text**. This part of the guide is generated — after any
content change, rerun `node scripts/content-guide-case-studies.mjs --write` to refresh it.

### 5.1 WikiMind — `src/lib/caseStudies/wikimind.ts`

```
### wikimind.en / .de
name — EN/DE (same): "WikiMind"
projectTag — EN/DE (same): "WikiMind · 2026"
headline — EN: "Making artificial intelligence feel clear, useful and approachable."
           DE: "Künstliche Intelligenz klar, nützlich und zugänglich gestalten."
summary — EN: "WikiMind is a brand identity and website concept for an AI company offering workshops, chatbots and software solutions. The project translates complex services into a friendly and structured experience for people with limited technical knowledge."
          DE: "WikiMind ist ein Marken- und Website-Konzept für ein KI-Unternehmen, das Workshops, Chatbots und Softwarelösungen anbietet. Das Projekt übersetzt komplexe Leistungen in eine freundliche und klar strukturierte Erfahrung für Menschen mit wenig technischem Vorwissen."
tags[0..4] — EN/DE (same): "Brand Strategy" / "Visual Identity" / "UI/UX Design" / "Web Design" / "Prototyping"
role — EN: "Brand & UI/UX Designer" | DE: "Brand & UI/UX Designerin"
contribution — EN: "Entire project completed independently." | DE: "Das gesamte Projekt wurde eigenständig umgesetzt."
type — EN: "Semester project · solo" | DE: "Semesterprojekt · allein"
year — EN/DE (same): undefined
tools — EN/DE (same): "Figma · Adobe Illustrator"
deliverables — EN: "Brand identity · Logo system · Mascot · Website design · UI kit · Interactive prototype"
               DE: "Markenidentität · Logosystem · Maskottchen · Website-Design · UI-Kit · Interaktiver Prototyp"
heroImage.src — /images/hero-wikimind.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "The WikiMind mascot presenting a holographic interface"
                DE: "Das WikiMind-Maskottchen präsentiert eine holografische Oberfläche"

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] paragraph — EN: "WikiMind wanted to communicate artificial intelligence to people who were interested in using it but did not necessarily understand the underlying technology. The challenge was not the range of services itself. It was how those services were presented."
                    DE: "WikiMind wollte künstliche Intelligenz Menschen vermitteln, die an ihrer Nutzung interessiert sind, die zugrunde liegende Technologie jedoch nicht unbedingt verstehen. Die Herausforderung lag nicht im Leistungsangebot selbst, sondern in seiner Darstellung."
body[1] paragraph — EN: "Many AI websites rely on technical terminology, abstract visualisations and dark interfaces. While this can signal technological capability, it may also make the subject feel distant, complicated or inaccessible. The goal was therefore to create an identity and digital experience that maintained professional credibility while making AI easier to understand."
                    DE: "Viele KI-Websites arbeiten mit technischen Begriffen, abstrakten Visualisierungen und dunklen Oberflächen. Diese Gestaltung kann technologische Kompetenz vermitteln, das Thema jedoch zugleich distanziert, kompliziert oder schwer zugänglich erscheinen lassen. Ziel war deshalb eine Identität und digitale Erfahrung, die professionell wirkt und KI gleichzeitig leichter verständlich macht."

### sections[1] — id "challenge" · number "02" · navLabel EN "Context & challenge" | DE "Kontext & Herausforderung"
heading — EN: "AI was available, but it did not always feel accessible."
          DE: "KI war verfügbar, wirkte jedoch nicht immer zugänglich."
body[0] paragraph — EN: "Artificial intelligence is becoming part of everyday products and professional workflows. Yet many potential users still experience it as abstract, intimidating or difficult to apply. This creates a communication problem for companies such as WikiMind."
                    DE: "Künstliche Intelligenz wird zunehmend Teil alltäglicher Produkte und beruflicher Arbeitsprozesse. Trotzdem erleben viele potenzielle Nutzer das Thema weiterhin als abstrakt, einschüchternd oder schwer anwendbar. Für Unternehmen wie WikiMind entsteht dadurch vor allem ein Kommunikationsproblem."
body[1] paragraph — EN: "The website needed to explain different services without assuming technical knowledge. At the same time, the brand could not become childish, overly playful or less credible."
                    DE: "Die Website musste unterschiedliche Leistungen erklären, ohne technisches Vorwissen vorauszusetzen. Gleichzeitig durfte die Marke nicht kindlich, übermäßig verspielt oder weniger glaubwürdig wirken."
designQuestion — EN: "How might WikiMind make complex AI services understandable and approachable without losing professional trust?"
                 DE: "Wie kann WikiMind komplexe KI-Leistungen verständlich und zugänglich vermitteln, ohne professionelles Vertrauen zu verlieren?"

### sections[2] — id "research" · number "03" · navLabel EN "Research" | DE "Recherche"
heading — EN: "Understanding how AI companies communicate" | DE: "Wie KI-Unternehmen kommunizieren"
body[0] paragraph — EN: "I conducted a qualitative visual and structural analysis of existing AI and technology websites. The comparison focused on visual tone, information hierarchy, content structure, language, navigation, animation and methods of establishing trust."
                    DE: "Ich führte eine qualitative visuelle und strukturelle Analyse bestehender KI- und Technologie-Websites durch. Untersucht wurden visuelle Tonalität, Informationshierarchie, Inhaltsstruktur, Sprache, Navigation, Animation und Methoden zum Aufbau von Vertrauen."
body[1] paragraph — EN: "The analysis revealed a common tension. Dark and highly technical interfaces often appeared modern, but they could also feel cold or exclusive. Clearer layouts and restrained animation made information easier to follow and helped services feel more understandable."
                    DE: "Die Analyse zeigte ein wiederkehrendes Spannungsfeld. Dunkle und stark technische Oberflächen wirkten häufig modern, konnten jedoch gleichzeitig kühl oder exklusiv erscheinen. Klarere Layouts und zurückhaltende Animationen erleichterten die Orientierung und machten Leistungen verständlicher."
body[2] sub-heading — EN: "Translating the audience into design needs" | DE: "Zielgruppen in konkrete Designanforderungen übersetzen"
body[3] paragraph — EN: "Three working personas represented different professional contexts: a business decision-maker looking for practical automation, an academic leader seeking understandable AI education and a customer-service manager needing reliable operational support."
                    DE: "Drei Arbeits-Personas repräsentierten unterschiedliche berufliche Kontexte: eine Führungskraft auf der Suche nach praktischer Automatisierung, eine akademische Leitung mit Bedarf an verständlicher KI-Vermittlung und eine Kundenservice-Leitung mit Bedarf an verlässlicher operativer Unterstützung."
body[4] paragraph — EN: "Although their responsibilities differed, their needs shared a consistent pattern. They required clear explanations, visible credibility and practical value before they could trust an AI provider."
                    DE: "Trotz unterschiedlicher Verantwortungsbereiche zeigten sich gemeinsame Bedürfnisse. Die Nutzer benötigten verständliche Erklärungen, sichtbare Glaubwürdigkeit und einen klaren praktischen Nutzen, bevor sie einem KI-Anbieter vertrauen konnten."
images[0] — aspect 16/8 · caption EN/DE (same) "[ competitor analysis ]" · no src — renders as a hatched placeholder box
images[1] — aspect 3/4 · caption EN/DE (same) "[ persona 01 ]" · no src — renders as a hatched placeholder box
images[2] — aspect 3/4 · caption EN/DE (same) "[ persona 02 ]" · no src — renders as a hatched placeholder box
images[3] — aspect 3/4 · caption EN/DE (same) "[ persona 03 ]" · no src — renders as a hatched placeholder box

### sections[3] — id "insights" · number "04" · navLabel EN "Key insights" | DE "Zentrale Erkenntnisse"
heading — EN: "Key insights" | DE: "Zentrale Erkenntnisse"
insights[0].heading — EN: "Clarity matters more than technical detail." | DE: "Klarheit ist wichtiger als technische Detailtiefe."
insights[0].body — EN: "Users first need to understand what a service does for them. Technical explanations should support this understanding, not lead the communication."
                   DE: "Nutzer müssen zuerst verstehen, welchen konkreten Nutzen eine Leistung für sie hat. Technische Erklärungen sollten dieses Verständnis unterstützen und nicht die Kommunikation dominieren."
insights[1].heading — EN: "A human element can reduce distance." | DE: "Ein menschliches Element kann Distanz reduzieren."
insights[1].body — EN: "A recognisable character can make AI feel less abstract, provided it is used carefully and does not undermine professional credibility."
                   DE: "Eine wiedererkennbare Figur kann KI weniger abstrakt erscheinen lassen, sofern sie gezielt eingesetzt wird und die professionelle Glaubwürdigkeit nicht beeinträchtigt."
insights[2].heading — EN: "Trust must be designed into the structure." | DE: "Vertrauen muss in die Struktur integriert werden."
insights[2].body — EN: "Predictable navigation, understandable service descriptions and visible calls to action create more confidence than decorative technological imagery."
                   DE: "Vorhersehbare Navigation, verständliche Leistungsbeschreibungen und sichtbare Handlungsoptionen schaffen mehr Sicherheit als rein dekorative Technologie-Visualisierungen."
insights[3].heading — EN: "Motion should guide, not distract." | DE: "Animation sollte führen und nicht ablenken."
insights[3].body — EN: "Animation should support orientation, explain relationships or draw attention to important actions. It should not compete with the content."
                   DE: "Animation sollte Orientierung unterstützen, Zusammenhänge erklären oder Aufmerksamkeit auf wichtige Handlungen lenken. Sie sollte nicht mit dem Inhalt konkurrieren."

### sections[4] — id "direction" · number "05" · navLabel EN "Strategy & identity" | DE "Strategie & Identität"
heading — EN: "Positioning AI as a capable assistant" | DE: "KI als kompetenten Assistenten positionieren"
body[0] paragraph — EN: "The central strategic decision was to present AI not as an abstract technical system, but as a supportive tool that helps people learn, automate work and solve practical problems."
                    DE: "Die zentrale strategische Entscheidung bestand darin, KI nicht als abstraktes technisches System, sondern als unterstützendes Werkzeug zu vermitteln, das Menschen beim Lernen, Automatisieren und Lösen praktischer Probleme hilft."
body[1] list — 5 items
  items[0] — EN: "Trust through transparent communication" | DE: "Vertrauen durch transparente Kommunikation"
  items[1] — EN: "Accessibility through friendly visuals and plain language"
             DE: "Zugänglichkeit durch freundliche Visuals und einfache Sprache"
  items[2] — EN: "Clarity through structured information" | DE: "Klarheit durch strukturierte Informationen"
  items[3] — EN: "Innovation through modern but controlled digital details"
             DE: "Innovation durch moderne, aber kontrollierte digitale Details"
  items[4] — EN: "Competence through a consistent and professional system"
             DE: "Kompetenz durch ein konsistentes und professionelles System"
body[2] paragraph — EN: "The verbal tone avoids unnecessary terminology and prioritises user benefits over technical specifications."
                    DE: "Die sprachliche Tonalität vermeidet unnötige Fachbegriffe und stellt den Nutzen für die Anwender vor technische Spezifikationen."
body[3] sub-heading — EN: "A light and structured visual language" | DE: "Eine helle und strukturierte visuelle Sprache"
body[4] paragraph — EN: "The visual direction combines a white and neutral background with several blue tones and restrained gradients. Blue supports associations with trust, intelligence and technology, while the lighter environment prevents the brand from feeling heavy or intimidating. Inter was selected for its screen readability and neutral character."
                    DE: "Die visuelle Richtung kombiniert einen weißen und neutralen Hintergrund mit mehreren Blautönen und zurückhaltenden Farbverläufen. Blau unterstützt Assoziationen mit Vertrauen, Intelligenz und Technologie. Die helle Umgebung verhindert gleichzeitig, dass die Marke schwer oder einschüchternd wirkt. Inter wurde aufgrund der guten Lesbarkeit am Bildschirm und des neutralen Charakters ausgewählt."
body[5] sub-heading — EN: "A symbol for connected knowledge" | DE: "Ein Symbol für vernetztes Wissen"
body[6] paragraph — EN: "The WikiMind symbol combines the initials W and M with the continuous form of an infinity sign. The mark represents connected knowledge, continuous learning and the open-ended potential of artificial intelligence. Rounded forms make the identity more approachable, while sharper details prevent the wordmark from appearing overly playful."
                    DE: "Das WikiMind-Symbol verbindet die Initialen W und M mit der kontinuierlichen Form eines Unendlichkeitszeichens. Die Marke steht für vernetztes Wissen, fortlaufendes Lernen und das offene Potenzial künstlicher Intelligenz. Abgerundete Formen machen die Identität zugänglicher, präzisere Details verhindern, dass die Wortmarke zu verspielt wirkt."
body[7] sub-heading — EN: "A controlled human element" | DE: "Ein gezielt eingesetztes menschliches Element"
body[8] paragraph — EN: "A dolphin was introduced as a controlled brand character. Dolphins are commonly associated with intelligence, curiosity and social behaviour, which supported the desired perception of WikiMind. The mascot is used selectively in the hero, educational explanations and transitional moments rather than across every section of the website."
                    DE: "Ein Delfin wurde als gezielt eingesetzter Markencharakter entwickelt. Delfine werden häufig mit Intelligenz, Neugier und sozialem Verhalten verbunden und unterstützen damit die gewünschte Wahrnehmung von WikiMind. Das Maskottchen wird selektiv im Hero-Bereich, in erklärenden Inhalten und bei Übergängen eingesetzt, nicht auf jeder Website-Sektion."
images[0] — aspect 4/3 · caption EN/DE (same) "[ moodboard ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN/DE (same) "[ colour + type system ]" · no src — renders as a hatched placeholder box
images[2] — aspect 4/3 · caption EN/DE (same) "[ logo sketches ]" · no src — renders as a hatched placeholder box
images[3] — aspect 4/3 · caption EN/DE (same) "[ logo variants ]" · no src — renders as a hatched placeholder box
images[4] — aspect 16/8 · caption EN/DE (same) "[ mascot development ]" · no src — renders as a hatched placeholder box

### sections[5] — id "development" · number "06" · navLabel EN "Structure & system" | DE "Struktur & System"
heading — EN: "Turning multiple services into a guided journey"
          DE: "Unterschiedliche Leistungen in eine geführte Nutzerreise übersetzen"
body[0] paragraph — EN: "After establishing the brand direction, the website content was organised into a sitemap and reusable page system. The structure was designed to help visitors understand what WikiMind offers, identify the service relevant to them and move towards a clear next action."
                    DE: "Nach der Definition der Markenrichtung wurden die Inhalte der Website in einer Sitemap und einem wiederverwendbaren Seitensystem organisiert. Die Struktur hilft Besuchern dabei, das Angebot von WikiMind zu verstehen, eine relevante Leistung zu finden und zu einer klaren nächsten Handlung zu gelangen."
body[1] sub-heading — EN: "Building consistency through reusable components" | DE: "Konsistenz durch wiederverwendbare Komponenten schaffen"
body[2] paragraph — EN: "The interface system uses rounded containers, generous spacing and a limited visual hierarchy to soften the technical subject. Reusable components were created for navigation, buttons, content cards, input fields, service sections, icons, footer, hover states and feedback animations. The component approach keeps the website visually consistent while supporting future expansion."
                    DE: "Das Interface-System arbeitet mit abgerundeten Containern, großzügigen Abständen und einer reduzierten visuellen Hierarchie. Wiederverwendbare Komponenten wurden für Navigation, Buttons, Inhaltskarten, Eingabefelder, Leistungsbereiche, Icons, Footer, Hover-Zustände und Feedback-Animationen entwickelt. Der modulare Ansatz hält die Website visuell konsistent und ermöglicht spätere Erweiterungen."
images[0] — aspect 16/8 · caption EN/DE (same) "[ sitemap ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN/DE (same) "[ wireframes ]" · no src — renders as a hatched placeholder box
images[2] — aspect 4/3 · caption EN/DE (same) "[ ui kit ]" · no src — renders as a hatched placeholder box

### sections[6] — id "outcome" · number "07" · navLabel EN "Final outcome" | DE "Ergebnis"
heading — EN: "A calmer entry point into artificial intelligence" | DE: "Ein ruhigerer Einstieg in künstliche Intelligenz"
body[0] paragraph — EN: "The final concept brings the brand identity, service communication and interface system together in a light and structured website. Large headings establish a clear hierarchy. Service cards divide complex topics into understandable entry points. The mascot introduces a human and recognisable element."
                    DE: "Das finale Konzept verbindet Markenidentität, Leistungsbeschreibung und Interface-System in einer hellen und klar strukturierten Website. Große Überschriften schaffen eine deutliche Hierarchie. Leistungskarten teilen komplexe Themen in verständliche Einstiegspunkte. Das Maskottchen bringt ein menschliches und wiedererkennbares Element ein."
body[1] paragraph — EN: "The result is an interactive Figma prototype that demonstrates the main page system, navigation behaviour and visual language of WikiMind."
                    DE: "Das Ergebnis ist ein interaktiver Figma-Prototyp, der das zentrale Seitensystem, das Navigationsverhalten und die visuelle Sprache von WikiMind demonstriert."
images[0] — aspect 16/9 · caption EN/DE (same) "[ final screens — large showcase ]" · no src — renders as a hatched placeholder box
images[1] — aspect 16/10 · caption EN/DE (same) "[ prototype video ]" · no src — renders as a hatched placeholder box
images[2] — aspect 16/10 · caption EN/DE (same) "[ interface detail ]" · no src — renders as a hatched placeholder box

### sections[7] — id "reflection" · number "08" · navLabel EN "Limitations & reflection" | DE "Grenzen & Reflexion"
heading — EN: "Evaluating the system against the original goals" | DE: "Das System anhand der ursprünglichen Ziele bewerten"
body[0] paragraph — EN: "The concept was refined through iterative comparison, self-evaluation and feedback loops. However, the project did not include a formal moderated usability study with representative users. The case study therefore does not claim a measured improvement in usability or conversion."
                    DE: "Das Konzept wurde durch iterative Vergleiche, Selbstevaluation und Feedback-Schleifen weiterentwickelt. Das Projekt umfasste jedoch keine formale moderierte Usability-Studie mit repräsentativen Nutzern. Die Fallstudie behauptet deshalb keine gemessene Verbesserung der Benutzerfreundlichkeit oder Conversion."
body[1] paragraph — EN: "A future validation phase should test: whether first-time visitors understand the services, whether the mascot strengthens or reduces credibility, whether users can locate a relevant service quickly, whether the language is understandable without AI knowledge, whether animation supports orientation, and whether contrast, keyboard navigation and screen-reader structure meet accessibility requirements."
                    DE: "Eine zukünftige Validierungsphase sollte untersuchen: ob Erstbesucher die Leistungen verstehen, ob das Maskottchen die Glaubwürdigkeit stärkt oder reduziert, ob eine relevante Leistung schnell gefunden wird, ob die Sprache ohne KI-Vorwissen verständlich ist, ob Animation die Orientierung unterstützt und ob Kontraste, Tastaturbedienung und Screenreader-Struktur die Anforderungen an Barrierefreiheit erfüllen."
body[2] sub-heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[3] paragraph — EN: "WikiMind showed me that making technology approachable does not mean simplifying the visual identity until it becomes generic. The stronger solution came from balancing emotional warmth with professional structure."
                    DE: "WikiMind hat mir gezeigt, dass zugängliche Technologiegestaltung nicht bedeutet, eine visuelle Identität so stark zu vereinfachen, dass sie generisch wird. Die stärkere Lösung entstand durch das Gleichgewicht zwischen emotionaler Wärme und professioneller Struktur."
body[4] paragraph — EN: "The mascot, colour system and rounded components created accessibility at the visual level. The content hierarchy, service organisation and reusable interface system created clarity at the functional level. The next iteration should focus less on adding new visual elements and more on validating comprehension, improving accessibility and refining the website through direct user observation."
                    DE: "Maskottchen, Farbsystem und abgerundete Komponenten erzeugten visuelle Zugänglichkeit. Inhaltshierarchie, Leistungsstruktur und das wiederverwendbare Interface-System schufen funktionale Klarheit. Die nächste Iteration sollte sich weniger auf zusätzliche visuelle Elemente konzentrieren und stärker auf Verständlichkeit, Barrierefreiheit und direkte Nutzerbeobachtung."
```

### 5.2 AFONO — `src/lib/caseStudies/afono.ts`

```
### afono.en / .de
name — EN/DE (same): "AFONO"
projectTag — EN/DE (same): "AFONO · 2026"
headline — EN: "Translating Nepali identity into contemporary streetwear."
           DE: "Nepalesische Identität in moderne Streetwear übersetzen."
summary — EN: "AFONO is a fictional streetwear brand that combines selected cultural references from Nepal with a restrained visual identity, an oversized clothing collection and a complete e-commerce experience."
          DE: "AFONO ist eine fiktive Streetwear-Marke, die ausgewählte kulturelle Bezüge aus Nepal mit einer reduzierten visuellen Identität, einer Oversized-Kollektion und einem vollständigen E-Commerce-Erlebnis verbindet."
tags[0..5] — EN/DE (same): "Brand Strategy" / "Visual Identity" / "Fashion Graphics" / "UI/UX Design" / "E-commerce" / "Social Media"
role — EN: "Brand, Fashion & UI/UX Designer" | DE: "Brand-, Fashion- & UI/UX-Designerin"
contribution — EN: "Entire project completed independently." | DE: "Das gesamte Projekt wurde eigenständig umgesetzt."
type — EN: "Semester project · solo" | DE: "Semesterprojekt · allein"
year — EN/DE (same): undefined
tools — EN: "Figma · Adobe Illustrator · Adobe Photoshop · AI tools for conceptual campaign imagery"
        DE: "Figma · Adobe Illustrator · Adobe Photoshop · KI-Tools für konzeptionelle Kampagnenbilder"
deliverables — EN: "Brand strategy · Naming · Logo · Clothing graphics · E-commerce prototype · Social-media system"
               DE: "Markenstrategie · Naming · Logo · Bekleidungsgrafiken · E-Commerce-Prototyp · Social-Media-System"
heroImage.src — /images/hero-afono.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "Print lettering from AFONO's HIMAL series" | DE: "Schriftzüge aus AFONOs HIMAL-Serie"
heroDisclosure — EN: "Disclosure: The clothing graphics, brand identity and interface design are my original work. AI-generated images were used only as conceptual campaign and product visualisations." | DE: (missing — ISSUE-009)

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] paragraph — EN: "AFONO was developed as a fictional fashion brand positioned between contemporary streetwear and culturally rooted design."
                    DE: "AFONO wurde als fiktive Modemarke entwickelt, die sich zwischen moderner Streetwear und kulturell verwurzeltem Design positioniert."
body[1] paragraph — EN: "Many Nepal-inspired fashion products use traditional symbols very directly, resulting in clothing that can appear decorative, souvenir-like or difficult to wear in everyday situations. At the opposite end, some local brands follow international fashion trends so closely that their connection to Nepal becomes almost invisible."
                    DE: "Viele von Nepal inspirierte Modeprodukte verwenden traditionelle Symbole sehr direkt. Dadurch kann die Kleidung dekorativ, souvenirartig oder für den Alltag schwer tragbar wirken. Andere lokale Marken orientieren sich so stark an internationalen Modetrends, dass ihr Bezug zu Nepal kaum noch sichtbar ist."
body[2] paragraph — EN: "AFONO explores a middle position. The brand communicates cultural belonging through its name, colour system, typography, collection stories and graphic details, rather than through excessive ornamentation. The final system includes a complete visual identity, clothing concepts, an e-commerce prototype and social-media applications."
                    DE: "AFONO untersucht eine Position zwischen diesen beiden Richtungen. Die Marke vermittelt kulturelle Zugehörigkeit durch Namen, Farbsystem, Typografie, Kollektionserzählungen und ausgewählte grafische Details, anstatt mit übermäßiger Ornamentik zu arbeiten. Das finale System umfasst eine vollständige visuelle Identität, Kleidungskonzepte, einen E-Commerce-Prototyp und Social-Media-Anwendungen."

### sections[1] — id "challenge" · number "02" · navLabel EN "Challenge" | DE "Herausforderung"
heading — EN: "Cultural identity was visible, but often difficult to wear."
          DE: "Kulturelle Identität war sichtbar, aber häufig schwer tragbar."
body[0] paragraph — EN: "Fashion can communicate identity, belonging and cultural memory. However, cultural visibility alone does not automatically create a relevant contemporary product."
                    DE: "Mode kann Identität, Zugehörigkeit und kulturelle Erinnerung vermitteln. Kulturelle Sichtbarkeit allein schafft jedoch noch kein relevantes zeitgenössisches Produkt."
body[1] paragraph — EN: "The challenge was to create a brand that felt recognisably connected to Nepal without reproducing traditional motifs literally or reducing the culture to decoration. It also needed to compete visually with established international streetwear brands and communicate enough quality to earn trust as a new, fictional label."
                    DE: "Die Herausforderung bestand darin, eine Marke zu entwickeln, die erkennbar mit Nepal verbunden ist, ohne traditionelle Motive wörtlich zu übernehmen oder Kultur auf Dekoration zu reduzieren. Gleichzeitig musste sie visuell mit etablierten internationalen Streetwear-Marken konkurrieren und als neue, fiktive Marke ausreichend Qualität und Vertrauen kommunizieren."
designQuestion — EN: "How might a Nepal-rooted fashion brand express cultural identity without becoming decorative, traditional or souvenir-like?"
                 DE: "Wie kann eine in Nepal verwurzelte Modemarke kulturelle Identität ausdrücken, ohne dekorativ, traditionell oder souvenirartig zu wirken?"

### sections[2] — id "research" · number "03" · navLabel EN "Research" | DE "Recherche"
heading — EN: "Understanding how culture becomes wearable" | DE: "Verstehen, wie Kultur tragbar wird"
body[0] paragraph — EN: "Five qualitative interviews were conducted with Nepali participants to understand attitudes towards culturally inspired clothing, local fashion brands and everyday wear. Participants were interested in supporting Nepal-related brands, but raised concerns about quality, durability, availability and generic design. Existing cultural prints were frequently described as too loud, too detailed or too decorative for everyday use."
                    DE: "Fünf qualitative Interviews mit nepalesischen Teilnehmenden untersuchten Einstellungen zu kulturell inspirierter Kleidung, lokalen Modemarken und alltagstauglicher Gestaltung. Die Teilnehmenden waren grundsätzlich daran interessiert, Marken mit Nepal-Bezug zu unterstützen. Gleichzeitig äußerten sie Bedenken hinsichtlich Qualität, Haltbarkeit, Verfügbarkeit und generischer Gestaltung. Bestehende kulturelle Prints wurden häufig als zu laut, zu detailliert oder zu dekorativ für den Alltag beschrieben."
body[1] paragraph — EN: "A visual market analysis compared local Nepalese fashion references with international streetwear brands. Local brands often communicated culture more strongly but lacked consistency. International brands presented products more clearly through structured layouts, campaign photography and controlled typography, but offered little cultural relevance to Nepal."
                    DE: "Eine visuelle Marktanalyse verglich lokale nepalesische Modereferenzen mit internationalen Streetwear-Marken. Lokale Marken vermittelten kulturelle Identität häufig stärker, waren visuell jedoch weniger konsistent. Internationale Marken präsentierten ihre Produkte durch strukturierte Layouts, Kampagnenfotografie und kontrollierte Typografie klarer, boten jedoch kaum kulturelle Relevanz für Nepal."
images[0] — aspect 4/3 · caption EN/DE (same) "[ interview findings ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN/DE (same) "[ market analysis ]" · no src — renders as a hatched placeholder box

### sections[3] — id "insights" · number "04" · navLabel EN "Key insights" | DE "Zentrale Erkenntnisse"
heading — EN: "Key insights" | DE: "Zentrale Erkenntnisse"
insights[0].heading — EN: "Culture should be visible without becoming overwhelming." | DE: "Kultur sollte sichtbar sein, ohne zu überladen."
insights[0].body — EN: "Selected references and stories can communicate origin more effectively than dense traditional ornamentation."
                   DE: "Ausgewählte Bezüge und Geschichten können Herkunft wirkungsvoller vermitteln als dichte traditionelle Ornamentik."
insights[1].heading — EN: "Wearability is part of cultural relevance." | DE: "Tragbarkeit ist Teil kultureller Relevanz."
insights[1].body — EN: "If the clothing is difficult to combine or too visually dominant, users may appreciate the idea but avoid wearing the product."
                   DE: "Wenn Kleidung schwer kombinierbar oder visuell zu dominant ist, können Nutzer die Idee schätzen und das Produkt trotzdem nicht tragen."
insights[2].heading — EN: "Quality must be communicated before it can be experienced."
                      DE: "Qualität muss kommuniziert werden, bevor sie erlebt werden kann."
insights[2].body — EN: "A new fashion label needs consistent photography, clear product information and a professional digital experience to reduce uncertainty."
                   DE: "Eine neue Modemarke benötigt konsistente Bilder, klare Produktinformationen und ein professionelles digitales Erlebnis, um Unsicherheit zu reduzieren."
insights[3].heading — EN: "Storytelling gives cultural details meaning." | DE: "Storytelling gibt kulturellen Details Bedeutung."
insights[3].body — EN: "Cultural references become more valuable when the collection explains where they come from and why they were selected."
                   DE: "Kulturelle Bezüge erhalten mehr Wert, wenn eine Kollektion erklärt, woher sie stammen und weshalb sie ausgewählt wurden."

### sections[4] — id "direction" · number "05" · navLabel EN "Strategy & identity" | DE "Strategie & Identität"
heading — EN: "Rooted in Nepal, made for modern everyday wear." | DE: "In Nepal verwurzelt, für den modernen Alltag gemacht."
body[0] paragraph — EN: "The strategic direction positions AFONO neither as a tourism brand nor as a traditional clothing label. It operates more like a creative streetwear studio that uses Nepal as a source of stories, colour, landscape and identity."
                    DE: "Die strategische Richtung positioniert AFONO weder als Tourismusmarke noch als traditionelle Kleidungsmarke. Die Marke funktioniert eher wie ein kreatives Streetwear-Studio, das Nepal als Quelle für Geschichten, Farben, Landschaften und Identität nutzt."
body[1] list — 4 items
  items[0] — EN: "Cultural belonging, without literal reproduction" | DE: "Kulturelle Zugehörigkeit, ohne wörtliche Reproduktion"
  items[1] — EN: "Everyday wearability, through restrained front designs and stronger back graphics"
             DE: "Alltagstauglichkeit, durch reduzierte Vorderseiten und stärkere Rückengrafiken"
  items[2] — EN: "Contemporary clarity, through a structured visual and digital system"
             DE: "Zeitgemäße Klarheit, durch ein strukturiertes visuelles und digitales System"
  items[3] — EN: "Story-led collections, allowing each release to explore a different cultural or environmental reference"
             DE: "Story-basierte Kollektionen, die unterschiedliche kulturelle oder landschaftliche Bezüge untersuchen"
body[2] paragraph — EN: "The name AFONO is derived from the Nepali word afno, meaning ‘one’s own’ or ‘belonging to oneself’. It connects personal identity, cultural belonging and self-expression while remaining short enough to function as a fashion wordmark."
                    DE: "Der Name AFONO leitet sich vom nepalesischen Wort afno ab, das ‘eigen’ oder ‘zu sich selbst gehörend’ bedeutet. Er verbindet persönliche Identität, kulturelle Zugehörigkeit und Selbstausdruck und bleibt gleichzeitig kurz genug für eine Modemarke."
body[3] sub-heading — EN: "A flexible identity based on ownership and belonging" | DE: "Eine flexible Identität auf Grundlage von Zugehörigkeit"
body[4] paragraph — EN: "The logo was developed from the letters A and F and refined into a compact geometric symbol. A subtle horizontal construction references the visual rhythm of Devanagari writing without directly reproducing a traditional character."
                    DE: "Das Logo wurde aus den Buchstaben A und F entwickelt und zu einem kompakten geometrischen Symbol verfeinert. Eine subtile horizontale Konstruktion verweist auf den visuellen Rhythmus der Devanagari-Schrift, ohne ein traditionelles Zeichen direkt zu reproduzieren."
body[5] paragraph — EN: "The colour system uses red, blue, black and white. Red provides energy and a connection to Nepal’s national visual identity. Blue introduces calmness and references mountain landscapes. Black and white allow the cultural colours to remain controlled and wearable."
                    DE: "Das Farbsystem arbeitet mit Rot, Blau, Schwarz und Weiß. Rot vermittelt Energie und stellt eine Verbindung zur visuellen Identität Nepals her. Blau schafft Ruhe und verweist auf Berglandschaften. Schwarz und Weiß halten die kulturellen Farben kontrolliert und tragbar."
images[0] — aspect 4/3 · caption EN/DE (same) "[ logo sketches ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN/DE (same) "[ logo system + colours ]" · no src — renders as a hatched placeholder box

### sections[5] — id "development" · number "06" · navLabel EN "Collection & e-commerce" | DE "Kollektion & E-Commerce"
heading — EN: "Designing a collection, not isolated graphics" | DE: "Eine Kollektion statt einzelner Grafiken gestalten"
body[0] paragraph — EN: "The collection uses oversized unisex T-shirts as the primary product format. A small front mark keeps the garments easy to wear. Larger back prints carry the main visual narrative."
                    DE: "Die Kollektion verwendet Oversized-Unisex-T-Shirts als primäres Produktformat. Eine kleine Markierung auf der Vorderseite hält die Kleidungsstücke alltagstauglich. Größere Rückendrucke tragen die zentrale visuelle Erzählung."
body[1] list — 4 items
  items[0] — EN: "Himal — inspired by Nepal’s mountain landscape" | DE: "Himal — inspiriert von Nepals Berglandschaft"
  items[1] — EN: "City — based on contemporary urban life" | DE: "City — basierend auf zeitgenössischem urbanem Leben"
  items[2] — EN: "Mythic — exploring selected stories and symbolic references"
             DE: "Mythic — mit ausgewählten Geschichten und symbolischen Bezügen"
  items[3] — EN: "Logo Essentials — using the identity in its most reduced form"
             DE: "Logo Essentials — mit der Identität in ihrer reduziertesten Form"
body[2] sub-heading — EN: "Connecting product discovery with cultural storytelling"
                      DE: "Produktentdeckung mit kulturellem Storytelling verbinden"
body[3] paragraph — EN: "The website needed to balance two different user intentions: visitors who wanted to shop quickly and visitors who wanted to understand the stories behind the brand. The information architecture therefore separates direct product discovery from deeper brand and collection content."
                    DE: "Die Website musste zwei unterschiedliche Nutzerabsichten ausgleichen: Besucher, die schnell einkaufen möchten, und Besucher, die die Geschichten hinter der Marke verstehen möchten. Die Informationsarchitektur trennt deshalb direkte Produktentdeckung von ausführlicheren Marken- und Kollektionsinhalten."
body[4] paragraph — EN: "The prototype includes homepage, shop and collection pages, product details, lookbook, shopping cart, checkout, user account, collection stories and AI-assisted size guidance. Reusable components support consistent product cards, navigation, filters, buttons, forms and checkout states."
                    DE: "Der Prototyp umfasst Startseite, Shop- und Kollektionsseiten, Produktdetails, Lookbook, Warenkorb, Checkout, Nutzerkonto, Kollektionsgeschichten und eine KI-gestützte Größenberatung. Wiederverwendbare Komponenten unterstützen konsistente Produktkarten, Navigation, Filter, Buttons, Formulare und Checkout-Zustände."
images[0] — aspect 3/4 · caption EN/DE (same) "[ tee — front ]" · no src — renders as a hatched placeholder box
images[1] — aspect 3/4 · caption EN/DE (same) "[ tee — back print ]" · no src — renders as a hatched placeholder box
images[2] — aspect 3/4 · caption EN/DE (same) "[ print development ]" · no src — renders as a hatched placeholder box
images[3] — aspect 4/3 · caption EN/DE (same) "[ product page ]" · no src — renders as a hatched placeholder box
images[4] — aspect 4/3 · caption EN/DE (same) "[ size finder ]" · no src — renders as a hatched placeholder box
images[5] — aspect 4/3 · caption EN/DE (same) "[ cart ]" · no src — renders as a hatched placeholder box
images[6] — aspect 4/3 · caption EN/DE (same) "[ checkout ]" · no src — renders as a hatched placeholder box

### sections[6] — id "testing" · number "07" · navLabel EN "Testing" | DE "Testing"
heading — EN: "Testing navigation, orientation and purchase flow" | DE: "Navigation, Orientierung und Kaufprozess testen"
body[0] paragraph — EN: "Three usability sessions were conducted with three participants. Users were able to navigate through the main areas and understand the general brand story, imagery and interactions."
                    DE: "Drei Usability-Sessions wurden mit drei Teilnehmenden durchgeführt. Die Nutzer konnten sich durch die wichtigsten Bereiche bewegen und die grundlegende Markengeschichte, Bildsprache und Interaktionen verstehen."
body[1] list — 4 items
  items[0] — EN: "Navigation was not continuously visible" | DE: "Die Navigation war nicht durchgehend sichtbar"
  items[1] — EN: "The active location within the website was not always clear"
             DE: "Die aktuelle Position innerhalb der Website war nicht immer eindeutig"
  items[2] — EN: "Some labels and product descriptions needed clearer wording"
             DE: "Einige Labels und Produktbeschreibungen benötigten klarere Formulierungen"
  items[3] — EN: "Several prototype links and checkout steps were incomplete"
             DE: "Mehrere Verlinkungen und Checkout-Schritte waren noch unvollständig"
body[2] paragraph — EN: "The next iteration should introduce a sticky header, active navigation states, clearer page headings, more consistent product language and complete links between all critical shopping steps."
                    DE: "Die nächste Iteration sollte einen Sticky Header, aktive Navigationszustände, deutlichere Seitenüberschriften, konsistentere Produkttexte und vollständige Verbindungen zwischen allen wichtigen Kaufschritten enthalten."

### sections[7] — id "outcome" · number "08" · navLabel EN "Final outcome" | DE "Ergebnis"
heading — EN: "One identity across product, commerce and communication" | DE: "Eine Identität für Produkt, Commerce und Kommunikation"
body[0] paragraph — EN: "The final direction brings together naming, visual identity, clothing graphics, online shopping and social-media communication. The restrained front prints keep the products wearable, while collection-based back graphics carry cultural stories. The result is a scalable concept rather than a single logo or clothing graphic."
                    DE: "Die finale Richtung verbindet Naming, visuelle Identität, Bekleidungsgrafik, Online-Shopping und Social-Media-Kommunikation. Reduzierte Vorderseitendrucke halten die Produkte alltagstauglich, während kollektionsbasierte Rückengrafiken kulturelle Geschichten vermitteln. Das Ergebnis ist ein skalierbares Konzept und nicht nur ein einzelnes Logo oder Kleidungsdesign."
images[0] — aspect 16/9 · caption EN/DE (same) "[ final brand system — large showcase ]" · no src — renders as a hatched placeholder box
images[1] — aspect 16/10 · caption EN/DE (same) "[ social media ]" · no src — renders as a hatched placeholder box
images[2] — aspect 16/10 · caption EN/DE (same) "[ e-commerce prototype ]" · no src — renders as a hatched placeholder box

### sections[8] — id "reflection" · number "09" · navLabel EN "Limitations & reflection" | DE "Grenzen & Reflexion"
heading — EN: "A conceptual brand, presented transparently" | DE: "Eine konzeptionelle Marke, transparent dargestellt"
body[0] paragraph — EN: "AFONO remains a conceptual brand. No garments were manufactured, no material quality was tested and no real campaign photography was produced. AI-generated fashion images were used to visualise the intended campaign direction. These images are clearly labelled as conceptual and are not presented as evidence of physical production."
                    DE: "AFONO bleibt eine konzeptionelle Marke. Es wurden keine Kleidungsstücke produziert, keine Materialqualität getestet und kein reales Kampagnen-Fotoshooting durchgeführt. KI-generierte Modebilder wurden verwendet, um die beabsichtigte Kampagnenrichtung zu visualisieren. Diese Bilder werden eindeutig als konzeptionell gekennzeichnet und nicht als Nachweis einer physischen Produktion dargestellt."
body[1] paragraph — EN: "A future phase should include physical garment samples, print and wash testing, fabric and supplier evaluation, real product photography, larger usability studies and validation with Nepalese audiences and members of the diaspora."
                    DE: "Eine zukünftige Phase sollte physische Kleidungsprototypen, Druck- und Waschtests, Stoff- und Lieferantenbewertung, reale Produktfotografie, umfangreichere Usability-Tests und Validierung mit Zielgruppen in Nepal und der Diaspora umfassen."
body[2] sub-heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[3] paragraph — EN: "AFONO taught me that cultural design becomes stronger when it is selective. Adding more symbols did not automatically make the brand feel more authentic. The clearer direction came from deciding which cultural references were meaningful and translating them into a system suitable for contemporary clothing."
                    DE: "AFONO hat mir gezeigt, dass kulturelles Design stärker wird, wenn es selektiv eingesetzt wird. Mehr Symbole machten die Marke nicht automatisch authentischer. Die klarere Richtung entstand durch die Entscheidung, welche kulturellen Bezüge tatsächlich bedeutungsvoll sind und wie sie in ein System für zeitgenössische Kleidung übersetzt werden können."
body[4] paragraph — EN: "The project also showed how closely branding and user experience are connected. A strong logo and collection are not enough when product information, navigation or checkout interactions create uncertainty. The next iteration should move from visual simulation towards physical product validation."
                    DE: "Das Projekt zeigte außerdem, wie eng Branding und User Experience miteinander verbunden sind. Ein starkes Logo und eine gute Kollektion reichen nicht aus, wenn Produktinformationen, Navigation oder Checkout-Interaktionen Unsicherheit erzeugen. Die nächste Iteration sollte sich von der visuellen Simulation hin zur physischen Produktvalidierung bewegen."
```

### 5.3 Sync FM — `src/lib/caseStudies/sync-fm.ts`

```
### sync-fm.en / .de
name — EN/DE (same): "Sync FM"
projectTag — EN/DE (same): "Sync FM"
headline — EN: "Giving listeners control without turning radio into another dashboard."
           DE: "Hörerinnen und Hörern Kontrolle geben, ohne Radio in ein weiteres Dashboard zu verwandeln."
summary — EN: "Sync FM is an interactive AI-radio concept that combines the continuous experience of traditional radio with selected controls from personalised streaming. Listeners can adjust information depth, presenter tone and journalistic interpretation without having to assemble every programme manually."
          DE: "Sync FM ist ein interaktives KI-Radio, das das kontinuierliche Erlebnis des klassischen Radios mit ausgewählten Steuerungsmöglichkeiten personalisierter Streaming-Dienste verbindet. Nutzer können Informationstiefe, Moderationston und journalistische Einordnung anpassen, ohne jedes Programm manuell zusammenstellen zu müssen."
tags[0..4] — EN/DE (same): "Interaction Design" / "AI Concept" / "Mobile UI" / "Audio Experience" / "Prototyping"
role — EN: "Interaction & UI Designer" | DE: "Interaction & UI Designerin"
contribution — EN: "Co-developed the concept and interface with one teammate."
               DE: "Konzept und Interface gemeinsam mit einem Teammitglied entwickelt."
type — EN: "Semester project · team" | DE: "Semesterprojekt · Team"
year — EN/DE (same): undefined
tools — EN/DE (same): ""
deliverables — EN/DE (same): ""
heroImage.src — /images/hero-sync-fm.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "Sync FM's home screen with the news dial and the expanded player"
                DE: "Der Sync-FM-Homescreen mit Nachrichtenregler und erweitertem Player"

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] paragraph — EN: "The project investigates the space between passive radio consumption and active streaming. Traditional radio provides continuity, moderation and companionship, but can become repetitive and superficial. Streaming platforms provide control, but require frequent decisions and often lack editorial context."
                    DE: "Das Projekt untersucht den Raum zwischen passivem Radiokonsum und aktivem Streaming. Klassisches Radio bietet Kontinuität, Moderation und Begleitung, kann jedoch repetitiv und oberflächlich werden. Streaming-Plattformen bieten Kontrolle, verlangen jedoch häufige Entscheidungen und verfügen oft über wenig redaktionellen Kontext."
body[1] paragraph — EN: "Sync FM introduces an AI journalist that creates a continuous news flow while allowing the listener to influence how the information is prepared. The prototype focuses on news because it exposes questions of depth, tone, interpretation and algorithmic influence more clearly than music alone."
                    DE: "Sync FM führt einen KI-Journalisten ein, der einen kontinuierlichen Nachrichtenfluss erstellt. Gleichzeitig können Hörer beeinflussen, wie die Informationen aufbereitet werden. Der Prototyp konzentriert sich auf Nachrichten, da sich daran Fragen zu Tiefe, Tonalität, Interpretation und algorithmischem Einfluss deutlicher untersuchen lassen als an Musik allein."

### sections[1] — id "challenge" · number "02" · navLabel EN "Challenge" | DE "Herausforderung"
heading — EN: "Radio is effortless, but rarely personal." | DE: "Radio ist mühelos, aber selten persönlich."
body[0] paragraph — EN: "Traditional radio allows people to listen without planning every next step. This creates a sense of flow and companionship. However, standard programming is often designed around short listening periods, creating repetition during longer sessions."
                    DE: "Klassisches Radio ermöglicht Zuhören, ohne jeden nächsten Schritt planen zu müssen. Dadurch entstehen ein kontinuierlicher Ablauf und ein Gefühl von Begleitung. Standardprogramme sind jedoch häufig auf kurze Hörzeiten ausgelegt und wiederholen sich bei längerer Nutzung."
body[1] paragraph — EN: "Streaming solves the repetition problem through personal control. It also transfers responsibility to the listener, who must choose content, playlists, programmes and transitions. The design challenge was to introduce meaningful control without destroying the effortless character that makes radio attractive."
                    DE: "Streaming löst das Problem der Wiederholung durch persönliche Kontrolle. Gleichzeitig überträgt es die Verantwortung auf die Hörer, die Inhalte, Playlists, Programme und Übergänge selbst auswählen müssen. Die gestalterische Herausforderung bestand darin, sinnvolle Kontrolle einzuführen, ohne den mühelosen Charakter zu zerstören, der Radio attraktiv macht."
designQuestion — EN: "How might an auditory interface give listeners agency without overwhelming them with continuous decisions?"
                 DE: "Wie kann ein auditives Interface Handlungsspielraum bieten, ohne Hörer mit ständigen Entscheidungen zu überfordern?"

### sections[2] — id "research" · number "03" · navLabel EN "Analysis & personas" | DE "Analyse & Personas"
heading — EN: "Existing AI-radio systems automate content, but provide little transparency."
          DE: "Bestehende KI-Radios automatisieren Inhalte, bieten jedoch wenig Transparenz."
body[0] paragraph — EN: "The project compared regional and international examples, including AI-generated weather and traffic segments, AI-hosted web radio and AI-supported music recommendations. Existing systems generally use AI to automate presentation or generate content. Their internal selection logic remains largely invisible to listeners."
                    DE: "Das Projekt verglich regionale und internationale Beispiele, darunter KI-generierte Wetter- und Verkehrsmeldungen, KI-moderierte Webradios und KI-gestützte Musikempfehlungen. Bestehende Systeme nutzen KI hauptsächlich zur Automatisierung von Moderation oder Inhaltserstellung. Die interne Auswahl- und Aufbereitungslogik bleibt für Hörer weitgehend unsichtbar."
body[1] paragraph — EN: "Sync FM takes a different position. Instead of only automating the host, it exposes selected editorial controls to the user. The listener becomes a form of personal editor who can influence depth, tone and interpretation."
                    DE: "Sync FM nimmt eine andere Position ein. Anstatt ausschließlich die Moderation zu automatisieren, stellt das System ausgewählte redaktionelle Steuerungsmöglichkeiten bereit. Die Hörer werden zu persönlichen Redakteuren und können Tiefe, Tonalität und Interpretation beeinflussen."
body[2] sub-heading — EN: "Exploring different relationships with information" | DE: "Unterschiedliche Beziehungen zu Informationen untersuchen"
body[3] paragraph — EN: "Three personas were used to consider different age groups, listening contexts and attitudes towards information. They represented needs such as efficient access to facts, calm background listening, more energetic presentation, greater contextual depth and protection from information overload."
                    DE: "Drei Personas wurden verwendet, um unterschiedliche Altersgruppen, Hörsituationen und Einstellungen zu Informationen zu betrachten. Sie repräsentierten Bedürfnisse wie effizienten Zugang zu Fakten, ruhiges Hören im Hintergrund, energetischere Präsentation, größere inhaltliche Tiefe und Schutz vor Informationsüberlastung."
body[4] paragraph — EN: "These personas were generated with Gemini and then used as concept-development tools. They are therefore labelled as hypothesis personas, not as direct evidence from primary user research."
                    DE: "Die Personas wurden mit Gemini erstellt und anschließend als Werkzeuge für die Konzeptentwicklung genutzt. Sie werden deshalb als Hypothesen-Personas und nicht als direkte Ergebnisse primärer Nutzerforschung bezeichnet."
body[5] note — EN: "Label: AI-assisted hypothesis persona" | DE: "Kennzeichnung: KI-gestützte Hypothesen-Persona"
images[0] — aspect 16/8 · caption EN/DE (same) "[ competitor comparison ]" · no src — renders as a hatched placeholder box
images[1] — aspect 3/4 · caption EN/DE (same) "[ persona 01 ]" · no src — renders as a hatched placeholder box
images[2] — aspect 3/4 · caption EN/DE (same) "[ persona 02 ]" · no src — renders as a hatched placeholder box
images[3] — aspect 3/4 · caption EN/DE (same) "[ persona 03 ]" · no src — renders as a hatched placeholder box

### sections[3] — id "direction" · number "04" · navLabel EN "Interaction strategy" | DE "Interaktionsstrategie"
heading — EN: "Control through a few expressive decisions" | DE: "Kontrolle durch wenige ausdrucksstarke Entscheidungen"
body[0] paragraph — EN: "Rather than providing dozens of settings, the interface concentrates control into three high-level dimensions. These controls affect the ongoing audio flow rather than forcing listeners to select every individual item."
                    DE: "Anstatt zahlreiche Einstellungen anzubieten, konzentriert das Interface die Steuerung auf drei übergeordnete Dimensionen. Diese Einstellungen beeinflussen den fortlaufenden Audiofluss, anstatt die Hörer zur Auswahl jedes einzelnen Beitrags zu zwingen."
body[1] list — 3 items
  items[0] — EN: "How much information should be presented?" | DE: "Wie viele Informationen sollen vermittelt werden?"
  items[1] — EN: "How should the presenter sound?" | DE: "Wie soll die Moderation klingen?"
  items[2] — EN: "How much interpretation should be included?" | DE: "Wie stark sollen Interpretationen einbezogen werden?"
body[2] paragraph — EN: "The radio metaphor provides a familiar mental model. The system behaves like a continuous station, while the controls allow its character to be adjusted."
                    DE: "Die Radio-Metapher schafft ein vertrautes mentales Modell. Das System verhält sich wie ein kontinuierlicher Sender, während die Steuerungen seinen Charakter anpassbar machen."

### sections[4] — id "development" · number "05" · navLabel EN "The three controls" | DE "Die drei Steuerungen"
heading — EN: "The three controls" | DE: "Die drei Steuerungen"
body[0] paragraph — EN: "Sync Dial — The central dial adjusts the depth of information. Turning it towards the lower end reduces stories to brief headlines. Turning it towards the higher end introduces longer explanations, context and analysis. A responsive waveform provides visual feedback."
                    DE: "Sync Dial — Der zentrale Drehregler steuert die Informationstiefe. Eine Bewegung zum unteren Bereich reduziert Beiträge auf kurze Schlagzeilen. Eine Bewegung zum höheren Bereich führt zu ausführlicheren Erklärungen, Kontext und Analyse. Eine reagierende Wellenform gibt visuelles Feedback."
body[1] paragraph — EN: "Mood Bar — The Mood Bar adjusts the personality and rhythm of the AI presenter. A calm setting uses slower pacing, neutral language and longer pauses. A more energetic setting increases pace. This changes presentation, not the factual content itself."
                    DE: "Mood Bar — Die Mood Bar verändert Persönlichkeit und Rhythmus der KI-Moderation. Eine ruhige Einstellung nutzt langsameres Sprechen, neutrale Sprache und längere Pausen. Eine energetischere Einstellung erhöht das Tempo. Dabei verändert sich die Präsentation und nicht der faktische Inhalt."
body[2] paragraph — EN: "Opinion Filter — The Opinion Filter controls the amount of journalistic interpretation. The control is intended to make framing visible. It also introduces an important ethical risk: users may remove uncomfortable perspectives and reinforce an existing worldview."
                    DE: "Opinion Filter — Der Opinion Filter steuert den Anteil journalistischer Interpretation. Die Steuerung soll Framing sichtbar machen. Sie bringt jedoch ein wichtiges ethisches Risiko mit sich: Nutzer könnten unangenehme Perspektiven ausblenden und bestehende Weltbilder verstärken."
body[3] sub-heading — EN: "Combining the familiarity of radio with a digital AI system"
                      DE: "Die Vertrautheit des Radios mit einem digitalen KI-System verbinden"
body[4] paragraph — EN: "The visual language uses circular forms, rounded containers and wave-based feedback to connect the interface to audio and radio. Purple creates a distinctive technological identity while remaining less clinical than the blue systems frequently used by technology products. Futura is used for prominent headings, while Segoe UI supports longer interface and news text."
                    DE: "Die visuelle Sprache verwendet kreisförmige Elemente, abgerundete Container und wellenbasierte Rückmeldungen, um eine Verbindung zu Audio und Radio herzustellen. Lila schafft eine eigenständige technologische Identität und wirkt weniger klinisch als viele blaue Technologiesysteme. Futura wird für prominente Überschriften eingesetzt, während Segoe UI längere Interface- und Nachrichtentexte unterstützt."
body[5] paragraph — EN: "The logo transforms a traditional radio into a simple character-like form. Initial concepts were generated with Gemini and then adjusted and refined by the team into a flat vector system. This AI-assisted stage is disclosed within the process."
                    DE: "Das Logo verwandelt ein traditionelles Radio in eine einfache, charakterähnliche Form. Erste Konzepte wurden mit Gemini generiert und anschließend vom Team zu einem flachen Vektorsystem angepasst und verfeinert. Diese KI-gestützte Phase wird im Prozess transparent dargestellt."
images[0] — aspect 1/1 · caption EN/DE (same) "[ sync dial ]" · no src — renders as a hatched placeholder box
images[1] — aspect 1/1 · caption EN/DE (same) "[ mood bar ]" · no src — renders as a hatched placeholder box
images[2] — aspect 1/1 · caption EN/DE (same) "[ opinion filter ]" · no src — renders as a hatched placeholder box
images[3] — aspect 4/3 · caption EN/DE (same) "[ logo + visual system ]" · no src — renders as a hatched placeholder box
images[4] — aspect 4/3 · caption EN/DE (same) "[ components ]" · no src — renders as a hatched placeholder box

### sections[5] — id "outcome" · number "06" · navLabel EN "Final experience" | DE "Ergebnis"
heading — EN: "A continuous information flow shaped in real time"
          DE: "Ein kontinuierlicher Informationsfluss, der in Echtzeit angepasst wird"
body[0] paragraph — EN: "The final prototype presents a mobile radio experience centred on the current audio stream. The Sync Dial remains visually dominant because it controls the broadest change. Secondary controls adjust presenter tone and interpretation without interrupting listening."
                    DE: "Der finale Prototyp zeigt ein mobiles Radioerlebnis, das sich auf den aktuellen Audiofluss konzentriert. Der Sync Dial bleibt visuell dominant, da er die umfassendste Veränderung steuert. Sekundäre Steuerungen verändern Moderationston und Interpretation, ohne das Zuhören zu unterbrechen."
body[1] paragraph — EN: "The result is not a complete functioning AI-radio service. It is an interaction prototype demonstrating how editorial control could be introduced without requiring a complex settings dashboard."
                    DE: "Das Ergebnis ist kein vollständig funktionierender KI-Radiosender. Es handelt sich um einen Interaktionsprototyp, der zeigt, wie redaktionelle Kontrolle eingeführt werden könnte, ohne ein komplexes Einstellungs-Dashboard zu erzeugen."
images[0] — aspect 16/9 · caption EN/DE (same) "[ final mobile screens — large showcase ]" · no src — renders as a hatched placeholder box

### sections[6] — id "testing" · number "07" · navLabel EN "Evaluation & ethics" | DE "Evaluation & Ethik"
heading — EN: "Control is not automatically neutral." | DE: "Kontrolle ist nicht automatisch neutral."
body[0] paragraph — EN: "The interface should be evaluated against three questions: can users understand the effect of each control before activating it, can they adjust the system without interrupting listening, and do they understand when content represents fact, analysis or interpretation?"
                    DE: "Das Interface sollte anhand von drei Fragen evaluiert werden: Verstehen Nutzer die Wirkung jeder Steuerung vor ihrer Aktivierung? Können sie das System anpassen, ohne den Hörfluss zu unterbrechen? Erkennen sie, wann Inhalte Fakten, Analyse oder Interpretation darstellen?"
body[1] paragraph — EN: "The opinion control creates the most important unresolved risk. Giving users control over journalistic framing may increase transparency, but it may also create filter bubbles and remove necessary opposing perspectives."
                    DE: "Die Meinungssteuerung erzeugt das wichtigste ungelöste Risiko. Kontrolle über journalistisches Framing kann Transparenz erhöhen, aber auch Filterblasen erzeugen und notwendige Gegenperspektiven entfernen."
body[2] list — 5 items
  items[0] — EN: "Visible source information" | DE: "Sichtbare Quelleninformationen"
  items[1] — EN: "Clear labels for fact, context and interpretation" | DE: "Klare Kennzeichnungen für Fakt, Kontext und Interpretation"
  items[2] — EN: "Limits preventing complete removal of alternative perspectives"
             DE: "Grenzen, die eine vollständige Entfernung alternativer Perspektiven verhindern"
  items[3] — EN: "Explanations of why certain stories appear" | DE: "Erklärungen, warum bestimmte Beiträge erscheinen"
  items[4] — EN: "A reset to a balanced editorial mode" | DE: "Eine Rückkehr zu einem ausgewogenen redaktionellen Modus"
images[0] — aspect 16/8 · caption EN/DE (same) "[ ethical-risk diagram ]" · no src — renders as a hatched placeholder box

### sections[7] — id "reflection" · number "08" · navLabel EN "Limitations & reflection" | DE "Grenzen & Reflexion"
heading — EN: "Separating concept, prototype and future behaviour"
          DE: "Konzept, Prototyp und zukünftiges Verhalten klar unterscheiden"
body[0] paragraph — EN: "The personas were AI-assisted hypotheses rather than findings from interviews. The project documentation does not provide enough evidence for strong claims about long-term usability, trust or listening behaviour. The concept also depends on technology that was not implemented within the prototype, including real-time audio generation, source verification and content moderation."
                    DE: "Die Personas waren KI-gestützte Hypothesen und keine Ergebnisse aus Interviews. Die Dokumentation bietet nicht genügend Evidenz für starke Aussagen zu langfristiger Benutzerfreundlichkeit, Vertrauen oder Hörverhalten. Das Konzept ist außerdem von Technologien abhängig, die im Prototyp nicht implementiert wurden, darunter Echtzeit-Audiogenerierung, Quellenprüfung und Inhaltsmoderation."
body[1] paragraph — EN: "The case study therefore distinguishes clearly between interaction concept, visual prototype, tested interface elements and future technical behaviour."
                    DE: "Die Fallstudie unterscheidet deshalb klar zwischen Interaktionskonzept, visuellem Prototyp, getesteten Interface-Elementen und zukünftigem technischen Verhalten."
body[2] sub-heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[3] paragraph — EN: "Sync FM showed me that personalisation becomes more valuable when it is expressed through a small number of understandable controls. Adding every possible setting would have recreated the complexity the concept was intended to remove."
                    DE: "Sync FM hat mir gezeigt, dass Personalisierung wertvoller wird, wenn sie durch wenige verständliche Steuerungen ausgedrückt wird. Das Hinzufügen jeder möglichen Einstellung hätte genau die Komplexität erzeugt, die das Konzept reduzieren sollte."
body[4] paragraph — EN: "The project also revealed that control is not automatically neutral. Allowing users to shape journalistic framing creates ethical consequences that need to be designed as carefully as the interface itself. A future version should combine interaction testing with research on trust, media literacy and algorithmic transparency."
                    DE: "Das Projekt verdeutlichte außerdem, dass Kontrolle nicht automatisch neutral ist. Wenn Nutzer journalistisches Framing beeinflussen können, entstehen ethische Konsequenzen, die ebenso sorgfältig gestaltet werden müssen wie das Interface selbst. Eine zukünftige Version sollte Interaktionstests mit Forschung zu Vertrauen, Medienkompetenz und algorithmischer Transparenz verbinden."
```

### 5.4 Barrier-Free Kitchen — `src/lib/caseStudies/barrier-free-kitchen.ts`

```
### barrier-free-kitchen.en / .de
name — EN: "Barrier-Free Kitchen" | DE: "Barrierefreie Küche"
projectTag — EN: "Barrier-Free Kitchen" | DE: "Barrierefreie Küche"
headline — EN: "Designing a kitchen through reach, sight and touch."
           DE: "Eine Küche durch Reichweite, Sehen und Berührung gestalten."
summary — EN: "This inclusive-design project explores how a kitchen can better support wheelchair users and people with cataracts. The concept was developed through observation, an interview, embodied testing, physical prototypes and a final animated Blender environment."
          DE: "Dieses Inclusive-Design-Projekt untersucht, wie eine Küche Menschen im Rollstuhl und Personen mit Grauem Star besser unterstützen kann. Das Konzept entstand durch Beobachtung, ein Interview, Selbsterfahrung, physische Prototypen und eine abschließende animierte Blender-Umgebung."
tags[0..4] — EN/DE (same): "Inclusive Design" / "Design Research" / "Spatial Design" / "Physical Prototyping" / "3D Visualisation"
role — EN: "Prototyping & 3D Designer" | DE: "Prototyping & 3D Design"
contribution — EN: "Created paper and 3D models, materials and textures, and participated in testing."
               DE: "Papier- und 3D-Modelle, Materialien und Texturen erstellt sowie an Tests mitgewirkt."
type — EN: "Semester project · team" | DE: "Semesterprojekt · Team"
year — EN/DE (same): undefined
tools — EN/DE (same): ""
deliverables — EN: "Final rendering by a team member." | DE: "Finales Rendering von einem Teammitglied."
heroImage.src — /images/hero-barrier-free-kitchen.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "The barrier-free kitchen modelled in 3D, seen along the counter"
                DE: "Die barrierefreie Küche als 3D-Modell, entlang der Arbeitsplatte gesehen"

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] paragraph — EN: "The project focused on two user groups: wheelchair users and people with visual impairment, particularly cataracts."
                    DE: "Im Mittelpunkt standen zwei Nutzergruppen: Menschen im Rollstuhl und Menschen mit einer Sehbeeinträchtigung, insbesondere Grauem Star."
body[1] paragraph — EN: "The process began with the investigation of existing kitchens and everyday tasks. The team then developed spatial concepts using wooden blocks and Lego, mapped a complete cooking journey, built full-scale paper prototypes and translated the resulting system into a Blender environment with an animated wheelchair user."
                    DE: "Der Prozess begann mit der Untersuchung bestehender Küchen und alltäglicher Handlungen. Anschließend entwickelte das Team räumliche Konzepte mit Holzklötzen und Lego, erstellte eine vollständige Journey Map, baute Papierprototypen im Maßstab 1:1 und übertrug das resultierende System in eine Blender-Umgebung mit einer animierten Rollstuhlnutzerin."

### sections[1] — id "challenge" · number "02" · navLabel EN "Challenge" | DE "Herausforderung"
heading — EN: "Standard kitchen layouts assume a narrow range of bodies and abilities."
          DE: "Standardküchen setzen einen engen Bereich körperlicher Fähigkeiten voraus."
body[0] paragraph — EN: "Conventional kitchens frequently place storage, controls and work surfaces outside the comfortable reach of wheelchair users. They also depend heavily on visual cues such as small text, weak contrast, smooth touch controls and transparent containers."
                    DE: "Konventionelle Küchen platzieren Stauraum, Bedienelemente und Arbeitsflächen häufig außerhalb der komfortablen Reichweite von Menschen im Rollstuhl. Gleichzeitig verlassen sie sich stark auf visuelle Hinweise wie kleine Schrift, schwache Kontraste, glatte Touch-Bedienungen und transparente Behälter."
body[1] paragraph — EN: "These barriers can make simple actions slower, unsafe or impossible without assistance."
                    DE: "Diese Barrieren können einfache Handlungen verlangsamen, unsicher machen oder ohne Unterstützung unmöglich werden lassen."
designQuestion — EN: "How might a kitchen support more independent use when reach, mobility and visual perception are limited?"
                 DE: "Wie kann eine Küche selbstständigere Nutzung unterstützen, wenn Reichweite, Mobilität und visuelle Wahrnehmung eingeschränkt sind?"

### sections[2] — id "research" · number "03" · navLabel EN "Research" | DE "Research"
heading — EN: "Studying real actions rather than isolated dimensions" | DE: "Reale Handlungen statt isolierter Maße untersuchen"
body[0] list — 5 items
  items[0] — EN: "An interview with a person affected by cataracts" | DE: "Ein Interview mit einer Person mit Grauem Star"
  items[1] — EN: "Observation of a participant using a kitchen" | DE: "Beobachtung einer Testperson bei der Küchennutzung"
  items[2] — EN: "Simulated wheelchair-use scenarios" | DE: "Simulierte Nutzung aus einer Rollstuhl-Situation"
  items[3] — EN: "Simulated visual impairment using cataract glasses" | DE: "Simulierte Sehbeeinträchtigung mit einer Grauer-Star-Brille"
  items[4] — EN: "Task-based testing with three participants" | DE: "Aufgabenbasierte Tests mit drei Teilnehmenden"
body[1] paragraph — EN: "The team examined typical actions including opening cabinets, locating objects, operating appliances, using the sink, reading labels, sitting at a table and identifying controls through touch."
                    DE: "Untersucht wurden typische Handlungen wie das Öffnen von Schränken, das Finden von Gegenständen, die Bedienung von Geräten, die Nutzung der Spüle, das Lesen von Beschriftungen, das Sitzen am Tisch und das Erkennen von Bedienelementen durch Berührung."
body[2] note — EN: "Research note: Simulation can reveal obvious spatial and perceptual barriers, but it does not reproduce the lived experience of disability."
               DE: "Hinweis: Simulation kann offensichtliche räumliche und wahrnehmungsbezogene Barrieren sichtbar machen, ersetzt jedoch nicht die gelebte Erfahrung von Behinderung."
images[0] — aspect 4/3 · caption EN "[ kitchen observation ]" | DE "[ küchenbeobachtung ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ simulation testing ]" | DE "[ simulationstest ]" · no src — renders as a hatched placeholder box

### sections[3] — id "direction" · number "04" · navLabel EN "Framework" | DE "Framework"
heading — EN: "Sight, action and tactile space" | DE: "Sehraum, Wirkraum und Tastraum"
body[0] sub-heading — EN: "Key barriers" | DE: "Zentrale Barrieren"
body[1] list — 3 items
  items[0] — EN: "Sight — Small labels · weak contrast · transparent containers · thin markings · dark storage · similar containers"
             DE: "Sehen — Kleine Beschriftungen · schwacher Kontrast · transparente Behälter · dünne Markierungen · dunkler Stauraum · ähnliche Behälter"
  items[1] — EN: "Reach — High cabinets · deep surfaces · inaccessible taps · insufficient clearance · narrow entrances · objects too far back"
             DE: "Reichweite — Hohe Schränke · tiefe Flächen · unzugängliche Armaturen · fehlende Unterfahrbarkeit · schmale Zugänge · zu weit entfernte Objekte"
  items[2] — EN: "Touch — Similar controls · small tactile markers · touch surfaces without feedback · identical handles · unclear induction areas"
             DE: "Tasten — Ähnliche Bedienelemente · kleine taktile Marker · Touch-Flächen ohne Feedback · identische Griffe · unklare Induktionsbereiche"
insights[0].heading — EN: "Sight" | DE: "Sehraum"
insights[0].body — EN: "What can be seen, distinguished and understood visually? Contrast · text size · lighting · object differentiation · visibility of controls · visual organisation"
                   DE: "Was kann visuell gesehen, unterschieden und verstanden werden? Kontrast · Textgröße · Beleuchtung · Unterscheidbarkeit · Sichtbarkeit der Bedienelemente · visuelle Ordnung"
insights[1].heading — EN: "Action" | DE: "Wirkraum"
insights[1].body — EN: "Where can a person reach, move and perform an action? Turning space · reach distance · worktop height · under-clearance · cabinet depth · access to appliances"
                   DE: "Wo kann eine Person hinreichen, sich bewegen und eine Handlung ausführen? Wendefläche · Reichweite · Arbeitshöhe · Unterfahrbarkeit · Schranktiefe · Zugang zu Geräten"
insights[2].heading — EN: "Touch" | DE: "Tastraum"
insights[2].body — EN: "What can be identified and controlled through touch? Tactile markers · distinct handle forms · physical buttons · control position · surface differences · feedback"
                   DE: "Was kann durch Berührung erkannt und gesteuert werden? Taktile Marker · unterscheidbare Griffe · physische Tasten · Position der Bedienelemente · Oberflächenunterschiede · Feedback"

### sections[4] — id "development" · number "05" · navLabel EN "Concept development" | DE "Konzeptentwicklung"
heading — EN: "Moving from observations to spatial relationships" | DE: "Beobachtungen in räumliche Beziehungen übersetzen"
body[0] paragraph — EN: "Wooden blocks were used to explore the general relationship between storage, work surfaces, appliances and movement areas. Lego Serious Play allowed the team to compare different room arrangements and discuss where important actions should occur."
                    DE: "Holzklötze wurden verwendet, um die grundlegenden Beziehungen zwischen Stauraum, Arbeitsflächen, Geräten und Bewegungsbereichen zu untersuchen. Lego Serious Play ermöglichte den Vergleich verschiedener Raumaufteilungen und half bei der Diskussion, wo wichtige Handlungen stattfinden sollten."
body[1] paragraph — EN: "A journey map then connected these spatial decisions to a complete sequence. This prevented the design from focusing on isolated features without considering the complete cooking process."
                    DE: "Eine Journey Map verband diese räumlichen Entscheidungen anschließend zu einer vollständigen Abfolge. Dadurch konzentrierte sich das Design nicht nur auf einzelne Funktionen, sondern auf den vollständigen Kochprozess."
body[2] list (numbered) — 5 items
  items[0] — EN: "Storage or refrigerator" | DE: "Stauraum oder Kühlschrank"
  items[1] — EN: "Sink" | DE: "Spüle"
  items[2] — EN: "Work surface" | DE: "Arbeitsfläche"
  items[3] — EN: "Hob and oven" | DE: "Herd und Ofen"
  items[4] — EN: "Dining area" | DE: "Essbereich"
images[0] — aspect 4/3 · caption EN "[ wooden blocks ]" | DE "[ holzklötze ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ lego study ]" | DE "[ lego-studie ]" · no src — renders as a hatched placeholder box
images[2] — aspect 4/3 · caption EN/DE (same) "[ journey map ]" · no src — renders as a hatched placeholder box

### sections[5] — id "testing" · number "06" · navLabel EN "Full-scale testing" | DE "Test im Maßstab 1:1"
heading — EN: "Testing the kitchen at the scale of the body" | DE: "Die Küche im Maßstab des Körpers testen"
body[0] paragraph — EN: "Paper prototypes were built at full scale to test cabinet positions, work surfaces, sink access, oven controls, handles and movement space. This stage revealed problems that were difficult to identify in small models. Reach distances, turning areas and control positions could be evaluated through actual movement."
                    DE: "Papierprototypen wurden im Maßstab 1:1 gebaut, um Schrankpositionen, Arbeitsflächen, Spülenzugang, Ofenbedienung, Griffe und Bewegungsflächen zu testen. Diese Phase machte Probleme sichtbar, die in kleinen Modellen schwer zu erkennen waren. Reichweiten, Wendeflächen und Positionen von Bedienelementen konnten durch tatsächliche Bewegung überprüft werden."
body[1] paragraph — EN: "Observations were translated directly into revisions rather than being treated as final confirmation."
                    DE: "Die Beobachtungen wurden direkt in Überarbeitungen übersetzt und nicht als reine Bestätigung des ersten Konzepts behandelt."
images[0] — aspect 4/3 · caption EN "[ full-scale prototype ]" | DE "[ prototyp im maßstab 1:1 ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ testing session ]" | DE "[ testsitzung ]" · no src — renders as a hatched placeholder box

### sections[6] — id "outcome" · number "07" · navLabel EN "Principles & outcome" | DE "Prinzipien & Ergebnis"
heading — EN: "Five final principles" | DE: "Fünf Gestaltungsprinzipien"
body[0] sub-heading — EN: "Translating research into a spatial prototype" | DE: "Recherche in einen räumlichen Prototyp übersetzen"
body[1] paragraph — EN: "The final design was modelled in Blender and populated with appliances, storage, work surfaces and accessibility features. An animated wheelchair user demonstrates how the kitchen could function across different tasks."
                    DE: "Das finale Design wurde in Blender modelliert und mit Geräten, Stauraum, Arbeitsflächen und barrierearmen Funktionen ergänzt. Eine animierte Rollstuhlnutzerin zeigt, wie die Küche bei unterschiedlichen Aufgaben funktionieren könnte."
body[2] paragraph — EN: "EEVEE was used for the final animation because a Cycles render was estimated to require approximately 26 days. This reduced rendering time but resulted in darker materials and lower visual quality. The compromise is acknowledged rather than hidden."
                    DE: "Für die finale Animation wurde EEVEE verwendet, da eine Berechnung mit Cycles schätzungsweise etwa 26 Tage benötigt hätte. Dadurch wurde die Renderzeit reduziert, gleichzeitig entstanden jedoch dunklere Materialien und eine geringere visuelle Qualität. Dieser Kompromiss wird transparent dargestellt."
insights[0].heading — EN: "Adjustable reach" | DE: "Anpassbare Reichweite"
insights[0].body — EN: "Height-adjustable worktops, storage and selected appliances allow the environment to respond to different seated and standing users."
                   DE: "Höhenverstellbare Arbeitsflächen, Stauraum und ausgewählte Geräte lassen die Umgebung auf unterschiedliche sitzende und stehende Nutzer reagieren."
insights[1].heading — EN: "Clear movement" | DE: "Klare Bewegung"
insights[1].body — EN: "Turning space and under-clearance allow wheelchair users to approach work areas more directly."
                   DE: "Wendeflächen und Unterfahrbarkeit ermöglichen Rollstuhlnutzern einen direkteren Zugang zu Arbeitsbereichen."
insights[2].heading — EN: "Strong visual contrast" | DE: "Starker visueller Kontrast"
insights[2].body — EN: "Black and white contrast makes handles, labels, controls and functional areas easier to distinguish."
                   DE: "Schwarz-Weiß-Kontraste machen Griffe, Beschriftungen, Bedienelemente und Funktionsbereiche leichter unterscheidbar."
insights[3].heading — EN: "Tactile differentiation" | DE: "Taktile Unterscheidung"
insights[3].body — EN: "Buttons, handles and control areas use different physical forms. Tactile squares on the induction surface help users locate cooking zones without relying only on vision."
                   DE: "Tasten, Griffe und Bedienbereiche nutzen unterschiedliche physische Formen. Taktile Quadrate auf dem Induktionsfeld helfen, Kochzonen ohne reinen Sehbezug zu finden."
insights[4].heading — EN: "Organised storage" | DE: "Organisierter Stauraum"
insights[4].body — EN: "Frequently used items are placed within accessible zones and should be distinguishable through position, labelling and container form."
                   DE: "Häufig genutzte Gegenstände liegen in erreichbaren Zonen und sind durch Position, Beschriftung und Behälterform unterscheidbar."
images[0] — aspect 16/9 · caption EN "[ blender environment + animation — large showcase ]" | DE "[ blender-umgebung + animation — große präsentation ]" · no src — renders as a hatched placeholder box
images[1] — aspect 16/10 · caption EN "[ 3d model process ]" | DE "[ 3d-modell-prozess ]" · no src — renders as a hatched placeholder box
images[2] — aspect 16/10 · caption EN "[ materials + textures ]" | DE "[ materialien + texturen ]" · no src — renders as a hatched placeholder box

### sections[7] — id "reflection" · number "08" · navLabel EN "Limitations & reflection" | DE "Grenzen & Reflexion"
heading — EN: "Formative evidence, not comprehensive validation" | DE: "Formative Erkenntnisse, keine umfassende Validierung"
body[0] paragraph — EN: "The process provides useful formative evidence through observation, one interview, three participant tests and full-scale prototyping. It does not represent comprehensive validation with a diverse group of wheelchair users and people with different forms and stages of visual impairment."
                    DE: "Der Prozess liefert nützliche formative Erkenntnisse durch Beobachtung, ein Interview, Tests mit drei Personen und Prototyping im Maßstab 1:1. Er stellt keine umfassende Validierung mit einer vielfältigen Gruppe von Rollstuhlnutzern und Personen mit unterschiedlichen Formen visueller Beeinträchtigung dar."
body[1] list — 6 items
  items[0] — EN: "Simulated disability experience" | DE: "Simulierte Behinderungserfahrung"
  items[1] — EN: "Small number of participants" | DE: "Kleine Anzahl an Teilnehmenden"
  items[2] — EN: "No long-term kitchen use" | DE: "Keine langfristige Küchennutzung"
  items[3] — EN: "No engineering validation and no safety or building-code verification"
             DE: "Keine technische Validierung und keine Prüfung von Sicherheits- oder Bauvorschriften"
  items[4] — EN: "No physical production of the adjustable mechanisms" | DE: "Keine physische Umsetzung der verstellbaren Mechanismen"
  items[5] — EN: "Reduced final render quality" | DE: "Reduzierte Qualität des finalen Renderings"
body[2] paragraph — EN: "A future phase should include co-design with disabled participants from the beginning, occupational-therapy expertise and technical feasibility testing."
                    DE: "Eine zukünftige Phase sollte Co-Design mit behinderten Teilnehmenden von Beginn an, ergotherapeutische Expertise und technische Machbarkeitstests einbeziehen."
body[3] sub-heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[4] paragraph — EN: "This project showed me that accessibility problems are often created by ordinary design decisions that are treated as neutral. A cabinet height, smooth control surface or low-contrast label may appear minor until it prevents a person from completing a basic action independently."
                    DE: "Dieses Projekt hat mir gezeigt, dass Barrieren häufig durch alltägliche Designentscheidungen entstehen, die als neutral betrachtet werden. Eine Schrankhöhe, eine glatte Bedienoberfläche oder eine kontrastarme Beschriftung kann unbedeutend erscheinen, bis sie eine selbstständige Handlung verhindert."
body[5] paragraph — EN: "The most valuable stage was full-scale testing. Several issues only became visible when the environment was experienced through movement rather than viewed as a drawing. The next iteration should involve disabled participants as design partners rather than relying mainly on simulation."
                    DE: "Die wertvollste Phase war das Testen im Maßstab 1:1. Mehrere Probleme wurden erst sichtbar, als die Umgebung durch Bewegung erlebt und nicht nur als Zeichnung betrachtet wurde. Die nächste Iteration sollte behinderte Menschen als Designpartner einbeziehen, anstatt sich hauptsächlich auf Simulation zu verlassen."
```

### 5.5 Surugami — `src/lib/caseStudies/surugami.ts`

```
### surugami.en / .de
name — EN/DE (same): "Surugami"
projectTag — EN/DE (same): "Surugami"
headline — EN: "Making origami feel social, contemporary and easy to enter."
           DE: "Origami sozial, zeitgemäß und leicht zugänglich gestalten."
summary — EN: "Surugami is an origami-inspired brand and digital experience that connects learning, workshops, visual storytelling and community participation through one coherent identity."
          DE: "Surugami ist eine von Origami inspirierte Marke und digitale Erfahrung, die Lernen, Workshops, visuelles Storytelling und Community-Teilnahme in einer konsistenten Identität verbindet."
tags[0..4] — EN/DE (same): "Brand Identity" / "Graphic Design" / "Print Design" / "Web Design" / "Prototyping"
role — EN: "Illustration, Poster & Web Design" | DE: "Illustration, Poster- & Webdesign"
contribution — EN: "Created illustrations, one poster, mock-ups and co-designed the website."
               DE: "Illustrationen, ein Poster und Mock-ups gestaltet sowie die Website mitentwickelt."
type — EN: "Semester project · team" | DE: "Semesterprojekt · Team"
year — EN/DE (same): undefined
tools — EN/DE (same): ""
deliverables — EN: "Illustration, one poster and mock-ups by Alexsha · Website co-designed · Brand direction collaborative"
               DE: "Illustration, ein Poster und Mock-ups von Alexsha · Website gemeinsam gestaltet · Markenrichtung im Team entwickelt"
heroImage.src — /images/hero-surugami.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "Two Surugami posters inviting people to hands-on origami courses"
                DE: "Zwei Surugami-Plakate laden zu Origami-Kursen zum Mitmachen ein"

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] paragraph — EN: "Surugami was developed as a community-oriented origami brand. The project includes visual research, brand positioning, identity development, posters, banners, flyers, campaign material and an interactive website prototype."
                    DE: "Surugami wurde als community-orientierte Origami-Marke entwickelt. Das Projekt umfasst visuelle Recherche, Markenpositionierung, Identitätsentwicklung, Poster, Banner, Flyer, Kampagnenmaterial und einen interaktiven Website-Prototyp."
body[1] paragraph — EN: "The concept treats origami not only as a finished paper object, but as a process involving curiosity, learning and shared creation."
                    DE: "Das Konzept betrachtet Origami nicht nur als fertiges Papierobjekt, sondern als Prozess aus Neugier, Lernen und gemeinsamem Gestalten."

### sections[1] — id "challenge" · number "02" · navLabel EN "Challenge" | DE "Herausforderung"
heading — EN: "A familiar craft can still feel difficult to enter."
          DE: "Ein bekanntes Handwerk kann trotzdem schwer zugänglich wirken."
body[0] paragraph — EN: "Origami is visually recognisable, but beginners may associate it with complex instructions, precision and individual practice."
                    DE: "Origami ist visuell leicht wiederzuerkennen. Anfänger können es jedoch mit komplexen Anleitungen, hoher Präzision und individueller Übung verbinden."
body[1] paragraph — EN: "A new brand needed to communicate both the calm craft of folding and the energy of a contemporary creative community. It had to remain playful enough to invite participation without looking childish or visually uncontrolled."
                    DE: "Eine neue Marke musste sowohl die ruhige Qualität des Faltens als auch die Energie einer zeitgenössischen kreativen Community vermitteln. Sie sollte einladend und spielerisch wirken, ohne kindlich oder visuell unkontrolliert zu werden."
designQuestion — EN: "How might an origami brand preserve the character of the craft while making it inviting to beginners and a wider creative community?"
                 DE: "Wie kann eine Origami-Marke den Charakter des Handwerks bewahren und es gleichzeitig für Anfänger und eine größere kreative Community zugänglich machen?"

### sections[2] — id "research" · number "03" · navLabel EN "Research" | DE "Research"
heading — EN: "Looking beyond traditional craft branding" | DE: "Über traditionelle Handwerksmarken hinausblicken"
body[0] paragraph — EN: "The research combined visual market analysis, inspiration from educational and interactive digital products, mood boards, concept mapping, audience profiles, brand-value exploration and comparative layout studies."
                    DE: "Die Recherche kombinierte visuelle Marktanalyse, Inspiration durch interaktive und edukative digitale Produkte, Moodboards, Concept Mapping, Zielgruppenprofile, die Untersuchung von Markenwerten und vergleichende Layoutstudien."
body[1] paragraph — EN: "The references suggested that educational content becomes more engaging when information is divided into clear steps, supported by strong visual storytelling and presented through an identifiable personality. Surugami therefore needed to operate as more than a shop or tutorial archive. It had to feel like a place where people could learn, participate and see what others had created."
                    DE: "Die Referenzen deuteten darauf hin, dass Lerninhalte ansprechender werden, wenn Informationen in klare Schritte unterteilt, durch starkes visuelles Storytelling unterstützt und mit einer wiedererkennbaren Persönlichkeit vermittelt werden. Surugami sollte deshalb mehr sein als ein Shop oder Tutorial-Archiv. Die Marke sollte sich wie ein Ort anfühlen, an dem Menschen lernen, teilnehmen und die Arbeiten anderer entdecken können."
images[0] — aspect 4/3 · caption EN "[ research board ]" | DE "[ research-board ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN/DE (same) "[ concept map ]" · no src — renders as a hatched placeholder box

### sections[3] — id "insights" · number "04" · navLabel EN "Key insights" | DE "Zentrale Erkenntnisse"
heading — EN: "Key insights" | DE: "Zentrale Erkenntnisse"
insights[0].heading — EN: "Beginners need a visible point of entry." | DE: "Anfänger benötigen einen sichtbaren Einstiegspunkt."
insights[0].body — EN: "Tutorials, workshops and navigation should clearly communicate difficulty and required time."
                   DE: "Tutorials, Workshops und Navigation sollten Schwierigkeitsgrad und Zeitaufwand klar vermitteln."
insights[1].heading — EN: "Community makes the craft feel less solitary." | DE: "Community lässt das Handwerk weniger isoliert wirken."
insights[1].body — EN: "Showing participant work, events and shared projects can turn origami from an isolated activity into a social experience."
                   DE: "Arbeiten von Teilnehmenden, Veranstaltungen und gemeinsame Projekte können Origami von einer Einzelaktivität in ein soziales Erlebnis verwandeln."
insights[2].heading — EN: "Playfulness needs structure." | DE: "Spielerische Gestaltung benötigt Struktur."
insights[2].body — EN: "Colour and expressive forms can create energy, but a consistent grid and typographic hierarchy are necessary for educational clarity."
                   DE: "Farbe und ausdrucksstarke Formen können Energie erzeugen. Für verständliche Lerninhalte sind jedoch ein konsistentes Raster und eine klare typografische Hierarchie notwendig."
insights[3].heading — EN: "Folding can become a complete visual language." | DE: "Falten kann zu einer vollständigen visuellen Sprache werden."
insights[3].body — EN: "The logic of planes, creases and transformation can connect logo, posters, navigation and motion."
                   DE: "Die Logik von Flächen, Faltlinien und Transformation kann Logo, Poster, Navigation und Bewegung miteinander verbinden."

### sections[4] — id "direction" · number "05" · navLabel EN "Concept & identity" | DE "Konzept & Identität"
heading — EN: "From a single fold to a shared community." | DE: "Von einer einzelnen Falte zu einer gemeinsamen Community."
body[0] paragraph — EN: "The central idea transforms folding from a technical action into a metaphor for participation. A single sheet becomes a form through a sequence of decisions. In the same way, individual contributions can become part of a larger creative community. The brand should communicate curiosity, accessibility, transformation, creativity and shared learning."
                    DE: "Die zentrale Idee übersetzt das Falten von einer technischen Handlung in eine Metapher für Teilnahme. Ein einzelnes Blatt wird durch eine Abfolge von Entscheidungen zu einer Form. Auf ähnliche Weise können individuelle Beiträge Teil einer größeren kreativen Community werden. Die Marke sollte Neugier, Zugänglichkeit, Transformation, Kreativität und gemeinsames Lernen vermitteln."
body[1] sub-heading — EN: "Turning folds into a repeatable graphic system" | DE: "Faltungen in ein wiederholbares grafisches System übersetzen"
body[2] paragraph — EN: "The identity uses angular shapes, layered planes and directional lines inspired by folded paper. A colour system based on coral, mint, teal and light neutral tones creates a contemporary and approachable character."
                    DE: "Die Identität verwendet kantige Formen, überlagerte Flächen und gerichtete Linien, die von gefaltetem Papier inspiriert sind. Ein Farbsystem aus Korall, Mint, Petrol und hellen neutralen Tönen schafft einen zeitgemäßen und zugänglichen Charakter."
body[3] paragraph — EN: "The strongest part of the identity is not one individual shape. It is the ability to reconfigure the same visual logic across different formats."
                    DE: "Die größte Stärke der Identität liegt nicht in einer einzelnen Form. Entscheidend ist die Fähigkeit, dieselbe visuelle Logik über verschiedene Formate hinweg neu zu konfigurieren."
images[0] — aspect 4/3 · caption EN "[ logo exploration ]" | DE "[ logo-exploration ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ illustration — by alexsha ]" | DE "[ illustration — von alexsha ]" · no src — renders as a hatched placeholder box

### sections[5] — id "development" · number "06" · navLabel EN "Print & website" | DE "Print & Website"
heading — EN: "Extending one identity across physical communication" | DE: "Eine Identität auf physische Kommunikation übertragen"
body[0] paragraph — EN: "The print system includes posters, flyers, banners and promotional formats. Each application uses the same fold-based visual logic while adapting to different information priorities. Posters can prioritise emotional impact. Flyers need clearer event details. Banners require rapid recognition from a distance."
                    DE: "Das Printsystem umfasst Poster, Flyer, Banner und weitere Werbeformate. Jede Anwendung nutzt dieselbe faltbasierte visuelle Logik und passt sie gleichzeitig an unterschiedliche Informationsprioritäten an. Poster können emotionale Wirkung priorisieren. Flyer benötigen klarere Veranstaltungsdetails. Banner müssen aus größerer Entfernung schnell erkennbar sein."
body[1] sub-heading — EN: "Creating a digital home for learning and participation" | DE: "Ein digitales Zuhause für Lernen und Teilnahme schaffen"
body[2] paragraph — EN: "The website brings together the brand's educational and community functions. Its content structure prioritises: discovering origami, finding workshops, following tutorials, viewing community work, learning about the organisation, and joining or contacting the community."
                    DE: "Die Website verbindet die edukativen und gemeinschaftlichen Funktionen der Marke. Die Inhaltsstruktur priorisiert: Origami entdecken, Workshops finden, Tutorials folgen, Arbeiten der Community ansehen, mehr über die Organisation erfahren sowie der Community beitreten oder Kontakt aufnehmen."
body[3] paragraph — EN: "Early wireframes established the main page hierarchy before the visual brand was applied. The final interface translates the folded-paper system into cards, navigation, image masks, transitions and section boundaries without compromising readability."
                    DE: "Frühe Wireframes definierten die zentrale Seitenhierarchie, bevor die visuelle Marke angewendet wurde. Das finale Interface übersetzt das Faltpapier-System in Karten, Navigation, Bildmasken, Übergänge und Abschnittsgrenzen, ohne die Lesbarkeit zu beeinträchtigen."
images[0] — aspect 3/4 · caption EN "[ poster — by alexsha ]" | DE "[ poster — von alexsha ]" · no src — renders as a hatched placeholder box
images[1] — aspect 3/4 · caption EN "[ posters — team credit ]" | DE "[ poster — team-credit ]" · no src — renders as a hatched placeholder box
images[2] — aspect 3/4 · caption EN/DE (same) "[ flyer + banner ]" · no src — renders as a hatched placeholder box
images[3] — aspect 4/3 · caption EN/DE (same) "[ sitemap + wireframes ]" · no src — renders as a hatched placeholder box
images[4] — aspect 4/3 · caption EN "[ website — co-designed ]" | DE "[ website — gemeinsam gestaltet ]" · no src — renders as a hatched placeholder box

### sections[6] — id "testing" · number "07" · navLabel EN "Testing" | DE "Testing"
heading — EN: "Observation, interpretation, revision" | DE: "Beobachtung, Interpretation, Überarbeitung"
testing[0].label — EN: "Observation" | DE: "Beobachtung"
testing[0].body — EN: "\"The user hesitated when locating a workshop.\"" | DE: "„Die Testperson zögerte bei der Suche nach einem Workshop.“"
testing[1].label — EN/DE (same): "Interpretation"
testing[1].body — EN: "\"Workshop information did not have sufficient visual priority.\""
                  DE: "„Workshop-Informationen hatten keine ausreichende visuelle Priorität.“"
testing[2].label — EN: "Revision" | DE: "Überarbeitung"
testing[2].body — EN: "\"The navigation label, card hierarchy and call to action were clarified.\""
                  DE: "„Navigationsbezeichnung, Kartenhierarchie und Call-to-Action wurden klarer gestaltet.“"

### sections[7] — id "outcome" · number "08" · navLabel EN "Final outcome" | DE "Ergebnis"
heading — EN: "One folding principle across brand, print and web" | DE: "Ein Faltprinzip für Marke, Print und Web"
body[0] paragraph — EN: "The final Surugami system uses a common visual principle across identity, campaign material and digital interaction. The print work creates recognition and emotional energy. The website converts that personality into a structured environment for learning, workshops and community content."
                    DE: "Das finale Surugami-System verwendet ein gemeinsames visuelles Prinzip für Identität, Kampagnenmaterial und digitale Interaktion. Die Printarbeit schafft Wiedererkennung und emotionale Energie. Die Website übersetzt diese Persönlichkeit in eine strukturierte Umgebung für Lernen, Workshops und Community-Inhalte."
body[1] paragraph — EN: "The result demonstrates how a concept can remain consistent without producing identical layouts across every medium."
                    DE: "Das Ergebnis zeigt, wie ein Konzept konsistent bleiben kann, ohne über alle Medien hinweg identische Layouts zu erzeugen."
images[0] — aspect 16/9 · caption EN "[ final system — large showcase ]" | DE "[ finales system — große präsentation ]" · no src — renders as a hatched placeholder box

### sections[8] — id "reflection" · number "09" · navLabel EN "Reflection" | DE "Reflexion"
heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[0] paragraph — EN: "Surugami taught me that a visual metaphor becomes useful only when it can support information, not merely decorate it. The fold concept worked best when it helped organise content, direct attention or connect formats. When used too frequently, the same device created visual noise."
                    DE: "Surugami hat mir gezeigt, dass eine visuelle Metapher erst dann nützlich wird, wenn sie Informationen unterstützt und nicht nur dekoriert. Das Faltkonzept funktionierte am besten, wenn es Inhalte organisierte, Aufmerksamkeit lenkte oder unterschiedliche Formate miteinander verband. Bei zu häufiger Verwendung erzeugte dasselbe Element visuelle Unruhe."
body[1] paragraph — EN: "The final portfolio version therefore shows fewer applications and explains more clearly how each one responds to its context."
                    DE: "Die finale Portfolio-Version zeigt deshalb weniger Anwendungen und erklärt klarer, wie jede Anwendung auf ihren jeweiligen Kontext reagiert."
```

### 5.6 QIS Portal Redesign — `src/lib/caseStudies/qis-portal.ts`

```
### qis-portal.en / .de
name — EN/DE (same): "QIS Portal Redesign"
projectTag — EN/DE (same): "QIS Portal Redesign · 2024"
headline — EN: "Turning a fragmented university portal into a clearer student service."
           DE: "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice verwandeln."
summary — EN: "The QIS redesign reorganises essential university-administration tasks around how students search for exams, certificates, grades, fees and personal information."
          DE: "Das QIS-Redesign strukturiert zentrale Hochschulverwaltungsaufgaben danach, wie Studierende Prüfungen, Bescheinigungen, Noten, Gebühren und persönliche Informationen suchen und bearbeiten."
tags[0..4] — EN/DE (same): "UX Research" / "Information Architecture" / "Product Design" / "Usability Testing" / "Service UX"
role — EN: "UX/UI Designer & Researcher" | DE: "UX/UI Designerin & Researcherin"
contribution — EN: "Led most of the UX, interface and usability work. The team supported the surveys."
               DE: "Den Großteil der UX-, Interface- und Usability-Arbeit umgesetzt. Das Team unterstützte die Umfragen."
type — EN: "Semester project · team" | DE: "Semesterprojekt · Team"
year — EN/DE (same): undefined
tools — EN/DE (same): ""
deliverables — EN/DE (same): ""
heroImage.src — /images/hero-qis-portal.webp (aspect 16/7.5) — see IMAGES for whether this file is a real export
heroImage.alt — EN: "The redesigned QIS Portal exam pages shown side by side"
                DE: "Die überarbeiteten Prüfungsseiten des QIS-Portals nebeneinander"

### sections[0] — id "overview" · number "01" · navLabel EN "Overview" | DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] note — EN: "287 survey responses · 21 → 14 pages in the architecture · 12 test participants · ≈ 90.6 average SUS score"
               DE: "287 Umfrage-Antworten · 21 → 14 Seiten in der Architektur · 12 Test-Teilnehmende · ≈ 90,6 durchschnittlicher SUS-Wert"
body[1] paragraph — EN: "QIS is an administrative portal used by students at the Technische Hochschule Lübeck. It supports important tasks such as exam registration and withdrawal, viewing grades and study progress, downloading enrolment certificates, checking semester fees and updating personal information."
                    DE: "QIS ist ein Verwaltungsportal für Studierende der Technischen Hochschule Lübeck. Es unterstützt wichtige Aufgaben wie Prüfungsanmeldung und -abmeldung, Einsicht in Noten und Studienverlauf, Download von Immatrikulationsbescheinigungen, Prüfung von Semestergebühren und Aktualisierung persönlicher Informationen."
body[2] paragraph — EN: "Despite the importance of these functions, students experienced the existing portal as visually outdated, difficult to navigate and inefficient. The redesign was developed through two surveys, structural analysis, paper prototyping, high-fidelity design and remote usability testing."
                    DE: "Trotz der Bedeutung dieser Funktionen erlebten Studierende das bestehende Portal als visuell veraltet, schwer navigierbar und ineffizient. Das Redesign entstand durch zwei Umfragen, Strukturanalyse, Paper Prototyping, High-Fidelity-Design und Remote-Usability-Tests."
images[0] — aspect 16/8 · caption EN "[ original portal — before ]" | DE "[ ursprüngliches portal — vorher ]" · no src — renders as a hatched placeholder box

### sections[1] — id "challenge" · number "02" · navLabel EN "Challenge" | DE "Herausforderung"
heading — EN: "Essential content was hidden inside an outdated structure."
          DE: "Wichtige Inhalte waren in einer veralteten Struktur verborgen."
body[0] paragraph — EN: "The research identified several connected problems: small typography, inefficient use of screen space, weak information hierarchy, numerous nested pages, difficult navigation, outdated visual language, inconsistent interaction patterns and limited mobile suitability."
                    DE: "Die Recherche identifizierte mehrere zusammenhängende Probleme: kleine Typografie, ineffiziente Nutzung des Bildschirmraums, schwache Informationshierarchie, zahlreiche verschachtelte Seiten, schwierige Navigation, veraltete visuelle Sprache, inkonsistente Interaktionsmuster und begrenzte mobile Nutzbarkeit."
body[1] paragraph — EN: "The problem was not the relevance of the content. Students considered the information important. The difficulty was finding and completing the required task efficiently."
                    DE: "Das Problem lag nicht in der Relevanz der Inhalte. Studierende bewerteten die Informationen als wichtig. Die Schwierigkeit bestand darin, die erforderliche Aufgabe schnell zu finden und abzuschließen."
designQuestion — EN: "How might a university portal make essential administrative tasks easier to find, understand and complete?"
                 DE: "Wie kann ein Hochschulportal zentrale Verwaltungsaufgaben leichter auffindbar, verständlich und ausführbar machen?"

### sections[2] — id "research" · number "03" · navLabel EN "Research" | DE "Research"
heading — EN: "Combining open feedback with measurable evaluation" | DE: "Offenes Feedback mit messbarer Bewertung verbinden"
body[0] paragraph — EN: "The first survey collected open feedback about usage patterns, satisfaction, strengths and frustrations. It received 150 responses. Because open responses were difficult to compare quantitatively, a second survey introduced structured response options. It received 137 responses and examined navigation, readability, space management, information relevance and functional priorities."
                    DE: "Die erste Umfrage sammelte offene Rückmeldungen zu Nutzungsmustern, Zufriedenheit, Stärken und Problemen. Sie erhielt 150 Antworten. Da offene Antworten quantitativ schwer vergleichbar waren, führte die zweite Umfrage strukturierte Antwortmöglichkeiten ein. Sie erhielt 137 Antworten und untersuchte Navigation, Lesbarkeit, Platznutzung, Informationsrelevanz und funktionale Prioritäten."
body[1] paragraph — EN: "This combination allowed the team to identify both personal frustrations and recurring patterns."
                    DE: "Diese Kombination ermöglichte es dem Team, sowohl persönliche Frustrationen als auch wiederkehrende Muster zu erkennen."
images[0] — aspect 4/3 · caption EN "[ survey 01 — 150 responses ]" | DE "[ umfrage 01 — 150 antworten ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ survey 02 — 137 responses ]" | DE "[ umfrage 02 — 137 antworten ]" · no src — renders as a hatched placeholder box

### sections[3] — id "insights" · number "04" · navLabel EN "Key insights" | DE "Zentrale Erkenntnisse"
heading — EN: "Key insights" | DE: "Zentrale Erkenntnisse"
insights[0].heading — EN: "Irregular use increases the need for recognition." | DE: "Unregelmäßige Nutzung erhöht den Bedarf an Wiedererkennung."
insights[0].body — EN: "Students use the portal during important academic moments rather than continuously. They should not have to remember a complex structure between visits."
                   DE: "Studierende verwenden das Portal zu wichtigen akademischen Zeitpunkten und nicht kontinuierlich. Sie sollten sich zwischen Besuchen keine komplexe Struktur merken müssen."
insights[1].heading — EN: "Important content does not guarantee findability." | DE: "Wichtige Inhalte sind nicht automatisch auffindbar."
insights[1].body — EN: "Users considered the portal's information relevant, but frequently found it difficult to locate."
                   DE: "Nutzer bewerteten die Informationen des Portals als relevant, hatten jedoch häufig Schwierigkeiten, sie zu finden."
insights[2].heading — EN: "Hierarchy should follow student tasks." | DE: "Die Hierarchie sollte den Aufgaben der Studierenden folgen."
insights[2].body — EN: "Exam registration, grades, certificates and fees deserve higher priority than secondary informational pages."
                   DE: "Prüfungsanmeldung, Noten, Bescheinigungen und Gebühren benötigen eine höhere Priorität als sekundäre Informationsseiten."
insights[3].heading — EN: "Interface modernisation must include structural change."
                      DE: "Eine Modernisierung des Interfaces benötigt strukturelle Veränderung."
insights[3].body — EN: "Changing colours and rounded corners would not solve the fragmented navigation."
                   DE: "Neue Farben und abgerundete Ecken allein würden die fragmentierte Navigation nicht lösen."

### sections[4] — id "direction" · number "05" · navLabel EN "Information architecture" | DE "Informationsarchitektur"
heading — EN: "Reducing 21 pages to 14 without removing essential functionality"
          DE: "21 Seiten auf 14 reduzieren, ohne zentrale Funktionen zu entfernen"
body[0] paragraph — EN: "The existing portal structure contained 21 pages and several redundant or closely related routes. The redesign reorganised the content by task type and reduced the structure to 14 pages without intentionally removing the existing core functionality."
                    DE: "Die bestehende Portalstruktur umfasste 21 Seiten sowie mehrere redundante oder eng verwandte Pfade. Das Redesign ordnete die Inhalte nach Aufgabentyp und reduzierte die Struktur auf 14 Seiten, ohne die bestehenden Kernfunktionen absichtlich zu entfernen."
body[1] paragraph — EN: "Related pages were combined, secondary information was deprioritised and navigation was structured around student goals rather than the internal organisation of the university system."
                    DE: "Verwandte Seiten wurden zusammengeführt, sekundäre Informationen niedriger priorisiert und die Navigation an den Zielen der Studierenden statt an der internen Organisation des Hochschulsystems ausgerichtet."
body[2] sub-heading — EN: "Testing structure before visual polish" | DE: "Struktur vor visueller Ausarbeitung testen"
body[3] paragraph — EN: "Paper prototypes were created for login, dashboard, study administration, exam administration, exam registration, grade history, study progress and fee management. The low-fidelity stage focused on page relationships, content priority and task completion rather than visual style."
                    DE: "Paper Prototypes wurden für Login, Dashboard, Studienverwaltung, Prüfungsverwaltung, Prüfungsanmeldung, Notenverlauf, Studienverlauf und Gebührenverwaltung erstellt. Die Low-Fidelity-Phase konzentrierte sich auf Seitenbeziehungen, Inhaltspriorität und Aufgabenabschluss und nicht auf visuellen Stil."
images[0] — aspect 4/3 · caption EN "[ 21-page structure ]" | DE "[ struktur mit 21 seiten ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ 14-page structure ]" | DE "[ struktur mit 14 seiten ]" · no src — renders as a hatched placeholder box
images[2] — aspect 16/8 · caption EN "[ paper prototypes ]" | DE "[ papierprototypen ]" · no src — renders as a hatched placeholder box

### sections[5] — id "testing" · number "06" · navLabel EN "Usability testing" | DE "Usability-Tests"
heading — EN: "Evaluating seven essential student tasks" | DE: "Sieben zentrale Aufgaben von Studierenden evaluieren"
body[0] paragraph — EN: "The original high-fidelity prototype introduced larger typography, improved use of screen space, persistent navigation patterns, structured forms, status colours, grade and certificate tables and confirmation dialogues. It was tested remotely with 12 participants, who completed seven tasks and then a System Usability Scale questionnaire."
                    DE: "Der ursprüngliche High-Fidelity-Prototyp führte größere Typografie, bessere Nutzung des Bildschirmraums, konsistentere Navigationsmuster, strukturierte Formulare, Statusfarben, Tabellen für Noten und Bescheinigungen sowie Bestätigungsdialoge ein. Er wurde remote mit 12 Teilnehmenden getestet, die sieben Aufgaben bearbeiteten und anschließend einen System-Usability-Scale-Fragebogen ausfüllten."
body[1] paragraph — EN: "The individual SUS scores ranged from 77.5 to 100. The average score was approximately 90.6. Participants particularly valued the improved navigation, larger and more readable elements, clearer structure, more modern presentation and easier task completion."
                    DE: "Die einzelnen SUS-Werte lagen zwischen 77,5 und 100. Der Durchschnitt lag bei ungefähr 90,6. Besonders positiv bewertet wurden die verbesserte Navigation, größere und besser lesbare Elemente, klarere Struktur, modernere Darstellung und einfachere Aufgabenbearbeitung."
body[2] paragraph — EN: "The result is promising but should be interpreted within the limits of a small remote academic study rather than as proof of production-level usability."
                    DE: "Das Ergebnis ist vielversprechend, sollte jedoch innerhalb der Grenzen einer kleinen akademischen Remote-Studie interpretiert werden und nicht als Nachweis produktionsreifer Usability."
images[0] — aspect 4/3 · caption EN "[ original hi-fi screens ]" | DE "[ ursprüngliche hi-fi-screens ]" · no src — renders as a hatched placeholder box
images[1] — aspect 4/3 · caption EN "[ sus chart — 77.5–100 ]" | DE "[ sus-diagramm — 77,5–100 ]" · no src — renders as a hatched placeholder box

### sections[6] — id "development" · number "07" · navLabel EN "2026 visual iteration" | DE "Visuelle Iteration 2026"
heading — EN: "Preserving the tested logic, updating the visual layer"
          DE: "Die getestete Logik bewahren, die visuelle Ebene erneuern"
body[0] note — EN: "Clearly labelled 2026 iteration — research, architecture, task flows and tested structure preserved; the visual layer is modernised."
               DE: "Klar gekennzeichnete Iteration 2026 — Recherche, Architektur, Aufgabenabläufe und getestete Struktur bleiben erhalten; die visuelle Ebene wird modernisiert."
insights[0].heading — EN: "Task-based dashboard" | DE: "Aufgabenbasiertes Dashboard"
insights[0].body — EN: "Register for exams · view grades · download certificates · check fees · update personal information"
                   DE: "Prüfungen anmelden · Noten ansehen · Bescheinigungen herunterladen · Gebühren prüfen · persönliche Daten aktualisieren"
insights[1].heading — EN: "Persistent navigation" | DE: "Persistente Navigation"
insights[1].body — EN: "Desktop sidebar · mobile drawer or bottom navigation" | DE: "Desktop-Sidebar · mobiler Drawer oder Bottom-Navigation"
insights[2].heading — EN: "Global search" | DE: "Globale Suche"
insights[2].body — EN: "Exam registration · semester certificate · fee payment · password change"
                   DE: "Prüfungsanmeldung · Semesterbescheinigung · Gebührenzahlung · Passwortänderung"
insights[3].heading — EN: "Visible deadlines" | DE: "Sichtbare Fristen"
insights[3].body — EN: "Exam-registration deadlines · fee deadlines · missing documents · important notices"
                   DE: "Prüfungsfristen · Gebührenfristen · fehlende Dokumente · wichtige Hinweise"
insights[4].heading — EN: "Accessible status system" | DE: "Barrierearmes Statussystem"
insights[4].body — EN: "Icon + label + colour + explanation combined" | DE: "Icon + Label + Farbe + Erklärung kombiniert"
insights[5].heading — EN: "Responsive tables" | DE: "Responsive Tabellen"
insights[5].body — EN: "Hierarchy · filters · sorting · mobile cards · downloads · focus states"
                   DE: "Hierarchie · Filter · Sortierung · mobile Karten · Downloads · Fokuszustände"
insights[6].heading — EN: "Consistent forms" | DE: "Konsistente Formulare"
insights[6].body — EN: "Required fields · validation · error states · confirmation · save progress · destructive actions"
                   DE: "Pflichtfelder · Validierung · Fehlerzustände · Bestätigung · Zwischenspeichern · destruktive Aktionen"
insights[7].heading — EN: "Restrained palette" | DE: "Zurückhaltende Palette"
insights[7].body — EN: "White · cool neutral grey · one institutional accent · red/yellow/green for status"
                   DE: "Weiß · kühles Neutralgrau · ein institutioneller Akzent · Rot/Gelb/Grün für Status"

### sections[7] — id "outcome" · number "08" · navLabel EN "Final outcome" | DE "Ergebnis"
heading — EN: "A student portal organised around actions, not administration."
          DE: "Ein Studierendenportal, das nach Handlungen statt Verwaltung organisiert ist."
body[0] paragraph — EN: "The final iteration preserves the research-led information architecture and tested task flows while replacing the outdated visual layer with a clearer responsive system. A task-based dashboard gives students direct access to the actions they perform most frequently."
                    DE: "Die finale Iteration bewahrt die forschungsbasierte Informationsarchitektur und die getesteten Aufgabenabläufe und ersetzt gleichzeitig die veraltete visuelle Ebene durch ein klareres responsives System. Ein aufgabenbasiertes Dashboard bietet direkten Zugang zu den am häufigsten benötigten Handlungen."
body[1] paragraph — EN: "The result is a clearer service interface that supports essential academic administration without exposing students to the complexity of the underlying institutional structure."
                    DE: "Das Ergebnis ist ein klareres Service-Interface, das zentrale akademische Verwaltungsaufgaben unterstützt, ohne Studierende mit der Komplexität der zugrunde liegenden institutionellen Struktur zu konfrontieren."
images[0] — aspect 16/9 · caption EN "[ new dashboard — large showcase ]" | DE "[ neues dashboard — große präsentation ]" · no src — renders as a hatched placeholder box
images[1] — aspect 16/10 · caption EN "[ mobile redesign ]" | DE "[ mobiles redesign ]" · no src — renders as a hatched placeholder box
images[2] — aspect 16/10 · caption EN "[ before / after ]" | DE "[ vorher / nachher ]" · no src — renders as a hatched placeholder box

### sections[8] — id "reflection" · number "09" · navLabel EN "Limitations & reflection" | DE "Grenzen & Reflexion"
heading — EN: "A strong foundation with clear limits" | DE: "Eine starke Grundlage mit klaren Grenzen"
body[0] list — 6 items
  items[0] — EN: "The work was completed by a team" | DE: "Die Arbeit entstand im Team"
  items[1] — EN: "Testing was remote and the participant sample was limited"
             DE: "Die Tests wurden remote durchgeführt und die Stichprobe war begrenzt"
  items[2] — EN: "The prototype did not include a production backend" | DE: "Der Prototyp enthielt kein produktives Backend"
  items[3] — EN: "Accessibility was not validated through disabled participants or assistive technologies"
             DE: "Barrierefreiheit wurde nicht mit behinderten Teilnehmenden oder assistiven Technologien validiert"
  items[4] — EN: "The original high-fidelity interface needed visual modernisation"
             DE: "Das ursprüngliche High-Fidelity-Interface benötigte eine visuelle Modernisierung"
  items[5] — EN: "The new 2026 visual iteration will require renewed usability testing"
             DE: "Die neue visuelle Iteration von 2026 muss erneut getestet werden"
body[1] sub-heading — EN: "What I learned" | DE: "Was ich gelernt habe"
body[2] paragraph — EN: "The QIS project taught me that a visual redesign is most effective when it begins with structure. The largest improvement did not come from colours, images or rounded components. It came from understanding which tasks mattered most and reducing the number of pages students needed to navigate."
                    DE: "Das QIS-Projekt hat mir gezeigt, dass ein visuelles Redesign am wirksamsten ist, wenn es mit der Struktur beginnt. Die größte Verbesserung entstand nicht durch Farben, Bilder oder abgerundete Komponenten. Sie entstand durch das Verständnis der wichtigsten Aufgaben und die Reduzierung der Seiten, durch die Studierende navigieren mussten."
body[3] paragraph — EN: "The project also showed that good test results do not mean a design is permanently complete. Visual standards, device expectations and accessibility requirements continue to develop. The next iteration preserves the tested logic while updating the visual and responsive system."
                    DE: "Das Projekt zeigte außerdem, dass gute Testergebnisse nicht bedeuten, dass ein Design dauerhaft abgeschlossen ist. Visuelle Standards, Geräteanforderungen und Barrierefreiheitsanforderungen entwickeln sich weiter. Die nächste Iteration bewahrt die getestete Logik und aktualisiert gleichzeitig das visuelle und responsive System."
```

---

## 6. Case-study shared UI labels

These appear on **every** case-study page (not project-specific) —
`[src/lib/dictionaries/en.ts / de.ts → caseStudy.*]`:

```
backToProjects — EN: "← Back to projects" | DE: "← Zurück zu den Projekten"
onThisPage — EN: "On this page" | DE: "Auf dieser Seite"
designQuestion — EN: "Design question" | DE: "Designfrage"
previousProject — EN: "← Previous project" | DE: "← Vorheriges Projekt"
nextProject — EN: "Next project →" | DE: "Nächstes Projekt →"
viewAllWork — EN: "View all work" | DE: "Alle Projekte ansehen"
role — EN: "Role" | DE: "Rolle"
contribution — EN: "Contribution" | DE: "Beitrag"
type — EN: "Type" | DE: "Typ"
tools — EN: "Tools" | DE: "Tools"
deliverables — EN: "Deliverables" | DE: "Ergebnisse"
```

---

## 7. Playground section

### 7.1 Playground home (`/playground`) — `src/lib/playground/home.ts`

```
### eyebrow
EN: "Playground — personal work" | DE: "Playground — persönliche Arbeiten"

### heading
EN: "Things I make without a brief." | DE: "Dinge, die ich ohne Briefing gestalte."

### intro
EN: "Drawings, objects, experiments and ideas created through curiosity."
DE: "Zeichnungen, Objekte, Experimente und Ideen, die aus Neugier entstehen."

### handNote
EN: "made out of curiosity ↗" | DE: "aus Neugier gemacht ↗"

### featuredHeading
EN: "Featured experiments" | DE: "Ausgewählte Experimente"
```

`featured[0..2]` — the 3 cards under "Featured experiments":

```
### featured[0] — links to /playground/3d-motion/motorbike-study
caption — EN: "Motorbike Study" | DE: "Motorradstudie"
subtitle: "Blender · Unreal Engine · After Effects" (same both languages)
description — EN: "A 3D modelling and motion experiment exploring surface detail, lighting and cinematic presentation."
             DE: "Ein 3D- und Motion-Experiment zu Oberflächendetails, Licht und filmischer Präsentation."

### featured[1] — no link, decorative only
caption — EN: "Bead & Plant Objects" | DE: "Perlen- und Pflanzenobjekte"
subtitle: "beads · wire · handmade" (same both languages, left in English on DE)

### featured[2] — no link, decorative only
caption: "Hibi" (same both languages)
subtitle — EN: "small software experiment" | DE: "kleines Software-Experiment"
```

```
### categoriesHeading
EN: "Categories" | DE: "Kategorien"

### categoriesCaption
EN: "six kinds of making — each row runs on its own, hover to pause"
DE: "Sechs Arten des Machens — jede Reihe läuft von selbst. Zum Anhalten mit der Maus darüber."
```

`categories[0..5]` (title + caption shown on the homepage; the marquee rows themselves
pull their images from each category file below):

```
### categories[0] — digital-art
title — EN: "Digital Drawings and Portraits" | DE: "Digitale Zeichnungen und Porträts"
caption — EN: "Portraits, characters and colour studies, drawn for practice and for pleasure."
         DE: "Porträts, Charaktere und Farbstudien — gezeichnet zum Üben und aus Freude."

### categories[1] — crafts
title — EN: "Handmade and Bead Crafts" | DE: "Handarbeit und Perlenkunst"
caption — EN: "Beads, wire and small handmade objects, built slowly and mostly for joy."
         DE: "Perlen, Draht und kleine handgemachte Objekte — langsam und vor allem aus Freude entstanden."

### categories[2] — editorial
title — EN: "Calendars and Editorial Experiments" | DE: "Kalender und Editorial Experimente"
caption — EN: "Calendars, grids and print compositions — typography as a playground."
         DE: "Kalender, Raster und Printkompositionen — Typografie als Spielwiese."

### categories[3] — graphic-experiments
title — EN: "Graphic and Logo Experiments" | DE: "Grafik- und Logoexperimente"
caption — EN: "Posters, logo studies and directions that never shipped — kept because they taught me something."
         DE: "Poster, Logostudien und nie umgesetzte Richtungen — aufbewahrt, weil sie mir etwas beigebracht haben."

### categories[4] — 3d-motion
title — EN: "3D and Motion" | DE: "3D und Motion"
caption — EN: "Blender, Unreal and After Effects experiments — learning to make things move."
         DE: "Experimente mit Blender, Unreal und After Effects — Dinge in Bewegung bringen."

### categories[5] — interactive
title — EN: "Games and Interactive Experiments" | DE: "Games und interaktive Experimente"
caption — EN: "A Unity game, small apps and code-based prototypes — design that responds."
         DE: "Ein Unity-Game, kleine Apps und Code-Prototypen — Design, das reagiert."
```

```
### exploringHeading
EN: "Currently exploring —" | DE: "Aktuell am Entdecken —"

### exploringItems[0..2]
EN: "Unreal animation" / "beadwork" / "motion studies"
DE: "Unreal animation" / "Perlenkunst" / "Motion-Studien"

### noteBody
EN: "Not every idea needs to become a case study. This is where I collect experiments, unfinished directions and things I make simply because I enjoy making them."
DE: "Nicht jede Idee muss zu einer Fallstudie werden. Hier sammle ich Experimente, unfertige Richtungen und Dinge, die ich einfach gestalte, weil mir das Gestalten Freude macht."

### returnCta
EN: "Back to Portfolio" | DE: "Zurück zum Portfolio"
```
(`galleryHeading`, `gallery`, `noteHeading`, `returnHeading` exist in the data shape but
are empty strings/empty arrays in both languages — currently unused content slots.)

### 7.2 Playground categories (`/playground/<slug>`)

Each category file has the same shape: `title`, `intro`, 5 `items[]` (caption + aspect
ratio only — **no image field exists in the data model**, see IMAGES), `moreComingNote`,
and a pointer to the next category in the loop (`nextCategorySlug` / `nextCategoryTitle`).

```
### digital-art — src/lib/playground/categories/digital-art.ts
title — EN: "Digital Drawings and Portraits" | DE: "Digitale Zeichnungen und Porträts"
intro — EN: "Portraits, characters and colour studies, drawn for practice and for pleasure."
       DE: "Porträts, Charaktere und Farbstudien — gezeichnet zum Üben und aus Freude."
items[0..4] captions — EN: "Digital portraits" / "Character studies" / "Illustration experiments" / "Colour studies" / "Personal drawings"
                       DE: "Digitale Porträts" / "Charakterstudien" / "Illustrationsexperimente" / "Farbstudien" / "Persönliche Zeichnungen"
moreComingNote — EN: "More to come — this space grows with every experiment."
                DE: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment."
nextCategorySlug: "crafts" | nextCategoryTitle: "Handmade and Bead Crafts" / "Handarbeit und Perlenkunst"

### crafts — src/lib/playground/categories/crafts.ts
title — EN: "Handmade and Bead Crafts" | DE: "Handarbeit und Perlenkunst"
intro — EN: "Beads, wire and small handmade objects, built slowly and mostly for joy."
       DE: "Perlen, Draht und kleine handgemachte Objekte — langsam und vor allem aus Freude entstanden."
items[0..4] captions — EN: "Bead crafts" / "Plant-inspired objects" / "Handmade decorations" / "Material experiments" / "Small physical objects"
                       DE: "Perlenkunst" / "Pflanzeninspirierte Objekte" / "Handgemachte Dekorationen" / "Materialexperimente" / "Kleine physische Objekte"
moreComingNote: (same pattern as above)
nextCategorySlug: "editorial" | nextCategoryTitle: "Calendars and Editorial Experiments" / "Kalender und Editorial Experimente"

### editorial — src/lib/playground/categories/editorial.ts
title — EN: "Calendars and Editorial Experiments" | DE: "Kalender und Editorial Experimente"
intro — EN: "Calendars, grids and print compositions — typography as a playground."
       DE: "Kalender, Raster und Printkompositionen — Typografie als Spielwiese."
items[0..4] captions — EN: "Calendar designs" / "Typographic layouts" / "Print compositions" / "Grid experiments" / "Editorial studies"
                       DE: "Kalenderdesigns" / "Typografische Layouts" / "Printkompositionen" / "Rasterexperimente" / "Editorial-Studien"
nextCategorySlug: "graphic-experiments" | nextCategoryTitle: "Graphic and Logo Experiments" / "Grafik- und Logoexperimente"

### graphic-experiments — src/lib/playground/categories/graphic-experiments.ts
title — EN: "Graphic and Logo Experiments" | DE: "Grafik- und Logoexperimente"
intro — EN: "Posters, logo studies and directions that never shipped — kept because they taught me something."
       DE: "Poster, Logostudien und nie umgesetzte Richtungen — aufbewahrt, weil sie mir etwas beigebracht haben."
items[0..4] captions — EN: "Posters" / "Logo studies" / "Identity concepts" / "Typography experiments" / "Unused directions"
                       DE: "Poster" / "Logostudien" / "Identitätskonzepte" / "Typografie-Experimente" / "Unbenutzte Richtungen"
nextCategorySlug: "3d-motion" | nextCategoryTitle: "3D and Motion" / "3D und Motion"

### 3d-motion — src/lib/playground/categories/3d-motion.ts
title — EN: "3D and Motion" | DE: "3D und Motion"
intro — EN: "Blender, Unreal and After Effects experiments — learning to make things move."
       DE: "Experimente mit Blender, Unreal und After Effects — Dinge in Bewegung bringen."
items[0..4]:
  [0] caption — EN: "3D motorbike" | DE: "3D-Motorrad"  — ⚠️ this is the ONLY playground category item with a `slug` ("motorbike-study"), linking to the one real sub-project page (§7.3)
  [1] EN: "Blender experiments" | DE: "Blender-Experimente"
  [2] EN: "Unreal animation" | DE: "Unreal-Animation"
  [3] EN: "After Effects compositions" | DE: "After-Effects-Kompositionen"
  [4] EN: "Motion studies" | DE: "Motion-Studien"
nextCategorySlug: "interactive" | nextCategoryTitle: "Games and Interactive Experiments" / "Games und interaktive Experimente"

### interactive — src/lib/playground/categories/interactive.ts
title — EN: "Games and Interactive Experiments" | DE: "Games und interaktive Experimente"
intro — EN: "A Unity game, small apps and code-based prototypes — design that responds."
       DE: "Ein Unity-Game, kleine Apps und Code-Prototypen — Design, das reagiert."
items[0..4] captions — EN: "Unity game" / "Hibi application" / "NetBeans student planner" / "Small prototypes" / "Code-based experiments"
                       DE: "Unity-Game" / "Hibi-App" / "NetBeans-Studienplaner" / "Kleine Prototypen" / "Code-basierte Experimente"
nextCategorySlug: "digital-art" | nextCategoryTitle: "Digital Drawings and Portraits" / "Digitale Zeichnungen und Porträts"
  (this is the 6th category — its "next" loops back to the 1st, digital-art, completing the cycle)
```

### 7.3 Motorbike Study sub-project (`/playground/3d-motion/motorbike-study`)

`src/lib/playground/projects/motorbike-study.ts` — the **only** playground item that has
its own full sub-page (every other playground item is a caption-only card with no
detail page).

```
title — EN: "Motorbike Study" | DE: "Motorradstudie"
eyebrow — EN: "Playground experiment" | DE: "Playground-Experiment"
intro — EN: "A 3D modelling and motion experiment exploring surface detail, lighting and cinematic presentation."
       DE: "Ein 3D- und Motion-Experiment zu Oberflächendetails, Licht und filmischer Präsentation."
mainCaption — EN: "final render — studio lighting setup" | DE: "Finales Rendering — Studiolicht-Aufbau"
processHeading — EN: "Process" | DE: "Prozess"
processItems[0..2] captions — EN: "blockout in Blender" / "material + lighting tests" / "camera move in Unreal"
                              DE: "Blockout in Blender" / "Material- und Lichttests" / "Kamerafahrt in Unreal"
toolsHeading — EN: "Tools" | DE: "Werkzeuge"
tools[0..2]: "Blender" / "Unreal Engine" / "After Effects" (same both languages)
reflectionHeading — EN: "Reflection" | DE: "Reflexion"
reflection — EN: "This experiment was an exercise in patience: modelling hard surfaces cleanly, building light and letting the camera do the storytelling. Most of it will never become client work — which is exactly why it is fun."
            DE: "Dieses Experiment war eine Übung in Geduld: harte Oberflächen sauber modellieren, Licht aufbauen und die Kamera erzählen lassen. Das meiste davon wird nie ein Kundenprojekt — genau deshalb macht es Spaß."
nextLabel — EN: "Next experiment" | DE: "Nächstes Experiment"
nextTitle — EN: "Bead & Plant Objects" | DE: "Perlen- und Pflanzenobjekte"
```

### 7.4 Playground shared nav labels

`[src/lib/dictionaries/en.ts / de.ts → playgroundNav.*]`

```
backToPlayground — EN: "← Back to Playground" | DE: "← Zurück zum Playground"
allCategories — EN: "← All categories" | DE: "← Alle Kategorien"
experimentEyebrow — EN: "Playground experiment" | DE: "Playground-Experiment"
```

---

## 8. Footer

`[src/lib/dictionaries/en.ts / de.ts → footer.*]`

```
tagline — EN: "UI/UX, Brand and Visual Designer" | DE: "UI/UX-, Brand- und Visual Designerin"
email: "alexsha.maharjan1@gmail.com" (same both languages — real contact address, also used for mailto: links elsewhere)
linkedin (display) / linkedinHref (link): "linkedin.com/in/alexsham" / "https://www.linkedin.com/in/alexsham"
resume — EN: "Résumé" | DE: "Lebenslauf"
backToTop — EN: "Back to top ↑" | DE: "Nach oben ↑"
copyright: "© 2026 Alexsha Maharjan" (same both languages — will need updating in future years)
```

---

## 9. 404 page

`[src/lib/dictionaries/en.ts / de.ts → notFound.*]`

```
metaTitle — EN: "Page not found — Alexsha Maharjan" | DE: "Seite nicht gefunden — Alexsha Maharjan"
eyebrow: "404" (same both languages)
heading — EN: "This page doesn't exist." | DE: "Diese Seite gibt es nicht."
copy — EN: "The page you're looking for may have been moved or never existed."
      DE: "Die gesuchte Seite wurde verschoben oder existiert nicht."
backHome — EN: "← Back to home" | DE: "← Zurück zur Startseite"
```

---

## 10. Images

### 10.1 What "real" vs "placeholder" means here

Two different things can be true of an image on this site, and they matter differently:

1. **Does a `<img>` tag with a real photo file exist**, or does the page just render a
   dashed/hatched box with a text caption (`PlaceholderImage` component) because no
   image was ever supplied at all?
2. **For the files that DO exist** in `public/images/`, is the PNG a genuine exported
   photo/screenshot, or — per `docs/reference/image_files.md` (auto-generated when these
   assets were pulled from the design tool) — a same-dimension **solid-colour stand-in**
   that was generated because the real export got cut off? These look like a real image
   slot in the code (they have a working `<img src="...">`) but currently show as a flat
   colour block, not a photo.

### 10.2 Files referenced in code (7 files)

| File | Wired to real `<img>`? | Content is... | Used in |
|---|---|---|---|
| `frame-6-mrtp0czu-dh8i.png` | Yes | ✅ **Real photo** (62.7 KB, fetched complete) | Barrier-Free Kitchen hero image (`projects[3].image`, `barrier-free-kitchen.ts → heroImage.src`) |
| `screenshot-2026-07-07-at-15-29-39-ms52mvv5-d1vc.png` | Yes | ✅ **Real screenshot** (143.5 KB, fetched complete) | QIS Portal Redesign hero + grid thumbnail (`projects[5].image`, `qis-portal.ts → heroImage.src`) |
| `alexsha_photo-mrx9hbwx-nif2.png` | Yes | ⚠️ **Solid-colour placeholder** (1720×2150, right aspect ratio, no real photo) | Portrait — used on the About page (large portrait) and the Home "About preview" section (`about.portraitAlt` / `aboutPreview.portraitAlt`) |
| `wikimind-mrx9dhfo-12ys.png` | Yes | ⚠️ **Solid-colour placeholder** (5000×3750) | WikiMind homepage-card + case-study hero image |
| `shop-page-1-mrtp117j-zqqp.png` | Yes | ⚠️ **Solid-colour placeholder** (2845×3446) | AFONO homepage-card + case-study hero image |
| `1-ms52o75m-suju.png` | Yes | ⚠️ **Solid-colour placeholder** (2000×1414) | Surugami homepage-card + case-study hero image |
| `chatgpt-image-jul-23-2026-10_31_15-am-ms50alwm-za74.png` | Yes | ⚠️ **Solid-colour placeholder** (1586×992) | Sync FM homepage-card + case-study hero image |

**So: 2 of the 7 wired-up images are real; 5 are same-size colour blocks that need a real
export dropped in with the exact same filename** (no code change needed — per
`docs/reference/image_files.md`, dropping a same-named file into `public/images/` is enough).

### 10.3 Files that exist in `public/images/` but aren't used anywhere (9 files)

These are sitting in the folder but no page currently references them — safe to ignore,
delete, or repurpose:

```
1-ms52okpl-ih7m.png
chatgpt-image-jul-23-2026-10_31_15-am-ms50aulw-veww.png
frame-12-mru7pfow-5une.png
frame-4-mru7tnm2-f2iw.png
free-website-presentation-mockup-psd-mrx9j5rn-m2tk.png
pasted-1785267656651-0-ms529o1j-bqw0.png
screenshot-2026-01-28-at-01-04-52-mru7sx1g-zyn4.png
wikimind-mrx9e7jv-nohq.png
wikimind-ms50cpky-tw1a.png
```

### 10.4 Caption-only placeholders (no image file or `<img>` tag exists at all)

These render as a hatched box with a small caption via the `PlaceholderImage`
component. **Case-study figures can now take a real photo from the data file alone**:
each entry of `sections[].images[]` accepts an optional `src` (a path under
`public/images/`) and `alt`. With a `src` the slot renders the real image with the
caption underneath it, brackets stripped; without one it stays the hatched box with its
`[ bracketed label ]`. So filling one in is a one-line edit, e.g.

```
{ aspect: "4/3", caption: "[ moodboard ]", src: "/images/wikimind-moodboard.png", alt: "WikiMind moodboard" }
```

**Every other slot works the same way now** (since 2026-08-24): the About carousel, all
the Playground cards, the playground project image, the playground hero collage and the
eleven homepage bento tiles each take an optional `src`/`alt`. No code change is needed
anywhere — see `docs/reference/image_manifest.md` for all 136 slots with their sizes and
exact data paths.

- **Case-study inline images** (§5): 71 image slots across the 6 case studies'
  `sections[].images[]` arrays, all still showing placeholders (e.g. WikiMind's "[ moodboard ]", "[ logo
  sketches ]", "[ persona 01 ]"; QIS's "[ original portal — before ]"; etc.) — the exact
  caption text for each is listed inline in §5 above, under each project's `images[..]`.
- **About page carousel** (§3): 8 slots — drawing, painting, crafting, beadwork,
  photography, travel, handmade objects, personal experiments.
- **Playground**: every single playground item across the homepage `featured[]` (2 of 3
  — Bead & Plant Objects, Hibi), all 6 categories' `items[]` (30 slots total, 5 per
  category), and the Motorbike Study sub-page's `processItems[]` (3 slots) — **36 slots
  total**, none with any image mechanism at all. This is a deliberate visual style
  choice on this site (the hatched-placeholder look is part of the Playground's visual
  language) as much as it is "images not supplied yet" — worth deciding intentionally
  rather than assuming all 36 need real photos.

---

## 11. Text that lives outside the data files

A few small pieces of visible text are hard-coded directly into component files rather
than sourced from the dictionaries — editing these means editing the component file
directly (ask if you want any of these changed, they're short):

- **Process-step decorative content** (`src/components/process/clusters.tsx`) — see the
  callout in §2.2. Same English text on both locales.
- **Structural `aria-label`s** — screen-reader-only labels like `"Primary"` (main nav),
  `"Footer"`, `"Menu"`, `"Project navigation"`, `"Category navigation"`, `"My design
  process"`, plus a handful inside the process-canvas illustrations ("Wireframe sketch:
  header block and text lines", "Colour palette: ink, paper, black, cobalt", "Test
  participant", "Earlier interface: dense, crowded layout"). None of these are visible
  text on the page — they only matter for screen-reader users — and none are
  translated (same English string regardless of locale).
- **Page-title templates** — most pages build their browser-tab title by combining a
  dictionary value with a hard-coded suffix in the page component, e.g. `` `${content.name} — Alexsha Maharjan` `` on case studies, `` `${content.title} — Playground — Alexsha Maharjan` `` on playground pages. Changing the "— Alexsha Maharjan" pattern itself means editing `src/pages/*.tsx`, not the dictionaries.
- **`index.html` defaults** — the browser tab title/description/Open Graph tags shown
  before the page's JavaScript loads (and to social-media link previews) are a static
  copy of the homepage's English meta text, hard-coded in `index.html` at the project
  root. These aren't per-page and aren't bilingual (there's no German-specific
  `index.html`) — they only update if edited directly there.

---

## Summary

- **~975 labeled text fields** (each shown as one EN/DE pair above) across
  `src/lib/dictionaries/{en,de}.ts` (≈288 fields), the 6 case-study files (≈580 fields
  — body paragraphs, headings, insights, testing steps, image captions), and the 8
  playground data files (≈101 fields). This count treats each array item (a bullet, a
  tag, an image caption) as its own field.
- **2 real images** actually in use (Barrier-Free Kitchen hero, QIS Portal hero).
- **136 image slots, 7 filled**: every one can be filled by editing data — see
  `docs/reference/image_manifest.md`, which lists each with its aspect ratio, export width
  and data path. 5 of the 7 filled are solid-colour stand-ins rather than photographs
  (including the portrait — see §10.2) and can be replaced by dropping a real export in
  under the same filename.
- **9 unused image files** sitting in `public/images/` with no page referencing them.
