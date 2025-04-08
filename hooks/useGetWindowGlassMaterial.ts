import { MeshPhysicalMaterial } from "three";
import { useThree } from "@/context/ThreeContext";
import { useCallback, useEffect, useRef } from "react";
import { useMaterials } from "@/context/MaterialsContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

const useGetWindowGlassMaterial = () => {
  const { render } = useThree();
  const { windows: { glassColor, glassOpacity } } = useMaterials();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);

  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({
      roughness: 0,
      reflectivity: 1,
      metalness: 0,
      transparent: true,
    });

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color: glassColor, getMaterial });

  useEffect(() => {
    const material = getMaterial();
    material.opacity = glassOpacity;
    render();
  }, [getMaterial, glassOpacity, render]);

  return getMaterial;
}

export default useGetWindowGlassMaterial;