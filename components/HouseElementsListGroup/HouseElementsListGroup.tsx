import { ArrowRightIcon } from "lucide-react";
import styles from './HouseElementsListGroup.module.scss';
import ListGroup, { ListItem, ListItemIcon, ListItemText } from "@/uikit/ListGroup";

interface HouseElementsListGroupProps {
  closeSheet: (sheetName: string) => void;
  openSheet: (sheetName: string) => void;
}

export default function HouseElementsListGroup({
  closeSheet,
  openSheet,
}: HouseElementsListGroupProps) {
  function openRoofSideSheet() {
    closeSheet("houseElements");
    openSheet("roof");
  }

  function openWallsSideSheet() {
    closeSheet("houseElements");
    openSheet("walls");
  }

  function openFenceSideSheet() {
    closeSheet("houseElements");
    openSheet("fence");
  }

  function openWindowsSideSheet() {
    closeSheet("houseElements");
    openSheet("windows");
  }

  function openCornersSideSheet() {
    closeSheet("houseElements");
    openSheet("corners");
  }

  function openDoorsSideSheet() {
    closeSheet("houseElements");
    openSheet("doors");
  }

  function openPavingSideSheet() {
    closeSheet("houseElements");
    openSheet("paving");
  }

  function openFoundationSideSheet() {
    closeSheet("houseElements");
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