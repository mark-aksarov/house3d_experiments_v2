import { Mesh } from "three";
import { useEffect, useState } from "react";
import { useThree } from "@/context/ThreeContext";
import { disposeObject } from "@/utils/disposeResources";
import { ModelName, useModels } from "@/context/ModelsContext";

const useHouse = ({
  modelName
}: {
  modelName: ModelName
}) => {
  const [houseIsInScene, setHouseIsInScene] = useState(false);
  const { models, status } = useModels();
  const { getScene, render } = useThree();

  useEffect(() => {
    if (status === "success") {
      const scene = getScene();
      const model = models![modelName];

      model.traverse(object => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      scene.add(model);
      render();
      setHouseIsInScene(true);

      return () => {
        scene.remove(model);
        disposeObject(model);
        setHouseIsInScene(false);
      }
    }
  }, [models, status, render, modelName]);

  return { houseIsInScene };
}

export default useHouse;