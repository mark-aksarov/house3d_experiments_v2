import { useState } from "react";
import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import { ToneMapping } from "three";
import { useUndo } from "@/context/UndoContext";
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
  const { addAction } = useUndo();

  function changeToneMapping(value: number) {
    function action(value: number) {
      const renderer = getRenderer();
      renderer.toneMapping = value as ToneMapping;
      setCheckedName(value as ToneMapping);
      render();
    }
    action(value);

    addAction(
      () => action(checkedName),
      () => action(value),
    )
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