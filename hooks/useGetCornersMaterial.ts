import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { useCornersContext } from "@/context/CornersContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetCornersMaterial() {
  const { color } = useCornersContext();

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