import { ColorRepresentation } from 'three';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

export interface WindowsContext {
  sashColor: ColorRepresentation;
  frameColor: ColorRepresentation;
  setSashColor: Dispatch<SetStateAction<ColorRepresentation>>;
  setFrameColor: Dispatch<SetStateAction<ColorRepresentation>>;
};

export const WindowsContext = createContext<WindowsContext | null>(null);

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [sashColor, setSashColor] = useState<ColorRepresentation>(0x634A33);
  const [frameColor, setFrameColor] = useState<ColorRepresentation>(0xffffff);

  const contextValue = useMemo(() => ({
    sashColor,
    frameColor,
    setSashColor,
    setFrameColor
  }), [sashColor, frameColor]);

  return (
    <WindowsContext.Provider value={contextValue}>
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindowsContext() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error('useWindowsContext must be used within a WindowsProvider');
  }
  return context;
}