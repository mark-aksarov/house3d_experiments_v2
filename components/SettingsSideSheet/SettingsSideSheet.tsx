import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import BaseSideSheet from "../BaseSideSheet";
import ShowToastsSwitch from "../ShowToastsSwitch";
import styles from './SettingsSideSheet.module.scss';
import { useAppSideToolBar } from "../AppSideToolBar";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import CameraFovRangeInput from "../CameraFovRangeInput";
import ToneMappingRadioGroup from "../ToneMappingRadioGroup";
import CameraMovingRadioGroup from "../CameraMovingRadioGroup";
import BaseSideSheetBody from "../BaseSideSheet/BaseSideSheetBody";
import ToneMappingRangeInput from "../ToneMappingExposureRangeInput";
import { useCloseSideSheet, useOpenedSideSheetName } from "@/context/SideSheetsContext";

export default function SettingsSideSheet() {
  const { setSelectedValue } = useAppSideToolBar();
  const sheetName = useOpenedSideSheetName();
  const closeSheet = useCloseSideSheet();

  function handleClose() {
    closeSheet("settings");
    setSelectedValue("");
  }

  return (
    <BaseSideSheet
      data-testid="settings-side-sheet"
      restoreFocus={false}
      open={sheetName === "settings"}
      onClose={handleClose}
    >
      <SheetHeader>
        Settings
      </SheetHeader>

      <Divider />

      <BaseSideSheetBody className={styles.sideSheetBody}>
        <ListGroup>
          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Tone mapping
              </Typography>
              <ToneMappingRadioGroup />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Tone mapping exposure
              </Typography>
              <ToneMappingRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Toasts
              </Typography>

              <Stack justifyContent="space-between" alignItems="center">
                <Typography variant="body3">
                  Show toasts
                </Typography>
                <ShowToastsSwitch />
              </Stack>
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch" style={{ width: "100%" }}>
              <Typography variant="header5">
                Camera field of view
              </Typography>
              <CameraFovRangeInput />
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction="vertical" spacing={5} alignItems="stretch">
              <Typography variant="header5">
                Moving of camera
              </Typography>
              <CameraMovingRadioGroup />
            </Stack>
          </ListItem>
        </ListGroup>
      </BaseSideSheetBody>
    </BaseSideSheet>
  )
}