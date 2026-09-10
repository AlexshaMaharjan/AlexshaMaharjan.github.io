import type { PlaygroundCategoryLocaleContent } from "../types";

/*
 * `Calendars and Editorial Experiments` folded in here in SESSION-033. Its five
 * items — a book cover, a flyer and three typographic postcards — were print
 * design filed under a separate heading, and the split left both categories
 * thinner than the work in them. They sit in the middle of the run, between the
 * posters and the packaging, so the page reads logo → poster → print → package.
 */
const graphicDesign: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "graphic-design",
    title: "Graphic Design",
    intro:
      "Logos, posters, print and packaging — some of it shipped, some of it never did, and all of it taught me something.",
    items: [
      { caption: "Logo study", aspect: "803/1115", src: "/images/pg-logo.webp", alt: "A monogram mark for Infrastruktur Technologie und Design" },
      { caption: "Abstract shape poster", aspect: "1035/1359", rotated: true, src: "/images/pg-abstract.webp", alt: "A black and white burst of radiating shapes" },
      { caption: "Hologram poster", aspect: "1200/1553", src: "/images/pg-poster-hologram.webp", alt: "A product poster for a holographic watch" },
      { caption: "Museum poster", aspect: "1200/1658", src: "/images/pg-poster-museum.webp", alt: "An illustrated children's poster for a museum exhibition" },
      { caption: "Book cover", aspect: "1200/891", src: "/images/pg-bookcover.webp", alt: "A book cover for “Glow in the Fog”, front and spine" },
      { caption: "Event flyer", aspect: "1200/1242", rotated: true, src: "/images/pg-flyer.webp", alt: "A set of event cards in pink and black, laid out as a grid" },
      { caption: "Typographic postcard 1", aspect: "1029/760", src: "/images/pg-postcard-1.webp", alt: "A Schiller quote set around a circular path" },
      { caption: "Typographic postcard 2", aspect: "1029/760", rotated: true, src: "/images/pg-postcard-2.webp", alt: "The same quote set centred in a serif face" },
      { caption: "Typographic postcard 3", aspect: "1029/760", src: "/images/pg-postcard-3.webp", alt: "The same quote reversed out of black" },
      { caption: "Crisp packet", aspect: "794/956", src: "/images/pg-packaging-crisps.webp", alt: "Packaging for a hot and spicy crisp brand" },
      { caption: "Perfume box", aspect: "656/770", src: "/images/pg-packaging-perfume.webp", alt: "A navy perfume box with a floral pattern" },
      { caption: "Perfume box — unfolded", aspect: "1185/1100", rotated: true, src: "/images/pg-packaging-perfume-flat.webp", alt: "The same perfume packaging laid out flat" },
      { caption: "VTRI banner", aspect: "1200/343", src: "/images/pg-vtri-banner.webp", alt: "A shopfront banner for the VTRI lingerie store" },
      { caption: "VTRI storefront", aspect: "1200/1515", src: "/images/pg-vtri-store.webp", alt: "The VTRI banner installed above the shop window" },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "digital-art",
    nextCategoryTitle: "Digital Drawings and Portraits",
  },
  de: {
    slug: "graphic-design",
    title: "Grafikdesign",
    intro:
      "Logos, Poster, Print und Verpackung — manches wurde umgesetzt, manches nie, und alles hat mir etwas beigebracht.",
    items: [
      { caption: "Logostudie", aspect: "803/1115", src: "/images/pg-logo.webp", alt: "Eine Wortbildmarke für Infrastruktur Technologie und Design" },
      { caption: "Abstraktes Formplakat", aspect: "1035/1359", rotated: true, src: "/images/pg-abstract.webp", alt: "Ein schwarz-weißer Strahlenkranz aus Formen" },
      { caption: "Hologramm-Plakat", aspect: "1200/1553", src: "/images/pg-poster-hologram.webp", alt: "Ein Produktplakat für eine holografische Uhr" },
      { caption: "Museumsplakat", aspect: "1200/1658", src: "/images/pg-poster-museum.webp", alt: "Ein illustriertes Kinderplakat für eine Museumsausstellung" },
      { caption: "Buchcover", aspect: "1200/891", src: "/images/pg-bookcover.webp", alt: "Ein Buchcover für „Glow in the Fog“, Vorderseite und Rücken" },
      { caption: "Veranstaltungsflyer", aspect: "1200/1242", rotated: true, src: "/images/pg-flyer.webp", alt: "Eine Reihe von Veranstaltungskarten in Rosa und Schwarz als Raster" },
      { caption: "Typografische Postkarte 1", aspect: "1029/760", src: "/images/pg-postcard-1.webp", alt: "Ein Schiller-Zitat entlang einer Kreisbahn gesetzt" },
      { caption: "Typografische Postkarte 2", aspect: "1029/760", rotated: true, src: "/images/pg-postcard-2.webp", alt: "Dasselbe Zitat zentriert in einer Serifenschrift" },
      { caption: "Typografische Postkarte 3", aspect: "1029/760", src: "/images/pg-postcard-3.webp", alt: "Dasselbe Zitat weiß aus Schwarz ausgespart" },
      { caption: "Chips-Verpackung", aspect: "794/956", src: "/images/pg-packaging-crisps.webp", alt: "Verpackung für eine scharfe Chips-Marke" },
      { caption: "Parfüm-Verpackung", aspect: "656/770", src: "/images/pg-packaging-perfume.webp", alt: "Eine dunkelblaue Parfümschachtel mit Blütenmuster" },
      { caption: "Parfüm-Verpackung — abgewickelt", aspect: "1185/1100", rotated: true, src: "/images/pg-packaging-perfume-flat.webp", alt: "Dieselbe Parfümverpackung flach ausgelegt" },
      { caption: "VTRI-Banner", aspect: "1200/343", src: "/images/pg-vtri-banner.webp", alt: "Ein Ladenbanner für den VTRI-Wäschestore" },
      { caption: "VTRI-Ladenfront", aspect: "1200/1515", src: "/images/pg-vtri-store.webp", alt: "Das VTRI-Banner über dem Schaufenster montiert" },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "digital-art",
    nextCategoryTitle: "Digitale Zeichnungen und Porträts",
  },
};

export default graphicDesign;
