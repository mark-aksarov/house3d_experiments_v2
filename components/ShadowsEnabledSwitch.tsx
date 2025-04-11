import Switch from "@/uikit/Switch";
import { useUndo } from "@/context/UndoContext";
import { useSettings, useSettingsDispatch } from "@/context/SettingsContext";

export default function ShadowsEnabledSwitch() {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const { addAction } = useUndo();

  function changeShadowsEnabled(value: boolean) {
    dispatch({ type: "shadowsEnabledChanged", payload: value });

    addAction(
      () => dispatch({ type: "shadowsEnabledChanged", payload: settings.shadowsEnabled }),
      () => dispatch({ type: "shadowsEnabledChanged", payload: value }),
    )
  }

  return (
    <Switch
      data-testid="shadows-enabled-switch"
      checked={settings.shadowsEnabled}
      onChange={() => changeShadowsEnabled(!settings.shadowsEnabled)}
    />
  )
}