import { useState } from "react";
import Switch from "@/uikit/Switch";

export default function ShowMarkersSwitch() {
  const [show, setShow] = useState(false);

  return (
    <Switch
      data-testid="show-markers-switch"
      checked={show}
      onChange={() => setShow(!show)}
    />
  )
}