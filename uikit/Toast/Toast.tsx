"use client"

import classNames from "classnames";
import styles from './Toast.module.scss';
import { ToastContext } from "./ToastContext";
import { Toast as ToastType } from './ToastsContext';
import { CSSTransition } from "react-transition-group";
import { HTMLAttributes, ReactNode, useMemo, useRef } from "react";

export const toastTransitionDuration = 500;

export type ToastSize = "regular" | "small";
export type ToastColor = 'default' | 'success' | 'danger';

interface ToastProps extends Omit<ToastType, "id" | "title" | "message">, Omit<HTMLAttributes<HTMLDivElement>, "color" | "title"> {
  onClose: () => void,
  autoCloseDuration?: number,
  children?: ReactNode;
}

export default function Toast({
  open,
  onClose,
  autoCloseDuration,
  color = "default",
  size = "regular",
  children,
  ...props
}: ToastProps) {
  const ref = useRef(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const classes = classNames(styles.toast, styles[color], styles[size]);

  const contextValue = useMemo(() => ({
    size,
    color,
    onClose
  }), [size, color, onClose]);

  return (
    <CSSTransition
      appear={true}
      mountOnEnter={true}
      in={open}
      nodeRef={ref}
      timeout={toastTransitionDuration}
      classNames={{
        appear: styles.toastAppear,
        appearActive: styles.toastAppearActive,
        enter: styles.toastEnter,
        enterActive: styles.toastEnterActive,
        exit: styles.toastExit,
        exitActive: styles.toastExitActive,
      }}
      onEnter={() => {
        if (onClose && (autoCloseDuration || autoCloseDuration === 0)) {
          closeTimerRef.current = setTimeout(() => {
            onClose();
          }, autoCloseDuration)
        }
      }}
      onExited={() => {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
        }
      }}
      unmountOnExit
    >
      <div
        {...props}
        ref={ref}
        role="alert"
        className={classes}
      >
        <ToastContext.Provider value={contextValue}>
          {children}
        </ToastContext.Provider>
      </div>
    </CSSTransition>
  );
}