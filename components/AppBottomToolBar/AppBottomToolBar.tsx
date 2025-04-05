import Stack from "@/uikit/Stack";
import { Tab, Tabs } from "@/uikit/Tabs";
import styles from './AppBottomToolBar.module.scss';
import { useAppBottomToolBar } from "./AppBottomToolBarContext";
import { useOpenBottomSheet } from "@/context/BottomSheetsContext";
import { AppWindowMacIcon, BoxIcon, BrickWallIcon, SettingsIcon } from "lucide-react";

export default function AppBottomToolBar() {
  const { toolBarTab, setToolBarTab } = useAppBottomToolBar();
  const openSheet = useOpenBottomSheet();

  function handleTabChange(tab: string) {
    setToolBarTab(tab);
    openSheet(tab);
  }

  return (
    <div data-testid="app-bottom-tool-bar" className={styles.bottomToolBar}>
      <Tabs value={toolBarTab} onChange={(tab) => setToolBarTab(tab)}>
        <Stack justifyContent="space-around" wrap="nowrap">
          <Tab
            id="settings"
            size="small"
            icon={<SettingsIcon />}
            onClick={() => handleTabChange("settings")}
            label="Settings"
          />
          <Tab
            id="appearance"
            size="small"
            onClick={() => handleTabChange("appearance")}
            icon={<AppWindowMacIcon />}
            label="Appearance"
          />
          <Tab
            id="houseModel"
            size="small"
            onClick={() => handleTabChange("houseModel")}
            icon={<BoxIcon />}
            label="Model"
          />
          <Tab
            id="houseElements"
            size="small"
            onClick={() => handleTabChange("houseElements")}
            icon={<BrickWallIcon />}
            label="Elements"
          />
        </Stack>
      </Tabs>
    </div>
  )
}