import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  criticalNotifications: boolean;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleCriticalNotifications: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('ar');
  const [criticalNotifications, setCriticalNotifications] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    const storedLanguage = localStorage.getItem('language') as Language;
    const storedNotifications = localStorage.getItem('criticalNotifications');

    if (storedTheme) setTheme(storedTheme);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedNotifications) setCriticalNotifications(storedNotifications === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleCriticalNotifications = () => {
    const newValue = !criticalNotifications;
    setCriticalNotifications(newValue);
    localStorage.setItem('criticalNotifications', newValue.toString());
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        criticalNotifications,
        toggleTheme,
        setLanguage: handleSetLanguage,
        toggleCriticalNotifications
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
