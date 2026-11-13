import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'nl' | 'fr' | 'en';

const STORAGE_KEY = 'webstudiok_language';

const DOCUMENT_TITLES: Record<Language, string> = {
  nl: 'Webstudio K | Website laten maken in heel België',
  fr: 'Webstudio K | Création de site web sur mesure en Belgique',
  en: 'Webstudio K | Custom websites across Belgium',
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'nl',
  setLanguage: () => {},
});

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'nl';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'nl' || saved === 'fr' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted frames
  }
  return 'nl';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = (nextLang: Language) => {
    setLanguageState(nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage access errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = DOCUMENT_TITLES[language];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
