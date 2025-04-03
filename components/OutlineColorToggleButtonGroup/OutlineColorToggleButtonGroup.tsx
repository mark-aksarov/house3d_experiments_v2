import { useState } from "react";
import Stack from "@/uikit/Stack";
import ImageButton from "@/uikit/ImageButton";
import styles from './OutlineColorToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";

const colors = [
  {
    name: "cian",
    hex: "#00ffff",
  },
  {
    name: "blue",
    hex: "#0000ff",
  },
  {
    name: "green",
    hex: "#00ff00",
  },
  {
    name: "orange",
    hex: "#ffa500",
  },
  {
    name: "purple",
    hex: "#800080",
  },
  {
    name: "red",
    hex: "#ff0000",
  },
  {
    name: "yellow",
    hex: "#ffff00",
  },
  {
    name: "white",
    hex: "#ffffff",
  }
];

export default function OutlineColorToggleButtonGroup() {
  const [value, setValue] = useState("cian");

  const content = colors.map(({ name, hex }) => (
    <ToggleButton
      key={name}
      as={ImageButton}
      size="small"
      label={name}
      value={name}
      image={
        <span
          className={styles.color}
          style={{ backgroundColor: hex }}
        />
      }
    />
  ))

  return (
    <ToggleButtonGroup
      data-testid="outline-color-toggle-button-group"
      value={value}
      onChange={(value: string) => setValue(value)}
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