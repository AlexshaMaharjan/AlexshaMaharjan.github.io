import { lazy, type ReactElement } from "react";
import type { RouteObject } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import PlaygroundLayout from "@/components/playground/PlaygroundLayout";
import NotFound from "@/pages/NotFound";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Resume = lazy(() => import("@/pages/Resume"));
const Contact = lazy(() => import("@/pages/Contact"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const PlaygroundIndex = lazy(() => import("@/pages/playground/PlaygroundIndex"));
const PlaygroundCategory = lazy(() => import("@/pages/playground/PlaygroundCategory"));
const PlaygroundProject = lazy(() => import("@/pages/playground/PlaygroundProject"));

/** Registers `path` at both the default (unprefixed) and `/de`-prefixed locale. */
function dual(path: string, element: ReactElement): RouteObject[] {
  const bare = path === "/" ? "/" : path;
  const de = path === "/" ? "/de" : `/de${path}`;
  return [
    { path: bare, element },
    { path: de, element },
  ];
}

/** The playground section has its own dotted-grid background layout, mirrored for both locales. */
function dualPlayground(): RouteObject[] {
  const children: RouteObject[] = [
    { index: true, element: <PlaygroundIndex /> },
    { path: ":category", element: <PlaygroundCategory /> },
    { path: ":category/:slug", element: <PlaygroundProject /> },
  ];
  return [
    { path: "/playground", element: <PlaygroundLayout />, children },
    { path: "/de/playground", element: <PlaygroundLayout />, children },
  ];
}

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      ...dual("/", <Home />),
      ...dual("/about", <About />),
      ...dual("/resume", <Resume />),
      ...dual("/contact", <Contact />),
      ...dual("/work/:slug", <CaseStudy />),
      ...dualPlayground(),
      { path: "*", element: <NotFound /> },
    ],
  },
];
