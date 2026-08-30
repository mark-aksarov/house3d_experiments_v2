import classNames from "classnames";
import styles from './Spinner.module.scss';
import React, { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement>;

const Spinner = ({
  className,
  ...props
}: SpinnerProps) => {
  const classes = classNames(styles.spinner, className);

  return (
    <span className={styles.spinnerWrapper}>
      <span {...props} className={classes} />
    </span>
  )
}

export default Spinner;