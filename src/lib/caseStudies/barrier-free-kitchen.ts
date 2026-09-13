import type { CaseStudyLocaleContent } from "./types";
import { PROJECT_TAGS } from "./tags";

/**
 * The barrier-free kitchen, rewritten from the owner's own copy deck
 * (`promt.pdf`, section 13).
 *
 * Two things the deck's figure list does not account for, and why they stay:
 *
 * - **`[HERO / FINAL KITCHEN RENDER]` in §01 is the page's own hero.** The deck
 *   lists it there because that is where it sits when you read the page; it is
 *   `heroImage`, already filled, so §01 gains no figure of its own.
 * - **The reach study, the prototype details and the paper containers keep
 *   their slots.** The deck names one figure where §05 and §06 each have three,
 *   and dropping two exported photographs to match a list is not what a shorter
 *   caption list asks for. They sit in the same groups under their own captions.
 *
 * Gone with the rewrite: the "Key barriers" list in §04 and the six-item
 * limitations list in §08. Both are the owner's cuts. §04 now closes on the
 * three design areas, three-up, and §08 states its limits in prose.
 *
 * Two corrections from the owner's second pass:
 *
 * - **`kitchen-simulation.webp` is cropped to its first panel.** The board held
 *   three photographs side by side, which at the column's width made each one
 *   about 300px across. `kitchen-simulation-hob.webp` is panel one on its own,
 *   in a row of three with the two observation shots, so all three read at the
 *   same size.
 * - **`kitchen-reach-study.webp` is not a reach study.** It is two overhead
 *   shots of a control dial with a raised marker and tactile studs around it.
 *   It had carried the wrong caption and the wrong alt since it was added.
 */
const barrierFreeKitchen: CaseStudyLocaleContent = {
  en: {
    slug: "barrier-free-kitchen",
    name: "Barrier-Free Kitchen",
    headline: "Designing a kitchen through reach, sight and touch.",
    summary:
      "An inclusive kitchen concept developed around the needs of wheelchair users and people with visual impairments, particularly cataracts.",
    tags: [...PROJECT_TAGS["barrier-free-kitchen"]],
    context: "Collaborative university project",
    role: "Prototyping & 3D Designer",
    team: "",
    contribution: "Physical Prototyping · 3D Modelling · Materials & Textures · Testing",
    tools: "Blender",
    heroImage: { src: "/images/hero-barrier-free-kitchen.webp", alt: "The barrier-free kitchen in three 3D renders, beside the project name", aspect: "1920/1080" },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "The project explored how everyday kitchen tasks change when reach, mobility or vision is limited.",
          "Our process moved from observing existing kitchens and everyday actions to spatial experiments, full-scale paper prototypes and a final 3D environment. My main focus was translating the ideas into physical and digital prototypes, developing materials and textures, and taking part in the testing process.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Context & challenge",
        number: "02",
        heading: "When standard dimensions become barriers",
        body: [
          "Conventional kitchens often place storage, work surfaces and controls outside the comfortable reach of wheelchair users. At the same time, small labels, weak contrast and touch-based controls can make everyday tasks more difficult for people with visual impairments.",
          "The challenge was to rethink these ordinary design decisions so that more tasks could be completed safely and independently.",
        ],
        designQuestion:
          "How can a kitchen support more independent use when reach, mobility and visual perception are limited?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Studying everyday actions, not only dimensions",
        body: [
          "We combined observation, an interview and simulated scenarios to understand where everyday kitchen tasks become difficult.",
          "The research included:",
          {
            kind: "list",
            items: [
              "an interview with a person affected by cataracts",
              "observation of a participant using a conventional kitchen",
              "simulated wheelchair-use scenarios",
              "simulated visual impairment using cataract glasses",
              "task-based testing with three participants",
            ],
          },
          "We looked at actions such as reaching storage, using the sink and appliances, finding objects, reading labels and identifying controls through touch.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/3465", caption: "Observing reach and access to storage in a conventional kitchen.", src: "/images/kitchen-observation.webp", alt: "A seated user reaching for the upper cabinet in a conventional kitchen" },
              { aspect: "1600/3465", caption: "Testing access to different areas of a standard refrigerator.", src: "/images/kitchen-observation-fridge.webp", alt: "The same user reaching into the upper shelves of a standard fridge" },
              { aspect: "920/1988", caption: "Reaching the hob controls from a seated position.", src: "/images/kitchen-simulation-hob.webp", alt: "A seated user turning the hob controls in a conventional kitchen" },
            ],
          },
          { kind: "h3", text: "A note on simulation" },
          {
            kind: "note",
            text: "The simulations helped reveal obvious spatial and visual barriers, but they could not reproduce the lived experience of disability. We used them as a way to identify design questions, not as a substitute for research with disabled people.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Design framework",
        number: "04",
        heading: "Turning barriers into three design areas",
        body: [
          "We grouped the research findings into three areas that could guide the design and help us evaluate later concepts.",
        ],
        insightColumns: 3,
        insights: [
          {
            heading: "Sight",
            body: "What needs to be clearly seen and distinguished? Contrast · text size · lighting · clear labels · visible controls · object differentiation",
          },
          {
            heading: "Action",
            body: "What needs to be comfortably reached and used? Reach distance · turning space · worktop height · under-clearance · cabinet depth · access to appliances",
          },
          {
            heading: "Touch",
            body: "What needs to be understood without relying only on vision? Tactile markers · distinct handles · physical buttons · surface differences · clear feedback",
          },
        ],
      },
      {
        id: "development",
        navLabel: "Concept development",
        number: "05",
        heading: "From first ideas to a more detailed layout",
        body: [
          "We started with wooden blocks to explore the first rough ideas for the kitchen layout. This helped us quickly compare different arrangements before developing the concept further.",
          "We then used Lego to build the layout in more detail and explore the position and proportion of the different kitchen elements.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1074", wide: false, caption: "First spatial ideas explored with wooden blocks.", src: "/images/kitchen-wooden-blocks.webp", alt: "Wooden blocks standing in for the counter, sink and storage while the layout was arranged" },
              { aspect: "1600/991", wide: false, caption: "Control-knob ideas: a raised marker and tactile studs around the dial.", src: "/images/kitchen-reach-study.webp", alt: "Two overhead studies of a control dial, each with a raised green marker and small studs placed around the rim" },
            ],
          },
          {
            kind: "figures",
            items: [
              { aspect: "1600/444", caption: "A more detailed exploration of the kitchen layout using Lego.", src: "/images/kitchen-lego.webp", alt: "The kitchen units rebuilt in Lego to test heights and proportions" },
              { aspect: "1600/932", caption: "The developed layout with the main kitchen functions identified.", src: "/images/kitchen-lego-annotated.webp", alt: "The Lego model labelled with fridge, cupboard, sink, hob, worktop, containers and dining table" },
            ],
          },
          { kind: "h3", text: "Designing around the cooking process" },
          {
            kind: "figures",
            items: [
              { aspect: "1600/213", caption: "The cooking sequence: storage, sink, worktop, hob and dining.", src: "/images/kitchen-journey-map.webp", alt: "The cooking sequence as a flow: fridge and shelving, sink, worktop, hob and oven, dining table" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Full-scale prototyping",
        number: "06",
        heading: "Testing the concept at full scale",
        body: [
          "We built full-scale paper prototypes to test the kitchen concept more realistically before moving into the final 3D environment.",
          "The prototypes helped us explore how the ideas worked at the scale of the body and allowed us to test dimensions, reach, storage, sink access, controls and wheelchair movement.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/535", caption: "Full-scale paper prototypes used to test the kitchen concept and its dimensions.", src: "/images/kitchen-paper-prototype.webp", alt: "Full-scale paper prototypes of the pull-out drawers and the lowered sink" },
              { aspect: "1600/743", caption: "Prototype details: cardboard control dials and the reach arc.", src: "/images/kitchen-paper-details.webp", alt: "Prototype details: the cardboard control dials and the reach arc drawn on paper" },
              { aspect: "1600/430", caption: "Paper prototypes of the transparent containers and the pull-down shelf.", src: "/images/kitchen-paper-containers.webp", alt: "Paper prototypes of the transparent containers and the pull-down shelf" },
            ],
          },
          { kind: "h3", text: "Refining through physical testing" },
          "Working at full scale made it easier to notice issues that were difficult to judge in smaller models. We used these observations to refine the concept and adjust individual elements before developing the final design.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Principles & outcome",
        number: "07",
        /*
         * The owner's deck heads this section "Turning the research into design
         * principles" and closes it with "Translating the concept into 3D".
         * They are swapped here because `Section` renders `insights` **after**
         * `body` and has no slot for prose between them: with the principles
         * as the section's `insights` they can only come last, so the sentence
         * that introduces them has to come last too. Both of the owner's
         * sub-headings survive; only which of the two is the section heading
         * changed.
         */
        heading: "Translating the concept into 3D",
        body: [
          "After the physical prototypes, I developed the kitchen as a 3D environment in Blender. I worked on the modelling, materials and textures, and helped translate the tested spatial ideas into the digital version.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/382", caption: "The kitchen model in Blender before materials and textures were applied.", src: "/images/kitchen-3d-structure.webp", alt: "The kitchen's grey-box model in Blender, before materials" },
              { aspect: "1024/576", caption: "The finished kitchen in Blender, with an animated wheelchair user.", src: "/images/kitchen-animation-poster.webp", video: "/videos/kitchen-animation.mp4", alt: "The finished kitchen in Blender: a seated user at the lowered worktop beside the pull-down shelving" },
            ],
          },
          { kind: "h3", text: "Turning the research into design principles" },
          "The final concept was guided by five principles that came directly from the research and prototyping.",
        ],
        insights: [
          {
            heading: "Adjustable reach",
            body: "Worktops, storage and selected elements adapt to different seated and standing users.",
          },
          {
            heading: "Clear movement",
            body: "Turning space and under-clearance make it easier to approach and use the main work areas.",
          },
          {
            heading: "Strong visual contrast",
            body: "High contrast helps distinguish handles, controls, labels and functional areas.",
          },
          {
            heading: "Tactile differentiation",
            body: "Different shapes, surfaces and physical controls make important functions easier to identify through touch.",
          },
          {
            heading: "Organised storage",
            body: "Frequently used items stay within accessible areas and are easier to distinguish through position, labels and container design.",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "08",
        heading: "Formative evidence, not comprehensive validation",
        body: [
          "The project was tested through observation, one interview, participant testing and full-scale prototypes, but not with a broad group of wheelchair users or people with visual impairments.",
          "A future version should involve disabled participants more directly and include technical feasibility testing.",
          { kind: "h3", text: "What I learned" },
          "The project showed me how small design decisions, such as reach, contrast or the position of controls, can strongly affect independence.",
          "Testing at full scale was especially valuable because some problems only became clear once we physically moved through the space.",
        ],
      },
    ],
  },
  de: {
    slug: "barrier-free-kitchen",
    name: "Barrierefreie Küche",
    headline: "Eine Küche durch Reichweite, Sehen und Berührung gestalten.",
    summary:
      "Ein inklusives Küchenkonzept, entwickelt rund um die Bedürfnisse von Menschen im Rollstuhl und Personen mit Sehbeeinträchtigungen, insbesondere Grauem Star.",
    tags: [...PROJECT_TAGS["barrier-free-kitchen"]],
    context: "Gemeinsames Hochschulprojekt",
    role: "Prototyping & 3D Design",
    team: "",
    contribution: "Physical Prototyping · 3D Modelling · Materialien & Texturen · Testing",
    tools: "Blender",
    heroImage: { src: "/images/hero-barrier-free-kitchen.webp", alt: "Die barrierefreie Küche in drei 3D-Renderings, neben dem Projektnamen", aspect: "1920/1080" },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "Das Projekt untersuchte, wie sich alltägliche Aufgaben in der Küche verändern, wenn Reichweite, Mobilität oder Sehen eingeschränkt sind.",
          "Unser Prozess führte von der Beobachtung bestehender Küchen und alltäglicher Handlungen über räumliche Experimente und Papierprototypen im Maßstab 1:1 bis zu einer finalen 3D-Umgebung. Mein Schwerpunkt lag darauf, die Ideen in physische und digitale Prototypen zu übersetzen, Materialien und Texturen zu entwickeln und an den Tests mitzuwirken.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Kontext & Herausforderung",
        number: "02",
        heading: "Wenn Standardmaße zu Barrieren werden",
        body: [
          "Konventionelle Küchen platzieren Stauraum, Arbeitsflächen und Bedienelemente häufig außerhalb der komfortablen Reichweite von Menschen im Rollstuhl. Gleichzeitig können kleine Beschriftungen, schwache Kontraste und Touch-Bedienungen alltägliche Aufgaben für Menschen mit Sehbeeinträchtigungen erschweren.",
          "Die Herausforderung bestand darin, diese alltäglichen Designentscheidungen neu zu denken, damit mehr Aufgaben sicher und selbstständig ausgeführt werden können.",
        ],
        designQuestion:
          "Wie kann eine Küche selbstständigere Nutzung unterstützen, wenn Reichweite, Mobilität und visuelle Wahrnehmung eingeschränkt sind?",
      },
      {
        id: "research",
        navLabel: "Recherche",
        number: "03",
        heading: "Alltägliche Handlungen statt nur Maße untersuchen",
        body: [
          "Wir kombinierten Beobachtungen, ein Interview und simulierte Situationen, um zu verstehen, wo alltägliche Aufgaben in der Küche schwierig werden.",
          "Die Recherche umfasste:",
          {
            kind: "list",
            items: [
              "ein Interview mit einer Person mit Grauem Star",
              "die Beobachtung einer Person in einer konventionellen Küche",
              "simulierte Nutzung aus einer Rollstuhl-Situation",
              "simulierte Sehbeeinträchtigung mit einer Grauer-Star-Brille",
              "aufgabenbasierte Tests mit drei Teilnehmenden",
            ],
          },
          "Wir betrachteten unter anderem das Erreichen von Stauraum, die Nutzung von Spüle und Geräten, das Finden von Gegenständen, das Lesen von Beschriftungen und das Erkennen von Bedienelementen durch Berührung.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/3465", caption: "Beobachtung von Reichweite und Zugang zu Stauraum in einer konventionellen Küche.", src: "/images/kitchen-observation.webp", alt: "Eine sitzende Nutzerin greift in einer konventionellen Küche nach dem Oberschrank" },
              { aspect: "1600/3465", caption: "Untersuchung der Erreichbarkeit verschiedener Bereiche eines üblichen Kühlschranks.", src: "/images/kitchen-observation-fridge.webp", alt: "Dieselbe Nutzerin greift in die oberen Fächer eines üblichen Kühlschranks" },
              { aspect: "920/1988", caption: "Die Bedienelemente des Kochfelds aus sitzender Position erreichen.", src: "/images/kitchen-simulation-hob.webp", alt: "Eine sitzende Nutzerin bedient die Knöpfe des Kochfelds in einer konventionellen Küche" },
            ],
          },
          { kind: "h3", text: "Ein Hinweis zur Simulation" },
          {
            kind: "note",
            text: "Die Simulationen halfen dabei, offensichtliche räumliche und visuelle Barrieren sichtbar zu machen, konnten jedoch die gelebte Erfahrung von Behinderung nicht nachbilden. Wir nutzten sie daher, um Designfragen zu erkennen, nicht als Ersatz für Forschung mit Menschen mit Behinderungen.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Design-Framework",
        number: "04",
        heading: "Barrieren in drei Gestaltungsbereiche übersetzen",
        body: [
          "Wir ordneten die Erkenntnisse aus der Recherche drei Bereichen zu, die uns bei der Gestaltung und Bewertung späterer Konzepte leiteten.",
        ],
        insightColumns: 3,
        insights: [
          {
            heading: "Sehen",
            body: "Was muss klar gesehen und unterschieden werden können? Kontrast · Textgröße · Beleuchtung · klare Beschriftungen · sichtbare Bedienelemente · unterscheidbare Objekte",
          },
          {
            heading: "Handeln",
            body: "Was muss bequem erreicht und genutzt werden können? Reichweite · Wendefläche · Arbeitshöhe · Unterfahrbarkeit · Schranktiefe · Zugang zu Geräten",
          },
          {
            heading: "Tasten",
            body: "Was muss auch ohne ausschließlich visuelle Hinweise verständlich sein? Taktile Marker · unterscheidbare Griffe · physische Tasten · Oberflächenunterschiede · klares Feedback",
          },
        ],
      },
      {
        id: "development",
        navLabel: "Konzeptentwicklung",
        number: "05",
        heading: "Von ersten Ideen zu einem detaillierteren Layout",
        body: [
          "Wir begannen mit Holzklötzen, um erste grobe Ideen für das Küchenlayout zu untersuchen. So konnten wir verschiedene Anordnungen schnell vergleichen, bevor wir das Konzept weiterentwickelten.",
          "Anschließend nutzten wir Lego, um das Layout detaillierter aufzubauen und Position sowie Proportion der verschiedenen Küchenelemente zu untersuchen.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1074", wide: false, caption: "Erste räumliche Ideen mit Holzklötzen.", src: "/images/kitchen-wooden-blocks.webp", alt: "Holzklötze als Platzhalter für Arbeitsplatte, Spüle und Stauraum beim Anordnen des Grundrisses" },
              { aspect: "1600/991", wide: false, caption: "Ideen für die Bedienknöpfe: erhabene Markierung und taktile Punkte.", src: "/images/kitchen-reach-study.webp", alt: "Zwei Aufnahmen eines Drehknopfs von oben, jeweils mit einer erhabenen grünen Markierung und kleinen Punkten am Rand" },
            ],
          },
          {
            kind: "figures",
            items: [
              { aspect: "1600/444", caption: "Detailliertere Untersuchung des Küchenlayouts mit Lego.", src: "/images/kitchen-lego.webp", alt: "Die Küchenmodule in Lego nachgebaut, um Höhen und Proportionen zu prüfen" },
              { aspect: "1600/932", caption: "Das weiterentwickelte Layout mit den wichtigsten Küchenfunktionen.", src: "/images/kitchen-lego-annotated.webp", alt: "Das Lego-Modell beschriftet mit Kühlschrank, Schrank, Spüle, Herd, Arbeitsfläche, Behältern und Esstisch" },
            ],
          },
          { kind: "h3", text: "Den Kochablauf berücksichtigen" },
          {
            kind: "figures",
            items: [
              { aspect: "1600/213", caption: "Der Kochablauf: Stauraum, Spüle, Arbeitsfläche, Herd und Essbereich.", src: "/images/kitchen-journey-map.webp", alt: "Der Kochablauf als Fluss: Kühlschrank und Regal, Spüle, Arbeitsplatte, Herd und Ofen, Esstisch" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Full-Scale Prototyping",
        number: "06",
        heading: "Das Konzept im Maßstab 1:1 testen",
        body: [
          "Wir bauten Papierprototypen im Maßstab 1:1, um das Küchenkonzept realistischer zu testen, bevor wir die finale 3D-Umgebung entwickelten.",
          "Die Prototypen halfen uns zu untersuchen, wie die Ideen im Maßstab des Körpers funktionieren. Dabei konnten wir Maße, Reichweiten, Stauraum, Zugang zur Spüle, Bedienelemente und Bewegungsraum für den Rollstuhl testen.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/535", caption: "Papierprototypen im Maßstab 1:1 zum Testen des Küchenkonzepts und seiner Maße.", src: "/images/kitchen-paper-prototype.webp", alt: "Papierprototypen im Maßstab 1:1 der Auszüge und der abgesenkten Spüle" },
              { aspect: "1600/743", caption: "Prototyp-Details: Bedienknöpfe aus Karton und der Reichweitenbogen.", src: "/images/kitchen-paper-details.webp", alt: "Prototyp-Details: die Bedienknöpfe aus Karton und der auf Papier gezeichnete Reichweitenbogen" },
              { aspect: "1600/430", caption: "Papierprototypen der transparenten Behälter und des Absenkregals.", src: "/images/kitchen-paper-containers.webp", alt: "Papierprototypen der transparenten Behälter und des Absenkregals" },
            ],
          },
          { kind: "h3", text: "Durch physisches Testen weiterentwickeln" },
          "Im Maßstab 1:1 wurden Probleme sichtbar, die sich in kleineren Modellen nur schwer beurteilen ließen. Diese Beobachtungen nutzten wir, um das Konzept weiterzuentwickeln und einzelne Elemente vor dem finalen Design anzupassen.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Prinzipien & Ergebnis",
        number: "07",
        heading: "Das Konzept in 3D übersetzen",
        body: [
          "Nach den physischen Prototypen entwickelte ich die Küche als 3D-Umgebung in Blender weiter. Mein Schwerpunkt lag auf Modellierung, Materialien und Texturen sowie darauf, die getesteten räumlichen Ideen in die digitale Version zu übertragen.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/382", caption: "Das Küchenmodell in Blender vor der Anwendung von Materialien und Texturen.", src: "/images/kitchen-3d-structure.webp", alt: "Das Graustufen-Modell der Küche in Blender, vor den Materialien" },
              { aspect: "1024/576", caption: "Die fertige Küche in Blender, mit einer animierten Rollstuhlnutzerin.", src: "/images/kitchen-animation-poster.webp", video: "/videos/kitchen-animation.mp4", alt: "Die fertige Küche in Blender: eine sitzende Nutzerin an der abgesenkten Arbeitsplatte neben dem Absenkregal" },
            ],
          },
          { kind: "h3", text: "Die Recherche in Gestaltungsprinzipien übersetzen" },
          "Das finale Konzept wurde von fünf Prinzipien geleitet, die direkt aus der Recherche und dem Prototyping entstanden.",
        ],
        insights: [
          {
            heading: "Anpassbare Reichweite",
            body: "Arbeitsflächen, Stauraum und ausgewählte Elemente passen sich an unterschiedliche sitzende und stehende Nutzer an.",
          },
          {
            heading: "Klare Bewegungsflächen",
            body: "Wendeflächen und Unterfahrbarkeit erleichtern den Zugang zu den wichtigsten Arbeitsbereichen.",
          },
          {
            heading: "Starker visueller Kontrast",
            body: "Hohe Kontraste helfen dabei, Griffe, Bedienelemente, Beschriftungen und Funktionsbereiche besser zu unterscheiden.",
          },
          {
            heading: "Taktile Unterscheidbarkeit",
            body: "Unterschiedliche Formen, Oberflächen und physische Bedienelemente machen wichtige Funktionen auch über Berührung leichter erkennbar.",
          },
          {
            heading: "Organisierter Stauraum",
            body: "Häufig genutzte Gegenstände bleiben in gut erreichbaren Bereichen und lassen sich durch Position, Beschriftung und Behältergestaltung leichter unterscheiden.",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "08",
        heading: "Formative Erkenntnisse, keine umfassende Validierung",
        body: [
          "Das Projekt wurde durch Beobachtung, ein Interview, Tests mit Teilnehmenden und Prototypen im Maßstab 1:1 untersucht, jedoch nicht mit einer breiten Gruppe von Menschen im Rollstuhl oder Personen mit Sehbeeinträchtigungen.",
          "Eine Weiterentwicklung sollte Menschen mit Behinderungen stärker einbeziehen und zusätzlich die technische Machbarkeit prüfen.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "Das Projekt hat mir gezeigt, wie stark kleine Designentscheidungen wie Reichweite, Kontrast oder die Position von Bedienelementen die Selbstständigkeit beeinflussen können.",
          "Besonders wertvoll war das Testen im Maßstab 1:1, weil einige Probleme erst sichtbar wurden, als wir uns tatsächlich durch den Raum bewegten.",
        ],
      },
    ],
  },
};

export default barrierFreeKitchen;
