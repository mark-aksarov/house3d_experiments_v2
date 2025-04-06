import { useCallback, useMemo, useRef } from "react";
import materialDefaults from "@/utils/materialDefaults";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useMaterials } from "@/context/MaterialsContext";
import useUpdateMaterialTextures from "./useUpdateMaterialTextures";
import useUpdateMaterialRoughness from "./useUpdateMaterialRoughness";
import useUpdateMaterialNormalScale from "./useUpdateMaterialNormalScale";
import useUpdateMaterialTexturesRepeat from "./useUpdateMaterialTexturesRepeat";

export default function useGetRoofCoverMaterial() {
  const {
    roof: {
      coverTextureName: textureName
    }
  } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      emissive: 0x111111,
      metalness: 0.3,
      aoMapIntensity: 1,
      side: DoubleSide
    });

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialTextures({ textureName, getMaterial });

  const repeat = useMemo(() => materialDefaults.repeat[textureName], [textureName]);
  useUpdateMaterialTexturesRepeat({ repeat, getMaterial });

  const roughness = useMemo(() => materialDefaults.roughness[textureName], [textureName]);
  useUpdateMaterialRoughness({ roughness, getMaterial });

  const normalScale = useMemo(() => materialDefaults.normalScale[textureName], [textureName]);
  useUpdateMaterialNormalScale({ normalScale, getMaterial });

  return getMaterial;
}