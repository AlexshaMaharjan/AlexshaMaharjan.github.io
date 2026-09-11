import type { Dictionary } from "./types";

const de: Dictionary = {
  meta: {
    title: "Alexsha Maharjan — Portfolio",
    description:
      "Ich gestalte intuitive digitale Erlebnisse und einzigartige Marken. Portfolio von Alexsha Maharjan, einer Digital-Designerin aus Lübeck, Deutschland.",
  },
  nav: {
    portfolio: "Portfolio",
    playground: "Playground",
    projects: "Projekte",
    about: "Über mich",
    contact: "Kontakt",
    menu: "Menü",
    close: "Schließen",
    modeSwitchLabel: "Ansichtsmodus",
    switchToPlayground: "Zum Playground wechseln",
    switchToPortfolio: "Zum Portfolio wechseln",
    switchToGerman: "Zu Deutsch wechseln",
    switchToEnglish: "Zu Englisch wechseln",
  },
  landmarks: {
    primaryNav: "Hauptnavigation",
    menu: "Menü",
    footerNav: "Fußzeile",
    projectNav: "Projekt-Navigation",
    processCanvas: "Mein Designprozess",
  },
  hero: {
    eyebrow: "Digital Designerin aus Lübeck, Deutschland",
    headlineLines: ["Hallo, ich bin", "Alexsha Maharjan"],
    intro:
      "Ich gestalte intuitive digitale Erlebnisse und entwickle Marken, die etwas bedeuten und wie keine andere aussehen.",
    tags: "UI/UX · Branding · Visual Design",
  },
  process: {
    scrollCue: "Scrollen zum Entdecken ↓",
    question: "Wie bringe ich ein Projekt zum Leben?",
    srSummary:
      "Mein Prozess in fünf Schritten: verstehen, was Menschen unklar ist, definieren, was es wert ist, gelöst zu werden, Möglichkeiten durch Skizzen und Wireframes erkunden, gestalten, wie sich das Erlebnis anfühlen soll, und verfeinern durch Tests und Iteration.",
    branches: [
      {
        number: "01",
        title: "Verstehen",
        question: "Was fühlt sich für Menschen unklar an?",
        ariaLabel:
          "Schritt 1: Verstehen. Was fühlt sich für Menschen unklar an? Interviews, SWOT-Marktanalyse und Frustrationswerte.",
      },
      {
        number: "02",
        title: "Definieren",
        question: "Was ist es wirklich wert, gelöst zu werden?",
        ariaLabel:
          "Schritt 2: Definieren. Was ist es wirklich wert, gelöst zu werden? Wirkung und Aufwand, Chancen-Statement, Erfolgskriterien.",
      },
      {
        number: "03",
        title: "Erkunden",
        question: "Wie mache ich Möglichkeiten sichtbar?",
        ariaLabel:
          "Schritt 3: Erkunden. Wie mache ich Möglichkeiten sichtbar? Sitemaps, Skizzen und Konzeptrichtungen.",
      },
      {
        number: "04",
        title: "Gestalten",
        question: "Wie soll sich das Erlebnis anfühlen?",
        ariaLabel:
          "Schritt 4: Gestalten. Wie soll sich das Erlebnis anfühlen? Typografie, Farbe, Komponenten und Markenanwendungen.",
      },
      {
        number: "05",
        title: "Verfeinern",
        question: "Woran erkenne ich, dass es funktioniert?",
        ariaLabel:
          "Schritt 5: Verfeinern. Woran erkenne ich, dass es funktioniert? Vorher-Nachher, Usability-Tests, Validierung und Iteration.",
      },
    ],
    closeSelection: "Auswahl schließen",
  },
  selectedWork: {
    eyebrow: "Ausgewählte Projekte",
    heading: "Durchdachtes Design, bedeutungsvolle Wirkung",
    copy: "Meine Arbeit konzentriert sich auf die Entwicklung visueller Identitäten und digitaler Erlebnisse, die klar, ansprechend und zielgerichtet sind. Von Markensystemen über User Interfaces bis hin zu experimentellen Projekten erforsche ich, wie Design Ideen vermittelt, Probleme löst und bessere Erlebnisse für Nutzer schafft.",
  },
  projects: [
    {
      slug: "wikimind",
      name: "WikiMind",
      headline: "Künstliche Intelligenz klar, nützlich und zugänglich gestalten.",
      description:
        "Komplexe KI-Leistungen durch eine zugängliche Markenidentität und eine klar strukturierte Website verständlicher machen.",
      tags: ["Branding", "UI/UX", "Web Design"],
      role: "Brand & UI/UX Designerin",
      year: "2026",
      image: "/images/hero-wikimind.webp",
      imageAlt: "Die WikiMind-Startseite auf einem Laptop, neben dem Titel der Fallstudie",
      imageAspect: "1900/1066",
    },
    {
      slug: "afono",
      name: "AFONO",
      headline: "Nepalesische Identität in moderne Streetwear übersetzen.",
      description:
        "Eine kulturell verwurzelte Streetwear-Identität, die Markenstrategie, Bekleidungsgrafik und E-Commerce-Design verbindet.",
      tags: ["Branding", "E-commerce", "Graphic Design"],
      role: "Brand-, Fashion- & UI/UX-Designerin",
      year: "2026",
      image: "/images/hero-afono.webp",
      imageAlt: "Schriftzüge aus AFONOs HIMAL-Serie",
      imageAspect: "1600/900",
    },
    {
      slug: "sync-fm",
      name: "Sync FM",
      headline: "Hörerinnen und Hörern Kontrolle geben, ohne Radio in ein weiteres Dashboard zu verwandeln.",
      description:
        "Ein interaktives KI-Radio, mit dem Nutzer Informationstiefe, Moderationston und journalistische Einordnung steuern können.",
      tags: ["Interaction Design", "Mobile UI", "AI Concept"],
      role: "Interaction & UI Designerin",
      year: "",
      image: "/images/hero-sync-fm.webp",
      imageAlt: "Der Sync-FM-Homescreen mit dem Nachrichtenregler",
      imageAspect: "1578/1088",
    },
    {
      slug: "barrier-free-kitchen",
      name: "Barrierefreie Küche",
      headline: "Eine Küche durch Reichweite, Sehen und Berührung gestalten.",
      description:
        "Eine inklusive Küche, entwickelt durch Beobachtung, Tests im Maßstab 1:1 und 3D-Umgebungsdesign.",
      tags: ["Inclusive Design", "Design Research", "3D"],
      role: "Prototyping & 3D Design",
      year: "",
      image: "/images/hero-barrier-free-kitchen.webp",
      imageAlt: "Die barrierefreie Küche als 3D-Modell",
      imageAspect: "1900/1069",
    },
    {
      slug: "surugami",
      name: "Surugami",
      headline: "Origami sozial, zeitgemäß und leicht zugänglich gestalten.",
      description:
        "Eine von Origami inspirierte Identität, übersetzt in eine konsistente Printkampagne und digitale Erfahrung.",
      tags: ["Branding", "Print Design", "Web Design"],
      role: "Illustration, Poster- & Webdesign",
      year: "",
      image: "/images/hero-surugami.webp",
      imageAlt: "Ein Surugami-Plakat lädt zum Falten ein",
      imageAspect: "1900/1189",
    },
    {
      slug: "qis-portal",
      name: "QIS Portal Redesign",
      headline: "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice verwandeln.",
      description:
        "Ein forschungsbasiertes Redesign, das zentrale Hochschulverwaltungsaufgaben für Studierende vereinfacht.",
      tags: ["UX Research", "Information Architecture", "Product Design"],
      role: "UX/UI Designerin & Researcherin",
      year: "2024",
      image: "/images/hero-qis-portal.webp",
      imageAlt: "Die überarbeitete Prüfungsseite des QIS-Portals",
      imageAspect: "1900/1069",
    },
  ],
  resume: {
    metaTitle: "Lebenslauf — Alexsha Maharjan",
    name: "Alexsha Maharjan",
    tagline: "UX/UI Design · Corporate Design · Frontend",
    location: "Lübeck, Deutschland",
    email: "alexsha.maharjan1@gmail.com",
    portfolio: "alexshamaharjan.github.io",
    portfolioHref: "https://alexshamaharjan.github.io",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    backToAbout: "← Zurück zu Über mich",
    profileHeading: "Profil",
    profileBody:
      "Studentin der Informationstechnologie und Design (B.Sc.) an der Technischen Hochschule Lübeck, Schwerpunkt Human-Centered Design. Gestaltung von Interfaces und Markenauftritten in Semester- und eigenen Projekten, dazu die Frontend-Umsetzung mit HTML, CSS und Vue.js. Deutsch C1, Englisch fließend.",
    educationHeading: "Bildungsweg",
    education: [
      {
        degree: "Informationstechnologie und Design, B.Sc.",
        period: "03/2024 – 08/2027 (vorauss.)",
        place: "Technische Hochschule Lübeck, Lübeck · aktueller Notendurchschnitt 1,8",
        detail: "Relevante Module: Grundlagen der Typografie, Design-Methodologie, Darstellungstechniken, Web-Entwicklung",
      },
      {
        degree: "Informatik, B.Sc. (Studienfachwechsel)",
        period: "09/2022 – 02/2024",
        place: "Technische Hochschule Lübeck, Lübeck",
      },
      {
        degree: "Studienkolleg, Schwerpunktkurs T (Technik)",
        period: "09/2021 – 08/2022",
        place: "Studienkolleg Coburg, Coburg · Abschlussnote 1,5",
      },
      {
        degree: "Higher Secondary Education (10+2), Naturwissenschaften",
        period: "06/2017 – 05/2019",
        place: "GEMS Institute of Higher Education, Kathmandu, Nepal · Unterrichtssprache Englisch",
      },
    ],
    projectsHeading: "Ausgewählte Projekte",
    projects: [
      {
        name: "Wikimind – Corporate Design & Website für ein KI-Unternehmen",
        period: "2025",
        place: "Semesterprojekt, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Visuelles Erscheinungsbild, UI-Design und Website-Konzept, inklusive Maskottchen für die Bildsprache",
          "Informationsarchitektur, Wireframing und High-Fidelity-Prototyping in Figma",
        ],
      },
      {
        name: "Surugami – Brand Identity, Print & Webdesign",
        period: "2025",
        place: "Semesterprojekt, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Logo, Typografie und Farbwelt; druckfähige Layouts für Flyer, Poster und Banner (CMYK, Reinzeichnung)",
          "Interaktiver Figma-Prototyp der Markenwebsite",
        ],
      },
      {
        name: "Hibi – Produktivitäts-Web-App, Design & Entwicklung",
        period: "2025",
        place: "Eigenprojekt, Lübeck",
        bullets: [
          "UX/UI-Konzept für To-do, Kalender, Journal und Mood-Tracking",
          "Frontend-Umsetzung mit Vue.js und Tailwind CSS",
        ],
      },
    ],
    experienceHeading: "Praktische Erfahrung",
    experience: [
      {
        role: "Werkstudentin: Bilddatenannotation / Bildverarbeitung",
        period: "07/2024 – 06/2026",
        place: "Nordischer Maschinenbau Rud. Baader GmbH & Co. KG, Lübeck",
        bullets: [
          "Annotation und Qualitätskontrolle von Bilddaten für KI-gestützte Verarbeitungssysteme",
          "Strukturierte Prüfung großer Datensätze nach definierten Qualitätsstandards",
          "Dokumentation der Ergebnisse und Zusammenarbeit mit interdisziplinären Teams",
        ],
      },
    ],
    furtherHeading: "Weiterbildung & Engagement",
    further: [
      {
        title: "AI Builders Arena",
        place: "opencampus.sh, Kiel",
        description: "Designerin im interdisziplinären Team; UX-Konzept und Chatbot-Design für das Waterkant Festival",
        period: "04/2024 – 07/2024",
      },
      {
        title: "Workshop „Prompt like a Pro“",
        place: "Technische Hochschule Lübeck, Lübeck",
        description: "KI-Werkzeuge für Texte und Bilder, Projektwoche",
        period: "11.11.2024",
      },
    ],
    skillsHeading: "Kenntnisse",
    skills: [
      { label: "Design", value: "UX/UI-Design, Human-Centered Design, Wireframing, Prototyping, Corporate Design, Branding, Editorial- & Printdesign, Typografie, Responsive Design" },
      { label: "Software", value: "Figma, Adobe Illustrator, Photoshop, InDesign, Fresco, Blender, Microsoft 365" },
      { label: "Print & Produktion", value: "Druckvorstufe, Reinzeichnung, druckfähige PDFs, CMYK, Verpackungsdesign" },
      { label: "Entwicklung", value: "HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS, MariaDB, Docker" },
      { label: "Sprachen", value: "Nepali – Muttersprache · Newari – Muttersprache · Deutsch – fließend (C1) · Englisch – fließend · Hindi – fließend" },
    ],
    printCta: "Drucken / Als PDF speichern",
  },
  aboutPreview: {
    eyebrow: "Über mich",
    heading: "Wie bin ich zum Design gekommen?",
    copy:
      "Ich bin in Nepal aufgewachsen, umgeben von Kreativität. Ich habe ständig etwas gemacht, mit Handarbeit experimentiert und persönliche Geschenke für die Menschen um mich herum gestaltet. Am schönsten war dabei nicht, etwas Hübsches entstehen zu lassen, sondern an die Person zu denken, für die es war: was ihr gefallen würde und was es bedeutsam machen würde.",
    copyDim:
      "Dieses Denken hat mich am Ende zum Design gebracht. Mir wurde klar, dass vieles, was mir ohnehin Freude gemacht hat, Menschen zu verstehen, bewusst zu entscheiden und Ideen sichtbar zu machen, genau den Kern von nutzerzentriertem Design ausmacht.",
    linkAbout: "Die ganze Geschichte lesen →",
    playgroundHeading: "Der Playground",
    playgroundCopy: "Alles, was ich mache, wenn niemand danach gefragt hat. Eigene Projekte, Handarbeit, Experimente und was ich gerade lerne.",
    linkPlayground: "Playground öffnen",
    portraitAlt: "Porträt von Alexsha Maharjan.",
  },
  contact: {
    eyebrow: "Kontakt",
    heading: "Offen für Designmöglichkeiten.",
    copy: "Interesse an meiner Arbeit? Sehen Sie sich meinen Lebenslauf an oder kontaktieren Sie mich zu einer Stelle, einem Projekt oder einer Zusammenarbeit.",
    resumeCta: "Lebenslauf ansehen",
    contactCta: "Kontakt",
  },
  footer: {
    tagline: "UI/UX-, Brand- und Visual Designerin",
    email: "alexsha.maharjan1@gmail.com",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    resume: "Lebenslauf",
    backToTop: "Nach oben ↑",
    copyright: "© 2026 Alexsha Maharjan",
  },
  legal: {
    impressumNav: "Impressum",
    privacyNav: "Datenschutz",
    address: ["Alexsha Maharjan", "Anschützstr. 7", "23562 Lübeck", "Deutschland"],
    impressum: {
      title: "Impressum",
      intro: "Anbieterkennzeichnung für diese Website nach § 5 DDG.",
      updated: "Stand: September 2026",
      sections: [
        {
          heading: "Angaben gemäß § 5 DDG",
          body: [],
          address: true,
        },
        {
          heading: "Kontakt",
          body: ["E-Mail: alexsha.maharjan1@gmail.com"],
        },
        {
          heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          body: ["Alexsha Maharjan, Anschrift wie oben."],
        },
        {
          heading: "Haftung für Inhalte",
          body: [
            "Als Diensteanbieterin bin ich nach § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieterin jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
            "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben davon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entferne ich diese Inhalte umgehend.",
          ],
        },
        {
          heading: "Haftung für Links",
          body: [
            "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets die jeweilige Anbieterin oder der jeweilige Anbieter verantwortlich.",
            "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Links umgehend.",
          ],
        },
        {
          heading: "Urheberrecht",
          body: [
            "Die von mir erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
            "Marken, Logos und Kundenmaterialien in den Projektdarstellungen bleiben Eigentum der jeweiligen Rechteinhaberinnen und Rechteinhaber und werden hier zur Dokumentation der Gestaltungsarbeit gezeigt.",
          ],
        },
        {
          heading: "Verbraucherstreitbeilegung",
          body: [
            "Ich bin weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          ],
        },
      ],
    },
    privacy: {
      title: "Datenschutz",
      intro:
        "Was beim Besuch dieser Website mit Daten passiert und welche Rechte Sie nach der DSGVO haben.",
      updated: "Stand: September 2026",
      sections: [
        {
          heading: "Kurz gefasst",
          body: [
            "Diese Website ist ein persönliches Portfolio. Sie setzt keine Cookies, bindet keine Analyse- oder Trackingdienste ein und hat weder Nutzerkonten noch ein Kontaktformular. Die einzigen Daten, die beim Besuch anfallen, sind die technischen Zugriffsdaten, die der Hoster protokolliert, und die Daten, die Ihr Browser beim Laden der beiden Schriftarten an Google überträgt.",
          ],
        },
        {
          heading: "Verantwortliche",
          body: ["E-Mail: alexsha.maharjan1@gmail.com"],
          address: true,
        },
        {
          heading: "Hosting",
          body: [
            "Diese Website wird von GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
            "Beim Aufruf einer Seite überträgt Ihr Browser technisch notwendige Daten an die Server von GitHub, die dort in Server-Logfiles protokolliert werden. Dazu gehören in der Regel die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Adresse, die Referrer-URL sowie Browser und Betriebssystem. Diese Daten werden nicht mit anderen Quellen zusammengeführt, und ich habe keinen Zugriff darauf.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung dieser Website. GitHub verarbeitet diese Daten auch in den USA.",
          ],
        },
        {
          heading: "Schriftarten",
          body: [
            "Diese Website lädt die Schriftarten Inter und Caveat über Google Fonts, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Ihr Browser lädt die Schriftdateien direkt von Servern von Google und überträgt dabei Ihre IP-Adresse.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an einer einheitlichen Darstellung dieser Website.",
          ],
        },
        {
          heading: "Kontaktaufnahme per E-Mail",
          body: [
            "Wenn Sie mir schreiben, verarbeite ich Ihre Absenderadresse und den Inhalt Ihrer Nachricht, um die Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag gerichtet ist, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Ich lösche diese Daten, sobald sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
          ],
        },
        {
          heading: "Externe Links",
          body: [
            "Von dieser Website führen Links zu externen Diensten, unter anderem zu LinkedIn. Für die Datenverarbeitung auf diesen Seiten ist die jeweilige Anbieterin oder der jeweilige Anbieter verantwortlich. Daten werden erst übertragen, wenn Sie einen solchen Link aktiv anklicken.",
          ],
        },
        {
          heading: "Verschlüsselung",
          body: [
            "Diese Website wird ausschließlich über HTTPS ausgeliefert. Die Verbindung zwischen Ihrem Browser und dem Server ist damit verschlüsselt.",
          ],
        },
        {
          heading: "Ihre Rechte",
          body: [
            "Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO) sowie auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die Verarbeitung (Art. 21). Wenden Sie sich dafür an die oben genannte Adresse.",
            "Unabhängig davon können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Zuständig ist in der Regel die Behörde Ihres Wohnsitzes oder die Behörde an meinem Sitz.",
          ],
        },
        {
          heading: "Änderungen",
          body: [
            "Ich passe diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt jeweils die hier veröffentlichte Fassung.",
          ],
        },
      ],
    },
  },
  about: {
    backToHome: "← Zurück zur Startseite",
    eyebrow: "Über mich",
    heading: "Wie bin ich zum Design gekommen?",
    portraitAlt: "Porträt von Alexsha.",
    handNoteOrigin: "Nepal → Deutschland",
    handNoteMaking: "immer am Gestalten!",
    portraitTags: ["UI/UX-Design", "Branding", "Visual Design"],
    biographyHeading: "Biografie",
    biography: [
      "Ich bin in Nepal aufgewachsen, umgeben von Kreativität. Ich habe ständig etwas gemacht, mit Handarbeit experimentiert und persönliche Geschenke für die Menschen um mich herum gestaltet. Am schönsten war dabei nicht, etwas Hübsches entstehen zu lassen, sondern an die Person zu denken, für die es war: was ihr gefallen würde und was es bedeutsam machen würde.",
      "Dieses Denken hat mich am Ende zum Design gebracht. Mir wurde klar, dass vieles, was mir ohnehin Freude gemacht hat, Menschen zu verstehen, bewusst zu entscheiden und Ideen sichtbar zu machen, genau den Kern von nutzerzentriertem Design ausmacht.",
      "Dieser Weg hat mich von Nepal nach Deutschland geführt. Hier mache ich meinen Bachelor und wachse als multidisziplinäre Designerin mit Schwerpunkt auf UI/UX, Visual Design, Branding und Webdesign. Das Leben in einer neuen Umgebung hat auch meinen Blick auf Menschen, Kultur und Design erweitert.",
      "Gutes Design ist für mich nicht nur eine Frage des Aussehens. Es geht genauso darum zu verstehen, für wen etwas ist, und etwas zu schaffen, das sich nützlich und bedeutsam anfühlt.",
    ],
    focusHeading: "Schwerpunkte",
    focusItems: ["UI/UX Design", "Webdesign", "Markenidentität", "Grafikdesign", "Interaction Design"],
    toolsHeading: "Werkzeuge, die ich gelernt habe",
    tools: [
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Adobe Photoshop" },
      { name: "Blender" },
      { name: "After Effects" },
      { name: "Künstliche Intelligenz", accent: true },
    ],
    aiBody:
      "Ich nutze KI, um schneller breiter zu denken: Recherche verdichten, Richtungen durchspielen, Texte schärfen, Ideen früh testbar machen. Die Urteile, das Handwerk und die letzten Entscheidungen bleiben meine.",
    aiTags: ["Recherche", "Ideenfindung", "Inhalte", "Prototyping"],
    playgroundHeading: "Der Playground",
    playgroundCopy: "Alles, was ich mache, wenn niemand danach gefragt hat. Eigene Projekte, Handarbeit, Experimente und was ich gerade lerne.",
    linkPlayground: "Playground öffnen",
    loveIntro: "Ich liebe",
    loveWords: [
      "Handarbeit",
      "Geschenke gestalten",
      "Perlenarbeit",
      "Malen",
      "Typografie",
      "Farbe",
      "Verpackungen",
      "Sprachen lernen",
    ],
    resumeHeading: "Lebenslauf & Kontakt",
    resumeCopy: "Interesse an einer Zusammenarbeit? Sehen Sie sich meinen Lebenslauf an oder schreiben Sie mir.",
    resumeCta: "Lebenslauf ansehen",
    contactCta: "Kontakt",
  },
  routeLoading: "Seite wird geladen…",
  caseStudy: {
    backToProjects: "← Zurück zu den Projekten",
    onThisPage: "Auf dieser Seite",
    designQuestion: "Designfrage",
    previousProject: "← Vorheriges Projekt",
    nextProject: "Nächstes Projekt →",
    viewAllWork: "Alle Projekte ansehen",
    role: "Rolle",
    contribution: "Beitrag",
    type: "Typ",
    tools: "Tools",
    deliverables: "Ergebnisse",
  },
  notFound: {
    metaTitle: "Seite nicht gefunden — Alexsha Maharjan",
    eyebrow: "404",
    heading: "Diese Seite gibt es nicht.",
    copy: "Die gesuchte Seite wurde verschoben oder existiert nicht.",
    backHome: "← Zurück zur Startseite",
  },
};

export default de;
