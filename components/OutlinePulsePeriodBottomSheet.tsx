import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import OutlinePulsePeriodRangeInput from "./OutlinePulsePeriodRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function OutlinePulsePeriodBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("outlinePulsePeriod");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="outline-pulse-period-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "outlinePulsePeriod"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Outline pulse period
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <OutlinePulsePeriodRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}