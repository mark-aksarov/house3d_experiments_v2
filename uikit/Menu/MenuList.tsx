"use client"

import { ReactNode } from "react";
import styles from './Menu.module.scss';
import { useMenuContext } from "./MenuContext";
import { FloatingPortal } from "@floating-ui/react";

interface MenuListProps {
  children: ReactNode
}

function MenuList({ children }: MenuListProps) {
  const {
    zIndex,
    interactions: {
      getFloatingProps
    },
    data: {
      refs,
      floatingStyles,
    },
    transition: {
      isMounted,
      styles: transitionStyles
    }
  } = useMenuContext();

  return (
    <FloatingPortal>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, zIndex }}
          {...getFloatingProps()}
          className={styles.menuContainer}
        >
          <div style={{ ...transitionStyles }}>
            <ul className={styles.menuList}>
              {children}
            </ul>
          </div>
        </div>
      )}
    </FloatingPortal>
  );
};

export default MenuList;