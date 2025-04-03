import { Viewpoint } from '@/hooks/useControls';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface ViewpointContextType {
  viewpoint: Viewpoint;
  setViewpoint: Dispatch<SetStateAction<Viewpoint>>
}

export const ViewpointContext = createContext<ViewpointContextType | null>(null);

export const useViewpoint = () => {
  const context = useContext(ViewpointContext);
  if (!context) {
    throw new Error("useViewpoint must be used within a Provider");
  }

  return context;
}