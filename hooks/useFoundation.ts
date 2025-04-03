import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useHouseContext } from "@/context/HouseContext";
import useGetFoundationMaterial from "./useGetFoundationMaterial";

export default function useFoundation() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getMaterial = useGetFoundationMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const foundation = scene.getObjectByName("Foundation") as Mesh;
      foundation.material = getMaterial();
      render();
    }
  }, [getScene, render, getMaterial, houseIsInScene])
}