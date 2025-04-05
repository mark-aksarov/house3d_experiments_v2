import Divider from "@/uikit/Divider";
import { SheetHeader } from "@/uikit/Sheet";
import BaseSideSheet from "./BaseSideSheet";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import HouseModelToggleButtonGroup from "./HouseModelToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function HouseModelSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("houseModel");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="house-model-side-sheet"
      restoreFocus={false}
      open={sheetName === "houseModel"}
      onClose={handleClose}
    >
      <SheetHeader>
        House model
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <HouseModelToggleButtonGroup />
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}