import type { PlaygroundCategoryLocaleContent } from "../types";

const crafts: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "crafts",
    title: "Handmade and Bead Crafts",
    intro: "Beads, wire and small handmade objects, built slowly and mostly for joy.",
    items: [
      { caption: "Bead crafts", aspect: "4/5" },
      { caption: "Plant-inspired objects", aspect: "4/3", rotated: true },
      { caption: "Handmade decorations", aspect: "3/4" },
      { caption: "Material experiments", aspect: "4/3" },
      { caption: "Small physical objects", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "editorial",
    nextCategoryTitle: "Calendars and Editorial Experiments",
  },
  de: {
    slug: "crafts",
    title: "Handarbeit und Perlenkunst",
    intro: "Perlen, Draht und kleine handgemachte Objekte — langsam und vor allem aus Freude entstanden.",
    items: [
      { caption: "Perlenkunst", aspect: "4/5" },
      { caption: "Pflanzeninspirierte Objekte", aspect: "4/3", rotated: true },
      { caption: "Handgemachte Dekorationen", aspect: "3/4" },
      { caption: "Materialexperimente", aspect: "4/3" },
      { caption: "Kleine physische Objekte", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "editorial",
    nextCategoryTitle: "Kalender und Editorial Experimente",
  },
};

export default crafts;
