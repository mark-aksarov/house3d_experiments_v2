import classNames from 'classnames';
import { createPortal } from 'react-dom';
import styles from './Sheet.module.scss';
import { SheetContext } from "./SheetContext";
import useOnClickOutside from "../useOnClickOutside";
import { CSSTransition } from "react-transition-group";
import FocusTrap, { FocusTrapProps } from "../FocusTrap";
import { HTMLAttributes, useEffect, useId, useMemo, useRef } from "react";

export const sheetTransitionDuration = 500;

interface SheetProps extends HTMLAttributes<HTMLDivElement>, FocusTrapProps {
  open: boolean;
  className?: string
  transitionClassNames?: {
    appear: string,
    appearActive: string,
    enter: string,
    enterActive: string,
    exit: string,
    exitActive: string,
  }
  onClose: () => void;
}

export default function Sheet({
  autoFocus = true,
  restoreFocus = true,
  open,
  className,
  transitionClassNames,
  onClose,
  children,
  ...props
}: SheetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const headingId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose])

  useOnClickOutside({ ref, callback: onClose });

  const contextValue = useMemo(() => ({
    containerRef: ref,
    headingId,
    open,
    close: onClose
  }), [open, onClose]);

  const classes = classNames(styles.sheet, className);

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <CSSTransition
      appear={true}
      mountOnEnter={true}
      in={open}
      nodeRef={ref}
      timeout={sheetTransitionDuration}
      classNames={transitionClassNames || {
        appear: styles.sheetAppear,
        appearActive: styles.sheetAppearActive,
        enter: styles.sheetEnter,
        enterActive: styles.sheetEnterActive,
        exit: styles.sheetExit,
        exitActive: styles.sheetExitActive,
      }}
      unmountOnExit
    >
      <SheetContext.Provider value={contextValue}>
        <FocusTrap autoFocus={autoFocus} restoreFocus={restoreFocus}>
          <div
            {...props}
            ref={ref}
            className={classes}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
          >
            {children}
          </div>
        </FocusTrap>
      </SheetContext.Provider>
    </CSSTransition>,
    document.body
  );
}