import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import MarkerSizeRadioGroup from "./MarkerSizeRadioGroup";
import BaseSheetHeader from "./BaseSheetHeader";
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
      <BaseSheetHeader prevSheetName="appearance">
        Marker size
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <MarkerSizeRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}