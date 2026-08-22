import { useParams } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { getProject } from "@/lib/playground/projects";
import ProjectPage from "@/components/playground/ProjectPage";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";

export default function PlaygroundProject() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const { category, slug } = useParams<{ category: string; slug: string }>();
  useScrollReveals();
  const content = slug ? getProject(slug, locale) : null;

  if (!content || content.categorySlug !== category) return <NotFound />;

  return (
    <>
      <Seo title={`${content.title} — Playground — Alexsha Maharjan`} description={content.intro} />
      <ProjectPage content={content} dictionary={dictionary} locale={locale} />
    </>
  );
}
