import UndoableRangeInput from "./UndoableRangeInput";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";
import { useToneMappingExposureRange } from "@/hooks/useToneMappingExposureRange";

export default function ToneMappingExposureRangeInput() {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const range = useToneMappingExposureRange();

  function updateToneMappingExposure(value: number) {
    dispatch({ type: "toneMappingExposureChanged", payload: value });
  }

  return (
    <UndoableRangeInput
      data-testid="tone-mapping-exposure-range-input"
      value={settings.toneMappingExposure}
      onChange={updateToneMappingExposure}
      min={range[0]}
      max={range[1]}
      step={0.05}
    />
  )
}