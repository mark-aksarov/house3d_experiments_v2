import { ReinhardToneMapping, ToneMapping } from 'three';
import { createContext, ReactNode, useContext, useReducer } from 'react';

export type MovingOfCamera = 'Immediately' | 'Smoothly';
export type ShadowsResolution = '1024x1024' | '2048x2048' | '4096x4096';

interface SettingsState {
  toneMapping: ToneMapping;
  toneMappingExposure: number;
  showToasts: boolean;
  cameraFieldOfView: number;
  ambientLightIntensity: number;
  shadowsEnabled: boolean;
  shadowsResolution: ShadowsResolution;
}

type SettingsAction =
  | { type: 'toneMappingChanged'; payload: ToneMapping }
  | { type: 'toneMappingExposureChanged'; payload: number }
  | { type: 'showToastsChanged'; payload: boolean }
  | { type: 'cameraFieldOfViewChanged'; payload: number }
  | { type: 'ambientLightIntensityChanged'; payload: number }
  | { type: 'shadowsEnabledChanged'; payload: boolean }
  | { type: 'shadowsResolutionChanged'; payload: ShadowsResolution };

const initialState: SettingsState = {
  toneMapping: ReinhardToneMapping,
  toneMappingExposure: 1,
  showToasts: true,
  cameraFieldOfView: 75,
  ambientLightIntensity: 1,
  shadowsEnabled: true,
  shadowsResolution: '4096x4096',
};

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'toneMappingChanged':
      return { ...state, toneMapping: action.payload };
    case 'toneMappingExposureChanged':
      return { ...state, toneMappingExposure: action.payload };
    case 'showToastsChanged':
      return { ...state, showToasts: action.payload };
    case 'cameraFieldOfViewChanged':
      return { ...state, cameraFieldOfView: action.payload };
    case 'ambientLightIntensityChanged':
      return { ...state, ambientLightIntensity: action.payload };
    case 'shadowsEnabledChanged':
      return { ...state, shadowsEnabled: action.payload };
    case 'shadowsResolutionChanged':
      return { ...state, shadowsResolution: action.payload };
    default:
      return state;
  }
}

export const SettingsContext = createContext<SettingsState | null>(null);
export const SettingsDispatchContext = createContext<React.Dispatch<SettingsAction> | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

// Hooks
export const useSettings = (): SettingsState => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const useSettingsDispatch = (): React.Dispatch<SettingsAction> => {
  const context = useContext(SettingsDispatchContext);
  if (!context) {
    throw new Error('useSettingsDispatch must be used within a SettingsProvider');
  }
  return context;
};