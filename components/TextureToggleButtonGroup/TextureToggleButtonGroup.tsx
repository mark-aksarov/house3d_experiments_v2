import Stack from "@/uikit/Stack";
import { HTMLAttributes } from "react";
import ImageButton from "@/uikit/ImageButton";
import Image, { StaticImageData } from "next/image";
import { TextureName } from "@/context/TexturesContext";
import styles from './TextureToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";

interface TextureToggleButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  data: Array<{ src: StaticImageData; value: TextureName; label: string }>
  textureName: TextureName,
  onChange: (textureName: TextureName) => void
}

export default function TextureToggleButtonGroup({
  data,
  textureName,
  onChange,
  ...props
}: TextureToggleButtonGroupProps) {
  const content = data.map(({ src, value, label }) => (
    <ToggleButton
      key={value}
      as={ImageButton}
      size="small"
      label={label}
      value={value}
      imageWrapperClassName={styles.imageWrapper}
      image={
        <Image
          src={src}
          alt=""
          width={85}
          height={85}
        />
      }
    />
  ))

  return (
    <ToggleButtonGroup
      {...props}
      value={textureName}
      onChange={(textureName) => onChange(textureName as TextureName)}
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