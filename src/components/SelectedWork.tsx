import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { FeaturedProject, GridProject } from "@/components/ProjectEntry";

export default function SelectedWork({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const featured = dictionary.projects.filter((p) => p.featured);
  const rest = dictionary.projects.filter((p) => !p.featured);

  return (
    <section id="work" className="bg-white pb-10 pt-[160px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div data-inview className="mb-[110px] flex flex-col items-center gap-4 text-center">
          <span className="block text-[14px] text-accent">{dictionary.selectedWork.eyebrow}</span>
          <div className="max-w-[1120px]">
            <h2 className="text-[clamp(2.125rem,4.6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink">
              {dictionary.selectedWork.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[880px] text-[18px] leading-[1.65] text-ink-secondary">
              {dictionary.selectedWork.copy}
            </p>
          </div>
        </div>

        {featured.map((project) => (
          <FeaturedProject key={project.slug} project={project} locale={locale} dictionary={dictionary} />
        ))}

        <div className="grid grid-cols-1 gap-x-6 gap-y-24 pb-10 md:grid-cols-2">
          {rest.map((project) => (
            <GridProject key={project.slug} project={project} locale={locale} dictionary={dictionary} />
          ))}
        </div>
      </div>
    </section>
  );
}
