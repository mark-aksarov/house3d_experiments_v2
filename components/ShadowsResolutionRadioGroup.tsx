import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { useUndo } from "@/context/UndoContext";
import RadioGroup from "@/uikit/Radio/RadioGroup";
import { ShadowsResolution, useSettings, useSettingsDispatch } from "@/context/SettingsContext";

const shadowResolutions = ["1024x1024", "2048x2048", "4096x4096"];

export default function ShadowsResolutionRadioGroup() {
  const state = useSettings();
  const dispatch = useSettingsDispatch();
  const { addAction } = useUndo();

  function changeShadowsResolution(value: ShadowsResolution) {
    dispatch({ type: "shadowsResolutionChanged", payload: value });

    addAction(
      () => dispatch({ type: "shadowsResolutionChanged", payload: state.shadowsResolution }),
      () => dispatch({ type: "shadowsResolutionChanged", payload: value }),
    )
  }

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={state.shadowsResolution}
        name="shadowsResolution"
        onChange={(value) => changeShadowsResolution(value as ShadowsResolution)}
      >
        {shadowResolutions.map((value) => (
          <Radio id={value} key={value} value={value} label={value} />
        ))}
      </RadioGroup>
    </Stack>
  );
}