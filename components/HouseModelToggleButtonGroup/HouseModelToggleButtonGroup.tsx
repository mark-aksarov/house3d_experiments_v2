import Stack from "@/uikit/Stack";
import ImageButton from "@/uikit/ImageButton";
import { useUndo } from "@/context/UndoContext";
import Image, { StaticImageData } from "next/image";
import styles from './HouseModelToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";
import { ModelName, useModels, useModelsDispatch } from "@/context/ModelsContext";

import house1 from 'public/images/house1.jpg';
import house2 from 'public/images/house2.jpg';

const houses: {
  value: ModelName,
  image: StaticImageData,
  label: string,
}[] = [
    {
      value: "House1",
      image: house1,
      label: "House 1",
    },
    {
      value: "House2",
      image: house2,
      label: "House 2",
    }
  ];

export default function HouseModelToggleButtonGroup() {
  const { selectedModelName } = useModels();

  const dispatch = useModelsDispatch();
  const { addAction } = useUndo();

  function changeHouseModelChange(modelName: ModelName) {
    dispatch({
      type: 'selectedModelNameChanged',
      modelName: modelName
    })

    addAction(
      () => dispatch({
        type: 'selectedModelNameChanged',
        modelName: selectedModelName
      }),
      () => dispatch({
        type: 'selectedModelNameChanged',
        modelName: modelName
      })
    )
  }

  let content = houses.map(({ value, image, label }) => (
    <ToggleButton
      key={value}
      as={ImageButton}
      size="large"
      label={label}
      value={value}
      image={
        <Image
          width={120}
          height={120}
          alt="test-image"
          src={image}
        />
      }
    />
  ))

  return (
    <ToggleButtonGroup
      data-testid="house-model-toggle-button-group"
      value={selectedModelName}
      onChange={(value) => changeHouseModelChange(value as ModelName)}
    >
      <Stack
        spacing={3}
        wrap="nowrap"
        className={styles.stack}
      >
        {content}
      </Stack>

      <div className={styles.grid}>
        {content}
      </div>
    </ToggleButtonGroup>
  )
}