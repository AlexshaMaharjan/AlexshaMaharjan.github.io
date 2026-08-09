import type { PlaygroundCategoryLocaleContent } from "../types";

const threeDMotion: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "3d-motion",
    title: "3D and Motion",
    intro: "Blender, Unreal and After Effects experiments — learning to make things move.",
    items: [
      { slug: "motorbike-study", caption: "3D motorbike", aspect: "4/5" },
      { caption: "Blender experiments", aspect: "4/3", rotated: true },
      { caption: "Unreal animation", aspect: "3/4" },
      { caption: "After Effects compositions", aspect: "4/3" },
      { caption: "Motion studies", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "interactive",
    nextCategoryTitle: "Games and Interactive Experiments",
  },
  de: {
    slug: "3d-motion",
    title: "3D und Motion",
    intro: "Experimente mit Blender, Unreal und After Effects — Dinge in Bewegung bringen.",
    items: [
      { slug: "motorbike-study", caption: "3D-Motorrad", aspect: "4/5" },
      { caption: "Blender-Experimente", aspect: "4/3", rotated: true },
      { caption: "Unreal-Animation", aspect: "3/4" },
      { caption: "After-Effects-Kompositionen", aspect: "4/3" },
      { caption: "Motion-Studien", aspect: "16/10", rotated: true },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "interactive",
    nextCategoryTitle: "Games und interaktive Experimente",
  },
};

export default threeDMotion;
