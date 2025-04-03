import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { MeshPhysicalMaterial, Vector2 } from "three";

interface UseUpdateMaterialNormalScaleProps {
  normalScale: Vector2;
  getMaterial: () => MeshPhysicalMaterial;
}

export default function useUpdateMaterialNormalScale({
  normalScale,
  getMaterial
}: UseUpdateMaterialNormalScaleProps) {
  const { render } = useThree();

  useEffect(() => {
    const material = getMaterial();
    material.normalScale = normalScale;
    render();
  }, [getMaterial, normalScale, render])
}