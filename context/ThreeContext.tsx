import { useGetCanvasRef } from './CanvasContext';
import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { Color, PCFSoftShadowMap, PerspectiveCamera, ReinhardToneMapping, Scene, WebGLRenderer } from 'three';

interface ThreeContextType {
  render(): void,
  getCamera(): PerspectiveCamera,
  getScene(): Scene,
  getRenderer(): WebGLRenderer,
  isFirstRenderComplete: boolean,
}

export const ThreeContext = createContext<ThreeContextType | null>(null);

/**
 * Provide scene, camera, renderer for all components of the application
 */
export const ThreeProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const getCanvasRef = useGetCanvasRef();
  const isRenderingRef = useRef(false);

  //the loading overlay is displayed on top of scene until all objects in scene have been drawn.
  const [isFirstRenderComplete, setIsFirstRenderComplete] = useState(false);

  //renderer
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const getRenderer = useCallback(() => {
    if (rendererRef.current) {
      return rendererRef.current;
    }
    const canvasRef = getCanvasRef();
    if (canvasRef.current === null) {
      throw new Error("canvasRef.current is null");
    }

    const renderer = new WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ReinhardToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;
    return renderer;
  }, [getCanvasRef])

  //scene
  const sceneRef = useRef<Scene | null>(null);
  const getScene = useCallback(() => {
    if (sceneRef.current) {
      return sceneRef.current;
    }
    const scene = new Scene();
    scene.background = new Color(0xffffff);
    sceneRef.current = scene;

    return scene;
  }, [getRenderer])

  //camera
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const getCamera = useCallback(() => {
    if (cameraRef.current) {
      return cameraRef.current;
    }

    const canvasRef = getCanvasRef();
    if (canvasRef.current === null) {
      throw new Error("canvasRef.current is null");
    }

    const camera = new PerspectiveCamera(50, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.01, 100);
    camera.position.set(10, 8, -24);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    return camera;
  }, [getCanvasRef])

  //render
  const render = useCallback(() => {
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;

      requestAnimationFrame(() => {
        getRenderer().render(getScene(), getCamera());
        isRenderingRef.current = false;
        setIsFirstRenderComplete(true);
      });
    }
  }, [getRenderer, getScene, getCamera])

  return (
    <ThreeContext.Provider
      value={{
        render,
        getCamera,
        getScene,
        getRenderer,
        isFirstRenderComplete
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

export const useThree = () => {
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error("useThree must be used within a Provider");
  }
  return context;
}