import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { useGetCanvasRef } from "@/context/CanvasContext";

const useResizeWindow = () => {
  const getCanvasRef = useGetCanvasRef();
  const { getRenderer, getCamera, getScene } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const canvasRef = getCanvasRef();
      if (!canvasRef.current) return;

      const pixelRatio = window.devicePixelRatio;
      const renderer = getRenderer();
      const camera = getCamera();
      const scene = getScene();
      const width = Math.floor(canvasRef.current.clientWidth * pixelRatio);
      const height = Math.floor(canvasRef.current.clientHeight * pixelRatio);
      const needResize = canvasRef.current.width !== width || canvasRef.current.height !== height;

      if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [getRenderer, getCanvasRef, getScene, getCamera]);
}

export default useResizeWindow;