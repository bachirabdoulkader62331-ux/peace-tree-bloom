import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fr, type SiteContent } from "@/content/fr";
import { en } from "@/content/en";

export type Lang = "fr" | "en";

const DICT: Record<Lang, SiteContent> = { fr, en };
const STORAGE_KEY = "aip-lang";

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  c: SiteContent;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "fr" ? "en" : "fr"),
      c: DICT[lang],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
