import Image from "next/image";
import Stack from "@/uikit/Stack";
import ImageButton from "@/uikit/ImageButton";
import { TextureName } from "@/context/TexturesContext";
import styles from './RoofCoverTextureToggleButtonGroup.module.scss';
import ToggleButtonGroup, { ToggleButton } from "@/uikit/ToggleButton";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

import RoofingTiles003Url from "public/textures/RoofingTiles003/RoofingTiles003.jpg";
import RoofingTiles004Url from "public/textures/RoofingTiles004/RoofingTiles004.jpg";
import RoofingTiles011AUrl from "public/textures/RoofingTiles011A/RoofingTiles011A.jpg";
import RoofingTiles012AUrl from "public/textures/RoofingTiles012A/RoofingTiles012A.jpg";
import RoofingTiles013AUrl from "public/textures/RoofingTiles013A/RoofingTiles013A.jpg";
import RoofingTiles014AUrl from "public/textures/RoofingTiles014A/RoofingTiles014A.jpg";
import RoofingTiles015AUrl from "public/textures/RoofingTiles015A/RoofingTiles015A.jpg";

const data = [
  {
    src: RoofingTiles003Url,
    value: "RoofingTiles003",
    label: "Tile1"
  },
  {
    src: RoofingTiles004Url,
    value: "RoofingTiles004",
    label: "Tile2"
  },
  {
    src: RoofingTiles011AUrl,
    value: "RoofingTiles011A",
    label: "Tile3"
  },
  {
    src: RoofingTiles012AUrl,
    value: "RoofingTiles012A",
    label: "Tile4"
  },
  {
    src: RoofingTiles013AUrl,
    value: "RoofingTiles013A",
    label: "Tile5"
  },
  {
    src: RoofingTiles014AUrl,
    value: "RoofingTiles014A",
    label: "Tile6"
  },
  {
    src: RoofingTiles015AUrl,
    value: "RoofingTiles015A",
    label: "Tile7"
  }
]

export default function RoofCoverTextureToggleButtonGroup() {
  const { roof: { coverTextureName } } = useMaterials();
  const dispatch = useMaterialsDispatch();

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
      data-testid="roof-cover-texture-toggle-button-group"
      value={coverTextureName}
      onChange={(value) => dispatch({ type: "roofCoverTextureChanged", payload: value as TextureName })}
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