import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "../globals.css";
import { locales, isLocale, defaultLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      languages: { en: "/", de: "/de" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${caveat.variable}`}>
      <body className="flex min-h-screen flex-col bg-page">
        <Header locale={locale} dictionary={dictionary} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
