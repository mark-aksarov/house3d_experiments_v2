import Switch from "@/uikit/Switch";
import { useUndo } from "@/context/UndoContext";
import { useSettings } from "@/context/SettingsContext";

export default function ShadowsEnabledSwitch() {
  const { shadowsEnabled, setShadowsEnabled } = useSettings();
  const { addAction } = useUndo();

  function changeShadowsEnabled(value: boolean) {
    setShadowsEnabled(value);

    addAction(
      () => setShadowsEnabled(shadowsEnabled),
      () => setShadowsEnabled(value),
    )
  }

  return (
    <Switch
      data-testid="shadows-enabled-switch"
      checked={shadowsEnabled}
      onChange={() => changeShadowsEnabled(!shadowsEnabled)}
    />
  )
}