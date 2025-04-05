import Stack from "@/uikit/Stack";
import ImageButton from "@/uikit/ImageButton";
import Image, { StaticImageData } from "next/image";
import styles from './HouseModelToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";
import { ModelName, useModels, useModelsDispatch } from "@/context/ModelsContext";

import house1 from 'public/images/house.jpg';
import house2 from 'public/images/house.jpg';
import house3 from 'public/images/house.jpg';
import house4 from 'public/images/house.jpg';

const houses: {
  value: ModelName,
  image: StaticImageData,
  label: string
}[] = [
    {
      value: "House1",
      image: house1,
      label: "House 1"
    },
    {
      value: "House2",
      image: house2,
      label: "House 2"
    },
    {
      value: "House3",
      image: house3,
      label: "House 3"
    },
    {
      value: "House4",
      image: house4,
      label: "House 4"
    }
  ];

export default function HouseModelToggleButtonGroup() {
  const { selectedModelName } = useModels();
  const dispatch = useModelsDispatch();

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
      onClick={() => { }}
    />
  ))

  return (
    <ToggleButtonGroup
      data-testid="house-model-toggle-button-group"
      value={selectedModelName}
      onChange={(value) =>
        dispatch({
          type: 'selectedModelNameChanged',
          modelName: value as ModelName
        })
      }
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