import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useHouseContext } from "@/context/HouseContext";
import useGetPavingMaterial from "./useGetPavingMaterial";

export default function usePaving() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getMaterial = useGetPavingMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const paving = scene.getObjectByName("Paving") as Mesh;
      paving.material = getMaterial();
      render();
    }
  }, [getScene, render, getMaterial, houseIsInScene])
}