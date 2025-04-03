"use client"

import React, { HTMLAttributes, useMemo } from 'react';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';

interface ToggleButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string | number
  onChange?: (value?: string | number) => void
}

const ToggleButtonGroup = ({
  value,
  onChange,
  children,
  ...props
}: ToggleButtonGroupProps) => {
  const contextValue = useMemo(() => ({
    selectedValue: value,
    changeSelectedValue: onChange
  }), [value, onChange])

  return (
    <ToggleButtonGroupContext.Provider value={contextValue}>
      <div {...props}>
        {children}
      </div>
    </ToggleButtonGroupContext.Provider>
  )
}

export default ToggleButtonGroup;