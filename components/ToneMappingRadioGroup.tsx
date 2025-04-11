import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { ToneMapping } from "three";
import { useUndo } from "@/context/UndoContext";
import RadioGroup from "@/uikit/Radio/RadioGroup";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

const toneMappingOptions = [
  { value: 1, label: "Linear" },
  { value: 2, label: "Reinhard" },
  { value: 3, label: "Cineon" },
  { value: 4, label: "ACES filmic" },
  { value: 6, label: "AgX" },
  { value: 7, label: "Neutral" },
];

export default function ToneMappingRadioGroup() {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const { addAction } = useUndo();

  function changeToneMapping(value: ToneMapping) {
    dispatch({ type: "toneMappingChanged", payload: value });

    addAction(
      () => dispatch({ type: "toneMappingChanged", payload: settings.toneMapping }),
      () => dispatch({ type: "toneMappingChanged", payload: value }),
    )
  }

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={settings.toneMapping}
        name="toneMapping"
        onChange={(value) => changeToneMapping(value as ToneMapping)}
      >
        {toneMappingOptions.map(({ value, label }) => (
          <Radio id={value.toString()} key={value} value={value} label={label} />
        ))}
      </RadioGroup>
    </Stack>
  );
}