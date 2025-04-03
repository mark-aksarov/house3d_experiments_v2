import { useEffect } from "react";
import { Mesh, PlaneGeometry } from "three";
import { useThree } from "@/context/ThreeContext";
import { disposeObject } from "@/utils/disposeResources";
import useGetGroundMaterial from "./useGetGroundMaterial";

export default function useGround() {
  const { getScene, render } = useThree();
  const getMaterial = useGetGroundMaterial();

  useEffect(() => {
    const scene = getScene();
    const geometry = new PlaneGeometry(100, 100);
    const material = getMaterial();

    const ground = new Mesh(geometry, material);
    ground.receiveShadow = true;
    ground.rotateX(-Math.PI / 2);
    scene.add(ground);
    render();

    //object is removed and disposed
    return () => {
      scene.remove(ground);
      disposeObject(ground);
      render();
    }
  }, [getMaterial]);
}