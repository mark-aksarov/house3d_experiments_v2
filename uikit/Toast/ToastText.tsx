import classNames from "classnames";
import styles from './Toast.module.scss';
import Typography from "@/uikit/Typography";
import React, { ComponentPropsWithoutRef } from "react";

interface ToastTextProps extends ComponentPropsWithoutRef<"span"> { };

export default function ToastText({
  children,
  className,
  ...props
}: ToastTextProps) {
  const classes = classNames(
    styles.toastText,
    className,
  );

  return (
    <Typography
      {...props}
      className={classes}
      as="span"
      variant="body3"
    >
      {children}
    </Typography>
  )
}