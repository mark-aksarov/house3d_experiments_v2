"use client"

import SheetHeader, { SheetHeaderProps } from "@/uikit/Sheet/SheetHeader";
import { useCloseSideSheet, useOpenedSideSheetName, useOpenSideSheet } from "@/context/SideSheetsContext";
import { useCloseBottomSheet, useOpenedBottomSheetName, useOpenBottomSheet } from "@/context/BottomSheetsContext";

interface BaseSheetHeaderProps extends SheetHeaderProps {
  prevSheetName?: string;
}

export default function BaseSheetHeader({
  prevSheetName,
  closeButtonSize = "regular",
  children,
  ...props
}: BaseSheetHeaderProps) {
  const sideSheetName = useOpenedSideSheetName();
  const sideCloseSheet = useCloseSideSheet();
  const sideOpenSheet = useOpenSideSheet();

  const bottomSheetName = useOpenedBottomSheetName();
  const bottomCloseSheet = useCloseBottomSheet();
  const bottomOpenSheet = useOpenBottomSheet();

  function openPrevSheet() {
    if (prevSheetName) {
      if (bottomSheetName) {
        bottomCloseSheet(bottomSheetName);
        bottomOpenSheet(prevSheetName);
      }
      else if (sideSheetName) {
        sideCloseSheet(sideSheetName);
        sideOpenSheet(prevSheetName);
      }
    }
  }

  return (
    <SheetHeader
      onBackButtonClick={prevSheetName ? openPrevSheet : undefined}
      closeButtonSize={closeButtonSize}
      {...props}
    >
      {children}
    </SheetHeader>
  );
}