import { useEffect } from "react";
import useIsLaptop from "./useIsLaptop";
import { useThree } from "@/context/ThreeContext";
import useIsMobileOrTablet from "./useIsMobileOrTablet";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

const useUpdateCameraFov = () => {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const { render, getCamera } = useThree();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isLaptop = useIsLaptop();

  useEffect(() => {
    const camera = getCamera();
    camera.fov = settings.cameraFieldOfView;
    camera.updateProjectionMatrix();
    render();
  }, [settings.cameraFieldOfView, render, getCamera]);

  useEffect(() => {
    let fov;

    if (isMobileOrTablet) {
      fov = 75;
    }
    else if (isLaptop) {
      fov = 60;
    }
    else {
      fov = 50;
    }
    dispatch({ type: "cameraFieldOfViewChanged", payload: fov });
  }, [isMobileOrTablet, isLaptop, render, getCamera, dispatch]);
};

export default useUpdateCameraFov;

