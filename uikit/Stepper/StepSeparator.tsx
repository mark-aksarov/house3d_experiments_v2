"use client"

import classNames from 'classnames';
import { useStep } from './StepContext';
import styles from './Stepper.module.scss';
import { useStepper } from './StepperContext';

interface StepSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function StepSeparator({
  ...props
}: StepSeparatorProps) {
  const { index } = useStep();
  const { selectedIndex } = useStepper();

  const classes = classNames(styles.separator, {
    "passed": index <= selectedIndex
  });

  return (
    <div
      data-testid="separator"
      {...props}
      className={classes}
    />
  )
}