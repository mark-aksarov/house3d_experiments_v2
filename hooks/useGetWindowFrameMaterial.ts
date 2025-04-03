import { useCallback, useRef } from "react";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useWindowsContext } from "@/context/WindowsContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetWindowFrameMaterial() {
  const { frameColor } = useWindowsContext();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({ side: DoubleSide })

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color: frameColor, getMaterial });

  return getMaterial;
}