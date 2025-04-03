import { useMemo } from "react";
import { getSystemTheme, useTheme } from "@/context/ThemeContext";

export function useToneMappingExposureRange() {
  const { theme } = useTheme();

  return useMemo(
    () =>
      theme === "dark" || (!theme && getSystemTheme() === "dark")
        ? [0.2, 0.5]
        : [0.75, 1.5],
    [theme]
  );
}