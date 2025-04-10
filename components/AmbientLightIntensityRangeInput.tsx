import UndoableRangeInput from "./UndoableRangeInput";
import { useSettings } from "@/context/SettingsContext";

export default function AmbientLightIntensityRangeInput() {
  const { ambientLightIntensity, setAmbientLightIntensity } = useSettings();

  return (
    <UndoableRangeInput
      data-testid="ambient-light-intensity-range-input"
      value={ambientLightIntensity}
      onChange={setAmbientLightIntensity}
      min={1}
      max={10}
      step={1}
    />
  )
}