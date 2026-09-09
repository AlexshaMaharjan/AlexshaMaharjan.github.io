import type { PlaygroundCategoryLocaleContent } from "../types";

const editorial: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "editorial",
    title: "Calendars and Editorial Experiments",
    intro: "Calendars, grids and print compositions — typography as a playground.",
    items: [
      { caption: "Book cover", aspect: "1200/891", src: "/images/pg-bookcover.webp", alt: "A book cover for “Glow in the Fog”, front and spine" },
      { caption: "Event flyer", aspect: "1200/1242", src: "/images/pg-flyer.webp", alt: "A set of event cards in pink and black, laid out as a grid" },
      { caption: "Typographic postcard 1", aspect: "1029/760", src: "/images/pg-postcard-1.webp", alt: "A Schiller quote set around a circular path" },
      { caption: "Typographic postcard 2", aspect: "1029/760", rotated: true, src: "/images/pg-postcard-2.webp", alt: "The same quote set centred in a serif face" },
      { caption: "Typographic postcard 3", aspect: "1029/760", src: "/images/pg-postcard-3.webp", alt: "The same quote reversed out of black" },
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
      { caption: "Buchcover", aspect: "1200/891", src: "/images/pg-bookcover.webp", alt: "Ein Buchcover für „Glow in the Fog“, Vorderseite und Rücken" },
      { caption: "Veranstaltungsflyer", aspect: "1200/1242", src: "/images/pg-flyer.webp", alt: "Eine Reihe von Veranstaltungskarten in Rosa und Schwarz als Raster" },
      { caption: "Typografische Postkarte 1", aspect: "1029/760", src: "/images/pg-postcard-1.webp", alt: "Ein Schiller-Zitat entlang einer Kreisbahn gesetzt" },
      { caption: "Typografische Postkarte 2", aspect: "1029/760", rotated: true, src: "/images/pg-postcard-2.webp", alt: "Dasselbe Zitat zentriert in einer Serifenschrift" },
      { caption: "Typografische Postkarte 3", aspect: "1029/760", src: "/images/pg-postcard-3.webp", alt: "Dasselbe Zitat weiß aus Schwarz ausgespart" },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "graphic-experiments",
    nextCategoryTitle: "Grafik- und Logoexperimente",
  },
};

export default editorial;
