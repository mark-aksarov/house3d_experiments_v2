import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { Color, ColorRepresentation, MeshPhysicalMaterial } from "three";

interface UseUpdateMaterialColorProps {
  color: ColorRepresentation;
  getMaterial: () => MeshPhysicalMaterial;
}

export default function useUpdateMaterialColor({
  color,
  getMaterial
}: UseUpdateMaterialColorProps) {
  const { render } = useThree();

  useEffect(() => {
    const material = getMaterial();
    material.color = new Color(color);
    render();
  }, [getMaterial, color, render])
}