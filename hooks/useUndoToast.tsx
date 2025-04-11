import { useEffect, useRef } from "react";
import { useUndo } from "@/context/UndoContext";
import { useToasts } from "@/context/ToastsContext";
import useIsMobileOrTablet from "./useIsMobileOrTablet";

interface UseUndoToastProps {
  showLoadingOverlay: boolean;
}

export default function useUndoToast({
  showLoadingOverlay
}: UseUndoToastProps) {
  const { addToast, closeToast } = useToasts();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isToastShownRef = useRef(false);
  const { canUndo } = useUndo();

  useEffect(() => {
    if (!showLoadingOverlay && !isToastShownRef.current && canUndo) {
      const toastSize = isMobileOrTablet ? 'small' : 'regular';

      isToastShownRef.current = true;

      addToast({
        id: "Undo",
        title: 'Undo & Redo',
        message: "You can undo and redo your actions by pressing the Undo and Redo buttons.",
        size: toastSize
      })

      return () => closeToast("undo");
    }
  }, [addToast, closeToast, isMobileOrTablet, showLoadingOverlay, canUndo]);
}