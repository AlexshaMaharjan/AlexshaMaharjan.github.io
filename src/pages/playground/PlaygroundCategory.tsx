import { useParams } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { getCategory } from "@/lib/playground/categories";
import CategoryPage from "@/components/playground/CategoryPage";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";

export default function PlaygroundCategory() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const { category } = useParams<{ category: string }>();
  const content = category ? getCategory(category, locale) : null;

  if (!content) return <NotFound />;

  return (
    <>
      <Seo title={`${content.title} — Playground — Alexsha Maharjan`} description={content.intro} />
      <CategoryPage content={content} dictionary={dictionary} locale={locale} />
    </>
  );
}
