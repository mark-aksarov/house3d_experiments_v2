import { ColorRepresentation } from "three";
import { useUndo } from "@/context/UndoContext";
import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function DoorsColorToggleButtonGroup() {
  const { doors: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleColorChange(newColor: ColorRepresentation) {
    dispatch({ type: "doorsColorChanged", payload: newColor });

    addAction(
      () => dispatch({ type: "doorsColorChanged", payload: color }),
      () => dispatch({ type: "doorsColorChanged", payload: newColor })
    )
  }

  return (
    <ColorToggleButtonGroup
      data-testid="doors-color-toggle-button-group"
      color={color}
      onChange={handleColorChange}
    />
  )
}