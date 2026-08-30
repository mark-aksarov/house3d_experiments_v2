import Stack from "@/uikit/Stack";
import Divider from "@/uikit/Divider";
import Typography from "@/uikit/Typography";
import { SheetHeader } from "@/uikit/Sheet";
import { useAppSideToolBar } from "../AppSideToolBar";
import styles from './AppearanceSideSheet.module.scss';
import ListGroup, { ListItem } from "@/uikit/ListGroup";
import ToggleThemeRadioGroup from "../ToggleThemeRadioGroup";
import BaseSideSheet, { BaseSideSheetBody } from "../BaseSideSheet";
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

      <BaseSideSheetBody className={styles.sideSheetBody}>
        <ListGroup>
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