"use client"

import classNames from "classnames";
import Typography from "@/uikit/Typography";
import styles from './ListGroup.module.scss';
import React, { ComponentPropsWithoutRef } from "react";
import { useListItem } from "./ListItemContext";

export interface ListItemTextProps extends ComponentPropsWithoutRef<"span"> { };

export default function ListItemText({
  children,
  className,
  ...props
}: ListItemTextProps) {
  const { size } = useListItem();

  const classes = classNames(
    styles.listItemText,
    className,
  );

  return (
    <Typography
      {...props}
      className={classes}
      as="span"
      variant={size === "large" ? "body2" : size === "regular" ? "body3" : "body4"}
    >
      {children}
    </Typography>
  )
}