import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import BaseSideSheet from "./BaseSideSheet";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import FenceColorToggleButtonGroup from "./FenceColorToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function FenceSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("fence");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="fence-side-sheet"
      restoreFocus={false}
      open={sheetName === "fence"}
      onClose={handleClose}
    >
      <SheetHeader>
        Fence
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Fence color
              </Typography>
              <FenceColorToggleButtonGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}