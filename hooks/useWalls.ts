import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetWallsMaterial from "./useGetWallsMaterial";
import { useHouseContext } from "@/context/HouseContext";

export default function useWalls() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getMaterial = useGetWallsMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const walls = scene.getObjectByName("Walls") as Mesh;
      walls.material = getMaterial();
      render();
    }
  }, [getScene, render, getMaterial, houseIsInScene])
}