import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import FoundationTextureToggleButtonGroup from "./FoundationTextureToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function FoundationSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("foundation");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="foundation-side-sheet"
      restoreFocus={false}
      open={sheetName === "foundation"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Foundation
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Foundation texture
              </Typography>
              <FoundationTextureToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}