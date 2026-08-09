import type { PlaygroundCategoryLocaleContent } from "../types";

const digitalArt: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "digital-art",
    title: "Digital Drawings and Portraits",
    intro: "Portraits, characters and colour studies, drawn for practice and for pleasure.",
    items: [
      { caption: "Digital portraits", aspect: "4/5" },
      { caption: "Character studies", aspect: "4/3", rotated: true },
      { caption: "Illustration experiments", aspect: "3/4" },
      { caption: "Colour studies", aspect: "4/3" },
      { caption: "Personal drawings", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "crafts",
    nextCategoryTitle: "Handmade and Bead Crafts",
  },
  de: {
    slug: "digital-art",
    title: "Digitale Zeichnungen und Porträts",
    intro: "Porträts, Charaktere und Farbstudien — gezeichnet zum Üben und aus Freude.",
    items: [
      { caption: "Digitale Porträts", aspect: "4/5" },
      { caption: "Charakterstudien", aspect: "4/3", rotated: true },
      { caption: "Illustrationsexperimente", aspect: "3/4" },
      { caption: "Farbstudien", aspect: "4/3" },
      { caption: "Persönliche Zeichnungen", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "crafts",
    nextCategoryTitle: "Handarbeit und Perlenkunst",
  },
};

export default digitalArt;
