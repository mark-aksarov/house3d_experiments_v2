"use client"

import classNames from 'classnames';
import styles from './IconButton.module.scss';
import Button, { ButtonProps } from '../Button';
import React, { forwardRef, ReactElement } from 'react';

export interface IconButtonProps extends ButtonProps {
  icon: ReactElement,
  rounded?: boolean,
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
  rounded = true,
  size = "regular",
  className,
  icon,
  ...props
}, ref) {
  const classes = classNames(
    styles.iconButton,
    className,
    styles[size],
    {
      [styles.rounded]: rounded
    }
  );

  return (
    <Button
      ref={ref}
      {...props}
      size={size}
      className={classes}
    >
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
    </Button>
  )
});

export default IconButton;
