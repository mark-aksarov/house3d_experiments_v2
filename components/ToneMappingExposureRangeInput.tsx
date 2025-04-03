import { useState } from "react";
import RangeInput from "@/uikit/RangeInput";
import { useThree } from "@/context/ThreeContext";
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
    <RangeInput
      data-testid="tone-mapping-exposure-range-input"
      value={value}
      onChange={(e) => changeToneMappingExposure(parseFloat(e.target.value))}
      min={range[0]}
      max={range[1]}
      step={0.05}
    />
  )
}