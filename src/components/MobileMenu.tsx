import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ARCHIVE_PATH } from "@/lib/site";

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
 * ## The drawer is portalled to `document.body`, and that is a bug fix
 *
 * It used to render where it is written, inside the `<header>`. The header
 * gains `backdrop-blur-[10px]` the moment the page is scrolled — and
 * **`backdrop-filter` makes an element a containing block for its
 * `position: fixed` descendants.** So the drawer, which is `fixed inset-y-0`,
 * was being laid out against a 60-pixel bar instead of the viewport and clipped
 * to it: the owner saw "only some parts were visible", and saw it *sometimes*,
 * because at scroll position zero the header is transparent and has no
 * backdrop-filter at all.
 *
 * Portalling moves it out from under that containing block. `Lightbox` has
 * always done the same thing for the same reason.
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
    // Captured now rather than read in the cleanup: by the time the cleanup
    // runs the ref may point somewhere else, and the thing focus has to go back
    // to is the button that was there when the drawer opened.
    const trigger = buttonRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const otherLinks = [
    { href: localeHref(locale, "/about"), label: dictionary.nav.about },
    { href: localeHref(locale, "/#contact"), label: dictionary.nav.contact },
    {
      href: localeHref(locale, isPlayground ? "/" : ARCHIVE_PATH),
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

      {open &&
        createPortal(
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
                <Link
                  to={localeHref(locale, "/")}
                  onClick={() => setOpen(false)}
                  className="tap-target text-[15px] font-semibold text-ink transition-colors hover:text-accent"
                >
                  Alexsha Maharjan
                </Link>
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

              <nav aria-label={dictionary.landmarks.menu} className="mt-8 flex w-full flex-col items-start">
                {/* Projects with sub-navigation list */}
                <div className="w-full border-b border-surface-2 pb-3">
                  <Link
                    to={localeHref(locale, "/#work")}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[46px] w-full items-center text-[19px] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                  >
                    {dictionary.nav.projects}
                  </Link>
                  <div className="mt-1 flex flex-col gap-0.5 border-l-2 border-surface-2 pl-3.5">
                    {dictionary.projects.map((project) => {
                      const isActive = pathname.includes(project.slug);
                      return (
                        <Link
                          key={project.slug}
                          to={localeHref(locale, `/work/${project.slug}`)}
                          onClick={() => setOpen(false)}
                          className={clsx(
                            "flex py-1.5 text-[14px] transition-colors",
                            isActive
                              ? "font-semibold text-accent"
                              : "font-medium text-ink-secondary hover:text-accent"
                          )}
                        >
                          {project.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {otherLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[50px] w-full items-center border-b border-surface-2 text-[19px] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-10">
                <LanguageSwitch locale={locale} pathname={pathname} dictionary={dictionary} />
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
