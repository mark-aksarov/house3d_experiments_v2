import { RefObject, createContext, useCallback, useContext } from 'react';

export const CanvasContext = createContext<RefObject<HTMLCanvasElement | null> | null>(null);

export const useGetCanvasRef = () => {
  const canvasRef = useContext(CanvasContext);
  if (!canvasRef) {
    throw new Error("useGetCanvas must be used within a Provider");
  }

  return useCallback(() => {
    return canvasRef;
  }, [canvasRef])
}