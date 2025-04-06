import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function FenceColorToggleButtonGroup() {
  const { fence: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="fence-color-toggle-button-group"
      color={color}
      onChange={(color) => dispatch({ type: "fenceColorChanged", payload: color })}
    />
  )
}