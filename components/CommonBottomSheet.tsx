import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import CommonColorToggleButtonGroup from "./CommonColorToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function CommonBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("common");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="common-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "common"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Common
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <CommonColorToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}