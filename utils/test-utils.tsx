import React, { useRef } from 'react';
import { render } from "@testing-library/react";
import { LinearToneMapping, Vector3 } from 'three';
import { ThreeContext } from "context/ThreeContext";
import { ThemeProvider } from "context/ThemeContext";
import { CanvasContext } from "context/CanvasContext";
import { ToastsProvider } from "context/ToastsContext";
import { SideSheetsProvider } from "context/SideSheetsContext";
import { BottomSheetsProvider } from "context/BottomSheetsContext";
import { AppSideToolBarProvider } from "components/AppSideToolBar";
import NarrowViewportMessage from "components/NarrowViewportMessage";
import { AppBottomToolBarProvider } from "components/AppBottomToolBar";

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

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThemeProvider>
      <ToastsProvider>
        <NarrowViewportMessage />
        <AppSideToolBarProvider>
          <AppBottomToolBarProvider>
            <SideSheetsProvider>
              <BottomSheetsProvider>
                <CanvasContext.Provider value={canvasRef}>
                  <ThreeContext.Provider value={{
                    render: mockedRenderer.render,
                    getCamera: () => mockedCamera,
                    getScene: jest.fn(),
                    getRenderer: () => mockedRenderer,
                    isFirstRenderComplete: true
                  }}>
                    {children}
                  </ThreeContext.Provider>
                </CanvasContext.Provider>
              </BottomSheetsProvider>
            </SideSheetsProvider>
          </AppBottomToolBarProvider>
        </AppSideToolBarProvider>
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
