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
  function openRoofSideSheet() {
    closeSheet("materials");
    openSheet("roof");
  }

  function openWallsSideSheet() {
    closeSheet("materials");
    openSheet("walls");
  }

  function openFenceSideSheet() {
    closeSheet("materials");
    openSheet("fence");
  }

  function openWindowsSideSheet() {
    closeSheet("materials");
    openSheet("windows");
  }

  function openCornersSideSheet() {
    closeSheet("materials");
    openSheet("corners");
  }

  function openDoorsSideSheet() {
    closeSheet("materials");
    openSheet("doors");
  }

  function openPavingSideSheet() {
    closeSheet("materials");
    openSheet("paving");
  }

  function openFoundationSideSheet() {
    closeSheet("materials");
    openSheet("foundation");
  }

  return (
    <ListGroup>
      <ListItem onClick={openRoofSideSheet}>
        <ListItemText>
          Roof
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

      <ListItem onClick={openFenceSideSheet}>
        <ListItemText>
          Fence
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

      <ListItem onClick={openCornersSideSheet}>
        <ListItemText>
          Corners
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

      <ListItem onClick={openPavingSideSheet}>
        <ListItemText>
          Paving
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
    </ListGroup>
  )
}