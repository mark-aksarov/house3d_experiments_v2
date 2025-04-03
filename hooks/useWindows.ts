import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetGlassMaterial from "./useGetGlassMaterial";
import { useHouseContext } from "@/context/HouseContext";
import useGetBlindsMaterial from "./useGetBlindsMaterial";
import useGetWindowSashMaterial from "./useGetWindowSashMaterial";
import useGetWindowFrameMaterial from "./useGetWindowFrameMaterial";

export default function useWindows() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getBlindsMaterial = useGetBlindsMaterial();
  const getWindowSashMaterial = useGetWindowSashMaterial();
  const getWindowFrameMaterial = useGetWindowFrameMaterial();
  const getGlassMaterial = useGetGlassMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      if (scene) {
        scene.traverse(object => {
          if (object instanceof Mesh) {
            if (object.name.startsWith("WindowSash")) {
              object.material = getWindowSashMaterial();
            }
            else if (object.name.startsWith("WindowFrame")) {
              object.material = getWindowFrameMaterial();
            }
            else if (object.name.startsWith("WindowBlinds")) {
              object.material = getBlindsMaterial();
            }
            else if (object.name.startsWith("WindowGlass")) {
              object.material = getGlassMaterial();
            }
          }
        })
        render();
      }
    }
  }, [getScene, render, getBlindsMaterial, getWindowSashMaterial, getWindowFrameMaterial, getGlassMaterial, houseIsInScene])
}