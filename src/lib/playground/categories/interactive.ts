import type { PlaygroundCategoryLocaleContent } from "../types";

const interactive: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "interactive",
    title: "Games and Interactive Experiments",
    intro: "A Unity game, small apps and code-based prototypes — design that responds.",
    items: [
      { caption: "Unity game", aspect: "4/5" },
      { caption: "Hibi application", aspect: "4/3", rotated: true },
      { caption: "NetBeans student planner", aspect: "3/4" },
      { caption: "Small prototypes", aspect: "4/3" },
      { caption: "Code-based experiments", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "digital-art",
    nextCategoryTitle: "Digital Drawings and Portraits",
  },
  de: {
    slug: "interactive",
    title: "Games und interaktive Experimente",
    intro: "Ein Unity-Game, kleine Apps und Code-Prototypen — Design, das reagiert.",
    items: [
      { caption: "Unity-Game", aspect: "4/5" },
      { caption: "Hibi-App", aspect: "4/3", rotated: true },
      { caption: "NetBeans-Studienplaner", aspect: "3/4" },
      { caption: "Kleine Prototypen", aspect: "4/3" },
      { caption: "Code-basierte Experimente", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "digital-art",
    nextCategoryTitle: "Digitale Zeichnungen und Porträts",
  },
};

export default interactive;
