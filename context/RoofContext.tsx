import { ColorRepresentation } from 'three';
import { TextureName } from './TexturesContext';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export interface RoofContext {
  coverTextureName: TextureName;
  color: ColorRepresentation;
  setCoverTextureName: Dispatch<SetStateAction<TextureName>>;
  setColor: Dispatch<SetStateAction<ColorRepresentation>>;
};

export const RoofContext = createContext<RoofContext | null>(null);

export function RoofProvider({ children }: { children: ReactNode }) {
  const [coverTextureName, setCoverTextureName] = useState<TextureName>("RoofingTiles003");
  const [color, setColor] = useState<ColorRepresentation>(0xffffff);

  const contextValue = useMemo(() => ({
    coverTextureName,
    color,
    setCoverTextureName,
    setColor
  }), [coverTextureName, color]);

  return (
    <RoofContext.Provider value={contextValue}>
      {children}
    </RoofContext.Provider>
  );
}

export function useRoofContext() {
  const context = useContext(RoofContext);
  if (!context) {
    throw new Error('useRoofContext must be used within a RoofProvider');
  }
  return context;
}