import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import CameraFovRangeInput from "./CameraFovRangeInput";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseSheetHeader from "./BaseSheetHeader";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function CameraFovBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("cameraFov");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="camera-fov-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "cameraFov"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="settings">
        Camera field of view
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <CameraFovRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}