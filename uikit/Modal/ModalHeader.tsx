"use client"

import classNames from "classnames";
import { XIcon } from "lucide-react";
import IconButton from "../IconButton";
import { HTMLAttributes } from "react";
import Typography from "../Typography";
import styles from './Modal.module.scss';
import { useModal } from "./ModalContext";
import { ButtonSize } from "@/uikit/Button";
import { TypographyVariant } from "@/uikit/Typography/Typography";

export interface SheetHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  titleVariant?: TypographyVariant;
  closeButtonSize?: ButtonSize;
}

export default function ModalHeader({
  className,
  titleVariant = "header3",
  closeButtonSize = "regular",
  children,
  ...props
}: SheetHeaderProps) {
  const { closeModal, headingId } = useModal();

  const classes = classNames(styles.modalHeader, className);
  const closeButtonClasses = classNames(styles.modalCloseButton, styles[closeButtonSize]);

  return (
    <div {...props} className={classes}>
      <Typography as="h3" id={headingId} variant={titleVariant}>
        {children}
      </Typography>

      <IconButton
        size={closeButtonSize}
        variant="ghost"
        color="brand"
        onClick={closeModal}
        className={closeButtonClasses}
        icon={<XIcon />}
        aria-label="Close"
      />
    </div>
  );
}