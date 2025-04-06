import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function RoofColorToggleButtonGroup() {
  const { roof: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="roof-color-toggle-button-group"
      color={color}
      onChange={(color) => dispatch({ type: "roofColorChanged", payload: color })}
    />
  )
}