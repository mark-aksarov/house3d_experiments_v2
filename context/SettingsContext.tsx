import { ReinhardToneMapping, ToneMapping } from 'three';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export type MovingOfCamera = "Immediately" | "Smoothly";
export type ShadowsResolution = "1024x1024" | "2048x2048" | "4096x4096";

export interface SettingsContext {
  toneMapping: ToneMapping;
  toneMappingExposure: number,
  showNotifications: boolean,
  cameraFieldOfView: number,
  movingOfCamera: MovingOfCamera,
  ambientLightIntensity: number,
  shadowsEnabled: boolean,
  shadowsResolution: ShadowsResolution,
  setToneMapping: Dispatch<SetStateAction<ToneMapping>>,
  setToneMappingExposure: Dispatch<SetStateAction<number>>,
  setShowNotifications: Dispatch<SetStateAction<boolean>>,
  setCameraFieldOfView: Dispatch<SetStateAction<number>>,
  setMovingOfCamera: Dispatch<SetStateAction<MovingOfCamera>>,
  setAmbientLightIntensity: Dispatch<SetStateAction<number>>,
  setShadowsEnabled: Dispatch<SetStateAction<boolean>>,
  setShadowsResolution: Dispatch<SetStateAction<ShadowsResolution>>,
};

export const SettingsContext = createContext<SettingsContext | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [toneMapping, setToneMapping] = useState<ToneMapping>(ReinhardToneMapping);
  const [toneMappingExposure, setToneMappingExposure] = useState(1);
  const [showNotifications, setShowNotifications] = useState(true);
  const [cameraFieldOfView, setCameraFieldOfView] = useState(75);
  const [movingOfCamera, setMovingOfCamera] = useState<MovingOfCamera>("Immediately");
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(1);
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  const [shadowsResolution, setShadowsResolution] = useState<ShadowsResolution>("4096x4096");

  const contextValue = useMemo(() => ({
    toneMapping,
    toneMappingExposure,
    showNotifications,
    cameraFieldOfView,
    movingOfCamera,
    ambientLightIntensity,
    shadowsEnabled,
    shadowsResolution,
    setToneMapping,
    setToneMappingExposure,
    setShowNotifications,
    setCameraFieldOfView,
    setMovingOfCamera,
    setAmbientLightIntensity,
    setShadowsEnabled,
    setShadowsResolution
  }), [
    toneMapping,
    toneMappingExposure,
    showNotifications,
    cameraFieldOfView,
    movingOfCamera,
    ambientLightIntensity,
    shadowsEnabled,
    shadowsResolution,
  ]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}