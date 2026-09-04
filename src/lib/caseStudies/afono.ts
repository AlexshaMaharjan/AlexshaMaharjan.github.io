import type { CaseStudyLocaleContent } from "./types";

const afono: CaseStudyLocaleContent = {
  en: {
    slug: "afono",
    name: "AFONO",
    headline: "Translating Nepali identity into contemporary streetwear.",
    summary:
      "AFONO is a fictional streetwear brand that combines selected cultural references from Nepal with a restrained visual identity, an oversized clothing collection and a complete e-commerce experience.",
    heroDisclosure:
      "Disclosure: The clothing graphics, brand identity and interface design are my original work. AI-generated images were used only as conceptual campaign and product visualisations.",
    tags: ["Brand Strategy", "Visual Identity", "Fashion Graphics", "UI/UX Design", "E-commerce", "Social Media"],
    role: "Brand, Fashion & UI/UX Designer",
    contribution: "Entire project completed independently.",
    type: "Semester project · solo",
    tools: "Figma · Adobe Illustrator · Adobe Photoshop · AI tools for conceptual campaign imagery",
    deliverables: "Brand strategy · Naming · Logo · Clothing graphics · E-commerce prototype · Social-media system",
    heroImage: {
      src: "/images/hero-afono.webp",
      alt: "Print lettering from AFONO's HIMAL series",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Overview",
        number: "01",
        heading: "The project at a glance",
        body: [
          "AFONO was developed as a fictional fashion brand positioned between contemporary streetwear and culturally rooted design.",
          "Many Nepal-inspired fashion products use traditional symbols very directly, resulting in clothing that can appear decorative, souvenir-like or difficult to wear in everyday situations. At the opposite end, some local brands follow international fashion trends so closely that their connection to Nepal becomes almost invisible.",
          "AFONO explores a middle position. The brand communicates cultural belonging through its name, colour system, typography, collection stories and graphic details, rather than through excessive ornamentation. The final system includes a complete visual identity, clothing concepts, an e-commerce prototype and social-media applications.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Challenge",
        number: "02",
        heading: "Cultural identity was visible, but often difficult to wear.",
        body: [
          "Fashion can communicate identity, belonging and cultural memory. However, cultural visibility alone does not automatically create a relevant contemporary product.",
          "The challenge was to create a brand that felt recognisably connected to Nepal without reproducing traditional motifs literally or reducing the culture to decoration. It also needed to compete visually with established international streetwear brands and communicate enough quality to earn trust as a new, fictional label.",
        ],
        designQuestion:
          "How might a Nepal-rooted fashion brand express cultural identity without becoming decorative, traditional or souvenir-like?",
      },
      {
        id: "research",
        navLabel: "Research",
        number: "03",
        heading: "Understanding how culture becomes wearable",
        body: [
          "Five qualitative interviews were conducted with Nepali participants to understand attitudes towards culturally inspired clothing, local fashion brands and everyday wear. Participants were interested in supporting Nepal-related brands, but raised concerns about quality, durability, availability and generic design. Existing cultural prints were frequently described as too loud, too detailed or too decorative for everyday use.",
          "A visual market analysis compared local Nepalese fashion references with international streetwear brands. Local brands often communicated culture more strongly but lacked consistency. International brands presented products more clearly through structured layouts, campaign photography and controlled typography, but offered little cultural relevance to Nepal.",
        ],
        images: [
          { aspect: "4/3", caption: "[ interview findings ]", src: "/images/afono-personas.webp", alt: "User personas built from the five qualitative interviews, with goals, behaviour and frustrations" },
          { aspect: "4/3", caption: "[ market analysis ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Key insights",
        number: "04",
        heading: "Key insights",
        insights: [
          {
            heading: "Culture should be visible without becoming overwhelming.",
            body: "Selected references and stories can communicate origin more effectively than dense traditional ornamentation.",
          },
          {
            heading: "Wearability is part of cultural relevance.",
            body: "If the clothing is difficult to combine or too visually dominant, users may appreciate the idea but avoid wearing the product.",
          },
          {
            heading: "Quality must be communicated before it can be experienced.",
            body: "A new fashion label needs consistent photography, clear product information and a professional digital experience to reduce uncertainty.",
          },
          {
            heading: "Storytelling gives cultural details meaning.",
            body: "Cultural references become more valuable when the collection explains where they come from and why they were selected.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Strategy & identity",
        number: "05",
        heading: "Rooted in Nepal, made for modern everyday wear.",
        body: [
          "The strategic direction positions AFONO neither as a tourism brand nor as a traditional clothing label. It operates more like a creative streetwear studio that uses Nepal as a source of stories, colour, landscape and identity.",
          {
            kind: "list",
            items: [
              "Cultural belonging, without literal reproduction",
              "Everyday wearability, through restrained front designs and stronger back graphics",
              "Contemporary clarity, through a structured visual and digital system",
              "Story-led collections, allowing each release to explore a different cultural or environmental reference",
            ],
          },
          "The name AFONO is derived from the Nepali word afno, meaning ‘one’s own’ or ‘belonging to oneself’. It connects personal identity, cultural belonging and self-expression while remaining short enough to function as a fashion wordmark.",
          { kind: "h3", text: "A flexible identity based on ownership and belonging" },
          "The logo was developed from the letters A and F and refined into a compact geometric symbol. A subtle horizontal construction references the visual rhythm of Devanagari writing without directly reproducing a traditional character.",
          "The colour system uses red, blue, black and white. Red provides energy and a connection to Nepal’s national visual identity. Blue introduces calmness and references mountain landscapes. Black and white allow the cultural colours to remain controlled and wearable.",
        ],
        images: [
          { aspect: "4/3", caption: "[ logo sketches ]", src: "/images/afono-logo-sketches.webp", alt: "Logo exploration: dozens of hand and vector studies combining the letters A and F" },
          { aspect: "4/3", caption: "[ logo system + colours ]", src: "/images/afono-colour-system.webp", alt: "The red, blue, black and white palette with its hex values and the logo colour applications" },
        ],
      },
      {
        id: "development",
        navLabel: "Collection & e-commerce",
        number: "06",
        heading: "Designing a collection, not isolated graphics",
        body: [
          "The collection uses oversized unisex T-shirts as the primary product format. A small front mark keeps the garments easy to wear. Larger back prints carry the main visual narrative.",
          {
            kind: "list",
            items: [
              "Himal — inspired by Nepal’s mountain landscape",
              "City — based on contemporary urban life",
              "Mythic — exploring selected stories and symbolic references",
              "Logo Essentials — using the identity in its most reduced form",
            ],
          },
          { kind: "h3", text: "Connecting product discovery with cultural storytelling" },
          "The website needed to balance two different user intentions: visitors who wanted to shop quickly and visitors who wanted to understand the stories behind the brand. The information architecture therefore separates direct product discovery from deeper brand and collection content.",
          "The prototype includes homepage, shop and collection pages, product details, lookbook, shopping cart, checkout, user account, collection stories and AI-assisted size guidance. Reusable components support consistent product cards, navigation, filters, buttons, forms and checkout states.",
        ],
        images: [
          { aspect: "3/4", caption: "[ tee — front ]", src: "/images/afono-tee-front.webp", alt: "The small front mark: the AFONO wordmark set vertically in red" },
          { aspect: "3/4", caption: "[ tee — back print ]", src: "/images/afono-tee-back.webp", alt: "A Himal Series back print: the wordmark over a line-drawn Himalayan peak and suspension bridge" },
          { aspect: "5/6", caption: "[ print development ]", src: "/images/afono-print-development.webp", alt: "Print development: hand-lettered Kathmandu, Lalitpur and Pokhara studies with Newari mask motifs" },
          { aspect: "4/3", caption: "[ product page ]" },
          { aspect: "7/4", caption: "[ size finder ]", src: "/images/afono-size-finder.webp", alt: "The AI size finder: the measurements step beside the preferred-fit step of the four-step modal" },
          { aspect: "4/3", caption: "[ cart ]", src: "/images/afono-cart.webp", alt: "The cart summary: promo code, subtotal, shipping and the checkout action" },
          { aspect: "4/3", caption: "[ checkout ]", src: "/images/afono-checkout.webp", alt: "The checkout: shipping address beside the order summary, with the site footer below" },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Testing navigation, orientation and purchase flow",
        body: [
          "Three usability sessions were conducted with three participants. Users were able to navigate through the main areas and understand the general brand story, imagery and interactions.",
          {
            kind: "list",
            items: [
              "Navigation was not continuously visible",
              "The active location within the website was not always clear",
              "Some labels and product descriptions needed clearer wording",
              "Several prototype links and checkout steps were incomplete",
            ],
          },
          "The next iteration should introduce a sticky header, active navigation states, clearer page headings, more consistent product language and complete links between all critical shopping steps.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Final outcome",
        number: "08",
        heading: "One identity across product, commerce and communication",
        body: [
          "The final direction brings together naming, visual identity, clothing graphics, online shopping and social-media communication. The restrained front prints keep the products wearable, while collection-based back graphics carry cultural stories. The result is a scalable concept rather than a single logo or clothing graphic.",
        ],
        images: [
          { aspect: "16/9", caption: "[ final brand system — large showcase ]", src: "/images/afono-brand-system.webp", alt: "The finished logo system in brand red: the primary lockup above its two secondary variants" },
          { aspect: "3/4", caption: "[ social media ]", src: "/images/afono-social-system.webp", alt: "The red, blue and white grid system that lays out the Instagram feed" },
          { aspect: "16/10", caption: "[ e-commerce prototype ]", src: "/images/afono-prototype.webp", alt: "Account, order-history and footer screens from the AFONO Figma prototype" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Limitations & reflection",
        number: "09",
        heading: "A conceptual brand, presented transparently",
        body: [
          "AFONO remains a conceptual brand. No garments were manufactured, no material quality was tested and no real campaign photography was produced. AI-generated fashion images were used to visualise the intended campaign direction. These images are clearly labelled as conceptual and are not presented as evidence of physical production.",
          "A future phase should include physical garment samples, print and wash testing, fabric and supplier evaluation, real product photography, larger usability studies and validation with Nepalese audiences and members of the diaspora.",
          { kind: "h3", text: "What I learned" },
          "AFONO taught me that cultural design becomes stronger when it is selective. Adding more symbols did not automatically make the brand feel more authentic. The clearer direction came from deciding which cultural references were meaningful and translating them into a system suitable for contemporary clothing.",
          "The project also showed how closely branding and user experience are connected. A strong logo and collection are not enough when product information, navigation or checkout interactions create uncertainty. The next iteration should move from visual simulation towards physical product validation.",
        ],
      },
    ],
  },
  de: {
    slug: "afono",
    name: "AFONO",
    headline: "Nepalesische Identität in moderne Streetwear übersetzen.",
    summary:
      "AFONO ist eine fiktive Streetwear-Marke, die ausgewählte kulturelle Bezüge aus Nepal mit einer reduzierten visuellen Identität, einer Oversized-Kollektion und einem vollständigen E-Commerce-Erlebnis verbindet.",
    heroDisclosure:
      "Offenlegung: Die Textilgrafiken, die Markenidentität und das Interface-Design sind meine eigene Arbeit. KI-generierte Bilder wurden ausschließlich als konzeptionelle Kampagnen- und Produktvisualisierungen eingesetzt.",
    tags: ["Brand Strategy", "Visual Identity", "Fashion Graphics", "UI/UX Design", "E-commerce", "Social Media"],
    role: "Brand-, Fashion- & UI/UX-Designerin",
    contribution: "Das gesamte Projekt wurde eigenständig umgesetzt.",
    type: "Semesterprojekt · allein",
    tools: "Figma · Adobe Illustrator · Adobe Photoshop · KI-Tools für konzeptionelle Kampagnenbilder",
    deliverables: "Markenstrategie · Naming · Logo · Bekleidungsgrafiken · E-Commerce-Prototyp · Social-Media-System",
    heroImage: {
      src: "/images/hero-afono.webp",
      alt: "Schriftzüge aus AFONOs HIMAL-Serie",
      aspect: "16/7.5",
    },
    sections: [
      {
        id: "overview",
        navLabel: "Überblick",
        number: "01",
        heading: "Das Projekt auf einen Blick",
        body: [
          "AFONO wurde als fiktive Modemarke entwickelt, die sich zwischen moderner Streetwear und kulturell verwurzeltem Design positioniert.",
          "Viele von Nepal inspirierte Modeprodukte verwenden traditionelle Symbole sehr direkt. Dadurch kann die Kleidung dekorativ, souvenirartig oder für den Alltag schwer tragbar wirken. Andere lokale Marken orientieren sich so stark an internationalen Modetrends, dass ihr Bezug zu Nepal kaum noch sichtbar ist.",
          "AFONO untersucht eine Position zwischen diesen beiden Richtungen. Die Marke vermittelt kulturelle Zugehörigkeit durch Namen, Farbsystem, Typografie, Kollektionserzählungen und ausgewählte grafische Details, anstatt mit übermäßiger Ornamentik zu arbeiten. Das finale System umfasst eine vollständige visuelle Identität, Kleidungskonzepte, einen E-Commerce-Prototyp und Social-Media-Anwendungen.",
        ],
      },
      {
        id: "challenge",
        navLabel: "Herausforderung",
        number: "02",
        heading: "Kulturelle Identität war sichtbar, aber häufig schwer tragbar.",
        body: [
          "Mode kann Identität, Zugehörigkeit und kulturelle Erinnerung vermitteln. Kulturelle Sichtbarkeit allein schafft jedoch noch kein relevantes zeitgenössisches Produkt.",
          "Die Herausforderung bestand darin, eine Marke zu entwickeln, die erkennbar mit Nepal verbunden ist, ohne traditionelle Motive wörtlich zu übernehmen oder Kultur auf Dekoration zu reduzieren. Gleichzeitig musste sie visuell mit etablierten internationalen Streetwear-Marken konkurrieren und als neue, fiktive Marke ausreichend Qualität und Vertrauen kommunizieren.",
        ],
        designQuestion:
          "Wie kann eine in Nepal verwurzelte Modemarke kulturelle Identität ausdrücken, ohne dekorativ, traditionell oder souvenirartig zu wirken?",
      },
      {
        id: "research",
        navLabel: "Recherche",
        number: "03",
        heading: "Verstehen, wie Kultur tragbar wird",
        body: [
          "Fünf qualitative Interviews mit nepalesischen Teilnehmenden untersuchten Einstellungen zu kulturell inspirierter Kleidung, lokalen Modemarken und alltagstauglicher Gestaltung. Die Teilnehmenden waren grundsätzlich daran interessiert, Marken mit Nepal-Bezug zu unterstützen. Gleichzeitig äußerten sie Bedenken hinsichtlich Qualität, Haltbarkeit, Verfügbarkeit und generischer Gestaltung. Bestehende kulturelle Prints wurden häufig als zu laut, zu detailliert oder zu dekorativ für den Alltag beschrieben.",
          "Eine visuelle Marktanalyse verglich lokale nepalesische Modereferenzen mit internationalen Streetwear-Marken. Lokale Marken vermittelten kulturelle Identität häufig stärker, waren visuell jedoch weniger konsistent. Internationale Marken präsentierten ihre Produkte durch strukturierte Layouts, Kampagnenfotografie und kontrollierte Typografie klarer, boten jedoch kaum kulturelle Relevanz für Nepal.",
        ],
        images: [
          { aspect: "4/3", caption: "[ interview findings ]", src: "/images/afono-personas.webp", alt: "Nutzer-Personas aus den fünf qualitativen Interviews, mit Zielen, Verhalten und Frustrationen" },
          { aspect: "4/3", caption: "[ market analysis ]" },
        ],
      },
      {
        id: "insights",
        navLabel: "Zentrale Erkenntnisse",
        number: "04",
        heading: "Zentrale Erkenntnisse",
        insights: [
          {
            heading: "Kultur sollte sichtbar sein, ohne zu überladen.",
            body: "Ausgewählte Bezüge und Geschichten können Herkunft wirkungsvoller vermitteln als dichte traditionelle Ornamentik.",
          },
          {
            heading: "Tragbarkeit ist Teil kultureller Relevanz.",
            body: "Wenn Kleidung schwer kombinierbar oder visuell zu dominant ist, können Nutzer die Idee schätzen und das Produkt trotzdem nicht tragen.",
          },
          {
            heading: "Qualität muss kommuniziert werden, bevor sie erlebt werden kann.",
            body: "Eine neue Modemarke benötigt konsistente Bilder, klare Produktinformationen und ein professionelles digitales Erlebnis, um Unsicherheit zu reduzieren.",
          },
          {
            heading: "Storytelling gibt kulturellen Details Bedeutung.",
            body: "Kulturelle Bezüge erhalten mehr Wert, wenn eine Kollektion erklärt, woher sie stammen und weshalb sie ausgewählt wurden.",
          },
        ],
      },
      {
        id: "direction",
        navLabel: "Strategie & Identität",
        number: "05",
        heading: "In Nepal verwurzelt, für den modernen Alltag gemacht.",
        body: [
          "Die strategische Richtung positioniert AFONO weder als Tourismusmarke noch als traditionelle Kleidungsmarke. Die Marke funktioniert eher wie ein kreatives Streetwear-Studio, das Nepal als Quelle für Geschichten, Farben, Landschaften und Identität nutzt.",
          {
            kind: "list",
            items: [
              "Kulturelle Zugehörigkeit, ohne wörtliche Reproduktion",
              "Alltagstauglichkeit, durch reduzierte Vorderseiten und stärkere Rückengrafiken",
              "Zeitgemäße Klarheit, durch ein strukturiertes visuelles und digitales System",
              "Story-basierte Kollektionen, die unterschiedliche kulturelle oder landschaftliche Bezüge untersuchen",
            ],
          },
          "Der Name AFONO leitet sich vom nepalesischen Wort afno ab, das ‘eigen’ oder ‘zu sich selbst gehörend’ bedeutet. Er verbindet persönliche Identität, kulturelle Zugehörigkeit und Selbstausdruck und bleibt gleichzeitig kurz genug für eine Modemarke.",
          { kind: "h3", text: "Eine flexible Identität auf Grundlage von Zugehörigkeit" },
          "Das Logo wurde aus den Buchstaben A und F entwickelt und zu einem kompakten geometrischen Symbol verfeinert. Eine subtile horizontale Konstruktion verweist auf den visuellen Rhythmus der Devanagari-Schrift, ohne ein traditionelles Zeichen direkt zu reproduzieren.",
          "Das Farbsystem arbeitet mit Rot, Blau, Schwarz und Weiß. Rot vermittelt Energie und stellt eine Verbindung zur visuellen Identität Nepals her. Blau schafft Ruhe und verweist auf Berglandschaften. Schwarz und Weiß halten die kulturellen Farben kontrolliert und tragbar.",
        ],
        images: [
          { aspect: "4/3", caption: "[ logo sketches ]", src: "/images/afono-logo-sketches.webp", alt: "Logo-Exploration: Dutzende Hand- und Vektorstudien, die die Buchstaben A und F verbinden" },
          { aspect: "4/3", caption: "[ logo system + colours ]", src: "/images/afono-colour-system.webp", alt: "Die Farbpalette aus Rot, Blau, Schwarz und Weiß mit Hex-Werten und den Logo-Farbanwendungen" },
        ],
      },
      {
        id: "development",
        navLabel: "Kollektion & E-Commerce",
        number: "06",
        heading: "Eine Kollektion statt einzelner Grafiken gestalten",
        body: [
          "Die Kollektion verwendet Oversized-Unisex-T-Shirts als primäres Produktformat. Eine kleine Markierung auf der Vorderseite hält die Kleidungsstücke alltagstauglich. Größere Rückendrucke tragen die zentrale visuelle Erzählung.",
          {
            kind: "list",
            items: [
              "Himal — inspiriert von Nepals Berglandschaft",
              "City — basierend auf zeitgenössischem urbanem Leben",
              "Mythic — mit ausgewählten Geschichten und symbolischen Bezügen",
              "Logo Essentials — mit der Identität in ihrer reduziertesten Form",
            ],
          },
          { kind: "h3", text: "Produktentdeckung mit kulturellem Storytelling verbinden" },
          "Die Website musste zwei unterschiedliche Nutzerabsichten ausgleichen: Besucher, die schnell einkaufen möchten, und Besucher, die die Geschichten hinter der Marke verstehen möchten. Die Informationsarchitektur trennt deshalb direkte Produktentdeckung von ausführlicheren Marken- und Kollektionsinhalten.",
          "Der Prototyp umfasst Startseite, Shop- und Kollektionsseiten, Produktdetails, Lookbook, Warenkorb, Checkout, Nutzerkonto, Kollektionsgeschichten und eine KI-gestützte Größenberatung. Wiederverwendbare Komponenten unterstützen konsistente Produktkarten, Navigation, Filter, Buttons, Formulare und Checkout-Zustände.",
        ],
        images: [
          { aspect: "3/4", caption: "[ tee — front ]", src: "/images/afono-tee-front.webp", alt: "Das kleine Zeichen für die Vorderseite: die vertikal gesetzte AFONO-Wortmarke in Rot" },
          { aspect: "3/4", caption: "[ tee — back print ]", src: "/images/afono-tee-back.webp", alt: "Ein Rückendruck der Himal-Serie: die Wortmarke über einem gezeichneten Himalaya-Gipfel mit Hängebrücke" },
          { aspect: "5/6", caption: "[ print development ]", src: "/images/afono-print-development.webp", alt: "Print-Entwicklung: handgezeichnete Studien zu Kathmandu, Lalitpur und Pokhara mit Newari-Maskenmotiven" },
          { aspect: "4/3", caption: "[ product page ]" },
          { aspect: "7/4", caption: "[ size finder ]", src: "/images/afono-size-finder.webp", alt: "Der KI-Größenfinder: der Maße-Schritt neben dem Passform-Schritt des vierstufigen Modals" },
          { aspect: "4/3", caption: "[ cart ]", src: "/images/afono-cart.webp", alt: "Die Warenkorb-Übersicht: Gutscheincode, Zwischensumme, Versand und die Checkout-Aktion" },
          { aspect: "4/3", caption: "[ checkout ]", src: "/images/afono-checkout.webp", alt: "Der Checkout: Lieferadresse neben der Bestellübersicht, darunter der Seitenfuß" },
        ],
      },
      {
        id: "testing",
        navLabel: "Testing",
        number: "07",
        heading: "Navigation, Orientierung und Kaufprozess testen",
        body: [
          "Drei Usability-Sessions wurden mit drei Teilnehmenden durchgeführt. Die Nutzer konnten sich durch die wichtigsten Bereiche bewegen und die grundlegende Markengeschichte, Bildsprache und Interaktionen verstehen.",
          {
            kind: "list",
            items: [
              "Die Navigation war nicht durchgehend sichtbar",
              "Die aktuelle Position innerhalb der Website war nicht immer eindeutig",
              "Einige Labels und Produktbeschreibungen benötigten klarere Formulierungen",
              "Mehrere Verlinkungen und Checkout-Schritte waren noch unvollständig",
            ],
          },
          "Die nächste Iteration sollte einen Sticky Header, aktive Navigationszustände, deutlichere Seitenüberschriften, konsistentere Produkttexte und vollständige Verbindungen zwischen allen wichtigen Kaufschritten enthalten.",
        ],
      },
      {
        id: "outcome",
        navLabel: "Ergebnis",
        number: "08",
        heading: "Eine Identität für Produkt, Commerce und Kommunikation",
        body: [
          "Die finale Richtung verbindet Naming, visuelle Identität, Bekleidungsgrafik, Online-Shopping und Social-Media-Kommunikation. Reduzierte Vorderseitendrucke halten die Produkte alltagstauglich, während kollektionsbasierte Rückengrafiken kulturelle Geschichten vermitteln. Das Ergebnis ist ein skalierbares Konzept und nicht nur ein einzelnes Logo oder Kleidungsdesign.",
        ],
        images: [
          { aspect: "16/9", caption: "[ final brand system — large showcase ]", src: "/images/afono-brand-system.webp", alt: "Das fertige Logosystem in Markenrot: die Hauptvariante über ihren zwei Nebenvarianten" },
          { aspect: "3/4", caption: "[ social media ]", src: "/images/afono-social-system.webp", alt: "Das Rot-Blau-Weiß-Rastersystem, das den Instagram-Feed strukturiert" },
          { aspect: "16/10", caption: "[ e-commerce prototype ]", src: "/images/afono-prototype.webp", alt: "Konto-, Bestellhistorie- und Footer-Screens aus dem AFONO-Figma-Prototyp" },
        ],
      },
      {
        id: "reflection",
        navLabel: "Grenzen & Reflexion",
        number: "09",
        heading: "Eine konzeptionelle Marke, transparent dargestellt",
        body: [
          "AFONO bleibt eine konzeptionelle Marke. Es wurden keine Kleidungsstücke produziert, keine Materialqualität getestet und kein reales Kampagnen-Fotoshooting durchgeführt. KI-generierte Modebilder wurden verwendet, um die beabsichtigte Kampagnenrichtung zu visualisieren. Diese Bilder werden eindeutig als konzeptionell gekennzeichnet und nicht als Nachweis einer physischen Produktion dargestellt.",
          "Eine zukünftige Phase sollte physische Kleidungsprototypen, Druck- und Waschtests, Stoff- und Lieferantenbewertung, reale Produktfotografie, umfangreichere Usability-Tests und Validierung mit Zielgruppen in Nepal und der Diaspora umfassen.",
          { kind: "h3", text: "Was ich gelernt habe" },
          "AFONO hat mir gezeigt, dass kulturelles Design stärker wird, wenn es selektiv eingesetzt wird. Mehr Symbole machten die Marke nicht automatisch authentischer. Die klarere Richtung entstand durch die Entscheidung, welche kulturellen Bezüge tatsächlich bedeutungsvoll sind und wie sie in ein System für zeitgenössische Kleidung übersetzt werden können.",
          "Das Projekt zeigte außerdem, wie eng Branding und User Experience miteinander verbunden sind. Ein starkes Logo und eine gute Kollektion reichen nicht aus, wenn Produktinformationen, Navigation oder Checkout-Interaktionen Unsicherheit erzeugen. Die nächste Iteration sollte sich von der visuellen Simulation hin zur physischen Produktvalidierung bewegen.",
        ],
      },
    ],
  },
};

export default afono;
