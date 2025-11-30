// context/LanguageContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

// 💡 IMPORT TRANSLATION DATA
import en from '@/i18n/locales/en.json';
import my from '@/i18n/locales/my.json';

// Define the structure of the context data
interface LanguageContextType {
  isEnglish: boolean; // false = 'my', true = 'en'
  setIsEnglish: (isEnglish: boolean) => void;
  t: (key: keyof typeof en) => string; // Translation function
  currentLang: 'my' | 'en'; // Current active language string
}

// Create the Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Map available languages
const translations = { en, my };
type Language = keyof typeof translations;

// Provider Component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state (false = Burmese is default)
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  const currentLang: Language = isEnglish ? 'en' : 'my';

  // Translation function
  const t = (key: keyof typeof en): string => {
    // Fallback logic: Try current language -> English -> return key if all fail
    return translations[currentLang][key] || translations['en'][key] || key;
  };

  const contextValue: LanguageContextType = {
    isEnglish,
    setIsEnglish,
    t,
    currentLang,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use the Language Context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};