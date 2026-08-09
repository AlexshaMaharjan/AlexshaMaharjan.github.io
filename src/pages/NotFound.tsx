import { Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";
import Seo from "@/components/Seo";

export default function NotFound() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const n = dictionary.notFound;

  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-[150px] pb-24 text-center">
      <Seo title={n.metaTitle} />
      <p className="font-mono text-[13px] text-accent">{n.eyebrow}</p>
      <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-ink">{n.heading}</h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.6] text-ink-secondary">{n.copy}</p>
      <Link
        to={localeHref(locale, "/")}
        className="mt-8 flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent"
      >
        {n.backHome}
      </Link>
    </section>
  );
}
