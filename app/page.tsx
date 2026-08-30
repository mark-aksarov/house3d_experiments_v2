"use client"

import App from '@/components/App';
import React, { useEffect, useRef, useState } from 'react';
import { UndoProvider } from '@/context/UndoContext';
import { ThreeProvider } from '@/context/ThreeContext';
import { CanvasContext } from '@/context/CanvasContext';
import { ModelsProvider } from '@/context/ModelsContext';
import { TexturesProvider } from '@/context/TexturesContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { MaterialsProvider } from '@/context/MaterialsContext';
import { SideSheetsProvider } from '@/context/SideSheetsContext';
import { BottomSheetsProvider } from '@/context/BottomSheetsContext';
import { AppSideToolBarProvider } from '@/components/AppSideToolBar';
import NarrowViewportMessage from '@/components/NarrowViewportMessage';
import { OrbitControlsProvider } from '@/context/OrbitControlsContext';
import { AppBottomToolBarProvider } from '@/components/AppBottomToolBar';

export default function House3D() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isClient) return null;

  return (
    <>
      <NarrowViewportMessage />
      <UndoProvider>
        <ModelsProvider>
          <TexturesProvider>
            <AppSideToolBarProvider>
              <AppBottomToolBarProvider>
                <SideSheetsProvider>
                  <BottomSheetsProvider>
                    <CanvasContext.Provider value={canvasRef}>
                      <ThreeProvider>
                        <OrbitControlsProvider>
                          <SettingsProvider>
                            <MaterialsProvider>
                              <App />
                            </MaterialsProvider>
                          </SettingsProvider>
                        </OrbitControlsProvider>
                      </ThreeProvider>
                    </CanvasContext.Provider>
                  </BottomSheetsProvider>
                </SideSheetsProvider>
              </AppBottomToolBarProvider>
            </AppSideToolBarProvider>
          </TexturesProvider>
        </ModelsProvider>
      </UndoProvider>
    </>
  )
}