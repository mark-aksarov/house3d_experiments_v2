import { useMemo } from "react";
import useIsMobile from "./useIsMobile";
import useIsTablet from "./useIsTablet";
import useIsLaptop from "./useIsLaptop";

export function useCameraFovRange() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();

  return useMemo(
    () => {
      if (isMobile) {
        return [70, 90];
      }
      else if (isTablet) {
        return [70, 80];
      }
      else if (isLaptop) {
        return [50, 80];
      }

      return [40, 70];
    },
    [isMobile, isTablet, isLaptop]
  );
}