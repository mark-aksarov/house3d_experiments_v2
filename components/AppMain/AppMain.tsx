import AboutSheet from '../AboutSheet';
import AboutModal from '../AboutModal';
import useHouse from "@/hooks/useHouse";
import useGround from "@/hooks/useGround";
import styles from './AppMain.module.scss';
import SceneControls from '../SceneControls';
import useSunLight from "@/hooks/useSunLight";
import AppSideToolBar from '../AppSideToolBar';
import { Dispatch, SetStateAction } from "react";
import usePointLight from "@/hooks/usePointLight";
import AppBottomToolBar from '../AppBottomToolBar';
import SettingsSideSheet from '../SettingsSideSheet';
import useAmbientLight from "@/hooks/useAmbientLight";
import HouseModelSideSheet from "../HouseModelSideSheet";
import AppearanceSideSheet from '../AppearanceSideSheet';
import SettingsBottomSheet from '../SettingsBottomSheet';
import { useGetCanvasRef } from '@/context/CanvasContext';
import CameraFovBottomSheet from '../CameraFovBottomSheet';
import AppearanceBottomSheet from '../AppearanceBottomSheet';
import MarkerSizeBottomSheet from '../MarkerSizeBottomSheet';
import HouseModelBottomSheet from '../HouseModelBottomSheet';
import ToneMappingBottomSheet from '../ToneMappingBottomSheet';
import HouseElementsSideSheet from '../HouseElementsSideSheet';
import CameraMovingBottomSheet from '../CameraMovingBottomSheet';
import useUpdateSceneBackground from "@/hooks/useUpdateSceneBackground";
import ShadowsResolutionBottomSheet from '../ShadowsResolutionBottomSheet';
import ToneMappingExposureBottomSheet from '../ToneMappingExposureBottomSheet';
import AmbientLightIntensityBottomSheet from '../AmbientLightIntensityBottomSheet';
import HouseElementsBottomSheet from '../HouseElementsBottomSheet/HouseElementsBottomSheet';

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
      <HouseModelBottomSheet />
      <HouseElementsBottomSheet />
      <AmbientLightIntensityBottomSheet />
      <ShadowsResolutionBottomSheet />

      <SettingsSideSheet />
      <AppearanceSideSheet />
      <HouseModelSideSheet />
      <HouseElementsSideSheet />

      <SceneControls />

      <AppBottomToolBar />
      <AppSideToolBar />

      <AboutSheet open={aboutSheetOpen} onClose={() => setAboutSheetOpen(false)} />
      <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />
    </main>
  );
}