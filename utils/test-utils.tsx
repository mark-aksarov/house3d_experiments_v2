import React, { useRef } from 'react';
import { render } from "@testing-library/react";
import { ThreeContext } from "context/ThreeContext";
import { UndoProvider } from '@/context/UndoContext';
import { ThemeProvider } from "context/ThemeContext";
import { CanvasContext } from "context/CanvasContext";
import { ToastsProvider } from "context/ToastsContext";
import { ModelsProvider } from '@/context/ModelsContext';
import { LinearToneMapping, Scene, Vector3 } from 'three';
import { SettingsProvider } from '@/context/SettingsContext';
import { TexturesProvider } from '@/context/TexturesContext';
import { MaterialsProvider } from '@/context/MaterialsContext';
import { SideSheetsProvider } from "context/SideSheetsContext";
import { BottomSheetsProvider } from "context/BottomSheetsContext";
import { AppSideToolBarProvider } from "components/AppSideToolBar";
import NarrowViewportMessage from "components/NarrowViewportMessage";
import { AppBottomToolBarProvider } from "components/AppBottomToolBar";
import { OrbitControlsProvider } from '@/context/OrbitControlsContext';

export const mockedCamera = {
  fov: 60,
  zoom: 0.8,
  position: new Vector3(0, 0, 0),
  lookAt: jest.fn(),
  updateProjectionMatrix: jest.fn()
};

export const mockedRenderer = {
  toneMapping: LinearToneMapping,
  toneMappingExposure: 0.8,
  render: jest.fn(),
  setSize: jest.fn(),
};

export const scene = new Scene();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThemeProvider>
      <ToastsProvider>
        <NarrowViewportMessage />
        <UndoProvider>
          <ModelsProvider>
            <TexturesProvider>
              <AppSideToolBarProvider>
                <AppBottomToolBarProvider>
                  <SideSheetsProvider>
                    <BottomSheetsProvider>
                      <CanvasContext.Provider value={canvasRef}>
                        <ThreeContext.Provider value={{
                          render: mockedRenderer.render,
                          getCamera: () => mockedCamera,
                          getScene: () => scene,
                          getRenderer: () => mockedRenderer,
                          isFirstRenderComplete: true
                        }}>
                          <OrbitControlsProvider>
                            <SettingsProvider>
                              <MaterialsProvider>
                                {children}
                              </MaterialsProvider>
                            </SettingsProvider>
                          </OrbitControlsProvider>
                        </ThreeContext.Provider>
                      </CanvasContext.Provider>
                    </BottomSheetsProvider>
                  </SideSheetsProvider>
                </AppBottomToolBarProvider>
              </AppSideToolBarProvider>
            </TexturesProvider>
          </ModelsProvider>
        </UndoProvider>
      </ToastsProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
