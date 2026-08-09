import { useEffect } from "react";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Sets document.title and meta tags for the current route. No external dependency —
 * plain DOM writes on mount/update, restored to the site defaults on unmount. */
export default function Seo({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    setMeta("property", "og:title", title);
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    if (image) {
      setMeta("property", "og:image", image);
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image]);

  return null;
}
