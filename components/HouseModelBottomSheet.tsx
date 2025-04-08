import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseSheetHeader from "./BaseSheetHeader";
import HouseModelToggleButtonGroup from "./HouseModelToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function HouseModelBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("houseModel");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="house-model-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "houseModel"}
      onClose={handleClose}
    >
      <BaseSheetHeader>
        House model
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <HouseModelToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}