"use client"

import { createContext, useContext } from "react";

interface RadioGroupContextType {
  value: string | number;
  name: string
  onChange: (value: string | number) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroupProvider');
  }
  return context;
}