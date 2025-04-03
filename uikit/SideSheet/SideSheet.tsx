import { Sheet } from "../Sheet";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import styles from './SideSheet.module.scss';
import { FocusTrapProps } from "../FocusTrap";

export interface SideSheetProps extends HTMLAttributes<HTMLDivElement>, FocusTrapProps {
  open: boolean;
  transitionClassNames?: {
    appear: string,
    appearActive: string,
    enter: string,
    enterActive: string,
    exit: string,
    exitActive: string,
  };
  onClose: () => void;
}

export default function SideSheet({
  transitionClassNames,
  children,
  className,
  ...props
}: SideSheetProps) {
  const classes = classNames(styles.sideSheet, className);

  return (
    <Sheet
      {...props}
      className={classes}
      transitionClassNames={transitionClassNames || {
        appear: styles.sideSheetAppear,
        appearActive: styles.sideSheetAppearActive,
        enter: styles.sideSheetEnter,
        enterActive: styles.sideSheetEnterActive,
        exit: styles.sideSheetExit,
        exitActive: styles.sideSheetExitActive
      }}
    >
      {children}
    </Sheet>
  );
}