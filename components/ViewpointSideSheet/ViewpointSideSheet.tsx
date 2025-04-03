import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import BaseSideSheet from "../BaseSideSheet";
import { useAppSideToolBar } from "../AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "../BaseSideSheet/BaseSideSheetBody";
import ViewpointToggleButtonGroup from "../ViewpointToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function ViewpointSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("viewpoint");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="viewpoint-side-sheet"
      restoreFocus={false}
      open={sheetName === "viewpoint"}
      onClose={handleClose}
    >
      <SheetHeader>
        Camera
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Viewpoint
              </Typography>
              <ViewpointToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}