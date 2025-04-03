"use client"

import classNames from "classnames";
import { ButtonHTMLAttributes, ReactElement, useId } from "react";
import styles from './ImageButton.module.scss';

export type ImageButtonSize = "large" | "small";

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ImageButtonSize;
  label: string;
  image: ReactElement;
}

export default function ImageButton({
  size,
  label,
  image,
  className,
  ...props
}: ImageButtonProps) {
  const classes = classNames(styles.imageButton, styles[size], className);

  const labelId = useId();

  return (
    <div className={styles.imageButtonWrapper}>
      <button {...props} className={classes} aria-labelledby={labelId}>
        <span className={styles.imageWrapper}>
          {image}
        </span>
      </button>
      <span id={labelId} className={styles.imageButtonLabel}>
        {label}
      </span>
    </div>
  )
}