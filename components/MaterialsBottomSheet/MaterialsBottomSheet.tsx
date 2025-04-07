import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import MaterialsListGroup from "../MaterialsListGroup";
import styles from './MaterialsBottomSheet.module.scss';
import { useAppBottomToolBar } from "../AppBottomToolBar";
import BaseBottomSheetHeader from "../BaseBottomSheetHeader";
import { useOpenedBottomSheetName } from "@/context/BottomSheetsContext";
import { useCloseBottomSheet, useOpenBottomSheet } from "@/context/BottomSheetsContext";

export default function MaterialsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const openSheet = useOpenBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("materials");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="materials-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "materials"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader>
        Materials
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody className={styles.sheetBody}>
        <MaterialsListGroup
          closeSheet={closeSheet}
          openSheet={openSheet}
        />
      </SheetBody>
    </BottomSheet>
  )
}