import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useHouseContext } from "@/context/HouseContext";
import useGetCornersMaterial from "./useGetCornersMaterial";

export default function useCorners() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getCornersMaterial = useGetCornersMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const corners = scene.getObjectByName("Corners") as Mesh;
      corners.material = getCornersMaterial();
      render();
    }
  }, [getScene, render, getCornersMaterial, houseIsInScene])
}