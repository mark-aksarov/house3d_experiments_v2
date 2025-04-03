"use client"

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus
} from "@floating-ui/react";
import classNames from "classnames";
import styles from './Modal.module.scss';
import { ModalContext } from "./ModalContext";
import { HTMLAttributes, ReactNode, useId, useMemo } from "react";

export type ModalSize = "small" | "regular" | "large";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: ModalSize;
  fullscreen?: boolean;
  children: ReactNode;
}

export default function Modal({
  open,
  onOpenChange,
  size = "regular",
  fullscreen = false,
  children,
  ...props
}: ModalProps) {
  const { refs, context } = useFloating({
    open,
    onOpenChange
  });

  const { isMounted, status } = useTransitionStatus(context);

  const click = useClick(context);
  const role = useRole(context, { role: "dialog" });
  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([
    click,
    role,
    dismiss
  ]);

  const classes = classNames(
    styles.modal,
    styles[size],
    {
      [styles.fullscreen]: fullscreen
    }
  );
  const headingId = useId();

  const contextValue = useMemo(() => ({
    headingId,
    open,
    closeModal: () => onOpenChange(false)
  }), [open, onOpenChange]);

  return (
    <ModalContext.Provider value={contextValue}>
      <FloatingPortal>
        {isMounted && (
          <FloatingOverlay data-status={status} className={styles.modalOverlay} lockScroll>
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                {...getFloatingProps()}
                aria-modal="true"
                aria-labelledby={headingId}
                className={styles.modalContainer}
                {...props}
              >
                <div className={classes}>
                  {children}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal >
    </ModalContext.Provider>
  );
}