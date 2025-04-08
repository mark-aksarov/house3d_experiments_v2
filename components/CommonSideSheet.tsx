import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import CommonColorToggleButtonGroup from "./CommonColorToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function CommonSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("common");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="common-side-sheet"
      restoreFocus={false}
      open={sheetName === "common"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Common
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Color
              </Typography>
              <CommonColorToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}