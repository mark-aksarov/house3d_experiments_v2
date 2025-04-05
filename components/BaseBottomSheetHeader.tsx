"use client"

import { SheetHeaderProps } from "@/uikit/Sheet/SheetHeader";
import BottomSheetHeader from "@/uikit/BottomSheet/BottomSheetHeader";
import { useCloseBottomSheet, useOpenedBottomSheetName, useOpenBottomSheet } from "@/context/BottomSheetsContext";

interface BottomSheetHeaderProps extends SheetHeaderProps {
  prevSheetName?: string;
}

export default function BaseBottomSheetHeader({
  prevSheetName,
  closeButtonSize = "regular",
  children,
  ...props
}: BottomSheetHeaderProps) {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const openSheet = useOpenBottomSheet();

  function openPrevSheet() {
    if (sheetName && prevSheetName) {
      closeSheet(sheetName);
      openSheet(prevSheetName);
    }
  }

  return (
    <BottomSheetHeader
      onBackButtonClick={prevSheetName ? openPrevSheet : undefined}
      closeButtonSize={closeButtonSize}
      {...props}
    >
      {children}
    </BottomSheetHeader>
  );
}