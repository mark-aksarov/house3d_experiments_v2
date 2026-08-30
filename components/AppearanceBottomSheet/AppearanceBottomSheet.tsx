import { useState } from "react";
import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import { SunMediumIcon } from "lucide-react";
import { BottomSheet } from "@/uikit/BottomSheet";
import { Tab, TabPanel, Tabs } from "@/uikit/Tabs";
import { SheetBody, SheetHeader } from "@/uikit/Sheet";
import styles from './AppearanceBottomSheet.module.scss';
import ToggleThemeRadioGroup from "../ToggleThemeRadioGroup";
import TabPanelContainer from "@/uikit/Tabs/TabPanelContainer";
import { useAppBottomToolBar } from "../AppBottomToolBar/AppBottomToolBarContext";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function AppearanceBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();
  const [appearanceTab, setAppearanceTab] = useState("themeTab");

  function handleClose() {
    closeSheet("appearance");
    setToolBarTab("");
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