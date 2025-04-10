import { ColorRepresentation } from "three";
import { useUndo } from "@/context/UndoContext";
import ColorToggleButtonGroup from "./ColorToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function WindowSashColorToggleButtonGroup() {
  const { windows: { sashColor } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleColorChange(newColor: ColorRepresentation) {
    dispatch({ type: "windowsSashColorChanged", payload: newColor });

    addAction(
      () => dispatch({ type: "windowsSashColorChanged", payload: sashColor }),
      () => dispatch({ type: "windowsSashColorChanged", payload: newColor })
    )
  }

  return (
    <ColorToggleButtonGroup
      data-testid="window-sash-color-toggle-button-group"
      color={sashColor}
      onChange={handleColorChange}
    />
  )
}