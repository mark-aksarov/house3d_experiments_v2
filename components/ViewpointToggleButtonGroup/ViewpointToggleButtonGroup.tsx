import Stack from "@/uikit/Stack";
import ImageButton from "@/uikit/ImageButton";
import { Viewpoint } from "@/hooks/useControls";
import Image, { StaticImageData } from "next/image";
import { useViewpoint } from "@/context/ViewpointContext";
import styles from './ViewpointToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";

import viewpoint1 from 'public/images/house.jpg';
import viewpoint2 from 'public/images/house.jpg';
import viewpoint3 from 'public/images/house.jpg';
import viewpoint4 from 'public/images/house.jpg';
import viewpoint5 from 'public/images/house.jpg';

const viewpoints: {
  value: Viewpoint,
  image: StaticImageData,
  label: string
}[] = [
    {
      value: "Viewpoint1",
      image: viewpoint1,
      label: "Viewpoint 1"
    },
    {
      value: "Viewpoint2",
      image: viewpoint2,
      label: "Viewpoint 2"
    },
    {
      value: "Viewpoint3",
      image: viewpoint3,
      label: "Viewpoint 3"
    },
    {
      value: "Viewpoint4",
      image: viewpoint4,
      label: "Viewpoint 4"
    },
    {
      value: "Viewpoint5",
      image: viewpoint5,
      label: "Viewpoint 5"
    }
  ];

export default function ViewpointToggleButtonGroup() {
  const { viewpoint, setViewpoint } = useViewpoint();

  let content = viewpoints.map(({ value, image, label }) => (
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
      data-testid="viewpoint-toggle-button-group"
      value={viewpoint}
      onChange={(value: Viewpoint) => setViewpoint(value)}
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