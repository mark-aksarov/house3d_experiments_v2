import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import DoorsColorToggleButtonGroup from "./DoorsColorToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function DoorsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("doors");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="doors-side-sheet"
      restoreFocus={false}
      open={sheetName === "doors"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Doors
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Color
              </Typography>
              <DoorsColorToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}