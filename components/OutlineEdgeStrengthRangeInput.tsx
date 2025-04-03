import { useState } from "react";
import RangeInput from "@/uikit/RangeInput";

export default function OutlineEdgeStrengthRangeInput() {
  const [value, setValue] = useState(2);

  return (
    <RangeInput
      data-testid="outline-edge-strength-range-input"
      value={value}
      onChange={(e) => setValue(parseFloat(e.target.value))}
      min={1}
      max={10}
      step={0.1}
    />
  )
}