import { useEffect } from "react";
import useIsMobileOrTablet from "./useIsMobileOrTablet";
import { ModelName, useModels, useModelsDispatch } from "@/context/ModelsContext";

export default function useUpdateHouseModel() {
  const isMobileOrTablet = useIsMobileOrTablet();
  const dispatch = useModelsDispatch();
  const { selectedModelName } = useModels();

  useEffect(() => {
    let newModelName: ModelName;

    if (isMobileOrTablet) {
      newModelName = 'House2';
    }
    else {
      newModelName = 'House1';
    }

    dispatch({ type: 'selectedModelNameChanged', modelName: newModelName });
  }, [isMobileOrTablet, selectedModelName])
}