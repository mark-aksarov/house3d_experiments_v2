"use client"

import classNames from "classnames";
import styles from './Sheet.module.scss';
import { ComponentPropsWithoutRef, useRef } from "react";

export default function SheetBody({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  const classes = classNames(styles.sheetBody, className);

  return (
    <div
      {...props}
      ref={ref}
      className={classes}
    >
      {children}
    </div>
  );
}