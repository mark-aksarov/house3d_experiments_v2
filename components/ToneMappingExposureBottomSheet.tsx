import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseSheetHeader from "./BaseSheetHeader";
import ToneMappingExposureRangeInput from "./ToneMappingExposureRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function ToneMappingExposureBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("toneMappingExposure");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="tone-mapping-exposure-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "toneMappingExposure"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="settings">
        Tone mapping exposure
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <ToneMappingExposureRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}