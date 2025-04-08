import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "./AppBottomToolBar";
import ToneMappingRadioGroup from "./ToneMappingRadioGroup";
import BaseSheetHeader from "./BaseSheetHeader";
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
      <BaseSheetHeader prevSheetName="settings">
        Tone mapping
      </BaseSheetHeader>

      <Divider />

      <SheetBody>
        <ToneMappingRadioGroup />
      </SheetBody>
    </BottomSheet>
  )
}