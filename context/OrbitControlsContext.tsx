import { MathUtils } from 'three';
import { useThree } from './ThreeContext';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from 'react';

interface OrbitControlsContextType {
  getOrbitControls: () => OrbitControls
}

export const OrbitControlsContext = createContext<OrbitControlsContextType | null>(null);

export const OrbitControlsProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const { getRenderer, getCamera, render } = useThree();

  //controls
  const controlsRef = useRef<OrbitControls | null>(null);
  const getOrbitControls = useCallback(() => {
    if (controlsRef.current) {
      return controlsRef.current;
    }
    const renderer = getRenderer();
    const camera = getCamera();
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.minDistance = 20;
    controls.maxDistance = 40;
    controls.minPolarAngle = MathUtils.degToRad(10);
    controls.maxPolarAngle = MathUtils.degToRad(85);
    controls.target.set(0, 4, 0);
    controls.enablePan = false;

    controls.update();
    controlsRef.current = controls;
    return controls;
  }, [getRenderer, getCamera])

  useEffect(() => {
    const controls = getOrbitControls();
    const listener = () => render();
    controls.addEventListener('change', listener);

    return () => {
      controls.removeEventListener('change', listener);
    }
  }, [getOrbitControls, render])

  return (
    <OrbitControlsContext.Provider
      value={{
        getOrbitControls
      }}
    >
      {children}
    </OrbitControlsContext.Provider>
  )
}

export const useOrbitControls = () => {
  const context = useContext(OrbitControlsContext);
  if (!context) {
    throw new Error('useOrbitControls must be used within a OrbitControlsProvider');
  }
  return context;
}
