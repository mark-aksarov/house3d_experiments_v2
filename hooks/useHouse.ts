import { Mesh } from "three";
import { useThree } from "@/context/ThreeContext";
import { useModels } from "@/context/ModelsContext";
import useGetRoofMaterial from "./useGetRoofMaterial";
import useGetRoadMaterial from "./useGetRoadMaterial";
import useGetFenceMaterial from "./useGetFenceMaterial";
import useGetGlassMaterial from "./useGetGlassMaterial";
import useGetWallsMaterial from "./useGetWallsMaterial";
import { useTextures } from "@/context/TexturesContext";
import { disposeObject } from "@/utils/disposeResources";
import useGetBlindsMaterial from "./useGetBlindsMaterial";
import useGetPavingMaterial from "./useGetPavingMaterial";
import useGetCornersMaterial from "./useGetCornersMaterial";
import { Dispatch, SetStateAction, useEffect } from "react";
import useGetDoorPanelMaterial from "./useGetDoorPanelMaterial";
import useGetGatesDoorMaterial from "./useGetGatesDoorMaterial";
import useGetRoofCoverMaterial from "./useGetRoofCoverMaterial";
import useGetGatesFrameMaterial from "./useGetGatesFrameMaterial";
import useGetWindowSashMaterial from "./useGetWindowSashMaterial";
import useGetFoundationMaterial from "./useGetFoundationMaterial";
import useGetWindowFrameMaterial from "./useGetWindowFrameMaterial";
import useGetDoorHandleAndHingesMaterial from "./useGetDoorHandleAndHingesMaterial";

const useHouse = (setIsFirstModelRenderingComplete: Dispatch<SetStateAction<boolean>>) => {
  const { models, status: modelsLoadStatus } = useModels();
  const { status: texturesLoadStatus } = useTextures();
  const { selectedModelName } = useModels();
  const { getScene, getRenderer, getCamera } = useThree();
  const getPavingMaterial = useGetPavingMaterial();
  const getRoadMaterial = useGetRoadMaterial();
  const getGatesDoorMaterial = useGetGatesDoorMaterial();
  const getGatesFrameMaterial = useGetGatesFrameMaterial();
  const getWallsMaterial = useGetWallsMaterial();
  const getRoofCoverMaterial = useGetRoofCoverMaterial();
  const getRoofMaterial = useGetRoofMaterial();
  const getBlindsMaterial = useGetBlindsMaterial();
  const getWindowSashMaterial = useGetWindowSashMaterial();
  const getWindowFrameMaterial = useGetWindowFrameMaterial();
  const getGlassMaterial = useGetGlassMaterial();
  const getCornersMaterial = useGetCornersMaterial();
  const getDoorPanelMaterial = useGetDoorPanelMaterial();
  const getDoorHandleAndHingesMaterial = useGetDoorHandleAndHingesMaterial();
  const getFenceMaterial = useGetFenceMaterial();
  const getFoundationMaterial = useGetFoundationMaterial();

  const isResourcesLoaded = modelsLoadStatus === "success" && texturesLoadStatus === "success";

  useEffect(() => {
    if (isResourcesLoaded) {
      const scene = getScene();
      const renderer = getRenderer();
      const camera = getCamera();
      const model = models![selectedModelName];

      model.traverse(object => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;

          if (object.name === "Paving") {
            object.material = getPavingMaterial();
          }
          else if (object.name === "Road") {
            object.material = getRoadMaterial();
          }
          else if (object.name.startsWith("GatesDoor")) {
            object.material = getGatesDoorMaterial();
          }
          else if (object.name.startsWith("GatesFrame")) {
            object.material = getGatesFrameMaterial();
          }
          else if (object.name.startsWith("Walls")) {
            object.material = getWallsMaterial();
          }
          else if (object.name === "RoofCover") {
            object.material = getRoofCoverMaterial();
          }
          else if (object.name === "RoofCover") {
            object.material = getRoofCoverMaterial();
          }
          else if (object.name === "RoofBottom" || object.name === "RoofSupport") {
            object.material = getRoofMaterial();
          }
          else if (object.name.startsWith("WindowSash")) {
            object.material = getWindowSashMaterial();
          }
          else if (object.name.startsWith("WindowFrame")) {
            object.material = getWindowFrameMaterial();
          }
          else if (object.name.startsWith("WindowBlinds")) {
            object.material = getBlindsMaterial();
          }
          else if (object.name.startsWith("WindowGlass")) {
            object.material = getGlassMaterial();
          }
          else if (object.name.startsWith("Corners")) {
            object.material = getCornersMaterial();
          }
          else if (object.name.startsWith("DoorFrame") || object.name.startsWith("DoorPanel")) {
            object.material = getDoorPanelMaterial();
          }
          else if (object.name.startsWith("DoorHandle") || object.name.startsWith("DoorHinges")) {
            object.material = getDoorHandleAndHingesMaterial();
          }
          else if (object.name === "PorchRailings" || object.name === "Columns") {
            object.material = getFenceMaterial();
          }
          else if (object.name === "Foundation") {
            object.material = getFoundationMaterial();
          }
        }
      });

      scene.add(model);
      renderer.render(scene, camera);
      setIsFirstModelRenderingComplete(true);

      return () => {
        scene.remove(model);
        disposeObject(model);
      }
    }
  }, [
    models,
    isResourcesLoaded,
    getScene,
    getRenderer,
    getCamera,
    selectedModelName,
    getPavingMaterial,
    getRoadMaterial,
    getGatesDoorMaterial,
    getGatesFrameMaterial,
    getWallsMaterial,
    getRoofCoverMaterial,
    getRoofMaterial,
    getBlindsMaterial,
    getWindowSashMaterial,
    getWindowFrameMaterial,
    getGlassMaterial,
    getCornersMaterial,
    getDoorPanelMaterial,
    getFenceMaterial,
    getFoundationMaterial
  ]);
}

export default useHouse;