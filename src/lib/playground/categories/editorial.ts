import type { PlaygroundCategoryLocaleContent } from "../types";

const editorial: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "editorial",
    title: "Calendars and Editorial Experiments",
    intro: "Calendars, grids and print compositions — typography as a playground.",
    items: [
      { caption: "Calendar designs", aspect: "4/5" },
      { caption: "Typographic layouts", aspect: "4/3", rotated: true },
      { caption: "Print compositions", aspect: "3/4" },
      { caption: "Grid experiments", aspect: "4/3" },
      { caption: "Editorial studies", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "graphic-experiments",
    nextCategoryTitle: "Graphic and Logo Experiments",
  },
  de: {
    slug: "editorial",
    title: "Kalender und Editorial Experimente",
    intro: "Kalender, Raster und Printkompositionen — Typografie als Spielwiese.",
    items: [
      { caption: "Kalenderdesigns", aspect: "4/5" },
      { caption: "Typografische Layouts", aspect: "4/3", rotated: true },
      { caption: "Printkompositionen", aspect: "3/4" },
      { caption: "Rasterexperimente", aspect: "4/3" },
      { caption: "Editorial-Studien", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "graphic-experiments",
    nextCategoryTitle: "Grafik- und Logoexperimente",
  },
};

export default editorial;
