import { notFound } from "next/navigation";
import { isLocale, defaultLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getCategory, categorySlugs } from "@/lib/playground/categories";
import CategoryPage from "@/components/playground/CategoryPage";

export function generateStaticParams() {
  return locales.flatMap((locale) => categorySlugs.map((category) => ({ locale, category })));
}

export default async function PlaygroundCategoryRoute({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale, category } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  const content = getCategory(category, locale);

  if (!content) notFound();

  return <CategoryPage content={content} dictionary={dictionary} locale={locale} />;
}
