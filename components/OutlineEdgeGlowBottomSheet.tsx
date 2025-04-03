import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import OutlineEdgeGlowRangeInput from "./OutlineEdgeGlowRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function OutlineEdgeGlowBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("outlineEdgeGlow");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="outline-edge-glow-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "outlineEdgeGlow"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Outline edge glow
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <OutlineEdgeGlowRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}