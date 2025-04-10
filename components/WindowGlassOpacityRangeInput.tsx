import UndoableRangeInput from "./UndoableRangeInput";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowGlassOpacityRangeInput() {
  const { windows: { glassOpacity } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  function changeGlassOpacity(value: number) {
    dispatch({ type: "windowsGlassOpacityChanged", payload: value });
  }

  return (
    <UndoableRangeInput
      data-testid="tone-mapping-exposure-range-input"
      value={glassOpacity}
      onChange={changeGlassOpacity}
      min={0.1}
      max={0.9}
      step={0.05}
    />
  )
}