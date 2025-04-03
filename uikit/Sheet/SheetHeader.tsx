"use client"

import classNames from "classnames";
import { XIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import IconButton from "../IconButton";
import Typography from "../Typography";
import { ButtonSize } from "../Button";
import styles from './Sheet.module.scss';
import { useSheet } from "./SheetContext";
import { TypographyVariant } from "@/uikit/Typography/Typography";

export interface SheetHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  titleVariant?: TypographyVariant;
  closeButtonSize?: ButtonSize;
}

export default function SheetHeader({
  className,
  titleVariant = "header4",
  closeButtonSize = "regular",
  children,
  ...props
}: SheetHeaderProps) {
  const { close, headingId } = useSheet();

  const classes = classNames(styles.sheetHeader, className);
  const closeButtonClasses = classNames(styles.sheetCloseButton, styles[closeButtonSize]);

  return (
    <div {...props} className={classes}>
      <Typography id={headingId} variant={titleVariant}>
        {children}
      </Typography>

      <IconButton
        size={closeButtonSize}
        variant="ghost"
        color="brand"
        onClick={close}
        className={closeButtonClasses}
        icon={<XIcon />}
        aria-label="Close"
      />
    </div >
  );
}