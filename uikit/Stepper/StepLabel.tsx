"use client"

import classNames from 'classnames';
import { useStep } from './StepContext';
import styles from './Stepper.module.scss';
import Typography from '@/uikit/Typography';
import { useStepper } from './StepperContext';

export default function StepLabel({ children }: { children: React.ReactNode }) {
  const { index } = useStep();
  const { selectedIndex } = useStepper();

  const classes = classNames(styles.stepLabel, {
    "passed": index <= selectedIndex
  });

  return (
    <Typography variant="body3" className={classes}>
      {children}
    </Typography>
  )
}