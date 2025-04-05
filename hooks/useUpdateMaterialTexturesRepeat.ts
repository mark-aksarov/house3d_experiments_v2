import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { MeshPhysicalMaterial, Vector2 } from "three";
import { useTextures } from "@/context/TexturesContext";

interface UseUpdateMaterialTexturesRepeatProps {
  repeat: Vector2;
  getMaterial: () => MeshPhysicalMaterial;
}

export default function useUpdateMaterialTexturesRepeat({
  repeat,
  getMaterial
}: UseUpdateMaterialTexturesRepeatProps) {
  const { textures } = useTextures();
  const { render } = useThree();

  useEffect(() => {
    if (textures) {
      const material = getMaterial();

      if (material.map) {
        material.map.repeat = repeat;
      }

      if (material.roughnessMap) {
        material.roughnessMap.repeat = repeat;
      }

      if (material.aoMap) {
        material.aoMap.repeat = repeat;
      }

      if (material.normalMap) {
        material.normalMap.repeat = repeat;
      }

      render();
    }
  }, [getMaterial, textures, repeat, render])
}