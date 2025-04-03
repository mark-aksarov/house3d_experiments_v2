"use client"

import classNames from 'classnames';
import { useToggleButtonGroup } from './ToggleButtonGroupContext';
import React, { ComponentPropsWithoutRef, ElementType, MouseEvent, MouseEventHandler, ReactNode } from 'react';

type ToggleButtonProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T,
  value?: string | number,
  className?: string,
  children?: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function ToggleButton<T extends ElementType>({
  as,
  value,
  className,
  children,
  onClick,
  ...props
}: ToggleButtonProps<T>) {
  const Component = as || "button";

  const { selectedValue, changeSelectedValue } = useToggleButtonGroup();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (changeSelectedValue) {
      changeSelectedValue(value)
    }
  }

  const classes = classNames(className, {
    "active": selectedValue === value
  });

  return (
    <Component
      {...props}
      className={classes}
      value={value}
      onClick={handleClick}
    >
      {children}
    </Component>
  )
}