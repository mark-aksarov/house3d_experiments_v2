import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import OutlineEdgeStrengthRangeInput from "./OutlineEdgeStrengthRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function OutlineEdgeStrengthBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("outlineEdgeStrength");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="outline-edge-strength-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "outlineEdgeStrength"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Outline edge strength
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <OutlineEdgeStrengthRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}