import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import ToneMappingRadioGroup from "./ToneMappingRadioGroup";
import BaseBottomSheetHeader from "./BaseBottomSheetHeader";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function ToneMappingBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("toneMapping");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="tone-mapping-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "toneMapping"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader prevSheetName="settings">
        Tone mapping
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody>
        <ToneMappingRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}