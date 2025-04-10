"use client"

import Link from "next/link";
import Stack from "@/uikit/Stack";
import LogoIcon from "../LogoIcon";
import Button from "@/uikit/Button";
import IconButton from "@/uikit/IconButton";
import Typography from "@/uikit/Typography";
import styles from './AppHeader.module.scss';
import { Dispatch, SetStateAction } from "react";
import MenuItemButton from "@/uikit/Menu/MenuItemButton";
import Menu, { MenuButton, MenuItem, MenuList } from "@/uikit/Menu";
import { AlignJustifyIcon, CircleHelpIcon, GithubIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { useUndo } from "@/context/UndoContext";

interface AppHeaderProps {
  setAboutSheetOpen?: Dispatch<SetStateAction<boolean>>;
  setAboutModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AppHeader({
  setAboutSheetOpen,
  setAboutModalOpen
}: AppHeaderProps) {
  const { undo, redo, canUndo, canRedo } = useUndo();

  return (
    <>
      <header className={styles.header}>
        <Stack alignItems="center" spacing={3}>
          <LogoIcon className={styles.logo} />
          <Typography variant="header4">
            House 3D
          </Typography>

          <Stack spacing={3} className={styles.desktopButtons}>
            <IconButton
              variant="ghost"
              color="neutral"
              size="regular"
              icon={<Undo2Icon />}
              onClick={undo}
              disabled={!canUndo}
            />
            <IconButton
              variant="ghost"
              color="neutral"
              size="regular"
              icon={<Redo2Icon />}
              onClick={redo}
              disabled={!canRedo}
            />
          </Stack>
        </Stack>

        <Stack spacing={3} className={styles.desktopButtons}>
          <Button
            as={Link}
            variant="ghost"
            color="neutral"
            size="regular"
            href="https://github.com/MarkAk91/house3d"
            iconStart={<GithubIcon />}
          >
            GitHub
          </Button>
          {
            setAboutSheetOpen && <Button
              variant="ghost"
              color="neutral"
              size="regular"
              iconStart={<CircleHelpIcon />}
              onClick={() => setAboutSheetOpen(true)}
            >
              About
            </Button>
          }
        </Stack>

        <Menu
          offsetOptions={{
            mainAxis: 13,
            crossAxis: 8
          }}
        >
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            className={styles.menuButton}
            size="regular"
            variant="ghost"
            color="neutral"
            icon={<AlignJustifyIcon />}
          />
          <MenuList>
            <MenuItem>
              <MenuItemButton
                data-testid="github-menu-item-button"
                as={Link}
                icon={<GithubIcon />}
                href="https://github.com/MarkAk91/house3d"
              >
                Github
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton
                data-testid="undo-menu-item-button"
                icon={<Undo2Icon />}
                onClick={undo}
                disabled={!canUndo}
                closeMenuOnClick={false}
              >
                Undo
              </MenuItemButton>
            </MenuItem>
            <MenuItem>
              <MenuItemButton
                data-testid="redo-menu-item-button"
                icon={<Redo2Icon />}
                onClick={redo}
                disabled={!canRedo}
                closeMenuOnClick={false}
              >
                Redo
              </MenuItemButton>
            </MenuItem>
            {
              setAboutModalOpen && <MenuItem>
                <MenuItemButton
                  data-testid="about-menu-item-button"
                  onClick={() => setAboutModalOpen(true)}
                  icon={<CircleHelpIcon />}
                >
                  About
                </MenuItemButton>
              </MenuItem>
            }
          </MenuList>
        </Menu>
      </header>
    </>
  )
}