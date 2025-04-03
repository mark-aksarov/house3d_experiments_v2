import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { useFenceContext } from "@/context/FenceContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetFenceMaterial() {
  const { color } = useFenceContext();

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