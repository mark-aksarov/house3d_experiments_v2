import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import FenceColorToggleButtonGroup from "./FenceColorToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function FenceBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("fence");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="fence-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "fence"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Fence
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <FenceColorToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}