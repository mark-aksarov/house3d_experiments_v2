import { useEffect } from "react";
import useIsLaptop from "./useIsLaptop";
import { useThree } from "@/context/ThreeContext";
import useIsMobileOrTablet from "./useIsMobileOrTablet";

const useUpdateCameraFov = () => {
  const { render, getCamera } = useThree();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isLaptop = useIsLaptop();

  useEffect(() => {
    const camera = getCamera();

    if (isMobileOrTablet) {
      camera.fov = 75;
    }
    else if (isLaptop) {
      camera.fov = 60;
    }
    else {
      camera.fov = 50;
    }

    camera.updateProjectionMatrix();
    render();
  }, [isMobileOrTablet, isLaptop, render, getCamera]);
};

export default useUpdateCameraFov;

