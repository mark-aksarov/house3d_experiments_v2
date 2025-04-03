import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';
import { ColorRepresentation } from 'three';

export interface DoorsContext {
  color: ColorRepresentation;
  setColor: Dispatch<SetStateAction<ColorRepresentation>>;
};

export const DoorsContext = createContext<DoorsContext | null>(null);

export function DoorsProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ColorRepresentation>(0x632D11);

  const contextValue = useMemo(() => ({
    color,
    setColor
  }), [color]);

  return (
    <DoorsContext.Provider value={contextValue}>
      {children}
    </DoorsContext.Provider>
  );
}

export function useDoorsContext() {
  const context = useContext(DoorsContext);
  if (!context) {
    throw new Error('useDoorsContext must be used within a DoorsProvider');
  }
  return context;
}