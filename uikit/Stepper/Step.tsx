"use client"

import classNames from "classnames";
import React, { useMemo } from "react";
import StepContext from "./StepContext";
import styles from './Stepper.module.scss';
import StepSeparator from "./StepSeparator";
import Typography from "@/uikit/Typography";
import { useStepper } from "./StepperContext";

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
}

export default function Step({
  index = 0,
  className,
  children,
  ...props
}: StepProps) {
  const { selectedIndex, stepSize, separators } = useStepper();
  const classes = classNames(
    styles.step,
    className,
    styles[stepSize],
    {
      "passed": index <= selectedIndex,
    }
  );

  const contextValue = useMemo(() => ({
    index
  }), []);

  return (
    <StepContext.Provider value={contextValue}>
      <div className={styles.stepWrapper}>
        <div
          data-testid="step"
          {...props}
          className={classes}
        >
          {
            stepSize === "regular" &&
            <Typography data-testid="step-text" className={styles.stepText} variant="body3">
              {index + 1}
            </Typography>
          }
        </div>
        {children}
        {(index !== 0 && separators) && <StepSeparator />}
      </div>
    </StepContext.Provider>
  )
}