import { notFound } from "next/navigation";
import { isLocale, defaultLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getProject, projectSlugs } from "@/lib/playground/projects";
import ProjectPage from "@/components/playground/ProjectPage";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({ locale, category: "3d-motion", slug })),
  );
}

export default async function PlaygroundProjectRoute({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale: rawLocale, category, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  const content = getProject(slug, locale);

  if (!content || content.categorySlug !== category) notFound();

  return <ProjectPage content={content} dictionary={dictionary} locale={locale} />;
}
