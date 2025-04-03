"use client"

import Stack from 'uikit/Stack';
import classNames from 'classnames';
import styles from './Stepper.module.scss';
import React, { Children, useMemo } from "react";
import StepperContext, { StepSize } from "./StepperContext";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedIndex?: number,
  separators?: boolean,
  stepSize?: StepSize
}

export default function Stepper({
  selectedIndex,
  separators = true,
  stepSize = "regular",
  className,
  children,
  ...props
}: StepperProps) {
  const contextValue = useMemo(() => ({
    selectedIndex: selectedIndex || 0,
    separators,
    stepSize
  }), [selectedIndex, separators, stepSize]);

  const classes = classNames(styles.stepper, className);

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        {...props}
        className={classes}
      >
        <Stack wrap="nowrap" justifyContent="space-between">
          {
            Children.map(children, (child, index) =>
              React.isValidElement(child)
                ? React.cloneElement(child, { key: index, index } as any)
                : null
            )
          }
        </Stack>
      </div>
    </StepperContext.Provider>
  )
}