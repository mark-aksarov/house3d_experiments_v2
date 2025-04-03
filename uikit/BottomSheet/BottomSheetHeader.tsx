"use client"

import Stack from "@/uikit/Stack";
import classNames from "classnames";
import { MouseEventHandler } from "react";
import IconButton from "@/uikit/IconButton";
import { ArrowLeftIcon } from "lucide-react";
import styles from './BottomSheet.module.scss';
import SheetHeader, { SheetHeaderProps } from "@/uikit/Sheet/SheetHeader";

interface BottomSheetHeaderProps extends SheetHeaderProps {
  onBackButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export default function BottomSheetHeader({
  onBackButtonClick,
  closeButtonSize = "regular",
  children,
  ...props
}: BottomSheetHeaderProps) {
  const prevButtonClasses = classNames(styles.prevSheetButton, styles[closeButtonSize]);

  let content;

  if (onBackButtonClick) {
    content = <Stack alignItems="center" spacing={3}>
      <IconButton
        size={closeButtonSize}
        variant="ghost"
        color="brand"
        onClick={onBackButtonClick}
        className={prevButtonClasses}
        icon={<ArrowLeftIcon />}
        aria-label="Back button"
      />
      {children}
    </Stack>
  }
  else {
    content = children
  }

  return (
    <SheetHeader closeButtonSize={closeButtonSize} {...props}>
      {content}
    </SheetHeader>
  );
}