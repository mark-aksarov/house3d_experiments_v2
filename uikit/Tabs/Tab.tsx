"use client"

import classNames from 'classnames';
import Typography from '../Typography';
import styles from './Tabs.module.scss';
import { useTabs } from './TabsContext';
import React, { ButtonHTMLAttributes, MouseEvent, ReactElement } from "react";

type TabSize = "large" | "regular" | "small";

interface TabsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string,
  size?: TabSize,
  icon?: ReactElement
  label: string
}

export default function Tab({
  id,
  size = "regular",
  icon,
  label,
  onClick,
  ...props
}: TabsProps) {
  const { value: activeId, onChange } = useTabs();
  const isActive = activeId === id;

  const classes = classNames(
    styles.tab,
    styles[size],
    {
      "active": isActive
    }
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onChange(id);
  };

  return (
    <button
      {...props}
      id={id}
      role="tab"
      aria-selected={isActive}
      className={classes}
      onClick={handleClick}
    >
      {
        icon && <>
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
        </>
      }
      <Typography
        variant={size === "large" ? "body2" : size === "regular" ? "body3" : "body4"}
        className={styles.tabLabel}
      >
        {label}
      </Typography>
    </button>
  )
}