import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import ShadowsResolutionRadioGroup from "./ShadowsResolutionRadioGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function ShadowsResolutionBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("shadowsResolution");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="shadows-resolution-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "shadowsResolution"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="settings">
        Shadows resolution
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <ShadowsResolutionRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}