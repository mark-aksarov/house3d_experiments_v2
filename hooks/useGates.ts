import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useHouseContext } from "@/context/HouseContext";
import useGetGatesDoorMaterial from "./useGetGatesDoorMaterial";
import useGetGatesFrameMaterial from "./useGetGatesFrameMaterial";

export default function useGates() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getGatesDoorMaterial = useGetGatesDoorMaterial();
  const getGatesFrameMaterial = useGetGatesFrameMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      scene.traverse(object => {
        if (object instanceof Mesh) {
          if (object.name.startsWith("GatesDoor")) {
            object.material = getGatesDoorMaterial();
          }
          else if (object.name.startsWith("GatesFrame")) {
            object.material = getGatesFrameMaterial();
          }
        }
      })
      render();
    }
  }, [getScene, render, getGatesDoorMaterial, getGatesFrameMaterial, houseIsInScene])
}