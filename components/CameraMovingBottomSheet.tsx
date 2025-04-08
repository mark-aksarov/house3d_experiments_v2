import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseSheetHeader from "./BaseSheetHeader";
import CameraMovingRadioGroup from "./CameraMovingRadioGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function CameraMovingBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("cameraMoving");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="camera-moving-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "cameraMoving"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="settings">
        Moving of camera
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <CameraMovingRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}