import { Color } from 'three';
import { useEffect } from 'react';
import { useThree } from '@/context/ThreeContext';
import { getSystemTheme, useTheme } from '@/context/ThemeContext';

const useUpdateSceneBackground = () => {
  const { theme } = useTheme();
  const { getScene, render } = useThree();

  useEffect(() => {
    const scene = getScene();

    if (theme === "dark" || (!theme && getSystemTheme() === "dark")) {
      scene.background = new Color(0x32373d);
    }
    else {
      scene.background = new Color(0xE0DBD7);
    }
    render();
  }, [theme, getScene, render])
}

export default useUpdateSceneBackground;