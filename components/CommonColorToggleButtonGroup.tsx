import { ColorRepresentation } from "three";
import { useUndo } from "@/context/UndoContext";
import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function CommonColorToggleButtonGroup() {
  const { common: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleColorChange(newColor: ColorRepresentation) {
    dispatch({ type: "commonColorChanged", payload: newColor });

    addAction(
      () => dispatch({ type: "commonColorChanged", payload: color }),
      () => dispatch({ type: "commonColorChanged", payload: newColor })
    )
  }

  return (
    <ColorToggleButtonGroup
      data-testid="common-color-toggle-button-group"
      color={color}
      onChange={handleColorChange}
    />
  )
}