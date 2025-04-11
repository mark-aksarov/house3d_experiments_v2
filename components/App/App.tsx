import AppHeader from '../AppHeader';
import styles from './App.module.scss';
import AppMain from '../AppMain/AppMain';
import LoadingOverlay from '../LoadingOverlay';
import useUndoToast from '@/hooks/useUndoToast';
import React, { useEffect, useState } from 'react';
import { useModels } from '@/context/ModelsContext';
import useResizeWindow from '@/hooks/useResizeWindow';
import useWelcomeToast from '@/hooks/useWelcomeToast';
import { useTextures } from '@/context/TexturesContext';
import useUpdateHouseModel from '@/hooks/useUpdateHouseModel';

export default function App() {
  const [isFirstModelRenderingComplete, setIsFirstModelRenderingComplete] = useState(false);
  const { selectedModelName } = useModels();

  const { status: modelsLoadStatus } = useModels();
  const { status: texturesLoadStatus } = useTextures();

  const [aboutSheetOpen, setAboutSheetOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const showLoadingOverlay = !isFirstModelRenderingComplete || modelsLoadStatus !== "success" || texturesLoadStatus !== "success" || !selectedModelName;

  useResizeWindow();
  useWelcomeToast({ showLoadingOverlay });
  useUndoToast({ showLoadingOverlay });
  useUpdateHouseModel();

  useEffect(() => {
    if (texturesLoadStatus === "error" || modelsLoadStatus === "error") {
      throw new Error("Failed to load resources");
    }
  }, [texturesLoadStatus, modelsLoadStatus]);

  return (
    <div className={styles.app}>
      {
        showLoadingOverlay && <LoadingOverlay />
      }
      <AppHeader
        setAboutSheetOpen={setAboutSheetOpen}
        setAboutModalOpen={setAboutModalOpen}
      />
      <AppMain
        aboutSheetOpen={aboutSheetOpen}
        aboutModalOpen={aboutModalOpen}
        setAboutSheetOpen={setAboutSheetOpen}
        setAboutModalOpen={setAboutModalOpen}
        setIsFirstModelRenderingComplete={setIsFirstModelRenderingComplete}
      />
    </div>
  )
}