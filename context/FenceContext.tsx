import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';
import { ColorRepresentation } from 'three';

export interface FenceContext {
  color: ColorRepresentation;
  setColor: Dispatch<SetStateAction<ColorRepresentation>>;
};

export const FenceContext = createContext<FenceContext | null>(null);

export function FenceProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ColorRepresentation>(0xffffff);

  const contextValue = useMemo(() => ({
    color,
    setColor
  }), [color]);

  return (
    <FenceContext.Provider value={contextValue}>
      {children}
    </FenceContext.Provider>
  );
}

export function useFenceContext() {
  const context = useContext(FenceContext);
  if (!context) {
    throw new Error('useFenceContext must be used within a FenceProvider');
  }
  return context;
}