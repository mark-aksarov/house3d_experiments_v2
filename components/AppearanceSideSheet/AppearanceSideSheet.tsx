import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import ShowMarkersSwitch from "../ShowMarkersSwitch";
import { useAppSideToolBar } from "../AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import MarkerSizeRadioGroup from "../MarkerSizeRadioGroup";
import ToggleThemeRadioGroup from "../ToggleThemeRadioGroup";
import BaseSideSheet, { BaseSideSheetBody } from "../BaseSideSheet";
import OutlineEdgeGlowRangeInput from "../OutlineEdgeGlowRangeInput";
import OutlinePulsePeriodRangeInput from "../OutlinePulsePeriodRangeInput";
import OutlineColorToggleButtonGroup from "../OutlineColorToggleButtonGroup";
import OutlineEdgeStrengthRangeInput from "../OutlineEdgeStrengthRangeInput";
import OutlineEdgeThicknessRangeInput from "../OutlineEdgeThicknessRangeInput";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function AppearanceSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("appearance");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="appearance-side-sheet"
      restoreFocus={false}
      open={sheetName === "appearance"}
      onClose={handleClose}
    >
      <SheetHeader>
        Appearance
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Markers
              </Typography>

              <Stack justifyContent="space-between" alignItems="center">
                <Typography variant="body3">
                  Show markers
                </Typography>
                <ShowMarkersSwitch />
              </Stack>
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Marker size
              </Typography>
              <MarkerSizeRadioGroup />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Outline color
              </Typography>
              <OutlineColorToggleButtonGroup />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Outline edge strength
              </Typography>
              <OutlineEdgeStrengthRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Outline edge glow
              </Typography>
              <OutlineEdgeGlowRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Outline edge thickness
              </Typography>
              <OutlineEdgeThicknessRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Outline pulse period
              </Typography>
              <OutlinePulsePeriodRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Theme
              </Typography>
              <ToggleThemeRadioGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}