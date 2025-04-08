import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowBlindsColorToggleButtonGroup() {
  const { windows: { blindsColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="window-blinds-color-toggle-button-group"
      color={blindsColor}
      onChange={(color) => dispatch({ type: "windowsBlindsColorChanged", payload: color })}
    />
  )
}