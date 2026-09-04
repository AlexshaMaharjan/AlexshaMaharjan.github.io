import type { PlaygroundProjectLocaleContent } from "../types";

const motorbikeStudy: PlaygroundProjectLocaleContent = {
  en: {
    slug: "motorbike-study",
    categorySlug: "3d-motion",
    categoryTitle: "3D and Motion",
    title: "Motorbike Study",
    intro:
      "A 3D modelling and motion experiment exploring surface detail, lighting and cinematic presentation.",
    mainCaption: "final render — studio lighting setup",
    mainAspect: "16/9",
    processHeading: "Process",
    processItems: [
      { caption: "blockout in Blender", aspect: "4/3" },
      { caption: "material + lighting tests", aspect: "4/3", rotated: true },
      { caption: "camera move in Unreal", aspect: "4/3" },
    ],
    toolsHeading: "Tools",
    tools: ["Blender", "Unreal Engine", "After Effects"],
    reflectionHeading: "Reflection",
    reflection:
      "This experiment was an exercise in patience: modelling hard surfaces cleanly, building light and letting the camera do the storytelling. Most of it will never become client work — which is exactly why it is fun.",
    nextLabel: "Next experiment",
    nextSlug: "",
    nextCategorySlug: "crafts",
    nextTitle: "Bead & Plant Objects",
  },
  de: {
    slug: "motorbike-study",
    categorySlug: "3d-motion",
    categoryTitle: "3D und Motion",
    title: "Motorradstudie",
    intro:
      "Ein 3D- und Motion-Experiment zu Oberflächendetails, Licht und filmischer Präsentation.",
    mainCaption: "Finales Rendering — Studiolicht-Aufbau",
    mainAspect: "16/9",
    processHeading: "Prozess",
    processItems: [
      { caption: "Blockout in Blender", aspect: "4/3" },
      { caption: "Material- und Lichttests", aspect: "4/3", rotated: true },
      { caption: "Kamerafahrt in Unreal", aspect: "4/3" },
    ],
    toolsHeading: "Werkzeuge",
    tools: ["Blender", "Unreal Engine", "After Effects"],
    reflectionHeading: "Reflexion",
    reflection:
      "Dieses Experiment war eine Übung in Geduld: harte Oberflächen sauber modellieren, Licht aufbauen und die Kamera erzählen lassen. Das meiste davon wird nie ein Kundenprojekt — genau deshalb macht es Spaß.",
    nextLabel: "Nächstes Experiment",
    nextSlug: "",
    nextCategorySlug: "crafts",
    nextTitle: "Perlen- und Pflanzenobjekte",
  },
};

export default motorbikeStudy;
