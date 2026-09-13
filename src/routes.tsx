import { lazy, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import PlaygroundLayout from "@/components/playground/PlaygroundLayout";
import NotFound from "@/pages/NotFound";
import Legal from "@/pages/Legal";
import { ARCHIVE_LEGACY_PATH, ARCHIVE_PATH } from "@/lib/site";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Resume = lazy(() => import("@/pages/Resume"));
const Contact = lazy(() => import("@/pages/Contact"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const PlaygroundIndex = lazy(() => import("@/pages/playground/PlaygroundIndex"));
/*
 * The archive's editing form, on `npm run dev` only (`MILESTONE-022` task 11).
 *
 * `import.meta.env.DEV` is replaced with `false` at build time, so the ternary
 * folds to `null` and the dynamic import becomes unreachable: the editor is not
 * in the published bundle, and its endpoint does not exist there either
 * (`vite.config.ts`). Guarding the `lazy()` rather than only the route is what
 * makes that true — a `lazy()` at module scope is a chunk whether or not
 * anything renders it.
 */
const ArchiveEditor = import.meta.env.DEV
  ? lazy(() => import("@/pages/playground/ArchiveEditor"))
  : null;

/** Registers `path` at both the default (unprefixed) and `/de`-prefixed locale. */
function dual(path: string, element: ReactElement): RouteObject[] {
  const bare = path === "/" ? "/" : path;
  const de = path === "/" ? "/de" : `/de${path}`;
  return [
    { path: bare, element },
    { path: de, element },
  ];
}

/**
 * The archive has its own dotted-grid background layout, mirrored for both
 * locales, and it answers to its old address as well as its new one.
 *
 * The page was `/playground` until `MILESTONE-022` task 4. A renamed route
 * breaks every link anybody already has, so the old path is kept as a redirect
 * rather than deleted — one route each side, `replace` so the old address does
 * not sit in the back button. `ARCHIVE_PATH` is the single spelling of the new
 * one (`lib/site`).
 */
function dualArchive(): RouteObject[] {
  const children: RouteObject[] = [
    { index: true, element: <PlaygroundIndex /> },
  ];
  return [
    { path: ARCHIVE_PATH, element: <PlaygroundLayout />, children },
    { path: `/de${ARCHIVE_PATH}`, element: <PlaygroundLayout />, children },
    ...(ArchiveEditor ? [{ path: `${ARCHIVE_PATH}/edit`, element: <ArchiveEditor /> }] : []),
    { path: ARCHIVE_LEGACY_PATH, element: <Navigate to={ARCHIVE_PATH} replace /> },
    { path: `/de${ARCHIVE_LEGACY_PATH}`, element: <Navigate to={`/de${ARCHIVE_PATH}`} replace /> },
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
      /*
        German legal paths in both locales (`MILESTONE-013` task 9). See
        `LegalCopy` for why they are not translated.
      */
      ...dual("/impressum", <Legal page="impressum" />),
      ...dual("/datenschutz", <Legal page="privacy" />),
      ...dual("/work/:slug", <CaseStudy />),
      ...dualArchive(),
      { path: "*", element: <NotFound /> },
    ],
  },
];
