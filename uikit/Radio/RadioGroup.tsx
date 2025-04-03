"use client"

import { ReactNode, useMemo } from "react";
import { RadioGroupContext } from "./RadioGroupContext";

interface RadioGroupProps {
  value: string | number;
  name: string
  onChange: (value: string | number) => void;
  children: ReactNode;
}

export default function RadioGroup({
  value,
  name,
  onChange,
  children
}: RadioGroupProps) {
  const contextValue = useMemo(
    () => ({
      value,
      name,
      onChange
    }),
    [value, name, onChange]
  );
  return (
    <RadioGroupContext.Provider value={contextValue}>
      {children}
    </RadioGroupContext.Provider>
  );
};