import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function MobileMenu({
  locale,
  dictionary,
  pathname,
}: {
  locale: Locale;
  dictionary: Dictionary;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: localeHref(locale, "/#work"), label: dictionary.nav.projects },
    { href: localeHref(locale, "/#about"), label: dictionary.nav.about },
    { href: localeHref(locale, "/#contact"), label: dictionary.nav.contact },
  ];

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] items-center px-1 text-[15px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent-focus"
      >
        {open ? dictionary.nav.close : dictionary.nav.menu}
      </button>

      {open && (
        <div
          id={panelId}
          className="fixed inset-0 z-[190] overflow-y-auto border-b border-[#EAECF0] bg-white px-5 pb-8 pt-[132px]"
        >
          <nav
            aria-label="Menu"
            className="flex flex-col items-center gap-1 text-center"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center py-3 text-[20px] font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitch
              locale={locale}
              pathname={pathname}
              dictionary={dictionary}
              className="mt-4"
            />
          </nav>
        </div>
      )}
    </>
  );
}
