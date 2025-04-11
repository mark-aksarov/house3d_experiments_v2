import UndoableRangeInput from "./UndoableRangeInput";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

export default function AmbientLightIntensityRangeInput() {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();

  function updateAmbientLightIntensity(value: number) {
    dispatch({ type: "ambientLightIntensityChanged", payload: value });
  }

  return (
    <UndoableRangeInput
      data-testid="ambient-light-intensity-range-input"
      value={settings.ambientLightIntensity}
      onChange={updateAmbientLightIntensity}
      min={1}
      max={10}
      step={1}
    />
  )
}