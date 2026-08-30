import Stack from "@/uikit/Stack";
import { useState } from "react";
import Divider from "@/uikit/Divider";
import { BottomSheet } from "@/uikit/BottomSheet";
import { Tab, TabPanel, Tabs } from "@/uikit/Tabs";
import ShowToastsSwitch from "../ShowToastsSwitch";
import { SheetBody, SheetHeader } from "@/uikit/Sheet";
import styles from './SettingsBottomSheet.module.scss';
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import { useAppBottomToolBar } from "../AppBottomToolBar";
import ListItemText from "@/uikit/ListGroup/ListItemText";
import ListItemIcon from "@/uikit/ListGroup/ListItemIcon";
import ShadowsEnabledSwitch from "../ShadowsEnabledSwitch";
import TabPanelContainer from "@/uikit/Tabs/TabPanelContainer";
import { ArrowRightIcon, BellIcon, LightbulbIcon, SlidersHorizontalIcon, VideoIcon } from "lucide-react";
import { useCloseBottomSheet, useOpenedBottomSheetName, useOpenBottomSheet } from "@/context/BottomSheetsContext";

export default function SettingsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const openSheet = useOpenBottomSheet();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();
  const [settingTab, setSettingTab] = useState("toneMappingTab");

  function handleClose() {
    closeSheet("settings");
    setToolBarTab("");
  }

  function openToneMappingBottomSheet() {
    openSheet("toneMapping");
  }

  function openToneMappingExposureBottomSheet() {
    openSheet("toneMappingExposure");
  }

  function openFovBottomSheet() {
    openSheet("cameraFov");
  }

  function openAmbientLightIntensityBottomSheet() {
    openSheet("ambientLightIntensity");
  }

  function openShadowsResolutionBottomSheet() {
    openSheet("shadowsResolution");
  }

  return (
    <BottomSheet
      data-testid="settings-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "settings"}
      onClose={handleClose}
    >
      <SheetHeader>
        Settings
      </SheetHeader>

      <Divider />

      <SheetBody
        className={styles.sheetBody}
      >
        <Tabs value={settingTab} onChange={(tab) => setSettingTab(tab)}>
          <Stack spacing={7} justifyContent="center">
            <Tab
              id="toneMappingTab"
              icon={<SlidersHorizontalIcon />}
              label="Tone mapping"
              aria-controls="toneMappingPanel"
            />
            <Tab
              id="toastsTab"
              icon={<BellIcon />}
              label="Toasts"
              aria-controls="toastsPanel"
            />
            <Tab
              id="cameraTab"
              icon={<VideoIcon />}
              label="Camera"
              aria-controls="cameraPanel"
            />
            <Tab
              id="lightTab"
              icon={<LightbulbIcon />}
              label="Light"
              aria-controls="lightPanel"
            />
          </Stack>
        </Tabs>

        <Divider />

        <TabPanelContainer>
          <TabPanel
            id="toneMappingPanel"
            tabId="toneMappingTab"
            activeTabId={settingTab}
          >
            <ListGroup>
              <ListItem onClick={openToneMappingBottomSheet}>
                <ListItemText>
                  Tone mapping
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>
              <ListItem
                onClick={openToneMappingExposureBottomSheet}
              >
                <ListItemText>
                  Tone mapping exposure
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>
            </ListGroup>
          </TabPanel>

          <TabPanel
            id="toastsPanel"
            tabId="toastsTab"
            activeTabId={settingTab}
          >
            <ListGroup>
              <ListItem>
                <ListItemText>
                  Show toasts
                </ListItemText>
                <ShowToastsSwitch />
              </ListItem>
            </ListGroup>
          </TabPanel>

          <TabPanel
            id="cameraPanel"
            tabId="cameraTab"
            activeTabId={settingTab}
          >
            <ListGroup>
              <ListItem onClick={openFovBottomSheet}>
                <ListItemText>
                  Field of view
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>
            </ListGroup>
          </TabPanel>

          <TabPanel
            id="lightPanel"
            tabId="lightTab"
            activeTabId={settingTab}
          >
            <ListGroup>
              <ListItem>
                <ListItemText>
                  Shadows enabled
                </ListItemText>
                <ShadowsEnabledSwitch />
              </ListItem>

              <ListItem onClick={openAmbientLightIntensityBottomSheet}>
                <ListItemText>
                  Ambient light intensity
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>

              <ListItem onClick={openShadowsResolutionBottomSheet}>
                <ListItemText>
                  Shadows resolution
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>
            </ListGroup>
          </TabPanel>
        </TabPanelContainer>
      </SheetBody>
    </BottomSheet>
  )
}