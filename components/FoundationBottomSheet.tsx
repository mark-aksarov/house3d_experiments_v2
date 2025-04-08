import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import FoundationTextureToggleButtonGroup from "./FoundationTextureToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function FoundationBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("foundation");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="foundation-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "foundation"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Foundation
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <FoundationTextureToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}