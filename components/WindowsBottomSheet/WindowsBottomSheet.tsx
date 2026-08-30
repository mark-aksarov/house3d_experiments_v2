import { useState } from "react";
import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import { SheetBody } from "@/uikit/Sheet";
import BaseSheetHeader from "../BaseSheetHeader";
import { BottomSheet } from "@/uikit/BottomSheet";
import { Tab, TabPanel, Tabs } from "@/uikit/Tabs";
import styles from './WindowsBottomSheet.module.scss';
import { BlendIcon, PaletteIcon } from "lucide-react";
import { useAppBottomToolBar } from "../AppBottomToolBar";
import TabPanelContainer from "@/uikit/Tabs/TabPanelContainer";
import WindowGlassOpacityRangeInput from "../WindowGlassOpacityRangeInput";
import WindowSashColorToggleButtonGroup from "../WindowSashColorToggleButtonGroup";
import WindowGlassColorToggleButtonGroup from "../WindowGlassColorToggleButtonGroup";
import WindowBlindsColorToggleButtonGroup from "../WindowBlindsColorToggleButtonGroup";
import { useCloseBottomSheet, useOpenedBottomSheetName } from "@/context/BottomSheetsContext";

export default function WindowsBottomSheet() {
  const sheetName = useOpenedBottomSheetName();
  const closeSheet = useCloseBottomSheet();
  const { setToolBarTab } = useAppBottomToolBar();
  const [tab, setTab] = useState("sashColorTab");

  function handleClose() {
    closeSheet("windows");
    setToolBarTab("");
  }

  return (
    <BottomSheet
      data-testid="windows-bottom-sheet"
      restoreFocus={false}
      open={sheetName === "windows"}
      onClose={handleClose}
    >
      <BaseSheetHeader prevSheetName="materials">
        Windows
      </BaseSheetHeader>

      <Divider />

      <SheetBody className={styles.sheetBody}>
        <Tabs value={tab} onChange={(tab) => setTab(tab)}>
          <Stack spacing={7} justifyContent="center" wrap="nowrap">
            <Tab
              id="sashColorTab"
              icon={<PaletteIcon />}
              label="Sash color"
              aria-controls="sashColorPanel"
            />
            <Tab
              id="blindsColorTab"
              icon={<PaletteIcon />}
              label="Blinds color"
              aria-controls="blindsColorPanel"
            />
            <Tab
              id="glassColorTab"
              icon={<PaletteIcon />}
              label="Glass color"
              aria-controls="glassColorPanel"
            />
            <Tab
              id="glassOpacityTab"
              icon={<BlendIcon />}
              label="Glass opacity"
              aria-controls="glassOpacityPanel"
            />
          </Stack>
        </Tabs>

        <Divider />

        <TabPanelContainer>
          <TabPanel
            id="sashColorPanel"
            tabId="sashColorTab"
            activeTabId={tab}
            className={styles.panel}
          >
            <WindowSashColorToggleButtonGroup />
          </TabPanel>

          <TabPanel
            id="blindsColorPanel"
            tabId="blindsColorTab"
            activeTabId={tab}
            className={styles.panel}
          >
            <WindowBlindsColorToggleButtonGroup />
          </TabPanel>

          <TabPanel
            id="glassColorPanel"
            tabId="glassColorTab"
            activeTabId={tab}
            className={styles.panel}
          >
            <WindowGlassColorToggleButtonGroup />
          </TabPanel>

          <TabPanel
            id="glassOpacityPanel"
            tabId="glassOpacityTab"
            activeTabId={tab}
            className={styles.panel}
          >
            <WindowGlassOpacityRangeInput />
          </TabPanel>
        </TabPanelContainer>
      </SheetBody>
    </BottomSheet>
  )
}