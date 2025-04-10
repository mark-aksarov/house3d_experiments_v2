import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { useState } from "react";
import { ToneMapping } from "three";
import RadioGroup from "@/uikit/Radio/RadioGroup";
import { useThree } from "@/context/ThreeContext";

const toneMappingOptions = [
  { value: 1, label: "Linear" },
  { value: 2, label: "Reinhard" },
  { value: 3, label: "Cineon" },
  { value: 4, label: "ACES filmic" },
  { value: 6, label: "AgX" },
  { value: 7, label: "Neutral" },
];

export default function ToneMappingRadioGroup() {
  const { getRenderer, render } = useThree();
  const [checkedName, setCheckedName] = useState(getRenderer().toneMapping);

  function changeToneMapping(value: number) {
    const renderer = getRenderer();
    renderer.toneMapping = value as ToneMapping;
    setCheckedName(value as ToneMapping);
    render();
  }

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={checkedName}
        name="toneMapping"
        onChange={(value) => changeToneMapping(value as number)}
      >
        {toneMappingOptions.map(({ value, label }) => (
          <Radio id={value.toString()} key={value} value={value} label={label} />
        ))}
      </RadioGroup>
    </Stack>
  );
}