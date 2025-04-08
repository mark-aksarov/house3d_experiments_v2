import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import WallsTextureToggleButtonGroup from "./WallsTextureToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function WallsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("walls");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="walls-side-sheet"
      restoreFocus={false}
      open={sheetName === "walls"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Walls
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Walls texture
              </Typography>
              <WallsTextureToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}