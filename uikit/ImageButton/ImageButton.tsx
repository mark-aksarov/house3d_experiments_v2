"use client"

import classNames from "classnames";
import styles from './ImageButton.module.scss';
import { ButtonHTMLAttributes, ReactElement, useId } from "react";

export type ImageButtonSize = "large" | "small";

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ImageButtonSize;
  label: string;
  image: ReactElement;
  imageWrapperClassName?: string
}

export default function ImageButton({
  size,
  label,
  image,
  className,
  imageWrapperClassName,
  ...props
}: ImageButtonProps) {
  const classes = classNames(styles.imageButton, styles[size], className);
  const imageWrapperClasses = classNames(styles.imageWrapper, imageWrapperClassName);

  const labelId = useId();

  return (
    <div className={styles.imageButtonWrapper}>
      <button {...props} className={classes} aria-labelledby={labelId}>
        <span className={imageWrapperClasses}>
          {image}
        </span>
      </button>
      <span id={labelId} className={styles.imageButtonLabel}>
        {label}
      </span>
    </div>
  )
}