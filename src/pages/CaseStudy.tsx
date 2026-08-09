import { useParams } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { getCaseStudy } from "@/lib/caseStudies";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";

export default function CaseStudy() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const { slug } = useParams<{ slug: string }>();

  const content = slug ? getCaseStudy(slug, locale) : null;
  const projects = dictionary.projects;
  const index = projects.findIndex((p) => p.slug === slug);

  if (!content || index === -1) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <>
      <Seo title={`${content.name} — Alexsha Maharjan`} description={content.summary} image={content.heroImage.src || undefined} />
      <CaseStudyPage content={content} dictionary={dictionary} locale={locale} prev={prev} next={next} />
    </>
  );
}
