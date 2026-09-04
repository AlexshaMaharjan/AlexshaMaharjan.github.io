import type { PlaygroundHomeLocaleContent } from "./types";

const home: PlaygroundHomeLocaleContent = {
  en: {
    eyebrow: "Playground — personal work",
    heading: "Things I make without a brief.",
    intro: "Drawings, objects, experiments and ideas created through curiosity.",
    handNote: "made out of curiosity ↗",
    heroCards: [
      { caption: "digital portrait", subtitle: "digital drawing", aspect: "4/5" },
      { caption: "beadwork object", subtitle: "beads & wire", aspect: "4/3" },
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
      { caption: "Bead & Plant Objects", aspect: "16/10", rotated: true, subtitle: "beads · wire · handmade" },
      { caption: "Hibi", aspect: "16/10", subtitle: "small software experiment" },
    ],
    categoriesHeading: "Categories",
    categoriesCaption: "six kinds of making — each row runs on its own, hover to pause",
    categories: [
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
      {
        slug: "editorial",
        title: "Calendars and Editorial Experiments",
        caption: "Calendars, grids and print compositions — typography as a playground.",
      },
      {
        slug: "graphic-experiments",
        title: "Graphic and Logo Experiments",
        caption: "Posters, logo studies and directions that never shipped — kept because they taught me something.",
      },
      {
        slug: "3d-motion",
        title: "3D and Motion",
        caption: "Blender, Unreal and After Effects experiments — learning to make things move.",
      },
      {
        slug: "interactive",
        title: "Games and Interactive Experiments",
        caption: "A Unity game, small apps and code-based prototypes — design that responds.",
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
      { caption: "digitales Porträt", subtitle: "digitale Zeichnung", aspect: "4/5" },
      { caption: "Perlenobjekt", subtitle: "Perlen & Draht", aspect: "4/3" },
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
      { caption: "Perlen- und Pflanzenobjekte", aspect: "16/10", rotated: true, subtitle: "beads · wire · handmade" },
      { caption: "Hibi", aspect: "16/10", subtitle: "kleines Software-Experiment" },
    ],
    categoriesHeading: "Kategorien",
    categoriesCaption: "Sechs Arten des Machens — jede Reihe läuft von selbst. Zum Anhalten mit der Maus darüber.",
    categories: [
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
      {
        slug: "editorial",
        title: "Kalender und Editorial Experimente",
        caption: "Kalender, Raster und Printkompositionen — Typografie als Spielwiese.",
      },
      {
        slug: "graphic-experiments",
        title: "Grafik- und Logoexperimente",
        caption: "Poster, Logostudien und nie umgesetzte Richtungen — aufbewahrt, weil sie mir etwas beigebracht haben.",
      },
      {
        slug: "3d-motion",
        title: "3D und Motion",
        caption: "Experimente mit Blender, Unreal und After Effects — Dinge in Bewegung bringen.",
      },
      {
        slug: "interactive",
        title: "Games und interaktive Experimente",
        caption: "Ein Unity-Game, kleine Apps und Code-Prototypen — Design, das reagiert.",
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
