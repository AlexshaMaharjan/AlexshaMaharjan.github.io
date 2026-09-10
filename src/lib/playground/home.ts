import type { PlaygroundHomeLocaleContent } from "./types";

const home: PlaygroundHomeLocaleContent = {
  en: {
    eyebrow: "Playground — personal work",
    heading: "Things I make without a brief.",
    intro: "Drawings, objects, experiments and ideas created through curiosity.",
    handNote: "made out of curiosity ↗",
    heroCards: [
      { caption: "digital portrait", subtitle: "digital drawing", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "A digital portrait of a woman in a red patterned dress" },
      { caption: "handmade frame", subtitle: "paper & beads", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "A hand-decorated photo frame held up against fairy lights" },
    ],
    pauseMotion: "Pause the rows",
    playMotion: "Play the rows",
    featuredHeading: "Featured experiments",
    featured: [
      {
        slug: "motorbike-study",
        caption: "Motorbike Study",
        aspect: "16/10",
        subtitle: "Blender · Unreal Engine · After Effects",
        description:
          "A 3D modelling and motion experiment exploring surface detail, lighting and cinematic presentation.",
      },
      { caption: "Bead & Plant Objects", aspect: "1200/2604", rotated: true, subtitle: "beads · wire · handmade", src: "/images/pg-bead.webp", alt: "A beaded hanging planter among leaves, lit at night" },
      { caption: "Hibi", aspect: "16/10", subtitle: "small software experiment" },
    ],
    categoriesHeading: "Categories",
    categoriesCaption: "five kinds of making — each row runs on its own, hover to pause",
    categories: [
      {
        slug: "games-and-apps",
        title: "Games and Applications",
        caption: "A Unity game, small applications and code-based prototypes — software that responds.",
      },
      {
        slug: "photography-3d-motion",
        title: "Photography, Animation and 3D",
        caption: "Low-key photography, Blender and Unreal experiments — light, and things that move.",
      },
      {
        slug: "graphic-design",
        title: "Graphic Design",
        caption: "Logos, posters, print and packaging — kept because they taught me something.",
      },
      {
        slug: "digital-art",
        title: "Digital Drawings and Portraits",
        caption: "Portraits, characters and colour studies, drawn for practice and for pleasure.",
      },
      {
        slug: "crafts",
        title: "Handmade and Bead Crafts",
        caption: "Beads, wire and small handmade objects, built slowly and mostly for joy.",
      },
    ],
    exploringHeading: "Currently exploring —",
    exploringItems: ["Unreal animation", "beadwork", "motion studies"],
    noteBody:
      "Not every idea needs to become a case study. This is where I collect experiments, unfinished directions and things I make simply because I enjoy making them.",
    returnCta: "Back to Portfolio",
  },
  de: {
    eyebrow: "Playground — persönliche Arbeiten",
    heading: "Dinge, die ich ohne Briefing gestalte.",
    intro: "Zeichnungen, Objekte, Experimente und Ideen, die aus Neugier entstehen.",
    handNote: "aus Neugier gemacht ↗",
    heroCards: [
      { caption: "digitales Porträt", subtitle: "digitale Zeichnung", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "Digitales Porträt einer Frau in rot gemustertem Kleid" },
      { caption: "handgemachter Rahmen", subtitle: "Papier & Perlen", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "Ein handverzierter Bilderrahmen vor einer Lichterkette" },
    ],
    pauseMotion: "Reihen anhalten",
    playMotion: "Reihen abspielen",
    featuredHeading: "Ausgewählte Experimente",
    featured: [
      {
        slug: "motorbike-study",
        caption: "Motorradstudie",
        aspect: "16/10",
        subtitle: "Blender · Unreal Engine · After Effects",
        description: "Ein 3D- und Motion-Experiment zu Oberflächendetails, Licht und filmischer Präsentation.",
      },
      { caption: "Perlen- und Pflanzenobjekte", aspect: "1200/2604", rotated: true, subtitle: "beads · wire · handmade", src: "/images/pg-bead.webp", alt: "Eine Hängeampel aus Perlen zwischen Blättern, nachts beleuchtet" },
      { caption: "Hibi", aspect: "16/10", subtitle: "kleines Software-Experiment" },
    ],
    categoriesHeading: "Kategorien",
    categoriesCaption: "Fünf Arten des Machens — jede Reihe läuft von selbst. Zum Anhalten mit der Maus darüber.",
    categories: [
      {
        slug: "games-and-apps",
        title: "Games und Anwendungen",
        caption: "Ein Unity-Game, kleine Anwendungen und Code-Prototypen — Software, die reagiert.",
      },
      {
        slug: "photography-3d-motion",
        title: "Fotografie, Animation und 3D",
        caption: "Low-Key-Fotografie, Blender- und Unreal-Experimente — Licht, und Dinge in Bewegung.",
      },
      {
        slug: "graphic-design",
        title: "Grafikdesign",
        caption: "Logos, Poster, Print und Verpackung — aufbewahrt, weil sie mir etwas beigebracht haben.",
      },
      {
        slug: "digital-art",
        title: "Digitale Zeichnungen und Porträts",
        caption: "Porträts, Charaktere und Farbstudien — gezeichnet zum Üben und aus Freude.",
      },
      {
        slug: "crafts",
        title: "Handarbeit und Perlenkunst",
        caption: "Perlen, Draht und kleine handgemachte Objekte — langsam und vor allem aus Freude entstanden.",
      },
    ],
    exploringHeading: "Aktuell am Entdecken —",
    exploringItems: ["Unreal animation", "Perlenkunst", "Motion-Studien"],
    noteBody:
      "Nicht jede Idee muss zu einer Fallstudie werden. Hier sammle ich Experimente, unfertige Richtungen und Dinge, die ich einfach gestalte, weil mir das Gestalten Freude macht.",
    returnCta: "Zurück zum Portfolio",
  },
};

export default home;
