"use client"

import { createContext, CSSProperties, useContext } from 'react';
import { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';

type MenuContextType = {
  zIndex?: number,
  interactions: UseInteractionsReturn,
  data: UseFloatingReturn,
  transition: {
    isMounted: boolean;
    styles: CSSProperties;
  },
  closeMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | null>(null);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

export default MenuContext;