import Divider from "@/uikit/Divider";
import { SheetHeader } from "@/uikit/Sheet";
import { useAppSideToolBar } from "../AppSideToolBar";
import styles from './MaterialsSideSheet.module.scss';
import HouseElementsListGroup from "../MaterialsListGroup";
import BaseSideSheet, { BaseSideSheetBody } from "../BaseSideSheet";
import { useCloseSideSheet, useOpenedSideSheetName, useOpenSideSheet } from "@/context/SideSheetsContext";

export default function MaterialsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();
  const openSheet = useOpenSideSheet();

  function handleClose() {
    closeSheet("materials");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="materials-side-sheet"
      restoreFocus={false}
      open={sheetName === "materials"}
      onClose={handleClose}
    >
      <SheetHeader>
        Materials
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