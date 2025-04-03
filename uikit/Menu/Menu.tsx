"use client"

import {
  arrow,
  autoUpdate,
  flip,
  offset,
  OffsetOptions,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
  useTransitionStyles
} from "@floating-ui/react";
import MenuContext from "./MenuContext";
import { ReactNode, useMemo, useRef, useState } from "react";

interface MenuProps {
  zIndex?: number;
  children: ReactNode;
  offsetOptions?: OffsetOptions;
}

export default function Menu({
  zIndex,
  children,
  offsetOptions
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const data = useFloating({
    open: isOpen,
    placement: "bottom-end",
    onOpenChange: setIsOpen,
    middleware: [
      arrow({
        element: arrowRef
      }),
      offset(offsetOptions || 8),
      flip({
        fallbackAxisSideDirection: "end"
      }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const transition = useTransitionStyles(data.context, {
    duration: 150,
    initial: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
  });

  const click = useClick(data.context);
  const focus = useFocus(data.context);
  const role = useRole(data.context, { role: "menu" });
  const dismiss = useDismiss(data.context);

  const interactions = useInteractions([
    click,
    focus,
    role,
    dismiss,
  ]);

  const contextValue = useMemo(() => ({
    zIndex,
    interactions,
    data,
    transition,
    closeMenu: () => setIsOpen(false),
  }), [interactions, data, transition]);

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
}