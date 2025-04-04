import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetRoadMaterial from "./useGetRoadMaterial";
import { useHouseContext } from "@/context/HouseContext";

export default function useRoad() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getMaterial = useGetRoadMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      const road = scene.getObjectByName("Road") as Mesh;
      road.material = getMaterial();
      render();
    }
  }, [getScene, render, getMaterial, houseIsInScene])
}