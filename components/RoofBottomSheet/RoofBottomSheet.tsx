import { useState } from "react";
import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import { BottomSheet } from "@/uikit/BottomSheet";
import { Tab, TabPanel, Tabs } from "@/uikit/Tabs";
import styles from './RoofBottomSheet.module.scss';
import { SheetBody, SheetHeader } from "@/uikit/Sheet";
import { useAppBottomToolBar } from "../AppBottomToolBar";
import { CircleDotIcon, SunMediumIcon } from "lucide-react";
import TabPanelContainer from "@/uikit/Tabs/TabPanelContainer";
import RoofColorToggleButtonGroup from "../RoofColorToggleButtonGroup";
import RoofCoverTextureToggleButtonGroup from "../RoofCoverTextureToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function RoofBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();
  const [appearanceTab, setAppearanceTab] = useState("textureTab");

  function handleClose() {
    closeSheet("roof");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="roof-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "roof"}
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
              id="textureTab"
              icon={<CircleDotIcon />}
              label="Texture"
              aria-controls="texturePanel"
            />
            <Tab
              id="colorTab"
              icon={<SunMediumIcon />}
              label="Color"
              aria-controls="colorPanel"
            />
          </Stack>
        </Tabs>

        <Divider />

        <TabPanelContainer>
          <TabPanel
            id="texturePanel"
            tabId="textureTab"
            activeTabId={appearanceTab}
            className={styles.panel}
          >
            <RoofCoverTextureToggleButtonGroup />
          </TabPanel>

          <TabPanel
            id="colorPanel"
            tabId="colorTab"
            activeTabId={appearanceTab}
            className={styles.panel}
          >
            <RoofColorToggleButtonGroup />
          </TabPanel>
        </TabPanelContainer>
      </SheetBody>
    </BottomSheet>
  )
}