import { ArrowRightIcon } from "lucide-react";
import styles from './MaterialsListGroup.module.scss';
import ListGroup, { ListItem, ListItemIcon, ListItemText } from "@/uikit/ListGroup";

interface MaterialsListGroupProps {
  closeSheet: (sheetName: string) => void;
  openSheet: (sheetName: string) => void;
}

export default function MaterialsListGroup({
  closeSheet,
  openSheet,
}: MaterialsListGroupProps) {
  function openCommonSideSheet() {
    closeSheet("materials");
    openSheet("common");
  }

  function openRoofSideSheet() {
    closeSheet("materials");
    openSheet("roof");
  }

  function openFoundationSideSheet() {
    closeSheet("materials");
    openSheet("foundation");
  }

  function openWallsSideSheet() {
    closeSheet("materials");
    openSheet("walls");
  }

  function openWindowsSideSheet() {
    closeSheet("materials");
    openSheet("windows");
  }

  function openDoorsSideSheet() {
    closeSheet("materials");
    openSheet("doors");
  }

  return (
    <ListGroup>
      <ListItem onClick={openCommonSideSheet}>
        <ListItemText>
          Common
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>

      <ListItem onClick={openRoofSideSheet}>
        <ListItemText>
          Roof
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>

      <ListItem onClick={openFoundationSideSheet}>
        <ListItemText>
          Foundation
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>

      <ListItem onClick={openWallsSideSheet}>
        <ListItemText>
          Walls
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>

      <ListItem onClick={openWindowsSideSheet}>
        <ListItemText>
          Windows
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>

      <ListItem onClick={openDoorsSideSheet}>
        <ListItemText>
          Doors
        </ListItemText>
        <ListItemIcon>
          <ArrowRightIcon className={styles.listItemIcon} />
        </ListItemIcon>
      </ListItem>
    </ListGroup>
  )
}