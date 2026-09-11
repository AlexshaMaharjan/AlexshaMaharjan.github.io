import type { CaseStudyLocaleContent } from "./types";

const surugami: CaseStudyLocaleContent = {
  en: {
    slug: "surugami",
    name: "Surugami",
    headline: "Making origami feel social, contemporary and easy to enter.",
    summary:
      "Surugami is an origami-inspired brand and digital experience that connects learning, workshops, visual storytelling and community participation through one coherent identity.",
    tags: ["Brand Identity", "Graphic Design", "Print Design", "Web Design", "Prototyping"],
    role: "Illustration, Poster & Web Design",
    contribution: "Created illustrations, one poster, mock-ups and co-designed the website.",
    type: "Semester project · team",
    tools: "",
    deliverables:
      "Illustration, one poster and mock-ups by Alexsha · Website co-designed · Brand direction collaborative",
    heroImage: {
      src: "/images/hero-surugami.webp",
      alt: "The Surugami website shown across four screens, beside the case-study title",
      aspect: "1900/1189",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "Surugami was developed as a community-oriented origami brand. The project includes visual research, brand positioning, identity development, posters, banners, flyers, campaign material and an interactive website prototype.",
          "The concept treats origami not only as a finished paper object, but as a process involving curiosity, learning and shared creation.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Challenge",
        number: "02",
        heading: "A familiar craft can still feel difficult to enter.",
        body: [
          "Origami is visually recognisable, but beginners may associate it with complex instructions, precision and individual practice.",
          "A new brand needed to communicate both the calm craft of folding and the energy of a contemporary creative community. It had to remain playful enough to invite participation without looking childish or visually uncontrolled.",
        ],
        designQuestion:
          "How might an origami brand preserve the character of the craft while making it inviting to beginners and a wider creative community?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Looking beyond traditional craft branding",
        body: [
          "The research combined visual market analysis, inspiration from educational and interactive digital products, mood boards, concept mapping, audience profiles, brand-value exploration and comparative layout studies.",
          "The references suggested that educational content becomes more engaging when information is divided into clear steps, supported by strong visual storytelling and presented through an identifiable personality. Surugami therefore needed to operate as more than a shop or tutorial archive. It had to feel like a place where people could learn, participate and see what others had created.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/760", caption: "[ research board ]", src: "/images/surugami-research-board.webp", alt: "The creation matrix and control wheel used to position the brand" },
              { aspect: "1600/1133", caption: "[ concept map ]", src: "/images/surugami-concept-map.webp", alt: "A concept map of the origami company: target audience, values, tonality, aesthetic and offerings" },
            ],
          },
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Key insights",
        insights: [
          {
            heading: "Beginners need a visible point of entry.",
            body: "Tutorials, workshops and navigation should clearly communicate difficulty and required time.",
          },
          {
            heading: "Community makes the craft feel less solitary.",
            body: "Showing participant work, events and shared projects can turn origami from an isolated activity into a social experience.",
          },
          {
            heading: "Playfulness needs structure.",
            body: "Colour and expressive forms can create energy, but a consistent grid and typographic hierarchy are necessary for educational clarity.",
          },
          {
            heading: "Folding can become a complete visual language.",
            body: "The logic of planes, creases and transformation can connect logo, posters, navigation and motion.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Concept & identity",
        number: "05",
        heading: "From a single fold to a shared community.",
        body: [
          "The central idea transforms folding from a technical action into a metaphor for participation. A single sheet becomes a form through a sequence of decisions. In the same way, individual contributions can become part of a larger creative community. The brand should communicate curiosity, accessibility, transformation, creativity and shared learning.",
          { kind: "h3", text: "Turning folds into a repeatable graphic system" },
          "The identity uses angular shapes, layered planes and directional lines inspired by folded paper. A colour system based on coral, mint, teal and light neutral tones creates a contemporary and approachable character.",
          "The strongest part of the identity is not one individual shape. It is the ability to reconfigure the same visual logic across different formats.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1245", caption: "[ brand system ]", src: "/images/surugami-brand-system.webp", alt: "The Surugami identity: colour palette, Space Grotesk, and the folded-swan mark with its construction grid and colourways" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Print & website",
        number: "06",
        heading: "Extending one identity across physical communication",
        body: [
          "The print system includes posters, flyers, banners and promotional formats. Each application uses the same fold-based visual logic while adapting to different information priorities. Posters can prioritise emotional impact. Flyers need clearer event details. Banners require rapid recognition from a distance.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1159", caption: "[ poster campaign ]", src: "/images/surugami-posters.webp", alt: "The poster campaign, from first sketches to mock-ups in a stairwell, a corridor and outdoors" },
              { aspect: "1400/1228", caption: "[ flyer + banner ]", src: "/images/surugami-flyer.webp", alt: "Paper prototypes above the finished three-fold flyer, shown open and folded" },
            ],
          },
          { kind: "h3", text: "Creating a digital home for learning and participation" },
          "The website brings together the brand's educational and community functions. Its content structure prioritises: discovering origami, finding workshops, following tutorials, viewing community work, learning about the organisation, and joining or contacting the community.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/751", caption: "[ sitemap ]", src: "/images/surugami-sitemap.webp", alt: "The site structure: a homepage over tutorials, gallery, courses, events, about and blog" },
            ],
          },
          "Early wireframes established the main page hierarchy before the visual brand was applied. The final interface translates the folded-paper system into cards, navigation, image masks, transitions and section boundaries without compromising readability.",
          {
            kind: "figures",
            items: [
              { aspect: "1400/1051", caption: "[ wireframes ]", src: "/images/surugami-wireframes.webp", alt: "Wireframes for ten pages, starting from a paper prototype of the homepage" },
              { aspect: "1600/797", caption: "[ website — co-designed ]", src: "/images/surugami-website.webp", alt: "Six pages of the finished Surugami website" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Observation, interpretation, revision",
        testing: [
          { label: "Observation", body: '"The user hesitated when locating a workshop."' },
          { label: "Interpretation", body: '"Workshop information did not have sufficient visual priority."' },
          { label: "Revision", body: '"The navigation label, card hierarchy and call to action were clarified."' },
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "08",
        heading: "One folding principle across brand, print and web",
        body: [
          "The final Surugami system uses a common visual principle across identity, campaign material and digital interaction. The print work creates recognition and emotional energy. The website converts that personality into a structured environment for learning, workshops and community content.",
          "The result demonstrates how a concept can remain consistent without producing identical layouts across every medium.",
        ],
        images: [{ aspect: "16/9", caption: "[ final system — large showcase ]" }],
      },
      {
        id: "reflection",
        navLabel: "Reflection",
        number: "09",
        heading: "What I learned",
        body: [
          "Surugami taught me that a visual metaphor becomes useful only when it can support information, not merely decorate it. The fold concept worked best when it helped organise content, direct attention or connect formats. When used too frequently, the same device created visual noise.",
          "The final portfolio version therefore shows fewer applications and explains more clearly how each one responds to its context.",
        ],
      },
    ],
  },
  de: {
    slug: "surugami",
    name: "Surugami",
    headline: "Origami sozial, zeitgemäß und leicht zugänglich gestalten.",
    summary:
      "Surugami ist eine von Origami inspirierte Marke und digitale Erfahrung, die Lernen, Workshops, visuelles Storytelling und Community-Teilnahme in einer konsistenten Identität verbindet.",
    tags: ["Brand Identity", "Graphic Design", "Print Design", "Web Design", "Prototyping"],
    role: "Illustration, Poster- & Webdesign",
    contribution: "Illustrationen, ein Poster und Mock-ups gestaltet sowie die Website mitentwickelt.",
    type: "Semesterprojekt · Team",
    tools: "",
    deliverables:
      "Illustration, ein Poster und Mock-ups von Alexsha · Website gemeinsam gestaltet · Markenrichtung im Team entwickelt",
    heroImage: {
      src: "/images/hero-surugami.webp",
      alt: "Die Surugami-Website auf vier Bildschirmen, neben dem Titel der Fallstudie",
      aspect: "1900/1189",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "Surugami wurde als community-orientierte Origami-Marke entwickelt. Das Projekt umfasst visuelle Recherche, Markenpositionierung, Identitätsentwicklung, Poster, Banner, Flyer, Kampagnenmaterial und einen interaktiven Website-Prototyp.",
          "Das Konzept betrachtet Origami nicht nur als fertiges Papierobjekt, sondern als Prozess aus Neugier, Lernen und gemeinsamem Gestalten.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Herausforderung",
        number: "02",
        heading: "Ein bekanntes Handwerk kann trotzdem schwer zugänglich wirken.",
        body: [
          "Origami ist visuell leicht wiederzuerkennen. Anfänger können es jedoch mit komplexen Anleitungen, hoher Präzision und individueller Übung verbinden.",
          "Eine neue Marke musste sowohl die ruhige Qualität des Faltens als auch die Energie einer zeitgenössischen kreativen Community vermitteln. Sie sollte einladend und spielerisch wirken, ohne kindlich oder visuell unkontrolliert zu werden.",
        ],
        designQuestion:
          "Wie kann eine Origami-Marke den Charakter des Handwerks bewahren und es gleichzeitig für Anfänger und eine größere kreative Community zugänglich machen?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Über traditionelle Handwerksmarken hinausblicken",
        body: [
          "Die Recherche kombinierte visuelle Marktanalyse, Inspiration durch interaktive und edukative digitale Produkte, Moodboards, Concept Mapping, Zielgruppenprofile, die Untersuchung von Markenwerten und vergleichende Layoutstudien.",
          "Die Referenzen deuteten darauf hin, dass Lerninhalte ansprechender werden, wenn Informationen in klare Schritte unterteilt, durch starkes visuelles Storytelling unterstützt und mit einer wiedererkennbaren Persönlichkeit vermittelt werden. Surugami sollte deshalb mehr sein als ein Shop oder Tutorial-Archiv. Die Marke sollte sich wie ein Ort anfühlen, an dem Menschen lernen, teilnehmen und die Arbeiten anderer entdecken können.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/760", caption: "[ research-board ]", src: "/images/surugami-research-board.webp", alt: "Creation Matrix und Control Wheel zur Positionierung der Marke" },
              { aspect: "1600/1133", caption: "[ concept map ]", src: "/images/surugami-concept-map.webp", alt: "Eine Concept Map des Origami-Unternehmens: Zielgruppe, Werte, Tonalität, Ästhetik und Angebot" },
            ],
          },
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Zentrale Erkenntnisse",
        insights: [
          {
            heading: "Anfänger benötigen einen sichtbaren Einstiegspunkt.",
            body: "Tutorials, Workshops und Navigation sollten Schwierigkeitsgrad und Zeitaufwand klar vermitteln.",
          },
          {
            heading: "Community lässt das Handwerk weniger isoliert wirken.",
            body: "Arbeiten von Teilnehmenden, Veranstaltungen und gemeinsame Projekte können Origami von einer Einzelaktivität in ein soziales Erlebnis verwandeln.",
          },
          {
            heading: "Spielerische Gestaltung benötigt Struktur.",
            body: "Farbe und ausdrucksstarke Formen können Energie erzeugen. Für verständliche Lerninhalte sind jedoch ein konsistentes Raster und eine klare typografische Hierarchie notwendig.",
          },
          {
            heading: "Falten kann zu einer vollständigen visuellen Sprache werden.",
            body: "Die Logik von Flächen, Faltlinien und Transformation kann Logo, Poster, Navigation und Bewegung miteinander verbinden.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Konzept & Identität",
        number: "05",
        heading: "Von einer einzelnen Falte zu einer gemeinsamen Community.",
        body: [
          "Die zentrale Idee übersetzt das Falten von einer technischen Handlung in eine Metapher für Teilnahme. Ein einzelnes Blatt wird durch eine Abfolge von Entscheidungen zu einer Form. Auf ähnliche Weise können individuelle Beiträge Teil einer größeren kreativen Community werden. Die Marke sollte Neugier, Zugänglichkeit, Transformation, Kreativität und gemeinsames Lernen vermitteln.",
          { kind: "h3", text: "Faltungen in ein wiederholbares grafisches System übersetzen" },
          "Die Identität verwendet kantige Formen, überlagerte Flächen und gerichtete Linien, die von gefaltetem Papier inspiriert sind. Ein Farbsystem aus Korall, Mint, Petrol und hellen neutralen Tönen schafft einen zeitgemäßen und zugänglichen Charakter.",
          "Die größte Stärke der Identität liegt nicht in einer einzelnen Form. Entscheidend ist die Fähigkeit, dieselbe visuelle Logik über verschiedene Formate hinweg neu zu konfigurieren.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1245", caption: "[ brand-system ]", src: "/images/surugami-brand-system.webp", alt: "Die Surugami-Identität: Farbpalette, Space Grotesk und die gefaltete Schwan-Marke mit Konstruktionsraster und Farbvarianten" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Print & Website",
        number: "06",
        heading: "Eine Identität auf physische Kommunikation übertragen",
        body: [
          "Das Printsystem umfasst Poster, Flyer, Banner und weitere Werbeformate. Jede Anwendung nutzt dieselbe faltbasierte visuelle Logik und passt sie gleichzeitig an unterschiedliche Informationsprioritäten an. Poster können emotionale Wirkung priorisieren. Flyer benötigen klarere Veranstaltungsdetails. Banner müssen aus größerer Entfernung schnell erkennbar sein.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1159", caption: "[ Plakatkampagne ]", src: "/images/surugami-posters.webp", alt: "Die Plakatkampagne, von ersten Skizzen bis zu Mock-ups im Treppenhaus, im Flur und im Außenraum" },
              { aspect: "1400/1228", caption: "[ flyer + banner ]", src: "/images/surugami-flyer.webp", alt: "Papierprototypen über dem fertigen Wickelfalz-Flyer, offen und gefaltet" },
            ],
          },
          { kind: "h3", text: "Ein digitales Zuhause für Lernen und Teilnahme schaffen" },
          "Die Website verbindet die edukativen und gemeinschaftlichen Funktionen der Marke. Die Inhaltsstruktur priorisiert: Origami entdecken, Workshops finden, Tutorials folgen, Arbeiten der Community ansehen, mehr über die Organisation erfahren sowie der Community beitreten oder Kontakt aufnehmen.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/751", caption: "[ sitemap ]", src: "/images/surugami-sitemap.webp", alt: "Die Seitenstruktur: eine Startseite über Tutorials, Galerie, Kursen, Events, Über uns und Blog" },
            ],
          },
          "Frühe Wireframes definierten die zentrale Seitenhierarchie, bevor die visuelle Marke angewendet wurde. Das finale Interface übersetzt das Faltpapier-System in Karten, Navigation, Bildmasken, Übergänge und Abschnittsgrenzen, ohne die Lesbarkeit zu beeinträchtigen.",
          {
            kind: "figures",
            items: [
              { aspect: "1400/1051", caption: "[ wireframes ]", src: "/images/surugami-wireframes.webp", alt: "Wireframes für zehn Seiten, ausgehend von einem Papierprototyp der Startseite" },
              { aspect: "1600/797", caption: "[ website — gemeinsam gestaltet ]", src: "/images/surugami-website.webp", alt: "Sechs Seiten der fertigen Surugami-Website" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Beobachtung, Interpretation, Überarbeitung",
        testing: [
          { label: "Beobachtung", body: "„Die Testperson zögerte bei der Suche nach einem Workshop.“" },
          { label: "Interpretation", body: "„Workshop-Informationen hatten keine ausreichende visuelle Priorität.“" },
          { label: "Überarbeitung", body: "„Navigationsbezeichnung, Kartenhierarchie und Call-to-Action wurden klarer gestaltet.“" },
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "08",
        heading: "Ein Faltprinzip für Marke, Print und Web",
        body: [
          "Das finale Surugami-System verwendet ein gemeinsames visuelles Prinzip für Identität, Kampagnenmaterial und digitale Interaktion. Die Printarbeit schafft Wiedererkennung und emotionale Energie. Die Website übersetzt diese Persönlichkeit in eine strukturierte Umgebung für Lernen, Workshops und Community-Inhalte.",
          "Das Ergebnis zeigt, wie ein Konzept konsistent bleiben kann, ohne über alle Medien hinweg identische Layouts zu erzeugen.",
        ],
        images: [{ aspect: "16/9", caption: "[ finales system — große präsentation ]" }],
      },
      {
        id: "reflection",
        navLabel: "Reflexion",
        number: "09",
        heading: "Was ich gelernt habe",
        body: [
          "Surugami hat mir gezeigt, dass eine visuelle Metapher erst dann nützlich wird, wenn sie Informationen unterstützt und nicht nur dekoriert. Das Faltkonzept funktionierte am besten, wenn es Inhalte organisierte, Aufmerksamkeit lenkte oder unterschiedliche Formate miteinander verband. Bei zu häufiger Verwendung erzeugte dasselbe Element visuelle Unruhe.",
          "Die finale Portfolio-Version zeigt deshalb weniger Anwendungen und erklärt klarer, wie jede Anwendung auf ihren jeweiligen Kontext reagiert.",
        ],
      },
    ],
  },
};

export default surugami;
