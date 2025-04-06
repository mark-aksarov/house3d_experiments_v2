import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { useState } from "react";
import RadioGroup from "@/uikit/Radio/RadioGroup";

const cameraMovingOptions = [
  { value: "Immediately", label: "Immediately" },
  { value: "Smoothly", label: "Smoothly" },
];

export default function CameraMovingRadioGroup() {
  const selectedValue = "Immediately";
  const [checkedName, setCheckedName] = useState(selectedValue);

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={checkedName}
        name="cameraMoving"
        onChange={(value) => setCheckedName(value as string)}
      >
        {cameraMovingOptions.map(({ value, label }) => (
          <Radio id={value} key={value} value={value} label={label} />
        ))}
      </RadioGroup>
    </Stack>
  );
}