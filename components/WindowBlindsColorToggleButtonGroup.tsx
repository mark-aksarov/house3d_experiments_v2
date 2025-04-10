import { ColorRepresentation } from "three";
import { useUndo } from "@/context/UndoContext";
import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowBlindsColorToggleButtonGroup() {
  const { windows: { blindsColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleColorChange(newColor: ColorRepresentation) {
    dispatch({ type: "windowsBlindsColorChanged", payload: newColor });

    addAction(
      () => dispatch({ type: "windowsBlindsColorChanged", payload: blindsColor }),
      () => dispatch({ type: "windowsBlindsColorChanged", payload: newColor })
    )
  }

  return (
    <ColorToggleButtonGroup
      data-testid="window-blinds-color-toggle-button-group"
      color={blindsColor}
      onChange={handleColorChange}
    />
  )
}