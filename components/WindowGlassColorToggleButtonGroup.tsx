import { ColorRepresentation } from "three";
import { useUndo } from "@/context/UndoContext";
import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowGlassColorToggleButtonGroup() {
  const { windows: { glassColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleColorChange(newColor: ColorRepresentation) {
    dispatch({ type: "windowsGlassColorChanged", payload: newColor });

    addAction(
      () => dispatch({ type: "windowsGlassColorChanged", payload: glassColor }),
      () => dispatch({ type: "windowsGlassColorChanged", payload: newColor })
    )
  }

  return (
    <ColorToggleButtonGroup
      data-testid="window-glass-color-toggle-button-group"
      color={glassColor}
      onChange={handleColorChange}
    />
  )
}