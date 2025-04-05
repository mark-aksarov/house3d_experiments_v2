import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { useMaterials } from "@/context/MaterialsContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetWindowSashMaterial() {
  const { windows: { sashColor } } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial()

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color: sashColor, getMaterial });

  return getMaterial;
}