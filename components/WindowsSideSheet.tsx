import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import BaseSideSheet from "./BaseSideSheet";
import BaseSheetHeader from "./BaseSheetHeader";
import { useAppSideToolBar } from "./AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import BaseSideSheetBody from "./BaseSideSheet/BaseSideSheetBody";
import WindowGlassOpacityRangeInput from "./WindowGlassOpacityRangeInput";
import WindowSashColorToggleButtonGroup from "./WindowSashColorToggleButtonGroup";
import WindowGlassColorToggleButtonGroup from "./WindowGlassColorToggleButtonGroup";
import WindowBlindsColorToggleButtonGroup from "./WindowBlindsColorToggleButtonGroup";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function WindowsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("windows");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="windows-side-sheet"
      restoreFocus={false}
      open={sheetName === "windows"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Windows
      </BaseSheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Window sash color
              </Typography>
              <WindowSashColorToggleButtonGroup />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Window blinds color
              </Typography>
              <WindowBlindsColorToggleButtonGroup />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Window glass color
              </Typography>
              <WindowGlassColorToggleButtonGroup />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: '100%' }}>
              <Typography variant="header5">
                Window glass opacity
              </Typography>
              <WindowGlassOpacityRangeInput />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}