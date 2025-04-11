import { DirectionalLight } from "three";
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useThree } from "@/context/ThreeContext";
import { useSettings } from "@/context/SettingsContext";
import { disposeObject } from "@/utils/disposeResources";

export default function useSunLight() {
  const objectRef = useRef<DirectionalLight | null>(null);
  const { theme } = useTheme();
  const state = useSettings();
  const { getScene, render } = useThree();

  useEffect(() => {
    const scene = getScene();

    const light = new DirectionalLight(0xffffff);
    light.shadow.bias = -0.00007;
    light.shadow.camera.left = -60;
    light.shadow.camera.right = 60;
    light.shadow.camera.bottom = -60;
    light.shadow.camera.top = 60;
    light.position.set(-10, 15, -10);
    light.target.position.set(0, 0, 4);
    light.target.updateMatrixWorld();

    objectRef.current = light;
    scene.add(light);
    render();

    //object is removed and disposed
    return () => {
      scene.remove(light);
      disposeObject(light);
      render();
    }
  }, [getScene, render])

  //update intensity
  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.intensity = theme === 'light' ? 6 : 4;
      render();
    }
  }, [theme, render])

  //toggle shadows
  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.castShadow = state.shadowsEnabled;
      render();
    }
  }, [state.shadowsEnabled, render])

  //update shadows resolution
  useEffect(() => {
    if (objectRef.current) {
      let mapSize;

      if (state.shadowsResolution === "1024x1024") {
        mapSize = 1024;
      }
      else if (state.shadowsResolution === "2048x2048") {
        mapSize = 2048;
      }
      else if (state.shadowsResolution === "4096x4096") {
        mapSize = 4096;
      }
      else {
        throw new Error(`Unknown shadowsResolution: ${state.shadowsResolution}`);
      }

      objectRef.current.shadow.mapSize.set(mapSize, mapSize);
      if (objectRef.current.shadow.map) {
        objectRef.current.shadow.map.setSize(mapSize, mapSize);
      }
      render();
    }
  }, [state.shadowsResolution, render])
}