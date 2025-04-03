"use client"

import { RefObject, createContext, useCallback, useContext } from 'react';

export const TabPanelContainerContext = createContext<RefObject<HTMLElement> | null>(null);

export const useGetTabPanelContainerRef = () => {
  const canvasRef = useContext(TabPanelContainerContext);
  if (!canvasRef) {
    throw new Error("useGetTabPanelContainer must be used within a Provider");
  }

  return useCallback(() => {
    return canvasRef;
  }, [canvasRef])
}