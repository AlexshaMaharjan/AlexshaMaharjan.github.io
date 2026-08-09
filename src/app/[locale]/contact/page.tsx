import { redirect } from "next/navigation";
import { isLocale, defaultLocale, localeHref } from "@/lib/i18n";

export default async function ContactRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  redirect(localeHref(locale, "/#contact"));
}
