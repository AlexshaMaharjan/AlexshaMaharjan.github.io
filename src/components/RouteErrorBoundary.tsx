import { useEffect } from "react";
import { useRouteError, Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

function isChunkLoadError(err: unknown): boolean {
  if (!err) return false;
  const msg = (
    err instanceof Error
      ? err.message
      : typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err)
  ).toLowerCase();

  return (
    msg.includes("failed to fetch dynamically imported module") ||
    msg.includes("importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("failed to load module script") ||
    msg.includes("loading chunk")
  );
}

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const locale = useLocale();
  const dictionary = useDictionary();
  const isChunk = isChunkLoadError(error);

  useEffect(() => {
    if (isChunk) {
      const reloadKey = "portfolio_chunk_reload";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      // Auto-reload if not reloaded in the last 10 seconds to recover from stale deployments
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
      }
    }
  }, [isChunk]);

  const isEn = locale === "en";

  const title = isChunk
    ? isEn
      ? "Update available"
      : "Aktualisierung verfügbar"
    : isEn
      ? "Something went wrong"
      : "Etwas ist schiefgelaufen";

  const description = isChunk
    ? isEn
      ? "A new version of the portfolio has been published. Please reload the page to load the latest content."
      : "Eine neue Version des Portfolios wurde veröffentlicht. Bitte lade die Seite neu, um die neuesten Inhalte zu laden."
    : isEn
      ? "An unexpected error occurred while rendering this page."
      : "Beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten.";

  const reloadButtonText = isEn ? "Reload page" : "Seite neu laden";
  const backHomeText = isEn ? "Return to home" : "Zur Startseite";

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Seo title={`${title} — Alexsha Maharjan`} />
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex flex-1 flex-col items-center justify-center px-5 pt-[var(--page-top)] pb-24 text-center">
        <p className="font-mono text-[13px] text-accent">
          {isChunk ? "404 / STALE MODULE" : "APPLICATION ERROR"}
        </p>
        <h1 className="mt-4 text-feature font-semibold tracking-[-0.02em] text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.6] text-ink-secondary">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex h-10 cursor-pointer items-center rounded-full bg-ink px-6 text-[13.5px] font-medium text-white transition-colors hover:bg-accent"
          >
            {reloadButtonText}
          </button>
          <Link
            to={localeHref(locale, "/")}
            className="flex h-10 items-center rounded-full border border-black/10 px-6 text-[13.5px] font-medium text-ink transition-colors hover:border-ink dark:border-white/10 dark:hover:border-white"
          >
            {backHomeText}
          </Link>
        </div>
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </div>
  );
}
