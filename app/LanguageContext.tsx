import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (v: 'en' | 'ka') => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ka'>('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}