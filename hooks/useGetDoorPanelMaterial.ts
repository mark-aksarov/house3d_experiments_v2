import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import useUpdateMaterialColor from "./useUpdateMaterialColor";
import { useMaterials } from "@/context/MaterialsContext";

export default function useGetDoorPanelMaterial() {
  const { doors: { color } } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      roughness: 2,
      metalness: 0,
    })

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color, getMaterial });

  return getMaterial;
}