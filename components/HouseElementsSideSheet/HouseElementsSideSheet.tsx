import Divider from "@/uikit/Divider";
import { SheetHeader } from "@/uikit/Sheet";
import { useAppSideToolBar } from "../AppSideToolBar";
import styles from './HouseElementsSideSheet.module.scss';
import HouseElementsListGroup from "../HouseElementsListGroup";
import BaseSideSheet, { BaseSideSheetBody } from "../BaseSideSheet";
import { useCloseSideSheet, useOpenedSideSheetName, useOpenSideSheet } from "@/context/SideSheetsContext";

export default function HouseElementsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();
  const openSheet = useOpenSideSheet();

  function handleClose() {
    closeSheet("houseElements");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="house-elements-side-sheet"
      restoreFocus={false}
      open={sheetName === "houseElements"}
      onClose={handleClose}
    >
      <SheetHeader>
        House elements
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody className={styles.sideSheetBody}>
        <HouseElementsListGroup
          closeSheet={closeSheet}
          openSheet={openSheet}
        />
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}