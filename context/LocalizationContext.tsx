import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { Language } from '../types';
// JSON files are no longer imported directly

// Define types for better safety
type Translations = { [key: string]: string };
type AllTranslations = { en: Translations; ru: Translations; };
type LocalizationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string; // Key is now a generic string
};

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Initial state to prevent errors before loading
const initialTranslations: AllTranslations = { en: {}, ru: {} };

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru'); // Default to Russian
  const [translations, setTranslations] = useState<AllTranslations>(initialTranslations);

  useEffect(() => {
    // Fetch translation files when the component mounts
    const fetchTranslations = async () => {
      try {
        const [enResponse, ruResponse] = await Promise.all([
          fetch('./locales/en.json'), // Path is relative to the root index.html
          fetch('./locales/ru.json')
        ]);
        const enData = await enResponse.json();
        const ruData = await ruResponse.json();
        setTranslations({ en: enData, ru: ruData });
      } catch (error) {
        console.error("Failed to load translation files:", error);
        // If loading fails, the app will continue to function with translation keys as text
      }
    };
    fetchTranslations();
  }, []); // The empty dependency array ensures this effect runs only once

  const t = (key: string): string => {
    // Return the key itself if translations for the current language haven't been loaded yet
    const langTranslations = translations[language];
    return langTranslations[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};