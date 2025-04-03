import Roof from "./Roof";
import Walls from "./Walls";
import Fence from "./Fence";
import Doors from "./Doors";
import Windows from "./Windows";
import Corners from "./Corners";
import Foundation from "./Foundation";
import useGates from "@/hooks/useGates";
import useGrass from "@/hooks/useGrass";
import usePaving from "@/hooks/usePaving";
import useGround from "@/hooks/useGround";
import HouseSideSheet from "./HouseSideSheet";
import useSunLight from "@/hooks/useSunLight";
import usePointLight from "@/hooks/usePointLight";
import { RoofProvider } from "@/context/RoofContext";
import useAmbientLight from "@/hooks/useAmbientLight";
import { WallsProvider } from "@/context/WallsContext";
import { DoorsProvider } from "@/context/DoorsContext";
import { FenceProvider } from "@/context/FenceContext";
import { WindowsProvider } from "@/context/WindowsContext";
import { CornersProvider } from "@/context/CornersContext";
import { FoundationProvider } from "@/context/FoundationContext";
import useUpdateSceneBackground from "@/hooks/useUpdateSceneBackground";

export default function Scene() {
  useAmbientLight();
  useSunLight();
  usePointLight();
  useGround();
  useGrass();
  usePaving();
  useGates();
  useUpdateSceneBackground();

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