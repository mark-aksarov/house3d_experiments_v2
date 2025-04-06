import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
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
      <BaseBottomSheetHeader prevSheetName="houseElements">
        Fence
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <FenceColorToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}