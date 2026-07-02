'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mm-theme');
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const initial = stored || system;
      setThemeState(initial);
      apply(initial);
      if (!stored && !localStorage.getItem('mm-theme-toast')) {
        const id = setTimeout(() => setShowToast(true), 1200);
        return () => clearTimeout(id);
      }
    } catch (e) {}
  }, []);

  const setTheme = (t) => {
    setThemeState(t);
    apply(t);
    try { localStorage.setItem('mm-theme', t); } catch (e) {}
  };

  const dismissToast = () => {
    setShowToast(false);
    try { localStorage.setItem('mm-theme-toast', '1'); } catch (e) {}
  };

  return (
    <Ctx.Provider value={{ theme, setTheme, showToast, dismissToast }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}
