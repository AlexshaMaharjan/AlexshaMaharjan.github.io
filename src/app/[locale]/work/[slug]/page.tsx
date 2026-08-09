import { notFound } from "next/navigation";
import { isLocale, defaultLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getCaseStudy, caseStudySlugs } from "@/lib/caseStudies";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  const content = getCaseStudy(slug, locale);

  if (!content) notFound();

  const projects = dictionary.projects;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return <CaseStudyPage content={content} dictionary={dictionary} locale={locale} prev={prev} next={next} />;
}
