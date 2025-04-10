import Switch from "@/uikit/Switch";
import { useUndo } from "@/context/UndoContext";
import { useToasts } from "@/context/ToastsContext";

export default function ShowToastsSwitch() {
  const { showToasts, setShowToasts } = useToasts();
  const { addAction } = useUndo();

  function changeShowToasts(value: boolean) {
    setShowToasts(value);

    addAction(
      () => setShowToasts(showToasts),
      () => setShowToasts(value),
    )
  }

  return (
    <Switch
      data-testid="show-toasts-switch"
      checked={showToasts}
      onChange={() => changeShowToasts(!showToasts)}
    />
  )
}