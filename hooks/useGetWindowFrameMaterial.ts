import { useCallback, useRef } from "react";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useMaterials } from "@/context/MaterialsContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetWindowFrameMaterial() {
  const { common: { color } } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({ side: DoubleSide })

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color, getMaterial });

  return getMaterial;
}