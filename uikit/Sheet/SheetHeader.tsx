"use client"

import Stack from "../Stack";
import classNames from "classnames";
import IconButton from "../IconButton";
import Typography from "../Typography";
import { ButtonSize } from "../Button";
import styles from './Sheet.module.scss';
import { useSheet } from "./SheetContext";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import { HTMLAttributes, MouseEventHandler } from "react";
import { TypographyVariant } from "@/uikit/Typography/Typography";

export interface SheetHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  titleVariant?: TypographyVariant;
  closeButtonSize?: ButtonSize;
  onBackButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function SheetHeader({
  className,
  titleVariant = "header4",
  closeButtonSize = "regular",
  onBackButtonClick,
  children,
  ...props
}: SheetHeaderProps) {
  const { close, headingId } = useSheet();

  const classes = classNames(styles.sheetHeader, className);
  const closeButtonClasses = classNames(styles.sheetCloseButton, styles[closeButtonSize]);
  const prevButtonClasses = classNames(styles.prevSheetButton, styles[closeButtonSize]);

  return (
    <div {...props} className={classes}>
      <Stack alignItems="center" spacing={3}>
        {
          onBackButtonClick &&
          <IconButton
            size={closeButtonSize}
            variant="ghost"
            color="brand"
            onClick={onBackButtonClick}
            className={prevButtonClasses}
            icon={<ArrowLeftIcon />}
            aria-label="Back button"
          />
        }

        <Typography id={headingId} variant={titleVariant}>
          {children}
        </Typography>
      </Stack>

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