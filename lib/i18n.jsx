'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const Ctx = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    try {
      const s = localStorage.getItem('mm-locale');
      if (s && translations[s]) setLocale(s);
    } catch (e) {}
  }, []);
  useEffect(() => {
    try { document.documentElement.lang = locale; } catch (e) {}
  }, [locale]);
  const change = (l) => {
    setLocale(l);
    try { localStorage.setItem('mm-locale', l); } catch (e) {}
  };
  return (
    <Ctx.Provider value={{ locale, setLocale: change, t: translations[locale] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  return useContext(Ctx);
}
