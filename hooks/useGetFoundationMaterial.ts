import { useCallback, useMemo, useRef } from "react";
import materialDefaults from "@/utils/materialDefaults";
import { useMaterials } from "@/context/MaterialsContext";
import { DoubleSide, MeshPhysicalMaterial, Vector2 } from "three";
import useUpdateMaterialTextures from "./useUpdateMaterialTextures";
import useUpdateMaterialRoughness from "./useUpdateMaterialRoughness";
import useUpdateMaterialNormalScale from "./useUpdateMaterialNormalScale";
import useUpdateMaterialTexturesRepeat from "./useUpdateMaterialTexturesRepeat";

export default function useGetFoundationMaterial() {
  const { foundation: { textureName } } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      aoMapIntensity: 1,
      metalness: 0,
      side: DoubleSide
    });

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialTextures({ textureName, getMaterial });

  const repeat = useMemo(() => {
    if (textureName === "Asphalt030") {
      return new Vector2(1, 1);
    }

    return materialDefaults.repeat[textureName]
  }, [textureName]);
  useUpdateMaterialTexturesRepeat({ repeat, getMaterial });

  const roughness = useMemo(() => materialDefaults.roughness[textureName], [textureName]);
  useUpdateMaterialRoughness({ roughness, getMaterial });

  const normalScale = useMemo(() => materialDefaults.normalScale[textureName], [textureName]);
  useUpdateMaterialNormalScale({ normalScale, getMaterial });

  return getMaterial;
}