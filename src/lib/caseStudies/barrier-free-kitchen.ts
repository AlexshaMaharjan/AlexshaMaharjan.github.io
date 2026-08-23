import type { CaseStudyLocaleContent } from "./types";

const barrierFreeKitchen: CaseStudyLocaleContent = {
  en: {
    slug: "barrier-free-kitchen",
    name: "Barrier-Free Kitchen",
    projectTag: "Barrier-Free Kitchen",
    headline: "Designing a kitchen through reach, sight and touch.",
    summary:
      "This inclusive-design project explores how a kitchen can better support wheelchair users and people with cataracts. The concept was developed through observation, an interview, embodied testing, physical prototypes and a final animated Blender environment.",
    tags: ["Inclusive Design", "Design Research", "Spatial Design", "Physical Prototyping", "3D Visualisation"],
    role: "Prototyping & 3D Designer",
    contribution: "Created paper and 3D models, materials and textures, and participated in testing.",
    type: "Collaborative university project",
    year: "",
    tools: "",
    deliverables: "Final rendering by a team member.",
    heroImage: { src: "/images/frame-6-mrtp0czu-dh8i.png", alt: "Final kitchen render, full width", aspect: "16/7.5" },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "The project focused on two user groups: wheelchair users and people with visual impairment, particularly cataracts.",
          "The process began with the investigation of existing kitchens and everyday tasks. The team then developed spatial concepts using wooden blocks and Lego, mapped a complete cooking journey, built full-scale paper prototypes and translated the resulting system into a Blender environment with an animated wheelchair user.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Challenge",
        number: "02",
        heading: "Standard kitchen layouts assume a narrow range of bodies and abilities.",
        body: [
          "Conventional kitchens frequently place storage, controls and work surfaces outside the comfortable reach of wheelchair users. They also depend heavily on visual cues such as small text, weak contrast, smooth touch controls and transparent containers.",
          "These barriers can make simple actions slower, unsafe or impossible without assistance.",
        ],
        designQuestion:
          "How might a kitchen support more independent use when reach, mobility and visual perception are limited?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Studying real actions rather than isolated dimensions",
        body: [
          {
            kind: "list",
            items: [
              "An interview with a person affected by cataracts",
              "Observation of a participant using a kitchen",
              "Simulated wheelchair-use scenarios",
              "Simulated visual impairment using cataract glasses",
              "Task-based testing with three participants",
            ],
          },
          "The team examined typical actions including opening cabinets, locating objects, operating appliances, using the sink, reading labels, sitting at a table and identifying controls through touch.",
          {
            kind: "note",
            text: "Research note: Simulation can reveal obvious spatial and perceptual barriers, but it does not reproduce the lived experience of disability.",
          },
        ],
        images: [
          { aspect: "4/3", caption: "[ kitchen observation ]" },
          { aspect: "4/3", caption: "[ simulation testing ]" },
        ],
      },
      {
        id: "direction",
        navLabel: "Framework",
        number: "04",
        heading: "Sight, action and tactile space",
        insights: [
          {
            heading: "Sight",
            body: "What can be seen, distinguished and understood visually? Contrast · text size · lighting · object differentiation · visibility of controls · visual organisation",
          },
          {
            heading: "Action",
            body: "Where can a person reach, move and perform an action? Turning space · reach distance · worktop height · under-clearance · cabinet depth · access to appliances",
          },
          {
            heading: "Touch",
            body: "What can be identified and controlled through touch? Tactile markers · distinct handle forms · physical buttons · control position · surface differences · feedback",
          },
        ],
        body: [
          { kind: "h3", text: "Key barriers" },
          {
            kind: "list",
            items: [
              "Sight — Small labels · weak contrast · transparent containers · thin markings · dark storage · similar containers",
              "Reach — High cabinets · deep surfaces · inaccessible taps · insufficient clearance · narrow entrances · objects too far back",
              "Touch — Similar controls · small tactile markers · touch surfaces without feedback · identical handles · unclear induction areas",
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Concept development",
        number: "05",
        heading: "Moving from observations to spatial relationships",
        body: [
          "Wooden blocks were used to explore the general relationship between storage, work surfaces, appliances and movement areas. Lego Serious Play allowed the team to compare different room arrangements and discuss where important actions should occur.",
          "A journey map then connected these spatial decisions to a complete sequence. This prevented the design from focusing on isolated features without considering the complete cooking process.",
          {
            kind: "list",
            ordered: true,
            items: [
              "Storage or refrigerator",
              "Sink",
              "Work surface",
              "Hob and oven",
              "Dining area",
            ],
          },
        ],
        images: [
          { aspect: "4/3", caption: "[ wooden blocks ]" },
          { aspect: "4/3", caption: "[ lego study ]" },
          { aspect: "4/3", caption: "[ journey map ]" },
        ],
      },
      {
        id: "testing",
        navLabel: "Full-scale testing",
        number: "06",
        heading: "Testing the kitchen at the scale of the body",
        body: [
          "Paper prototypes were built at full scale to test cabinet positions, work surfaces, sink access, oven controls, handles and movement space. This stage revealed problems that were difficult to identify in small models. Reach distances, turning areas and control positions could be evaluated through actual movement.",
          "Observations were translated directly into revisions rather than being treated as final confirmation.",
        ],
        images: [
          { aspect: "4/3", caption: "[ full-scale prototype ]" },
          { aspect: "4/3", caption: "[ testing session ]" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Principles & outcome",
        number: "07",
        heading: "Five final principles",
        insights: [
          {
            heading: "Adjustable reach",
            body: "Height-adjustable worktops, storage and selected appliances allow the environment to respond to different seated and standing users.",
          },
          {
            heading: "Clear movement",
            body: "Turning space and under-clearance allow wheelchair users to approach work areas more directly.",
          },
          {
            heading: "Strong visual contrast",
            body: "Black and white contrast makes handles, labels, controls and functional areas easier to distinguish.",
          },
          {
            heading: "Tactile differentiation",
            body: "Buttons, handles and control areas use different physical forms. Tactile squares on the induction surface help users locate cooking zones without relying only on vision.",
          },
          {
            heading: "Organised storage",
            body: "Frequently used items are placed within accessible zones and should be distinguishable through position, labelling and container form.",
          },
        ],
        body: [
          { kind: "h3", text: "Translating research into a spatial prototype" },
          "The final design was modelled in Blender and populated with appliances, storage, work surfaces and accessibility features. An animated wheelchair user demonstrates how the kitchen could function across different tasks.",
          "EEVEE was used for the final animation because a Cycles render was estimated to require approximately 26 days. This reduced rendering time but resulted in darker materials and lower visual quality. The compromise is acknowledged rather than hidden.",
        ],
        images: [
          { aspect: "16/9", caption: "[ blender environment + animation — large showcase ]" },
          { aspect: "16/10", caption: "[ 3d model process ]" },
          { aspect: "16/10", caption: "[ materials + textures ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "08",
        heading: "Formative evidence, not comprehensive validation",
        body: [
          "The process provides useful formative evidence through observation, one interview, three participant tests and full-scale prototyping. It does not represent comprehensive validation with a diverse group of wheelchair users and people with different forms and stages of visual impairment.",
          {
            kind: "list",
            items: [
              "Simulated disability experience",
              "Small number of participants",
              "No long-term kitchen use",
              "No engineering validation and no safety or building-code verification",
              "No physical production of the adjustable mechanisms",
              "Reduced final render quality",
            ],
          },
          "A future phase should include co-design with disabled participants from the beginning, occupational-therapy expertise and technical feasibility testing.",
          { kind: "h3", text: "What I learned" },
          "This project showed me that accessibility problems are often created by ordinary design decisions that are treated as neutral. A cabinet height, smooth control surface or low-contrast label may appear minor until it prevents a person from completing a basic action independently.",
          "The most valuable stage was full-scale testing. Several issues only became visible when the environment was experienced through movement rather than viewed as a drawing. The next iteration should involve disabled participants as design partners rather than relying mainly on simulation.",
        ],
      },
    ],
  },
  de: {
    slug: "barrier-free-kitchen",
    name: "Barrierefreie Küche",
    projectTag: "Barrierefreie Küche",
    headline: "Eine Küche durch Reichweite, Sehen und Berührung gestalten.",
    summary:
      "Dieses Inclusive-Design-Projekt untersucht, wie eine Küche Menschen im Rollstuhl und Personen mit Grauem Star besser unterstützen kann. Das Konzept entstand durch Beobachtung, ein Interview, Selbsterfahrung, physische Prototypen und eine abschließende animierte Blender-Umgebung.",
    tags: ["Inclusive Design", "Design Research", "Spatial Design", "Physical Prototyping", "3D Visualisation"],
    role: "Prototyping & 3D Design",
    contribution: "Papier- und 3D-Modelle, Materialien und Texturen erstellt sowie an Tests mitgewirkt.",
    type: "Gemeinsames Hochschulprojekt",
    year: "",
    tools: "",
    deliverables: "Finales Rendering von einem Teammitglied.",
    heroImage: { src: "/images/frame-6-mrtp0czu-dh8i.png", alt: "Finales Küchen-Rendering, volle Breite", aspect: "16/7.5" },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "Im Mittelpunkt standen zwei Nutzergruppen: Menschen im Rollstuhl und Menschen mit einer Sehbeeinträchtigung, insbesondere Grauem Star.",
          "Der Prozess begann mit der Untersuchung bestehender Küchen und alltäglicher Handlungen. Anschließend entwickelte das Team räumliche Konzepte mit Holzklötzen und Lego, erstellte eine vollständige Journey Map, baute Papierprototypen im Maßstab 1:1 und übertrug das resultierende System in eine Blender-Umgebung mit einer animierten Rollstuhlnutzerin.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Herausforderung",
        number: "02",
        heading: "Standardküchen setzen einen engen Bereich körperlicher Fähigkeiten voraus.",
        body: [
          "Konventionelle Küchen platzieren Stauraum, Bedienelemente und Arbeitsflächen häufig außerhalb der komfortablen Reichweite von Menschen im Rollstuhl. Gleichzeitig verlassen sie sich stark auf visuelle Hinweise wie kleine Schrift, schwache Kontraste, glatte Touch-Bedienungen und transparente Behälter.",
          "Diese Barrieren können einfache Handlungen verlangsamen, unsicher machen oder ohne Unterstützung unmöglich werden lassen.",
        ],
        designQuestion:
          "Wie kann eine Küche selbstständigere Nutzung unterstützen, wenn Reichweite, Mobilität und visuelle Wahrnehmung eingeschränkt sind?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Reale Handlungen statt isolierter Maße untersuchen",
        body: [
          {
            kind: "list",
            items: [
              "Ein Interview mit einer Person mit Grauem Star",
              "Beobachtung einer Testperson bei der Küchennutzung",
              "Simulierte Nutzung aus einer Rollstuhl-Situation",
              "Simulierte Sehbeeinträchtigung mit einer Grauer-Star-Brille",
              "Aufgabenbasierte Tests mit drei Teilnehmenden",
            ],
          },
          "Untersucht wurden typische Handlungen wie das Öffnen von Schränken, das Finden von Gegenständen, die Bedienung von Geräten, die Nutzung der Spüle, das Lesen von Beschriftungen, das Sitzen am Tisch und das Erkennen von Bedienelementen durch Berührung.",
          {
            kind: "note",
            text: "Hinweis: Simulation kann offensichtliche räumliche und wahrnehmungsbezogene Barrieren sichtbar machen, ersetzt jedoch nicht die gelebte Erfahrung von Behinderung.",
          },
        ],
        images: [
          { aspect: "4/3", caption: "[ küchenbeobachtung ]" },
          { aspect: "4/3", caption: "[ simulationstest ]" },
        ],
      },
      {
        id: "direction",
        navLabel: "Framework",
        number: "04",
        heading: "Sehraum, Wirkraum und Tastraum",
        insights: [
          {
            heading: "Sehraum",
            body: "Was kann visuell gesehen, unterschieden und verstanden werden? Kontrast · Textgröße · Beleuchtung · Unterscheidbarkeit · Sichtbarkeit der Bedienelemente · visuelle Ordnung",
          },
          {
            heading: "Wirkraum",
            body: "Wo kann eine Person hinreichen, sich bewegen und eine Handlung ausführen? Wendefläche · Reichweite · Arbeitshöhe · Unterfahrbarkeit · Schranktiefe · Zugang zu Geräten",
          },
          {
            heading: "Tastraum",
            body: "Was kann durch Berührung erkannt und gesteuert werden? Taktile Marker · unterscheidbare Griffe · physische Tasten · Position der Bedienelemente · Oberflächenunterschiede · Feedback",
          },
        ],
        body: [
          { kind: "h3", text: "Zentrale Barrieren" },
          {
            kind: "list",
            items: [
              "Sehen — Kleine Beschriftungen · schwacher Kontrast · transparente Behälter · dünne Markierungen · dunkler Stauraum · ähnliche Behälter",
              "Reichweite — Hohe Schränke · tiefe Flächen · unzugängliche Armaturen · fehlende Unterfahrbarkeit · schmale Zugänge · zu weit entfernte Objekte",
              "Tasten — Ähnliche Bedienelemente · kleine taktile Marker · Touch-Flächen ohne Feedback · identische Griffe · unklare Induktionsbereiche",
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Konzeptentwicklung",
        number: "05",
        heading: "Beobachtungen in räumliche Beziehungen übersetzen",
        body: [
          "Holzklötze wurden verwendet, um die grundlegenden Beziehungen zwischen Stauraum, Arbeitsflächen, Geräten und Bewegungsbereichen zu untersuchen. Lego Serious Play ermöglichte den Vergleich verschiedener Raumaufteilungen und half bei der Diskussion, wo wichtige Handlungen stattfinden sollten.",
          "Eine Journey Map verband diese räumlichen Entscheidungen anschließend zu einer vollständigen Abfolge. Dadurch konzentrierte sich das Design nicht nur auf einzelne Funktionen, sondern auf den vollständigen Kochprozess.",
          {
            kind: "list",
            ordered: true,
            items: [
              "Stauraum oder Kühlschrank",
              "Spüle",
              "Arbeitsfläche",
              "Herd und Ofen",
              "Essbereich",
            ],
          },
        ],
        images: [
          { aspect: "4/3", caption: "[ holzklötze ]" },
          { aspect: "4/3", caption: "[ lego-studie ]" },
          { aspect: "4/3", caption: "[ journey map ]" },
        ],
      },
      {
        id: "testing",
        navLabel: "Test im Maßstab 1:1",
        number: "06",
        heading: "Die Küche im Maßstab des Körpers testen",
        body: [
          "Papierprototypen wurden im Maßstab 1:1 gebaut, um Schrankpositionen, Arbeitsflächen, Spülenzugang, Ofenbedienung, Griffe und Bewegungsflächen zu testen. Diese Phase machte Probleme sichtbar, die in kleinen Modellen schwer zu erkennen waren. Reichweiten, Wendeflächen und Positionen von Bedienelementen konnten durch tatsächliche Bewegung überprüft werden.",
          "Die Beobachtungen wurden direkt in Überarbeitungen übersetzt und nicht als reine Bestätigung des ersten Konzepts behandelt.",
        ],
        images: [
          { aspect: "4/3", caption: "[ prototyp im maßstab 1:1 ]" },
          { aspect: "4/3", caption: "[ testsitzung ]" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Prinzipien & Ergebnis",
        number: "07",
        heading: "Fünf Gestaltungsprinzipien",
        insights: [
          {
            heading: "Anpassbare Reichweite",
            body: "Höhenverstellbare Arbeitsflächen, Stauraum und ausgewählte Geräte lassen die Umgebung auf unterschiedliche sitzende und stehende Nutzer reagieren.",
          },
          {
            heading: "Klare Bewegung",
            body: "Wendeflächen und Unterfahrbarkeit ermöglichen Rollstuhlnutzern einen direkteren Zugang zu Arbeitsbereichen.",
          },
          {
            heading: "Starker visueller Kontrast",
            body: "Schwarz-Weiß-Kontraste machen Griffe, Beschriftungen, Bedienelemente und Funktionsbereiche leichter unterscheidbar.",
          },
          {
            heading: "Taktile Unterscheidung",
            body: "Tasten, Griffe und Bedienbereiche nutzen unterschiedliche physische Formen. Taktile Quadrate auf dem Induktionsfeld helfen, Kochzonen ohne reinen Sehbezug zu finden.",
          },
          {
            heading: "Organisierter Stauraum",
            body: "Häufig genutzte Gegenstände liegen in erreichbaren Zonen und sind durch Position, Beschriftung und Behälterform unterscheidbar.",
          },
        ],
        body: [
          { kind: "h3", text: "Recherche in einen räumlichen Prototyp übersetzen" },
          "Das finale Design wurde in Blender modelliert und mit Geräten, Stauraum, Arbeitsflächen und barrierearmen Funktionen ergänzt. Eine animierte Rollstuhlnutzerin zeigt, wie die Küche bei unterschiedlichen Aufgaben funktionieren könnte.",
          "Für die finale Animation wurde EEVEE verwendet, da eine Berechnung mit Cycles schätzungsweise etwa 26 Tage benötigt hätte. Dadurch wurde die Renderzeit reduziert, gleichzeitig entstanden jedoch dunklere Materialien und eine geringere visuelle Qualität. Dieser Kompromiss wird transparent dargestellt.",
        ],
        images: [
          { aspect: "16/9", caption: "[ blender-umgebung + animation — große präsentation ]" },
          { aspect: "16/10", caption: "[ 3d-modell-prozess ]" },
          { aspect: "16/10", caption: "[ materialien + texturen ]" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "08",
        heading: "Formative Erkenntnisse, keine umfassende Validierung",
        body: [
          "Der Prozess liefert nützliche formative Erkenntnisse durch Beobachtung, ein Interview, Tests mit drei Personen und Prototyping im Maßstab 1:1. Er stellt keine umfassende Validierung mit einer vielfältigen Gruppe von Rollstuhlnutzern und Personen mit unterschiedlichen Formen visueller Beeinträchtigung dar.",
          {
            kind: "list",
            items: [
              "Simulierte Behinderungserfahrung",
              "Kleine Anzahl an Teilnehmenden",
              "Keine langfristige Küchennutzung",
              "Keine technische Validierung und keine Prüfung von Sicherheits- oder Bauvorschriften",
              "Keine physische Umsetzung der verstellbaren Mechanismen",
              "Reduzierte Qualität des finalen Renderings",
            ],
          },
          "Eine zukünftige Phase sollte Co-Design mit behinderten Teilnehmenden von Beginn an, ergotherapeutische Expertise und technische Machbarkeitstests einbeziehen.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "Dieses Projekt hat mir gezeigt, dass Barrieren häufig durch alltägliche Designentscheidungen entstehen, die als neutral betrachtet werden. Eine Schrankhöhe, eine glatte Bedienoberfläche oder eine kontrastarme Beschriftung kann unbedeutend erscheinen, bis sie eine selbstständige Handlung verhindert.",
          "Die wertvollste Phase war das Testen im Maßstab 1:1. Mehrere Probleme wurden erst sichtbar, als die Umgebung durch Bewegung erlebt und nicht nur als Zeichnung betrachtet wurde. Die nächste Iteration sollte behinderte Menschen als Designpartner einbeziehen, anstatt sich hauptsächlich auf Simulation zu verlassen.",
        ],
      },
    ],
  },
};

export default barrierFreeKitchen;
