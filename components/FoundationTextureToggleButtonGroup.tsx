import { StaticImageData } from "next/image";
import { useUndo } from "@/context/UndoContext";
import { TextureName } from "@/context/TexturesContext";
import TextureToggleButtonGroup from "./TextureToggleButtonGroup";
import { useMaterials, useMaterialsDispatch } from "@/context/MaterialsContext";

import Plaster003Url from "public/textures/Plaster003/Plaster003.jpg";
import Asphalt030Url from "public/textures/Asphalt030/Asphalt030.jpg";
import Asphalt031Url from "public/textures/Asphalt031/Asphalt031.jpg";
import Concrete024Url from "public/textures/Concrete024/Concrete024.jpg";
import Bricks075AUrl from "public/textures/Bricks075A/Bricks075A.jpg";

const data: Array<{ src: StaticImageData; value: TextureName; label: string }> = [
  {
    src: Plaster003Url,
    value: "Plaster003",
    label: "Plaster 1"
  },
  {
    src: Asphalt030Url,
    value: "Asphalt030",
    label: "Asphalt 2"
  },
  {
    src: Asphalt031Url,
    value: "Asphalt031",
    label: "Asphalt 3"
  },
  {
    src: Concrete024Url,
    value: "Concrete024",
    label: "Concrete 1"
  },
  {
    src: Bricks075AUrl,
    value: "Bricks075A",
    label: "Brick 1"
  },
]

export default function FoundationTextureToggleButtonGroup() {
  const { foundation: { textureName } } = useMaterials();
  const dispatch = useMaterialsDispatch();
  const { addAction } = useUndo();

  function handleTextureChange(newTextureName: TextureName) {
    dispatch({ type: "foundationTextureChanged", payload: newTextureName });

    addAction(
      () => dispatch({ type: "foundationTextureChanged", payload: textureName }),
      () => dispatch({ type: "foundationTextureChanged", payload: newTextureName })
    )
  }

  return (
    <TextureToggleButtonGroup
      data-testid="foundation-texture-toggle-button-group"
      data={data}
      textureName={textureName}
      onChange={handleTextureChange}
    />
  )
}