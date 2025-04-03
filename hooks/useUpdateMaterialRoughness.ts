import { useEffect } from "react";
import { MeshPhysicalMaterial } from "three";
import { useThree } from "@/context/ThreeContext";

interface UseUpdateMaterialRoughnessProps {
  roughness: number;
  getMaterial: () => MeshPhysicalMaterial;
}

export default function useUpdateMaterialRoughness({
  roughness,
  getMaterial
}: UseUpdateMaterialRoughnessProps) {
  const { render } = useThree();

  useEffect(() => {
    const material = getMaterial();
    material.roughness = roughness;
    render();
  }, [getMaterial, roughness, render])
}