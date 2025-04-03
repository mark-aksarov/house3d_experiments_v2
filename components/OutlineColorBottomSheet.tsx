import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import OutlineColorToggleButtonGroup from "./OutlineColorToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function OutlineColorBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("outlineColor");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="outline-color-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "outlineColor"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Outline color
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <OutlineColorToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}