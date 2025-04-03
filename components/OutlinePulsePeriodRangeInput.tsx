import { useState } from "react";
import RangeInput from "@/uikit/RangeInput";

export default function OutlinePulsePeriodRangeInput() {
  const [value, setValue] = useState(0);

  return (
    <RangeInput
      data-testid="outline-pulse-period-range-input"
      value={value}
      onChange={(e) => setValue(parseFloat(e.target.value))}
      min={0}
      max={5}
      step={0.1}
    />
  )
}