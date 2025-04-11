import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import DoorsColorToggleButtonGroup from "./DoorsColorToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function DoorsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("doors");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="doors-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "doors"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Doors
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <DoorsColorToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}