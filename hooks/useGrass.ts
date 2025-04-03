import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetGrassMaterial from "./useGetGrassMaterial";
import { useHouseContext } from "@/context/HouseContext";

export default function useGrass() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getMaterial = useGetGrassMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const grass = scene.getObjectByName("Ground") as Mesh;
      grass.material = getMaterial();
      render();
    }
  }, [getScene, render, getMaterial, houseIsInScene])
}