"use client"

import React, { ReactElement } from "react";
import { useListItem } from "./ListItemContext";

interface ListItemProps {
  children: ReactElement<any, any>;
}

export default function ListItemIcon({ children }: ListItemProps) {
  const { size } = useListItem();

  return (
    <div>
      {children.props.size
        ? children
        : React.cloneElement(children, {
          size: size === "large" ? 22 : size === "regular" ? 20 : 18,
          strokeWidth: 1.75,
        })}
    </div>
  );
}