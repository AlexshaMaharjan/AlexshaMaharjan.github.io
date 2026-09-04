import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import type { ProjectCopy, Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

export default function NextProjectNav({
  prev,
  next,
  dictionary,
  locale,
}: {
  prev: ProjectCopy;
  next: ProjectCopy;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <nav aria-label={dictionary.landmarks.projectNav} className="border-t border-surface-2 py-[72px] pb-[110px]">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            to={localeHref(locale, `/work/${prev.slug}`)}
            className="block rounded-[10px] border border-card-border p-6 transition-colors hover:border-accent"
          >
            <span className="font-mono text-[12px] text-ink-muted">{dictionary.caseStudy.previousProject}</span>
            <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-md border border-card-border bg-surface">
              <Image src={prev.image} alt={prev.imageAlt} fill sizes="(min-width: 768px) calc(50vw - 90px), calc(100vw - 40px)" className="object-cover" />
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em] text-ink">{prev.name}</h3>
            <p className="mt-2 text-[13px] text-ink-secondary">{prev.tags.join(" · ")}</p>
          </Link>
          <Link
            to={localeHref(locale, `/work/${next.slug}`)}
            className="block rounded-[10px] border border-card-border p-6 text-right transition-colors hover:border-accent"
          >
            <span className="font-mono text-[12px] text-ink-muted">{dictionary.caseStudy.nextProject}</span>
            <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-md border border-card-border bg-surface">
              <Image src={next.image} alt={next.imageAlt} fill sizes="(min-width: 768px) calc(50vw - 90px), calc(100vw - 40px)" className="object-cover" />
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em] text-ink">{next.name}</h3>
            <p className="mt-2 text-[13px] text-ink-secondary">{next.tags.join(" · ")}</p>
          </Link>
        </div>
        <div className="mt-10 text-center">
          <Link to={localeHref(locale, "/#work")} className="tap-target text-[15px] font-medium text-accent hover:underline">
            {dictionary.caseStudy.viewAllWork}
          </Link>
        </div>
      </div>
    </nav>
  );
}
