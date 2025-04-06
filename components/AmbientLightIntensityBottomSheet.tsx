import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import AmbientLightIntensityRangeInput from "./AmbientLightIntensityRangeInput";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function AmbientLightIntensityBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("ambientLightIntensity");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="ambient-light-intensity-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "ambientLightIntensity"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="settings">
        Ambient light intensity
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <AmbientLightIntensityRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}