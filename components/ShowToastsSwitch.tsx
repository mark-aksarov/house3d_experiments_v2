import Switch from "@/uikit/Switch";
import { useToasts } from "@/context/ToastsContext";

export default function ShowToastsSwitch() {
  const { showToasts, setShowToasts } = useToasts();

  return (
    <Switch
      data-testid="show-toasts-switch"
      checked={showToasts}
      onChange={() => setShowToasts(!showToasts)}
    />
  )
}