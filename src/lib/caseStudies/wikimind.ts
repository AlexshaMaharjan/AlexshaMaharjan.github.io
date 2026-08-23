import type { CaseStudyLocaleContent } from "./types";

const wikimind: CaseStudyLocaleContent = {
  en: {
    slug: "wikimind",
    name: "WikiMind",
    projectTag: "WikiMind · 2026",
    headline: "Making artificial intelligence feel clear, useful and approachable.",
    summary:
      "WikiMind is a brand identity and website concept for an AI company offering workshops, chatbots and software solutions. The project translates complex services into a friendly and structured experience for people with limited technical knowledge.",
    tags: ["Brand Strategy", "Visual Identity", "UI/UX Design", "Web Design", "Prototyping"],
    role: "Brand & UI/UX Designer",
    contribution: "Entire project completed independently.",
    type: "Independent project",
    year: "2026",
    tools: "Figma · Adobe Illustrator",
    deliverables: "Brand identity · Logo system · Mascot · Website design · UI kit · Interactive prototype",
    heroImage: {
      src: "/images/wikimind-mrx9dhfo-12ys.png",
      alt: "Placeholder: WikiMind final homepage hero visual",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "WikiMind wanted to communicate artificial intelligence to people who were interested in using it but did not necessarily understand the underlying technology. The challenge was not the range of services itself. It was how those services were presented.",
          "Many AI websites rely on technical terminology, abstract visualisations and dark interfaces. While this can signal technological capability, it may also make the subject feel distant, complicated or inaccessible. The goal was therefore to create an identity and digital experience that maintained professional credibility while making AI easier to understand.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Context & challenge",
        number: "02",
        heading: "AI was available, but it did not always feel accessible.",
        body: [
          "Artificial intelligence is becoming part of everyday products and professional workflows. Yet many potential users still experience it as abstract, intimidating or difficult to apply. This creates a communication problem for companies such as WikiMind.",
          "The website needed to explain different services without assuming technical knowledge. At the same time, the brand could not become childish, overly playful or less credible.",
        ],
        designQuestion:
          "How might WikiMind make complex AI services understandable and approachable without losing professional trust?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Understanding how AI companies communicate",
        body: [
          "I conducted a qualitative visual and structural analysis of existing AI and technology websites. The comparison focused on visual tone, information hierarchy, content structure, language, navigation, animation and methods of establishing trust.",
          "The analysis revealed a common tension. Dark and highly technical interfaces often appeared modern, but they could also feel cold or exclusive. Clearer layouts and restrained animation made information easier to follow and helped services feel more understandable.",
          { kind: "h3", text: "Translating the audience into design needs" },
          "Three working personas represented different professional contexts: a business decision-maker looking for practical automation, an academic leader seeking understandable AI education and a customer-service manager needing reliable operational support.",
          "Although their responsibilities differed, their needs shared a consistent pattern. They required clear explanations, visible credibility and practical value before they could trust an AI provider.",
        ],
        images: [
          { aspect: "16/8", caption: "[ competitor analysis ]" },
          { aspect: "3/4", caption: "[ persona 01 ]" },
          { aspect: "3/4", caption: "[ persona 02 ]" },
          { aspect: "3/4", caption: "[ persona 03 ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Key insights",
        insights: [
          {
            heading: "Clarity matters more than technical detail.",
            body: "Users first need to understand what a service does for them. Technical explanations should support this understanding, not lead the communication.",
          },
          {
            heading: "A human element can reduce distance.",
            body: "A recognisable character can make AI feel less abstract, provided it is used carefully and does not undermine professional credibility.",
          },
          {
            heading: "Trust must be designed into the structure.",
            body: "Predictable navigation, understandable service descriptions and visible calls to action create more confidence than decorative technological imagery.",
          },
          {
            heading: "Motion should guide, not distract.",
            body: "Animation should support orientation, explain relationships or draw attention to important actions. It should not compete with the content.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Strategy & identity",
        number: "05",
        heading: "Positioning AI as a capable assistant",
        body: [
          "The central strategic decision was to present AI not as an abstract technical system, but as a supportive tool that helps people learn, automate work and solve practical problems.",
          {
            kind: "list",
            items: [
              "Trust through transparent communication",
              "Accessibility through friendly visuals and plain language",
              "Clarity through structured information",
              "Innovation through modern but controlled digital details",
              "Competence through a consistent and professional system",
            ],
          },
          "The verbal tone avoids unnecessary terminology and prioritises user benefits over technical specifications.",
          { kind: "h3", text: "A light and structured visual language" },
          "The visual direction combines a white and neutral background with several blue tones and restrained gradients. Blue supports associations with trust, intelligence and technology, while the lighter environment prevents the brand from feeling heavy or intimidating. Inter was selected for its screen readability and neutral character.",
          { kind: "h3", text: "A symbol for connected knowledge" },
          "The WikiMind symbol combines the initials W and M with the continuous form of an infinity sign. The mark represents connected knowledge, continuous learning and the open-ended potential of artificial intelligence. Rounded forms make the identity more approachable, while sharper details prevent the wordmark from appearing overly playful.",
          { kind: "h3", text: "A controlled human element" },
          "A dolphin was introduced as a controlled brand character. Dolphins are commonly associated with intelligence, curiosity and social behaviour, which supported the desired perception of WikiMind. The mascot is used selectively in the hero, educational explanations and transitional moments rather than across every section of the website.",
        ],
        images: [
          { aspect: "4/3", caption: "[ moodboard ]" },
          { aspect: "4/3", caption: "[ colour + type system ]" },
          { aspect: "4/3", caption: "[ logo sketches ]" },
          { aspect: "4/3", caption: "[ logo variants ]" },
          { aspect: "16/8", caption: "[ mascot development ]" },
        ],
      },
      {
        id: "development",
        navLabel: "Structure & system",
        number: "06",
        heading: "Turning multiple services into a guided journey",
        body: [
          "After establishing the brand direction, the website content was organised into a sitemap and reusable page system. The structure was designed to help visitors understand what WikiMind offers, identify the service relevant to them and move towards a clear next action.",
          { kind: "h3", text: "Building consistency through reusable components" },
          "The interface system uses rounded containers, generous spacing and a limited visual hierarchy to soften the technical subject. Reusable components were created for navigation, buttons, content cards, input fields, service sections, icons, footer, hover states and feedback animations. The component approach keeps the website visually consistent while supporting future expansion.",
        ],
        images: [
          { aspect: "16/8", caption: "[ sitemap ]" },
          { aspect: "4/3", caption: "[ wireframes ]" },
          { aspect: "4/3", caption: "[ ui kit ]" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "07",
        heading: "A calmer entry point into artificial intelligence",
        body: [
          "The final concept brings the brand identity, service communication and interface system together in a light and structured website. Large headings establish a clear hierarchy. Service cards divide complex topics into understandable entry points. The mascot introduces a human and recognisable element.",
          "The result is an interactive Figma prototype that demonstrates the main page system, navigation behaviour and visual language of WikiMind.",
        ],
        images: [
          { aspect: "16/9", caption: "[ final screens — large showcase ]" },
          { aspect: "16/10", caption: "[ prototype video ]" },
          { aspect: "16/10", caption: "[ interface detail ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "08",
        heading: "Evaluating the system against the original goals",
        body: [
          "The concept was refined through iterative comparison, self-evaluation and feedback loops. However, the project did not include a formal moderated usability study with representative users. The case study therefore does not claim a measured improvement in usability or conversion.",
          "A future validation phase should test: whether first-time visitors understand the services, whether the mascot strengthens or reduces credibility, whether users can locate a relevant service quickly, whether the language is understandable without AI knowledge, whether animation supports orientation, and whether contrast, keyboard navigation and screen-reader structure meet accessibility requirements.",
          { kind: "h3", text: "What I learned" },
          "WikiMind showed me that making technology approachable does not mean simplifying the visual identity until it becomes generic. The stronger solution came from balancing emotional warmth with professional structure.",
          "The mascot, colour system and rounded components created accessibility at the visual level. The content hierarchy, service organisation and reusable interface system created clarity at the functional level. The next iteration should focus less on adding new visual elements and more on validating comprehension, improving accessibility and refining the website through direct user observation.",
        ],
      },
    ],
  },
  de: {
    slug: "wikimind",
    name: "WikiMind",
    projectTag: "WikiMind · 2026",
    headline: "Künstliche Intelligenz klar, nützlich und zugänglich gestalten.",
    summary:
      "WikiMind ist ein Marken- und Website-Konzept für ein KI-Unternehmen, das Workshops, Chatbots und Softwarelösungen anbietet. Das Projekt übersetzt komplexe Leistungen in eine freundliche und klar strukturierte Erfahrung für Menschen mit wenig technischem Vorwissen.",
    tags: ["Brand Strategy", "Visual Identity", "UI/UX Design", "Web Design", "Prototyping"],
    role: "Brand & UI/UX Designerin",
    contribution: "Das gesamte Projekt wurde eigenständig umgesetzt.",
    type: "Eigenständiges Projekt",
    year: "2026",
    tools: "Figma · Adobe Illustrator",
    deliverables: "Markenidentität · Logosystem · Maskottchen · Website-Design · UI-Kit · Interaktiver Prototyp",
    heroImage: {
      src: "/images/wikimind-mrx9dhfo-12ys.png",
      alt: "Placeholder: WikiMind final homepage hero visual",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "WikiMind wollte künstliche Intelligenz Menschen vermitteln, die an ihrer Nutzung interessiert sind, die zugrunde liegende Technologie jedoch nicht unbedingt verstehen. Die Herausforderung lag nicht im Leistungsangebot selbst, sondern in seiner Darstellung.",
          "Viele KI-Websites arbeiten mit technischen Begriffen, abstrakten Visualisierungen und dunklen Oberflächen. Diese Gestaltung kann technologische Kompetenz vermitteln, das Thema jedoch zugleich distanziert, kompliziert oder schwer zugänglich erscheinen lassen. Ziel war deshalb eine Identität und digitale Erfahrung, die professionell wirkt und KI gleichzeitig leichter verständlich macht.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Kontext & Herausforderung",
        number: "02",
        heading: "KI war verfügbar, wirkte jedoch nicht immer zugänglich.",
        body: [
          "Künstliche Intelligenz wird zunehmend Teil alltäglicher Produkte und beruflicher Arbeitsprozesse. Trotzdem erleben viele potenzielle Nutzer das Thema weiterhin als abstrakt, einschüchternd oder schwer anwendbar. Für Unternehmen wie WikiMind entsteht dadurch vor allem ein Kommunikationsproblem.",
          "Die Website musste unterschiedliche Leistungen erklären, ohne technisches Vorwissen vorauszusetzen. Gleichzeitig durfte die Marke nicht kindlich, übermäßig verspielt oder weniger glaubwürdig wirken.",
        ],
        designQuestion:
          "Wie kann WikiMind komplexe KI-Leistungen verständlich und zugänglich vermitteln, ohne professionelles Vertrauen zu verlieren?",
      },
      {
        id: "research",
        navLabel: "Recherche",
        number: "03",
        heading: "Wie KI-Unternehmen kommunizieren",
        body: [
          "Ich führte eine qualitative visuelle und strukturelle Analyse bestehender KI- und Technologie-Websites durch. Untersucht wurden visuelle Tonalität, Informationshierarchie, Inhaltsstruktur, Sprache, Navigation, Animation und Methoden zum Aufbau von Vertrauen.",
          "Die Analyse zeigte ein wiederkehrendes Spannungsfeld. Dunkle und stark technische Oberflächen wirkten häufig modern, konnten jedoch gleichzeitig kühl oder exklusiv erscheinen. Klarere Layouts und zurückhaltende Animationen erleichterten die Orientierung und machten Leistungen verständlicher.",
          { kind: "h3", text: "Zielgruppen in konkrete Designanforderungen übersetzen" },
          "Drei Arbeits-Personas repräsentierten unterschiedliche berufliche Kontexte: eine Führungskraft auf der Suche nach praktischer Automatisierung, eine akademische Leitung mit Bedarf an verständlicher KI-Vermittlung und eine Kundenservice-Leitung mit Bedarf an verlässlicher operativer Unterstützung.",
          "Trotz unterschiedlicher Verantwortungsbereiche zeigten sich gemeinsame Bedürfnisse. Die Nutzer benötigten verständliche Erklärungen, sichtbare Glaubwürdigkeit und einen klaren praktischen Nutzen, bevor sie einem KI-Anbieter vertrauen konnten.",
        ],
        images: [
          { aspect: "16/8", caption: "[ competitor analysis ]" },
          { aspect: "3/4", caption: "[ persona 01 ]" },
          { aspect: "3/4", caption: "[ persona 02 ]" },
          { aspect: "3/4", caption: "[ persona 03 ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Zentrale Erkenntnisse",
        insights: [
          {
            heading: "Klarheit ist wichtiger als technische Detailtiefe.",
            body: "Nutzer müssen zuerst verstehen, welchen konkreten Nutzen eine Leistung für sie hat. Technische Erklärungen sollten dieses Verständnis unterstützen und nicht die Kommunikation dominieren.",
          },
          {
            heading: "Ein menschliches Element kann Distanz reduzieren.",
            body: "Eine wiedererkennbare Figur kann KI weniger abstrakt erscheinen lassen, sofern sie gezielt eingesetzt wird und die professionelle Glaubwürdigkeit nicht beeinträchtigt.",
          },
          {
            heading: "Vertrauen muss in die Struktur integriert werden.",
            body: "Vorhersehbare Navigation, verständliche Leistungsbeschreibungen und sichtbare Handlungsoptionen schaffen mehr Sicherheit als rein dekorative Technologie-Visualisierungen.",
          },
          {
            heading: "Animation sollte führen und nicht ablenken.",
            body: "Animation sollte Orientierung unterstützen, Zusammenhänge erklären oder Aufmerksamkeit auf wichtige Handlungen lenken. Sie sollte nicht mit dem Inhalt konkurrieren.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Strategie & Identität",
        number: "05",
        heading: "KI als kompetenten Assistenten positionieren",
        body: [
          "Die zentrale strategische Entscheidung bestand darin, KI nicht als abstraktes technisches System, sondern als unterstützendes Werkzeug zu vermitteln, das Menschen beim Lernen, Automatisieren und Lösen praktischer Probleme hilft.",
          {
            kind: "list",
            items: [
              "Vertrauen durch transparente Kommunikation",
              "Zugänglichkeit durch freundliche Visuals und einfache Sprache",
              "Klarheit durch strukturierte Informationen",
              "Innovation durch moderne, aber kontrollierte digitale Details",
              "Kompetenz durch ein konsistentes und professionelles System",
            ],
          },
          "Die sprachliche Tonalität vermeidet unnötige Fachbegriffe und stellt den Nutzen für die Anwender vor technische Spezifikationen.",
          { kind: "h3", text: "Eine helle und strukturierte visuelle Sprache" },
          "Die visuelle Richtung kombiniert einen weißen und neutralen Hintergrund mit mehreren Blautönen und zurückhaltenden Farbverläufen. Blau unterstützt Assoziationen mit Vertrauen, Intelligenz und Technologie. Die helle Umgebung verhindert gleichzeitig, dass die Marke schwer oder einschüchternd wirkt. Inter wurde aufgrund der guten Lesbarkeit am Bildschirm und des neutralen Charakters ausgewählt.",
          { kind: "h3", text: "Ein Symbol für vernetztes Wissen" },
          "Das WikiMind-Symbol verbindet die Initialen W und M mit der kontinuierlichen Form eines Unendlichkeitszeichens. Die Marke steht für vernetztes Wissen, fortlaufendes Lernen und das offene Potenzial künstlicher Intelligenz. Abgerundete Formen machen die Identität zugänglicher, präzisere Details verhindern, dass die Wortmarke zu verspielt wirkt.",
          { kind: "h3", text: "Ein gezielt eingesetztes menschliches Element" },
          "Ein Delfin wurde als gezielt eingesetzter Markencharakter entwickelt. Delfine werden häufig mit Intelligenz, Neugier und sozialem Verhalten verbunden und unterstützen damit die gewünschte Wahrnehmung von WikiMind. Das Maskottchen wird selektiv im Hero-Bereich, in erklärenden Inhalten und bei Übergängen eingesetzt, nicht auf jeder Website-Sektion.",
        ],
        images: [
          { aspect: "4/3", caption: "[ moodboard ]" },
          { aspect: "4/3", caption: "[ colour + type system ]" },
          { aspect: "4/3", caption: "[ logo sketches ]" },
          { aspect: "4/3", caption: "[ logo variants ]" },
          { aspect: "16/8", caption: "[ mascot development ]" },
        ],
      },
      {
        id: "development",
        navLabel: "Struktur & System",
        number: "06",
        heading: "Unterschiedliche Leistungen in eine geführte Nutzerreise übersetzen",
        body: [
          "Nach der Definition der Markenrichtung wurden die Inhalte der Website in einer Sitemap und einem wiederverwendbaren Seitensystem organisiert. Die Struktur hilft Besuchern dabei, das Angebot von WikiMind zu verstehen, eine relevante Leistung zu finden und zu einer klaren nächsten Handlung zu gelangen.",
          { kind: "h3", text: "Konsistenz durch wiederverwendbare Komponenten schaffen" },
          "Das Interface-System arbeitet mit abgerundeten Containern, großzügigen Abständen und einer reduzierten visuellen Hierarchie. Wiederverwendbare Komponenten wurden für Navigation, Buttons, Inhaltskarten, Eingabefelder, Leistungsbereiche, Icons, Footer, Hover-Zustände und Feedback-Animationen entwickelt. Der modulare Ansatz hält die Website visuell konsistent und ermöglicht spätere Erweiterungen.",
        ],
        images: [
          { aspect: "16/8", caption: "[ sitemap ]" },
          { aspect: "4/3", caption: "[ wireframes ]" },
          { aspect: "4/3", caption: "[ ui kit ]" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "07",
        heading: "Ein ruhigerer Einstieg in künstliche Intelligenz",
        body: [
          "Das finale Konzept verbindet Markenidentität, Leistungsbeschreibung und Interface-System in einer hellen und klar strukturierten Website. Große Überschriften schaffen eine deutliche Hierarchie. Leistungskarten teilen komplexe Themen in verständliche Einstiegspunkte. Das Maskottchen bringt ein menschliches und wiedererkennbares Element ein.",
          "Das Ergebnis ist ein interaktiver Figma-Prototyp, der das zentrale Seitensystem, das Navigationsverhalten und die visuelle Sprache von WikiMind demonstriert.",
        ],
        images: [
          { aspect: "16/9", caption: "[ final screens — large showcase ]" },
          { aspect: "16/10", caption: "[ prototype video ]" },
          { aspect: "16/10", caption: "[ interface detail ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "08",
        heading: "Das System anhand der ursprünglichen Ziele bewerten",
        body: [
          "Das Konzept wurde durch iterative Vergleiche, Selbstevaluation und Feedback-Schleifen weiterentwickelt. Das Projekt umfasste jedoch keine formale moderierte Usability-Studie mit repräsentativen Nutzern. Die Fallstudie behauptet deshalb keine gemessene Verbesserung der Benutzerfreundlichkeit oder Conversion.",
          "Eine zukünftige Validierungsphase sollte untersuchen: ob Erstbesucher die Leistungen verstehen, ob das Maskottchen die Glaubwürdigkeit stärkt oder reduziert, ob eine relevante Leistung schnell gefunden wird, ob die Sprache ohne KI-Vorwissen verständlich ist, ob Animation die Orientierung unterstützt und ob Kontraste, Tastaturbedienung und Screenreader-Struktur die Anforderungen an Barrierefreiheit erfüllen.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "WikiMind hat mir gezeigt, dass zugängliche Technologiegestaltung nicht bedeutet, eine visuelle Identität so stark zu vereinfachen, dass sie generisch wird. Die stärkere Lösung entstand durch das Gleichgewicht zwischen emotionaler Wärme und professioneller Struktur.",
          "Maskottchen, Farbsystem und abgerundete Komponenten erzeugten visuelle Zugänglichkeit. Inhaltshierarchie, Leistungsstruktur und das wiederverwendbare Interface-System schufen funktionale Klarheit. Die nächste Iteration sollte sich weniger auf zusätzliche visuelle Elemente konzentrieren und stärker auf Verständlichkeit, Barrierefreiheit und direkte Nutzerbeobachtung.",
        ],
      },
    ],
  },
};

export default wikimind;
