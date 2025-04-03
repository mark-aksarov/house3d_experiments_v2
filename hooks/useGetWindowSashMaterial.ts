import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { useWindowsContext } from "@/context/WindowsContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

export default function useGetWindowSashMaterial() {
  const { sashColor } = useWindowsContext();

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