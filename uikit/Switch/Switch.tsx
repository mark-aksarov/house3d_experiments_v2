import classNames from 'classnames';
import styles from './Switch.module.scss';
import React, { InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Switch({
  disabled,
  ...props
}: SwitchProps) {
  const classes = classNames(styles.switch, {
    [styles.disabled]: disabled
  });

  return (
    <label className={classes}>
      <input
        {...props}
        disabled={disabled}
        type="checkbox"
        className={styles.checkbox}
      />
      <span className={styles.slider}></span>
    </label>
  );
}