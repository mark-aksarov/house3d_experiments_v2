import Stack from "@/uikit/Stack";
import colors from "@/utils/colors";
import { HTMLAttributes } from "react";
import { ColorRepresentation } from "three";
import ImageButton from "@/uikit/ImageButton";
import styles from './ColorToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";

interface ColorToggleButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'> {
  color: ColorRepresentation,
  onChange: (color: ColorRepresentation) => void
}

export default function ColorToggleButtonGroup({
  color,
  onChange,
  ...props
}: ColorToggleButtonGroupProps) {
  const content = colors.map(({ name, hex }) => (
    <ToggleButton
      key={name}
      as={ImageButton}
      size="small"
      label={name}
      value={hex}
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
      {...props}
      value={color as number}
      onChange={(value) => onChange(value as ColorRepresentation)}
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