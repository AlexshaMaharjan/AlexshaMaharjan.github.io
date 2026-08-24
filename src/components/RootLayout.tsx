import { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollBehavior } from "@/lib/useScrollBehavior";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import RouteLoading from "@/components/RouteLoading";

export default function RootLayout() {
  const locale = useLocale();
  const dictionary = useDictionary();

  useScrollBehavior();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="flex min-h-screen flex-col bg-page">
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
