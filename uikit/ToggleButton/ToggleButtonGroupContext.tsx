"use client"

import { createContext, useContext } from 'react';

interface ToggleButtonGroupContextType {
  selectedValue?: string | number
  changeSelectedValue?: (value?: string | number) => void
}

export const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextType | null>(null);

export const useToggleButtonGroup = () => {
  const context = useContext(ToggleButtonGroupContext);
  if (!context) {
    throw new Error('useToggleButtonGroup must be used within a ToggleButtonGroupProvider');
  }
  return context;
}