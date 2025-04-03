import { useCallback, useRef } from "react";
import { MeshPhysicalMaterial } from "three";
import { useTheme } from "@/context/ThemeContext";
import useUpdateMaterialColor from "./useUpdateMaterialColor";

const useGetGroundMaterial = () => {
  const { theme } = useTheme();

  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const getMaterial = useCallback(() => {
    if (materialRef.current !== null) {
      return materialRef.current;
    }

    const material = new MeshPhysicalMaterial({ color: 0xffffff, transparent: true });

    material.onBeforeCompile = (shader) => {
      //vertex shader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
          #include <common>
          varying vec3 vPosition;
          varying vec2 vUv;
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        `
          #include <fog_vertex>
          vPosition = position;
          vUv = uv;
        `
      )

      //fragment shader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
          #include <common>
          uniform float uTime;
          varying vec3 vPosition;
          varying vec2 vUv;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        'vec4 diffuseColor = vec4( diffuse, opacity );',
        `
          vec4 diffuseColor = vec4( diffuse, opacity );
          vec2 uv = abs(vUv - 0.5) * 2.0;
          float t = distance(uv, vec2(0.0));
          diffuseColor = vec4(diffuseColor.rgb, 1.0 - smoothstep(0.0, 1.0, t));
        `
      );
    }

    materialRef.current = material;

    return material;
  }, [])

  useUpdateMaterialColor({ color: theme === "dark" ? 0x343940 : 0xccb9ab, getMaterial });

  return getMaterial;
}

export default useGetGroundMaterial;