import Scene from '../Scene';
import AppHeader from '../AppHeader';
import AboutSheet from '../AboutSheet';
import AboutModal from '../AboutModal';
import styles from './App.module.scss';
import useHouse from '@/hooks/useHouse';
import LoadingOverlay from '../LoadingOverlay';
import { useThree } from '@/context/ThreeContext';
import { HouseContext } from '@/context/HouseContext';
import useResizeWindow from '@/hooks/useResizeWindow';
import useWelcomeToast from '@/hooks/useWelcomeToast';
import { useTextures } from '@/context/TexturesContext';
import { useGetCanvasRef } from '@/context/CanvasContext';
import React, { useEffect, useMemo, useState } from 'react';
import { SettingsProvider } from '@/context/SettingsContext';
import { ModelName, useModels } from '@/context/ModelsContext';
import { OrbitControlsProvider } from '@/context/OrbitControlsContext';

export default function App() {
  const [modelName, setModelName] = useState<ModelName>("House1");
  const { houseIsInScene } = useHouse({ modelName });
  const { isFirstRenderComplete } = useThree();
  const { status: modelsLoadStatus } = useModels();
  const { status: texturesLoadStatus } = useTextures();

  const [aboutSheetOpen, setAboutSheetOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const getCanvasRef = useGetCanvasRef();

  const showLoadingOverlay = !isFirstRenderComplete || modelsLoadStatus !== "success" || texturesLoadStatus !== "success";

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
  }), [modelName, houseIsInScene]);

  return (
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

        <AboutSheet open={aboutSheetOpen} onClose={() => setAboutSheetOpen(false)} />
        <AboutModal open={aboutModalOpen} onOpenChange={setAboutModalOpen} />

        <OrbitControlsProvider>
          <SettingsProvider>
            <HouseContext.Provider value={houseContextValue}>
              <Scene />
            </HouseContext.Provider>
          </SettingsProvider>
        </OrbitControlsProvider>
      </main>
    </div>
  )
}