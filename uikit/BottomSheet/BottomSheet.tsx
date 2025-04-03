import { Sheet } from "../Sheet";
import { HTMLAttributes } from "react";
import { FocusTrapProps } from "../FocusTrap";
import styles from './BottomSheet.module.scss';

interface BottomSheetProps extends HTMLAttributes<HTMLDivElement>, FocusTrapProps {
  open: boolean;
  onClose: () => void;
}

export default function BottomSheet({
  children,
  ...props
}: BottomSheetProps) {
  return (
    <Sheet
      {...props}
      className={styles.bottomSheet}
      transitionClassNames={{
        appear: styles.bottomSheetAppear,
        appearActive: styles.bottomSheetAppearActive,
        enter: styles.bottomSheetEnter,
        enterActive: styles.bottomSheetEnterActive,
        exit: styles.bottomSheetExit,
        exitActive: styles.bottomSheetExitActive
      }}
    >
      {children}
    </Sheet>
  );
}