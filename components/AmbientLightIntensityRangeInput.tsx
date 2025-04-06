import RangeInput from "@/uikit/RangeInput";
import { useSettings } from "@/context/SettingsContext";

export default function AmbientLightIntensityRangeInput() {
  const { ambientLightIntensity, setAmbientLightIntensity } = useSettings();

  function changeAmbientLightIntensity(value: number) {
    setAmbientLightIntensity(value);
  }

  return (
    <RangeInput
      data-testid="ambient-light-intensity-range-input"
      value={ambientLightIntensity}
      onChange={(e) => changeAmbientLightIntensity(parseFloat(e.target.value))}
      min={1}
      max={10}
      step={1}
    />
  )
}