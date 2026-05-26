import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { COPY } from "../data/portfolio";

const I18nContext = createContext({ locale: "en", t: COPY.en, setLocale: () => {} });

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("locale");
    if (saved === "en" || saved === "fr") return saved;
    return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("locale", locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: COPY[locale] }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
