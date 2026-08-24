import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDictionary, useLocale } from "@/lib/useLocale";
import { absoluteUrl } from "@/lib/site";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets `document.title` and the metadata for the current route. No external
 * dependency — plain DOM writes on mount and update.
 *
 * **Every field is written on every route**, falling back to the site defaults
 * where a page does not supply one. It used to write only what it was given and
 * restore only the title, so a page that set fewer fields inherited the
 * previous one's — the résumé carried WikiMind's description and image
 * (`ISSUE-014`). Writing the full set is what makes that impossible; there is
 * nothing left to restore.
 */
export default function Seo({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
}) {
  const { pathname } = useLocation();
  const locale = useLocale();
  const dictionary = useDictionary();

  useEffect(() => {
    const resolvedDescription = description ?? dictionary.meta.description;
    const resolvedImage = absoluteUrl(image ?? "/images/alexsha_photo-mrx9hbwx-nif2.png");
    const url = absoluteUrl(pathname);

    document.title = title;
    setMeta("name", "description", resolvedDescription);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", resolvedDescription);
    setMeta("property", "og:image", resolvedImage);
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", locale === "de" ? "de_DE" : "en_US");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", resolvedDescription);
    setMeta("name", "twitter:image", resolvedImage);
    setLink("canonical", url);
  }, [title, description, image, pathname, locale, dictionary]);

  return null;
}
