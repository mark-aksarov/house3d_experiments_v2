import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import RoomViewpointToggleButtonGroup from "./ViewpointToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function ViewpointBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("viewpoint");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="viewpoint-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "viewpoint"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader>
        Viewpoint
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <RoomViewpointToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}