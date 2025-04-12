"use client"

import classNames from 'classnames';
import styles from './MarkerButton.module.scss';
import React, { ButtonHTMLAttributes, ElementType, forwardRef } from 'react';

export type MarkerButtonSize = "large" | "regular" | "small";
export type MarkerButtonColor = "brand" | "neutral" | "danger" | "success";

export interface MarkerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType,
  href?: string | undefined;
  target?: string | undefined;
  size?: MarkerButtonSize;
  color?: MarkerButtonColor;
}

const MarkerButton = forwardRef<HTMLButtonElement, MarkerButtonProps>(function Button({
  as: Component = "button",
  href,
  size = "regular",
  color = "brand",
  onClick,
  className,
  children,
  ...props
}, ref) {
  const classes = classNames(
    styles.markerButton,
    className,
    styles[size],
    styles[color]
  );

  return (
    <Component
      {...props}
      ref={ref}
      onClick={onClick}
      href={href}
      className={classes}
    >
      {children}
    </Component>
  )
});

export default MarkerButton;