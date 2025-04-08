import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import BaseSheetHeader from "./BaseSheetHeader";
import WallsTextureToggleButtonGroup from "./WallsTextureToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function WallsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("walls");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="walls-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "walls"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Walls
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <WallsTextureToggleButtonGroup />
      </SheetBody>
    </BottomSheet>
  )
}