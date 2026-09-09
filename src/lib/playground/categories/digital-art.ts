import type { PlaygroundCategoryLocaleContent } from "../types";

const digitalArt: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "digital-art",
    title: "Digital Drawings and Portraits",
    intro: "Portraits, characters and colour studies, drawn for practice and for pleasure.",
    items: [
      { caption: "Digital portrait", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "A digital portrait of a woman in a red patterned dress" },
      { caption: "Group portrait", aspect: "1200/1800", rotated: true, src: "/images/pg-group-portrait.webp", alt: "Three women in saris, drawn as a group portrait" },
      { caption: "Double portrait", aspect: "1200/800", src: "/images/pg-double-portrait.webp", alt: "Two friends drawn side by side on a pink ground" },
      { caption: "Child on a scooter", aspect: "1200/1600", src: "/images/pg-scooter.webp", alt: "A child on a scooter, drawn in flat colour" },
      { caption: "Line study", aspect: "1200/1800", rotated: true, src: "/images/pg-line-study.webp", alt: "A couple drawn in single-weight outline, no fill" },
      { caption: "Character illustration", aspect: "1200/1697", src: "/images/pg-character.webp", alt: "A figure holding an oversized red heart" },
      { caption: "Forest study", aspect: "1200/1697", src: "/images/pg-forest.webp", alt: "Light falling through a dense green forest" },
      { caption: "Autumn path", aspect: "1200/1601", src: "/images/pg-autumn.webp", alt: "A path through autumn trees in orange and red" },
      { caption: "Sunset above the clouds", aspect: "1200/1697", src: "/images/pg-sunset.webp", alt: "The sun setting over a bank of cloud" },
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
      { caption: "Digitales Porträt", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "Digitales Porträt einer Frau in rot gemustertem Kleid" },
      { caption: "Gruppenporträt", aspect: "1200/1800", rotated: true, src: "/images/pg-group-portrait.webp", alt: "Drei Frauen in Saris als Gruppenporträt gezeichnet" },
      { caption: "Doppelporträt", aspect: "1200/800", src: "/images/pg-double-portrait.webp", alt: "Zwei Freundinnen nebeneinander auf rosa Grund gezeichnet" },
      { caption: "Kind auf dem Roller", aspect: "1200/1600", src: "/images/pg-scooter.webp", alt: "Ein Kind auf einem Roller, in flachen Farben gezeichnet" },
      { caption: "Linienstudie", aspect: "1200/1800", rotated: true, src: "/images/pg-line-study.webp", alt: "Ein Paar in gleichmäßiger Linie gezeichnet, ohne Füllung" },
      { caption: "Charakter-Illustration", aspect: "1200/1697", src: "/images/pg-character.webp", alt: "Eine Figur mit einem übergroßen roten Herz" },
      { caption: "Waldstudie", aspect: "1200/1697", src: "/images/pg-forest.webp", alt: "Licht, das durch einen dichten grünen Wald fällt" },
      { caption: "Herbstweg", aspect: "1200/1601", src: "/images/pg-autumn.webp", alt: "Ein Weg durch herbstliche Bäume in Orange und Rot" },
      { caption: "Sonnenuntergang über den Wolken", aspect: "1200/1697", src: "/images/pg-sunset.webp", alt: "Die Sonne geht über einer Wolkendecke unter" },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "crafts",
    nextCategoryTitle: "Handarbeit und Perlenkunst",
  },
};

export default digitalArt;
