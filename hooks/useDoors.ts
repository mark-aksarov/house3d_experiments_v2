import { Mesh } from "three";
import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useHouseContext } from "@/context/HouseContext";
import useGetDoorPanelMaterial from "./useGetDoorPanelMaterial";
import useGetDoorHandleAndHingesMaterial from "./useGetDoorHandleAndHingesMaterial";

export default function useDoors() {
  const { getScene, render } = useThree();
  const { houseIsInScene } = useHouseContext();
  const getDoorPanelMaterial = useGetDoorPanelMaterial();
  const getDoorHandleAndHingesMaterial = useGetDoorHandleAndHingesMaterial();

  useEffect(() => {
    if (houseIsInScene) {
      const scene = getScene();

      if (scene) {
        scene.traverse(object => {
          if (object instanceof Mesh) {
            if (object.name.startsWith("DoorFrame") || object.name.startsWith("DoorPanel")) {
              object.material = getDoorPanelMaterial();
            }
            else if (object.name.startsWith("DoorHandle") || object.name.startsWith("DoorHinges")) {
              object.material = getDoorHandleAndHingesMaterial();
            }
          }
        })
        render();
      }
    }
  }, [getScene, render, getDoorPanelMaterial, getDoorHandleAndHingesMaterial, houseIsInScene])
}