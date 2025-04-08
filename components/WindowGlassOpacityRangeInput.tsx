import RangeInput from "@/uikit/RangeInput";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowGlassOpacityRangeInput() {
  const { windows: { glassOpacity } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <RangeInput
      data-testid="tone-mapping-exposure-range-input"
      value={glassOpacity}
      onChange={(e) => dispatch({ type: "windowsGlassOpacityChanged", payload: parseFloat(e.target.value) })}
      min={0.1}
      max={0.9}
      step={0.05}
    />
  )
}