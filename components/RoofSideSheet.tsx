import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import RoofColorToggleButtonGroup from "./RoofColorToggleButtonGroup";
import RoofCoverTextureToggleButtonGroup from "./RoofCoverTextureToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function RoofSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("roof");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="roof-side-sheet"
      restoreFocus={false}
      open={sheetName === "roof"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Roof
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Roof cover texture
              </Typography>
              <RoofCoverTextureToggleButtonGroup />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Roof color
              </Typography>
              <RoofColorToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}