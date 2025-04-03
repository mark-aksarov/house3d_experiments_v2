"use client"

import App from '@/components/App';
import React, { useRef } from 'react';
import { ThreeProvider } from '@/context/ThreeContext';
import { CanvasContext } from '@/context/CanvasContext';
import { ModelsProvider } from '@/context/ModelsContext';
import { TexturesProvider } from '@/context/TexturesContext';
import { SideSheetsProvider } from '@/context/SideSheetsContext';
import { BottomSheetsProvider } from '@/context/BottomSheetsContext';
import { AppSideToolBarProvider } from '@/components/AppSideToolBar';
import NarrowViewportMessage from '@/components/NarrowViewportMessage';
import { AppBottomToolBarProvider } from '@/components/AppBottomToolBar';

export default function House3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <NarrowViewportMessage />
      <ModelsProvider>
        <TexturesProvider>
          <AppSideToolBarProvider>
            <AppBottomToolBarProvider>
              <SideSheetsProvider>
                <BottomSheetsProvider>
                  <CanvasContext.Provider value={canvasRef}>
                    <ThreeProvider>
                      <App />
                    </ThreeProvider>
                  </CanvasContext.Provider>
                </BottomSheetsProvider>
              </SideSheetsProvider>
            </AppBottomToolBarProvider>
          </AppSideToolBarProvider>
        </TexturesProvider>
      </ModelsProvider>
    </>
  )
}