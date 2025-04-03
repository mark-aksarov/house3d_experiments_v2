import { TextureName } from './TexturesContext';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export interface FoundationContext {
  textureName: TextureName;
  setTextureName: Dispatch<SetStateAction<TextureName>>;
};

export const FoundationContext = createContext<FoundationContext | null>(null);

export function FoundationProvider({ children }: { children: ReactNode }) {
  const [textureName, setTextureName] = useState<TextureName>("Plaster003");

  const contextValue = useMemo(() => ({
    textureName,
    setTextureName,
  }), [textureName]);

  return (
    <FoundationContext.Provider value={contextValue}>
      {children}
    </FoundationContext.Provider>
  );
}

export function useFoundationContext() {
  const context = useContext(FoundationContext);
  if (!context) {
    throw new Error('useFoundationContext must be used within a FoundationProvider');
  }
  return context;
}