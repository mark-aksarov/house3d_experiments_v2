import Switch from "@/uikit/Switch";
import { useSettings } from "@/context/SettingsContext";

export default function ShadowsEnabledSwitch() {
  const { shadowsEnabled, setShadowsEnabled } = useSettings();

  return (
    <Switch
      data-testid="shadows-enabled-switch"
      checked={shadowsEnabled}
      onChange={() => setShadowsEnabled(!shadowsEnabled)}
    />
  )
}