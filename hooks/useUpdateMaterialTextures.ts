import { useEffect } from "react";
import { useThree } from "@/context/ThreeContext";
import { disposeTexture } from "@/utils/disposeResources";
import { TextureName, useTextures } from "@/context/TexturesContext";
import { MeshPhysicalMaterial, SRGBColorSpace, RepeatWrapping, NoColorSpace } from "three";

interface UseUpdateMaterialTexturesProps {
  textureName: TextureName;
  getMaterial: () => MeshPhysicalMaterial;
}

export default function useUpdateMaterialTextures({
  textureName,
  getMaterial
}: UseUpdateMaterialTexturesProps) {
  const { textures, status } = useTextures();
  const { render } = useThree();

  useEffect(() => {
    if (textures && status === "success") {
      const material = getMaterial();
      material.needsUpdate = true;

      const map = textures[textureName]["color"];

      if (map) {
        material.map = map;
        material.map.colorSpace = SRGBColorSpace;
        material.map.wrapS = RepeatWrapping;
        material.map.wrapT = RepeatWrapping;
      }

      const roughnessMap = textures[textureName]["roughness"];

      if (roughnessMap) {
        material.roughnessMap = roughnessMap;
        material.roughnessMap.colorSpace = NoColorSpace;
        material.roughnessMap.wrapS = RepeatWrapping;
        material.roughnessMap.wrapT = RepeatWrapping;
      }

      const aoMap = textures[textureName]["ao"];

      if (aoMap) {
        material.aoMap = aoMap;
        material.aoMap.colorSpace = NoColorSpace;
        material.aoMap.wrapS = RepeatWrapping;
        material.aoMap.wrapT = RepeatWrapping;
      }

      const normalMap = textures[textureName]["normal"];

      if (normalMap) {
        material.normalMap = normalMap;
        material.normalMap.colorSpace = NoColorSpace;
        material.normalMap.wrapS = RepeatWrapping;
        material.normalMap.wrapT = RepeatWrapping;
      }

      const metalnessMap = textures[textureName]["metalness"];

      if (metalnessMap) {
        material.metalnessMap = metalnessMap;
        material.metalnessMap.colorSpace = NoColorSpace;
        material.metalnessMap.wrapS = RepeatWrapping;
        material.metalnessMap.wrapT = RepeatWrapping;
      }

      render();

      //textures is disposed during unmount
      return () => {
        if (material.map) {
          disposeTexture(material.map);
          material.map = null;
        }
        if (material.roughnessMap) {
          disposeTexture(material.roughnessMap);
          material.roughnessMap = null;
        }
        if (material.aoMap) {
          disposeTexture(material.aoMap);
          material.aoMap = null;
        }
        if (material.normalMap) {
          disposeTexture(material.normalMap);
          material.normalMap = null;
        }
        if (material.metalnessMap) {
          disposeTexture(material.metalnessMap);
          material.metalnessMap = null;
        }
        material.needsUpdate = true;
        render();
      }
    }
  }, [getMaterial, textures, status, textureName, render])
}