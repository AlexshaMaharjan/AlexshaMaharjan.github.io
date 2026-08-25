import type { CaseStudyLocaleContent } from "./types";

const qisPortal: CaseStudyLocaleContent = {
  en: {
    slug: "qis-portal",
    name: "QIS Portal Redesign",
    projectTag: "QIS Portal Redesign · 2024",
    headline: "Turning a fragmented university portal into a clearer student service.",
    summary:
      "The QIS redesign reorganises essential university-administration tasks around how students search for exams, certificates, grades, fees and personal information.",
    tags: ["UX Research", "Information Architecture", "Product Design", "Usability Testing", "Service UX"],
    role: "UX/UI Designer & Researcher",
    contribution: "Led most of the UX, interface and usability work. The team supported the surveys.",
    type: "Semester project · team",
    tools: "",
    deliverables: "",
    heroImage: {
      src: "/images/hero-qis-portal.webp",
      alt: "The redesigned QIS Portal exam pages shown side by side",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          {
            kind: "note",
            text: "287 survey responses · 21 → 14 pages in the architecture · 12 test participants · ≈ 90.6 average SUS score",
          },
          "QIS is an administrative portal used by students at the Technische Hochschule Lübeck. It supports important tasks such as exam registration and withdrawal, viewing grades and study progress, downloading enrolment certificates, checking semester fees and updating personal information.",
          "Despite the importance of these functions, students experienced the existing portal as visually outdated, difficult to navigate and inefficient. The redesign was developed through two surveys, structural analysis, paper prototyping, high-fidelity design and remote usability testing.",
        ],
        images: [{ aspect: "16/8", caption: "[ original portal — before ]" }],
      },
      {
        id: "challenge",
        navLabel: "Challenge",
        number: "02",
        heading: "Essential content was hidden inside an outdated structure.",
        body: [
          "The research identified several connected problems: small typography, inefficient use of screen space, weak information hierarchy, numerous nested pages, difficult navigation, outdated visual language, inconsistent interaction patterns and limited mobile suitability.",
          "The problem was not the relevance of the content. Students considered the information important. The difficulty was finding and completing the required task efficiently.",
        ],
        designQuestion:
          "How might a university portal make essential administrative tasks easier to find, understand and complete?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Combining open feedback with measurable evaluation",
        body: [
          "The first survey collected open feedback about usage patterns, satisfaction, strengths and frustrations. It received 150 responses. Because open responses were difficult to compare quantitatively, a second survey introduced structured response options. It received 137 responses and examined navigation, readability, space management, information relevance and functional priorities.",
          "This combination allowed the team to identify both personal frustrations and recurring patterns.",
        ],
        images: [
          { aspect: "4/3", caption: "[ survey 01 — 150 responses ]" },
          { aspect: "4/3", caption: "[ survey 02 — 137 responses ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Key insights",
        insights: [
          {
            heading: "Irregular use increases the need for recognition.",
            body: "Students use the portal during important academic moments rather than continuously. They should not have to remember a complex structure between visits.",
          },
          {
            heading: "Important content does not guarantee findability.",
            body: "Users considered the portal's information relevant, but frequently found it difficult to locate.",
          },
          {
            heading: "Hierarchy should follow student tasks.",
            body: "Exam registration, grades, certificates and fees deserve higher priority than secondary informational pages.",
          },
          {
            heading: "Interface modernisation must include structural change.",
            body: "Changing colours and rounded corners would not solve the fragmented navigation.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Information architecture",
        number: "05",
        heading: "Reducing 21 pages to 14 without removing essential functionality",
        body: [
          "The existing portal structure contained 21 pages and several redundant or closely related routes. The redesign reorganised the content by task type and reduced the structure to 14 pages without intentionally removing the existing core functionality.",
          "Related pages were combined, secondary information was deprioritised and navigation was structured around student goals rather than the internal organisation of the university system.",
          { kind: "h3", text: "Testing structure before visual polish" },
          "Paper prototypes were created for login, dashboard, study administration, exam administration, exam registration, grade history, study progress and fee management. The low-fidelity stage focused on page relationships, content priority and task completion rather than visual style.",
        ],
        images: [
          { aspect: "4/3", caption: "[ 21-page structure ]" },
          { aspect: "4/3", caption: "[ 14-page structure ]" },
          { aspect: "16/8", caption: "[ paper prototypes ]" },
        ],
      },
      {
        id: "testing",
        navLabel: "Usability testing",
        number: "06",
        heading: "Evaluating seven essential student tasks",
        body: [
          "The original high-fidelity prototype introduced larger typography, improved use of screen space, persistent navigation patterns, structured forms, status colours, grade and certificate tables and confirmation dialogues. It was tested remotely with 12 participants, who completed seven tasks and then a System Usability Scale questionnaire.",
          "The individual SUS scores ranged from 77.5 to 100. The average score was approximately 90.6. Participants particularly valued the improved navigation, larger and more readable elements, clearer structure, more modern presentation and easier task completion.",
          "The result is promising but should be interpreted within the limits of a small remote academic study rather than as proof of production-level usability.",
        ],
        images: [
          { aspect: "4/3", caption: "[ original hi-fi screens ]" },
          { aspect: "4/3", caption: "[ sus chart — 77.5–100 ]" },
        ],
      },
      {
        id: "development",
        navLabel: "2026 visual iteration",
        number: "07",
        heading: "Preserving the tested logic, updating the visual layer",
        body: [
          {
            kind: "note",
            text: "Clearly labelled 2026 iteration — research, architecture, task flows and tested structure preserved; the visual layer is modernised.",
          },
        ],
        insights: [
          {
            heading: "Task-based dashboard",
            body: "Register for exams · view grades · download certificates · check fees · update personal information",
          },
          {
            heading: "Persistent navigation",
            body: "Desktop sidebar · mobile drawer or bottom navigation",
          },
          {
            heading: "Global search",
            body: "Exam registration · semester certificate · fee payment · password change",
          },
          {
            heading: "Visible deadlines",
            body: "Exam-registration deadlines · fee deadlines · missing documents · important notices",
          },
          {
            heading: "Accessible status system",
            body: "Icon + label + colour + explanation combined",
          },
          {
            heading: "Responsive tables",
            body: "Hierarchy · filters · sorting · mobile cards · downloads · focus states",
          },
          {
            heading: "Consistent forms",
            body: "Required fields · validation · error states · confirmation · save progress · destructive actions",
          },
          {
            heading: "Restrained palette",
            body: "White · cool neutral grey · one institutional accent · red/yellow/green for status",
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "08",
        heading: "A student portal organised around actions, not administration.",
        body: [
          "The final iteration preserves the research-led information architecture and tested task flows while replacing the outdated visual layer with a clearer responsive system. A task-based dashboard gives students direct access to the actions they perform most frequently.",
          "The result is a clearer service interface that supports essential academic administration without exposing students to the complexity of the underlying institutional structure.",
        ],
        images: [
          { aspect: "16/9", caption: "[ new dashboard — large showcase ]" },
          { aspect: "16/10", caption: "[ mobile redesign ]" },
          { aspect: "16/10", caption: "[ before / after ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "09",
        heading: "A strong foundation with clear limits",
        body: [
          {
            kind: "list",
            items: [
              "The work was completed by a team",
              "Testing was remote and the participant sample was limited",
              "The prototype did not include a production backend",
              "Accessibility was not validated through disabled participants or assistive technologies",
              "The original high-fidelity interface needed visual modernisation",
              "The new 2026 visual iteration will require renewed usability testing",
            ],
          },
          { kind: "h3", text: "What I learned" },
          "The QIS project taught me that a visual redesign is most effective when it begins with structure. The largest improvement did not come from colours, images or rounded components. It came from understanding which tasks mattered most and reducing the number of pages students needed to navigate.",
          "The project also showed that good test results do not mean a design is permanently complete. Visual standards, device expectations and accessibility requirements continue to develop. The next iteration preserves the tested logic while updating the visual and responsive system.",
        ],
      },
    ],
  },
  de: {
    slug: "qis-portal",
    name: "QIS Portal Redesign",
    projectTag: "QIS Portal Redesign · 2024",
    headline: "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice verwandeln.",
    summary:
      "Das QIS-Redesign strukturiert zentrale Hochschulverwaltungsaufgaben danach, wie Studierende Prüfungen, Bescheinigungen, Noten, Gebühren und persönliche Informationen suchen und bearbeiten.",
    tags: ["UX Research", "Information Architecture", "Product Design", "Usability Testing", "Service UX"],
    role: "UX/UI Designerin & Researcherin",
    contribution: "Den Großteil der UX-, Interface- und Usability-Arbeit umgesetzt. Das Team unterstützte die Umfragen.",
    type: "Semesterprojekt · Team",
    tools: "",
    deliverables: "",
    heroImage: {
      src: "/images/hero-qis-portal.webp",
      alt: "Die überarbeiteten Prüfungsseiten des QIS-Portals nebeneinander",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          {
            kind: "note",
            text: "287 Umfrage-Antworten · 21 → 14 Seiten in der Architektur · 12 Test-Teilnehmende · ≈ 90,6 durchschnittlicher SUS-Wert",
          },
          "QIS ist ein Verwaltungsportal für Studierende der Technischen Hochschule Lübeck. Es unterstützt wichtige Aufgaben wie Prüfungsanmeldung und -abmeldung, Einsicht in Noten und Studienverlauf, Download von Immatrikulationsbescheinigungen, Prüfung von Semestergebühren und Aktualisierung persönlicher Informationen.",
          "Trotz der Bedeutung dieser Funktionen erlebten Studierende das bestehende Portal als visuell veraltet, schwer navigierbar und ineffizient. Das Redesign entstand durch zwei Umfragen, Strukturanalyse, Paper Prototyping, High-Fidelity-Design und Remote-Usability-Tests.",
        ],
        images: [{ aspect: "16/8", caption: "[ ursprüngliches portal — vorher ]" }],
      },
      {
        id: "challenge",
        navLabel: "Herausforderung",
        number: "02",
        heading: "Wichtige Inhalte waren in einer veralteten Struktur verborgen.",
        body: [
          "Die Recherche identifizierte mehrere zusammenhängende Probleme: kleine Typografie, ineffiziente Nutzung des Bildschirmraums, schwache Informationshierarchie, zahlreiche verschachtelte Seiten, schwierige Navigation, veraltete visuelle Sprache, inkonsistente Interaktionsmuster und begrenzte mobile Nutzbarkeit.",
          "Das Problem lag nicht in der Relevanz der Inhalte. Studierende bewerteten die Informationen als wichtig. Die Schwierigkeit bestand darin, die erforderliche Aufgabe schnell zu finden und abzuschließen.",
        ],
        designQuestion:
          "Wie kann ein Hochschulportal zentrale Verwaltungsaufgaben leichter auffindbar, verständlich und ausführbar machen?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Offenes Feedback mit messbarer Bewertung verbinden",
        body: [
          "Die erste Umfrage sammelte offene Rückmeldungen zu Nutzungsmustern, Zufriedenheit, Stärken und Problemen. Sie erhielt 150 Antworten. Da offene Antworten quantitativ schwer vergleichbar waren, führte die zweite Umfrage strukturierte Antwortmöglichkeiten ein. Sie erhielt 137 Antworten und untersuchte Navigation, Lesbarkeit, Platznutzung, Informationsrelevanz und funktionale Prioritäten.",
          "Diese Kombination ermöglichte es dem Team, sowohl persönliche Frustrationen als auch wiederkehrende Muster zu erkennen.",
        ],
        images: [
          { aspect: "4/3", caption: "[ umfrage 01 — 150 antworten ]" },
          { aspect: "4/3", caption: "[ umfrage 02 — 137 antworten ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Zentrale Erkenntnisse",
        insights: [
          {
            heading: "Unregelmäßige Nutzung erhöht den Bedarf an Wiedererkennung.",
            body: "Studierende verwenden das Portal zu wichtigen akademischen Zeitpunkten und nicht kontinuierlich. Sie sollten sich zwischen Besuchen keine komplexe Struktur merken müssen.",
          },
          {
            heading: "Wichtige Inhalte sind nicht automatisch auffindbar.",
            body: "Nutzer bewerteten die Informationen des Portals als relevant, hatten jedoch häufig Schwierigkeiten, sie zu finden.",
          },
          {
            heading: "Die Hierarchie sollte den Aufgaben der Studierenden folgen.",
            body: "Prüfungsanmeldung, Noten, Bescheinigungen und Gebühren benötigen eine höhere Priorität als sekundäre Informationsseiten.",
          },
          {
            heading: "Eine Modernisierung des Interfaces benötigt strukturelle Veränderung.",
            body: "Neue Farben und abgerundete Ecken allein würden die fragmentierte Navigation nicht lösen.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Informationsarchitektur",
        number: "05",
        heading: "21 Seiten auf 14 reduzieren, ohne zentrale Funktionen zu entfernen",
        body: [
          "Die bestehende Portalstruktur umfasste 21 Seiten sowie mehrere redundante oder eng verwandte Pfade. Das Redesign ordnete die Inhalte nach Aufgabentyp und reduzierte die Struktur auf 14 Seiten, ohne die bestehenden Kernfunktionen absichtlich zu entfernen.",
          "Verwandte Seiten wurden zusammengeführt, sekundäre Informationen niedriger priorisiert und die Navigation an den Zielen der Studierenden statt an der internen Organisation des Hochschulsystems ausgerichtet.",
          { kind: "h3", text: "Struktur vor visueller Ausarbeitung testen" },
          "Paper Prototypes wurden für Login, Dashboard, Studienverwaltung, Prüfungsverwaltung, Prüfungsanmeldung, Notenverlauf, Studienverlauf und Gebührenverwaltung erstellt. Die Low-Fidelity-Phase konzentrierte sich auf Seitenbeziehungen, Inhaltspriorität und Aufgabenabschluss und nicht auf visuellen Stil.",
        ],
        images: [
          { aspect: "4/3", caption: "[ struktur mit 21 seiten ]" },
          { aspect: "4/3", caption: "[ struktur mit 14 seiten ]" },
          { aspect: "16/8", caption: "[ papierprototypen ]" },
        ],
      },
      {
        id: "testing",
        navLabel: "Usability-Tests",
        number: "06",
        heading: "Sieben zentrale Aufgaben von Studierenden evaluieren",
        body: [
          "Der ursprüngliche High-Fidelity-Prototyp führte größere Typografie, bessere Nutzung des Bildschirmraums, konsistentere Navigationsmuster, strukturierte Formulare, Statusfarben, Tabellen für Noten und Bescheinigungen sowie Bestätigungsdialoge ein. Er wurde remote mit 12 Teilnehmenden getestet, die sieben Aufgaben bearbeiteten und anschließend einen System-Usability-Scale-Fragebogen ausfüllten.",
          "Die einzelnen SUS-Werte lagen zwischen 77,5 und 100. Der Durchschnitt lag bei ungefähr 90,6. Besonders positiv bewertet wurden die verbesserte Navigation, größere und besser lesbare Elemente, klarere Struktur, modernere Darstellung und einfachere Aufgabenbearbeitung.",
          "Das Ergebnis ist vielversprechend, sollte jedoch innerhalb der Grenzen einer kleinen akademischen Remote-Studie interpretiert werden und nicht als Nachweis produktionsreifer Usability.",
        ],
        images: [
          { aspect: "4/3", caption: "[ ursprüngliche hi-fi-screens ]" },
          { aspect: "4/3", caption: "[ sus-diagramm — 77,5–100 ]" },
        ],
      },
      {
        id: "development",
        navLabel: "Visuelle Iteration 2026",
        number: "07",
        heading: "Die getestete Logik bewahren, die visuelle Ebene erneuern",
        body: [
          {
            kind: "note",
            text: "Klar gekennzeichnete Iteration 2026 — Recherche, Architektur, Aufgabenabläufe und getestete Struktur bleiben erhalten; die visuelle Ebene wird modernisiert.",
          },
        ],
        insights: [
          {
            heading: "Aufgabenbasiertes Dashboard",
            body: "Prüfungen anmelden · Noten ansehen · Bescheinigungen herunterladen · Gebühren prüfen · persönliche Daten aktualisieren",
          },
          {
            heading: "Persistente Navigation",
            body: "Desktop-Sidebar · mobiler Drawer oder Bottom-Navigation",
          },
          {
            heading: "Globale Suche",
            body: "Prüfungsanmeldung · Semesterbescheinigung · Gebührenzahlung · Passwortänderung",
          },
          {
            heading: "Sichtbare Fristen",
            body: "Prüfungsfristen · Gebührenfristen · fehlende Dokumente · wichtige Hinweise",
          },
          {
            heading: "Barrierearmes Statussystem",
            body: "Icon + Label + Farbe + Erklärung kombiniert",
          },
          {
            heading: "Responsive Tabellen",
            body: "Hierarchie · Filter · Sortierung · mobile Karten · Downloads · Fokuszustände",
          },
          {
            heading: "Konsistente Formulare",
            body: "Pflichtfelder · Validierung · Fehlerzustände · Bestätigung · Zwischenspeichern · destruktive Aktionen",
          },
          {
            heading: "Zurückhaltende Palette",
            body: "Weiß · kühles Neutralgrau · ein institutioneller Akzent · Rot/Gelb/Grün für Status",
          },
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "08",
        heading: "Ein Studierendenportal, das nach Handlungen statt Verwaltung organisiert ist.",
        body: [
          "Die finale Iteration bewahrt die forschungsbasierte Informationsarchitektur und die getesteten Aufgabenabläufe und ersetzt gleichzeitig die veraltete visuelle Ebene durch ein klareres responsives System. Ein aufgabenbasiertes Dashboard bietet direkten Zugang zu den am häufigsten benötigten Handlungen.",
          "Das Ergebnis ist ein klareres Service-Interface, das zentrale akademische Verwaltungsaufgaben unterstützt, ohne Studierende mit der Komplexität der zugrunde liegenden institutionellen Struktur zu konfrontieren.",
        ],
        images: [
          { aspect: "16/9", caption: "[ neues dashboard — große präsentation ]" },
          { aspect: "16/10", caption: "[ mobiles redesign ]" },
          { aspect: "16/10", caption: "[ vorher / nachher ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "09",
        heading: "Eine starke Grundlage mit klaren Grenzen",
        body: [
          {
            kind: "list",
            items: [
              "Die Arbeit entstand im Team",
              "Die Tests wurden remote durchgeführt und die Stichprobe war begrenzt",
              "Der Prototyp enthielt kein produktives Backend",
              "Barrierefreiheit wurde nicht mit behinderten Teilnehmenden oder assistiven Technologien validiert",
              "Das ursprüngliche High-Fidelity-Interface benötigte eine visuelle Modernisierung",
              "Die neue visuelle Iteration von 2026 muss erneut getestet werden",
            ],
          },
          { kind: "h3", text: "Was ich gelernt habe" },
          "Das QIS-Projekt hat mir gezeigt, dass ein visuelles Redesign am wirksamsten ist, wenn es mit der Struktur beginnt. Die größte Verbesserung entstand nicht durch Farben, Bilder oder abgerundete Komponenten. Sie entstand durch das Verständnis der wichtigsten Aufgaben und die Reduzierung der Seiten, durch die Studierende navigieren mussten.",
          "Das Projekt zeigte außerdem, dass gute Testergebnisse nicht bedeuten, dass ein Design dauerhaft abgeschlossen ist. Visuelle Standards, Geräteanforderungen und Barrierefreiheitsanforderungen entwickeln sich weiter. Die nächste Iteration bewahrt die getestete Logik und aktualisiert gleichzeitig das visuelle und responsive System.",
        ],
      },
    ],
  },
};

export default qisPortal;
