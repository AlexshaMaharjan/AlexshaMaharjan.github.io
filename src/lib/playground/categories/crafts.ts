import type { PlaygroundCategoryLocaleContent } from "../types";

const crafts: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "crafts",
    title: "Handmade and Bead Crafts",
    intro: "Beads, wire and small handmade objects, built slowly and mostly for joy.",
    items: [
      { caption: "Beaded hanging planter", aspect: "1200/2604", src: "/images/pg-bead.webp", alt: "A beaded hanging planter among leaves, lit at night" },
      { caption: "Handmade frame", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "A hand-decorated photo frame held up against fairy lights" },
      { caption: "Handmade frame — detail", aspect: "1200/1600", rotated: true, src: "/images/pg-frame-detail.webp", alt: "The same frame with beadwork and pressed flowers" },
      { caption: "Explosion gift box", aspect: "1200/1200", src: "/images/pg-gift-explosion.webp", alt: "A gift box opened flat into four decorated petals" },
      { caption: "Photo cube gift", aspect: "1200/1200", src: "/images/pg-gift-cube.webp", alt: "A stack of photo cubes forming a pyramid" },
      { caption: "Pop-up gift box", aspect: "1200/1600", src: "/images/pg-gift-popup.webp", alt: "A pop-up birthday box with balloons and lettering" },
      { caption: "Acrylic painting", aspect: "1200/1600", src: "/images/pg-painting-luffy.webp", alt: "A hand-painted wanted poster in the style of a manga bounty notice" },
      { caption: "Blossom painting", aspect: "1200/900", rotated: true, src: "/images/pg-painting-blossom.webp", alt: "Blue blossom branches painted in acrylic" },
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
      { caption: "Perlen-Hängeampel", aspect: "1200/2604", src: "/images/pg-bead.webp", alt: "Eine Hängeampel aus Perlen zwischen Blättern, nachts beleuchtet" },
      { caption: "Handgemachter Rahmen", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "Ein handverzierter Bilderrahmen vor einer Lichterkette" },
      { caption: "Handgemachter Rahmen — Detail", aspect: "1200/1600", rotated: true, src: "/images/pg-frame-detail.webp", alt: "Derselbe Rahmen mit Perlen und gepressten Blüten" },
      { caption: "Explosionsbox", aspect: "1200/1200", src: "/images/pg-gift-explosion.webp", alt: "Eine Geschenkbox, flach geöffnet in vier verzierte Blätter" },
      { caption: "Fotowürfel-Geschenk", aspect: "1200/1200", src: "/images/pg-gift-cube.webp", alt: "Ein Stapel Fotowürfel, zu einer Pyramide gesetzt" },
      { caption: "Pop-up-Geschenkbox", aspect: "1200/1600", src: "/images/pg-gift-popup.webp", alt: "Eine Pop-up-Geburtstagsbox mit Ballons und Schriftzug" },
      { caption: "Acrylbild", aspect: "1200/1600", src: "/images/pg-painting-luffy.webp", alt: "Ein handgemaltes Fahndungsplakat im Stil eines Manga-Steckbriefs" },
      { caption: "Blütenbild", aspect: "1200/900", rotated: true, src: "/images/pg-painting-blossom.webp", alt: "Blaue Blütenzweige in Acryl gemalt" },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "editorial",
    nextCategoryTitle: "Kalender und Editorial Experimente",
  },
};

export default crafts;
