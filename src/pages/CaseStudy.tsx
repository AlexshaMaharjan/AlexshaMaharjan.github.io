import { use } from "react";
import { useParams } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { caseStudyPromise, localeContent } from "@/lib/caseStudies";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";

export default function CaseStudy() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const { slug } = useParams<{ slug: string }>();
  useScrollReveals();

  /*
   * `use` rather than an effect, so this component suspends into RootLayout's
   * loading bar while the study's chunk arrives (ISSUE-019, ISSUE-020) and then
   * renders with its content already in hand. An effect would render the page
   * empty first, and `useScrollReveals` above would build its triggers against
   * markup that did not exist yet — the shape of ISSUE-001 all over again.
   */
  const content = localeContent(use(caseStudyPromise(slug ?? "")), locale);
  const projects = dictionary.projects;
  const index = projects.findIndex((p) => p.slug === slug);

  if (!content || index === -1) return <NotFound />;

  // Everything except the one being read, in the homepage's order
  // (`MILESTONE-019` task 6) — see `MoreProjectsNav` for why it is all five and
  // no longer a previous and a next.
  const others = projects.filter((p) => p.slug !== slug);

  return (
    <>
      <Seo title={`${content.name} — Alexsha Maharjan`} description={content.summary} image={content.heroImage.src || undefined} />
      <CaseStudyPage content={content} dictionary={dictionary} locale={locale} others={others} />
    </>
  );
}
