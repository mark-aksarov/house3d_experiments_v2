import useRoad from "@/hooks/useRoad";
import AboutSheet from '../AboutSheet';
import AboutModal from '../AboutModal';
import useGates from "@/hooks/useGates";
import useHouse from "@/hooks/useHouse";
import usePaving from "@/hooks/usePaving";
import useGround from "@/hooks/useGround";
import styles from './AppMain.module.scss';
import SceneControls from '../SceneControls';
import useSunLight from "@/hooks/useSunLight";
import HouseSideSheet from "../HouseSideSheet";
import AppSideToolBar from '../AppSideToolBar';
import { Dispatch, SetStateAction } from "react";
import usePointLight from "@/hooks/usePointLight";
import AppBottomToolBar from '../AppBottomToolBar';
import SettingsSideSheet from '../SettingsSideSheet';
import useAmbientLight from "@/hooks/useAmbientLight";
import AppearanceSideSheet from '../AppearanceSideSheet';
import SettingsBottomSheet from '../SettingsBottomSheet';
import { useGetCanvasRef } from '@/context/CanvasContext';
import CameraFovBottomSheet from '../CameraFovBottomSheet';
import AppearanceBottomSheet from '../AppearanceBottomSheet';
import MarkerSizeBottomSheet from '../MarkerSizeBottomSheet';
import ToneMappingBottomSheet from '../ToneMappingBottomSheet';
import CameraMovingBottomSheet from '../CameraMovingBottomSheet';
import useUpdateSceneBackground from "@/hooks/useUpdateSceneBackground";
import ToneMappingExposureBottomSheet from '../ToneMappingExposureBottomSheet';

interface AppMainProps {
  aboutSheetOpen: boolean;
  aboutModalOpen: boolean;
  setAboutSheetOpen: Dispatch<SetStateAction<boolean>>;
  setAboutModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsFirstModelRenderingComplete: Dispatch<SetStateAction<boolean>>
}

export default function AppMain({
  aboutSheetOpen,
  aboutModalOpen,
  setAboutSheetOpen,
  setAboutModalOpen,
  setIsFirstModelRenderingComplete
}: AppMainProps) {
  const getCanvasRef = useGetCanvasRef();

  useAmbientLight();
  useSunLight();
  usePointLight();
  useGround();
  useUpdateSceneBackground();
  useHouse(setIsFirstModelRenderingComplete);

  return (
    <main className={styles.main}>
      <canvas className={styles.canvas} ref={getCanvasRef()} />

      <SettingsBottomSheet />
      <ToneMappingBottomSheet />
      <ToneMappingExposureBottomSheet />
      <CameraMovingBottomSheet />
      <CameraFovBottomSheet />
      <AppearanceBottomSheet />
      <MarkerSizeBottomSheet />

      <SettingsSideSheet />
      <AppearanceSideSheet />
      <SceneControls />

      <AppBottomToolBar />
      <AppSideToolBar />

      <AboutSheet open={aboutSheetOpen} onClose={() => setAboutSheetOpen(false)} />
      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />

      <HouseSideSheet />
    </main>
  );
}