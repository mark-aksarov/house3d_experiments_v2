import { useState } from "react";
import { useThree } from "@/context/ThreeContext";
import UndoableRangeInput from "./UndoableRangeInput";
import { useToneMappingExposureRange } from "@/hooks/useToneMappingExposureRange";

export default function ToneMappingExposureRangeInput() {
  const { getRenderer, render } = useThree();
  const [value, setValue] = useState(getRenderer().toneMappingExposure);
  const range = useToneMappingExposureRange();

  function changeToneMappingExposure(value: number) {
    const renderer = getRenderer();
    renderer.toneMappingExposure = value;
    setValue(value);
    render();
  }

  return (
    <UndoableRangeInput
      data-testid="tone-mapping-exposure-range-input"
      value={value}
      onChange={changeToneMappingExposure}
      min={range[0]}
      max={range[1]}
      step={0.05}
    />
  )
}