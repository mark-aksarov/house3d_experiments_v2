import Scene from '../Scene';
import AppHeader from '../AppHeader';
import AboutSheet from '../AboutSheet';
import AboutModal from '../AboutModal';
import styles from './App.module.scss';
import useHouse from '@/hooks/useHouse';
import SceneControls from '../SceneControls';
import AppSideToolBar from '../AppSideToolBar';
import LoadingOverlay from '../LoadingOverlay';
import { Viewpoint } from '@/hooks/useControls';
import AppBottomToolBar from '../AppBottomToolBar';
import SettingsSideSheet from '../SettingsSideSheet';
import { HouseContext } from '@/context/HouseContext';
import useResizeWindow from '@/hooks/useResizeWindow';
import useWelcomeToast from '@/hooks/useWelcomeToast';
import { useTextures } from '@/context/TexturesContext';
import AppearanceSideSheet from '../AppearanceSideSheet';
import SettingsBottomSheet from '../SettingsBottomSheet';
import { useGetCanvasRef } from '@/context/CanvasContext';
import CameraFovBottomSheet from '../CameraFovBottomSheet';
import useUpdateCameraFov from '@/hooks/useUpdateCameraFov';
import React, { useEffect, useMemo, useState } from 'react';
import AppearanceBottomSheet from '../AppearanceBottomSheet';
import { SettingsProvider } from '@/context/SettingsContext';
import MarkerSizeBottomSheet from '../MarkerSizeBottomSheet';
import { ViewpointContext } from '@/context/ViewpointContext';
import { ModelName, useModels } from '@/context/ModelsContext';
import ToneMappingBottomSheet from '../ToneMappingBottomSheet';
import CameraMovingBottomSheet from '../CameraMovingBottomSheet';
import { OrbitControlsProvider } from '@/context/OrbitControlsContext';
import ToneMappingExposureBottomSheet from '../ToneMappingExposureBottomSheet';
import useUpdateToneMappingExposure from '@/hooks/useUpdateToneMappingExposure';

export default function App() {
  const [viewpoint, setViewpoint] = useState<Viewpoint>("Viewpoint1");
  const [modelName, setModelName] = useState<ModelName>("House1");
  const { houseIsInScene } = useHouse({ modelName });
  const [isFirstMaterialUpdatingComplete, setIsFirstMaterialUpdatingComplete] = useState(false);

  const { status: modelsLoadStatus } = useModels();
  const { status: texturesLoadStatus } = useTextures();

  const [aboutSheetOpen, setAboutSheetOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const getCanvasRef = useGetCanvasRef();

  const showLoadingOverlay = !isFirstMaterialUpdatingComplete || modelsLoadStatus !== "success" || texturesLoadStatus !== "success";

  useUpdateToneMappingExposure();
  useUpdateCameraFov();
  useResizeWindow();
  useWelcomeToast({ showLoadingOverlay });

  useEffect(() => {
    if (texturesLoadStatus === "error" || modelsLoadStatus === "error") {
      throw new Error("Failed to load resources");
    }
  }, [texturesLoadStatus, modelsLoadStatus]);

  const houseContextValue = useMemo(() => ({
    modelName,
    setModelName,
    houseIsInScene
  }), [modelName, houseIsInScene, setIsFirstMaterialUpdatingComplete]);

  const viewpointContextValue = useMemo(() => ({
    viewpoint,
    setViewpoint
  }), [viewpoint, setViewpoint]);

  return (
    <ViewpointContext.Provider value={viewpointContextValue}>
      <div className={styles.app}>
        {
          showLoadingOverlay && <LoadingOverlay />
        }
        <AppHeader
          setAboutSheetOpen={setAboutSheetOpen}
          setAboutModalOpen={setAboutModalOpen}
        />

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

          <OrbitControlsProvider>
            <SettingsProvider>
              <HouseContext.Provider value={houseContextValue}>
                <Scene
                  setIsFirstMaterialUpdatingComplete={setIsFirstMaterialUpdatingComplete}
                />
              </HouseContext.Provider>
            </SettingsProvider>
          </OrbitControlsProvider>
        </main>
      </div>
    </ViewpointContext.Provider>
  )
}