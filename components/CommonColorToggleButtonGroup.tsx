import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function CommonColorToggleButtonGroup() {
  const { common: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <ColorToggleButtonGroup
      data-testid="common-color-toggle-button-group"
      color={color}
      onChange={(color) => dispatch({ type: "commonColorChanged", payload: color })}
    />
  )
}