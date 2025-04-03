import { TextureName } from './TexturesContext';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export interface WallsContext {
  textureName: TextureName;
  setTextureName: Dispatch<SetStateAction<TextureName>>;
};

export const WallsContext = createContext<WallsContext | null>(null);

export function WallsProvider({ children }: { children: ReactNode }) {
  const [textureName, setTextureName] = useState<TextureName>("Bricks092");

  const contextValue = useMemo(() => ({
    textureName,
    setTextureName
  }), [textureName]);

  return (
    <WallsContext.Provider value={contextValue}>
      {children}
    </WallsContext.Provider>
  );
}

export function useWallsContext() {
  const context = useContext(WallsContext);
  if (!context) {
    throw new Error('useWallsContext must be used within a WallsProvider');
  }
  return context;
}