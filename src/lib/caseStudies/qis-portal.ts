import type { CaseStudyLocaleContent } from "./types";
import { PROJECT_TAGS } from "./tags";

/**
 * The QIS portal redesign, rewritten from the owner's own copy deck
 * (`promt.pdf`, section 15), which is the one study the deck said would need
 * new sections. It goes from ten to eleven, and §03 and §08 are new work
 * rather than new wording.
 *
 * **§03 now carries the four survey charts.** They are drawn by
 * `scripts/qis-charts.mjs` from the numbers in the owner's supplied exports,
 * in Inter and in the QIS red, rather than shipped as the matplotlib bitmaps.
 * Those carried a default blue that is in neither this site nor the QIS design
 * system, and baked each chart's title into the image, where the case study
 * already prints it as a heading. Each chart is the only **locale-specific
 * `src`** on the site: a bar chart's labels are its own words, so the German
 * page gets the German chart. `image-manifest.mjs` knows about the `-en`/`-de`
 * suffix and still checks that the stems match and that neither side points at
 * the other's file.
 *
 * **The survey total is 201 across two surveys**, and chart 1 reads "6 of 101".
 * It was 287 (150 + 137) here for four sessions. 201 is the owner's number in
 * the deck they wrote against the raw results, and the regenerated charts agree
 * with it, so the old per-survey counts are gone rather than reconciled.
 *
 * **Where the three showcase boards sit is a judgement call, flagged.** The
 * deck asks §06 for fourteen separate figures (colour, typography,
 * navigation, dropdowns, buttons, icons, accordions, forms, tables,
 * confirmation pop-ups) and nine of those are already together on
 * `qis-design-system.webp`, with the flow states on
 * `qis-interaction-flow.webp`. They are used there. But all three boards are
 * one export set, and the case study's previous draft placed them *after* the
 * 2026 visual iteration, which would make them the refined interface rather
 * than the tested one. If that is right, design-system and interaction-flow
 * belong in §08 beside `qis-final-screens` and §06 keeps only its placeholder.
 *
 * Four figures the deck names have no asset and are hatched placeholders: the
 * tested high-fidelity screens (§06), the remote testing session (§07), the
 * updated dashboard (§08) and the before/after comparison (§09).
 */
const qisPortal: CaseStudyLocaleContent = {
  en: {
    slug: "qis-portal",
    name: "QIS Portal Redesign",
    headline: "Redesigning a fragmented university portal around student tasks.",
    summary:
      "A research-led redesign of the QIS student portal, focused on information architecture, navigation and clearer task flows.",
    tags: [...PROJECT_TAGS["qis-portal"]],
    context: "Semester project",
    role: "UX/UI Designer & Researcher",
    team: "Collaborative team project",
    contribution: "Led most of the UX, interface and usability work. The team supported the surveys.",
    tools: "",
    heroImage: {
      src: "/images/hero-qis-portal.webp",
      alt: "The redesigned QIS Portal shown across three screens, beside the project name",
      aspect: "1920/1080",
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
            text: "201 survey responses across two surveys · 21 → 14 pages · 12 test participants · ≈ 90.6 average SUS score",
          },
          "QIS is used by students at Technische Hochschule Lübeck for tasks such as registering for exams, checking grades, downloading certificates and managing semester information.",
          "I led most of the UX, interface and usability work, while the team supported the survey research. The redesign focused on organising the portal around student tasks while creating a cleaner, more modern and easier-to-navigate interface.",
          {
            kind: "figures",
            items: [
              { aspect: "1194/834", caption: "The original QIS portal before the redesign: the grade overview.", src: "/images/qis-original-overview.webp", alt: "The existing QIS portal: the grade overview as it stands today" },
              { aspect: "880/620", caption: "The existing login page.", src: "/images/qis-original-login.webp", alt: "The existing portal's login page" },
              { aspect: "876/745", caption: "The existing exam-registration tree.", src: "/images/qis-original-exams.webp", alt: "The existing portal's exam registration tree" },
            ],
          },
        ],
      },
      {
        id: "challenge",
        navLabel: "Context & challenge",
        number: "02",
        heading: "Important information, difficult to find",
        body: [
          "The existing portal contained useful information, but its structure made everyday tasks harder than necessary. Small typography, nested pages, weak hierarchy and inconsistent navigation made it difficult to understand where to go next.",
          "The challenge was not simply to modernise the interface. The underlying structure also needed to become clearer.",
        ],
        designQuestion:
          "How can the portal be reorganised around student tasks so important information is easier to find and use?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Understanding where students struggled",
        body: [
          "We started with an open survey to understand what students liked, what frustrated them and what they wanted to improve about QIS.",
          "The responses repeatedly pointed to the same problems: too many clicks, confusing navigation, poor mobile use and difficulty finding important tasks such as exam registration.",
          { kind: "h3", text: "Turning recurring problems into measurable priorities" },
          "We followed this with a structured survey to understand how common these problems were and which parts of the portal mattered most to students.",
          {
            kind: "split",
            heading: "Useful content, difficult interface",
            body: [
              "Most students considered the information in QIS relevant, but only 6 of 101 described the current layout as intuitive and user-friendly.",
            ],
            figure: { aspect: "860/332", caption: "How students rated the portal’s content against its layout.", src: "/images/qis-chart-content-vs-interface-en.webp", alt: "Bar chart: 73% rated the content relevant or very relevant, 6% found the current layout intuitive and user-friendly" },
          },
          {
            kind: "note",
            text: "Insight: The main problem was not the information itself, but how it was structured and accessed.",
          },
          {
            kind: "split",
            heading: "Some areas added complexity without being used often",
            body: [
              "85% rarely or never used “Studentisches Leben”, while 88% had never used “Amtliche Statistik”.",
            ],
            figure: { aspect: "860/332", caption: "Reported use of the portal’s two least-visited sections.", src: "/images/qis-chart-low-use-sections-en.webp", alt: "Bar chart: 85% rarely or never used Studentisches Leben, 88% had never used Amtliche Statistik" },
          },
          {
            kind: "note",
            text: "Insight: Low-use sections could be deprioritised or regrouped to simplify the navigation.",
          },
          {
            kind: "split",
            heading: "What students wanted easier access to",
            body: [
              "Asked what they would like to reach more quickly, students named practical academic tasks far more often than anything else.",
            ],
            figure: { aspect: "860/458", caption: "The four most requested shortcuts, by number of mentions.", src: "/images/qis-chart-requested-features-en.webp", alt: "Bar chart of requested features: exam schedules 92, upload sick note 67, lecturer contacts 45, student email 29" },
          },
          {
            kind: "note",
            text: "Insight: Students wanted faster access to practical academic tasks.",
          },
          {
            kind: "split",
            heading: "Most students were occasional users",
            body: [
              "79% used QIS monthly or only one to three times per semester.",
            ],
            figure: { aspect: "860/184", caption: "How often students opened the portal.", src: "/images/qis-chart-occasional-use-en.webp", alt: "Bar chart: 79% used QIS monthly or only one to three times per semester" },
          },
          {
            kind: "note",
            text: "Insight: The navigation needed to be easy to recognise after time away, without requiring students to remember where everything was.",
          },
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Turning research into design priorities",
        insights: [
          {
            heading: "Recognition over memory",
            body: "Because most students used QIS only occasionally, the structure needed to remain understandable even after long periods away.",
          },
          {
            heading: "Make important tasks easier to reach",
            body: "Exam-related information and other practical student tasks needed stronger priority and fewer steps.",
          },
          {
            heading: "Reduce unnecessary complexity",
            body: "Rarely used sections could be regrouped or deprioritised to create a simpler information architecture.",
          },
          {
            heading: "Structure before styling",
            body: "The research showed that a visual refresh alone would not solve the main problems. Navigation and information architecture needed to change first.",
          },
        ],
      },
      {
        id: "architecture",
        navLabel: "Information architecture",
        number: "05",
        heading: "Restructuring before redesigning",
        body: [
          "The existing portal contained 21 pages, including several closely related or redundant routes.",
          "We reorganised the content around student tasks and reduced the structure to 14 pages while keeping the core functionality. Related content was grouped together and secondary information was given less priority.",
          {
            kind: "figures",
            items: [
              { aspect: "1658/949", caption: "Original architecture (21 pages).", src: "/images/qis-structure-21.webp", alt: "The existing information architecture: 21 pages across four levels" },
              { aspect: "1900/828", caption: "Restructured architecture (14 pages).", src: "/images/qis-structure-14.webp", alt: "The revised architecture: 14 pages, with related functions merged" },
            ],
          },
          { kind: "h3", text: "Exploring the new structure" },
          "Before moving into detailed interface design, we created low-fidelity prototypes for areas such as exam registration, grades, study progress, certificates and fees.",
          "This helped us explore relationships between pages, information priority and the steps needed to complete common tasks.",
          {
            kind: "figures",
            items: [
              { aspect: "2800/1840", caption: "Early task flow wireframes.", src: "/images/qis-paper-prototypes.webp", alt: "The lo-fi wireframe flow: login, dashboard, semester overview, exam registration and the grade list, joined by flow arrows" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Design development",
        number: "06",
        heading: "Turning the structure into an interface",
        body: [
          "Once the new architecture was defined, we developed a visual and interaction system around it.",
          "The aim was not simply to make QIS look newer. The interface needed to make hierarchy clearer, create more predictable patterns and reduce the effort required to understand each page.",
          { kind: "h3", text: "Colour and typography" },
          "We kept a visual connection to Technische Hochschule Lübeck through red, white and black, supported by lighter shades. Additional status colours helped distinguish positive, negative and intermediate states.",
          "Typography was given a clearer hierarchy, with stronger headings and more readable interface text.",
          { kind: "h3", text: "Creating consistent navigation" },
          "A shared navigation system was introduced across the portal so students did not have to relearn how each section worked. Dropdowns grouped related areas, while the page hierarchy made the current location and available next steps clearer.",
          { kind: "h3", text: "Making actions easier to recognise" },
          "Buttons and icons were designed as a consistent set so common actions looked and behaved in the same way throughout the portal. Primary actions received stronger visual emphasis, while secondary actions remained less dominant.",
          { kind: "h3", text: "Reducing information overload" },
          "Some pages contained large amounts of information at once. Accordions were introduced where content could be progressively revealed instead of showing everything immediately. Forms also followed a more consistent structure so labels, fields and actions were easier to scan.",
          { kind: "h3", text: "Making complex information easier to scan" },
          "Tables were redesigned with clearer spacing, hierarchy and status information so content such as grades and records could be understood more quickly.",
          "Important actions also used confirmation pop-ups to reduce accidental changes during tasks such as exam registration.",
          { kind: "h3", text: "Bringing the system together" },
          "The low-fidelity structure and interface patterns were then developed into a complete high-fidelity prototype. This version brought together the new navigation, typography, colours, forms, tables and interaction patterns across the main QIS pages.",
        ],
      },
      {
        id: "testing",
        navLabel: "Usability testing",
        number: "07",
        heading: "Testing seven essential tasks",
        body: [
          "We tested the high-fidelity prototype remotely with 12 participants across seven student tasks, followed by a System Usability Scale questionnaire.",
          "SUS scores ranged from 77.5 to 100, with an average of approximately 90.6. Participants responded particularly positively to the navigation, readability, clearer structure and easier task completion.",
          "The results were encouraging, but they came from a small remote academic study and should not be treated as proof of production-level usability.",
          {
            kind: "figures",
            items: [
              { aspect: "1672/941", caption: "SUS usability test scores.", src: "/images/qis-sus-chart.webp", alt: "System Usability Scale scores for twelve participants, all at or above the 68-point benchmark" },
            ],
          },
        ],
      },
      {
        id: "iteration",
        navLabel: "Visual iteration",
        number: "08",
        heading: "Keeping the tested structure, refining the interface",
        body: [
          "After testing, I later revisited the visual design. The tested information architecture and task flows remained intact, while the interface was refined into a cleaner and more contemporary visual system.",
          {
            kind: "note",
            text: "Because this version came after the usability study, it should not be presented as already validated.",
          },
          "That refinement focused on:",
        ],
        insights: [
          {
            heading: "Task-based dashboard",
            body: "Frequently used tasks are easier to reach from one starting point.",
          },
          {
            heading: "Persistent navigation and search",
            body: "Important areas remain accessible across the portal.",
          },
          {
            heading: "Visible deadlines and status",
            body: "Dates, missing documents and important notices receive stronger visual priority.",
          },
          {
            heading: "Responsive tables and forms",
            body: "Dense information adapts more clearly across different screen sizes.",
          },
          {
            heading: "Consistent components",
            body: "Forms, buttons, tables and states follow the same visual system.",
          },
          {
            heading: "Restrained visual language",
            body: "A simpler palette and clearer hierarchy reduce unnecessary visual noise.",
          },
        ],
        images: [
          { aspect: "6927/3918", caption: "Initial visual iteration of the dashboard.", src: "/images/qis-first-iteration.webp", alt: "An early version of the refined QIS dashboard, before the layout was settled" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "09",
        heading: "A portal organised around student actions",
        body: [
          "The final concept combines the research-led information architecture and tested task flows with a cleaner visual system.",
          "The strongest change is not simply how QIS looks. The redesigned interface gives priority to the actions students need to complete instead of reflecting the internal structure of the university system.",
          {
            kind: "figures",
            items: [
              { aspect: "1900/1636", caption: "Final interface across sixteen screens.", src: "/images/qis-final-screens.webp", alt: "A board of the sixteen final QIS Portal screens" },
              { aspect: "12160/6252", caption: "Design system tokens and components.", src: "/images/qis-design-system.webp", alt: "The design system: colour tokens, type scale, and UI components" },
              { aspect: "1900/1045", caption: "Exam registration state flow.", src: "/images/qis-interaction-flow.webp", alt: "The exam registration flow across five states" },
            ],
          },
        ],
      },
      {
        id: "prototype",
        navLabel: "Prototype",
        number: "10",
        heading: "Try it yourself",
        body: [
          "Here you can explore the interactive prototype and move through the experience yourself.",
          {
            kind: "prototype",
            embed: "https://embed.figma.com/proto/vOFDY00wGrtDhnOLxVtuKo/Qis-Modern?node-id=10-3752&starting-point-node-id=9%3A3669&page-id=4%3A3669&scaling=scale-down&content-scaling=fixed&embed-host=share",
            href: "https://www.figma.com/proto/vOFDY00wGrtDhnOLxVtuKo/Qis-Modern?node-id=10-3752&starting-point-node-id=9%3A3669&page-id=4%3A3669&scaling=scale-down&content-scaling=fixed",
            label: "QIS Portal prototype",
            aspect: "6/5",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "11",
        heading: "What still needs validation",
        body: [
          "The original redesign was tested with 12 participants, but the study was remote and limited in scale. Accessibility was not tested with disabled participants or assistive technologies.",
          "The later visual iteration also needs renewed usability testing because the interface has changed, even though the underlying structure remains the same.",
          { kind: "h3", text: "What I learned" },
          "QIS taught me that redesigning an interface should start with structure, not styling.",
          "The most important decisions came from understanding which tasks mattered, simplifying the information architecture and then building a consistent visual and interaction system around those priorities.",
        ],
      },
    ],
  },
  de: {
    slug: "qis-portal",
    name: "QIS-Portal Redesign",
    headline: "Ein fragmentiertes Hochschulportal rund um die Aufgaben der Studierenden neu gestalten.",
    summary:
      "Ein forschungsbasiertes Redesign des QIS-Studierendenportals mit Fokus auf Informationsarchitektur, Navigation und klarere Aufgabenabläufe.",
    tags: [...PROJECT_TAGS["qis-portal"]],
    context: "Semesterprojekt",
    role: "UX/UI Designerin & Researcherin",
    team: "Gemeinsames Teamprojekt",
    contribution: "Den Großteil der UX-, Interface- und Usability-Arbeit umgesetzt. Das Team unterstützte die Umfragen.",
    tools: "",
    heroImage: {
      src: "/images/hero-qis-portal.webp",
      alt: "Das überarbeitete QIS-Portal auf drei Screens, neben dem Projektnamen",
      aspect: "1920/1080",
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
            text: "201 Umfrage-Antworten aus zwei Umfragen · 21 → 14 Seiten · 12 Test-Teilnehmende · ≈ 90,6 durchschnittlicher SUS-Wert",
          },
          "QIS wird von Studierenden der Technischen Hochschule Lübeck für Aufgaben wie Prüfungsanmeldung, Noteneinsicht, den Download von Bescheinigungen und die Verwaltung von Semesterinformationen genutzt.",
          "Ich übernahm den größten Teil der UX-, Interface- und Usability-Arbeit, während das Team die Umfragen unterstützte. Das Redesign konzentrierte sich darauf, das Portal rund um studentische Aufgaben zu strukturieren und gleichzeitig ein klareres, moderneres und leichter navigierbares Interface zu entwickeln.",
          {
            kind: "figures",
            items: [
              { aspect: "1194/834", caption: "Das ursprüngliche QIS-Portal vor dem Redesign: die Notenübersicht.", src: "/images/qis-original-overview.webp", alt: "Das bestehende QIS-Portal: die Notenübersicht im heutigen Stand" },
              { aspect: "880/620", caption: "Die bestehende Login-Seite.", src: "/images/qis-original-login.webp", alt: "Die Login-Seite des bestehenden Portals" },
              { aspect: "876/745", caption: "Der bestehende Prüfungsanmeldungs-Baum.", src: "/images/qis-original-exams.webp", alt: "Der Prüfungsanmeldungs-Baum des bestehenden Portals" },
            ],
          },
        ],
      },
      {
        id: "challenge",
        navLabel: "Kontext & Herausforderung",
        number: "02",
        heading: "Wichtige Informationen, schwer zu finden",
        body: [
          "Das bestehende Portal enthielt relevante Informationen, doch seine Struktur machte alltägliche Aufgaben unnötig schwierig. Kleine Typografie, verschachtelte Seiten, eine schwache Hierarchie und inkonsistente Navigation erschwerten die Orientierung.",
          "Die Herausforderung bestand daher nicht nur darin, das Interface zu modernisieren. Auch die zugrunde liegende Struktur musste klarer werden.",
        ],
        designQuestion:
          "Wie kann das Portal rund um die Aufgaben der Studierenden neu strukturiert werden, damit wichtige Informationen leichter zu finden und zu nutzen sind?",
      },
      {
        id: "research",
        navLabel: "Recherche",
        number: "03",
        heading: "Verstehen, wo Studierende Schwierigkeiten hatten",
        body: [
          "Wir begannen mit einer offenen Umfrage, um herauszufinden, was Studierende an QIS gut fanden, was sie störte und was sie verbessern wollten.",
          "In den Antworten wiederholten sich vor allem dieselben Probleme: zu viele Klicks, unklare Navigation, schlechte mobile Nutzung und Schwierigkeiten beim Finden wichtiger Aufgaben wie der Prüfungsanmeldung.",
          { kind: "h3", text: "Wiederkehrende Probleme messbar machen" },
          "Anschließend führten wir eine strukturierte Umfrage durch, um zu verstehen, wie verbreitet diese Probleme waren und welche Bereiche des Portals für Studierende besonders wichtig waren.",
          {
            kind: "split",
            heading: "Relevante Inhalte, schwieriges Interface",
            body: [
              "Die meisten Studierenden empfanden die Informationen in QIS als relevant, aber nur 6 von 101 beschrieben das aktuelle Layout als intuitiv und benutzerfreundlich.",
            ],
            figure: { aspect: "860/332", caption: "Wie Studierende die Inhalte des Portals im Vergleich zum Layout bewerteten.", src: "/images/qis-chart-content-vs-interface-de.webp", alt: "Balkendiagramm: 73 % bewerteten die Inhalte als relevant oder sehr relevant, 6 % empfanden das aktuelle Layout als intuitiv und benutzerfreundlich" },
          },
          {
            kind: "note",
            text: "Erkenntnis: Das Hauptproblem waren nicht die Informationen selbst, sondern ihre Struktur und Zugänglichkeit.",
          },
          {
            kind: "split",
            heading: "Einige Bereiche erhöhten die Komplexität, obwohl sie kaum genutzt wurden",
            body: [
              "85 % nutzten „Studentisches Leben“ selten oder gar nicht. 88 % hatten „Amtliche Statistik“ noch nie genutzt.",
            ],
            figure: { aspect: "860/332", caption: "Angegebene Nutzung der beiden am wenigsten besuchten Bereiche.", src: "/images/qis-chart-low-use-sections-de.webp", alt: "Balkendiagramm: 85 % nutzten Studentisches Leben selten oder gar nicht, 88 % hatten Amtliche Statistik noch nie genutzt" },
          },
          {
            kind: "note",
            text: "Erkenntnis: Wenig genutzte Bereiche konnten niedriger priorisiert oder neu gruppiert werden, um die Navigation zu vereinfachen.",
          },
          {
            kind: "split",
            heading: "Worauf Studierende schneller zugreifen wollten",
            body: [
              "Auf die Frage, was sie schneller erreichen wollten, nannten Studierende praktische Aufgaben im Studienalltag deutlich häufiger als alles andere.",
            ],
            figure: { aspect: "860/458", caption: "Die vier am häufigsten gewünschten Abkürzungen, nach Anzahl der Nennungen.", src: "/images/qis-chart-requested-features-de.webp", alt: "Balkendiagramm der gewünschten Funktionen: Prüfungspläne 92, Krankmeldung hochladen 67, Kontaktdaten der Lehrenden 45, Studentenmail 29" },
          },
          {
            kind: "note",
            text: "Erkenntnis: Studierende wollten schneller auf praktische Aufgaben im Studienalltag zugreifen können.",
          },
          {
            kind: "split",
            heading: "Die meisten Studierenden nutzten QIS nur gelegentlich",
            body: [
              "79 % nutzten QIS monatlich oder nur ein bis drei Mal pro Semester.",
            ],
            figure: { aspect: "860/184", caption: "Wie häufig Studierende das Portal öffneten.", src: "/images/qis-chart-occasional-use-de.webp", alt: "Balkendiagramm: 79 % nutzten QIS monatlich oder nur ein bis drei Mal pro Semester" },
          },
          {
            kind: "note",
            text: "Erkenntnis: Die Navigation musste auch nach längeren Pausen schnell verständlich sein, ohne dass Studierende sich merken mussten, wo alles zu finden ist.",
          },
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Recherche in Designprioritäten übersetzen",
        insights: [
          {
            heading: "Wiedererkennung statt Erinnerung",
            body: "Da die meisten Studierenden QIS nur gelegentlich nutzten, musste die Struktur auch nach längeren Pausen verständlich bleiben.",
          },
          {
            heading: "Wichtige Aufgaben schneller erreichbar machen",
            body: "Prüfungsinformationen und andere praktische Aufgaben im Studienalltag brauchten mehr Priorität und weniger Schritte.",
          },
          {
            heading: "Unnötige Komplexität reduzieren",
            body: "Selten genutzte Bereiche konnten neu gruppiert oder niedriger priorisiert werden, um die Informationsarchitektur zu vereinfachen.",
          },
          {
            heading: "Struktur vor Styling",
            body: "Die Recherche zeigte, dass ein neues visuelles Design allein die wichtigsten Probleme nicht lösen würde. Navigation und Informationsarchitektur mussten zuerst überarbeitet werden.",
          },
        ],
      },
      {
        id: "architecture",
        navLabel: "Informationsarchitektur",
        number: "05",
        heading: "Erst strukturieren, dann gestalten",
        body: [
          "Das bestehende Portal umfasste 21 Seiten, darunter mehrere eng verwandte oder redundante Pfade.",
          "Wir strukturierten die Inhalte nach Aufgaben neu und reduzierten die Architektur auf 14 Seiten, während die zentralen Funktionen erhalten blieben. Verwandte Inhalte wurden zusammengeführt und sekundäre Informationen niedriger priorisiert.",
          {
            kind: "figures",
            items: [
              { aspect: "1658/949", caption: "Ursprüngliche Architektur (21 Seiten).", src: "/images/qis-structure-21.webp", alt: "Die bestehende Informationsarchitektur: 21 Seiten über vier Ebenen" },
              { aspect: "1900/828", caption: "Neu strukturierte Architektur (14 Seiten).", src: "/images/qis-structure-14.webp", alt: "Die überarbeitete Architektur: 14 Seiten, verwandte Funktionen zusammengeführt" },
            ],
          },
          { kind: "h3", text: "Die neue Struktur erkunden" },
          "Bevor wir mit dem detaillierten Interface-Design begannen, entwickelten wir Low-Fidelity-Prototypen für Bereiche wie Prüfungsanmeldung, Noten, Studienverlauf, Bescheinigungen und Gebühren.",
          "So konnten wir Seitenbeziehungen, Informationspriorität und die Schritte für häufige Aufgaben untersuchen.",
          {
            kind: "figures",
            items: [
              { aspect: "2800/1840", caption: "Frühe Prototypen der Abläufe.", src: "/images/qis-paper-prototypes.webp", alt: "Der Lo-Fi-Wireframe-Ablauf: Login, Dashboard, Semesterübersicht, Prüfungsanmeldung und Notenspiegel, durch Pfeile verbunden" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Designentwicklung",
        number: "06",
        heading: "Die neue Struktur in ein Interface übersetzen",
        body: [
          "Nachdem die neue Architektur feststand, entwickelten wir darauf aufbauend ein visuelles und interaktives System.",
          "Ziel war nicht nur, QIS moderner aussehen zu lassen. Das Interface sollte Hierarchien klarer machen, vorhersehbare Muster schaffen und den Aufwand reduzieren, der nötig ist, um eine Seite zu verstehen.",
          { kind: "h3", text: "Farbe und Typografie" },
          "Die Verbindung zur Technischen Hochschule Lübeck blieb durch Rot, Weiß und Schwarz sowie hellere Abstufungen erhalten. Zusätzliche Statusfarben halfen dabei, positive, negative und dazwischenliegende Zustände zu unterscheiden.",
          "Die Typografie erhielt eine klarere Hierarchie mit stärker hervorgehobenen Überschriften und besser lesbaren Interface-Texten.",
          { kind: "h3", text: "Konsistente Navigation entwickeln" },
          "Eine gemeinsame Navigation wurde über das Portal hinweg eingesetzt, damit Studierende nicht für jeden Bereich ein anderes Muster lernen mussten. Dropdowns gruppierten zusammengehörige Bereiche, während die Seitenhierarchie den aktuellen Standort und mögliche nächste Schritte klarer machte.",
          { kind: "h3", text: "Aktionen leichter erkennbar machen" },
          "Buttons und Icons wurden als konsistentes System gestaltet, damit häufige Aktionen im gesamten Portal ähnlich aussehen und funktionieren. Primäre Aktionen erhielten stärkere visuelle Priorität, während sekundäre Aktionen zurückhaltender gestaltet wurden.",
          { kind: "h3", text: "Informationsmenge reduzieren" },
          "Einige Seiten enthielten sehr viele Informationen gleichzeitig. Akkordeons wurden dort eingesetzt, wo Inhalte schrittweise gezeigt werden konnten, statt alles direkt sichtbar zu machen. Auch Formulare folgten einer konsistenteren Struktur, damit Labels, Felder und Aktionen leichter erfasst werden konnten.",
          { kind: "h3", text: "Komplexe Informationen übersichtlicher machen" },
          "Tabellen erhielten klarere Abstände, Hierarchien und Statusinformationen, damit Inhalte wie Noten und Studieninformationen schneller erfasst werden konnten.",
          "Für wichtige Aktionen wurden außerdem Bestätigungs-Pop-ups eingesetzt, um unbeabsichtigte Änderungen bei Aufgaben wie der Prüfungsanmeldung zu vermeiden.",
          { kind: "h3", text: "Das System zusammenführen" },
          "Die Low-Fidelity-Struktur und die Interface-Muster wurden anschließend zu einem vollständigen High-Fidelity-Prototyp weiterentwickelt. Diese Version verband die neue Navigation, Typografie, Farben, Formulare, Tabellen und Interaktionsmuster über die wichtigsten QIS-Seiten hinweg.",
        ],
      },
      {
        id: "testing",
        navLabel: "Usability Testing",
        number: "07",
        heading: "Sieben zentrale Aufgaben testen",
        body: [
          "Wir testeten den High-Fidelity-Prototyp remote mit 12 Teilnehmenden anhand von sieben studentischen Aufgaben. Anschließend füllten sie einen System-Usability-Scale-Fragebogen aus.",
          "Die SUS-Werte lagen zwischen 77,5 und 100, mit einem Durchschnitt von ungefähr 90,6. Besonders positiv wurden Navigation, Lesbarkeit, die klarere Struktur und die einfachere Aufgabenbearbeitung bewertet.",
          "Die Ergebnisse waren vielversprechend, stammen jedoch aus einer kleinen akademischen Remote-Studie und sollten nicht als Nachweis produktionsreifer Usability verstanden werden.",
          {
            kind: "figures",
            items: [
              { aspect: "1672/941", caption: "Ergebnisse des SUS-Usability-Tests.", src: "/images/qis-sus-chart.webp", alt: "System-Usability-Scale-Werte von zwölf Teilnehmenden, alle auf oder über dem 68-Punkte-Benchmark" },
            ],
          },
        ],
      },
      {
        id: "iteration",
        navLabel: "Visuelle Iteration",
        number: "08",
        heading: "Die getestete Struktur behalten, das Interface weiterentwickeln",
        body: [
          "Nach den Tests überarbeitete ich das visuelle Design später erneut. Die getestete Informationsarchitektur und die Aufgabenabläufe blieben erhalten, während das Interface zu einem klareren und zeitgemäßeren visuellen System weiterentwickelt wurde.",
          {
            kind: "note",
            text: "Da diese Version nach der Usability-Studie entstand, sollte sie nicht als bereits validiert dargestellt werden.",
          },
          "Diese Weiterentwicklung konzentrierte sich auf:",
        ],
        insights: [
          {
            heading: "Aufgabenbasiertes Dashboard",
            body: "Häufig benötigte Aufgaben sind von einem zentralen Einstiegspunkt schneller erreichbar.",
          },
          {
            heading: "Persistente Navigation und Suche",
            body: "Wichtige Bereiche bleiben im gesamten Portal erreichbar.",
          },
          {
            heading: "Sichtbare Fristen und Status",
            body: "Termine, fehlende Dokumente und wichtige Hinweise erhalten mehr visuelle Priorität.",
          },
          {
            heading: "Responsive Tabellen und Formulare",
            body: "Dichte Informationen passen sich klarer an unterschiedliche Bildschirmgrößen an.",
          },
          {
            heading: "Konsistente Komponenten",
            body: "Formulare, Buttons, Tabellen und Zustände folgen einem gemeinsamen visuellen System.",
          },
          {
            heading: "Zurückhaltende visuelle Sprache",
            body: "Eine einfachere Farbpalette und klarere Hierarchie reduzieren unnötige visuelle Unruhe.",
          },
        ],
        images: [
          { aspect: "6927/3918", caption: "Initiale visuelle Iteration des Dashboards.", src: "/images/qis-first-iteration.webp", alt: "Eine frühe Version des überarbeiteten QIS-Dashboards, bevor das Layout feststand" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "09",
        heading: "Ein Portal rund um studentische Handlungen",
        body: [
          "Das finale Konzept verbindet die forschungsbasierte Informationsarchitektur und die getesteten Aufgabenabläufe mit einem klareren visuellen System.",
          "Die wichtigste Veränderung liegt nicht nur darin, wie QIS aussieht. Das neu gestaltete Interface priorisiert die Aufgaben, die Studierende tatsächlich erledigen müssen, statt die interne Struktur des Hochschulsystems abzubilden.",
          {
            kind: "figures",
            items: [
              { aspect: "1900/1636", caption: "Finales Interface aller 16 Screens.", src: "/images/qis-final-screens.webp", alt: "Ein Board der sechzehn finalen Screens des QIS-Portals, von Login und Startseite über die Prüfungsanmeldung bis zu Notenspiegel und Kontoeinstellungen" },
              { aspect: "12160/6252", caption: "Designsystem-Tokens und Komponenten.", src: "/images/qis-design-system.webp", alt: "Das Designsystem: Marken-, Neutral- und Status-Farbtokens, eine zwölfstufige Inter-Typoskala, Buttons, Eingaben, Status-Pills, Akkordeons, Menüs, Benachrichtigungen und Dialoge" },
              { aspect: "1900/1045", caption: "Ablauf der Prüfungsanmeldung.", src: "/images/qis-interaction-flow.webp", alt: "Der Ablauf der Prüfungsanmeldung über fünf Zustände, von nicht angemeldet über den Bestätigungsdialog bis abgemeldet, darunter die Zustände von Akkordeon, Navigation und Buttons" },
            ],
          },
        ],
      },
      {
        id: "prototype",
        navLabel: "Prototyp",
        number: "10",
        heading: "Selbst ausprobieren",
        body: [
          "Hier können Sie den interaktiven Prototyp erkunden und sich selbst durch das Erlebnis bewegen.",
          {
            kind: "prototype",
            embed: "https://embed.figma.com/proto/vOFDY00wGrtDhnOLxVtuKo/Qis-Modern?node-id=10-3752&starting-point-node-id=9%3A3669&page-id=4%3A3669&scaling=scale-down&content-scaling=fixed&embed-host=share",
            href: "https://www.figma.com/proto/vOFDY00wGrtDhnOLxVtuKo/Qis-Modern?node-id=10-3752&starting-point-node-id=9%3A3669&page-id=4%3A3669&scaling=scale-down&content-scaling=fixed",
            label: "QIS-Portal-Prototyp",
            aspect: "6/5",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "11",
        heading: "Was noch validiert werden muss",
        body: [
          "Das ursprüngliche Redesign wurde mit 12 Teilnehmenden getestet, die Studie fand jedoch remote und in begrenztem Umfang statt. Barrierefreiheit wurde nicht mit Menschen mit Behinderungen oder assistiven Technologien getestet.",
          "Auch die spätere visuelle Iteration benötigt erneute Usability-Tests, da sich das Interface verändert hat, obwohl die zugrunde liegende Struktur gleich geblieben ist.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "QIS hat mir gezeigt, dass ein Interface-Redesign mit der Struktur und nicht mit dem Styling beginnen sollte.",
          "Die wichtigsten Entscheidungen entstanden dadurch, zuerst zu verstehen, welche Aufgaben relevant sind, die Informationsarchitektur zu vereinfachen und anschließend ein konsistentes visuelles und interaktives System darum aufzubauen.",
        ],
      },
    ],
  },
};

export default qisPortal;
