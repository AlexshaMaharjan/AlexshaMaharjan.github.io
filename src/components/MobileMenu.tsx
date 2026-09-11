import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitch from "@/components/LanguageSwitch";

/**
 * The narrow-viewport navigation: a hamburger, and a drawer off the right-hand
 * edge (`MILESTONE-013` task 4).
 *
 * ## What changed
 *
 * The button said the word "Menu" and the panel was a full-screen overlay that
 * covered the page and centred five links in the middle of it. Both are the
 * owner's instruction and both are worth having:
 *
 * - **A hamburger, not a word.** "Menu" is 44 pixels of a 360-pixel bar spent
 *   on a label for a control that has had a universally understood glyph for
 *   fifteen years, and it has to be translated. The button keeps its
 *   `aria-label`, so the word is still there for anyone who needs it.
 * - **A drawer, not a takeover.** A full-screen panel loses the page: there is
 *   nothing to aim at to get back, which is why the only way out was the word
 *   "Close" where the hamburger had been. A drawer leaves the page visible
 *   beside it, and **the page is the way out** — that is what the owner means
 *   by "when clicked outside, it should close".
 *
 * ## The backdrop is a real element
 *
 * Closing on an outside click is written as a sibling that covers the rest of
 * the viewport and closes on its own click, rather than as a `document`
 * listener that closes whenever the click was not inside the panel. The
 * listener version is the one that goes wrong: it fires on the same click that
 * *opened* the drawer unless the handler is delayed or the event is stopped,
 * and it closes the drawer when someone clicks a scrollbar or drags a selection
 * that happens to end outside it. A backdrop cannot do either.
 *
 * The backdrop is `aria-hidden` and the drawer is a `dialog`: a pointer user
 * dismisses it by clicking the page, everyone else has Escape and the close
 * button, and no one is offered the backdrop as a control.
 *
 * ## Focus
 *
 * Opening moves focus into the panel and closing puts it back on the hamburger,
 * which is what stops a keyboard user being returned to the top of the document
 * every time they look at the menu. Focus is not trapped: the drawer is a short
 * list with a close button at the top of it, and a trap that has to be
 * maintained by hand is a bigger liability than tabbing past the end of a list
 * that is about to be dismissed by Escape anyway.
 */
export default function MobileMenu({
  locale,
  dictionary,
  pathname,
  isPlayground,
}: {
  locale: Locale;
  dictionary: Dictionary;
  pathname: string;
  isPlayground: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      buttonRef.current?.focus();
    };
  }, [open]);

  const links = [
    { href: localeHref(locale, "/#work"), label: dictionary.nav.projects },
    { href: localeHref(locale, "/about"), label: dictionary.nav.about },
    { href: localeHref(locale, "/#contact"), label: dictionary.nav.contact },
    {
      href: localeHref(locale, isPlayground ? "/" : "/playground"),
      label: isPlayground ? dictionary.nav.portfolio : dictionary.nav.playground,
    },
    { href: localeHref(locale, "/resume"), label: dictionary.footer.resume },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={dictionary.nav.menu}
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-accent-focus"
      >
        <span aria-hidden="true" className="flex w-[22px] flex-col gap-[5px]">
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-full rounded-full bg-current" />
        </span>
      </button>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[210] bg-[rgba(17,17,20,0.42)] backdrop-blur-[2px] motion-safe:animate-[fadeIn_180ms_ease-out]"
          />
          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={dictionary.landmarks.menu}
            tabIndex={-1}
            className={clsx(
              "fixed inset-y-0 right-0 z-[220] flex w-[min(320px,84vw)] flex-col overflow-y-auto border-l px-6 pb-8 pt-5 shadow-[-24px_0_60px_rgba(17,17,20,0.18)] outline-none motion-safe:animate-[drawerIn_240ms_cubic-bezier(.2,.75,.2,1)]",
              isPlayground ? "border-[rgba(78,96,135,0.18)] bg-page" : "border-[#EAECF0] bg-white",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-ink">Alexsha Maharjan</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dictionary.nav.close}
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent-focus"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label={dictionary.landmarks.menu} className="mt-8 flex flex-col items-start">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] w-full items-center border-b border-surface-2 text-[19px] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <LanguageSwitch locale={locale} pathname={pathname} dictionary={dictionary} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
