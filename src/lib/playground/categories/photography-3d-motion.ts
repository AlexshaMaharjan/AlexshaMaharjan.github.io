import type { PlaygroundCategoryLocaleContent } from "../types";

/*
 * Photography joined 3D and Motion in SESSION-033 rather than becoming a
 * seventh category of its own (`ISSUE-038` had left two photographs unplaced
 * for exactly that reason). Two photographs do not make a section, and the
 * three share a subject: light, and what it does to a surface over time.
 */
const photography3dMotion: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "photography-3d-motion",
    title: "Photography, Animation and 3D",
    intro:
      "Low-key photography, Blender and Unreal experiments, and After Effects compositions — light, and things that move.",
    items: [
      { caption: "Mirrored still life", aspect: "250/193", src: "/images/pg-photo-stilllife.webp", alt: "Forks and grapes mirrored on black glass, arranged to read as a pair of eyes" },
      { caption: "Low-key portrait", aspect: "2/3", rotated: true, src: "/images/pg-photo-lowkey.webp", alt: "A singer lit by red and blue gels against black, mid-phrase with a microphone" },
      { slug: "motorbike-study", caption: "3D motorbike", aspect: "4/5" },
      { caption: "Blender experiments", aspect: "4/3", rotated: true },
      { caption: "Unreal animation", aspect: "3/4" },
      { caption: "After Effects compositions", aspect: "4/3" },
      { caption: "Motion studies", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "graphic-design",
    nextCategoryTitle: "Graphic Design",
  },
  de: {
    slug: "photography-3d-motion",
    title: "Fotografie, Animation und 3D",
    intro:
      "Low-Key-Fotografie, Blender- und Unreal-Experimente und After-Effects-Kompositionen — Licht, und Dinge in Bewegung.",
    items: [
      { caption: "Gespiegeltes Stillleben", aspect: "250/193", src: "/images/pg-photo-stilllife.webp", alt: "Gabeln und Weintrauben auf schwarzem Glas gespiegelt, angeordnet wie ein Augenpaar" },
      { caption: "Low-Key-Porträt", aspect: "2/3", rotated: true, src: "/images/pg-photo-lowkey.webp", alt: "Eine singende Person in rotem und blauem Licht vor Schwarz, mit Mikrofon" },
      { slug: "motorbike-study", caption: "3D-Motorrad", aspect: "4/5" },
      { caption: "Blender-Experimente", aspect: "4/3", rotated: true },
      { caption: "Unreal-Animation", aspect: "3/4" },
      { caption: "After-Effects-Kompositionen", aspect: "4/3" },
      { caption: "Motion-Studien", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "graphic-design",
    nextCategoryTitle: "Grafikdesign",
  },
};

export default photography3dMotion;
