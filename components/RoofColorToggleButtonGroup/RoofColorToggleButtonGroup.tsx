import Stack from "@/uikit/Stack";
import colors from "@/utils/colors";
import ImageButton from "@/uikit/ImageButton";
import { TextureName } from "@/context/TexturesContext";
import styles from './RoofColorToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

export default function RoofColorToggleButtonGroup() {
  const { roof: { color } } = useMaterials();
  const dispatch = useMaterialsDispatch();

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
      data-testid="roof-color-toggle-button-group"
      value={color as number}
      onChange={(value) => dispatch({ type: "roofColorChanged", payload: value as TextureName })}
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