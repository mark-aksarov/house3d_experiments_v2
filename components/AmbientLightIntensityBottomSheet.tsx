import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import BaseSheetHeaderProps from "./BaseSheetHeader";
import { useAppBottomToolBar } from "./AppBottomToolBar";
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
      <BaseSheetHeaderProps prevSheetName="settings">
        Ambient light intensity
      </BaseSheetHeaderProps>

      <Divider />

      <SheetBody>
        <AmbientLightIntensityRangeInput />
      </SheetBody>
    </BottomSheet>
  )
}