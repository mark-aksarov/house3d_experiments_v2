import { AmbientLight } from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@/context/ThreeContext";
import { useSettings } from "@/context/SettingsContext";
import { disposeObject } from "@/utils/disposeResources";

const useAmbientLight = () => {
  const objectRef = useRef<AmbientLight | null>(null);
  const state = useSettings();
  const { getScene, render } = useThree();

  useEffect(() => {
    const scene = getScene();
    const light = new AmbientLight(0xffffff, 1);
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

  //toggle visibility
  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.intensity = state.ambientLightIntensity;
      render();
    }
  }, [state.ambientLightIntensity, render])
}

export default useAmbientLight;