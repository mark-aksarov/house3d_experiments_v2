import { useCallback, useRef } from "react";
import { DoubleSide, MeshPhysicalMaterial } from "three";

const useGetBlindsMaterial = () => {
  const materialRef = useRef<MeshPhysicalMaterial | null>(null);

  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      color: 0xffffff,
      side: DoubleSide
    });

    materialRef.current = material;

    return material;
  }, [])

  return getMaterial;
}

export default useGetBlindsMaterial;