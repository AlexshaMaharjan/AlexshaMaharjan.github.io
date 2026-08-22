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
"alexshamaharjan.myportfolio.com" / "https://alexshamaharjan.myportfolio.com"
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

### 5.1 WikiMind — `src/lib/caseStudies/wikimind.ts`

```
### wikimind.en / .de → name
"WikiMind"  (same both languages)

### → projectTag
EN/DE (same): "WikiMind · 2026"

### → headline
EN: "Making artificial intelligence feel clear, useful and approachable."
DE: "Künstliche Intelligenz klar, nützlich und zugänglich gestalten."

### → summary
EN: "WikiMind is a brand identity and website concept for an AI company offering workshops, chatbots and software solutions. The project translates complex services into a friendly and structured experience for people with limited technical knowledge."
DE: "WikiMind ist ein Marken- und Website-Konzept für ein KI-Unternehmen, das Workshops, Chatbots und Softwarelösungen anbietet. Das Projekt übersetzt komplexe Leistungen in eine freundliche und klar strukturierte Erfahrung für Menschen mit wenig technischem Vorwissen."

### → tags[0..4]
EN/DE (same both languages): "Brand Strategy" / "Visual Identity" / "UI/UX Design" / "Web Design" / "Prototyping"

### → role
EN: "Brand & UI/UX Designer" | DE: "Brand & UI/UX Designerin"

### → contribution
EN: "Entire project completed independently." | DE: "Das gesamte Projekt wurde eigenständig umgesetzt."

### → type
EN: "Independent project" | DE: "Eigenständiges Projekt"

### → year
"2026"

### → tools
EN/DE (same): "Figma · Adobe Illustrator"

### → deliverables
EN: "Brand identity · Logo system · Mascot · Website design · UI kit · Interactive prototype"
DE: "Markenidentität · Logosystem · Maskottchen · Website-Design · UI-Kit · Interaktiver Prototyp"

### → heroImage.alt
EN/DE (same): "Placeholder: WikiMind final homepage hero visual"  (see IMAGES — this is a placeholder-content file, not a real photo)
```

Sections (`wikimind.sections[0..7]`):

```
### sections[0] — id "overview", nav label EN "Overview" / DE "Überblick"
heading — EN: "The project at a glance" | DE: "Das Projekt auf einen Blick"
body[0] — EN: "WikiMind wanted to communicate artificial intelligence to people who were interested in using it but did not necessarily understand the underlying technology. The challenge was not the range of services itself. It was how those services were presented."
         DE: "WikiMind wollte künstliche Intelligenz Menschen vermitteln, die an ihrer Nutzung interessiert sind, die zugrunde liegende Technologie jedoch nicht unbedingt verstehen. Die Herausforderung lag nicht im Leistungsangebot selbst, sondern in seiner Darstellung."
body[1] — EN: "Many AI websites rely on technical terminology, abstract visualisations and dark interfaces. While this can signal technological capability, it may also make the subject feel distant, complicated or inaccessible. The goal was therefore to create an identity and digital experience that maintained professional credibility while making AI easier to understand."
         DE: "Viele KI-Websites arbeiten mit technischen Begriffen, abstrakten Visualisierungen und dunklen Oberflächen. Diese Gestaltung kann technologische Kompetenz vermitteln, das Thema jedoch zugleich distanziert, kompliziert oder schwer zugänglich erscheinen lassen. Ziel war deshalb eine Identität und digitale Erfahrung, die professionell wirkt und KI gleichzeitig leichter verständlich macht."

### sections[1] — id "challenge", nav "Context & challenge" / "Kontext & Herausforderung"
heading — EN: "AI was available, but it did not always feel accessible."
         DE: "KI war verfügbar, wirkte jedoch nicht immer zugänglich."
body[0] — EN: "Artificial intelligence is becoming part of everyday products and professional workflows. Yet many potential users still experience it as abstract, intimidating or difficult to apply. This creates a communication problem for companies such as WikiMind."
         DE: "Künstliche Intelligenz wird zunehmend Teil alltäglicher Produkte und beruflicher Arbeitsprozesse. Trotzdem erleben viele potenzielle Nutzer das Thema weiterhin als abstrakt, einschüchternd oder schwer anwendbar. Für Unternehmen wie WikiMind entsteht dadurch vor allem ein Kommunikationsproblem."
body[1] — EN: "The website needed to explain different services without assuming technical knowledge. At the same time, the brand could not become childish, overly playful or less credible."
         DE: "Die Website musste unterschiedliche Leistungen erklären, ohne technisches Vorwissen vorauszusetzen. Gleichzeitig durfte die Marke nicht kindlich, übermäßig verspielt oder weniger glaubwürdig wirken."
designQuestion — EN: "How might WikiMind make complex AI services understandable and approachable without losing professional trust?"
                DE: "Wie kann WikiMind komplexe KI-Leistungen verständlich und zugänglich vermitteln, ohne professionelles Vertrauen zu verlieren?"

### sections[2] — id "research", nav "Research" / "Recherche"
heading — EN: "Understanding how AI companies communicate" | DE: "Wie KI-Unternehmen kommunizieren"
body[0] — EN: "I conducted a qualitative visual and structural analysis of existing AI and technology websites. The comparison focused on visual tone, information hierarchy, content structure, language, navigation, animation and methods of establishing trust."
         DE: "Ich führte eine qualitative visuelle und strukturelle Analyse bestehender KI- und Technologie-Websites durch. Untersucht wurden visuelle Tonalität, Informationshierarchie, Inhaltsstruktur, Sprache, Navigation, Animation und Methoden zum Aufbau von Vertrauen."
body[1] — EN: "The analysis revealed a common tension. Dark and highly technical interfaces often appeared modern, but they could also feel cold or exclusive. Clearer layouts and restrained animation made information easier to follow and helped services feel more understandable."
         DE: "Die Analyse zeigte ein wiederkehrendes Spannungsfeld. Dunkle und stark technische Oberflächen wirkten häufig modern, konnten jedoch gleichzeitig kühl oder exklusiv erscheinen. Klarere Layouts und zurückhaltende Animationen erleichterten die Orientierung und machten Leistungen verständlicher."
body[2] — EN: "Translating the audience into design needs" | DE: "Zielgruppen in konkrete Designanforderungen übersetzen"  (this is a sub-heading embedded in the body text, not a separate field)
body[3] — EN: "Three working personas represented different professional contexts: a business decision-maker looking for practical automation, an academic leader seeking understandable AI education and a customer-service manager needing reliable operational support."
         DE: "Drei Arbeits-Personas repräsentierten unterschiedliche berufliche Kontexte: eine Führungskraft auf der Suche nach praktischer Automatisierung, eine akademische Leitung mit Bedarf an verständlicher KI-Vermittlung und eine Kundenservice-Leitung mit Bedarf an verlässlicher operativer Unterstützung."
body[4] — EN: "Although their responsibilities differed, their needs shared a consistent pattern. They required clear explanations, visible credibility and practical value before they could trust an AI provider."
         DE: "Trotz unterschiedlicher Verantwortungsbereiche zeigten sich gemeinsame Bedürfnisse. Die Nutzer benötigten verständliche Erklärungen, sichtbare Glaubwürdigkeit und einen klaren praktischen Nutzen, bevor sie einem KI-Anbieter vertrauen konnten."
images[0..3] captions (all placeholder, no photo — EN/DE identical): "[ competitor analysis ]" / "[ persona 01 ]" / "[ persona 02 ]" / "[ persona 03 ]"

### sections[3] — id "insights", nav "Key insights" / "Zentrale Erkenntnisse"
heading — EN: "Key insights" | DE: "Zentrale Erkenntnisse"
insights[0] heading/body — EN: "Clarity matters more than technical detail." / "Users first need to understand what a service does for them. Technical explanations should support this understanding, not lead the communication."
                          DE: "Klarheit ist wichtiger als technische Detailtiefe." / "Nutzer müssen zuerst verstehen, welchen konkreten Nutzen eine Leistung für sie hat. Technische Erklärungen sollten dieses Verständnis unterstützen und nicht die Kommunikation dominieren."
insights[1] — EN: "A human element can reduce distance." / "A recognisable character can make AI feel less abstract, provided it is used carefully and does not undermine professional credibility."
             DE: "Ein menschliches Element kann Distanz reduzieren." / "Eine wiedererkennbare Figur kann KI weniger abstrakt erscheinen lassen, sofern sie gezielt eingesetzt wird und die professionelle Glaubwürdigkeit nicht beeinträchtigt."
insights[2] — EN: "Trust must be designed into the structure." / "Predictable navigation, understandable service descriptions and visible calls to action create more confidence than decorative technological imagery."
             DE: "Vertrauen muss in die Struktur integriert werden." / "Vorhersehbare Navigation, verständliche Leistungsbeschreibungen und sichtbare Handlungsoptionen schaffen mehr Sicherheit als rein dekorative Technologie-Visualisierungen."
insights[3] — EN: "Motion should guide, not distract." / "Animation should support orientation, explain relationships or draw attention to important actions. It should not compete with the content."
             DE: "Animation sollte führen und nicht ablenken." / "Animation sollte Orientierung unterstützen, Zusammenhänge erklären oder Aufmerksamkeit auf wichtige Handlungen lenken. Sie sollte nicht mit dem Inhalt konkurrieren."

### sections[4] — id "direction", nav "Strategy & identity" / "Strategie & Identität"
heading — EN: "Positioning AI as a capable assistant" | DE: "KI als kompetenten Assistenten positionieren"
body[0..9] — this section has 10 body paragraphs mixing prose and short sub-headings, in this exact order:
  [0] EN: "The central strategic decision was to present AI not as an abstract technical system, but as a supportive tool that helps people learn, automate work and solve practical problems."
      DE: "Die zentrale strategische Entscheidung bestand darin, KI nicht als abstraktes technisches System, sondern als unterstützendes Werkzeug zu vermitteln, das Menschen beim Lernen, Automatisieren und Lösen praktischer Probleme hilft."
  [1] EN: "Trust through transparent communication" | DE: "Vertrauen durch transparente Kommunikation"
  [2] EN: "Accessibility through friendly visuals and plain language" | DE: "Zugänglichkeit durch freundliche Visuals und einfache Sprache"
  [3] EN: "Clarity through structured information" | DE: "Klarheit durch strukturierte Informationen"
  [4] EN: "Innovation through modern but controlled digital details" | DE: "Innovation durch moderne, aber kontrollierte digitale Details"
  [5] EN: "Competence through a consistent and professional system" | DE: "Kompetenz durch ein konsistentes und professionelles System"
  [6] EN: "The verbal tone avoids unnecessary terminology and prioritises user benefits over technical specifications."
      DE: "Die sprachliche Tonalität vermeidet unnötige Fachbegriffe und stellt den Nutzen für die Anwender vor technische Spezifikationen."
  [7] EN: "A light and structured visual language" | DE: "Eine helle und strukturierte visuelle Sprache"
  [8] EN: "The visual direction combines a white and neutral background with several blue tones and restrained gradients. Blue supports associations with trust, intelligence and technology, while the lighter environment prevents the brand from feeling heavy or intimidating. Inter was selected for its screen readability and neutral character."
      DE: "Die visuelle Richtung kombiniert einen weißen und neutralen Hintergrund mit mehreren Blautönen und zurückhaltenden Farbverläufen. Blau unterstützt Assoziationen mit Vertrauen, Intelligenz und Technologie. Die helle Umgebung verhindert gleichzeitig, dass die Marke schwer oder einschüchternd wirkt. Inter wurde aufgrund der guten Lesbarkeit am Bildschirm und des neutralen Charakters ausgewählt."
  [9] EN: "A symbol for connected knowledge" | DE: "Ein Symbol für vernetztes Wissen"
  … (the actual array has 12 items total — see the source file for [10] "The WikiMind symbol combines…" and [11] "A controlled human element" + the dolphin-mascot paragraph; truncated here only to keep this guide readable — copy the full body[] array from wikimind.ts directly if rewriting this section, matching each paragraph by its position)
images[0..4] captions (placeholder): "[ moodboard ]" / "[ colour + type system ]" / "[ logo sketches ]" / "[ logo variants ]" / "[ mascot development ]"

### sections[5] — id "development", nav "Structure & system" / "Struktur & System"
heading — EN: "Turning multiple services into a guided journey"
         DE: "Unterschiedliche Leistungen in eine geführte Nutzerreise übersetzen"
body[0] — EN: "After establishing the brand direction, the website content was organised into a sitemap and reusable page system. The structure was designed to help visitors understand what WikiMind offers, identify the service relevant to them and move towards a clear next action."
         DE: "Nach der Definition der Markenrichtung wurden die Inhalte der Website in einer Sitemap und einem wiederverwendbaren Seitensystem organisiert. Die Struktur hilft Besuchern dabei, das Angebot von WikiMind zu verstehen, eine relevante Leistung zu finden und zu einer klaren nächsten Handlung zu gelangen."
body[1] — EN: "Building consistency through reusable components" | DE: "Konsistenz durch wiederverwendbare Komponenten schaffen"
body[2] — EN: "The interface system uses rounded containers, generous spacing and a limited visual hierarchy to soften the technical subject. Reusable components were created for navigation, buttons, content cards, input fields, service sections, icons, footer, hover states and feedback animations. The component approach keeps the website visually consistent while supporting future expansion."
         DE: "Das Interface-System arbeitet mit abgerundeten Containern, großzügigen Abständen und einer reduzierten visuellen Hierarchie. Wiederverwendbare Komponenten wurden für Navigation, Buttons, Inhaltskarten, Eingabefelder, Leistungsbereiche, Icons, Footer, Hover-Zustände und Feedback-Animationen entwickelt. Der modulare Ansatz hält die Website visuell konsistent und ermöglicht spätere Erweiterungen."
images[0..2] captions: "[ sitemap ]" / "[ wireframes ]" / "[ ui kit ]"

### sections[6] — id "outcome", nav "Final outcome" / "Ergebnis"
heading — EN: "A calmer entry point into artificial intelligence" | DE: "Ein ruhigerer Einstieg in künstliche Intelligenz"
body[0] — EN: "The final concept brings the brand identity, service communication and interface system together in a light and structured website. Large headings establish a clear hierarchy. Service cards divide complex topics into understandable entry points. The mascot introduces a human and recognisable element."
         DE: "Das finale Konzept verbindet Markenidentität, Leistungsbeschreibung und Interface-System in einer hellen und klar strukturierten Website. Große Überschriften schaffen eine deutliche Hierarchie. Leistungskarten teilen komplexe Themen in verständliche Einstiegspunkte. Das Maskottchen bringt ein menschliches und wiedererkennbares Element ein."
body[1] — EN: "The result is an interactive Figma prototype that demonstrates the main page system, navigation behaviour and visual language of WikiMind."
         DE: "Das Ergebnis ist ein interaktiver Figma-Prototyp, der das zentrale Seitensystem, das Navigationsverhalten und die visuelle Sprache von WikiMind demonstriert."
images[0..2] captions: "[ final screens — large showcase ]" / "[ prototype video ]" / "[ interface detail ]"

### sections[7] — id "reflection", nav "Limitations & reflection" / "Grenzen & Reflexion"
heading — EN: "Evaluating the system against the original goals"
         DE: "Das System anhand der ursprünglichen Ziele bewerten"
body[0] — EN: "The concept was refined through iterative comparison, self-evaluation and feedback loops. However, the project did not include a formal moderated usability study with representative users. The case study therefore does not claim a measured improvement in usability or conversion."
         DE: "Das Konzept wurde durch iterative Vergleiche, Selbstevaluation und Feedback-Schleifen weiterentwickelt. Das Projekt umfasste jedoch keine formale moderierte Usability-Studie mit repräsentativen Nutzern. Die Fallstudie behauptet deshalb keine gemessene Verbesserung der Benutzerfreundlichkeit oder Conversion."
body[1] — EN: "A future validation phase should test: whether first-time visitors understand the services, whether the mascot strengthens or reduces credibility, whether users can locate a relevant service quickly, whether the language is understandable without AI knowledge, whether animation supports orientation, and whether contrast, keyboard navigation and screen-reader structure meet accessibility requirements."
         DE: "Eine zukünftige Validierungsphase sollte untersuchen: ob Erstbesucher die Leistungen verstehen, ob das Maskottchen die Glaubwürdigkeit stärkt oder reduziert, ob eine relevante Leistung schnell gefunden wird, ob die Sprache ohne KI-Vorwissen verständlich ist, ob Animation die Orientierung unterstützt und ob Kontraste, Tastaturbedienung und Screenreader-Struktur die Anforderungen an Barrierefreiheit erfüllen."
body[2] — EN: "What I learned" | DE: "Was ich gelernt habe"
body[3] — EN: "WikiMind showed me that making technology approachable does not mean simplifying the visual identity until it becomes generic. The stronger solution came from balancing emotional warmth with professional structure."
         DE: "WikiMind hat mir gezeigt, dass zugängliche Technologiegestaltung nicht bedeutet, eine visuelle Identität so stark zu vereinfachen, dass sie generisch wird. Die stärkere Lösung entstand durch das Gleichgewicht zwischen emotionaler Wärme und professioneller Struktur."
body[4] — EN: "The mascot, colour system and rounded components created accessibility at the visual level. The content hierarchy, service organisation and reusable interface system created clarity at the functional level. The next iteration should focus less on adding new visual elements and more on validating comprehension, improving accessibility and refining the website through direct user observation."
         DE: "Maskottchen, Farbsystem und abgerundete Komponenten erzeugten visuelle Zugänglichkeit. Inhaltshierarchie, Leistungsstruktur und das wiederverwendbare Interface-System schufen funktionale Klarheit. Die nächste Iteration sollte sich weniger auf zusätzliche visuelle Elemente konzentrieren und stärker auf Verständlichkeit, Barrierefreiheit und direkte Nutzerbeobachtung."
```

> The remaining 5 case studies (AFONO, Sync FM, Barrier-Free Kitchen, Surugami, QIS
> Portal Redesign) follow the **exact same structure** — `name`, `projectTag`,
> `headline`, `summary`, `tags[]`, `role`, `contribution`, `type`, `year`, `tools`,
> `deliverables`, `heroImage.alt`, then `sections[]` each with `id`, `navLabel`,
> `heading`, optional `designQuestion`, `body[]`, optional `insights[]` (heading+body
> pairs) or `testing[]` (label+body pairs), and `images[]` (caption-only placeholders).
> Given the length of one full case study above (six-plus pages of body copy per
> project), the other five are summarized below with their key fields — **for full body
> paragraph text, open the file directly** at the path shown; every paragraph in it is
> a plain string in a `body: [...]` array in reading order, so nothing is hidden or
> hard to find, it's just too long to duplicate six times in this guide without making
> it unusable.

### 5.2 AFONO — `src/lib/caseStudies/afono.ts`

```
name: "AFONO" | projectTag: "AFONO · 2026"
headline — EN: "Translating Nepali identity into contemporary streetwear."
          DE: "Nepalesische Identität in moderne Streetwear übersetzen."
summary — EN: "AFONO is a fictional streetwear brand that combines selected cultural references from Nepal with a restrained visual identity, an oversized clothing collection and a complete e-commerce experience."
         DE: "AFONO ist eine fiktive Streetwear-Marke, die ausgewählte kulturelle Bezüge aus Nepal mit einer reduzierten visuellen Identität, einer Oversized-Kollektion und einem vollständigen E-Commerce-Erlebnis verbindet."
heroDisclosure (⚠️ only this case study has this field — a visible transparency note under the hero) —
  EN: "Disclosure: The clothing graphics, brand identity and interface design are my original work. AI-generated images were used only as conceptual campaign and product visualisations."
  DE: (no separate DE value found in the file for heroDisclosure — check afono.ts directly; the `de` object may be missing this field, which would silently show nothing on the German page. Worth checking in the source file.)
tags[0..5]: "Brand Strategy" / "Visual Identity" / "Fashion Graphics" / "UI/UX Design" / "E-commerce" / "Social Media"
role — EN: "Brand, Fashion & UI/UX Designer" | DE: "Brand-, Fashion- & UI/UX-Designerin"
contribution — EN: "Entire project completed independently." | DE: "Das gesamte Projekt wurde eigenständig umgesetzt."
type — EN: "Independent project" | DE: "Eigenständiges Projekt"
year: "2026"
tools — EN: "Figma · Adobe Illustrator · Adobe Photoshop · AI tools for conceptual campaign imagery"
       DE: "Figma · Adobe Illustrator · Adobe Photoshop · KI-Tools für konzeptionelle Kampagnenbilder"
deliverables — EN: "Brand strategy · Naming · Logo · Clothing graphics · E-commerce prototype · Social-media system"
              DE: "Markenstrategie · Naming · Logo · Bekleidungsgrafiken · E-Commerce-Prototyp · Social-Media-System"
heroImage.alt: "Placeholder: AFONO campaign hero visual" (same both languages)

sections (9 total, ids in order): overview, challenge, research, insights, direction,
development, testing, outcome, reflection.
Headings in order (EN | DE):
  1. "The project at a glance" | "Das Projekt auf einen Blick"
  2. "Cultural identity was visible, but often difficult to wear." | "Kulturelle Identität war sichtbar, aber häufig schwer tragbar."
     designQuestion — EN: "How might a Nepal-rooted fashion brand express cultural identity without becoming decorative, traditional or souvenir-like?"
                     DE: "Wie kann eine in Nepal verwurzelte Modemarke kulturelle Identität ausdrücken, ohne dekorativ, traditionell oder souvenirartig zu wirken?"
  3. "Understanding how culture becomes wearable" | "Verstehen, wie Kultur tragbar wird"
  4. "Key insights" | "Zentrale Erkenntnisse" (4 insight pairs — see afono.ts for exact wording: culture-visible-not-overwhelming, wearability, quality-communicated, storytelling)
  5. "Rooted in Nepal, made for modern everyday wear." | "In Nepal verwurzelt, für den modernen Alltag gemacht." (explains the name "AFONO" = Nepali "afno", the logo A+F mark, red/blue/black/white colour system)
  6. "Designing a collection, not isolated graphics" | "Eine Kollektion statt einzelner Grafiken gestalten" (4 collection lines: Himal, City, Mythic, Logo Essentials)
  7. "Testing navigation, orientation and purchase flow" | "Navigation, Orientierung und Kaufprozess testen" (3 usability sessions, 3 participants)
  8. "One identity across product, commerce and communication" | "Eine Identität für Produkt, Commerce und Kommunikation"
  9. "A conceptual brand, presented transparently" | "Eine konzeptionelle Marke, transparent dargestellt" (explicit note: no garments manufactured, AI-generated campaign images are conceptual only)
```

### 5.3 Sync FM — `src/lib/caseStudies/sync-fm.ts`

```
name: "Sync FM" | projectTag: "Sync FM"  (no year in the tag, unlike other projects)
headline — EN: "Giving listeners control without turning radio into another dashboard."
          DE: "Hörerinnen und Hörern Kontrolle geben, ohne Radio in ein weiteres Dashboard zu verwandeln."
summary — EN: "Sync FM is an interactive AI-radio concept that combines the continuous experience of traditional radio with selected controls from personalised streaming. Listeners can adjust information depth, presenter tone and journalistic interpretation without having to assemble every programme manually."
         DE: "Sync FM ist ein interaktives KI-Radio, das das kontinuierliche Erlebnis des klassischen Radios mit ausgewählten Steuerungsmöglichkeiten personalisierter Streaming-Dienste verbindet. Nutzer können Informationstiefe, Moderationston und journalistische Einordnung anpassen, ohne jedes Programm manuell zusammenstellen zu müssen."
tags[0..4]: "Interaction Design" / "AI Concept" / "Mobile UI" / "Audio Experience" / "Prototyping"
role — EN: "Interaction & UI Designer" | DE: "Interaction & UI Designerin"
contribution — EN: "Co-developed the concept and interface with one teammate."
              DE: "Konzept und Interface gemeinsam mit einem Teammitglied entwickelt."
type — EN: "Collaborative university project" | DE: "Gemeinsames Hochschulprojekt"
year: "" (empty) | tools: "" (empty) | deliverables: "" (empty) — these three fields are blank for this project, so the "Year / Tools / Deliverables" facts strip shows fewer items than for other case studies
heroImage.alt: "Placeholder: Sync FM mobile interface hero visual"

sections (8 total): overview, challenge, research, direction, development, outcome,
testing, reflection.
Headings in order (EN | DE):
  1. "The project at a glance" | "Das Projekt auf einen Blick"
  2. "Radio is effortless, but rarely personal." | "Radio ist mühelos, aber selten persönlich."
     designQuestion — EN: "How might an auditory interface give listeners agency without overwhelming them with continuous decisions?"
                     DE: "Wie kann ein auditives Interface Handlungsspielraum bieten, ohne Hörer mit ständigen Entscheidungen zu überfordern?"
  3. "Existing AI-radio systems automate content, but provide little transparency." | "Bestehende KI-Radios automatisieren Inhalte, bieten jedoch wenig Transparenz." — includes 3 personas explicitly labelled "AI-assisted hypothesis persona" (generated with Gemini, disclosed as such, not primary research)
  4. "Control through a few expressive decisions" | "Kontrolle durch wenige ausdrucksstarke Entscheidungen"
  5. "The three controls" | "Die drei Steuerungen" — Sync Dial / Mood Bar / Opinion Filter, each explained in one paragraph; also discloses the logo concept was AI-generated (Gemini) then refined by the team
  6. "A continuous information flow shaped in real time" | "Ein kontinuierlicher Informationsfluss, der in Echtzeit angepasst wird"
  7. "Control is not automatically neutral." | "Kontrolle ist nicht automatisch neutral." — ethics discussion of the Opinion Filter (filter-bubble risk), lists 5 proposed safeguards
  8. "Separating concept, prototype and future behaviour" | "Konzept, Prototyp und zukünftiges Verhalten klar unterscheiden" — explicit limitations: personas were AI-assisted hypotheses, not interview findings
```

### 5.4 Barrier-Free Kitchen — `src/lib/caseStudies/barrier-free-kitchen.ts`

```
name — EN: "Barrier-Free Kitchen" | DE: "Barrierefreie Küche"
projectTag: same as name, no date
headline — EN: "Designing a kitchen through reach, sight and touch."
          DE: "Eine Küche durch Reichweite, Sehen und Berührung gestalten."
summary — EN: "This inclusive-design project explores how a kitchen can better support wheelchair users and people with cataracts. The concept was developed through observation, an interview, embodied testing, physical prototypes and a final animated Blender environment."
         DE: "Dieses Inclusive-Design-Projekt untersucht, wie eine Küche Menschen im Rollstuhl und Personen mit Grauem Star besser unterstützen kann. Das Konzept entstand durch Beobachtung, ein Interview, Selbsterfahrung, physische Prototypen und eine abschließende animierte Blender-Umgebung."
tags[0..4]: "Inclusive Design" / "Design Research" / "Spatial Design" / "Physical Prototyping" / "3D Visualisation"
role — EN: "Prototyping & 3D Designer" | DE: "Prototyping & 3D Design"
contribution — EN: "Created paper and 3D models, materials and textures, and participated in testing."
              DE: "Papier- und 3D-Modelle, Materialien und Texturen erstellt sowie an Tests mitgewirkt."
type — EN: "Collaborative university project" | DE: "Gemeinsames Hochschulprojekt"
year: "" | tools: "" (both empty)
deliverables — EN: "Final rendering by a team member." | DE: "Finales Rendering von einem Teammitglied."
heroImage.alt — EN: "Final kitchen render, full width" | DE: "Finales Küchen-Rendering, volle Breite"
  ⚠️ This is the one case study whose hero image is a genuinely REAL photo file
  (frame-6-mrtp0czu-dh8i.png) — see IMAGES section.

sections (8 total): overview, challenge, research, direction, development, testing,
outcome, reflection.
Headings (EN | DE):
  1. "The project at a glance" | "Das Projekt auf einen Blick"
  2. "Standard kitchen layouts assume a narrow range of bodies and abilities." | "Standardküchen setzen einen engen Bereich körperlicher Fähigkeiten voraus."
     designQuestion — EN: "How might a kitchen support more independent use when reach, mobility and visual perception are limited?"
                     DE: "Wie kann eine Küche selbstständigere Nutzung unterstützen, wenn Reichweite, Mobilität und visuelle Wahrnehmung eingeschränkt sind?"
  3. "Studying real actions rather than isolated dimensions" | "Reale Handlungen statt isolierter Maße untersuchen"
  4. "Sight, action and tactile space" | "Sehraum, Wirkraum und Tastraum" — 3-part framework (insights) + a "Key barriers" list (body)
  5. "Moving from observations to spatial relationships" | "Beobachtungen in räumliche Beziehungen übersetzen" — wooden blocks, Lego Serious Play, journey map
  6. "Testing the kitchen at the scale of the body" | "Die Küche im Maßstab des Körpers testen" — full-scale paper prototype testing
  7. "Five final principles" | "Fünf Gestaltungsprinzipien" — 5 insight pairs: Adjustable reach, Clear movement, Strong visual contrast, Tactile differentiation, Organised storage; also discloses that EEVEE (not Cycles) was used for the final Blender render as a time trade-off (~26 days estimated for Cycles), acknowledging lower visual quality as a result
  8. "Formative evidence, not comprehensive validation" | "Formative Erkenntnisse, keine umfassende Validierung" — explicit limitations list (simulated disability experience, small participant count, no engineering validation, etc.)
```

### 5.5 Surugami — `src/lib/caseStudies/surugami.ts`

```
name: "Surugami" | projectTag: "Surugami" (no date)
headline — EN: "Making origami feel social, contemporary and easy to enter."
          DE: "Origami sozial, zeitgemäß und leicht zugänglich gestalten."
summary — EN: "Surugami is an origami-inspired brand and digital experience that connects learning, workshops, visual storytelling and community participation through one coherent identity."
         DE: "Surugami ist eine von Origami inspirierte Marke und digitale Erfahrung, die Lernen, Workshops, visuelles Storytelling und Community-Teilnahme in einer konsistenten Identität verbindet."
tags[0..4]: "Brand Identity" / "Graphic Design" / "Print Design" / "Web Design" / "Prototyping"
role — EN: "Illustration, Poster & Web Design" | DE: "Illustration, Poster- & Webdesign"
contribution — EN: "Created illustrations, one poster, mock-ups and co-designed the website."
              DE: "Illustrationen, ein Poster und Mock-ups gestaltet sowie die Website mitentwickelt."
type — EN: "Collaborative university project" | DE: "Gemeinsames Hochschulprojekt"
year: "" | tools: "" (both empty)
deliverables — EN: "Illustration, one poster and mock-ups by Alexsha · Website co-designed · Brand direction collaborative"
              DE: "Illustration, ein Poster und Mock-ups von Alexsha · Website gemeinsam gestaltet · Markenrichtung im Team entwickelt"
heroImage.alt — EN: "Surugami poster and identity hero visual, full width" | DE: "Surugami Poster und Identität, volle Breite"
  (⚠️ note: despite the "real photo" wording of this alt text, the manifest — see
  IMAGES — flags the underlying file `1-ms52o75m-suju.png` as a solid-colour stand-in,
  not a genuine export yet.)

sections (9 total): overview, challenge, research, insights, direction, development,
testing, outcome, reflection.
Headings (EN | DE):
  1. "The project at a glance" | "Das Projekt auf einen Blick"
  2. "A familiar craft can still feel difficult to enter." | "Ein bekanntes Handwerk kann trotzdem schwer zugänglich wirken."
     designQuestion — EN: "How might an origami brand preserve the character of the craft while making it inviting to beginners and a wider creative community?"
                     DE: "Wie kann eine Origami-Marke den Charakter des Handwerks bewahren und es gleichzeitig für Anfänger und eine größere kreative Community zugänglich machen?"
  3. "Looking beyond traditional craft branding" | "Über traditionelle Handwerksmarken hinausblicken"
  4. "Key insights" | "Zentrale Erkenntnisse" — 4 pairs (visible entry point for beginners, community reduces isolation, playfulness needs structure, folding as visual language)
  5. "From a single fold to a shared community." | "Von einer einzelnen Falte zu einer gemeinsamen Community." — explains coral/mint/teal colour system
  6. "Extending one identity across physical communication" | "Eine Identität auf physische Kommunikation übertragen" — print system + website content priorities
  7. "Testing" section uses a distinct `testing[]` format (Observation → Interpretation → Revision), not `body`:
     Observation — EN: "“The user hesitated when locating a workshop.”" | DE: "„Die Testperson zögerte bei der Suche nach einem Workshop.“"
     Interpretation — EN: "“Workshop information did not have sufficient visual priority.”" | DE: "„Workshop-Informationen hatten keine ausreichende visuelle Priorität.“"
     Revision — EN: "“The navigation label, card hierarchy and call to action were clarified.”" | DE: "„Navigationsbezeichnung, Kartenhierarchie und Call-to-Action wurden klarer gestaltet.“"
  8. "One folding principle across brand, print and web" | "Ein Faltprinzip für Marke, Print und Web"
  9. "What I learned" | "Was ich gelernt habe" (heading and body content differ slightly from the other 5 case studies' "reflection" sections — this one's heading IS "What I learned" rather than a separate framing heading with "What I learned" as a sub-line)
```

### 5.6 QIS Portal Redesign — `src/lib/caseStudies/qis-portal.ts`

```
name: "QIS Portal Redesign" | projectTag: "QIS Portal Redesign · 2024"
headline — EN: "Turning a fragmented university portal into a clearer student service."
          DE: "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice verwandeln."
summary — EN: "The QIS redesign reorganises essential university-administration tasks around how students search for exams, certificates, grades, fees and personal information."
         DE: "Das QIS-Redesign strukturiert zentrale Hochschulverwaltungsaufgaben danach, wie Studierende Prüfungen, Bescheinigungen, Noten, Gebühren und persönliche Informationen suchen und bearbeiten."
tags[0..4]: "UX Research" / "Information Architecture" / "Product Design" / "Usability Testing" / "Service UX"
role — EN: "UX/UI Designer & Researcher" | DE: "UX/UI Designerin & Researcherin"
contribution — EN: "Led most of the UX, interface and usability work. The team supported the surveys."
              DE: "Den Großteil der UX-, Interface- und Usability-Arbeit umgesetzt. Das Team unterstützte die Umfragen."
type — EN: "Collaborative university project" | DE: "Gemeinsames Hochschulprojekt"
year — EN: "2024 · 2026 visual iteration" | DE: "2024 · visuelle Iteration 2026"
tools: "" | deliverables: "" (both empty)
heroImage.alt — EN: "Redesigned QIS dashboard, full width" | DE: "Neu gestaltetes QIS-Dashboard, volle Breite"
  ⚠️ This is the other case study whose hero image is a genuinely REAL photo
  (screenshot-2026-07-07-at-15-29-39-ms52mvv5-d1vc.png) — see IMAGES.

sections (9 total): overview, challenge, research, insights, direction, testing,
development, outcome, reflection.
Headings (EN | DE):
  1. "The project at a glance" | "Das Projekt auf einen Blick" — opens with a stats line: "287 survey responses · 21 → 14 pages in the architecture · 12 test participants · ≈ 90.6 average SUS score" (DE: "287 Umfrage-Antworten · 21 → 14 Seiten in der Architektur · 12 Test-Teilnehmende · ≈ 90,6 durchschnittlicher SUS-Wert")
  2. "Essential content was hidden inside an outdated structure." | "Wichtige Inhalte waren in einer veralteten Struktur verborgen."
     designQuestion — EN: "How might a university portal make essential administrative tasks easier to find, understand and complete?"
                     DE: "Wie kann ein Hochschulportal zentrale Verwaltungsaufgaben leichter auffindbar, verständlich und ausführbar machen?"
  3. "Combining open feedback with measurable evaluation" | "Offenes Feedback mit messbarer Bewertung verbinden" — survey 1 (150 responses), survey 2 (137 responses)
  4. "Key insights" | "Zentrale Erkenntnisse" — 4 pairs
  5. "Reducing 21 pages to 14 without removing essential functionality" | "21 Seiten auf 14 reduzieren, ohne zentrale Funktionen zu entfernen"
  6. "Evaluating seven essential student tasks" | "Sieben zentrale Aufgaben von Studierenden evaluieren" — 12 remote participants, SUS scores 77.5–100, average ≈90.6
  7. "Preserving the tested logic, updating the visual layer" | "Die getestete Logik bewahren, die visuelle Ebene erneuern" — explicitly labelled as the "2026 iteration"; 8 insight pairs describing the updated dashboard (task-based dashboard, persistent navigation, global search, visible deadlines, accessible status system, responsive tables, consistent forms, restrained palette)
  8. "A student portal organised around actions, not administration." | "Ein Studierendenportal, das nach Handlungen statt Verwaltung organisiert ist."
  9. "A strong foundation with clear limits" | "Eine starke Grundlage mit klaren Grenzen" — explicit limitations list (team-completed, remote testing, no production backend, no accessibility validation with disabled users, etc.)
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
year — EN: "Year" | DE: "Jahr"
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
   photo/screenshot, or — per `public/images/MANIFEST.md` (auto-generated when these
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
`MANIFEST.md`, dropping a same-named file into `public/images/` is enough).

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

These render as a dashed-border box with a small caption via the `PlaceholderImage`
component — there is currently **no mechanism in the data model** to attach a real
photo here (the `images[]` / `carouselItems[]` / `items[]` fields only carry a caption
+ aspect ratio, not a `src`). Adding a real photo to any of these requires a small code
change (adding an `image` field to the relevant type + swapping `PlaceholderImage` for
the `Image` component at that call site) — flag which ones you want to fix with a real
photo and that can be done as a follow-up; it can't be done by editing this content
guide or the data files alone.

- **Case-study inline images** (§5): 71 placeholder image slots across the 6 case
  studies' `sections[].images[]` arrays (e.g. WikiMind's "[ moodboard ]", "[ logo
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
- **~120 image slots still needing a real photo**: 5 wired-up files that are currently
  solid-colour stand-ins (including the portrait — see §10.2), plus ~115 caption-only
  placeholder boxes with no image mechanism at all yet (71 in case studies, 8 in the
  About carousel, 36 in Playground — see §10.4).
- **9 unused image files** sitting in `public/images/` with no page referencing them.
