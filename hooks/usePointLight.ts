import { useEffect, useRef } from "react";
import { PointLight, Vector3 } from "three";
import { useThree } from "@/context/ThreeContext";
import { disposeObject } from "@/utils/disposeResources";
import { useOrbitControls } from "../context/OrbitControlsContext";

const usePointLight = () => {
  const objectRef = useRef<PointLight | null>(null);
  const { getScene, render, getCamera } = useThree();
  const { getOrbitControls } = useOrbitControls();

  useEffect(() => {
    const scene = getScene();
    const light = new PointLight(0xffffff, 1, 100, 2.0);
    light.power = 1600;
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

  //update position
  useEffect(() => {
    const camera = getCamera();
    const controls = getOrbitControls();

    const listener = () => {
      if (objectRef.current) {
        const newPosition = new Vector3();
        newPosition.setX(-camera.position.x);
        newPosition.setY(15);
        newPosition.setZ(camera.position.z > 0 ? -7 : 7);
        objectRef.current.position.set(...newPosition.toArray());
      }
    }
    listener();
    controls.addEventListener('change', listener);

    return () => {
      controls.removeEventListener('change', listener);
    }
  }, [getOrbitControls, getCamera, render])
}

export default usePointLight;