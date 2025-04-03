import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import OutlineEdgeThicknessRangeInput from "./OutlineEdgeThicknessRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function OutlineEdgeThicknessBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("outlineEdgeThickness");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="outline-edge-thickness-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "outlineEdgeThickness"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Outline edge thickness
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <OutlineEdgeThicknessRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}