"use client"

import { createContext, useContext } from 'react';

export type StepSize = "small" | "regular";

type StepperContextType = {
  selectedIndex: number;
  separators: boolean;
  stepSize: StepSize;
};

export const StepperContext = createContext<StepperContextType | null>(null);

export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};

export default StepperContext;