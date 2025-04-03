"use client"

import { createContext, useContext } from 'react';
import { ListItemSize } from './ListItem';

interface ListItemContextType {
  size?: ListItemSize
}

export const ListItemContext = createContext<ListItemContextType | null>(null);

export const useListItem = () => {
  const context = useContext(ListItemContext);
  if (!context) {
    throw new Error('useListItem must be used within a ListItemProvider');
  }
  return context;
}