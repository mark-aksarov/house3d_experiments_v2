"use client"

import { createContext, useContext } from 'react';

interface SheetContextProps {
  containerRef: React.RefObject<HTMLDivElement>;
  headingId: string;
  open: boolean;
  close: () => void;
}

export const SheetContext = createContext<SheetContextProps | null>(null);

export const useSheet = (): SheetContextProps => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
};