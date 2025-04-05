import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import BaseSideSheet from "../BaseSideSheet";
import { useAppSideToolBar } from "../AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import HouseToggleButtonGroup from "../HouseToggleButtonGroup";
import BaseSideSheetBody from "../BaseSideSheet/BaseSideSheetBody";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function HouseSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("house");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="house-side-sheet"
      restoreFocus={false}
      open={sheetName === "house"}
      onClose={handleClose}
    >
      <SheetHeader>
        House
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                House
              </Typography>
              <HouseToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}