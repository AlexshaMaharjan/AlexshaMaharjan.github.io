import { Navigate } from "react-router-dom";
import { useLocale } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";

export default function Contact() {
  const locale = useLocale();
  return <Navigate to={localeHref(locale, "/#contact")} replace />;
}
