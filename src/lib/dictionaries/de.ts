import type { Dictionary } from "./types";
import { PROJECT_TAGS } from "../caseStudies/tags";

const de: Dictionary = {
  meta: {
    title: "Alexsha Maharjan · Portfolio",
    description:
      "Ich gestalte digitale Erlebnisse und Markenidentitäten mit eigenem Charakter. Portfolio von Alexsha Maharjan, einer multidisziplinären Designerin in Lübeck, Deutschland.",
  },
  nav: {
    portfolio: "Portfolio",
    playground: "Archiv",
    projects: "Projekte",
    about: "Über mich",
    contact: "Kontakt",
    menu: "Menü",
    close: "Schließen",
    modeSwitchLabel: "Ansichtsmodus",
    switchToPlayground: "Zum Archiv wechseln",
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
    eyebrow: "Multidisziplinäre Designerin · Lübeck, Deutschland",
    headlineLines: ["Hallo, ich bin", "Alexsha Maharjan"],
    intro:
      "Ich gestalte digitale Erlebnisse und Markenidentitäten mit eigenem Charakter und behalte dabei immer die Menschen im Blick, für die sie gedacht sind.",
    tags: "UI/UX · Branding · Visual Design",
  },
  process: {
    scrollCue: "Scrollen zum Entdecken ↓",
    question: "Wie bringe ich ein Projekt zum Leben?",
    srSummary:
      "Mein Prozess in fünf Schritten: verstehen, was ich wissen muss, bevor ich beginne, definieren, was es sich wirklich zu lösen lohnt, Möglichkeiten durch Skizzen und Wireframes erkunden, gestalten, wie es aussehen und sich anfühlen soll, und verfeinern durch Tests und Iteration.",
    branches: [
      {
        number: "01",
        title: "Verstehen",
        question: "Was muss ich wissen, bevor ich beginne?",
        ariaLabel:
          "Schritt 1: Verstehen. Was muss ich wissen, bevor ich beginne? Interviews, SWOT-Marktanalyse und Frustrationswerte.",
      },
      {
        number: "02",
        title: "Definieren",
        question: "Was lohnt es sich wirklich zu lösen?",
        ariaLabel:
          "Schritt 2: Definieren. Was lohnt es sich wirklich zu lösen? Wirkung und Aufwand, Chancen-Statement, Erfolgskriterien.",
      },
      {
        number: "03",
        title: "Erkunden",
        question: "Wie kann ich Möglichkeiten sichtbar machen?",
        ariaLabel:
          "Schritt 3: Erkunden. Wie kann ich Möglichkeiten sichtbar machen? Sitemaps, Skizzen und Konzeptrichtungen.",
      },
      {
        number: "04",
        title: "Gestalten",
        question: "Wie soll es aussehen und sich anfühlen?",
        ariaLabel:
          "Schritt 4: Gestalten. Wie soll es aussehen und sich anfühlen? Typografie, Farbe, Komponenten und Markenanwendungen.",
      },
      {
        number: "05",
        title: "Verfeinern",
        question: "Woran erkenne ich, dass es funktioniert?",
        ariaLabel:
          "Schritt 5: Verfeinern. Woran erkenne ich, dass es funktioniert? Vorher-Nachher, Usability-Tests, Validierung und Iteration.",
      },
    ],
  },
  selectedWork: {
    eyebrow: "Ausgewählte Projekte",
    heading: "Unterschiedliche Projekte, unterschiedliche Perspektiven",
    copy: "Meine Arbeit bewegt sich zwischen UI/UX, Branding, Visual Design und Experimenten. Jedes Projekt bringt eine andere Herausforderung mit sich und gibt mir die Möglichkeit, eine andere Seite von Design zu erkunden.",
  },
  projects: [
    {
      slug: "afono",
      name: "AFONO",
      headline: "Nepalesische Identität in zeitgenössische Streetwear übersetzen.",
      description: "Eine fiktive Streetwear-Marke, von Grund auf entwickelt: von Markenidentität und Bekleidungsgrafiken bis zur Website und zum digitalen Einkaufserlebnis.",
      tags: [...PROJECT_TAGS.afono],
      role: "Brand, Graphic & UI/UX Designerin",
      year: "2026",
      image: "/images/hero-afono.webp",
      imageAlt: "Der Name AFONO neben Shop- und Landingpage in Browserfenstern",
      imageAspect: "1920/1080",
      accent: "#0A0A0A",
    },
    {
      slug: "surugami",
      name: "Surugami",
      headline: "Eine visuelle Identität rund um Origami entwickeln.",
      description: "Eine von Origami inspirierte Marke, umgesetzt durch Illustration, Print- und Webdesign.",
      tags: [...PROJECT_TAGS.surugami],
      role: "Concept, Graphic & Web Designerin",
      year: "",
      image: "/images/hero-surugami.webp",
      imageAlt: "Der Name Surugami neben der Website auf mehreren Bildschirmen",
      imageAspect: "1920/1080",
      accent: "#D0254D",
    },
    {
      slug: "wikimind",
      name: "WikiMind",
      headline: "KI-Services klar, nützlich und zugänglich gestalten.",
      description: "Eine Markenidentität und ein Website-Konzept für ein KI-Unternehmen mit Workshops, Chatbots und Softwarelösungen.",
      tags: [...PROJECT_TAGS.wikimind],
      role: "Brand & UI/UX Designerin",
      year: "2026",
      image: "/images/hero-wikimind.webp",
      imageAlt: "Der Name WikiMind neben der Startseite auf einem Laptop",
      imageAspect: "1920/1080",
      accent: "#1D28A8",
    },
    {
      slug: "sync-fm",
      name: "Sync FM",
      headline: "Personalisierung in den kontinuierlichen Fluss des Radios bringen.",
      description: "Ein interaktives KI-Radio-Konzept, das das kontinuierliche Erlebnis des klassischen Radios mit ausgewählten Steuerungen personalisierter Streaming-Dienste verbindet.",
      tags: [...PROJECT_TAGS["sync-fm"]],
      role: "Interaction & UI Designerin",
      year: "",
      image: "/images/hero-sync-fm.webp",
      imageAlt: "Der Name Sync FM neben einem Fächer der App-Screens",
      imageAspect: "1920/1080",
      accent: "#5B377C",
    },
    {
      slug: "barrier-free-kitchen",
      name: "Barrierefreie Küche",
      headline: "Eine Küche durch Reichweite, Sehen und Berührung gestalten.",
      description: "Ein inklusives Küchenkonzept, entwickelt rund um die Bedürfnisse von Menschen im Rollstuhl und Personen mit Sehbeeinträchtigungen.",
      tags: [...PROJECT_TAGS["barrier-free-kitchen"]],
      role: "Prototyping & 3D Design",
      year: "",
      image: "/images/hero-barrier-free-kitchen.webp",
      imageAlt: "Der Name Barrierefreie Küche neben drei 3D-Renderings der Küche im Gebrauch",
      imageAspect: "1920/1080",
      accent: "#1C5B4A",
    },
    {
      slug: "qis-portal",
      name: "QIS Portal Redesign",
      headline: "Ein fragmentiertes Hochschulportal rund um die Aufgaben der Studierenden neu gestalten.",
      description: "Ein forschungsbasiertes Redesign eines Studierendenportals mit Fokus auf Informationsarchitektur, Navigation und klarere Aufgabenabläufe.",
      tags: [...PROJECT_TAGS["qis-portal"]],
      role: "UX/UI Designerin & Researcherin",
      year: "2024",
      image: "/images/hero-qis-portal.webp",
      imageAlt: "Der Name QIS Portal neben dem neu gestalteten Portal in Browserfenstern",
      imageAspect: "1920/1080",
      accent: "#A80D26",
    },
  ],
  resume: {
    metaTitle: "Lebenslauf · Alexsha Maharjan",
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
        name: "Wikimind: Corporate Design & Website für ein KI-Unternehmen",
        period: "2025",
        place: "Semesterprojekt, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Visuelles Erscheinungsbild, UI-Design und Website-Konzept, inklusive Maskottchen für die Bildsprache",
          "Informationsarchitektur, Wireframing und High-Fidelity-Prototyping in Figma",
        ],
      },
      {
        name: "Surugami: Brand Identity, Print & Webdesign",
        period: "2025",
        place: "Semesterprojekt, Technische Hochschule Lübeck, Lübeck",
        bullets: [
          "Logo, Typografie und Farbwelt; druckfähige Layouts für Flyer, Poster und Banner (CMYK, Reinzeichnung)",
          "Interaktiver Figma-Prototyp der Markenwebsite",
        ],
      },
      {
        name: "Hibi: Produktivitäts-Web-App, Design & Entwicklung",
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
      "Ich bin in Nepal aufgewachsen, umgeben von Kreativität. Ich habe ständig etwas gestaltet, mit Handarbeit experimentiert und persönliche Geschenke für Menschen in meinem Umfeld gemacht. Am meisten mochte ich es, darüber nachzudenken, für wen etwas gedacht war, was der Person gefallen könnte und was es besonders machen würde.",
    copyDim:
      "Diese Art zu denken führte mich schließlich zum Design. Menschen zu verstehen und Ideen visuell zu gestalten wurde dabei zu einem Teil meiner Arbeitsweise.",
    linkAbout: "Die ganze Geschichte lesen →",
    playgroundHeading: "Das Archiv",
    playgroundCopy: "Eine Sammlung persönlicher Projekte, Handarbeiten und Experimente, in denen ich Ideen erkunde, lerne und Neues ausprobiere.",
    linkPlayground: "Archiv öffnen",
    portraitAlt: "Porträt von Alexsha Maharjan.",
  },
  contact: {
    eyebrow: "Kontakt",
    heading: "Offen für neue Möglichkeiten im Design.",
    copy: "Wenn meine Arbeit zu Ihnen passt, werfen Sie einen Blick auf meinen Lebenslauf oder schreiben Sie mir wegen einer Stelle, eines Projekts oder einer Zusammenarbeit.",
    resumeCta: "Lebenslauf ansehen",
    contactCta: "Kontakt",
  },
  footer: {
    tagline: "UI/UX · Branding · Visual Design",
    email: "alexsha.maharjan1@gmail.com",
    linkedin: "linkedin.com/in/alexsham",
    linkedinHref: "https://www.linkedin.com/in/alexsham",
    resume: "Lebenslauf",
    availability: "Offen für neue Möglichkeiten im Design",
    backToTop: "Nach oben ↑",
    copyright: "© 2026 Alexsha Maharjan",
  },
  playgroundOutro: {
    eyebrow: "Ende des Archivs",
    heading: "Mehr professionelle Arbeiten, hier entlang.",
    copy: "Zurück zum Portfolio für meine Fallstudien, meinen Designprozess und ausgewählte Projektarbeiten.",
    cta: "Zurück zum Portfolio →",
  },
  playgroundViewer: {
    made: "Entstanden",
    tools: "Werkzeuge",
    type: "Art",
    close: "Schließen",
    previous: "Vorheriges Stück",
    next: "Nächstes Stück",
    position: "{n} von {total}",
    collections: "Sammlungen",
    soundOn: "Ton an",
    soundOff: "Ton aus",
    prototypeLink: "Figma-Prototyp",
  },
  playgroundPeek: {
    openLabel: "Archiv öffnen",
    cta: "Archiv öffnen",
    note: "schau mal rein",
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
            "Diese Website ist ein persönliches Portfolio. Sie setzt keine eigenen Cookies, bindet keine Analyse- oder Trackingdienste ein und hat weder Nutzerkonten noch ein Kontaktformular. Die Schriftarten werden von dieser Website selbst ausgeliefert. Ein Inhalt wird von außerhalb geladen: Fünf der Fallstudien enden in einem interaktiven Prototyp, der bei Figma liegt und geladen wird, sobald Sie ihn erreichen. Alle übrigen Daten, die beim Besuch anfallen, sind die technischen Zugriffsdaten, die der Hoster protokolliert.",
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
          heading: "Kontaktaufnahme per E-Mail",
          body: [
            "Wenn Sie mir schreiben, verarbeite ich Ihre Absenderadresse und den Inhalt Ihrer Nachricht, um die Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag gerichtet ist, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Ich lösche diese Daten, sobald sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
          ],
        },
        {
          heading: "Figma-Prototypen",
          body: [
            "Fünf der Fallstudien enthalten in einem Abschnitt \u201eSelbst ausprobieren\u201c einen interaktiven Prototyp, der von der Figma, Inc., 760 Market St, San Francisco, CA 94102, USA, gehostet wird. Er ist in die Seite eingebettet und wird geladen, sobald Sie zu ihm scrollen; auf Seiten ohne einen solchen Abschnitt wird nichts geladen, und auch nicht, bevor Sie ihn erreichen.",
            "Beim Laden verbindet sich Ihr Browser mit figma.com und überträgt dabei die für eine Verbindung erforderlichen Daten, darunter Ihre IP-Adresse; Figma kann außerdem eigene Cookies setzen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse daran, die Arbeit selbst zu zeigen und nicht nur Screenshots davon. Ich habe keinen Zugriff auf diese Daten und erhalte von Figma nichts zurück. Figma verarbeitet sie auch in den USA. Wenn Sie das nicht möchten, lassen sich Frames und Inhalte von Dritten in den meisten Browsern blockieren; die Fallstudien sind auch ohne den Prototyp vollständig.",
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
    handNoteTools: "und es werden immer mehr",
    biographyHeading: "Biografie",
    biography: [
      "Ich bin in Nepal aufgewachsen, umgeben von Kreativität. Ich habe ständig etwas gestaltet, mit Handarbeit experimentiert und persönliche Geschenke für Menschen in meinem Umfeld gemacht. Dabei ging es mir nicht nur darum, etwas Schönes zu gestalten, sondern auch darum, für wen es gedacht war, was der Person gefallen könnte und was es besonders machen würde.",
      "Diese Art zu denken führte mich schließlich zum Design. Mir wurde klar, dass Menschen zu verstehen, bewusste Entscheidungen zu treffen und Ideen visuell zu gestalten schon immer Teil meiner Herangehensweise waren.",
      "Dieser Weg führte mich von Nepal nach Deutschland, wo ich Information Technology and Design im Bachelor studiere. Dabei habe ich mich zu einer multidisziplinären Designerin entwickelt und arbeite heute in den Bereichen UI/UX, Branding, Visual Design und Webdesign.",
      "Gutes Design ist für mich nicht nur eine Frage des Aussehens. Es bedeutet zu verstehen, für wen etwas gestaltet wird, und etwas zu schaffen, das nützlich, klar und bedeutungsvoll ist.",
    ],
    focusHeading: "Schwerpunkte",
    focusItems: ["UI/UX Design", "Brand Identity", "Visual Design", "Webdesign", "Interaction Design"],
    toolsHeading: "Tools, die ich nutze",
    tools: [
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Adobe Photoshop" },
      { name: "Blender" },
      { name: "After Effects" },
      { name: "KI-Tools", accent: true },
    ],
    aiBody:
      "Ich nutze KI, wenn sie mir hilft, Ideen zu erkunden, Informationen zu strukturieren oder Richtungen schneller zu testen. Die finalen Designentscheidungen treffe ich selbst. KI ist für mich ein Werkzeug im Prozess und kein Ersatz dafür.",
    aiTags: ["Recherche", "Ideenfindung", "Inhalte", "Prototyping"],
    playgroundHeading: "Das Archiv",
    playgroundCopy: "Eine Sammlung persönlicher Projekte, Handarbeiten und Experimente, in denen ich Ideen erkunde, lerne und Neues ausprobiere.",
    linkPlayground: "Archiv öffnen",
    loveIntro: "Ich liebe",
    loveWords: ["Gestalten", "Erschaffen", "Malen", "Neues lernen", "Basteln"],
    resumeHeading: "Lebenslauf & Kontakt",
    resumeCopy: "Interesse an einer Zusammenarbeit? Werfen Sie einen Blick auf meinen Lebenslauf oder schreiben Sie mir.",
    resumeCta: "Lebenslauf ansehen",
    contactCta: "Kontakt",
  },
  routeLoading: "Seite wird geladen…",
  caseStudy: {
    viewCaseStudy: "Fallstudie ansehen",
    backToProjects: "← Zurück zu den Projekten",
    onThisPage: "Auf dieser Seite",
    designQuestion: "Designfrage",
    moreProjects: "Weitere Projekte",
    viewAllWork: "Alle Projekte ansehen",
    previousProject: "Zurück",
    nextProject: "Weiter",
    context: "Kontext",
    role: "Rolle",
    team: "Team",
    contribution: "Beitrag",
    tools: "Tools",
    needs: "Bedürfnisse",
    prototypeLive: "Live-Prototyp",
    prototypeHint: "Klicken, scrollen und die wichtigsten Abläufe erkunden.",
    prototypeNote: "Klicken und den Prototyp erkunden",
  },
  notFound: {
    metaTitle: "Seite nicht gefunden · Alexsha Maharjan",
    eyebrow: "404",
    heading: "Diese Seite gibt es nicht.",
    copy: "Die gesuchte Seite wurde verschoben oder existiert nicht.",
    backHome: "← Zurück zur Startseite",
  },
};

export default de;
