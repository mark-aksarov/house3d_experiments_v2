import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import RoofCoverTextureToggleButtonGroup from "./RoofCoverTextureToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function RoofBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("roof");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="roof-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "roof"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Roof
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <RoofCoverTextureToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}