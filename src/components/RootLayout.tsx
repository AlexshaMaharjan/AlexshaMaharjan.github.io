import { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollBehavior } from "@/lib/useScrollBehavior";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import RouteLoading from "@/components/RouteLoading";
import PencilInk from "@/components/PencilInk";

export default function RootLayout() {
  const locale = useLocale();
  const dictionary = useDictionary();

  useScrollBehavior();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col bg-page">
      {/*
        The pencil the site's handwriting is drawn with, defined once for the
        whole document (`PencilInk`). It renders nothing — a zero-sized `<svg>`
        holding one `<filter>` — and every note's text reaches it through
        `.pencil-ink` in `index.css`.
      */}
      <PencilInk />
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex-1">
        <Suspense fallback={<RouteLoading label={dictionary.routeLoading} />}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </div>
  );
}
