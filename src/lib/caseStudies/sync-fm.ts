import type { CaseStudyLocaleContent } from "./types";

const syncFm: CaseStudyLocaleContent = {
  en: {
    slug: "sync-fm",
    name: "Sync FM",
    headline: "Giving listeners control without turning radio into another dashboard.",
    summary:
      "Sync FM is an interactive AI-radio concept that combines the continuous experience of traditional radio with selected controls from personalised streaming. Listeners can adjust information depth, presenter tone and journalistic interpretation without having to assemble every programme manually.",
    tags: ["Interaction Design", "AI Concept", "Mobile UI", "Audio Experience", "Prototyping"],
    role: "Interaction & UI Designer",
    contribution: "Co-developed the concept and interface with one teammate.",
    type: "Semester project · team",
    tools: "",
    deliverables: "",
    heroImage: {
      src: "/images/hero-sync-fm.webp",
      alt: "Five Sync FM screens beside the case-study title",
      aspect: "1578/1088",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "The project investigates the space between passive radio consumption and active streaming. Traditional radio provides continuity, moderation and companionship, but can become repetitive and superficial. Streaming platforms provide control, but require frequent decisions and often lack editorial context.",
          "Sync FM introduces an AI journalist that creates a continuous news flow while allowing the listener to influence how the information is prepared. The prototype focuses on news because it exposes questions of depth, tone, interpretation and algorithmic influence more clearly than music alone.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Challenge",
        number: "02",
        heading: "Radio is effortless, but rarely personal.",
        body: [
          "Traditional radio allows people to listen without planning every next step. This creates a sense of flow and companionship. However, standard programming is often designed around short listening periods, creating repetition during longer sessions.",
          "Streaming solves the repetition problem through personal control. It also transfers responsibility to the listener, who must choose content, playlists, programmes and transitions. The design challenge was to introduce meaningful control without destroying the effortless character that makes radio attractive.",
        ],
        designQuestion:
          "How might an auditory interface give listeners agency without overwhelming them with continuous decisions?",
      },
      {
        id: "research",
        navLabel: "Analysis & personas",
        number: "03",
        heading: "Existing AI-radio systems automate content, but provide little transparency.",
        body: [
          "The project compared regional and international examples, including AI-generated weather and traffic segments, AI-hosted web radio and AI-supported music recommendations. Existing systems generally use AI to automate presentation or generate content. Their internal selection logic remains largely invisible to listeners.",
          "Sync FM takes a different position. Instead of only automating the host, it exposes selected editorial controls to the user. The listener becomes a form of personal editor who can influence depth, tone and interpretation.",
          { kind: "h3", text: "Exploring different relationships with information" },
          "Three personas were used to consider different age groups, listening contexts and attitudes towards information. They represented needs such as efficient access to facts, calm background listening, more energetic presentation, greater contextual depth and protection from information overload.",
          "These personas were generated with Gemini and then used as concept-development tools. They are therefore labelled as hypothesis personas, not as direct evidence from primary user research.",
          {
            kind: "note",
            text: "Label: AI-assisted hypothesis persona",
          },
          {
            kind: "figures",
            items: [
              { aspect: "1600/738", caption: "[ personas ]", src: "/images/sync-fm-personas.webp", alt: "The three hypothesis personas: Leo, 19, the explorer; Sarah, 42, the fact-seeker; and Walter, 73, the traditional listener" },
            ],
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Interaction strategy",
        number: "04",
        heading: "Control through a few expressive decisions",
        body: [
          "Rather than providing dozens of settings, the interface concentrates control into three high-level dimensions. These controls affect the ongoing audio flow rather than forcing listeners to select every individual item.",
          {
            kind: "list",
            items: [
              "How much information should be presented?",
              "How should the presenter sound?",
              "How much interpretation should be included?",
            ],
          },
          "The radio metaphor provides a familiar mental model. The system behaves like a continuous station, while the controls allow its character to be adjusted.",
        ],
      },
      {
        id: "development",
        navLabel: "The three controls",
        number: "05",
        heading: "The three controls",
        body: [
          "Sync Dial — The central dial adjusts the depth of information. Turning it towards the lower end reduces stories to brief headlines. Turning it towards the higher end introduces longer explanations, context and analysis. A responsive waveform provides visual feedback.",
          "Mood Bar — The Mood Bar adjusts the personality and rhythm of the AI presenter. A calm setting uses slower pacing, neutral language and longer pauses. A more energetic setting increases pace. This changes presentation, not the factual content itself.",
          "Opinion Filter — The Opinion Filter controls the amount of journalistic interpretation. The control is intended to make framing visible. It also introduces an important ethical risk: users may remove uncomfortable perspectives and reinforce an existing worldview.",
          { kind: "h3", text: "Combining the familiarity of radio with a digital AI system" },
          "The visual language uses circular forms, rounded containers and wave-based feedback to connect the interface to audio and radio. Purple creates a distinctive technological identity while remaining less clinical than the blue systems frequently used by technology products. Futura is used for prominent headings, while Segoe UI supports longer interface and news text.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1014", caption: "[ colour palette ]", src: "/images/sync-fm-colour.webp", alt: "The five-step purple palette with its hex values, from near-black to off-white" },
              { aspect: "1600/586", caption: "[ typography ]", src: "/images/sync-fm-typography.webp", alt: "Futura TP for headings, Segoe UI for body text" },
            ],
          },
          "The logo transforms a traditional radio into a simple character-like form. Initial concepts were generated with Gemini and then adjusted and refined by the team into a flat vector system. This AI-assisted stage is disclosed within the process.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/557", caption: "[ logo iterations ]", src: "/images/sync-fm-logo-system.webp", alt: "Four logo iterations, from a teal robot to an outlined radio, beside the final purple mark" },
              { aspect: "820/598", caption: "[ wireframes ]", src: "/images/sync-fm-wireframes.webp", alt: "Low-fidelity wireframes for the home, expanded home and preferences screens" },
              { aspect: "1600/1664", caption: "[ components ]", src: "/images/sync-fm-components.webp", alt: "The component library: voice pickers, model list, menu bar, dial states light and dark, sliders and speed controls" },
            ],
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Final experience",
        number: "06",
        heading: "A continuous information flow shaped in real time",
        body: [
          "The final prototype presents a mobile radio experience centred on the current audio stream. The Sync Dial remains visually dominant because it controls the broadest change. Secondary controls adjust presenter tone and interpretation without interrupting listening.",
          "The result is not a complete functioning AI-radio service. It is an interaction prototype demonstrating how editorial control could be introduced without requiring a complex settings dashboard.",
        ],
        images: [{ aspect: "1600/2548", caption: "[ final mobile screens — large showcase ]", src: "/images/sync-fm-final-screens.webp", alt: "Every screen of the Figma prototype: home and expanded home in light and dark, registration, the preference flow, and the profile and settings screens" }],
      },
      {
        id: "testing",
        navLabel: "Evaluation & ethics",
        number: "07",
        heading: "Control is not automatically neutral.",
        body: [
          "The interface should be evaluated against three questions: can users understand the effect of each control before activating it, can they adjust the system without interrupting listening, and do they understand when content represents fact, analysis or interpretation?",
          "The opinion control creates the most important unresolved risk. Giving users control over journalistic framing may increase transparency, but it may also create filter bubbles and remove necessary opposing perspectives.",
          {
            kind: "list",
            items: [
              "Visible source information",
              "Clear labels for fact, context and interpretation",
              "Limits preventing complete removal of alternative perspectives",
              "Explanations of why certain stories appear",
              "A reset to a balanced editorial mode",
            ],
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "08",
        heading: "Separating concept, prototype and future behaviour",
        body: [
          "The personas were AI-assisted hypotheses rather than findings from interviews. The project documentation does not provide enough evidence for strong claims about long-term usability, trust or listening behaviour. The concept also depends on technology that was not implemented within the prototype, including real-time audio generation, source verification and content moderation.",
          "The case study therefore distinguishes clearly between interaction concept, visual prototype, tested interface elements and future technical behaviour.",
          { kind: "h3", text: "What I learned" },
          "Sync FM showed me that personalisation becomes more valuable when it is expressed through a small number of understandable controls. Adding every possible setting would have recreated the complexity the concept was intended to remove.",
          "The project also revealed that control is not automatically neutral. Allowing users to shape journalistic framing creates ethical consequences that need to be designed as carefully as the interface itself. A future version should combine interaction testing with research on trust, media literacy and algorithmic transparency.",
        ],
      },
    ],
  },
  de: {
    slug: "sync-fm",
    name: "Sync FM",
    headline: "Hörerinnen und Hörern Kontrolle geben, ohne Radio in ein weiteres Dashboard zu verwandeln.",
    summary:
      "Sync FM ist ein interaktives KI-Radio, das das kontinuierliche Erlebnis des klassischen Radios mit ausgewählten Steuerungsmöglichkeiten personalisierter Streaming-Dienste verbindet. Nutzer können Informationstiefe, Moderationston und journalistische Einordnung anpassen, ohne jedes Programm manuell zusammenstellen zu müssen.",
    tags: ["Interaction Design", "AI Concept", "Mobile UI", "Audio Experience", "Prototyping"],
    role: "Interaction & UI Designerin",
    contribution: "Konzept und Interface gemeinsam mit einem Teammitglied entwickelt.",
    type: "Semesterprojekt · Team",
    tools: "",
    deliverables: "",
    heroImage: {
      src: "/images/hero-sync-fm.webp",
      alt: "Fünf Sync-FM-Screens neben dem Titel der Fallstudie",
      aspect: "1578/1088",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "Das Projekt untersucht den Raum zwischen passivem Radiokonsum und aktivem Streaming. Klassisches Radio bietet Kontinuität, Moderation und Begleitung, kann jedoch repetitiv und oberflächlich werden. Streaming-Plattformen bieten Kontrolle, verlangen jedoch häufige Entscheidungen und verfügen oft über wenig redaktionellen Kontext.",
          "Sync FM führt einen KI-Journalisten ein, der einen kontinuierlichen Nachrichtenfluss erstellt. Gleichzeitig können Hörer beeinflussen, wie die Informationen aufbereitet werden. Der Prototyp konzentriert sich auf Nachrichten, da sich daran Fragen zu Tiefe, Tonalität, Interpretation und algorithmischem Einfluss deutlicher untersuchen lassen als an Musik allein.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Herausforderung",
        number: "02",
        heading: "Radio ist mühelos, aber selten persönlich.",
        body: [
          "Klassisches Radio ermöglicht Zuhören, ohne jeden nächsten Schritt planen zu müssen. Dadurch entstehen ein kontinuierlicher Ablauf und ein Gefühl von Begleitung. Standardprogramme sind jedoch häufig auf kurze Hörzeiten ausgelegt und wiederholen sich bei längerer Nutzung.",
          "Streaming löst das Problem der Wiederholung durch persönliche Kontrolle. Gleichzeitig überträgt es die Verantwortung auf die Hörer, die Inhalte, Playlists, Programme und Übergänge selbst auswählen müssen. Die gestalterische Herausforderung bestand darin, sinnvolle Kontrolle einzuführen, ohne den mühelosen Charakter zu zerstören, der Radio attraktiv macht.",
        ],
        designQuestion:
          "Wie kann ein auditives Interface Handlungsspielraum bieten, ohne Hörer mit ständigen Entscheidungen zu überfordern?",
      },
      {
        id: "research",
        navLabel: "Analyse & Personas",
        number: "03",
        heading: "Bestehende KI-Radios automatisieren Inhalte, bieten jedoch wenig Transparenz.",
        body: [
          "Das Projekt verglich regionale und internationale Beispiele, darunter KI-generierte Wetter- und Verkehrsmeldungen, KI-moderierte Webradios und KI-gestützte Musikempfehlungen. Bestehende Systeme nutzen KI hauptsächlich zur Automatisierung von Moderation oder Inhaltserstellung. Die interne Auswahl- und Aufbereitungslogik bleibt für Hörer weitgehend unsichtbar.",
          "Sync FM nimmt eine andere Position ein. Anstatt ausschließlich die Moderation zu automatisieren, stellt das System ausgewählte redaktionelle Steuerungsmöglichkeiten bereit. Die Hörer werden zu persönlichen Redakteuren und können Tiefe, Tonalität und Interpretation beeinflussen.",
          { kind: "h3", text: "Unterschiedliche Beziehungen zu Informationen untersuchen" },
          "Drei Personas wurden verwendet, um unterschiedliche Altersgruppen, Hörsituationen und Einstellungen zu Informationen zu betrachten. Sie repräsentierten Bedürfnisse wie effizienten Zugang zu Fakten, ruhiges Hören im Hintergrund, energetischere Präsentation, größere inhaltliche Tiefe und Schutz vor Informationsüberlastung.",
          "Die Personas wurden mit Gemini erstellt und anschließend als Werkzeuge für die Konzeptentwicklung genutzt. Sie werden deshalb als Hypothesen-Personas und nicht als direkte Ergebnisse primärer Nutzerforschung bezeichnet.",
          {
            kind: "note",
            text: "Kennzeichnung: KI-gestützte Hypothesen-Persona",
          },
          {
            kind: "figures",
            items: [
              { aspect: "1600/738", caption: "[ personas ]", src: "/images/sync-fm-personas.webp", alt: "Die drei Hypothesen-Personas: Leo, 19, der Entdecker; Sarah, 42, die Fakten-Sucherin; und Walter, 73, der traditionelle Hörer" },
            ],
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Interaktionsstrategie",
        number: "04",
        heading: "Kontrolle durch wenige ausdrucksstarke Entscheidungen",
        body: [
          "Anstatt zahlreiche Einstellungen anzubieten, konzentriert das Interface die Steuerung auf drei übergeordnete Dimensionen. Diese Einstellungen beeinflussen den fortlaufenden Audiofluss, anstatt die Hörer zur Auswahl jedes einzelnen Beitrags zu zwingen.",
          {
            kind: "list",
            items: [
              "Wie viele Informationen sollen vermittelt werden?",
              "Wie soll die Moderation klingen?",
              "Wie stark sollen Interpretationen einbezogen werden?",
            ],
          },
          "Die Radio-Metapher schafft ein vertrautes mentales Modell. Das System verhält sich wie ein kontinuierlicher Sender, während die Steuerungen seinen Charakter anpassbar machen.",
        ],
      },
      {
        id: "development",
        navLabel: "Die drei Steuerungen",
        number: "05",
        heading: "Die drei Steuerungen",
        body: [
          "Sync Dial — Der zentrale Drehregler steuert die Informationstiefe. Eine Bewegung zum unteren Bereich reduziert Beiträge auf kurze Schlagzeilen. Eine Bewegung zum höheren Bereich führt zu ausführlicheren Erklärungen, Kontext und Analyse. Eine reagierende Wellenform gibt visuelles Feedback.",
          "Mood Bar — Die Mood Bar verändert Persönlichkeit und Rhythmus der KI-Moderation. Eine ruhige Einstellung nutzt langsameres Sprechen, neutrale Sprache und längere Pausen. Eine energetischere Einstellung erhöht das Tempo. Dabei verändert sich die Präsentation und nicht der faktische Inhalt.",
          "Opinion Filter — Der Opinion Filter steuert den Anteil journalistischer Interpretation. Die Steuerung soll Framing sichtbar machen. Sie bringt jedoch ein wichtiges ethisches Risiko mit sich: Nutzer könnten unangenehme Perspektiven ausblenden und bestehende Weltbilder verstärken.",
          { kind: "h3", text: "Die Vertrautheit des Radios mit einem digitalen KI-System verbinden" },
          "Die visuelle Sprache verwendet kreisförmige Elemente, abgerundete Container und wellenbasierte Rückmeldungen, um eine Verbindung zu Audio und Radio herzustellen. Lila schafft eine eigenständige technologische Identität und wirkt weniger klinisch als viele blaue Technologiesysteme. Futura wird für prominente Überschriften eingesetzt, während Segoe UI längere Interface- und Nachrichtentexte unterstützt.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1014", caption: "[ colour palette ]", src: "/images/sync-fm-colour.webp", alt: "Die fünfstufige Lila-Palette mit Hex-Werten, von Fast-Schwarz bis Off-White" },
              { aspect: "1600/586", caption: "[ typography ]", src: "/images/sync-fm-typography.webp", alt: "Futura TP für Überschriften, Segoe UI für Fließtext" },
            ],
          },
          "Das Logo verwandelt ein traditionelles Radio in eine einfache, charakterähnliche Form. Erste Konzepte wurden mit Gemini generiert und anschließend vom Team zu einem flachen Vektorsystem angepasst und verfeinert. Diese KI-gestützte Phase wird im Prozess transparent dargestellt.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/557", caption: "[ logo iterations ]", src: "/images/sync-fm-logo-system.webp", alt: "Vier Logo-Iterationen, vom türkisen Roboter bis zum umrissenen Radio, neben der finalen lila Marke" },
              { aspect: "820/598", caption: "[ wireframes ]", src: "/images/sync-fm-wireframes.webp", alt: "Low-Fidelity-Wireframes für Home, erweitertes Home und Präferenzen" },
              { aspect: "1600/1664", caption: "[ components ]", src: "/images/sync-fm-components.webp", alt: "Die Komponentenbibliothek: Stimmauswahl, Modell-Liste, Menüleiste, Regler-Zustände hell und dunkel, Slider und Geschwindigkeit" },
            ],
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "06",
        heading: "Ein kontinuierlicher Informationsfluss, der in Echtzeit angepasst wird",
        body: [
          "Der finale Prototyp zeigt ein mobiles Radioerlebnis, das sich auf den aktuellen Audiofluss konzentriert. Der Sync Dial bleibt visuell dominant, da er die umfassendste Veränderung steuert. Sekundäre Steuerungen verändern Moderationston und Interpretation, ohne das Zuhören zu unterbrechen.",
          "Das Ergebnis ist kein vollständig funktionierender KI-Radiosender. Es handelt sich um einen Interaktionsprototyp, der zeigt, wie redaktionelle Kontrolle eingeführt werden könnte, ohne ein komplexes Einstellungs-Dashboard zu erzeugen.",
        ],
        images: [{ aspect: "1600/2548", caption: "[ final mobile screens — large showcase ]", src: "/images/sync-fm-final-screens.webp", alt: "Alle Screens des Figma-Prototyps: Home und erweitertes Home in Hell und Dunkel, Registrierung, der Präferenz-Flow sowie Profil- und Einstellungsseiten" }],
      },
      {
        id: "testing",
        navLabel: "Evaluation & Ethik",
        number: "07",
        heading: "Kontrolle ist nicht automatisch neutral.",
        body: [
          "Das Interface sollte anhand von drei Fragen evaluiert werden: Verstehen Nutzer die Wirkung jeder Steuerung vor ihrer Aktivierung? Können sie das System anpassen, ohne den Hörfluss zu unterbrechen? Erkennen sie, wann Inhalte Fakten, Analyse oder Interpretation darstellen?",
          "Die Meinungssteuerung erzeugt das wichtigste ungelöste Risiko. Kontrolle über journalistisches Framing kann Transparenz erhöhen, aber auch Filterblasen erzeugen und notwendige Gegenperspektiven entfernen.",
          {
            kind: "list",
            items: [
              "Sichtbare Quelleninformationen",
              "Klare Kennzeichnungen für Fakt, Kontext und Interpretation",
              "Grenzen, die eine vollständige Entfernung alternativer Perspektiven verhindern",
              "Erklärungen, warum bestimmte Beiträge erscheinen",
              "Eine Rückkehr zu einem ausgewogenen redaktionellen Modus",
            ],
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "08",
        heading: "Konzept, Prototyp und zukünftiges Verhalten klar unterscheiden",
        body: [
          "Die Personas waren KI-gestützte Hypothesen und keine Ergebnisse aus Interviews. Die Dokumentation bietet nicht genügend Evidenz für starke Aussagen zu langfristiger Benutzerfreundlichkeit, Vertrauen oder Hörverhalten. Das Konzept ist außerdem von Technologien abhängig, die im Prototyp nicht implementiert wurden, darunter Echtzeit-Audiogenerierung, Quellenprüfung und Inhaltsmoderation.",
          "Die Fallstudie unterscheidet deshalb klar zwischen Interaktionskonzept, visuellem Prototyp, getesteten Interface-Elementen und zukünftigem technischen Verhalten.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "Sync FM hat mir gezeigt, dass Personalisierung wertvoller wird, wenn sie durch wenige verständliche Steuerungen ausgedrückt wird. Das Hinzufügen jeder möglichen Einstellung hätte genau die Komplexität erzeugt, die das Konzept reduzieren sollte.",
          "Das Projekt verdeutlichte außerdem, dass Kontrolle nicht automatisch neutral ist. Wenn Nutzer journalistisches Framing beeinflussen können, entstehen ethische Konsequenzen, die ebenso sorgfältig gestaltet werden müssen wie das Interface selbst. Eine zukünftige Version sollte Interaktionstests mit Forschung zu Vertrauen, Medienkompetenz und algorithmischer Transparenz verbinden.",
        ],
      },
    ],
  },
};

export default syncFm;
