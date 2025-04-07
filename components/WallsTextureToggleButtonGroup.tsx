import { StaticImageData } from "next/image";
import { TextureName } from "@/context/TexturesContext";
import TextureToggleButtonGroup from "./TextureToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

import Bricks092Url from "public/textures/Bricks092/Bricks092.jpg";
import Asphalt006Url from "public/textures/Asphalt006/Asphalt006.jpg";
import Asphalt029BUrl from "public/textures/Asphalt029B/Asphalt029B.jpg";
import Asphalt030Url from "public/textures/Asphalt030/Asphalt030.jpg";
import Asphalt031Url from "public/textures/Asphalt031/Asphalt031.jpg";
import Concrete024Url from "public/textures/Concrete024/Concrete024.jpg";
import Plaster003Url from "public/textures/Plaster003/Plaster003.jpg";

const data: Array<{ src: StaticImageData; value: TextureName; label: string }> = [
  {
    src: Bricks092Url,
    value: "Bricks092",
    label: "Bricks 1"
  },
  {
    src: Asphalt006Url,
    value: "Asphalt006",
    label: "Asphalt 1"
  },
  {
    src: Asphalt029BUrl,
    value: "Asphalt029B",
    label: "Asphalt 3"
  },
  {
    src: Asphalt030Url,
    value: "Asphalt030",
    label: "Asphalt 4"
  },
  {
    src: Asphalt031Url,
    value: "Asphalt031",
    label: "Asphalt 5"
  },
  {
    src: Concrete024Url,
    value: "Concrete024",
    label: "Concrete 1"
  },
  {
    src: Plaster003Url,
    value: "Plaster003",
    label: "Plaster 1"
  }
]

export default function WallsTextureToggleButtonGroup() {
  const { walls: { textureName } } = useMaterials();
  const dispatch = useMaterialsDispatch();

  return (
    <TextureToggleButtonGroup
      data-testid="walls-texture-toggle-button-group"
      data={data}
      textureName={textureName}
      onChange={(textureName) => dispatch({ type: "wallsTextureChanged", payload: textureName })}
    />
  )
}