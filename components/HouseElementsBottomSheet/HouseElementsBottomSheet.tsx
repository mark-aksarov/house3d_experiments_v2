import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import { BottomSheet } from "@/uikit/BottomSheet";
import { useAppBottomToolBar } from "../AppBottomToolBar";
import styles from './HouseElementsBottomSheet.module.scss';
import BaseBottomSheetHeader from "../BaseBottomSheetHeader";
import HouseElementsListGroup from "../HouseElementsListGroup";
import { useOpenedBottomSheetName } from "@/context/BottomSheetsContext";
import { useCloseBottomSheet, useOpenBottomSheet } from "@/context/BottomSheetsContext";

export default function HouseElementsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const openSheet = useOpenBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();

  function handleClose() {
    closeSheet("houseElements");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="house-elements-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "houseElements"}
      onClose={handleClose}
    >
      <BaseBottomSheetHeader>
        House elements
      </BaseBottomSheetHeader>

      <Divider />

      <SheetBody className={styles.sheetBody}>
        <HouseElementsListGroup
          closeSheet={closeSheet}
          openSheet={openSheet}
        />
      </SheetBody>
    </BottomSheet>
  )
}