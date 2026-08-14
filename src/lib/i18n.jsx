import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { TRANSLATIONS } from "./i18n-translations";

const STORAGE_KEY = "atebiz_lang";
const DEFAULT_LANG = "es";

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  t: TRANSLATIONS[DEFAULT_LANG],
  setLang: () => {},
  toggleLang: () => {},
});

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Cargar preferencia guardada
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && TRANSLATIONS[saved]) {
        setLangState(saved);
      } else {
        // Detectar idioma del navegador si no hay preferencia
        const browserLang = navigator.language?.slice(0, 2);
        if (browserLang && TRANSLATIONS[browserLang]) {
          setLangState(browserLang);
        }
      }
    } catch {}
  }, []);

  const setLang = useCallback((l) => {
    if (!TRANSLATIONS[l]) return;
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  const value = {
    lang,
    t: TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG],
    setLang,
    toggleLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
