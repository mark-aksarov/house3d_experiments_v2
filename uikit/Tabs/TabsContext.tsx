"use client"

import { createContext, useContext } from "react";

interface TabsContextType {
  value: string;
  onChange: (tab: string) => void;
}

export const TabsContext = createContext<TabsContextType | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}