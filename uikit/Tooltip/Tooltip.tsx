"use client";

import classNames from "classnames";
import styles from './Tooltip.module.scss';
import { cloneElement, ReactElement, useRef, useState } from "react";
import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from "@floating-ui/react";

type TooltipSize = 'regular' | 'small';

interface TooltipProps {
  placement?: "top" | "bottom" | "left" | "right";
  title: string,
  size?: TooltipSize,
  open?: boolean;
  onOpen?: (open: boolean) => void;
  zIndex?: number | string;
  className?: string;
  arrowClassName?: string;
  children: ReactElement<any, any>;
}

export default function Tooltip({
  placement = "top",
  title,
  size,
  open,
  onOpen,
  zIndex,
  className,
  arrowClassName,
  children
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen || open,
    onOpenChange: (open, event, reason) => {
      if (open != undefined) {
        setIsOpen(open);
      }
      if (onOpen) {
        onOpen(open);
      }
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        padding: 5,
        element: arrowRef
      }),
      offset(8),
      shift({
        padding: 5,
      })
    ]
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 150,
    initial: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
  });

  const hover = useHover(context, { move: false, enabled: open == undefined });
  const focus = useFocus(context, { enabled: open == undefined });
  const dismiss = useDismiss(context, { enabled: open == undefined });
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  let classes;
  if (size) {
    classes = classNames(styles.tooltip, styles[size], className);
  }
  else {
    classes = classNames(styles.tooltip, className);
  }

  return (
    <>
      {cloneElement(children, { ref: refs.setReference, ...getReferenceProps() })}
      <FloatingPortal>
        {isMounted && (
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex
            }}
            {...getFloatingProps()}
            className={styles.tooltipContainer}
          >
            <div style={{ ...transitionStyles }}>
              <div className={classes}>
                {title}
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  tipRadius={2}
                  fill="var(--color-surface-tertiary)"
                  className={arrowClassName}
                />
              </div>
            </div>
          </div>
        )}
      </FloatingPortal >
    </>
  )
}