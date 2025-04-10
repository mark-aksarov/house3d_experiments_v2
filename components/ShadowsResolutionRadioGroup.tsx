import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { useUndo } from "@/context/UndoContext";
import RadioGroup from "@/uikit/Radio/RadioGroup";
import { ShadowsResolution, useSettings } from "@/context/SettingsContext";

const shadowResolutions = ["1024x1024", "2048x2048", "4096x4096"];

export default function ShadowsResolutionRadioGroup() {
  const { shadowsResolution, setShadowsResolution } = useSettings();
  const { addAction } = useUndo();

  function changeShadowsResolution(value: ShadowsResolution) {
    setShadowsResolution(value);

    addAction(
      () => setShadowsResolution(shadowsResolution),
      () => setShadowsResolution(value),
    )
  }

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={shadowsResolution}
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