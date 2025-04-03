import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';
import { ColorRepresentation } from 'three';

export interface CornersContext {
  color: ColorRepresentation;
  setColor: Dispatch<SetStateAction<ColorRepresentation>>;
};

export const CornersContext = createContext<CornersContext | null>(null);

export function CornersProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ColorRepresentation>(0xffffff);

  const contextValue = useMemo(() => ({
    color,
    setColor
  }), [color]);

  return (
    <CornersContext.Provider value={contextValue}>
      {children}
    </CornersContext.Provider>
  );
}

export function useCornersContext() {
  const context = useContext(CornersContext);
  if (!context) {
    throw new Error('useCornersContext must be used within a CornersProvider');
  }
  return context;
}