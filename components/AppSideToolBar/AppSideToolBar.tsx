import Stack from '@/uikit/Stack';
import Tooltip from '@/uikit/Tooltip';
import styles from './AppSideToolBar.module.scss';
import AppSideToolBarButton from "./AppSideToolBarButton";
import { useAppSideToolBar } from './AppSideToolBarContext';
import { useOpenSideSheet } from '@/context/SideSheetsContext';
import ToggleButtonGroup, { ToggleButton } from '@/uikit/ToggleButton';
import { AppWindowMacIcon, BoxIcon, SettingsIcon } from 'lucide-react';

export default function AppSideToolBar() {
  const { selectedValue, setSelectedValue } = useAppSideToolBar();
  const openSheet = useOpenSideSheet();

  function handleValueChange(value: string) {
    setSelectedValue(value);
    openSheet(value);
  }

  return (
    <div data-testid="app-side-tool-bar" className={styles.sideToolBar}>
      <ToggleButtonGroup value={selectedValue}>
        <Stack direction="vertical" spacing={3}>
          <Tooltip title="Settings" placement='right' zIndex="calc(var(--z-sheet) + 1)">
            <ToggleButton
              aria-label='Settings'
              as={AppSideToolBarButton}
              icon={<SettingsIcon />}
              value="settings"
              onClick={() => handleValueChange("settings")}
            />
          </Tooltip>
          <Tooltip title="Appearance" placement='right' zIndex="calc(var(--z-sheet) + 1)">
            <ToggleButton
              aria-label='Appearance'
              as={AppSideToolBarButton}
              icon={<AppWindowMacIcon />}
              value="appearance"
              onClick={() => handleValueChange("appearance")}
            />
          </Tooltip>
          <Tooltip title="House model" placement='right' zIndex="calc(var(--z-sheet) + 1)">
            <ToggleButton
              aria-label='House model'
              as={AppSideToolBarButton}
              icon={<BoxIcon />}
              value="houseModel"
              onClick={() => handleValueChange("houseModel")}
            />
          </Tooltip>
        </Stack>
      </ToggleButtonGroup>
    </div>
  )
}