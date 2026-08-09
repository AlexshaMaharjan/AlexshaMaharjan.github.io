import { isLocale, defaultLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import HeroProcess from "@/components/process/HeroProcess";
import SelectedWork from "@/components/SelectedWork";
import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <HeroProcess dictionary={dictionary} />
      <SelectedWork dictionary={dictionary} locale={locale} />
      <AboutPreview dictionary={dictionary} locale={locale} />
      <ContactSection dictionary={dictionary} locale={locale} />
    </>
  );
}
