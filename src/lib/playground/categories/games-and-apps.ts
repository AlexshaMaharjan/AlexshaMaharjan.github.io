import type { PlaygroundCategoryLocaleContent } from "../types";

const gamesAndApps: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "games-and-apps",
    title: "Games and Applications",
    intro: "A Unity game, small applications and code-based prototypes — software that responds.",
    items: [
      { caption: "Unity game", aspect: "4/5" },
      { caption: "Hibi application", aspect: "4/3", rotated: true },
      { caption: "NetBeans student planner", aspect: "3/4" },
      { caption: "Small prototypes", aspect: "4/3" },
      { caption: "Code-based experiments", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
  },
  de: {
    slug: "games-and-apps",
    title: "Games und Anwendungen",
    intro: "Ein Unity-Game, kleine Anwendungen und Code-Prototypen — Software, die reagiert.",
    items: [
      { caption: "Unity-Game", aspect: "4/5" },
      { caption: "Hibi-App", aspect: "4/3", rotated: true },
      { caption: "NetBeans-Studienplaner", aspect: "3/4" },
      { caption: "Kleine Prototypen", aspect: "4/3" },
      { caption: "Code-basierte Experimente", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
  },
};

export default gamesAndApps;
