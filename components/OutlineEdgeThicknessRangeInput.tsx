import { useState } from "react";
import RangeInput from "@/uikit/RangeInput";

export default function OutlineEdgeThicknessRangeInput() {
  const [value, setValue] = useState(0.5);

  return (
    <RangeInput
      data-testid="outline-edge-thickness-range-input"
      value={value}
      onChange={(e) => setValue(parseFloat(e.target.value))}
      min={0}
      max={1}
      step={0.1}
    />
  )
}