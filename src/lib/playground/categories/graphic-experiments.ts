import type { PlaygroundCategoryLocaleContent } from "../types";

const graphicExperiments: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "graphic-experiments",
    title: "Graphic and Logo Experiments",
    intro: "Posters, logo studies and directions that never shipped — kept because they taught me something.",
    items: [
      { caption: "Posters", aspect: "4/5" },
      { caption: "Logo studies", aspect: "4/3", rotated: true },
      { caption: "Identity concepts", aspect: "3/4" },
      { caption: "Typography experiments", aspect: "4/3" },
      { caption: "Unused directions", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "3d-motion",
    nextCategoryTitle: "3D and Motion",
  },
  de: {
    slug: "graphic-experiments",
    title: "Grafik- und Logoexperimente",
    intro:
      "Poster, Logostudien und nie umgesetzte Richtungen — aufbewahrt, weil sie mir etwas beigebracht haben.",
    items: [
      { caption: "Poster", aspect: "4/5" },
      { caption: "Logostudien", aspect: "4/3", rotated: true },
      { caption: "Identitätskonzepte", aspect: "3/4" },
      { caption: "Typografie-Experimente", aspect: "4/3" },
      { caption: "Unbenutzte Richtungen", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "3d-motion",
    nextCategoryTitle: "3D und Motion",
  },
};

export default graphicExperiments;
