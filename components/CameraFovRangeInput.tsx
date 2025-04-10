import { useState } from "react";
import { useThree } from "@/context/ThreeContext";
import UndoableRangeInput from "./UndoableRangeInput";
import { useCameraFovRange } from "@/hooks/useCameraFovRange";

export default function CameraFovRangeInput() {
  const { getCamera, render } = useThree();
  const [value, setValue] = useState(getCamera().fov);
  const fovRange = useCameraFovRange();

  function changeFov(value: number) {
    const camera = getCamera();
    camera.fov = value;
    camera.updateProjectionMatrix();
    setValue(value);
    render();
  }

  return (
    <UndoableRangeInput
      data-testid="camera-fov-range-input"
      value={value}
      onChange={changeFov}
      min={fovRange[0]}
      max={fovRange[1]}
      step={1}
    />
  )
}