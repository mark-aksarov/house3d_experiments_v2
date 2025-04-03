import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";

const useGetGlassMaterial = () => {
  const materialRef = useRef<MeshPhysicalMaterial | null>(null);

  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xbbbbbb,
      roughness: 0,
      reflectivity: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.7
    });

    materialRef.current = material;

    return material;
  }, [])

  return getMaterial;
}

export default useGetGlassMaterial;