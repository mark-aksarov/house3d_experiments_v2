"use client"

import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useMenuContext } from './MenuContext';
import React, { ComponentPropsWithRef, ElementType, MouseEvent, ReactElement, ReactNode } from "react";

type MenuItemButtonSize = "large" | "regular" | "small";

type MenuItemButtonProps<T extends ElementType> = ComponentPropsWithRef<T> & {
  as?: T,
  size?: MenuItemButtonSize,
  icon?: ReactElement<any, any>;
  disabled?: boolean;
  closeMenuOnClick?: boolean;
  children: ReactNode
}

function MenuItemButton<T extends ElementType = "button">({
  size = "regular",
  as,
  icon,
  disabled,
  closeMenuOnClick = true,
  onClick,
  children,
  ref,
  ...props
}: MenuItemButtonProps<T>) {
  const { closeMenu } = useMenuContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (closeMenuOnClick) {
      closeMenu();
    }
    onClick?.(e);
  }

  const classes = classNames(styles.menuItemButton, styles[size]);

  const Component = as || "button";

  return (
    <Component
      {...props}
      className={classes}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
      {icon && <div>
        {
          icon.props.size
            ? icon
            : React.cloneElement(
              icon,
              {
                size: size === "large" ? 22 : size === "regular" ? 20 : 18,
                strokeWidth: 1.75
              }
            )
        }
      </div>}
    </Component>
  )
}

export default MenuItemButton;