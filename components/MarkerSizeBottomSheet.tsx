import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import MarkerSizeRadioGroup from "./MarkerSizeRadioGroup";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function MarkerSizeBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("markerSize");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="marker-size-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "markerSize"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="appearance">
        Marker size
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <MarkerSizeRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}