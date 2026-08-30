"use client"

import classNames from 'classnames';
import styles from './Button.module.scss';
import React, { ButtonHTMLAttributes, ElementType, forwardRef, ReactElement } from 'react';

export type ButtonSize = "large" | "regular" | "small";
export type ButtonVariant = "solid" | "outlined" | "ghost";
export type ButtonColor = "brand" | "neutral" | "danger" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType,
  href?: string | undefined;
  target?: string | undefined;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  iconStart?: ReactElement<any, any>;
  iconEnd?: ReactElement<any, any>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  as: Component = "button",
  href,
  size = "regular",
  variant = "solid",
  color = "brand",
  iconStart,
  iconEnd,
  onClick,
  className,
  children,
  ...props
}, ref) {
  const classes = classNames(
    styles.button,
    className,
    styles[size],
    styles[variant],
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
      {
        iconStart &&
        (
          iconStart.props.size
            ? iconStart
            : React.cloneElement(
              iconStart,
              {
                size: size === "large" ? 22 : size === "regular" ? 20 : 18,
                strokeWidth: 1.75
              }
            )
        )
      }
      {children}
      {
        iconEnd &&
        (
          iconEnd.props.size
            ? iconEnd
            : React.cloneElement(
              iconEnd,
              {
                size: size === "large" ? 22 : size === "regular" ? 20 : 18,
                strokeWidth: 1.75
              }
            )
        )
      }
    </Component>
  )
});

export default Button;
