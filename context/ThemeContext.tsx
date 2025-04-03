"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';

export type Theme = "dark" | "light";

const themeChangeEventName = "themeChange";

interface ThemeContextType {
  theme: Theme | null;
  changeTheme: (theme: Theme | null) => void;
  subscribeToThemeChange: (callback: (theme: Theme | null) => void) => () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const getDarkMediaQuery = () => window.matchMedia("(prefers-color-scheme: dark)");
export const getSystemTheme = (): Theme => getDarkMediaQuery().matches ? "dark" : "light";

class ThemeChangeEmitter extends EventTarget {
  emit(theme: Theme | null) {
    this.dispatchEvent(new CustomEvent<{ theme: Theme | null }>(themeChangeEventName, { detail: { theme } }));
  }
}

export const ThemeProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const themeChangeEmitterRef = useRef<ThemeChangeEmitter | null>(null);

  if (!themeChangeEmitterRef.current) {
    themeChangeEmitterRef.current = new ThemeChangeEmitter();
  }

  const [theme, setTheme] = useState<Theme | null>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      let initialTheme;
      if (storedTheme === "light" || storedTheme === "dark") {
        initialTheme = storedTheme;
      }

      return initialTheme;
    }
    return null;
  });

  const changeTheme = useCallback((theme: Theme | null) => {
    const root = document.firstElementChild!;

    if (theme === null) {
      localStorage.removeItem("theme");
      root.removeAttribute('data-theme');
    }
    else {
      localStorage.setItem("theme", theme);
      root.setAttribute('data-theme', theme);
    }

    setTheme(theme);
    themeChangeEmitterRef.current!.emit(theme);
  }, [])

  // reset theme to null when prefers-color-scheme changes because user choose theme using browser
  useEffect(() => {
    const mediaQuery = getDarkMediaQuery();

    const handleThemeChange = () => {
      changeTheme(null);
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [changeTheme]);

  const subscribeToThemeChange = useCallback((callback: (theme: Theme | null) => void) => {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: Theme | null }>;
      callback(customEvent.detail.theme);
    };

    themeChangeEmitterRef.current!.addEventListener(themeChangeEventName, listener);

    return () => {
      themeChangeEmitterRef.current!.removeEventListener(themeChangeEventName, listener);
    }
  }, [])

  const contextValue = useMemo(() => ({
    theme,
    changeTheme,
    subscribeToThemeChange
  }), [theme, changeTheme, subscribeToThemeChange]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};