import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import materialDefaults from "@/utils/materialDefaults";
import useUpdateMaterialTextures from "./useUpdateMaterialTextures";
import useUpdateMaterialTexturesRepeat from "./useUpdateMaterialTexturesRepeat";

export default function useGetPavingMaterial() {
  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const textureName = "PavingStones108";

  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      normalScale: materialDefaults.repeat[textureName],
      roughness: materialDefaults.roughness[textureName],
    });

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialTextures({ textureName, getMaterial });

  useUpdateMaterialTexturesRepeat({ repeat: materialDefaults.repeat[textureName], getMaterial });

  return getMaterial;
}