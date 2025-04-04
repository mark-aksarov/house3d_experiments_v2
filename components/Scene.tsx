import Roof from "./Roof";
import Walls from "./Walls";
import Fence from "./Fence";
import Doors from "./Doors";
import Windows from "./Windows";
import Corners from "./Corners";
import useRoad from "@/hooks/useRoad";
import Foundation from "./Foundation";
import useGates from "@/hooks/useGates";
import usePaving from "@/hooks/usePaving";
import useGround from "@/hooks/useGround";
import HouseSideSheet from "./HouseSideSheet";
import useSunLight from "@/hooks/useSunLight";
import usePointLight from "@/hooks/usePointLight";
import { useThree } from "@/context/ThreeContext";
import { RoofProvider } from "@/context/RoofContext";
import useAmbientLight from "@/hooks/useAmbientLight";
import { WallsProvider } from "@/context/WallsContext";
import { DoorsProvider } from "@/context/DoorsContext";
import { FenceProvider } from "@/context/FenceContext";
import { useTextures } from "@/context/TexturesContext";
import { useHouseContext } from "@/context/HouseContext";
import { WindowsProvider } from "@/context/WindowsContext";
import { CornersProvider } from "@/context/CornersContext";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FoundationProvider } from "@/context/FoundationContext";
import useUpdateSceneBackground from "@/hooks/useUpdateSceneBackground";

export default function Scene({
  setIsFirstMaterialUpdatingComplete
}: {
  setIsFirstMaterialUpdatingComplete: Dispatch<SetStateAction<boolean>>;
}) {
  const { getScene, getCamera, getRenderer } = useThree();
  const { houseIsInScene } = useHouseContext();
  const { status: texturesLoadStatus } = useTextures();

  useAmbientLight();
  useSunLight();
  usePointLight();
  useGround();
  usePaving();
  useRoad();
  useGates();
  useUpdateSceneBackground();

  //this hook fires after all hooks which update materials above and hooks in children components
  useEffect(() => {
    if (houseIsInScene && texturesLoadStatus === "success") {
      setIsFirstMaterialUpdatingComplete(true);

      //redraw scene immediately
      const scene = getScene();
      const camera = getCamera();
      const renderer = getRenderer();
      renderer.render(scene, camera);
    }
  }, [setIsFirstMaterialUpdatingComplete, houseIsInScene, texturesLoadStatus, getScene, getCamera, getRenderer])

  return (
    <>
      <HouseSideSheet />
      <RoofProvider>
        <Roof />
      </RoofProvider>
      <WallsProvider>
        <Walls />
      </WallsProvider>
      <WindowsProvider>
        <Windows />
      </WindowsProvider>
      <FoundationProvider>
        <Foundation />
      </FoundationProvider>
      <FenceProvider>
        <Fence />
      </FenceProvider>
      <CornersProvider>
        <Corners />
      </CornersProvider>
      <DoorsProvider>
        <Doors />
      </DoorsProvider>
    </>
  )
}