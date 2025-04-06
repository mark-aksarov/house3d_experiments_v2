import { useState } from "react";
import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import { BottomSheet } from "@/uikit/BottomSheet";
import { Tab, TabPanel, Tabs } from "@/uikit/Tabs";
import ShowMarkersSwitch from "../ShowMarkersSwitch";
import { SheetBody, SheetHeader } from "@/uikit/Sheet";
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import styles from './AppearanceBottomSheet.module.scss';
import ListItemText from "@/uikit/ListGroup/ListItemText";
import ListItemIcon from "@/uikit/ListGroup/ListItemIcon";
import ToggleThemeRadioGroup from "../ToggleThemeRadioGroup";
import TabPanelContainer from "@/uikit/Tabs/TabPanelContainer";
import { ArrowRightIcon, CircleDotIcon, SunMediumIcon } from "lucide-react";
import { useAppBottomToolBar } from "../AppBottomToolBar/AppBottomToolBarContext";
import { useCloseBottomSheet, useOpenedBottomSheetName, useOpenBottomSheet } from "@/context/BottomSheetsContext";

export default function AppearanceBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const openSheet = useOpenBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();
  const [appearanceTab, setAppearanceTab] = useState("markersTab");

  function handleClose() {
    closeSheet("appearance");
    setToolBarTab("");
  }

  function openMarkerSizeBottomSheet() {
    openSheet("markerSize");
  }

  return (
    <BottomSheet
      data-testid="appearance-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "appearance"}
      onClose={handleClose}
    >
      <SheetHeader>
        Appearance
      </SheetHeader>

      <Divider />

      <SheetBody className={styles.sheetBody}>
        <Tabs value={appearanceTab} onChange={(tab) => setAppearanceTab(tab)}>
          <Stack spacing={7} justifyContent="center">
            <Tab
              id="markersTab"
              icon={<CircleDotIcon />}
              label="Markers"
              aria-controls="markersPanel"
            />
            <Tab
              id="themeTab"
              icon={<SunMediumIcon />}
              label="Theme"
              aria-controls="themePanel"
            />
          </Stack>
        </Tabs>

        <Divider />

        <TabPanelContainer>
          <TabPanel
            id="markersPanel"
            tabId="markersTab"
            activeTabId={appearanceTab}
            className={styles.panel}
          >
            <ListGroup>
              <ListItem>
                <ListItemText>
                  Show markers
                </ListItemText>
                <ShowMarkersSwitch />
              </ListItem>

              <ListItem onClick={openMarkerSizeBottomSheet}>
                <ListItemText>
                  Marker size
                </ListItemText>
                <ListItemIcon>
                  <ArrowRightIcon className={styles.listItemIcon} />
                </ListItemIcon>
              </ListItem>
            </ListGroup>
          </TabPanel>

          <TabPanel
            id="themePanel"
            tabId="themeTab"
            activeTabId={appearanceTab}
            className={styles.themePanel}
          >
            <ToggleThemeRadioGroup />
          </TabPanel>
        </TabPanelContainer>
      </SheetBody>
    </BottomSheet>
  )
}