import { useState } from "react";
import RangeInput from "@/uikit/RangeInput";
import { useThree } from "@/context/ThreeContext";
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
    <RangeInput
      data-testid="camera-fov-range-input"
      value={value}
      onChange={(e) => changeFov(parseFloat(e.target.value))}
      min={fovRange[0]}
      max={fovRange[1]}
      step={1}
    />
  )
}