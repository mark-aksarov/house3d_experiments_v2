import { useCallback, useRef } from "react";
import materialDefaults from "@/utils/materialDefaults";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import useUpdateMaterialTextures from "./useUpdateMaterialTextures";
import useUpdateMaterialTexturesRepeat from "./useUpdateMaterialTexturesRepeat";

export default function useGetBorderMaterial() {
  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const textureName = "Plaster003";

  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      normalScale: materialDefaults.repeat[textureName],
      roughness: materialDefaults.roughness[textureName],
      side: DoubleSide
    });

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialTextures({ textureName, getMaterial });

  useUpdateMaterialTexturesRepeat({ repeat: materialDefaults.repeat[textureName], getMaterial });

  return getMaterial;
}