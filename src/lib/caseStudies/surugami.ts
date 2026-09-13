import type { CaseStudyLocaleContent } from "./types";
import { PROJECT_TAGS } from "./tags";

/**
 * Surugami, rewritten from the owner's own copy deck (`promt.pdf`, section 14).
 *
 * **§07 is prose now, and no longer a `testing` step strip.** It used to be the
 * three labelled lines (Observation, Interpretation, Revision) quoted from
 * the session; the owner's copy tells the same story in three sentences, and
 * running both would state the workshop finding twice on one screen. The
 * `testing` field and its renderer are untouched and unused; this was the only
 * study that carried one.
 *
 * §04 gains a lead-in line ("The research led to four ideas…") because the
 * owner's deck heads that section with a sentence rather than with the bare
 * words "Key insights".
 */
const surugami: CaseStudyLocaleContent = {
  en: {
    slug: "surugami",
    name: "Surugami",
    headline: "Building a visual identity around the craft of origami.",
    summary:
      "Surugami is an origami-inspired brand explored across illustration, print and web design.",
    tags: [...PROJECT_TAGS.surugami],
    context: "Semester project",
    role: "Concept, Graphic & Web Designer",
    team: "Collaborative team project",
    contribution: "Illustration, one poster and mock-ups · Website co-designed · Brand direction developed with the team",
    tools: "",
    heroImage: {
      src: "/images/hero-surugami.webp",
      alt: "The Surugami website shown across four screens, beside the project name",
      aspect: "1920/1080",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "The project explored how the visual qualities of origami could be translated into a contemporary and consistent brand language across print and digital applications.",
          "We developed the concept and visual identity collaboratively. I contributed throughout the process, including conceptual development, illustration, poster design, mock-ups and the website.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Context & challenge",
        number: "02",
        heading: "Making a precise craft feel easier to enter",
        body: [
          "Origami is easy to recognise, but for beginners it can also feel difficult, technical and focused on getting every fold right.",
          "The design challenge was to create a visual identity that kept the calm and precision of origami while making the brand feel more open, playful and contemporary.",
        ],
        designQuestion:
          "How can the visual language of origami feel inviting to beginners without losing the character of the craft?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Finding the right balance between craft and playfulness",
        body: [
          "We explored visual references from craft brands, educational platforms and interactive digital products to understand how Surugami could feel playful without becoming visually confusing.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/760", caption: "Visual research and positioning exercises for the brand direction.", src: "/images/surugami-research-board.webp", alt: "The creation matrix and control wheel used to position the brand" },
            ],
          },
          "The research also helped us define the audience, brand values, tone and overall positioning.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1133", caption: "Mapping the audience, values, tone, visual direction and possible brand activities.", src: "/images/surugami-concept-map.webp", alt: "A concept map of the origami company: target audience, values, tonality, aesthetic and offerings" },
            ],
          },
          { kind: "h3", text: "Designing for learning" },
          "One useful observation was that instructional content becomes easier to approach when information is broken into clear steps and supported by strong visuals.",
          "This influenced how we later approached both the brand language and the structure of the website.",
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Turning research into design principles",
        body: ["The research led to four ideas that guided the design:"],
        insights: [
          {
            heading: "Clear entry points",
            body: "Tutorials, workshops and navigation should make difficulty and time easy to understand.",
          },
          {
            heading: "Community over isolation",
            body: "Showing events and work from others can make origami feel more social.",
          },
          {
            heading: "Playfulness needs structure",
            body: "Expressive colours and shapes work best with a clear grid and hierarchy.",
          },
          {
            heading: "Folding as a visual language",
            body: "Planes, creases and transformation could connect the identity across different formats.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Concept & identity",
        number: "05",
        heading: "Building a system from the idea of folding",
        body: [
          "The name Surugami echoes the sound of origami, creating an immediate connection to the craft while still giving the brand its own identity.",
          "We used folding not only as a reference to origami, but as the main visual principle of the brand. The logo uses a simplified folded-swan form, turning the idea of folded paper into a recognisable symbol that could work across print and digital applications.",
          "Angular shapes, layered planes and directional lines extend this logic into the wider identity. Combined with coral, mint, teal and light neutral colours, they create a visual language that feels playful but still structured.",
          "Space Grotesk supports the system with a clear and contemporary typographic character.",
          "The strength of the identity comes from using the same folding logic in different ways rather than repeating one fixed graphic.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1245", caption: "The Surugami identity: logo, colour palette, typography and graphic system.", src: "/images/surugami-brand-system.webp", alt: "The Surugami identity: colour palette, Space Grotesk, and the folded-swan mark with its construction grid and colourways" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Print & website",
        number: "06",
        heading: "Applying one identity across different formats",
        body: [
          "For print, the fold-based system was adapted depending on what each format needed to communicate. Posters could be more expressive, while flyers and banners needed clearer information and faster recognition.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1159", caption: "Poster development from early sketches to final campaign mock-ups.", src: "/images/surugami-posters.webp", alt: "The poster campaign, from first sketches to mock-ups in a stairwell, a corridor and outdoors" },
              { aspect: "1400/1228", caption: "Paper prototypes and the final folded flyer and banner applications.", src: "/images/surugami-flyer.webp", alt: "Paper prototypes above the finished three-fold flyer, shown open and folded" },
            ],
          },
          { kind: "h3", text: "Structuring the digital experience" },
          "For the website, we first organised the content around tutorials, workshops, events, community work and information about Surugami.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/751", caption: "Sitemap defining the main content and navigation structure.", src: "/images/surugami-sitemap.webp", alt: "The site structure: a homepage over tutorials, gallery, courses, events, about and blog" },
            ],
          },
          "Wireframes helped us establish the page hierarchy before applying the visual identity.",
          {
            kind: "figures",
            items: [
              { aspect: "1400/1051", caption: "Wireframes developed from the first paper prototype into the main page layouts.", src: "/images/surugami-wireframes.webp", alt: "Wireframes for ten pages, starting from a paper prototype of the homepage" },
            ],
          },
          "In the final interface, the folding language appears through cards, image shapes, section transitions and layout details without taking attention away from the content.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/797", caption: "Final Surugami website, co-designed as part of the team.", src: "/images/surugami-website.webp", alt: "Six pages of the finished Surugami website" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Testing whether the structure was clear",
        body: [
          "Overall, participants responded positively to the visual direction and were able to move through most of the website successfully.",
          "One issue appeared when a participant hesitated while looking for a workshop. We traced this to weak visual priority and revised the navigation label, card hierarchy and call to action to make workshops easier to find.",
          "The testing confirmed that the overall structure worked while also showing where small changes could improve orientation.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "08",
        heading: "One visual system across print and web",
        body: [
          "The final design uses the same folding principle across the identity, campaign material and website, while adapting it to the needs of each format.",
          "Rather than repeating the same layout everywhere, the system keeps the brand consistent through shared shapes, colour, typography and visual rhythm.",
        ],
        images: [{ aspect: "16/9", caption: "Final Surugami identity shown across print and digital applications." }],
      },
      {
        id: "prototype",
        navLabel: "Prototype",
        number: "09",
        heading: "Try it yourself",
        body: [
          "Here you can explore the interactive prototype and move through the experience yourself.",
          {
            kind: "prototype",
            embed: "https://embed.figma.com/proto/GQhDPsYmRDDJWBMkE0cuTa/Surugami?node-id=242-3229&starting-point-node-id=242%3A3229&page-id=0%3A1&scaling=scale-down&content-scaling=fixed&embed-host=share",
            href: "https://www.figma.com/proto/GQhDPsYmRDDJWBMkE0cuTa/Surugami?node-id=242-3229&starting-point-node-id=242%3A3229&page-id=0%3A1&scaling=scale-down&content-scaling=fixed",
            label: "Surugami website prototype",
            aspect: "5/4",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Reflection",
        number: "10",
        heading: "What I learned",
        body: [
          "Surugami taught me that a visual idea becomes useful when it helps organise information, not when it is added only as decoration.",
          "The folding language worked best when it guided attention or connected different formats. Using it too often created visual noise, which taught me when to simplify and let the content take priority.",
        ],
      },
    ],
  },
  de: {
    slug: "surugami",
    name: "Surugami",
    headline: "Eine visuelle Identität rund um Origami entwickeln.",
    summary:
      "Surugami ist eine von Origami inspirierte Marke, die durch Illustration, Print- und Webdesign umgesetzt wurde.",
    tags: [...PROJECT_TAGS.surugami],
    context: "Semesterprojekt",
    role: "Concept, Graphic & Web Designerin",
    team: "Gemeinsames Teamprojekt",
    contribution: "Illustration, ein Poster und Mock-ups · Website gemeinsam gestaltet · Markenrichtung im Team entwickelt",
    tools: "",
    heroImage: {
      src: "/images/hero-surugami.webp",
      alt: "Die Surugami-Website auf vier Bildschirmen, neben dem Projektnamen",
      aspect: "1920/1080",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "Das Projekt untersuchte, wie sich die visuellen Eigenschaften von Origami in eine zeitgemäße und konsistente Markensprache für Print- und digitale Anwendungen übersetzen lassen.",
          "Wir entwickelten das Konzept und die visuelle Identität gemeinsam. Ich war über den gesamten Prozess hinweg beteiligt, unter anderem an der Konzeptentwicklung, Illustration, dem Posterdesign, den Mock-ups und der Website.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Kontext & Herausforderung",
        number: "02",
        heading: "Ein präzises Handwerk leichter zugänglich machen",
        body: [
          "Origami ist leicht wiederzuerkennen, kann für Anfänger aber auch schwierig, technisch und stark auf perfekte Faltungen ausgerichtet wirken.",
          "Die gestalterische Herausforderung bestand darin, eine visuelle Identität zu entwickeln, die die Ruhe und Präzision von Origami bewahrt und gleichzeitig offener, spielerischer und zeitgemäßer wirkt.",
        ],
        designQuestion:
          "Wie kann die visuelle Sprache von Origami Anfänger einladen, ohne den Charakter des Handwerks zu verlieren?",
      },
      {
        id: "research",
        navLabel: "Recherche",
        number: "03",
        heading: "Die richtige Balance zwischen Handwerk und Spiel finden",
        body: [
          "Wir untersuchten visuelle Referenzen aus Handwerksmarken, Lernplattformen und interaktiven digitalen Produkten, um herauszufinden, wie Surugami spielerisch wirken kann, ohne visuell unübersichtlich zu werden.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/760", caption: "Visuelle Recherche und Positionierungsübungen für die Markenrichtung.", src: "/images/surugami-research-board.webp", alt: "Creation Matrix und Control Wheel zur Positionierung der Marke" },
            ],
          },
          "Die Recherche half uns außerdem dabei, Zielgruppe, Markenwerte, Tonalität und Positionierung zu definieren.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1133", caption: "Mapping von Zielgruppe, Werten, Tonalität, visueller Richtung und möglichen Markenaktivitäten.", src: "/images/surugami-concept-map.webp", alt: "Eine Concept Map des Origami-Unternehmens: Zielgruppe, Werte, Tonalität, Ästhetik und Angebot" },
            ],
          },
          { kind: "h3", text: "Für Lernen gestalten" },
          "Eine wichtige Beobachtung war, dass Lerninhalte leichter zugänglich werden, wenn Informationen in klare Schritte gegliedert und visuell unterstützt werden.",
          "Das beeinflusste später sowohl die Markensprache als auch die Struktur der Website.",
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Recherche in Gestaltungsprinzipien übersetzen",
        body: ["Aus der Recherche entstanden vier Ideen, die den weiteren Entwurf leiteten:"],
        insights: [
          {
            heading: "Klare Einstiegspunkte",
            body: "Tutorials, Workshops und Navigation sollten Schwierigkeitsgrad und Zeitaufwand leicht verständlich machen.",
          },
          {
            heading: "Community statt Isolation",
            body: "Events und Arbeiten anderer können Origami sozialer wirken lassen.",
          },
          {
            heading: "Spielerische Gestaltung braucht Struktur",
            body: "Ausdrucksstarke Farben und Formen funktionieren am besten mit einem klaren Raster und einer verständlichen Hierarchie.",
          },
          {
            heading: "Falten als visuelle Sprache",
            body: "Flächen, Faltlinien und Transformation konnten die Identität über verschiedene Formate hinweg verbinden.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Konzept & Identität",
        number: "05",
        heading: "Ein System aus der Idee des Faltens entwickeln",
        body: [
          "Der Name Surugami erinnert klanglich an Origami und stellt dadurch sofort eine Verbindung zum Handwerk her, während die Marke trotzdem eine eigene Identität behält.",
          "Wir nutzten Falten nicht nur als Verweis auf Origami, sondern als zentrales visuelles Prinzip der Marke. Das Logo verwendet eine vereinfachte Form eines gefalteten Schwans und übersetzt die Idee von gefaltetem Papier in ein wiedererkennbares Symbol für Print und digitale Anwendungen.",
          "Kantige Formen, überlagerte Flächen und gerichtete Linien führen diese Logik in der gesamten Identität weiter. Zusammen mit Korall, Mint, Petrol und hellen neutralen Tönen entsteht eine visuelle Sprache, die spielerisch und gleichzeitig strukturiert wirkt.",
          "Space Grotesk ergänzt das System mit einem klaren und zeitgemäßen typografischen Charakter.",
          "Die Stärke der Identität liegt darin, dieselbe Faltlogik unterschiedlich einzusetzen, statt eine feste Grafik immer wieder zu wiederholen.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1245", caption: "Die Surugami-Identität: Logo, Farbpalette, Typografie und grafisches System.", src: "/images/surugami-brand-system.webp", alt: "Die Surugami-Identität: Farbpalette, Space Grotesk und die gefaltete Schwan-Marke mit Konstruktionsraster und Farbvarianten" },
            ],
          },
        ],
      },
      {
        id: "development",
        navLabel: "Print & Website",
        number: "06",
        heading: "Eine Identität auf unterschiedliche Formate übertragen",
        body: [
          "Im Printbereich wurde das faltbasierte System an die jeweilige Aufgabe angepasst. Poster konnten ausdrucksstärker sein, während Flyer und Banner klarere Informationen und schnelle Wiedererkennbarkeit brauchten.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/1159", caption: "Posterentwicklung von ersten Skizzen bis zu finalen Kampagnen-Mock-ups.", src: "/images/surugami-posters.webp", alt: "Die Plakatkampagne, von ersten Skizzen bis zu Mock-ups im Treppenhaus, im Flur und im Außenraum" },
              { aspect: "1400/1228", caption: "Papierprototypen sowie der finale gefaltete Flyer und Banner-Anwendungen.", src: "/images/surugami-flyer.webp", alt: "Papierprototypen über dem fertigen Wickelfalz-Flyer, offen und gefaltet" },
            ],
          },
          { kind: "h3", text: "Das digitale Erlebnis strukturieren" },
          "Für die Website organisierten wir zunächst die Inhalte rund um Tutorials, Workshops, Events, Community-Arbeiten und Informationen über Surugami.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/751", caption: "Sitemap zur Definition der wichtigsten Inhalte und Navigationsstruktur.", src: "/images/surugami-sitemap.webp", alt: "Die Seitenstruktur: eine Startseite über Tutorials, Galerie, Kursen, Events, Über uns und Blog" },
            ],
          },
          "Mit Wireframes entwickelten wir anschließend die Seitenhierarchie, bevor die visuelle Identität angewendet wurde.",
          {
            kind: "figures",
            items: [
              { aspect: "1400/1051", caption: "Wireframes vom ersten Papierprototyp bis zu den wichtigsten Seitenlayouts.", src: "/images/surugami-wireframes.webp", alt: "Wireframes für zehn Seiten, ausgehend von einem Papierprototyp der Startseite" },
            ],
          },
          "Im finalen Interface zeigt sich die Faltlogik in Karten, Bildformen, Übergängen und Layoutdetails, ohne vom Inhalt abzulenken.",
          {
            kind: "figures",
            items: [
              { aspect: "1600/797", caption: "Finale Surugami-Website, gemeinsam im Team gestaltet.", src: "/images/surugami-website.webp", alt: "Sechs Seiten der fertigen Surugami-Website" },
            ],
          },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Testen, ob die Struktur verständlich ist",
        body: [
          "Insgesamt reagierten die Teilnehmenden positiv auf die visuelle Richtung und konnten sich erfolgreich durch den Großteil der Website bewegen.",
          "Ein Problem zeigte sich, als eine Testperson bei der Suche nach einem Workshop zögerte. Wir führten dies auf eine zu schwache visuelle Priorität zurück und überarbeiteten Navigationsbezeichnung, Kartenhierarchie und Call-to-Action.",
          "Die Tests bestätigten, dass die grundlegende Struktur funktionierte, und zeigten gleichzeitig, wo kleine Anpassungen die Orientierung verbessern konnten.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "08",
        heading: "Ein visuelles System für Print und Web",
        body: [
          "Das finale Design nutzt dasselbe Faltprinzip für Identität, Kampagnenmaterial und Website und passt es gleichzeitig an die Anforderungen der jeweiligen Formate an.",
          "Statt überall dasselbe Layout zu wiederholen, entsteht Konsistenz durch gemeinsame Formen, Farben, Typografie und visuellen Rhythmus.",
        ],
        images: [{ aspect: "16/9", caption: "Finale Surugami-Identität über Print- und digitale Anwendungen hinweg." }],
      },
      {
        id: "prototype",
        navLabel: "Prototyp",
        number: "09",
        heading: "Selbst ausprobieren",
        body: [
          "Hier können Sie den interaktiven Prototyp erkunden und sich selbst durch das Erlebnis bewegen.",
          {
            kind: "prototype",
            embed: "https://embed.figma.com/proto/GQhDPsYmRDDJWBMkE0cuTa/Surugami?node-id=242-3229&starting-point-node-id=242%3A3229&page-id=0%3A1&scaling=scale-down&content-scaling=fixed&embed-host=share",
            href: "https://www.figma.com/proto/GQhDPsYmRDDJWBMkE0cuTa/Surugami?node-id=242-3229&starting-point-node-id=242%3A3229&page-id=0%3A1&scaling=scale-down&content-scaling=fixed",
            label: "Surugami Website-Prototyp",
            aspect: "5/4",
          },
        ],
      },
      {
        id: "reflection",
        navLabel: "Reflexion",
        number: "10",
        heading: "Was ich gelernt habe",
        body: [
          "Surugami hat mir gezeigt, dass eine visuelle Idee dann sinnvoll wird, wenn sie Informationen unterstützt und nicht nur dekorativ eingesetzt wird.",
          "Die Faltlogik funktionierte am besten, wenn sie Aufmerksamkeit lenkte oder verschiedene Formate miteinander verband. Bei zu häufiger Verwendung entstand visuelle Unruhe. Dadurch lernte ich besser einzuschätzen, wann Gestaltung zurückgenommen werden sollte und der Inhalt im Vordergrund stehen muss.",
        ],
      },
    ],
  },
};

export default surugami;
