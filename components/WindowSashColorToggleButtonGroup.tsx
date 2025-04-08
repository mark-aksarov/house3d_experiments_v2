import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowSashColorToggleButtonGroup() {
  const { windows: { sashColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="window-sash-color-toggle-button-group"
      color={sashColor}
      onChange={(color) => dispatch({ type: "windowsSashColorChanged", payload: color })}
    />
  )
}