import { useCallback, useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { getSystemTheme, Theme, useTheme } from "@/context/ThemeContext";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

const useUpdateToneMappingExposure = () => {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const { render, getRenderer } = useThree();
  const { theme, subscribeToThemeChange } = useTheme();

  const changeToneMapping = useCallback((theme: Theme | null) => {
    const isDark = theme === "dark" || (!theme && getSystemTheme() === "dark");

    let toneMappingExposure;
    if (isDark) {
      toneMappingExposure = 0.2;
    }
    else {
      toneMappingExposure = 1;
    }
    dispatch({ type: "toneMappingExposureChanged", payload: toneMappingExposure });
  }, [render, getRenderer, dispatch])

  useEffect(() => {
    const renderer = getRenderer();
    renderer.toneMappingExposure = settings.toneMappingExposure;
    render();
  }, [changeToneMapping, settings.toneMappingExposure, render, getRenderer])

  useEffect(() => {
    const unsubscribe = subscribeToThemeChange(changeToneMapping);

    return () => unsubscribe();
  }, [subscribeToThemeChange, changeToneMapping])

  useEffect(() => {
    changeToneMapping(theme);
  }, [changeToneMapping, theme])
};

export default useUpdateToneMappingExposure;

