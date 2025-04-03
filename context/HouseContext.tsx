import { ModelName } from './ModelsContext';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface HouseContext {
  houseIsInScene: boolean;
  modelName: ModelName;
  setModelName: Dispatch<SetStateAction<ModelName>>;
};

export const HouseContext = createContext<HouseContext | null>(null);

export function useHouseContext() {
  const context = useContext(HouseContext);
  if (!context) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }
  return context;
}