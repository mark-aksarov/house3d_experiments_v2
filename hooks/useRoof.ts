import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import useGetRoofMaterial from "./useGetRoofMaterial";
import { useHouseContext } from "@/context/HouseContext";
import useGetRoofCoverMaterial from "./useGetRoofCoverMaterial";

export default function useRoof() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getRoofCoverMaterial = useGetRoofCoverMaterial();
  const getRoofMaterial = useGetRoofMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      if (scene) {
        const roofCover = scene.getObjectByName("RoofCover") as Mesh;
        roofCover.material = getRoofCoverMaterial();

        const roofBottom = scene.getObjectByName("RoofBottom") as Mesh;
        const roofSupport = scene.getObjectByName("RoofSupport") as Mesh;
        roofBottom.material = getRoofMaterial();
        roofSupport.material = getRoofMaterial();

        render();
      }
    }
  }, [getScene, render, getRoofCoverMaterial, getRoofMaterial, houseIsInScene])
}