import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetFenceMaterial from "./useGetFenceMaterial";
import { useHouseContext } from "@/context/HouseContext";

export default function useFence() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getFenceMaterial = useGetFenceMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      if (scene) {
        const fence = scene.getObjectByName("PorchRailings") as Mesh;
        const columns = scene.getObjectByName("Columns") as Mesh;

        const material = getFenceMaterial();
        fence.material = material;
        columns.material = material;

        render();
      }
    }
  }, [getScene, render, getFenceMaterial, houseIsInScene])
}