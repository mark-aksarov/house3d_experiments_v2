import { useEffect, useRef } from "react";
import { useToasts } from "@/context/ToastsContext";
import useIsMobileOrTablet from "./useIsMobileOrTablet";

interface UseWelcomeToastProps {
  showLoadingOverlay: boolean;
}

export default function useWelcomeToast({
  showLoadingOverlay
}: UseWelcomeToastProps) {
  const { addToast, closeToast } = useToasts();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isWelcomeToastShownRef = useRef(false);

  useEffect(() => {
    if (!showLoadingOverlay && !isWelcomeToastShownRef.current) {
      const toastSize = isMobileOrTablet ? 'small' : 'regular';

      const timeoutId = setTimeout(
        () => {
          isWelcomeToastShownRef.current = true;

          addToast({
            id: "welcome",
            title: 'Welcome',
            message: "Welcome to House3D. Pass the guide to explore the main app features.",
            size: toastSize
          })
        },
        1000
      );

      return () => {
        closeToast("welcome");
        clearTimeout(timeoutId);
      }
    }
  }, [addToast, closeToast, isMobileOrTablet, showLoadingOverlay]);
}