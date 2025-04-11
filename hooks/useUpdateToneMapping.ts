import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useSettings } from "@/context/SettingsContext";

const useUpdateToneMapping = () => {
  const settings = useSettings();
  const { render, getRenderer } = useThree();

  useEffect(() => {
    const renderer = getRenderer();
    renderer.toneMapping = settings.toneMapping;
    render();
  }, [settings.toneMapping, render, getRenderer])
};

export default useUpdateToneMapping;