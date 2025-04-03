"use client"

import { createContext, useContext } from 'react';

type StepContextType = {
  index: number;
};

export const StepContext = createContext<StepContextType | null>(null);

export function useStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};

export default StepContext;