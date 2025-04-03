import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { useState } from "react";
import RadioGroup from "@/uikit/Radio/RadioGroup";

export default function MarkerSizeRadioGroup() {
  const selectedValue = "Small";
  const [checkedName, setCheckedName] = useState(selectedValue);

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={checkedName}
        name="markerSize"
        onChange={(value: string) => setCheckedName(value)}
      >
        {["Small", "Regular", "Large"].map((value) => (
          <Radio id={value} key={value} value={value} label={value} />
        ))}
      </RadioGroup>
    </Stack>
  );
}