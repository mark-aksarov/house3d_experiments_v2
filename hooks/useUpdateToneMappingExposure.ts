import { useCallback, useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { getSystemTheme, Theme, useTheme } from "@/context/ThemeContext";

const useUpdateToneMappingExposure = () => {
  const { render, getRenderer } = useThree();
  const { theme, subscribeToThemeChange } = useTheme();

  const changeToneMapping = useCallback((theme: Theme | null) => {
    const renderer = getRenderer();

    const isDark = theme === "dark" || (!theme && getSystemTheme() === "dark");

    if (isDark) {
      renderer.toneMappingExposure = 0.2;
    }
    else {
      renderer.toneMappingExposure = 1;
    }

    render();
  }, [render, getRenderer])

  useEffect(() => {
    const unsubscribe = subscribeToThemeChange(changeToneMapping);

    return () => unsubscribe();
  }, [subscribeToThemeChange, changeToneMapping])

  useEffect(() => {
    changeToneMapping(theme);
  }, [changeToneMapping, theme])
};

export default useUpdateToneMappingExposure;

