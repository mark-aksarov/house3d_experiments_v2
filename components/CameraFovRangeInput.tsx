import UndoableRangeInput from "./UndoableRangeInput";
import { useCameraFovRange } from "@/hooks/useCameraFovRange";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

export default function CameraFovRangeInput() {
  const settings = useSettings();
  const fovRange = useCameraFovRange();
  const dispatch = useSettingsDispatch();

  function updateCameraFov(value: number) {
    dispatch({ type: "cameraFieldOfViewChanged", payload: value });
  }

  return (
    <UndoableRangeInput
      data-testid="camera-fov-range-input"
      value={settings.cameraFieldOfView}
      onChange={updateCameraFov}
      min={fovRange[0]}
      max={fovRange[1]}
      step={1}
    />
  )
}