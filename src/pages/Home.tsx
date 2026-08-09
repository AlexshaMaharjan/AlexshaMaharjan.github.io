import { useLocale, useDictionary } from "@/lib/useLocale";
import Seo from "@/components/Seo";
import HeroProcess from "@/components/process/HeroProcess";
import SelectedWork from "@/components/SelectedWork";
import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const locale = useLocale();
  const dictionary = useDictionary();

  return (
    <>
      <Seo title={dictionary.meta.title} description={dictionary.meta.description} />
      <HeroProcess dictionary={dictionary} />
      <SelectedWork dictionary={dictionary} locale={locale} />
      <AboutPreview dictionary={dictionary} locale={locale} />
      <ContactSection dictionary={dictionary} locale={locale} />
    </>
  );
}
