import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowGlassColorToggleButtonGroup() {
  const { windows: { glassColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="window-glass-color-toggle-button-group"
      color={glassColor}
      onChange={(color) => dispatch({ type: "windowsGlassColorChanged", payload: color })}
    />
  )
}